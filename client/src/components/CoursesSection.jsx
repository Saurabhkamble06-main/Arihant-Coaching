import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, IndianRupee, Clock } from "lucide-react";

export default function CoursesSection({ user, onTriggerLogin }) {

  const [courses, setCourses] = useState([]);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // 🌐 PRODUCTION API URL ONLY
  const API_URL = "https://arihant-coaching.onrender.com";

  // 🔑 Razorpay key (production only)
  const RAZORPAY_KEY = process.env.REACT_APP_RAZORPAY_KEY || "";

  // Load Razorpay script (production)
  useEffect(() => {
    if (window.Razorpay) return setRazorpayLoaded(true);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => console.error("❌ Razorpay failed to load");
    document.body.appendChild(script);
  }, []);

  // Fetch courses
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_URL}/api/courses`);
        const data = await res.json();

        if (Array.isArray(data)) setCourses(data);
        else setCourses([]);
      } catch (err) {
        console.error("❌ Course fetch error:", err);
        setCourses([]);
      }
    };
    load();
  }, []);

  // PAYMENT HANDLER
  const handlePayment = (course) => {

    if (!user) return onTriggerLogin();

    if (!razorpayLoaded) {
      alert("⏳ Payment gateway loading… Please wait.");
      return;
    }

    if (!RAZORPAY_KEY) {
      alert("❌ Payment key missing. Contact admin.");
      console.error("Missing Razorpay Public Key!");
      return;
    }

    const options = {
      key: RAZORPAY_KEY,
      amount: course.fees * 100,
      currency: "INR",
      name: "Arihant Coaching Classes",
      description: course.title,
      prefill: {
        name: user?.name,
        email: user?.email
      },
      handler: async (response) => {
        try {
          const res = await fetch(`${API_URL}/api/payment/save`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              studentName: user?.name,
              email: user?.email,
              course: course.title,
              amount: course.fees,
              paymentId: response.razorpay_payment_id,
              status: "Paid",
            }),
          });

          if (!res.ok) throw new Error("Payment save failed");

          alert("✅ Payment Successful & Enrollment Confirmed!");
        } catch (err) {
          console.error("❌ Payment save failed:", err);
          alert("⚠ Payment done but saving failed. Contact support.");
        }
      }
    };

    new window.Razorpay(options).open();
  };

  return (
    <section id="courses" className="py-28 bg-blue-50">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-extrabold text-blue-700">Our Courses</h2>
        <p className="text-gray-600 mt-3">Enroll in the best coaching programs</p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6">
        {courses.map((course, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-white p-6 rounded-3xl shadow-xl border"
          >
            <h3 className="text-xl font-bold text-blue-700">{course.title}</h3>

            <p className="text-gray-600 mt-2">{course.description}</p>

            <div className="mt-4 space-y-2 text-gray-700 text-sm">
              <p className="flex items-center gap-2">
                <Clock size={16} /> {course.duration}
              </p>
              <p className="flex items-center gap-2">
                <IndianRupee size={16} />{" "}
                <span className="text-lg font-bold text-blue-700">
                  ₹{course.fees}
                </span>
              </p>
              {course.limitedSeats && (
                <p className="flex items-center gap-2">
                  <Users size={16} /> Seats Available: {course.limitedSeats}
                </p>
              )}
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => handlePayment(course)}
              className={`mt-6 w-full py-3 rounded-xl font-semibold text-white ${
                user ? "bg-blue-600 hover:bg-blue-700" : "bg-red-500"
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
