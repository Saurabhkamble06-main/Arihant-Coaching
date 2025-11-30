import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Import Routes
import authRoutes from "./routes/authRoutes.js";
import admissionRoutes from "./routes/admissionRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";

/* ======================================================
   IMPORT MIDDLEWARE
   ====================================================== */
import { corsOptions, corsHeaders, ensureCors } from "./middleware/corsMiddleware.js";
import { requestLogger, errorLogger } from "./middleware/logger.js";

dotenv.config();

const app = express();

/* ======================================================
   UPLOADS FOLDER SETUP
   ====================================================== */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use("/uploads", express.static(uploadsDir));

/* ======================================================
   BODY PARSER (BEFORE CORS)
   ====================================================== */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ======================================================
   LOGGING + CORS
   ====================================================== */
app.use(requestLogger);
app.use(cors(corsOptions));
app.use(corsHeaders);
app.use(ensureCors);

// Ensure OPTIONS preflight handled by the cors library
app.options("*", cors(corsOptions));

/* ======================================================
   BASIC ROUTES
   ====================================================== */
app.get("/", (req, res) => {
  res.send("✅ Arihant Coaching Backend is Running...");
});

app.get("/health", (req, res) => {
  res.status(200).send("API Healthy");
});

/* ======================================================
   MONGO CONNECT
   ====================================================== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

/* ======================================================
   LOAD API ROUTES
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
   ERROR LOGGER + GLOBAL ERROR HANDLER
   ====================================================== */
app.use(errorLogger);

app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.message || err);

  const origin = req.headers.origin || "*";
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Vary", "Origin");

  res.status(500).json({
    error: "Internal Server Error",
    message: err.message || "Unexpected Error",
  });
});

/* ======================================================
   START SERVER
   ====================================================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
