import Scholarship from "../models/Scholarships.js";

// @desc Get all scholarships
export const getAllScholarships = async (req, res) => {
  try {
    const scholarships = await Scholarship.find();
    res.json(scholarships);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Get scholarship by ID
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

// @desc Add a new scholarship
export const createScholarship = async (req, res) => {
  // After
  const { title, eligibility, description, link } = req.body;

  if (!title || !eligibility || !description || !link) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    const newScholarship = new Scholarship(req.body);
    await newScholarship.save();
    res.status(201).json(newScholarship);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Update a scholarship
export const updateScholarship = async (req, res) => {
  try {
    const updated = await Scholarship.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ error: "Scholarship not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// @desc Delete a scholarship
export const deleteScholarship = async (req, res) => {
  try {
    const deleted = await Scholarship.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ error: "Scholarship not found" });
    res.json({ message: "Scholarship deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
