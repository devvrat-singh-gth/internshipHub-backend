import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    stipend: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    image: {
      type: String,
      default: "https://source.unsplash.com/800x600/?internship,job,career",
    },

    // 🆕 Added fields for AI matching
    sector: { type: String }, // e.g. IT, Finance, Marketing
    skills: [String], // e.g. ["React", "Python"]

    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Internship", internshipSchema);
