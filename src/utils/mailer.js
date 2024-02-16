const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
     host: "smtp.office365.com",
    port: 587,
    secure: false, // STARTTLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_ZPASS,
    }
});

module.exports = transporter;
