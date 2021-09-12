import passport from "passport";
import dotenv from "dotenv";
import GoogleStrategy from "passport-google-oauth2";
import USER from "../models/user.js";

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:2000/oauthCb",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      const { email, displayName } = profile;
      const user = await USER.findOne({ email });
      if (user) {
        done(null, user);
      } else {
        const user = await new USER({
          password: process.env.SUPER_SEC_PW_FOR_GOOGLE,
          email,
          name: displayName,
        });
        done(null, user);
      }
    }
  )
);
