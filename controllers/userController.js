// backend/controllers/userController.js
import User from "../models/User.js";

// 📌 Get logged-in user profile
export const getMe = async (req, res) => {
  try {
    // ✅ Use req.user._id because we attach full user in authMiddleware
    const user = await User.findById(req.user._id)
      .populate("savedInternships")
      .populate("applications.internship");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📌 Update logged-in user profile
export const updateMe = async (req, res) => {
  try {
    const { education, skills, sector, location } = req.body;

    const updated = await User.findByIdAndUpdate(
      req.user._id, // ✅ fixed here too
      { education, skills, sector, location },
      { new: true }
    )
      .populate("savedInternships")
      .populate("applications.internship");

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
