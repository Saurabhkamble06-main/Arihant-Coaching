import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Import Routes
import authRoutes from "./routes/authRoutes.js";
import admissionRoutes from "./routes/admissionRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";

dotenv.config();

const app = express();

/* ✅ Allowed Frontend Origins */
const allowedOrigins = [
  "http://localhost:5173",
  "https://arihant-coaching-u117.vercel.app",
  "https://arihant-coaching.onrender.com",
  process.env.FRONTEND_URL
];

/* ✅ CORS Logic */
const isOriginAllowed = (origin) => {
  if (!origin) return true; // allow Postman, curl etc.
  if (allowedOrigins.includes(origin)) return true;
  if (origin.includes(".onrender.com")) return true;
  return false;
};

app.use(
  cors({
    origin: (origin, callback) => {
      if (isOriginAllowed(origin)) {
        callback(null, true);
      } else {
        callback(new Error("❌ CORS blocked: " + origin));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

/* ✅ Preflight */
app.options("*", cors({ origin: true, credentials: true }));

/* ✅ Middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

/* ✅ 404 Handler */
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found ❌",
    path: req.originalUrl
  });
});

/* ✅ Global Error Handler */
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.message);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message
  });
});

/* ✅ Start Server */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
