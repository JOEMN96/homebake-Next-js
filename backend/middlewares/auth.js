import jwt from "jsonwebtoken";
import USER from "../models/user";

export const auth = async (req, res, next) => {
  const cookie = req.cookies.jwt;
  if (!cookie)
    return res.status(401).send({ msg: "user is not Authenticated" });
  const { _id } = jwt.verify(cookie, "SECRETHERE");
  const user = await USER.findById(_id);
  req.user = user;
  next();
};
