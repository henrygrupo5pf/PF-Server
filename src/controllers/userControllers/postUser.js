const { User } = require('../../db');
const transporter = require('../../utils/mailer');

const postUser = async ({ name, email, password, country, location, phoneNumber, activeStatus, admin }) => {
    
    const newUser = await User.create({ name, email, password, country, location, phoneNumber, activeStatus, admin });
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: 'carocaro121588@gmail.com', // Cambia esto para enviar el correo a la dirección deseada
            subject: '¡Bienvenido!',
            text: `Hola ${name},\n\nBienvenido a nuestra plataforma. Esperamos que disfrutes de nuestros servicios.\n\nSaludos,\nEl equipo de tu aplicación`,
        });
        console.log("Correo enviado correctamente a:", 'carocaro121588@gmail.com');
    } catch (error) {
        console.error("Error al enviar el correo:", error);
        throw new Error("Error al enviar el correo electrónico");
    }

    return newUser;

};

module.exports = postUser;