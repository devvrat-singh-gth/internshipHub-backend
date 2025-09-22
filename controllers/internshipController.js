import Internship from "../models/Internship.js";
import User from "../models/User.js";
import { getRandomImage } from "../utils/getRandomImage.js";
import natural from "natural";

// Public: get all internships
export const getInternships = async (req, res) => {
  try {
    const internships = await Internship.find().sort({ createdAt: -1 });
    res.json(internships);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: get only own
export const getAdminInternships = async (req, res) => {
  try {
    const internships = await Internship.find({ createdBy: req.user.id }).sort({
      createdAt: -1,
    });
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

// ✅ Create internship
export const createInternship = async (req, res) => {
  try {
    let { image, title, sector, skills } = req.body;

    if (!image || image.trim() === "") {
      image = getRandomImage(title, "internship");
    }

    const newInternship = new Internship({
      ...req.body,
      sector,
      skills: Array.isArray(skills) ? skills : [],
      image,
      createdBy: req.user.id,
    });

    const saved = await newInternship.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Update internship
export const updateInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) return res.status(404).json({ message: "Not found" });

    if (internship.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { sector, skills } = req.body;

    const updated = await Internship.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        sector,
        skills: Array.isArray(skills) ? skills : [],
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Delete internship
export const deleteInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) return res.status(404).json({ message: "Not found" });

    if (internship.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await internship.deleteOne();
    res.json({ message: "Internship removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Apply internship
export const applyInternship = async (req, res) => {
  try {
    const userId = req.user.id;
    const internshipId = req.params.id;

    const internship = await Internship.findById(internshipId);
    const user = await User.findById(userId);

    if (!internship || !user) {
      return res.status(404).json({ message: "Not found" });
    }

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

// Save internship
export const saveInternship = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.savedInternships.includes(req.params.id)) {
      return res.status(400).json({ message: "Already saved" });
    }

    user.savedInternships.push(req.params.id);
    await user.save();

    res.json({ message: "Internship saved" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ AI-lite Recommendation System
export const recommendInternships = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const internships = await Internship.find();
    if (internships.length === 0) {
      return res.json([]);
    }

    const userProfile = `${user.education || ""} ${user.skills.join(" ")} ${
      user.sector || ""
    } ${user.location || ""}`;

    const TfIdf = natural.TfIdf;
    const tfidf = new TfIdf();

    internships.forEach((intn, i) => {
      tfidf.addDocument(
        `${intn.title} ${intn.description} ${intn.sector || ""} ${
          intn.location || ""
        }`
      );
    });

    const scores = [];
    tfidf.tfidfs(userProfile, (i, measure) => {
      scores.push({ internship: internships[i], score: measure });
    });

    scores.sort((a, b) => b.score - a.score);
    const topRecommendations = scores.slice(0, 5).map((s) => s.internship);

    res.json(topRecommendations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
