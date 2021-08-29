import { Router } from "express";
import { auth } from "../middlewares/auth";
import { checkoutSingleItem } from "../controllers/payment";

const router = Router();

router.post("/checkoutSingleItem", auth, checkoutSingleItem);

export default router;
