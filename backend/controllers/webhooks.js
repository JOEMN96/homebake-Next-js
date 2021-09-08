import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const webhook = async (request, response) => {
  const event = request.body;
  switch (event.type) {
    case "charge.succeeded":
      const data = event.data.object;
      console.log(data);
      console.log("Charge was sucess!");

      const msg = {
        to: process.env.EMAIL_ID,
        from: "aruljoe37@gmail.com",
        subject: `New Order from - ${data.billing_details.address.name}`,
        text: `Hey New Order ${data.billing_details.address.name}, Please Check the Stripe Ac`,
      };
      await sgMail.send(msg);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.json({ received: true });
};
