const signUp = (req, res) => {
  const { password, email, name } = req.body;

  if (!password && email && name) {
    return res.status(400).send("Valid data is req");
  }

  console.log(password, email, name);
  res.send("sigIn");
};

export { signUp };
