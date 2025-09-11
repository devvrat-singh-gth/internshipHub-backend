import Course from "../models/Courses.js";
import User from "../models/User.js";

// Public: get all courses
export const getAllCoursesPublic = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: get only own courses
export const getAllCoursesAdmin = async (req, res) => {
  try {
    const courses = await Course.find({ createdBy: req.user.id });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single course (anyone can view)
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });

    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create course (admin only)
export const createCourse = async (req, res) => {
  try {
    let { image, title } = req.body;

    // Auto fallback if no image provided
    if (!image || image.trim() === "") {
      image = `https://picsum.photos/seed/${encodeURIComponent(
        title
      )}/800/600.jpg`;
    }

    const newCourse = new Course({
      ...req.body,
      image,
      createdBy: req.user.id,
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Save course for student
export const saveCourse = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.savedCourses.includes(req.params.id)) {
      return res.status(400).json({ message: "Already saved" });
    }

    user.savedCourses.push(req.params.id);
    await user.save();

    res.json({ message: "Course saved" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update course (admin only)
export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });

    if (course.createdBy.toString() !== req.user.id)
      return res.status(403).json({ error: "Not authorized" });

    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete course (admin only)
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });

    if (course.createdBy.toString() !== req.user.id)
      return res.status(403).json({ error: "Not authorized" });

    await course.deleteOne();
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
