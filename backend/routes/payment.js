import { Router } from "express";
import { auth } from "../middlewares/auth";
import { checkoutSingleItem, checkoutCart } from "../controllers/payment";

const router = Router();

router.post("/checkoutSingleItem", auth, checkoutSingleItem);
router.post("/checkoutCart", auth, checkoutCart);

export default router;
