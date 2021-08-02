import express from "express";
import userRouter from "./routes/user";
import mongoose from "mongoose";

const app = express();
mongoose.connect(
  "mongodb://localhost:27017/homebake",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
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

app.get("/", (req, res) => {
  res.status(200).send("Webserver is Working");
});

app.use(userRouter);

app.use((req, res) => {
  res.status(404).send();
});

app.listen(2000, () => {
  console.log("server is Running");
});
