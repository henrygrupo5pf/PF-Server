const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // STARTTLS
    auth: {
        user: process.env.BREVO_API_KEY,
        pass: '',
    }
});

module.exports = transporter;
