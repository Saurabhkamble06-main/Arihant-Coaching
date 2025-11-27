import express from "express";
import { getAllAdmissions } from "../controllers/admissionController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, adminOnly, getAllAdmissions);

export default router;
