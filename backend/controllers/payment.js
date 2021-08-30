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

export const checkoutCart = async (req, res) => {
  const ids = req.user.cart.map((item) => item.id);

  if (!ids.length > 0) {
    return res.send(400).send({ msg: "There is no items in the cart" });
  }
  const query = ids.map((id) => "_id=" + id + "&").join("");

  try {
    const { data } = await axios.get(`cakes/?${query}`);

    const paymentIntend = data.map((item) => {
      const currentItem = req.user.cart.find((item2) => item2.id == item._id);
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.title,
          },
          unit_amount: item.price * 100,
        },
        quantity: currentItem.quantity ? currentItem.quantity : 1,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: paymentIntend,
      mode: "payment",
      success_url: process.env.DOMAIN + "Sucess",
      cancel_url: process.env.FAILURE_URL + `Cart`,
    });
    res.status(200).send({ url: session.url });
  } catch (error) {
    res.status(404).send(error);
  }

  res.status(200).send();
};
