import { Router } from "express";
import {
  validateSignUp,
  validateSignIn,
  isValid,
} from "../middlewares/validators";
import {
  signUp,
  signIn,
  userProfile,
  logout,
  googleAuth,
} from "../controllers/user";
import passport from "passport";
import "../helpers/passportAuth";

import { auth } from "../middlewares/auth";

const router = Router();

router.post("/signUp", validateSignUp, isValid, signUp);
router.post("/signIn", validateSignIn, isValid, signIn);
router.get(
  "/google",
  passport.authenticate("google", {
    successRedirect: process.env.DOMAIN,
    failureRedirect: process.env.DOMAIN,
    session: false,
    scope: ["email", "profile"],
  })
);

router.get("/oauthCb", passport.authenticate("google"), googleAuth);

router.get("/profile", auth, userProfile);
router.get("/logout", auth, logout);

export default router;
