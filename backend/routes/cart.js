import { auth } from "../middlewares/auth";
import { Router } from "express";
import {
  addItemToCart,
  removeItemFromCart,
  cart,
  clearCart,
} from "../controllers/cart";

const router = Router();

router.post("/addItem", auth, addItemToCart);
router.post("/removeItem", auth, removeItemFromCart);
router.get("/cart", auth, cart);
router.delete("/clearCart", auth, clearCart);

export default router;
