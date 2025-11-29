import express from "express";
import Course from "../models/Course.js";

const router = express.Router();

/* ADD COURSE */
router.post("/", async (req, res) => {
  try {
    const { title, description, duration, fees, category, limitedSeats } = req.body;

    const course = await Course.create({
      title,
      description,
      duration,
      fees,
      category,
      limitedSeats
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

/* GET ALL COURSES */
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    console.error("Fetch Courses Error:", error);
    res.status(500).json({ error: error.message });
  }
});

/* ✅ NEW — GET ONE COURSE BY ID */
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json(course);

  } catch (err) {
    console.error("Get Course Error:", err);
    res.status(500).json({ error: err.message });
  }
});

/* UPDATE COURSE */
router.put("/:id", async (req, res) => {
  try {
    const updated = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json({
      message: "✅ Course updated successfully",
      course: updated
    });

  } catch (err) {
    console.error("Update Course Error:", err);
    res.status(500).json({ error: err.message });
  }
});

/* DELETE COURSE */
router.delete("/:id", async (req, res) => {
  try {
    const removed = await Course.findByIdAndDelete(req.params.id);

    if (!removed) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json({ message: "❌ Course deleted successfully" });

  } catch (err) {
    console.error("Delete Course Error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
