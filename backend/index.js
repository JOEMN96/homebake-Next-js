import express from "express";
import userRouter from "./routes/user";

const app = express();

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/user", userRouter);

app.listen(2000, () => {
  console.log("server is Running");
});
