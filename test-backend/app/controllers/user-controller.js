// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const db = require("../models");
// const User = db.users;

// const login = async (req, res) => {
//   const { mail, password } = req.body;

//   try {
//     const user = await User.findOne({ mail });
//     if (!user) {
//       res.status(400).json({ message: "Invalid mail or password" });
//       return;
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       res.status(400).json({ message: "Invalid mail or password" });
//       return;
//     }
//     const isConfirmed = user.mailConfirmed;
//     if (!isConfirmed) {
//       res.status(400).json({ message: "Mail not confirmed" });
//       return;
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
//     req.session.user = token;

//     res.json({ token });

//   } catch (err) {
//     res.status(500).json({ message: err.message || "Something went wrong" });
//   }
// };

// const logout = async (req, res) => {
//   req.session = null;
//   res.clearCookie('session');
//   res.send('Logged out successfully');
// }

// module.exports = {
//   login,
//   logout,
// };