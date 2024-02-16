const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_ZPASS,
    }
});

module.exports = transporter;
