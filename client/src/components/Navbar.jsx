import React, { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar({
  onHome,
  onAbout,
  onCourses,
  onReviews,
  onBlog,
  onTerms,
  onContact,
  onLogin,
  onRegister,
  onLogout,
  onChangePassword,
  user,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  const navRef = useRef(null);

  // 🔥 Auto calculate navbar height
  useEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight);
    }

    const handleResize = () => {
      if (navRef.current) {
        setNavHeight(navRef.current.offsetHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = (action) => {
    action();
    setMenuOpen(false);
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-md"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">

          {/* LOGO */}
          <h1
            onClick={() => handleNavClick(onHome)}
            className="text-xl md:text-2xl font-extrabold text-blue-700 tracking-wide cursor-pointer"
          >
            Arihant Coaching
          </h1>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex space-x-6 text-gray-700 font-semibold">
            <button onClick={() => handleNavClick(onHome)} className="hover:text-blue-600">Home</button>
            <button onClick={() => handleNavClick(onAbout)} className="hover:text-blue-600">About</button>
            <button onClick={() => handleNavClick(onCourses)} className="hover:text-blue-600">Courses</button>
            <button onClick={() => handleNavClick(onReviews)} className="hover:text-blue-600">Reviews</button>
            <button onClick={() => handleNavClick(onBlog)} className="hover:text-blue-600">Blog</button>
            <button onClick={() => handleNavClick(onTerms)} className="hover:text-blue-600">Terms</button>
            <button onClick={() => handleNavClick(onContact)} className="hover:text-blue-600">Contact</button>
          </div>

          {/* RIGHT SIDE (DESKTOP) */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-blue-700 font-semibold text-sm whitespace-nowrap">
                  Welcome, {user.name}
                </span>

                <button
                  onClick={onChangePassword}
                  className="border border-blue-700 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-700 hover:text-white transition"
                >
                  Change Password
                </button>

                <button
                  onClick={onLogout}
                  className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onLogin}
                  className="text-blue-700 font-semibold"
                >
                  Login
                </button>

                <button
                  onClick={onRegister}
                  className="bg-blue-700 text-white px-4 py-1 rounded-lg hover:bg-blue-800 transition"
                >
                  Register
                </button>
              </>
            )}
          </div>

          {/* MOBILE MENU ICON */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(true)}>
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* ✅ AUTO SPACER (Fix Header Overlap Issue) */}
      <div style={{ height: navHeight }}></div>

      {/* ================= MOBILE BACKDROP ================= */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* ================= MOBILE SLIDE MENU ================= */}
      <div
        className={`fixed top-0 right-0 w-72 h-full bg-white z-50 shadow-2xl transition-transform duration-300
        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center px-5 py-4 border-b">
          <h3 className="text-lg font-bold text-blue-700">Menu</h3>
          <button onClick={() => setMenuOpen(false)}>
            <X size={26} />
          </button>
        </div>

        <div className="flex flex-col px-5 py-4 space-y-3 text-gray-700 font-medium">
          <button onClick={() => handleNavClick(onHome)}>Home</button>
          <button onClick={() => handleNavClick(onAbout)}>About</button>
          <button onClick={() => handleNavClick(onCourses)}>Courses</button>
          <button onClick={() => handleNavClick(onReviews)}>Reviews</button>
          <button onClick={() => handleNavClick(onBlog)}>Blog</button>
          <button onClick={() => handleNavClick(onTerms)}>Terms</button>
          <button onClick={() => handleNavClick(onContact)}>Contact</button>

          <div className="pt-4 border-t mt-4 space-y-3">
            {user ? (
              <>
                <span className="font-semibold text-blue-700">
                  Welcome, {user.name}
                </span>

                <button
                  onClick={() => {
                    onChangePassword();
                    setMenuOpen(false);
                  }}
                  className="border border-blue-700 text-blue-700 px-3 py-1 rounded-lg"
                >
                  Change Password
                </button>

                <button
                  onClick={() => {
                    onLogout();
                    setMenuOpen(false);
                  }}
                  className="bg-red-600 text-white px-3 py-1 rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    onLogin();
                    setMenuOpen(false);
                  }}
                  className="text-blue-700 font-semibold"
                >
                  Login
                </button>

                <button
                  onClick={() => {
                    onRegister();
                    setMenuOpen(false);
                  }}
                  className="bg-blue-700 text-white px-4 py-1 rounded-lg"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
