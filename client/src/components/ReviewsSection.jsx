import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function ReviewsSection() {
  const reviews = [
    {
      name: "Aarav Sharma",
      text: "Arihant Coaching helped me score 95% in SSC! The teachers are truly dedicated and supportive.",
      rating: 5,
    },
    {
      name: "Priya Patil",
      text: "Concepts are explained so clearly! Regular tests and personal attention made a huge difference.",
      rating: 5,
    },
    {
      name: "Rahul Deshmukh",
      text: "Best coaching institute for HSC Science. Teachers make learning engaging and easy to understand.",
      rating: 4,
    },
    {
      name: "Sneha Kulkarni",
      text: "The environment is very positive. Teachers motivate us to give our best every single day.",
      rating: 5,
    },
  ];

  return (
    <section
      id="reviews"
      className="relative py-24 bg-gradient-to-b from-blue-50 via-white to-blue-100 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300/30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400/30 blur-3xl rounded-full"></div>

      <motion.div
        className="relative z-10 text-center px-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
          What Our Students Say
        </h2>
        <p className="text-gray-600 mb-12 text-lg max-w-2xl mx-auto">
          Real stories from achievers who turned dreams into results with
          Arihant Coaching Classes.
        </p>

        {/* Animated Reviews Grid */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 150 }}
              className="bg-white/80 backdrop-blur-md border border-blue-100 rounded-3xl p-8 w-full sm:w-[300px] shadow-lg hover:shadow-2xl transition"
            >
              <div className="flex justify-center mb-4">
                {[...Array(r.rating)].map((_, idx) => (
                  <Star
                    key={idx}
                    size={22}
                    className="text-yellow-400 fill-yellow-400 drop-shadow-sm"
                  />
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">"{r.text}"</p>
              <h3 className="font-semibold text-blue-800 text-lg">{r.name}</h3>
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative tagline */}
        <motion.p
          className="mt-16 text-blue-700/70 font-medium text-sm tracking-wide uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Excellence | Trust | Results
        </motion.p>
      </motion.div>
    </section>
  );
}
