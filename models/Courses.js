import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    provider: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String }, // ✅ optional
    link: { type: String, required: true },
    image: { type: String }, // ✅ New field
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
