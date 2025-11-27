import express from "express";
import Payment from "../models/Payment.js";
import { createOrder, verifyPayment } from "../controllers/paymentController.js";

const router = express.Router();

// ✅ TEST ROUTE FOR BROWSER
router.get("/save", (req, res) => {
  res.send("✅ Payment Save Route Working");
});

// ✅ SAVE PAYMENT (POST)
router.post("/save", async (req, res) => {
  try {
    console.log("📥 Incoming payment data:", req.body);

    const {
      studentName,
      email,
      course,
      amount,
      paymentId,
      status
    } = req.body;

    const payment = new Payment({
      studentName,
      email,
      course,
      amount,
      paymentId,
      status,
    });

    await payment.save();

    console.log("✅ Payment saved successfully in MongoDB");

    res.status(201).json({
      message: "Payment saved successfully ✅",
      payment,
    });

  } catch (error) {
    console.error("❌ Save Payment Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ GET ALL PAYMENTS (for Admin Dashboard)
router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    console.error("❌ Fetch Payments Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ CREATE RAZORPAY ORDER
router.post("/order", createOrder);

// ✅ VERIFY PAYMENT
router.post("/verify", verifyPayment);

// ✅ EXPORT ROUTER
export default router;
