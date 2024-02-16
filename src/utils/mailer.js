const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 465,
    secure: false, // STARTTLS
    auth: {
        user: "maharba0717@hotmail.com",
        pass: "Wololo151284",
    }
});

module.exports = transporter;
