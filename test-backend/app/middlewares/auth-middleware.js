const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const db = require("../models");
const User = db.users;

const authMiddleware = async (req, res, next) => {
  let token;

  if (req.session && req.session.user) {
    token = req.session.user;
  } 
  else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { //postman
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = new mongoose.Types.ObjectId(decoded.id);
    const user = await User.findById(userId);
    
    if (!user) {
      console.error("User not found for ID:", decoded.id);
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    req.user = user;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;