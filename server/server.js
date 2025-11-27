import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Import Routes
import authRoutes from "./routes/authRoutes.js";
import admissionRoutes from "./routes/admissionRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";   // 👈 Courses API

dotenv.config();
const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Root Test Route
app.get("/", (req, res) => {
  res.send("✅ Arihant Coaching Backend is Running...");
});

// ✅ MongoDB Test Route
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

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/admission", admissionRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/courses", courseRoutes);   // ✅ COURSE ROUTE

// ✅ 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found ❌",
    path: req.originalUrl
  });
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message
  });
});

export default app;
