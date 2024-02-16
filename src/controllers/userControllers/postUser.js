const { User } = require('../../db');
const transporter = require('../../utils/mailer');
//Notificacion
const postUser = async ({ name, email, password, country, location, phoneNumber, activeStatus, admin }) => {
    console.log('Creando usuario en la base de datos:', { name, email, country, location, phoneNumber, activeStatus, admin });
    const newUser = await User.create({ name, email, password, country, location, phoneNumber, activeStatus, admin });
    console.log('Usuario creado en la base de datos:', newUser);
    try {
        await transporter.sendMail({
            from: "maharba0717@hotmail.com",
            to: email,
            subject: '¡Bienvenido!',
            text: `Hola ${name},\n\nBienvenido a nuestra plataforma. Esperamos que disfrutes de nuestros servicios.\n\nSaludos,\nEl equipo de tu aplicación`,
        });
        console.log("Correo enviado correctamente a:", email);
    } catch (error) {
        console.error("Error al enviar el correo:", error);
        // throw new Error("Error al enviar el correo electrónico");
    }

    return newUser;
};

module.exports = postUser;
