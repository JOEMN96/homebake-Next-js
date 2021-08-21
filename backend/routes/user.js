import { Router } from "express";
import {
  validateSignUp,
  validateSignIn,
  isValid,
} from "../middlewares/validators";
import { signUp, signIn, userProfile, logout } from "../controllers/user";

import { auth } from "../middlewares/auth";

const router = Router();

router.post("/signUp", validateSignUp, isValid, signUp);
router.post("/signIn", validateSignIn, isValid, signIn);
router.get("/profile", auth, userProfile);
router.get("/logout", auth, logout);

export default router;
