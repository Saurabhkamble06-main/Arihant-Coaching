import crypto from "crypto";
import razorpayInstance from "../config/razorpay.js";
import Admission from "../models/Admission.js";
import { generateAdmissionPDF } from "../utils/generatePDF.js";

export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpayInstance.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Payment initiation failed ❌" });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, admissionData } = req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSign === razorpay_signature) {
      const newAdmission = new Admission({
        ...admissionData,
        paymentId: razorpay_payment_id,
        paymentStatus: "paid",
      });
      const saved = await newAdmission.save();

      const pdfPath = generateAdmissionPDF(saved);
      saved.pdfLink = pdfPath;
      await saved.save();

      res.json({ msg: "Payment successful ✅", saved });
    } else {
      res.status(400).json({ msg: "Payment verification failed" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
