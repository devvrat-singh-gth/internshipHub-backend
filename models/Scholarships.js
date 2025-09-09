// backend/models/Scholarship.js
import mongoose from "mongoose";

const scholarshipSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    eligibility: { type: String, required: true },
    deadline: { type: String, required: true },
    link: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Scholarship", scholarshipSchema);
