import express from "express";
import { deleteAdmission, updateAdmission } from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ TEST ADMIN ROUTE
router.get("/courses", (req, res) => {
  res.json({ message: "Admin Courses API working ✅" });
});

// Existing routes
router.delete("/:id", protect, adminOnly, deleteAdmission);
router.put("/:id", protect, adminOnly, updateAdmission);

export default router;
