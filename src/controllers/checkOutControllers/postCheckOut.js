const Stripe = require("stripe");
require("dotenv").config();
const { PRIVATE_KEY_STRIPE } = process.env;

const stripe = new Stripe(PRIVATE_KEY_STRIPE);

const checkOut = async (info) => {

  const lineItems = info.map((item) => {
    return {
      price_data: {
        product_data: {
          name: item.name,
          description: item.description,
        },
        currency: "USD",
        unit_amount: item.cost * 100,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
   /*  success_url: "https://pf-server-93lj.onrender.com/checkout/success",
    cancel_url: "https://pf-server-93lj.onrender.com/checkout/cancel", */

    //URL de prueba descomentar abajo
    success_url: "http://localhost:5173/checkout/success",
    cancel_url: "http://localhost:5173/checkout/cancel",
  });


  return session 

};

module.exports = {
  checkOut,
};
