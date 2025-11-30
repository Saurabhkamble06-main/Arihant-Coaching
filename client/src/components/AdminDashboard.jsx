import React, { useEffect, useState } from "react";
import {
  Menu, X, LogOut, Users, BookOpen,
  CreditCard, LayoutDashboard, Edit, Trash2
} from "lucide-react";
import UsersList from "./UsersList";

export default function AdminDashboard({ onLogout }) {

  const API = process.env.REACT_APP_API_URL || "https://arihant-coaching.onrender.com";

  const [tab, setTab] = useState("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);

  const [payments, setPayments] = useState([]);
  const [courses, setCourses] = useState([]);

  // Users + pagination/search
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [pages, setPages] = useState(1);
  const [loadingUsers, setLoadingUsers] = useState(false);

  /* =====================================================
     ✅ Fetch All Payments
  ===================================================== */
  const fetchPayments = async () => {
    try {
      const res = await fetch(`${API}/api/payment`);
      const data = await res.json();
      setPayments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("❌ Payments Fetch Error:", err);
    }
  };

  /* =====================================================
     ✅ Fetch All Courses
  ===================================================== */
  const fetchCourses = async () => {
    try {
      const res = await fetch(`${API}/api/courses`);
      const data = await res.json();
      setCourses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("❌ Courses Fetch Error:", err);
    }
  };

  /* =====================================================
     ✅ Fetch Users (admin-protected, paginated, searchable)
  ===================================================== */
  const fetchUsers = async (p = page, q = query) => {
    try {
      setLoadingUsers(true);
      const token = localStorage.getItem("token");
      const headers = token
        ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
        : { "Content-Type": "application/json" };

      const params = new URLSearchParams({
        page: String(p),
        limit: String(limit),
      });
      if (q) params.set("q", q);

      const res = await fetch(`${API}/api/admin/users?${params.toString()}`, {
        method: "GET",
        headers,
      });

      if (!res.ok) {
        console.error("❌ Fetch users failed:", res.status);
        setUsers([]);
        setTotalUsers(0);
        setPages(1);
        setLoadingUsers(false);
        return;
      }

      const json = await res.json();
      setUsers(Array.isArray(json.users) ? json.users : []);
      setTotalUsers(json.total ?? (Array.isArray(json.users) ? json.users.length : 0));
      setPages(json.pages ?? 1);
      setPage(json.page ?? p);
      setLoadingUsers(false);
    } catch (err) {
      console.error("❌ Users Fetch Error:", err);
      setLoadingUsers(false);
    }
  };

  /* =====================================================
     🔁 Initial Load
  ===================================================== */
  useEffect(() => {
    fetchPayments();
    fetchCourses();
    fetchUsers(1, "");
  }, []);

  // Refetch users when page/limit change
  useEffect(() => {
    fetchUsers(page, query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  const onSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchUsers(1, query);
  };

  /* =====================================================
     📌 Unique Students Count
  ===================================================== */
  const students = [...new Set(payments.map(p => p.email))];

  /* =====================================================
     ✏️ Update Course
  ===================================================== */
  const updateCourse = async (id, updateData) => {
    try {
      await fetch(`${API}/api/courses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData)
      });
      fetchCourses();
    } catch (err) {
      console.error("❌ Update Course Error:", err);
    }
  };

  /* =====================================================
     ❌ Delete Course
  ===================================================== */
  const deleteCourse = async (id) => {
    if (!window.confirm("Delete this course permanently?")) return;

    try {
      await fetch(`${API}/api/courses/${id}`, { method: "DELETE" });
      fetchCourses();
    } catch (err) {
      console.error("❌ Delete Course Error:", err);
    }
  };

  /* =====================================================
     UI
  ===================================================== */
  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-800">

      {/* ================== SIDEBAR ================== */}
      <div className={`fixed md:static top-0 left-0 w-64 h-full bg-white shadow-lg z-50 
        transition-transform duration-300
        ${menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>

        <div className="flex justify-between items-center p-4 border-b">
          <h1 className="font-bold text-lg text-blue-600">Arihant Admin</h1>
          <button onClick={() => setMenuOpen(false)} className="md:hidden">
            <X />
          </button>
        </div>

        <div className="p-4 space-y-2">
          {[
            { key: "dashboard", icon: <LayoutDashboard />, label: "Dashboard" },
            { key: "users", icon: <Users />, label: "Users" },          // added Users tab
            { key: "students", icon: <Users />, label: "Students" },
            { key: "courses", icon: <BookOpen />, label: "Courses" },
            { key: "payments", icon: <CreditCard />, label: "Payments" }
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
        <div onClick={() => setMenuOpen(false)} className="fixed inset-0 bg-black/40 z-40 md:hidden" />
      )}

      {/* ================== MAIN ================== */}
      <div className="flex-1 p-5 md:ml-64">

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
                { title: "Users", value: totalUsers },        // Use totalUsers from server
                { title: "Courses", value: courses.length },
                { title: "Payments", value: payments.length }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-5 rounded-xl shadow border hover:shadow-md transition">
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
                    <th>Courses Enrolled</th>
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
                          onBlur={(e) => updateCourse(course._id, { fees: +e.target.value })}
                        />
                      </td>

                      <td>
                        <input
                          type="number"
                          defaultValue={course.limitedSeats}
                          className="border rounded px-2 py-1 w-20"
                          onBlur={(e) => updateCourse(course._id, {
                            limitedSeats: +e.target.value
                          })}
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
                      <td className={p.status === "Paid" ? "text-green-600" : "text-red-500"}>
                        {p.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ================== USERS ================== */}
        {tab === "users" && (
          <>
            <h2 className="text-xl font-bold mb-6">All Users</h2>

            {/* Search & Limit */}
            <div className="flex items-center gap-3 mb-4">
              <form onSubmit={onSearchSubmit} className="flex gap-2 items-center flex-1">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name or email"
                  className="w-full border px-3 py-2 rounded-lg"
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Search</button>
              </form>

              <select
                value={limit}
                onChange={(e) => {
                  setLimit(Number(e.target.value));
                  setPage(1);
                }}
                className="border px-3 py-2 rounded-lg"
              >
                {[5,10,25,50].map(n => <option key={n} value={n}>{n} / page</option>)}
              </select>
            </div>

            <div className="bg-white rounded-xl shadow p-4">
              {loadingUsers ? (
                <div className="text-center py-8 text-gray-500">Loading users...</div>
              ) : (
                <>
                  <UsersList users={users} />

                  {/* Pagination Controls */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-gray-600">
                      Showing {users.length} of {totalUsers} users
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        disabled={page <= 1}
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                      >
                        Prev
                      </button>

                      {/* Simple page numbers */}
                      <div className="text-sm px-2 py-1 border rounded">
                        Page {page} / {pages}
                      </div>

                      <button
                        disabled={page >= pages}
                        onClick={() => setPage(p => Math.min(p + 1, pages))}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
