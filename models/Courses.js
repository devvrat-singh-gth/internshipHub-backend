import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    provider: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String },
    link: { type: String, required: true },
    image: { type: String },

    // 🔑 Admin who created it
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
