import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, IndianRupee, Clock } from "lucide-react";

export default function CoursesSection({ user, onTriggerLogin }) {

  const [courses, setCourses] = useState([]);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // =============================
  //  PRODUCTION API URL
  // =============================
  const API_URL =
    process.env.REACT_APP_API_URL ||
    "https://arihant-coaching.onrender.com";

  const RAZORPAY_KEY =
    process.env.REACT_APP_RAZORPAY_KEY || "";

  // =============================
  //  LOAD RAZORPAY SCRIPT
  // =============================
  useEffect(() => {
    if (window.Razorpay) {
      setRazorpayLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => console.error("❌ Razorpay failed to load");
    document.body.appendChild(script);
  }, []);

  // =============================
  //  FETCH COURSES (PRODUCTION API)
  // =============================
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${API_URL}/api/courses`);
        const data = await res.json();

        if (Array.isArray(data)) {
          setCourses(data);
        } else {
          console.error("⚠ Invalid Course API Response", data);
        }
      } catch (err) {
        console.error("❌ Course Fetch Error:", err);
      }
    };

    fetchCourses();
  }, [API_URL]);

  // =============================
  //  HANDLE PAYMENT
  // =============================
  const handlePayment = (course) => {

    if (!user) {
      if (onTriggerLogin) onTriggerLogin();
      return;
    }

    if (!razorpayLoaded) {
      alert("⏳ Payment system is loading. Please wait...");
      return;
    }

    if (!RAZORPAY_KEY) {
      alert("❌ Payment Error: Razorpay Key Missing");
      console.error("Missing Razorpay Key");
      return;
    }

    const options = {
      key: RAZORPAY_KEY,
      amount: Number(course?.fees || 0) * 100,
      currency: "INR",
      name: "Arihant Coaching Classes",
      description: course?.title || "Course",

      prefill: {
        name: user?.name,
        email: user?.email,
      },

      handler: async (response) => {
        try {
          const res = await fetch(`${API_URL}/api/payment/save`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              studentName: user?.name,
              email: user?.email,
              course: course?.title,
              amount: course?.fees,
              paymentId: response.razorpay_payment_id,
              status: "Success",
            }),
          });

          if (!res.ok) throw new Error("Payment Save Failed ❌");

          alert("✅ Payment Successful! Enrollment Confirmed 🎉");

        } catch (err) {
          console.error("Payment Save Error:", err);
          alert("⚠ Payment completed, but saving failed. Contact support.");
        }
      },

      theme: { color: "#2563eb" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // =============================
  //  UI
  // =============================
  return (
    <section
      id="courses"
      className="py-28 bg-gradient-to-br from-blue-50 via-white to-blue-100"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center max-w-4xl mx-auto mb-20 px-4"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-700 tracking-tight">
          Our Premium Courses
        </h2>

        <p className="text-gray-600 mt-4 text-lg max-w-xl mx-auto">
          Learn from expert faculty with structured courses for academic excellence.
        </p>
      </motion.div>

      {/* Course Cards */}
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6">

        {courses.length === 0 && (
          <p className="col-span-3 text-center text-red-600 text-lg font-semibold">
            No courses available right now.
          </p>
        )}

        {courses.map((course, index) => (
          <motion.div
            key={course._id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -6 }}
            className="relative rounded-3xl border border-blue-100 bg-white/90 p-7 shadow-xl"
          >
            <div className="absolute -top-4 right-5 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-semibold shadow">
              Popular
            </div>

            <h3 className="text-xl font-bold text-blue-700 mb-2">
              {course.title}
            </h3>

            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {course.description || "Course details will be updated soon."}
            </p>

            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-blue-600" />
                <span>{course.duration || "Duration not specified"}</span>
              </div>

              <div className="flex items-center gap-2">
                <IndianRupee size={16} className="text-blue-600" />
                <span className="text-lg font-bold text-blue-700">
                  ₹{course.fees}
                </span>
              </div>

              {course.limitedSeats && (
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-blue-600" />
                  <span>
                    Seats Available:
                    <b className="ml-1 text-blue-700">
                      {course.limitedSeats}
                    </b>
                  </span>
                </div>
              )}
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => handlePayment(course)}
              className={`mt-6 w-full py-3 rounded-xl font-semibold text-white 
                ${
                  user
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-red-500 hover:bg-red-600"
                }`}
            >
              {user ? "Enroll Now" : "Login to Enroll"}
            </motion.button>
          </motion.div>
        ))}

      </div>
    </section>
  );
}
