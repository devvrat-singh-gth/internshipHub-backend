// backend/controllers/internshipController.js
import Internship from "../models/Internship.js";

// ✅ Create Internship
export const createInternship = async (req, res) => {
  try {
    const { title, company, location, duration, description } = req.body;

    if (!title || !company || !location || !duration || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const internship = new Internship({
      title,
      company,
      location,
      duration,
      description,
    });

    await internship.save();
    res.status(201).json(internship);
  } catch (error) {
    console.error("Error creating internship:", error);
    res.status(500).json({ message: "Server error" });
  }
};
