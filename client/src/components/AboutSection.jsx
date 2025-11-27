import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Users,
  Award,
  Building,
  ClipboardCheck,
  FileText,
  Target,
} from "lucide-react";

export default function AboutSection() {
  const values = [
    { letter: "B", word: "Best People" },
    { letter: "R", word: "Respect" },
    { letter: "I", word: "Integrity" },
    { letter: "C", word: "Creativity" },
    { letter: "K", word: "Knowledge" },
    { letter: "S", word: "Superior Quality" },
  ];

  const facilities = [
    {
      icon: <Building />,
      title: "Ergonomic Infrastructure",
      desc: "Well-designed classrooms with modern learning facilities to boost focus and engagement.",
    },
    {
      icon: <ClipboardCheck />,
      title: "Strategic Testing System",
      desc: "Weekly tests, monthly mock exams, and performance tracking for continuous improvement.",
    },
    {
      icon: <FileText />,
      title: "Expertly Curated Study Material",
      desc: "Concept-driven notes prepared by senior faculty for exam-focused preparation.",
    },
  ];

  return (
    <section
      id="about"
      className="relative py-28 bg-gradient-to-b from-white via-blue-50 to-white px-6 overflow-hidden"
    >
      {/* Background Blur Effects */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-200 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 opacity-10 blur-3xl rounded-full"></div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="relative z-10 text-center max-w-4xl mx-auto"
      >
        <span className="inline-block mb-3 px-5 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
          About Us
        </span>

        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          About Arihant Coaching Classes
        </h2>

        <p className="text-gray-600 text-lg leading-relaxed">
          <strong>Arihant Coaching Classes</strong> has been shaping excellent
          academic careers since 1998 by providing personalized mentorship,
          conceptual clarity, and result-driven preparation for SSC, ICSE, CBSE
          Science & Commerce students.
        </p>
      </motion.div>

      {/* Core Highlights */}
      <div className="relative z-10 mt-14 grid md:grid-cols-3 gap-7 max-w-6xl mx-auto">
        {[
          {
            icon: <Users />,
            title: "Expert Faculty",
            desc: "Highly experienced and passionate educators guiding students toward success.",
          },
          {
            icon: <BookOpen />,
            title: "Advanced Learning",
            desc: "Smart classrooms, conceptual teaching, and individual student focus.",
          },
          {
            icon: <Award />,
            title: "Proven Track Record",
            desc: "Thousands of successful students every year across boards and streams.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-7 shadow-lg text-center hover:shadow-xl transition-all"
          >
            <div className="flex justify-center mb-4 text-blue-700">
              <div className="bg-blue-100 p-4 rounded-xl">{item.icon}</div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Vision */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="relative z-10 mt-20 max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-8 md:p-10"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-blue-100 p-3 rounded-xl text-blue-700">
            <Target />
          </div>
          <h3 className="text-2xl font-bold text-blue-700">Our Vision</h3>
        </div>

        <p className="text-gray-700 leading-relaxed text-lg">
          Our mission is to shape academically strong, morally grounded, and
          confident individuals by reaching over <strong>1 million learners</strong>{" "}
          across India with quality education. We focus not just on marks, but
          on building a strong foundation for life and careers.
        </p>
      </motion.div>

      {/* Core Values */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="relative z-10 mt-20 max-w-6xl mx-auto text-center"
      >
        <h3 className="text-2xl font-bold text-blue-700 mb-6">
          Our Core Values – BRICKS
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
          {values.map((val, idx) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              key={idx}
              className="bg-white shadow-md rounded-2xl p-5 text-center hover:shadow-lg transition-all"
            >
              <div className="text-3xl font-extrabold text-blue-700 mb-1">
                {val.letter}
              </div>
              <p className="text-gray-700 text-sm font-medium">
                {val.word}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Facilities */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="relative z-10 mt-24 max-w-6xl mx-auto"
      >
        <h3 className="text-2xl font-bold text-blue-700 text-center mb-8">
          World-Class Learning Facilities
        </h3>

        <div className="grid md:grid-cols-3 gap-7">
          {facilities.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-2xl p-7 hover:shadow-xl transition-all"
            >
              <div className="flex gap-3 items-center mb-3 text-blue-700">
                <div className="bg-blue-100 rounded-xl p-3">
                  {item.icon}
                </div>
                <h4 className="text-lg font-semibold">{item.title}</h4>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
