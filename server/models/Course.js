import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    duration: { type: String },
    fees: { type: Number, required: true },
    category: { type: String, default: "General" },
    limitedSeats: { type: Number, default: 0 } // ensure frontend receives a numeric value
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
