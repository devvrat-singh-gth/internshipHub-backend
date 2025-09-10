import Scholarship from "../models/Scholarships.js";
import User from "../models/User.js";

// Get all scholarships (only logged-in admin’s own)
export const getAllScholarships = async (req, res) => {
  try {
    const scholarships = await Scholarship.find({ createdBy: req.user.id });
    res.json(scholarships);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get scholarship by ID
export const getScholarshipById = async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);
    if (!scholarship)
      return res.status(404).json({ error: "Scholarship not found" });

    if (scholarship.createdBy.toString() !== req.user.id)
      return res.status(403).json({ error: "Not authorized" });

    res.json(scholarship);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create scholarship
export const createScholarship = async (req, res) => {
  try {
    const newScholarship = new Scholarship({
      ...req.body,
      createdBy: req.user.id,
    });
    await newScholarship.save();
    res.status(201).json(newScholarship);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Save scholarship for user
export const saveScholarship = async (req, res) => {
  try {
    const userId = req.user.id;
    const scholarshipId = req.params.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.savedScholarships.includes(scholarshipId)) {
      return res.status(400).json({ message: "Already saved" });
    }

    user.savedScholarships.push(scholarshipId);
    await user.save();

    res.json({ message: "Scholarship saved" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update scholarship
export const updateScholarship = async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);
    if (!scholarship)
      return res.status(404).json({ error: "Scholarship not found" });

    if (scholarship.createdBy.toString() !== req.user.id)
      return res.status(403).json({ error: "Not authorized" });

    const updated = await Scholarship.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete scholarship
export const deleteScholarship = async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);
    if (!scholarship)
      return res.status(404).json({ error: "Scholarship not found" });

    if (scholarship.createdBy.toString() !== req.user.id)
      return res.status(403).json({ error: "Not authorized" });

    await scholarship.deleteOne();
    res.json({ message: "Scholarship deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
