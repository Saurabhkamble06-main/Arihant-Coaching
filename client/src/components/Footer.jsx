import React from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Globe,
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617] text-white mt-24 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-600/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/10 blur-[140px] rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-7xl mx-auto px-6 py-16"
      >
        {/* TOP GRID */}
        <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">

          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-extrabold text-cyan-400">
              Arihant Coaching Classes
            </h2>
            <p className="text-gray-300 mt-4 text-sm leading-relaxed">
              Shaping bright futures with quality education, expert teaching,
              and personal mentorship.  
              Trusted by hundreds of students for academic excellence.
            </p>

            <div className="flex justify-center md:justify-start gap-4 mt-6">
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-cyan-500/20 transition">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-pink-500/20 transition">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-blue-500/20 transition">
                <Linkedin size={18} />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-indigo-500/20 transition">
                <Globe size={18} />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-lg font-bold text-white mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="hover:text-cyan-400 cursor-pointer transition">Home</li>
              <li className="hover:text-cyan-400 cursor-pointer transition">About</li>
              <li className="hover:text-cyan-400 cursor-pointer transition">Courses</li>
              <li className="hover:text-cyan-400 cursor-pointer transition">Reviews</li>
              <li className="hover:text-cyan-400 cursor-pointer transition">Admissions</li>
              <li className="hover:text-cyan-400 cursor-pointer transition">Contact</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-lg font-bold text-white mb-5">
              Contact Us
            </h3>

            <div className="space-y-4 text-sm text-gray-300">

              <div className="flex gap-3 items-center">
                <MapPin size={18} className="text-cyan-400" />
                <span>
                  Panvel, Navi Mumbai, Maharashtra
                </span>
              </div>

              <div className="flex gap-3 items-center">
                <Phone size={18} className="text-cyan-400" />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex gap-3 items-center">
                <Mail size={18} className="text-cyan-400" />
                <span>arihantclasses@gmail.com</span>
              </div>

            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10 my-12"></div>

        {/* BOTTOM LINE */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-400">

          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-white font-semibold">
              Arihant Coaching Classes
            </span>
            . All rights reserved.
          </p>

          <p className="text-center md:text-right text-xs">
            Developed by{" "}
            <span className="text-cyan-400 font-semibold">
              Innovexa Solutions
            </span>
            <br />
            Next-Gen Web • AI Systems • Digital Branding
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
