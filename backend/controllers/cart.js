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
        "cart.$.quantity": isAlreadyAvailable.quantity + 1,
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
  }
};

export const removeItemFromCart = async (req, res) => {
  try {
    const { id, removeAll } = req.body;
    const user = req.user;
    console.log(id);
    const removalItem = user.cart.find((item) => item.id == id);
    if (removeAll) {
      user.cart = user.cart.filter((item) => item.id !== removalItem.id);
      await user.save();
      return res.status(200).send({ msg: "All items are Removed" });
    }
    const query = {
      _id: user._id,
      "cart.id": id,
    };
    const action = {
      "cart.$.quantity": removalItem.quantity - 1,
    };

    if (removalItem.quantity > 1) {
      const user = await User.findOneAndUpdate(query, action);
      await user.save();
      return res.status(200).send({ msg: "removed" });
    } else {
      user.cart = user.cart.filter((item) => item.id !== id);
      await user.save();
      return res.status(200).send({ msg: "Removed" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(404).send({ msg: "Something Went Wrong" });
  }
};

export const cart = async (req, res) => {
  res.status(200).send(req.user.cart);
};
