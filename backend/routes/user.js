import { Router } from "express";
import { signUp } from "../controllers/user";

const router = Router();

router.post("/signUp", signUp);

export default router;
