const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login a user
const loginUser = async (req, res) => {
  const { email, password, imgUrl } = req.body;

  try {
    const user = await User.login(email, password, imgUrl);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token, imgUrl });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { email, password, imgUrl } = req.body;

  try {
    const user = await User.signup(email, password, imgUrl);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token, imgUrl });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser, getUserById };
