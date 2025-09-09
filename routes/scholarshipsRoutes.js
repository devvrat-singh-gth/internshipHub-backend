// backend/routes/scholarshipRoutes.js
import express from "express";
import Scholarship from "../models/Scholarships.js";

const router = express.Router();

// Get all scholarships
router.get("/", async (req, res) => {
  try {
    const scholarships = await Scholarship.find();
    res.json(scholarships);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new scholarship
router.post("/", async (req, res) => {
  try {
    const newScholarship = new Scholarship(req.body);
    await newScholarship.save();
    res.status(201).json(newScholarship);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
