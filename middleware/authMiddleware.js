import jwt from "jsonwebtoken";
import User from "../models/User.js";

// 🔐 Protect route (requires login)
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      return next();
    } catch (error) {
      console.error("Auth error:", error.message);
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }
  }

  return res.status(401).json({ message: "Not authorized, no token provided" });
};

// 👑 Admin only middleware
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.type === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin access only" });
  }
};
