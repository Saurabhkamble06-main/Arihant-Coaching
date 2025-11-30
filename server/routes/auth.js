const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST /api/auth/register
// Body: { name, email, passwordHash? }
module.exports = (io) => {
	router.post("/register", async (req, res) => {
		try {
			const { name, email, passwordHash } = req.body;

			if (!name || !email) {
				return res.status(400).json({ message: "Name and email required." });
			}

			let user = await User.findOne({ email });
			if (user) {
				// Return the user instead of error to allow idempotent register / login flow
				return res.status(200).json(user);
			}

			user = new User({
				name,
				email,
				passwordHash: passwordHash || "",
			});

			await user.save();

			// Emit users-updated to connected sockets so admin UI updates automatically
			if (io) {
				try {
					const allUsers = await User.find().sort({ createdAt: -1 });
					io.emit("users-updated", allUsers);
				} catch (err) {
					// fail silently
				}
			}

			return res.status(201).json(user);
		} catch (err) {
			console.error("Register error:", err);
			return res.status(500).json({ message: "Server error." });
		}
	});

	return router;
};