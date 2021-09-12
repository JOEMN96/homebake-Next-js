import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import Passport from "passport";

import userRouter from "./routes/user.js";
import cartRouter from "./routes/cart.js";
import paymentRoutes from "./routes/payment.js";
dotenv.config();

const app = express();
mongoose.connect(
  `mongodb+srv://joe:${process.env.DB_PW}@cluster0.tz3q8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  function (err) {
    if (err) {
      console.log("Error Db issue");
    } else {
      console.log("Db Connected");
    }
  }
);

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_PARSER));
app.use(cors({ origin: true, optionsSuccessStatus: 200, credentials: true }));
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Expose-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  console.log(`incoming at ${req.path}`);
  next();
});
// ! Add .env Above
app.get("/", (req, res) => {
  res.status(200).send("Webserver is Working");
});
app.use(Passport.initialize());

app.use(userRouter);
app.use(cartRouter);
app.use(paymentRoutes);

app.use((req, res) => {
  res.status(404).send();
});

app.listen(process.env.PORT || 2000, () => {
  console.log("server is Running");
});
