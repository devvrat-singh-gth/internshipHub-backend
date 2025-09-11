import mongoose from "mongoose";

const scholarshipSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    organization: { type: String },
    eligibility: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    image: {
      type: String,
      default: "https://source.unsplash.com/800x600/?scholarship,education",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Scholarship", scholarshipSchema);
