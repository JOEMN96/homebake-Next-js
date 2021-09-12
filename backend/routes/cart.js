import { auth } from "../middlewares/auth.js";
import { Router } from "express";
import {
  addItemToCart,
  removeItemFromCart,
  cart,
  clearCart,
} from "../controllers/cart.js";

const router = Router();

router.post("/addItem", auth, addItemToCart);
router.post("/removeItem", auth, removeItemFromCart);
router.get("/cart", auth, cart);
router.delete("/clearCart", auth, clearCart);

export default router;
