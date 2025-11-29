import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Routes
import authRoutes from "./routes/authRoutes.js";
import admissionRoutes from "./routes/admissionRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";

dotenv.config();

const app = express();

/* ======================================================
   FIX #1 — BODY PARSER MUST BE BEFORE CORS
   ====================================================== */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ======================================================
   FIX #2 — UNIVERSAL CORS for Vercel + Render + Localhost
   ====================================================== */
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (origin.includes("localhost")) return callback(null, true);
      if (origin.includes("vercel.app")) return callback(null, true);
      if (origin.includes("onrender.com")) return callback(null, true);

      console.log("❌ BLOCKED ORIGIN:", origin);
      return callback(new Error("CORS Blocked"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.options("*", cors());

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
   START SERVER
   ====================================================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
