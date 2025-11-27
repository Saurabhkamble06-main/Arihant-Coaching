import mongoose from "mongoose";
import dotenv from "dotenv";
import Course from "../models/Course.js";

dotenv.config();

// Seat Logic
const getSeats = (title) => {
  if (title.includes("11") || title.includes("12")) return 30;
  if (title.includes("9") || title.includes("10")) return 35;
  return 40;
};

// ✅ Course Data
const courses = [

  // 5 to 10 - Marathi Medium
  ...[5,6,7,8,9,10].map(c => ({
    title: `Class ${c} - Marathi Medium`,
    category: "5 to 10 – Marathi Medium",
    fees: 5000 + (c * 500),
    duration: "1 Year"
  })),

  // 5 to 10 - Semi English
  ...[5,6,7,8,9,10].map(c => ({
    title: `Class ${c} - Semi English`,
    category: "5 to 10 – Semi English",
    fees: 5500 + (c * 500),
    duration: "1 Year"
  })),

  // 5 to 10 - CBSE
  ...[5,6,7,8,9,10].map(c => ({
    title: `Class ${c} - CBSE`,
    category: "5 to 10 – CBSE Board",
    fees: 6000 + (c * 500),
    duration: "1 Year"
  })),

  // 11 to 12 - HSC
  { title: "Class 11 - Science (HSC)", category: "11 to 12 – HSC Board", fees: 12000, duration: "1 Year" },
  { title: "Class 12 - Science (HSC)", category: "11 to 12 – HSC Board", fees: 15000, duration: "1 Year" },

  // 11 to 12 - Commerce HSC
  { title: "Class 11 - Commerce (HSC)", category: "11 to 12 – HSC Board", fees: 11000, duration: "1 Year" },
  { title: "Class 12 - Commerce (HSC)", category: "11 to 12 – HSC Board", fees: 14000, duration: "1 Year" },

  // 11 to 12 - Computer Science CBSE
  { title: "Class 11 - Computer Science (CBSE)", category: "11 to 12 – CBSE Board", fees: 15000, duration: "1 Year" },
  { title: "Class 12 - Computer Science (CBSE)", category: "11 to 12 – CBSE Board", fees: 18000, duration: "1 Year" },

  // Certificate Courses - Coming Soon
  { title: "Certificate Course - Basic Computer", category: "Certificate Courses", fees: 0, duration: "Coming Soon", status: "coming_soon" },
  { title: "Certificate Course - Spoken English", category: "Certificate Courses", fees: 0, duration: "Coming Soon", status: "coming_soon" }

];

async function addCourses() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear old courses
    await Course.deleteMany({});
    console.log("🗑️ Old courses deleted");

    const formattedCourses = courses.map(course => ({
      ...course,
      limitedSeats: getSeats(course.title)
    }));

    await Course.insertMany(formattedCourses);

    console.log("🚀 New courses added successfully!");
    process.exit(0);

  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
}

addCourses();
