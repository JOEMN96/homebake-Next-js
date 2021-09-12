import User from "../models/user";
import axios from "../helpers/axios";

export const addItemToCart = async (req, res) => {
  try {
    const USER = req.user;
    const { id, image, title } = req.body;
    const isAlreadyAvailable = USER.cart.find((items) => items.id == id);
    if (isAlreadyAvailable) {
      const query = {
        _id: USER._id,
        "cart.id": id,
      };
      const action = {
        "cart.$.quantity": isAlreadyAvailable.quantity
          ? isAlreadyAvailable.quantity + 1
          : 2,
      };
      const doc = await User.findOneAndUpdate(query, action, { new: true });
      await doc.save();
      if (!doc) return res.status(400).send({ msg: "Something went Wrong" });
      return res.status(200).send({ items: [...doc.cart] });
    } else {
      const result = await axios.get(req.body.type + "/" + id);
      const price = result.data.price;
      USER.cart.push({ id, image, price, title, quantity: 1 });
      await USER.save();
      return res.status(201).send({ items: [...USER.cart] });
    }
  } catch (e) {
    res.status(404).send(e);
  }
};

export const removeItemFromCart = async (req, res) => {
  try {
    const { id, removeAll } = req.body;
    const user = req.user;
    const removalItem = user.cart.find((item) => item.id == id);
    if (removeAll) {
      user.cart = user.cart.filter((item) => item.id !== removalItem.id);
      await user.save();
      return res.status(200).send({ items: [...user.cart] });
    }
    const query = {
      _id: user._id,
      "cart.id": id,
    };
    const action = {
      "cart.$.quantity": removalItem.quantity - 1,
    };

    if (removalItem.quantity > 1) {
      const user = await User.findOneAndUpdate(query, action, { new: true });
      await user.save();
      return res.status(200).send({ items: [...user.cart] });
    } else {
      user.cart = user.cart.filter((item) => item.id !== id);
      await user.save();
      return res.status(200).send({ items: [...user.cart] });
    }
  } catch (error) {
    return res.status(404).send({ msg: "Something Went Wrong" });
  }
};

export const cart = async (req, res) => {
  res.status(200).send(req.user.cart);
};

export const clearCart = async (req, res) => {
  try {
    req.user.cart = [];
    await req.user.save();
    res.status(200).send();
  } catch (error) {
    res.status(400).send();
  }
};
