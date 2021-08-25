import User from "../models/user";

export const addItemToCart = async (req, res) => {
  try {
    const USER = req.user;
    const { id, _id, image, price, title, count } = req.body;
    const isAlreadyAvailable = USER.cart.find((items) => items.id == id);
    if (isAlreadyAvailable) {
      //!  Count Update Code
    } else {
      USER.cart.push({ id, image, price, title, count });
      await USER.save();
      return res.status(201).send({ msg: "added" });
    }
  } catch (e) {
    console.log(e);
  }
};
