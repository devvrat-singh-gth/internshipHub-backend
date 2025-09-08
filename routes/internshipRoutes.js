import express from "express";
import {
  createInternship,
  getInternships,
  getInternshipById,
  updateInternship,
  deleteInternship,
  applyInternship,
  saveInternship,
  recommendInternships,
} from "../controllers/internshipController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js"; // ✅ this works now

const router = express.Router();

// Public
router.get("/", getInternships);
router.get("/recommendations", protect, recommendInternships); // order fixed
router.get("/:id", getInternshipById);

// User (logged-in)
router.post("/:id/apply", protect, applyInternship);
router.post("/:id/save", protect, saveInternship);

// Admin only
router.post("/", protect, adminOnly, createInternship);
router.put("/:id", protect, adminOnly, updateInternship);
router.delete("/:id", protect, adminOnly, deleteInternship);

export default router;
