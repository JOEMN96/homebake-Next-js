import mongoose, { Schema } from "mongoose";
import isEmail from "validator/lib/isEmail";
import bcrypt from "bcrypt";

const USER = new Schema(
  {
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
          if (!isEmail(val)) {
            return false;
          }
        },
        message: (val) => {
          `${val.path} Must be Valid`;
        },
      },
    },
    password: {
      required: true,
      type: String,
      min: [8, "Password Must be 8 chars long"],
    },
    cart: [
      {
        name: String,
        price: Number,
        id: Number,
      },
    ],

    tokens: {
      type: [{ type: String }],
    },
    emailVerified: { type: Boolean, default: false },
    phoneNumber: { type: Number },
  },
  { String }
);

USER.pre("save", async function (next) {
  let user = this;
  if (this.isModified("password")) {
    const hasedPw = await bcrypt.hash(user.password, 10);
    user.password = hasedPw;
  }
  next();
});

USER.statics.Authenticate = async function (email, password) {
  const _user = await user.findOne({ email });
  if (!_user) {
    return false;
  }
  const pwVerified = await bcrypt.compare(password, _user.password);
  if (!pwVerified) {
    throw new Error("Password or Email is not correct");
  }
  return _user;
};

const user = mongoose.model("User", USER);

export default user;
