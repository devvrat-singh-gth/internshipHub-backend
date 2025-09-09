// backend/server.js

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import internshipRoutes from "./routes/internshipRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/coursesRoutes.js";
import scholarshipRoutes from "./routes/scholarshipsRoutes.js";
dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Secure CORS for production
const allowedOrigins = [
  "http://localhost:5173",
  "https://internship-hub-frontend-two.vercel.app",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/scholarships", scholarshipRoutes);
// Health check
app.get("/", (req, res) => res.send("✅ API is running..."));

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err.message);
    process.exit(1);
  });
