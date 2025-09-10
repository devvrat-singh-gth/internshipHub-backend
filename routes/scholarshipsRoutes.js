import express from "express";
import {
  getAllScholarships,
  getScholarshipById,
  createScholarship,
  updateScholarship,
  deleteScholarship,
  saveScholarship,
} from "../controllers/scholarshipController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin only
router.get("/", protect, adminOnly, getAllScholarships);
router.get("/:id", protect, adminOnly, getScholarshipById);
router.post("/", protect, adminOnly, createScholarship);
router.put("/:id", protect, adminOnly, updateScholarship);
router.delete("/:id", protect, adminOnly, deleteScholarship);

// Users (logged-in) can save
router.post("/:id/save", protect, saveScholarship);

export default router;
