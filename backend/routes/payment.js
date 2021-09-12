import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { checkoutSingleItem, checkoutCart } from "../controllers/payment.js";
import { webhook } from "../controllers/webhooks.js";

const router = Router();

router.post("/checkoutSingleItem", auth, checkoutSingleItem);
router.post("/checkoutCart", auth, checkoutCart);
router.post("/hooks", webhook);

export default router;
