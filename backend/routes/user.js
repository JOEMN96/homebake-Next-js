import { Router } from "express";
import { signUp, signIn } from "../controllers/user";

const router = Router();

router.post("/signUp", signUp);
router.post("/signIn", signIn);

export default router;

// ! Work on pwd Length !!!!!!!!!!!!!!!!!!
