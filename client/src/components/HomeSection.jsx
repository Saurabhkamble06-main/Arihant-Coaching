import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Users, BookOpen, Star } from "lucide-react";
import { scroller } from "react-scroll";

export default function HomeSection() {

  const scrollToCourses = () => {
    scroller.scrollTo("courses", {
      smooth: true,
      duration: 800,
      offset: -80,
    });
  };

  const scrollToContact = () => {
    scroller.scrollTo("contact", {
      smooth: true,
      duration: 800,
      offset: -80,
    });
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-[#ecf3ff] via-white to-[#dbeafe] py-28 md:py-36 px-6"
    >
      {/* Gradient Glows */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-blue-400/30 blur-[120px] rounded-full"></div>
      <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] bg-indigo-500/20 blur-[140px] rounded-full"></div>
      <div className="absolute bottom-0 left-1/4 w-[350px] h-[350px] bg-blue-300/20 blur-[110px] rounded-full"></div>

      {/* ================= HERO CONTENT ================= */}
      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left"
        >
          <span className="inline-block px-5 py-2 mb-5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold tracking-wide shadow">
            15+ Years of Academic Excellence
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Building Bright Futures <br />
            with{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              Arihant Coaching
            </span>
          </h1>

          <p className="mt-6 text-gray-600 text-lg max-w-xl leading-relaxed">
            Concept-based learning, expert guidance & regular assessment
            helping students excel from Class 5th to 12th.
            Join the most trusted coaching institute of Panvel.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap justify-center md:justify-start gap-4">

            {/* ✅ FIXED VIEW COURSES */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToCourses}
              className="bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-800 transition-all"
            >
              View Courses
            </motion.button>

            {/* Contact */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
              className="border border-blue-700 text-blue-700 px-8 py-3 rounded-xl font-semibold bg-white shadow hover:bg-blue-50 transition-all"
            >
              Enquire Now
            </motion.button>

          </div>
        </motion.div>

        {/* RIGHT SIDE GLASS CARD */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative bg-white/40 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/30"
        >

          <h3 className="text-xl font-bold text-blue-700 mb-6 text-center">
            Why Choose Us?
          </h3>

          <div className="space-y-5">
            {[
              {
                icon: <GraduationCap />,
                title: "Concept Clarity",
                desc: "Strong foundation with simple explanations",
              },
              {
                icon: <Users />,
                title: "Expert Faculty",
                desc: "15+ years experienced mentors",
              },
              {
                icon: <BookOpen />,
                title: "Structured Study",
                desc: "Weekly tests & performance analysis",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 text-blue-700 rounded-full shadow">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ================= STATS ================= */}
      <motion.div
        className="relative z-10 mt-20 max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        {[
          { value: "15+", label: "Years Experience" },
          { value: "5000+", label: "Students Taught" },
          { value: "98%", label: "Success Rate" },
          { value: "150+", label: "Top Rankers" },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-white/80 backdrop-blur-xl shadow-xl border border-white/20 rounded-2xl p-6 text-center hover:scale-105 transition"
          >
            <h2 className="text-3xl font-extrabold text-blue-700">
              {stat.value}
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>

      {/* FLOATING BUTTON */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 bg-blue-700 text-white px-6 py-3 rounded-full shadow-2xl font-semibold hover:bg-blue-800 transition flex gap-2 items-center"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        onClick={scrollToContact}
      >
        <Star size={18} />
        Enroll Now
      </motion.button>
    </section>
  );
}
