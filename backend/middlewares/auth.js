import jwt from "jsonwebtoken";
import USER from "../models/user";

export const auth = async (req, res, next) => {
  const token = req.signedCookies.jwt;
  console.log(token);
  if (!token) return res.status(401).send({ msg: "user is not Authenticated" });

  try {
    const { _id } = jwt.verify(token, "SECRETHERE");
    const user = await USER.findById({ _id });
    if (!user) {
      return res.status(401).send({ msg: "UnAuthorized" });
    }
    req.user = user;
  } catch (error) {
    return res.status(401).send({ msg: "UnAuthorized" });
  }

  next();
};
