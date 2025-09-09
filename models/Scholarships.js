import mongoose from "mongoose";

const scholarshipSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    organization: { type: String }, // Add this field
    eligibility: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    image: { type: String }, // optional
    // Remove deadline, amount, duration if not used
  },
  { timestamps: true }
);

export default mongoose.model("Scholarship", scholarshipSchema);
