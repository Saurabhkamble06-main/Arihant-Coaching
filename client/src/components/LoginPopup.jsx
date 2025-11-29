import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPopup({ onClose, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🌍 Auto-detect backend: localhost (dev) or Render (production)
  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : process.env.REACT_APP_API_URL ||
        "https://arihant-coaching.onrender.com";

  // 🔥 Single correct login endpoint
  const LOGIN_ENDPOINT = `${API_URL.replace(/\/$/, "")}/api/auth/login`;

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(LOGIN_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          password,
        }),
      });

      const raw = await res.text();
      let data = null;

      try {
        data = raw ? JSON.parse(raw) : {};
      } catch (e) {
        console.error("JSON Parse Error:", e);
      }

      if (!res.ok) {
        setError(data?.msg || data?.error || "Invalid credentials ❌");
        setLoading(false);
        return;
      }

      // Save user
      const userData = {
        id: data.user?.id,
        name: data.user?.name,
        email: data.user?.email,
        role: data.role || "user",
      };

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(userData));

      onLogin(userData);
      setLoading(false);
      document.body.style.overflow = "auto";
      onClose();
    } catch (err) {
      console.error("Login Error:", err);
      setError("Server Error. Try again later.");
      setLoading(false);
    }
  };

  // 🔒 Prevent background scroll
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow || "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-[9999]"
      style={{ touchAction: "manipulation", overscrollBehavior: "contain" }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl relative"
      >
        {/* Close */}
        <button
          onClick={() => {
            document.body.style.overflow = "auto";
            onClose();
          }}
          className="absolute top-3 right-4 text-gray-600 hover:text-black text-lg"
        >
          ✕
        </button>

        <h2 className="text-2xl font-extrabold text-center text-blue-700 mb-6">
          Welcome Back 👋
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          autoComplete="on"
        >
          {/* Email */}
          <div className="relative mb-4">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Enter your email"
              required
              className="w-full border pl-10 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="relative mb-6">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type={showPass ? "text" : "password"}
              name="current-password"
              autoComplete="current-password"
              placeholder="Enter your password"
              required
              className="w-full border pl-10 pr-10 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Eye Toggle */}
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-blue-600"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Login Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition 
              ${loading ? "bg-gray-400" : "bg-blue-700 hover:bg-blue-800"}`}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
