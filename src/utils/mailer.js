const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false, // STARTTLS
    auth: {
        user: "maharba0717@hotmail.com",
        pass: process.env.EMAIL_ZPASS,
    }
});

module.exports = transporter;
