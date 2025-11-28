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

/* ======================================================
   ✅ FULL CORS (Local + Vercel Preview + Vercel Prod + Render)
   ====================================================== */
/* ======================================================
   ✅ FIXED CORS (Vercel Preview + Prod + Local + Render)
   ====================================================== */

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",

  // Your new Vercel Preview URL
  "https://arihant-coaching-sa9g-87e3lnaj0.vercel.app",

  // Vercel Production URL
  "https://arihant-coaching.vercel.app",

  // Render backend itself
  "https://arihant-coaching.onrender.com"
];

// Support ALL *.vercel.app preview deployments
function isVercelPreview(origin) {
  return origin && origin.endsWith(".vercel.app");
}

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin) || isVercelPreview(origin)) {
        return callback(null, true);
      }

      console.log("❌ BLOCKED ORIGIN:", origin);
      return callback(new Error("CORS Blocked"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
  })
);

app.options("*", cors());


/* ======================================================
   ✅ MIDDLEWARES
   ====================================================== */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ======================================================
   ✅ HEALTH CHECK (Render)
   ====================================================== */

app.get("/health", (req, res) => {
  res.status(200).send("✅ API Healthy & Running");
});

/* ======================================================
   ✅ ROOT ROUTE
   ====================================================== */

app.get("/", (req, res) => {
  res.send("✅ Arihant Coaching Backend is Running...");
});

/* ======================================================
   ✅ MONGO CONNECT
   ====================================================== */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

/* ======================================================
   ✅ TEST DB ROUTE
   ====================================================== */

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
    console.error("❌ Test DB Error:", error);
    res.status(500).json({ error: error.message });
  }
});

/* ======================================================
   ✅ ROUTES
   ====================================================== */

app.use("/api/auth", authRoutes);
app.use("/api/admission", admissionRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/courses", courseRoutes);

/* ======================================================
   ❌ 404 HANDLER
   ====================================================== */

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found ❌",
    path: req.originalUrl
  });
});

/* ======================================================
   ❌ GLOBAL ERROR HANDLER
   ====================================================== */

app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:", err.stack);
  res.status(500).json({
    error: "Server Error",
    message: err.message
  });
});

/* ======================================================
   🚀 START SERVER
   ====================================================== */

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
