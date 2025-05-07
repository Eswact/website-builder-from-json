const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.users;

const authControl = (req, res, next) => {
  if (req.session.user) {
    res.status(200).json({ message: "Authorized" });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

const register = async (req, res) => { 
    const { role, mail, username, password } = req.body;

    let users = await User.find();
    users = users.filter(user => user.mail === mail || user.username === username);
    if (users.length > 0) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      const user = await User.create({ role, mail, username, password: hashedPassword });
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message || "Something went wrong" });
    }
};

const login = async (req, res) => {
  const { mail, password } = req.body;

  try {
    const user = await User.findOne({ mail });
    if (!user) {
      res.status(400).json({ message: "Invalid mail or password" });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid mail or password" });
      return;
    }
    // const isConfirmed = user.mailConfirmed;
    // if (!isConfirmed) {
    //   res.status(400).json({ message: "Mail not confirmed" });
    //   return;
    // }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
    req.session.user = token;

    console.log(req.session.user);
    res.json({ token });

  } catch (err) {
    res.status(500).json({ message: err.message || "Something went wrong" });
  }
};

const logout = async (req, res) => {
  console.log(req.session.user);
  req.session = null;
  res.clearCookie('session');
  res.send('Logged out successfully');
}

module.exports = {
  authControl,
  register,
  login,
  logout,
};