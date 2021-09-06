// import dotenv from "dotenv";
// dotenv.config();

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const webhook = (request, response) => {
  const event = request.body;
  console.log("fired");
  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      console.log("PaymentIntent was successful!");
      console.log(paymentIntent);
      break;
    case "payment_intent.created":
      const paymentMethod = event.data.object;
      console.log("PaymentMethod was created!");
      break;
    case "charge.succeeded":
      const data = event.data.object;
      console.log(data);
      console.log("chage was sucess!");
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.json({ received: true });
};
