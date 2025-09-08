// backend/routes/userRoutes.js
import express from "express";
import { getMe, updateMe } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 📌 Get logged-in user profile
router.get("/me", protect, getMe);

// 📌 Update logged-in user profile
router.put("/me", protect, updateMe);

export default router;
