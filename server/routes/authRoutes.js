import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ===========================
   TEST ROUTE
=========================== */
router.get("/", (req, res) => {
  res.json({ message: "Auth API is working ✅" });
});

/* ===========================
   REGISTER
=========================== */
router.post("/register", async (req, res) => {
  try {
    let { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ msg: "All fields are required" });

    email = email.toLowerCase().trim();

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ msg: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role: "user",
    });

    res.json({
      msg: "Registered successfully ✅",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Register Error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

/* ===========================
   LOGIN
=========================== */
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ msg: "Email & password required" });

    email = email.toLowerCase().trim();

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Wrong password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      role: user.role,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

/* ===========================
   GET ALL USERS (ADMIN)
   Support: ?q=search&page=1&limit=10
=========================== */
// Add a shared handler so we can expose multiple paths (e.g. '/all-users', '/admin/users', '/users')
async function handleGetUsers(req, res) {
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
    console.error("Users Fetch Error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}

// Existing route kept but now uses the shared handler
router.get("/all-users", protect, adminOnly, handleGetUsers);

// Add alias routes to avoid 404 from frontend expecting /api/admin/users
router.get("/admin/users", protect, adminOnly, handleGetUsers);

// Add another friendly route alias for clients using /users
router.get("/users", protect, adminOnly, handleGetUsers);

export default router;

