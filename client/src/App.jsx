import React, { useRef, useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import HomeSection from "./components/HomeSection";
import AboutSection from "./components/AboutSection";
import CoursesSection from "./components/CoursesSection";
import ReviewsSection from "./components/ReviewsSection";
import ContactSection from "./components/ContactSection";
import BlogSection from "./components/BlogSection";
import TermsSection from "./components/TermsSection";
import Footer from "./components/Footer";

import LoginPopup from "./components/LoginPopup";
import RegisterPopup from "./components/RegisterPopup";
import ChangePasswordPopup from "./components/ChangePasswordPopup";
import OTPPopup from "./components/auth/OTPPopup";
import AdminDashboard from "./components/AdminDashboard";

export default function App() {
  /* ----------------------------------------
     API BASE URL (Production-safe)
  ---------------------------------------- */
  const API =
    process.env.REACT_APP_API_URL || "https://arihant-coaching.onrender.com";

  /* ----------------------------------------
     UI + Popup States
  ---------------------------------------- */
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showOTP, setShowOTP] = useState(false);

  const [otpEmail, setOtpEmail] = useState("");
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  /* ----------------------------------------
     Section Refs
  ---------------------------------------- */
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const coursesRef = useRef(null);
  const reviewsRef = useRef(null);
  const blogRef = useRef(null);
  const termsRef = useRef(null);
  const contactRef = useRef(null);

  /* ----------------------------------------
     Auto Load User From LocalStorage
  ---------------------------------------- */
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
      setIsAdmin(parsed.role === "admin");
    }
  }, []);

  /* ----------------------------------------
     LOGIN HANDLER
  ---------------------------------------- */
  const handleLogin = (userData) => {
    setUser(userData);
    setIsAdmin(userData.role === "admin");

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("role", userData.role);

    setShowLogin(false);
  };

  /* ----------------------------------------
     LOGOUT
  ---------------------------------------- */
  const handleLogout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.clear();
  };

  /* ----------------------------------------
     After Register → Go to OTP
  ---------------------------------------- */
  const handleRegisterSuccess = (email) => {
    setOtpEmail(email);
    setShowRegister(false);
    setShowOTP(true);
  };

  /* ----------------------------------------
     OTP VERIFY
  ---------------------------------------- */
  const handleVerifyOTP = async (otp) => {
    try {
      const res = await fetch(`${API}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: otpEmail, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ OTP Verified Successfully!");
        setShowOTP(false);
        setShowLogin(true); // Move to login
      } else {
        alert(data.msg || "❌ Invalid OTP");
      }
    } catch (err) {
      console.error("OTP Verify Error:", err);
      alert("Server error");
    }
  };

  /* ----------------------------------------
     RESEND OTP
  ---------------------------------------- */
  const handleResendOTP = async () => {
    try {
      await fetch(`${API}/api/auth/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: otpEmail }),
      });
      alert("📩 OTP Sent Again!");
    } catch (err) {
      console.error("Resend OTP Error:", err);
    }
  };

  /* ----------------------------------------
     Scroll Handler
  ---------------------------------------- */
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  /* =======================================================================
     ADMIN DASHBOARD VIEW (SUPER CLEAN)
  ======================================================================= */
  if (isAdmin) {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  /* =======================================================================
     USER / PUBLIC WEBSITE VIEW
  ======================================================================= */
  return (
    <>
      <Navbar
        onHome={() => scrollToSection(homeRef)}
        onAbout={() => scrollToSection(aboutRef)}
        onCourses={() => scrollToSection(coursesRef)}
        onReviews={() => scrollToSection(reviewsRef)}
        onBlog={() => scrollToSection(blogRef)}
        onTerms={() => scrollToSection(termsRef)}
        onContact={() => scrollToSection(contactRef)}
        onLogin={() => setShowLogin(true)}
        onRegister={() => setShowRegister(true)}
        onLogout={handleLogout}
        onChangePassword={() => setShowChangePassword(true)}
        user={user}
      />

      <div ref={homeRef}>
        <HomeSection />
      </div>

      <div ref={aboutRef}>
        <AboutSection />
      </div>

      <div ref={coursesRef}>
        <CoursesSection
          user={user}
          onTriggerLogin={() => setShowLogin(true)}
        />
      </div>

      <div ref={reviewsRef}>
        <ReviewsSection />
      </div>

      <div ref={blogRef}>
        <BlogSection />
      </div>

      <div ref={termsRef}>
        <TermsSection />
      </div>

      <div ref={contactRef}>
        <ContactSection />
      </div>

      <Footer />

      {/* ---------------- LOGIN POPUP ---------------- */}
      {showLogin && (
        <LoginPopup
          onClose={() => setShowLogin(false)}
          onLogin={handleLogin}
        />
      )}

      {/* ---------------- REGISTER POPUP ---------------- */}
      {showRegister && (
        <RegisterPopup
          onClose={() => setShowRegister(false)}
          onTriggerLogin={() => setShowLogin(true)}
          onRegisterSuccess={handleRegisterSuccess}
        />
      )}

      {/* ---------------- OTP POPUP ---------------- */}
      {showOTP && (
        <OTPPopup
          email={otpEmail}
          onClose={() => setShowOTP(false)}
          onVerify={handleVerifyOTP}
          onResend={handleResendOTP}
        />
      )}

      {/* ---------------- CHANGE PASSWORD ---------------- */}
      {showChangePassword && (
        <ChangePasswordPopup
          onClose={() => setShowChangePassword(false)}
          onSubmit={() => setShowChangePassword(false)}
        />
      )}
    </>
  );
}
