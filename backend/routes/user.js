import { Router } from "express";
import { signUp, signIn } from "../controllers/user";
import {
  validateSignUp,
  validateSignIn,
  isValid,
} from "../middlewares/validators";
import { auth } from "../middlewares/auth";

const router = Router();

router.post("/signUp", validateSignIn, isValid, signUp);
router.post("/signIn", auth, validateSignUp, isValid, signIn);

export default router;
