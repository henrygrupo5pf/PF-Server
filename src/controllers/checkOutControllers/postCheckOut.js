const Stripe = require("stripe");
require("dotenv").config();
const { PRIVATE_KEY_STRIPE } = process.env;

const stripe = new Stripe(PRIVATE_KEY_STRIPE);

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

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "https://pf-front-7krw.onrender.com/checkout/success",
    cancel_url: "https://pf-front-7krw.onrender.com/checkout/cancel",

    //URL de prueba descomentar abajo
    /* success_url: "http://localhost:5173/checkout/success",
    cancel_url: "http://localhost:5173/checkout/cancel", */
  });


  return session 

};

module.exports = {
  checkOut,
};
