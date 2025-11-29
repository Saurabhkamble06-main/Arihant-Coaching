import React, { useEffect, useState } from "react";
import {
  Menu, X, LogOut, Users, BookOpen,
  CreditCard, LayoutDashboard, Edit, Trash2
} from "lucide-react";

export default function AdminDashboard({ onLogout }) {

  const [tab, setTab] = useState("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const [payments, setPayments] = useState([]);
  const [courses, setCourses] = useState([]);

  // PRODUCTION API ONLY
  const API_URL = "https://arihant-coaching.onrender.com";

  // ============================
  // Fetch Courses
  // ============================
  const fetchCourses = () => {
    fetch(`${API_URL}/api/courses`)
      .then(res => res.json())
      .then(data => setCourses(Array.isArray(data) ? data : []))
      .catch(() => setCourses([]));
  };

  // ============================
  // Fetch Payments & Courses
  // ============================
  useEffect(() => {
    fetch(`${API_URL}/api/payment`)
      .then(res => res.json())
      .then(data => setPayments(Array.isArray(data) ? data : []))
      .catch(() => setPayments([]));

    fetchCourses();
  }, []);

  // Auto close mobile sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Students (unique emails)
  const students = [...new Set(payments.map(p => p.email))];

  // ============================
  // Update Course
  // ============================
  const updateCourse = async (id, data) => {
    await fetch(`${API_URL}/api/courses/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    fetchCourses();
  };

  // ============================
  // Delete Course
  // ============================
  const deleteCourse = async (id) => {
    if (!window.confirm("Delete this course permanently?")) return;

    await fetch(`${API_URL}/api/courses/${id}`, {
      method: "DELETE",
    });

    fetchCourses();
  };

  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-800">

      {/* ================== SIDEBAR ================== */}
      <div
        className={`fixed md:static top-0 left-0 w-64 h-full bg-white shadow-lg z-50 
        transition-transform duration-300
        ${menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >

        {/* Sidebar Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h1 className="font-bold text-lg text-blue-600">Arihant Admin</h1>
          <button onClick={() => setMenuOpen(false)} className="md:hidden">
            <X />
          </button>
        </div>

        {/* Sidebar Menu */}
        <div className="p-4 space-y-2">

          {[
            { key: "dashboard", icon: <LayoutDashboard />, label: "Dashboard" },
            { key: "students", icon: <Users />, label: "Students" },
            { key: "courses", icon: <BookOpen />, label: "Courses" },
            { key: "payments", icon: <CreditCard />, label: "Payments" },
          ].map(item => (
            <button
              key={item.key}
              onClick={() => {
                setTab(item.key);
                setMenuOpen(false);
              }}
              className={`flex gap-3 items-center w-full p-2 rounded-xl transition
              ${tab === item.key ? "bg-blue-600 text-white" : "hover:bg-blue-50"}`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}

          {/* Logout */}
          <button
            onClick={onLogout}
            className="flex gap-2 items-center w-full p-2 rounded-xl bg-red-500 text-white mt-6 hover:bg-red-600"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* ================== MAIN CONTENT ================== */}
      <div className="flex-1 p-5 md:ml-64">

        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <button onClick={() => setMenuOpen(true)}>
            <Menu />
          </button>
          <h2 className="font-bold text-lg">Admin Panel</h2>
        </div>

        {/* ================== DASHBOARD ================== */}
        {tab === "dashboard" && (
          <>
            <h2 className="text-xl font-bold mb-6">Dashboard</h2>

            <div className="grid md:grid-cols-3 gap-5">
              {[
                { title: "Students", value: students.length },
                { title: "Courses", value: courses.length },
                { title: "Payments", value: payments.length },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-xl shadow border hover:shadow-md transition"
                >
                  <p className="text-gray-500">{item.title}</p>
                  <h3 className="text-3xl font-bold text-blue-600">{item.value}</h3>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ================== STUDENTS ================== */}
        {tab === "students" && (
          <>
            <h2 className="text-xl font-bold mb-6">Students</h2>

            <div className="overflow-x-auto bg-white rounded-xl shadow p-4">
              <table className="w-full text-sm border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">Email</th>
                    <th>Courses</th>
                    <th>Total Paid</th>
                  </tr>
                </thead>

                <tbody>
                  {students.map((email, i) => {
                    const paid = payments.filter(p => p.email === email);
                    return (
                      <tr key={i} className="border-t hover:bg-gray-50">
                        <td className="p-3">{email}</td>
                        <td>{paid.length}</td>
                        <td className="font-bold text-blue-600">
                          ₹{paid.reduce((a, b) => a + b.amount, 0)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ================== COURSES ================== */}
        {tab === "courses" && (
          <>
            <h2 className="text-xl font-bold mb-6">Courses</h2>

            <div className="overflow-x-auto bg-white rounded-xl shadow p-4">
              <table className="w-full text-sm border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">Title</th>
                    <th>Fees</th>
                    <th>Seats</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {courses.map((course, i) => (
                    <tr key={i} className="border-t hover:bg-gray-50">
                      <td className="p-3">{course.title}</td>

                      <td>
                        <input
                          type="number"
                          defaultValue={course.fees}
                          className="border rounded px-2 py-1 w-20"
                          onBlur={(e) =>
                            updateCourse(course._id, { fees: +e.target.value })
                          }
                        />
                      </td>

                      <td>
                        <input
                          type="number"
                          defaultValue={course.limitedSeats}
                          className="border rounded px-2 py-1 w-20"
                          onBlur={(e) =>
                            updateCourse(course._id, { limitedSeats: +e.target.value })
                          }
                        />
                      </td>

                      <td>
                        <button className="text-blue-600 hover:text-blue-800">
                          <Edit size={16} />
                        </button>
                      </td>

                      <td>
                        <button
                          onClick={() => deleteCourse(course._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ================== PAYMENTS ================== */}
        {tab === "payments" && (
          <>
            <h2 className="text-xl font-bold mb-6">Payments</h2>

            <div className="overflow-x-auto bg-white rounded-xl shadow p-4">
              <table className="w-full text-sm border">
                <thead className="bg-gray-100">
                  <tr>
                    <th>Student</th>
                    <th>Course</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {payments.map((p, i) => (
                    <tr key={i} className="border-t hover:bg-gray-50">
                      <td className="p-3">{p.studentName}</td>
                      <td>{p.course}</td>
                      <td className="text-green-600 font-bold">
                        ₹{p.amount}
                      </td>
                      <td
                        className={
                          p.status === "Success"
                            ? "text-green-600"
                            : "text-red-500"
                        }
                      >
                        {p.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
