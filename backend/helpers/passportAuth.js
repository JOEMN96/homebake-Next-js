import passport from "passport";
import dotenv from "dotenv";
var GoogleStrategy = require("passport-google-oauth2").Strategy;
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.DOMAIN + "oauthCb",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //     return done(err, user);
      //   });
      console.log(err);
      return done(err, user);
    }
  )
);
