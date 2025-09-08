// middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ✅ Middleware to authenticate any logged-in user
const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Fetch full user from DB (not just token info)
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    req.user = user; // Attach full user to request
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    res.status(401).json({ msg: "Invalid or expired token" });
  }
};

// ✅ Middleware to restrict route to only admin users
const authenticateAdmin = async (req, res, next) => {
  await authenticateUser(req, res, async () => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied: Admins only" });
    }
    next();
  });
};

module.exports = { authenticateUser, authenticateAdmin };
