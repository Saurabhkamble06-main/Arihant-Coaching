import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Users, IndianRupee, Clock } from "lucide-react";

export default function CoursesSection({ user, onTriggerLogin }) {

  const [courses, setCourses] = useState([]);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Load Razorpay script
  useEffect(() => {
    if (window.Razorpay) {
      setRazorpayLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);
  }, []);

  // Fetch courses
  useEffect(() => {
    fetch("https://arihant-coaching-siso.vercel.app")
      .then(res => res.json())
      .then(data => Array.isArray(data) ? setCourses(data) : [])
      .catch(err => console.error("Course Fetch Error:", err));
  }, []);

  const handlePayment = (course) => {

    if (!user) {
      onTriggerLogin();
      return;
    }

    if (!razorpayLoaded) {
      alert("Payment system loading, please wait...");
      return;
    }

    const options = {
      key: "rzp_live_RSDZXNQuzxyWEL",
      amount: course.fees * 100,
      currency: "INR",
      name: "Arihant Coaching Classes",
      description: course.title,

      prefill: {
        name: user.name,
        email: user.email
      },

      handler: async (response) => {

        await fetch("http://localhost:5000/api/payment/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            studentName: user.name,
            email: user.email,
            course: course.title,
            amount: course.fees,
            paymentId: response.razorpay_payment_id,
            status: "Paid"
          })
        });

        alert("✅ Payment Successful & Enrollment Confirmed!");
      },

      theme: {
        color: "#2563eb",
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <section 
      id="courses" 
      className="py-28 bg-gradient-to-br from-blue-50 via-white to-blue-100"
    >

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center max-w-4xl mx-auto mb-20 px-4"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-700 tracking-tight">
          Our Premium Courses
        </h2>

        <p className="text-gray-600 mt-4 text-lg max-w-xl mx-auto">
          Learn from expert faculty with well-structured courses designed for excellent academic results.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6">

        {courses.length === 0 && (
          <p className="col-span-3 text-center text-red-600 text-lg font-semibold">
            No courses available right now.
          </p>
        )}

        {courses.map((course, i) => (

          <motion.div
            key={course._id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative rounded-3xl border border-blue-100 bg-white/80 backdrop-blur-lg p-7 shadow-xl hover:shadow-2xl transition duration-300"
          >

            {/* Top Banner */}
            <div className="absolute -top-4 right-5 bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-4 py-1 rounded-full text-xs font-semibold shadow">
              Popular
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-blue-700 mb-2">
              {course.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {course.description}
            </p>

            {/* Details */}
            <div className="space-y-3 text-sm text-gray-700">

              <div className="flex items-center gap-2">
                <Clock size={16} className="text-blue-600" />
                <span>{course.duration}</span>
              </div>

              <div className="flex items-center gap-2">
                <IndianRupee size={16} className="text-blue-600" />
                <span className="text-lg font-bold text-blue-700">
                  ₹{course.fees}
                </span>
              </div>

              {course.limitedSeats !== undefined && (
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-blue-600" />
                  <span>
                    Seats Available: 
                    <b className="ml-1 text-blue-700">{course.limitedSeats}</b>
                  </span>
                </div>
              )}

            </div>

            {/* CTA Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => handlePayment(course)}
              className={`mt-6 w-full py-3 rounded-xl font-semibold text-white text-base transition-all duration-300 
                ${user 
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" 
                  : "bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
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
