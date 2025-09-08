import Internship from "../models/Internship.js";
import User from "../models/User.js";

// Get all internships
export const getInternships = async (req, res) => {
  try {
    const internships = await Internship.find();
    res.json(internships);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single internship
export const getInternshipById = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) return res.status(404).json({ message: "Not found" });
    res.json(internship);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create internship
export const createInternship = async (req, res) => {
  try {
    const newInternship = new Internship(req.body);
    const saved = await newInternship.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update internship
export const updateInternship = async (req, res) => {
  try {
    const updated = await Internship.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete internship
export const deleteInternship = async (req, res) => {
  try {
    await Internship.findByIdAndDelete(req.params.id);
    res.json({ message: "Internship removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Apply to internship
export const applyInternship = async (req, res) => {
  try {
    const userId = req.user.id;
    const internshipId = req.params.id;

    const internship = await Internship.findById(internshipId);
    const user = await User.findById(userId);

    if (!internship || !user)
      return res.status(404).json({ message: "Not found" });

    // Prevent duplicate applications
    if (internship.applicants.includes(userId)) {
      return res.status(400).json({ message: "Already applied" });
    }

    internship.applicants.push(userId);
    user.applications.push({ internship: internshipId });

    await internship.save();
    await user.save();

    res.json({ message: "Applied successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Save internship
export const saveInternship = async (req, res) => {
  try {
    const userId = req.user.id;
    const internshipId = req.params.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.savedInternships.includes(internshipId)) {
      return res.status(400).json({ message: "Already saved" });
    }

    user.savedInternships.push(internshipId);
    await user.save();

    res.json({ message: "Internship saved" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const recommendInternships = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Simple matching: sector or required skills
    const query = {
      $or: [
        { sector: user.sector }, // Match by preferred sector
        { skills: { $in: user.skills } }, // Match if internship requires one of user skills
        { location: user.location }, // Optional: match preferred location
      ],
    };

    const recommendations = await Internship.find(query).limit(10);
    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
