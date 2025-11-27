import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactSection() {
  const branches = [
    {
      name: "Arihant Coaching – Dadar",
      address: "Opp. Station Road, Dadar (W), Mumbai - 400028",
      phone: "+91 98765 43210",
      map: "https://www.google.com/maps?q=Dadar+Mumbai&output=embed",
    },
    {
      name: "Arihant Coaching – Andheri",
      address: "Near Metro Station, Andheri (E), Mumbai - 400069",
      phone: "+91 98765 43211",
      map: "https://www.google.com/maps?q=Andheri+Mumbai&output=embed",
    },
  ];

  return (
    <section
      id="contact"
      className="py-24 bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-hidden"
    >
      {/* Background blur circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10 max-w-6xl mx-auto text-center px-6">
        <motion.h2
          className="text-4xl font-bold text-blue-800 mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Get in Touch
        </motion.h2>
        <p className="text-gray-600 mb-12 text-lg max-w-2xl mx-auto">
          Have questions? We’re here to help. Connect with our team for course
          details, admissions, or counseling.
        </p>

        {/* Contact Form + Info */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <motion.form
            className="bg-white shadow-xl p-8 rounded-2xl border border-blue-100 text-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold text-blue-700 mb-6">
              Send Us a Message
            </h3>

            <input
              type="text"
              placeholder="Full Name"
              className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
            <button className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition">
              Send Message
            </button>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            className="flex flex-col justify-center space-y-6 text-left"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3">
              <Phone className="text-blue-700 w-5 h-5" />
              <p className="text-gray-800 text-lg">+91 98765 43210</p>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-blue-700 w-5 h-5" />
              <p className="text-gray-800 text-lg">
                info@arihantcoaching.com
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="text-blue-700 w-5 h-5" />
              <p className="text-gray-800 text-lg">
                Mon–Sat: 9:00 AM – 8:00 PM
              </p>
            </div>

            <div className="mt-6">
              <h4 className="text-xl font-semibold text-blue-700 mb-3">
                Main Branch
              </h4>
              <div className="flex items-start gap-3">
                <MapPin className="text-blue-700 w-5 h-5 mt-1" />
                <p className="text-gray-700 leading-relaxed">
                  Arihant Coaching Classes, Near Station Road, Dadar (W),
                  Mumbai, India
                </p>
              </div>

              <iframe
                title="Arihant Coaching Location"
                src="https://www.google.com/maps?q=Dadar+Mumbai&output=embed"
                className="rounded-xl w-full h-56 border-0 mt-4"
              ></iframe>
            </div>
          </motion.div>
        </div>

        {/* Branch Cards */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {branches.map((branch, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition text-left"
            >
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                {branch.name}
              </h3>
              <p className="text-gray-700 mb-2">{branch.address}</p>
              <p className="text-gray-700 mb-4">
                📞 <span className="font-medium">{branch.phone}</span>
              </p>
              <iframe
                title={branch.name}
                src={branch.map}
                className="rounded-lg w-full h-44 border-0"
              ></iframe>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
