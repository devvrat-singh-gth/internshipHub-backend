import express from "express";
import {
  getAllScholarships,
  getScholarshipById,
  createScholarship,
  updateScholarship,
  deleteScholarship,
} from "../controllers/scholarshipController.js";

const router = express.Router();

router.get("/", getAllScholarships);
router.get("/:id", getScholarshipById);
router.post("/", createScholarship);
router.put("/:id", updateScholarship);
router.delete("/:id", deleteScholarship);

export default router;
