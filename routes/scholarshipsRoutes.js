import express from "express";
import {
  getAllScholarshipsPublic,
  getAllScholarshipsAdmin,
  getScholarshipById,
  createScholarship,
  updateScholarship,
  deleteScholarship,
  saveScholarship,
} from "../controllers/scholarshipController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/public", getAllScholarshipsPublic);
router.get("/:id", getScholarshipById);

// Admin only
router.get("/admin/list", protect, adminOnly, getAllScholarshipsAdmin);
router.post("/", protect, adminOnly, createScholarship);
router.put("/:id", protect, adminOnly, updateScholarship);
router.delete("/:id", protect, adminOnly, deleteScholarship);

// Users (logged-in) can save
router.post("/:id/save", protect, saveScholarship);

export default router;
