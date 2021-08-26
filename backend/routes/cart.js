import { auth } from "../middlewares/auth";
import { Router } from "express";
import { addItemToCart, removeItemFromCart } from "../controllers/cart";

const router = Router();

router.post("/addItem", auth, addItemToCart);
router.post("/removeItem", auth, removeItemFromCart);

export default router;
