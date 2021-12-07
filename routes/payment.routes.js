const express = require("express")
const router = express.Router();
const Event = require("../models/Event.model");
const Product = require("../models/Product.model")


// TODO inside the ("") you need to add your real key or the test key that stripe will give you in their documentation.
const stripe = require("stripe")(process.env.STRIPE_BE_KEY);


router.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Trying to find if the item is an event or a product
  const eventFound = await Event.findById(items[0]._id);
  const productFound = await Product.findById(items[0]._id);

 // Variable that will be added to the stripe payment intend
  let amount;

  // Check depending on the type of item it's going to add the price to the amount variable
  if(eventFound){
    amount = eventFound.price * 100
  } else {
    amount = productFound.price * 100
  }

  // Create a PaymentIntent with the order amount and currency
   const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "eur",
    payment_method_types: [
      "card",
    ],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});


module.exports = router;