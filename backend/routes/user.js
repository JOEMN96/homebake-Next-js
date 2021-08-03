import { Router } from "express";
import { signUp, signIn } from "../controllers/user";
import {
  validateSignUp,
  validateSignIn,
  isValid,
} from "../middlewares/validators";

const router = Router();

router.post("/signUp", validateSignIn, isValid, signUp);
router.post("/signIn", validateSignUp, isValid, signIn);

export default router;
