import React, { useState } from "react";

export default function ChangePasswordPopup({ onClose, onSubmit }) {

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!oldPassword || !newPassword) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    await onSubmit(oldPassword, newPassword);

    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[9999]">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md relative">

        {/* ❌ CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-600 hover:text-black text-lg"
        >
          ✕
        </button>

        {/* ✅ TITLE */}
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
          Change Password
        </h2>

        {/* OLD PASSWORD */}
        <input
          type="password"
          placeholder="Enter old password"
          className="w-full border p-3 mb-4 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />

        {/* NEW PASSWORD */}
        <input
          type="password"
          placeholder="Enter new password"
          className="w-full border p-3 mb-6 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        {/* UPDATE BUTTON */}
        <button
          onClick={handleUpdate}
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white font-semibold transition 
            ${loading ? "bg-gray-400" : "bg-blue-700 hover:bg-blue-800"}
          `}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>

    </div>
  );
}
