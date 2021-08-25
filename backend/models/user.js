import mongoose, { Schema } from "mongoose";
import isEmail from "validator/lib/isEmail";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
        title: String,
        price: Number,
        id: String,
        count: Number,
        image: String,
      },
    ],
    avatar: {
      type: String,
    },
    tokens: [{ type: String }],
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

USER.methods.generateJWT = async function () {
  const token = jwt.sign({ _id: this._id }, "SECRETHERE", {
    expiresIn: "1 day",
  });
  this.tokens.push(token);
  await this.save();
  return token;
};

USER.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  delete obj.phoneNumber;
  delete obj.tokens;
  return obj;
};

const user = mongoose.model("User", USER);

export default user;
