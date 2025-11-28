import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function RegisterPopup({ onClose, onTriggerLogin }) {

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔥 CRA-Compatible ENV API URL
  const API_URL =
    process.env.REACT_APP_API_URL || "https://arihant-coaching.onrender.com";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || "Registration failed ❌");
        setLoading(false);
        return;
      }

      alert(`✅ Account Created Successfully!\nWelcome ${data.user.name} 🎉`);

      setLoading(false);

      // Restore scroll
      document.body.style.overflow = "auto";

      onClose();
      onTriggerLogin && onTriggerLogin();

    } catch (error) {
      console.error("Registration error:", error);
      setError("Server error. Try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-[9999]">

      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl relative"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            document.body.style.overflow = "auto"; // FIX blur freeze
            onClose();
          }}
          className="absolute top-3 right-4 text-gray-600 hover:text-black text-lg"
        >
          ✕
        </button>

        <h2 className="text-2xl font-extrabold text-center text-blue-700 mb-6">
          Create Account ✨
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded text-sm mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Full Name */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border pl-10 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border pl-10 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />

            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border pl-10 pr-10 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            />

            {/* Toggle Password */}
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-blue-600"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold 
            ${loading ? "bg-gray-400" : "bg-blue-700 hover:bg-blue-800"}`}
          >
            {loading ? "Creating Account..." : "Register"}
          </motion.button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-5">
          Already have an account?
          <span
            onClick={() => {
              document.body.style.overflow = "auto";
              onClose();
              onTriggerLogin();
            }}
            className="text-blue-700 cursor-pointer font-semibold ml-1 hover:underline"
          >
            Login here
          </span>
        </p>
      </motion.div>
    </div>
  );
}
