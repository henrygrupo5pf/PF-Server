const { User } = require('../../db');
const transporter = require('../../utils/mailer');

const postUser = async ({ name, email, password, country, location, phoneNumber, activeStatus, admin }) => {
  try {
    const [user, created] = await User.findOrCreate({
      where: {
        email: email,
    },
      defaults: { name, password, country, location, phoneNumber, activeStatus, admin }
    });

    if (!created && !user) {
      throw new Error("Error al crear el usuario");
    } else if (!created && user) {
      console.log('Usuario encontrado en la base de datos:', user.email);
    } else if (created) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: '¡Bienvenido!',
          text: `Hola ${name},\n\nBienvenido a nuestra plataforma. Esperamos que disfrutes de nuestros servicios.\n\nSaludos,\nEl equipo de tu aplicación`,
        });
        console.log("Correo enviado correctamente a:", email);
      } catch (error) {
        console.error("Error al enviar el correo:", error);
        // Puedes manejar el error de envío de correo aquí
      }
    }

    return { user: { id: user.id, email: user.email, admin: user.admin }, created };

  } catch (error) {
    console.error("Error al crear el usuario:", error.message);
    throw new Error("Error al crear el usuario: " + error.message); // Devolver un mensaje de error más descriptivo
  }
};

module.exports = postUser;
