const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
});

const sendEmail = async (toString, subjectString, html) => {
    await transporter.sendMail({
        from: `"Inventory System" <${process.env.EMAIL_USER}>`,
        to: toString,
        subject: subjectString,
        html
    });
};

module.exports = sendEmail;