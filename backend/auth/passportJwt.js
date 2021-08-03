import passport from "passport";
import JwtCookieComboStrategy from "passport-jwt-cookiecombo";
import USER from "../models/user";
import jwt from "jsonwebtoken";

const cookieExtractor = (req) => {
  let jwt = null;

  if (req && req.cookies) {
    jwt = req.cookies["jwt"];
  }

  return jwt;
};
passport.use(
  new JwtCookieComboStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrPublicKey: "SECRETHERE",
    },
    async (payload, done) => {
      console.log("fires");
      done(null, "JOE");
    }
  )
);
