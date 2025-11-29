import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPopup({ onClose, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔥 Backend URL (Render)
  const API_URL =
    process.env.REACT_APP_API_URL || "https://arihant-coaching.onrender.com";

  // --- CHANGED: try multiple endpoints and give clearer debug/error info ---
  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);
    setError("");

    const payload = { email: email.toLowerCase().trim(), password };

    // Candidate endpoints to try if the primary route is missing
    const candidates = [
      "/api/auth/login",
      "/api/login",
      "/auth/login",
      "/login",
      "/api/v1/auth/login",
    ];

    let lastAttempt = null;
    let successData = null;

    for (const path of candidates) {
      const url = `${API_URL.replace(/\/$/, "")}${path}`;
      try {
        console.debug("Attempting login:", { url, payload });
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });

        const raw = await res.text();
        let parsed = null;
        try {
          parsed = raw ? JSON.parse(raw) : null;
        } catch {
          parsed = null;
        }

        console.debug("Response:", { url, status: res.status, raw, parsed });

        // If route not found or 4xx/5xx that suggests wrong endpoint, try next
        if (!res.ok) {
          lastAttempt = { url, status: res.status, parsed, raw };
          // If server explicitly says route not found, continue to next candidate
          const routeNotFound =
            (parsed &&
              (parsed.error === "Route not found ❌" ||
                parsed.msg === "Route not found ❌")) ||
            (raw && raw.toLowerCase().includes("route not found"));
          if (
            routeNotFound ||
            res.status === 404 ||
            (res.status >= 400 && res.status < 500)
          ) {
            // try next endpoint
            continue;
          }
          // For 5xx, stop and show server response
          lastAttempt = { url, status: res.status, parsed, raw };
          break;
        }

        // success
        successData = parsed;
        lastAttempt = { url, status: res.status, parsed, raw };
        break;
      } catch (err) {
        // network error — remember and try next
        console.error("Fetch attempt error:", err);
        lastAttempt = { url, error: String(err) };
        continue;
      }
    }

    // handle result
    if (!successData) {
      // build user-friendly message from lastAttempt
      let message = "Login failed. ";
      if (lastAttempt) {
        if (
          lastAttempt.parsed &&
          (lastAttempt.parsed.msg ||
            lastAttempt.parsed.error ||
            lastAttempt.parsed.message)
        ) {
          message +=
            lastAttempt.parsed.msg ||
            lastAttempt.parsed.error ||
            lastAttempt.parsed.message;
        } else if (lastAttempt.status) {
          const snippet =
            lastAttempt.raw && lastAttempt.raw.length > 300
              ? lastAttempt.raw.slice(0, 300) + "..."
              : lastAttempt.raw;
          message += `Server returned ${lastAttempt.status}. ${snippet}`;
        } else if (lastAttempt.error) {
          message += lastAttempt.error;
        } else {
          message += "Unknown server response.";
        }
      } else {
        message += "No response from server.";
      }
      setError(message);
      setLoading(false);
      return;
    }

    // process successful response (same as before)
    try {
      const data = successData;
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
      console.error("Processing success response failed:", err);
      setError("Unexpected server response. Check console.");
      setLoading(false);
    }
  };

  // Ensure body styles that prevent background scrolling / overscroll while modal is mounted.
  useEffect(() => {
    // previous code used document.body.style.overflow toggles in handlers;
    // set them here and restore on unmount to be robust.
    const prevOverflow = document.body.style.overflow;
    const prevOverscroll = document.body.style.overscrollBehavior;
    document.body.style.overflow = "hidden";
    // 'none' or 'contain' prevents bounce/overscroll propagation on mobile without attaching touch listeners
    document.body.style.overscrollBehavior = "contain";

    return () => {
      document.body.style.overflow = prevOverflow || "";
      document.body.style.overscrollBehavior = prevOverscroll || "";
    };
  }, []);

  return (
    <div
      // Add touch-action / overscrollBehavior to the overlay so browsers don't need to attach blocking touch listeners
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

        {/* Heading */}
        <h2 className="text-2xl font-extrabold text-center text-blue-700 mb-6">
          Welcome Back 👋
        </h2>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        {/* Wrap inputs in a form so browser autofill & enter-key behave correctly */}
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
