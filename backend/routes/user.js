import { Router } from "express";
import { signIn } from "../controllers/user";

const router = Router();

router.post("/signIn", signIn);

export default router;
