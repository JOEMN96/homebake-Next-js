import { body, validationResult } from "express-validator";

const validateSignUp = [
  body("name").notEmpty().withMessage("User is required"),
  body("email").isEmail().withMessage("Email is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password is required")
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    .withMessage(
      "Password Must Have 1 Uppercase,1 Lowercase,1 number and a special character"
    ),
];

const validateSignIn = [
  body("email").isEmail().withMessage("Email is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password is required")
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    .withMessage(
      "Password Must Have 1 Uppercase,1 Lowercase,1 number and a special character"
    ),
];

const isValid = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  next();
};

export { validateSignUp, validateSignIn, isValid };
