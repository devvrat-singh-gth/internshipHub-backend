import mongoose from "mongoose";

const scholarshipSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    eligibility: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: String, required: true },
    amount: { type: String }, // ✅ Optional
    duration: { type: String }, // ✅ New
    link: { type: String, required: true },
    image: { type: String }, // ✅ New
  },
  { timestamps: true }
);

export default mongoose.model("Scholarship", scholarshipSchema);
