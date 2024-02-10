const { User } = require('../../db');
const transporter = require('../../utils/mailer');

const postUser = async({name, email, password, country, location, phoneNumber, activeStatus, admin})=>{
    
    const newUser = await User.create({ name, email, password, country, location, phoneNumber, activeStatus, admin });
    await transporter.sendMail({
        from: process.env.EMAIL_USER, // Dirección de correo electrónico que se mostrará como remitente
        to: email, // Correo electrónico del nuevo usuario
        subject: '¡Bienvenido!', // Asunto del correo
        text: `Hola ${name},\n\nBienvenido a nuestra plataforma. Esperamos que disfrutes de nuestros servicios.\n\nSaludos,\nEl equipo de tu aplicación`, // Cuerpo del correo
    });

    return newUser;

};

module.exports = postUser;