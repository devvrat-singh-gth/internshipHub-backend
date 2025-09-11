import Scholarship from "../models/Scholarships.js";
import User from "../models/User.js";
import { getRandomImage } from "../utils/getRandomImage.js";

// Public: get all scholarships
export const getAllScholarshipsPublic = async (req, res) => {
  try {
    const scholarships = await Scholarship.find().sort({ createdAt: -1 });
    res.json(scholarships);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: get only own
export const getAllScholarshipsAdmin = async (req, res) => {
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
    res.json(scholarship);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create scholarship
export const createScholarship = async (req, res) => {
  try {
    let { image, title } = req.body;

    if (!image || image.trim() === "") {
      image = getRandomImage(title, "scholarship");
    }

    const newScholarship = new Scholarship({
      ...req.body,
      image,
      createdBy: req.user.id,
    });

    await newScholarship.save();
    res.status(201).json(newScholarship);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Save scholarship
export const saveScholarship = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.savedScholarships.includes(req.params.id)) {
      return res.status(400).json({ message: "Already saved" });
    }

    user.savedScholarships.push(req.params.id);
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

    if (scholarship.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }

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

    if (scholarship.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await scholarship.deleteOne();
    res.json({ message: "Scholarship deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
