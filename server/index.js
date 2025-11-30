import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import authRoutes from "./routes/authRoutes.js";
import admissionRoutes from "./routes/admissionRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";

dotenv.config();

const app = express();

// ===== NEW: Serve uploads & ensure folder =====
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use("/uploads", express.static(uploadsDir));

/* ======================================================
   BODY PARSER BEFORE CORS
   ====================================================== */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ======================================================
   NEW: imports of middleware
   ====================================================== */
import { corsOptions, corsHeaders } from "./middleware/corsMiddleware.js";
import { requestLogger, errorLogger } from "./middleware/logger.js";

/* ======================================================
   REQUEST LOGGING + CORS USAGE
   ====================================================== */
app.use(requestLogger);
app.use(cors(corsOptions));
app.use(corsHeaders);

// Ensure OPTIONS preflight handled quickly
app.options("*", corsHeaders);

/* ======================================================
   HEALTH CHECK
   ====================================================== */
app.get("/health", (req, res) => {
  res.status(200).send("API Healthy");
});

/* ======================================================
   ROOT ROUTE
   ====================================================== */
app.get("/", (req, res) => {
  res.send("Arihant Coaching Backend Running...");
});

/* ======================================================
   MONGO CONNECT
   ====================================================== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

/* ======================================================
   ROUTES LOADED
   ====================================================== */
app.use("/api/auth", authRoutes);
app.use("/api/admission", admissionRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/courses", courseRoutes);

/* ======================================================
   404 HANDLER
   ====================================================== */
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found ❌",
    path: req.originalUrl,
  });
});

/* ======================================================
   USE ERROR LOGGER
   ====================================================== */
app.use(errorLogger);

/* ======================================================
   GLOBAL ERROR HANDLER
   - Make sure CORS headers are present even on errors
   ====================================================== */
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.message || err);
  // mirror origin header if allowed
  const origin = req.headers.origin || "";
  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }
  res.setHeader("Access-Control-Allow-Credentials", "true");

  res.status(500).json({
    error: "Internal Server Error",
    message: err.message || "Unexpected error",
  });
});

/* ======================================================
   START SERVER
   ====================================================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
