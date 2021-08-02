import mongoose, { Schema } from "mongoose";
import isEmail from "validator/lib/isEmail";

const USER = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (val) {
        console.log(isEmail(val));
      },
    },
  },
  password: {
    required: true,
    type: String,
    min: 8,
  },
});
