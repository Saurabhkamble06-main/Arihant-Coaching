import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;

// Safety check (very important for Render)
if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
  console.error("❌ Razorpay keys are missing in environment variables!");
  console.error("Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in Render.");
  process.exit(1);   // Stop server if keys missing
}

const razorpayInstance = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

export default razorpayInstance;
