import User from "../models/user";

export const addItemToCart = async (req, res) => {
  try {
    const USER = req.user;
    const { id, image, price, title, quantity } = req.body;
    const isAlreadyAvailable = USER.cart.find((items) => items.id == id);
    if (isAlreadyAvailable) {
      const query = {
        _id: USER._id,
        "cart.id": id,
      };
      const action = {
        "cart.$.quantity": quantity + 1,
      };
      const doc = await User.findOneAndUpdate(query, action);
      if (!doc) return res.status(400).send({ msg: "Something went Wrong" });
      return res.status(200).send({ msg: "updated" });
    } else {
      USER.cart.push({ id, image, price, title, quantity });
      await USER.save();
      return res.status(201).send({ msg: "added" });
    }
  } catch (e) {
    res.status(404).send(e);
    console.log(e);
  }
};
