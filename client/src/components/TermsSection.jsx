import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, BookOpen, Users } from "lucide-react";

export default function TermsSection() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-blue-100 overflow-hidden">
      {/* Decorative background blur circles */}
      <div className="absolute top-10 left-20 w-72 h-72 bg-blue-300/30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-10 right-20 w-96 h-96 bg-indigo-400/30 blur-3xl rounded-full"></div>

      <motion.div
        className="relative z-10 text-center px-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
          Terms & Conditions
        </h2>
        <p className="text-blue-600/80 mb-12 text-lg">
          Please read our policies carefully before enrolling at Arihant Coaching Classes.
        </p>

        {/* Glass-effect content card */}
        <motion.div
          className="max-w-5xl mx-auto bg-white/60 backdrop-blur-xl p-10 rounded-3xl shadow-lg border border-white/30"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {/* Rule 1 */}
            <motion.div
              className="p-6 bg-white/70 rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-blue-100"
              whileHover={{ scale: 1.03 }}
            >
              <ShieldCheck className="text-blue-700 w-10 h-10 mb-3" />
              <h3 className="font-semibold text-blue-800 text-lg mb-2">
                Code of Conduct
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Students must maintain discipline, attend regularly, and respect
                teachers and peers. Misconduct may result in suspension or
                termination of admission.
              </p>
            </motion.div>

            {/* Rule 2 */}
            <motion.div
              className="p-6 bg-white/70 rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-blue-100"
              whileHover={{ scale: 1.03 }}
            >
              <BookOpen className="text-blue-700 w-10 h-10 mb-3" />
              <h3 className="font-semibold text-blue-800 text-lg mb-2">
                Fee Policy
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Fees once paid are <b>non-refundable</b> under any circumstances.
                Arihant Coaching may update course structures or schedules when required.
              </p>
            </motion.div>

            {/* Rule 3 */}
            <motion.div
              className="p-6 bg-white/70 rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-blue-100"
              whileHover={{ scale: 1.03 }}
            >
              <Users className="text-blue-700 w-10 h-10 mb-3" />
              <h3 className="font-semibold text-blue-800 text-lg mb-2">
                Study Material Use
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                All study materials are for personal use only. Unauthorized sharing,
                copying, or redistribution is strictly prohibited.
              </p>
            </motion.div>
          </div>

          {/* Disclaimer footer */}
          <div className="mt-10 text-center text-gray-600 text-sm italic">
            Arihant Coaching Classes reserves the right to amend the terms
            and policies at any time without prior notice.
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
