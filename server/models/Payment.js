import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    studentName: String,
    email: String,
    course: String,
    amount: Number,
    paymentId: String,
    status: String
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
