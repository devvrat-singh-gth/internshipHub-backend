import Internship from "../models/Internship.js";
import User from "../models/User.js";

// Get all internships (only by logged-in admin)
export const getInternships = async (req, res) => {
  try {
    const internships = await Internship.find({ createdBy: req.user.id });
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

    if (internship.createdBy.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    res.json(internship);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create internship
export const createInternship = async (req, res) => {
  try {
    const newInternship = new Internship({
      ...req.body,
      createdBy: req.user.id, // ✅
    });
    const saved = await newInternship.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update internship
export const updateInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) return res.status(404).json({ message: "Not found" });

    if (internship.createdBy.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    const updated = await Internship.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete internship
export const deleteInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) return res.status(404).json({ message: "Not found" });

    if (internship.createdBy.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    await internship.deleteOne();
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

// ✅ Recommend internships
export const recommendInternships = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    const query = {
      $or: [
        { sector: user.sector },
        { skills: { $in: user.skills } },
        { location: user.location },
      ],
    };

    const recommendations = await Internship.find(query).limit(10);
    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
