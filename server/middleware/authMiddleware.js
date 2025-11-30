import jwt from "jsonwebtoken";

/* ============================================
   PROTECT MIDDLEWARE (AUTH REQUIRED)
============================================ */
export const protect = (req, res, next) => {
  let token;

  // Accept both:
  // Authorization: Bearer xxxxx
  // Authorization: xxxxx
  const authHeader = req.headers.authorization;

  if (authHeader) {
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else {
      token = authHeader.trim();
    }
  }

  if (!token) {
    return res.status(401).json({ msg: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded = { id, role, iat, exp }
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    return next();

  } catch (err) {
    console.error("JWT Verify Error:", err.message);
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};

/* ============================================
   ADMIN ONLY MIDDLEWARE
============================================ */
export const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ msg: "Not authenticated" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Access denied (Admin only)" });
  }

  next();
};
