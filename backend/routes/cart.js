import { auth } from "../middlewares/auth";
import { Router } from "express";
import { addItemToCart } from "../controllers/cart";

const router = Router();

router.post("/addItem", auth, addItemToCart);

export default router;
