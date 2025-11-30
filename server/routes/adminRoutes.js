import express from "express";
import { deleteAdmission, updateAdmission } from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// ✅ TEST ADMIN ROUTE
router.get("/courses", (req, res) => {
  res.json({ message: "Admin Courses API working ✅" });
});

// ✅ GET ALL USERS (protected, paginated, searchable)
router.get("/users", protect, adminOnly, async (req, res) => {
  try {
    const q = req.query.q ? req.query.q.trim() : "";
    const page = Math.max(1, parseInt(req.query.page || "1", 10));
    const limit = Math.max(1, parseInt(req.query.limit || "10", 10));

    const filter = q
      ? {
          $or: [
            { name: { $regex: q, $options: "i" } },
            { email: { $regex: q, $options: "i" } },
          ],
        }
      : {};

    const total = await User.countDocuments(filter);
    const pages = Math.ceil(total / limit);
    const users = await User.find(filter)
      .select("-password -__v")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({ users, total, page, pages });
  } catch (err) {
    console.error("Admin users fetch error:", err);
    res.status(500).json({ message: "Server error." });
  }
});

// Existing routes
router.delete("/:id", protect, adminOnly, deleteAdmission);
router.put("/:id", protect, adminOnly, updateAdmission);

export default router;
