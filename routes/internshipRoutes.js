import express from "express";
import {
  createInternship,
  getInternships,
  getAdminInternships,
  getInternshipById,
  updateInternship,
  deleteInternship,
  applyInternship,
  saveInternship,
  recommendInternships,
} from "../controllers/internshipController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/public", getInternships);
router.get("/:id", getInternshipById);

// User (logged-in)
router.get("/recommendations", protect, recommendInternships);
router.post("/:id/apply", protect, applyInternship);
router.post("/:id/save", protect, saveInternship);

// Admin only
router.get("/admin/list", protect, adminOnly, getAdminInternships);
router.post("/", protect, adminOnly, createInternship);
router.put("/:id", protect, adminOnly, updateInternship);
router.delete("/:id", protect, adminOnly, deleteInternship);

export default router;
