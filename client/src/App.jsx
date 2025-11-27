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
import AdminDashboard from "./components/AdminDashboard";
import ChangePasswordPopup from "./components/ChangePasswordPopup";
import OTPPopup from "./components/auth/OTPPopup";

export default function App() {

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showOTP, setShowOTP] = useState(false);

  const [otpEmail, setOtpEmail] = useState("");
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const coursesRef = useRef(null);
  const reviewsRef = useRef(null);
  const blogRef = useRef(null);
  const termsRef = useRef(null);
  const contactRef = useRef(null);

  // ✅ Auto load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      console.log("🔁 Loaded from storage:", parsedUser);

      setUser(parsedUser);
      setIsAdmin(parsedUser.role === "admin");
    }
  }, []);

  // ✅ Handle login
  const handleLogin = (userData) => {
    console.log("✅ App Received User:", userData);

    setUser(userData);
    setIsAdmin(userData.role === "admin");

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("role", userData.role);

    setShowLogin(false);
  };

  // ✅ Logout
  const handleLogout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.clear();
  };

  // ✅ After register → show OTP box
  const handleRegisterSuccess = (email) => {
    setOtpEmail(email);
    setShowRegister(false);
    setShowOTP(true);
  };

  // ✅ OTP Verify
  const handleVerifyOTP = async (otp) => {
    const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: otpEmail, otp })
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ OTP Verified Successfully!");
      setShowOTP(false);
      setShowLogin(true);   // Go to login after OTP
    } else {
      alert(data.msg || "❌ Invalid OTP");
    }
  };

  // ✅ Resend OTP
  const handleResendOTP = async () => {
    await fetch("http://localhost:5000/api/auth/resend-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: otpEmail })
    });
  };

  // ✅ Scroll to section
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ✅ Admin Dashboard */}
      {isAdmin ? (
        <AdminDashboard onLogout={handleLogout} />
      ) : (
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

          <div ref={homeRef}><HomeSection /></div>
          <div ref={aboutRef}><AboutSection /></div>

          <div ref={coursesRef}>
            <CoursesSection 
              user={user} 
              onTriggerLogin={() => setShowLogin(true)} 
            />
          </div>

          <div ref={reviewsRef}><ReviewsSection /></div>
          <div ref={blogRef}><BlogSection /></div>
          <div ref={termsRef}><TermsSection /></div>
          <div ref={contactRef}><ContactSection /></div>

          <Footer />
        </>
      )}

      {/* ✅ Login Popup */}
      {showLogin && (
        <LoginPopup
          onClose={() => setShowLogin(false)}
          onLogin={handleLogin}
        />
      )}

      {/* ✅ Register Popup */}
      {showRegister && (
        <RegisterPopup
          onClose={() => setShowRegister(false)}
          onTriggerLogin={() => setShowLogin(true)}
          onRegisterSuccess={handleRegisterSuccess} // 🔑 KEY ADDITION
        />
      )}

      {/* ✅ OTP Popup */}
      {showOTP && (
        <OTPPopup
          email={otpEmail}
          onClose={() => setShowOTP(false)}
          onVerify={handleVerifyOTP}
          onResend={handleResendOTP}
        />
      )}

      {/* ✅ Change Password Popup */}
      {showChangePassword && (
        <ChangePasswordPopup
          onClose={() => setShowChangePassword(false)}
          onSubmit={() => setShowChangePassword(false)}
        />
      )}
    </>
  );
}
