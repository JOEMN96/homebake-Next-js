import USER from "../models/user";

const signUp = async (req, res) => {
  const { password, email, name } = req.body;

  const alreadyRegUser = await USER.findOne({ email });
  if (alreadyRegUser) {
    return res.status(400).send({ msg: "Email is already taken" });
  }

  try {
    const _user = new USER({ password, email, name });
    await _user.save();
    const token = await _user.generateJWT();
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: true,
      signed: true,
      secure: false,
    });
    return res.status(201).send(_user);
  } catch (error) {
    return res.status(400).send({ err: error.message });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await USER.Authenticate(email, password);
    if (!user) {
      return res.status(401).send({ err: "Unable to find User " });
    }
    const token = await user.generateJWT();

    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: true,
      signed: true,
      secure: false,
    });
    // ! Change to true on production

    res.status(200).send(user);
  } catch (error) {
    console.log(error.stack);
    res.status(401).send({ err: error.message });
  }
};

const userProfile = async (req, res) => {
  res.status(200).send(req.user);
};

const logout = async (req, res) => {
  const token = req.signedCookies.jwt;
  req.user.tokens = req.user.tokens.filter((item) => {
    return item !== token;
  });
  await req.user.save();
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(307).redirect("/");
};

export { signUp, signIn, userProfile, logout };
