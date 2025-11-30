import express from "express";
import Course from "../models/Course.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ============================
   ADD COURSE (ADMIN)
============================ */
router.post("/", protect, adminOnly, async (req, res) => {
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
      message: "Course added successfully",
      course
    });

  } catch (error) {
    console.error("Add Course Error:", error);
    res.status(500).json({ error: error.message });
  }
});

/* ============================
   GET ALL COURSES (PUBLIC)
============================ */
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);

  } catch (error) {
    console.error("Fetch Courses Error:", error);
    res.status(500).json({ error: error.message });
  }
});

/* ============================
   GET ONE COURSE (PUBLIC)
============================ */
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

/* ============================
   UPDATE COURSE (ADMIN)
============================ */
router.put("/:id", protect, adminOnly, async (req, res) => {
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
      message: "Course updated successfully",
      course: updated
    });

  } catch (err) {
    console.error("Update Course Error:", err);
    res.status(500).json({ error: err.message });
  }
});

/* ============================
   DELETE COURSE (ADMIN)
============================ */
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const removed = await Course.findByIdAndDelete(req.params.id);

    if (!removed) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json({ message: "Course deleted successfully" });

  } catch (err) {
    console.error("Delete Course Error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
