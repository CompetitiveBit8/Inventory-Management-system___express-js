const { appendFile } = require('node:fs');
const User = require('../models/userModel.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

 exports.createUser = async (req, res) => {
    try { 
        const { name, password, email, role, phone } = req.body;
        if (req.body == null){
            res.status(400).json({message: "Please fill in the information"}) 
        }
        // Check existing email
        const existingUser = await User.findOne({email});
        if (existingUser){
            return res.status(400).json({message: "User with email already exists"}) 
        }
        // Check unique phone 
        const existingPhone = await User.findOne({phone})
        if (existingPhone){
            return res.status(400).json({message: "User with thesame phone number already exists"}) 
        }
        // Hash and salt password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt)

        const user = await User.create({
            name,
            password : passwordHash,
            email,
            role,
            phone
        })
        res.status(201).json({message: "User created"})
    } catch (error) {
        res.status(500).json({error: error.message})
    };
 };

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email});
        if (!user){
            return res.status(400).json({message: "Invalid credentials"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            return res.status(400).json({message: "Invalid credentials"})
        }

        //Generate token
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                role: user.role
        }
    });
    } catch (error) {
        res.status(500).json({error: error.message})
    }
};