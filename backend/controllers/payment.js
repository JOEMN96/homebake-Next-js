import Stripe from "stripe";
import axios from "../helpers/axios";
import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";
// import nodemailer from "nodemailer";

dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const checkoutSingleItem = async (req, res) => {
  try {
    const { id, itemType } = req.body;
    if (!id || !itemType) {
      return res.status(400).send();
    }
    const { data } = await axios.get(`${itemType}/${id}`);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_rates: ["shr_1JUZhVKvrwBJvfpSi3ZgbH17"],
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },
      customer_email: req.user.email,
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: data.title,
              images: [data.images[0].url],
            },
            unit_amount: data.price * 100,
          },
          tax_rates: ["txr_1JUZrjKvrwBJvfpSkV6BpEYE"],
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: process.env.DOMAIN + "Sucess",
      cancel_url: process.env.FAILURE_URL + `Cake/${id}`,
    });

    // ? Old Node Mailer Code

    // var transporter = nodemailer.createTransport({
    //   host: "smtp.gmail.com",
    //   auth: {
    //     user: process.env.EMAIL_ID,
    //     pass: process.env.PW,
    //   },
    // });

    // var mailOptions = {
    //   from: process.env.EMAIL_ID,
    //   to: req.user.email,
    //   subject: "Sending Email using Node.js",
    //   text: "That was easy!",
    // };
    // const mailRes = await transporter.sendMail(mailOptions);
    // console.log(mailRes);

    const msg = {
      to: process.env.EMAIL_ID,
      from: "aruljoe37@gmail.com",
      subject: "Order Sucess - CakeSpot",
      text: `Hey ${req.user.name}, Your order for Rs.${
        session.amount_total / 100
      } is Sucessfull.`,
      // html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };

    if (session.payment_status == "paid") {
      await sgMail.send(msg);
    }
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
            images: [currentItem.image],
          },
          unit_amount: item.price * 100,
        },
        tax_rates: ["txr_1JUZrjKvrwBJvfpSkV6BpEYE"],
        quantity: currentItem.quantity ? currentItem.quantity : 1,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: paymentIntend,
      shipping_rates: ["shr_1JUZhVKvrwBJvfpSi3ZgbH17"],
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },
      mode: "payment",
      success_url: process.env.DOMAIN + "Sucess",
      cancel_url: process.env.FAILURE_URL + `Cart`,
    });

    res.status(200).send({ url: session.url });
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }

  res.status(200).send();
};
