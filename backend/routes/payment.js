import { Router } from "express";
import { auth } from "../middlewares/auth";
import { checkoutSingleItem, checkoutCart } from "../controllers/payment";
import { webhook } from "../controllers/webhooks";

const router = Router();

router.post("/checkoutSingleItem", auth, checkoutSingleItem);
router.post("/checkoutCart", auth, checkoutCart);
router.post("/hooks", webhook);

export default router;
