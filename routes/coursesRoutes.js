import express from "express";
import {
  getAllCoursesPublic,
  getAllCoursesAdmin,
  getCourseById,
  createCourse,
  saveCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/public", getAllCoursesPublic);
router.get("/:id", getCourseById);

// Admin only
router.get("/admin/list", protect, adminOnly, getAllCoursesAdmin);
router.post("/", protect, adminOnly, createCourse);
router.put("/:id", protect, adminOnly, updateCourse);
router.delete("/:id", protect, adminOnly, deleteCourse);

// Users (logged-in) can save
router.post("/:id/save", protect, saveCourse);

export default router;
