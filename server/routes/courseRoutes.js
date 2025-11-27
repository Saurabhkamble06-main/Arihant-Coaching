import express from "express";
import Course from "../models/Course.js";

const router = express.Router();

/* ✅ Add New Course */
router.post("/add", async (req, res) => {
  try {
    const { title, description, duration, fees, category } = req.body;

    const course = await Course.create({
      title,
      description,
      duration,
      fees,
      category
    });

    res.status(201).json({
      message: "✅ Course added successfully",
      course
    });

  } catch (error) {
    console.error("Add Course Error:", error);
    res.status(500).json({ error: error.message });
  }
});

/* ✅ Get All Courses */
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    console.error("Fetch Courses Error:", error);
    res.status(500).json({ error: error.message });
  }
});

/* ✅ Delete Course */
router.delete("/:id", async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "❌ Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
