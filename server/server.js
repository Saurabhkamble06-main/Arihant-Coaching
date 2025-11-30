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

dotenv.config();

const app = express();

// Serve uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use("/uploads", express.static(uploadsDir));

/* ======================================================
   Body Parser BEFORE CORS
   ====================================================== */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ======================================================
   CENTRAL CORS + LOGGING
   ====================================================== */
import { corsOptions, corsHeaders } from "./middleware/corsMiddleware.js";
import { requestLogger, errorLogger } from "./middleware/logger.js";

app.use(requestLogger);

app.use(cors(corsOptions));
app.use(corsHeaders);

app.options("*", corsHeaders);

/* ======================================================
   HEALTH CHECK / ROOT / MONGO / ROUTES ...
   ====================================================== */

/* ✅ Root Route */
app.get("/", (req, res) => {
  res.send("✅ Arihant Coaching Backend is Running...");
});

/* ✅ MongoDB Connect */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

/* ✅ MongoDB Test Route */
app.get("/test-db", async (req, res) => {
  try {
    const Payment = (await import("./models/Payment.js")).default;

    const payment = await Payment.create({
      studentName: "Test User",
      email: "test@gmail.com",
      course: "SSC",
      amount: 100,
      paymentId: "pay_test_001",
      status: "Paid"
    });

    res.json({
      message: "✅ MongoDB write test success",
      payment
    });

  } catch (error) {
    console.error("❌ MongoDB Write Error:", error);
    res.status(500).json({ error: error.message });
  }
});

/* ✅ API Routes */
app.use("/api/auth", authRoutes);
app.use("/api/admission", admissionRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/courses", courseRoutes);

/* ======================================================
   GLOBAL ERROR HANDLER
   ====================================================== */
app.use(errorLogger);

app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.message || err);
  const origin = req.headers.origin || "";
  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message || "Unexpected Error"
  });
});

/* ======================================================
   START SERVER
   ====================================================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
