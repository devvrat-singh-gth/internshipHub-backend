import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    stipend: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    image: { type: String },

    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    // 🔑 Admin who created it
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Internship", internshipSchema);
