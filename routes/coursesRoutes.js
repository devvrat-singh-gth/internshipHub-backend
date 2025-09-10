import express from "express";
import {
  getAllCourses,
  getCourseById,
  createCourse,
  saveCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin only
router.get("/", protect, adminOnly, getAllCourses);
router.get("/:id", protect, adminOnly, getCourseById);
router.post("/", protect, adminOnly, createCourse);
router.put("/:id", protect, adminOnly, updateCourse);
router.delete("/:id", protect, adminOnly, deleteCourse);

// Users (logged-in) can save
router.post("/:id/save", protect, saveCourse);

export default router;
