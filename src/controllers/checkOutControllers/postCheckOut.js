const Stripe = require("stripe");
require("dotenv").config();
const transporter = require('../../utils/mailer');
//const { PRIVATE_KEY_STRIPE } = process.env;

const stripe = new Stripe("sk_test_51OgYb1GL3gYQY1hZDp1omCdXOyZlCpwMune57tHpXClYf6bYYCgXod6fis9dTOSzBqqDD9MqmGA1bZh5kGL9CXxf00OfwTLt23");
const sendEmail = async (recipient, subject, message) => {
  try {
      await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: recipient,
          subject: subject,
          text: message,
      });
      console.log("Correo electrónico enviado con éxito a", recipient);
  } catch (error) {
      console.error("Error al enviar el correo electrónico:", error);
  }
};
const checkOut = async (info) => {


  const lineItems = info.map((item) => {

    const startDate = new Date(item.startDate);
    const endDate = new Date(item.endDate);
    const timeDifference = Math.abs(endDate.getTime() - startDate.getTime());
    const totalDays = Math.ceil(timeDifference / (1000 * 3600 * 24))+1

    return {
      price_data: {
        product_data: {
          name: item.name,
          description: item.description,
        },
        currency: "USD",
        unit_amount: item.cost * 100 * totalDays 
      },
      quantity: item.quantity,
    };
  });

  console.log("SOYlineItems :  ", lineItems)

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "https://pf-front-end.onrender.com/#/checkOut/success",
    cancel_url: "https://pf-front-end.onrender.com/#/checkOut/cancel",

    //URL de prueba descomentar abajo
    /* success_url: "http://localhost:5173/checkout/success",
    cancel_url: "http://localhost:5173/checkout/cancel", */
  });
  await sendEmail(recipient, "Pago exitoso", "¡Gracias por tu compra!");
console.log("SOY CHECKOUT TERMINANDO:  ", session )
  return session 

};

module.exports = {
  checkOut,
};
