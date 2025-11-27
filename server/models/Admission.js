import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema({
  studentName: String,
  standard: String,
  medium: String,
  contact: String,
  email: String,
  paymentId: String,
  paymentStatus: { type: String, default: "pending" },
  pdfLink: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Admission", admissionSchema);
