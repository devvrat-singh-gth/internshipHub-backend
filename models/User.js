// backend/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type: { type: String, enum: ["student", "admin"], default: "student" },

    // Profile fields 👇
    education: { type: String },
    skills: [String],
    sector: { type: String },
    location: { type: String },

    savedInternships: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Internship" },
    ],
    applications: [
      {
        internship: { type: mongoose.Schema.Types.ObjectId, ref: "Internship" },
        appliedAt: { type: Date, default: Date.now },
      },
    ],

    // 🔑 Password reset fields
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
