const express = require("express")
const router = express.Router();


// TODO inside the ("") you need to add your real key or the test key that stripe will give you in their documentation.
const stripe = require("stripe")(process.env.STRIPE_BE_KEY);

const calculateOrderAmount = (items) => {
    //! always use the id and access the database to get the price
    console.log(items[0]._id) // 1234
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

router.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  console.log(items)
  // Create a PaymentIntent with the order amount and currency
   // Create a PaymentIntent with the order amount and currency
   const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items), 
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