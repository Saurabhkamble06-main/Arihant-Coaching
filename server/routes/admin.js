const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET /api/admin/users — returns all users sorted newest first
router.get("/users", async (req, res) => {
	try {
		const users = await User.find().sort({ createdAt: -1 });
		return res.status(200).json(users);
	} catch (err) {
		console.error("Admin users fetch error:", err);
		return res.status(500).json({ message: "Server error." });
	}
});

module.exports = router;
