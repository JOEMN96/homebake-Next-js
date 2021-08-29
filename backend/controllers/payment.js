import Stripe from "stripe";
import axios from "../helpers/axios";
import dotenv from "dotenv";
dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export const checkoutSingleItem = async (req, res) => {
  try {
    const { id, itemType } = req.body;
    if (!id || !itemType) {
      return res.status(400).send();
    }
    const { data } = await axios.get(`${itemType}/${id}`);
    console.log(data);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: data.title,
            },
            unit_amount: data.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: process.env.DOMAIN + "Sucess",
      cancel_url: process.env.FAILURE_URL + `Cake/${id}`,
    });

    res.status(200).send({ url: session.url });
  } catch (e) {
    console.log(e.message);
    res.status(444).send();
  }

  res.status(200).send();
};
