const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    secure: false,  // upgrade later with STARTTLS
    port:587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

module.exports = transporter;