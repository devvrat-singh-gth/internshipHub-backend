import Course from "../models/Courses.js";

// Get all courses (only by logged-in admin)
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ createdBy: req.user.id });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get course by ID
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });

    if (course.createdBy.toString() !== req.user.id)
      return res.status(403).json({ error: "Not authorized" });

    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new course
export const createCourse = async (req, res) => {
  try {
    const newCourse = new Course({
      ...req.body,
      createdBy: req.user.id,
    });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// courseController.js
export const saveCourse = async (req, res) => {
  try {
    const userId = req.user.id;
    const courseId = req.params.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.savedCourses.includes(courseId)) {
      return res.status(400).json({ message: "Already saved" });
    }

    user.savedCourses.push(courseId);
    await user.save();

    res.json({ message: "Course saved" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a course
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

// Delete a course
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
