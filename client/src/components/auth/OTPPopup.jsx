import React, { useState } from "react";

export default function OTPPopup({ onVerify, onResend, onClose, email }) {

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      alert("Please enter valid 6 digit OTP");
      return;
    }

    setLoading(true);
    await onVerify(otp);
    setLoading(false);
  };

  const handleResend = async () => {
    setResending(true);
    await onResend();
    setTimeout(() => setResending(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[9999]">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md relative text-center">

        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-600 hover:text-black text-lg"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-2 text-blue-700">
          Verify OTP
        </h2>

        <p className="text-gray-500 text-sm mb-6">
          OTP sent to <span className="font-semibold">{email}</span>
        </p>

        <input
          type="text"
          maxLength="6"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          placeholder="Enter 6-digit OTP"
          className="w-full text-center tracking-[0.4em] text-2xl border p-3 mb-6 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <button
          onClick={handleVerify}
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white font-semibold transition 
            ${loading ? "bg-gray-400" : "bg-blue-700 hover:bg-blue-800"}
          `}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <div className="mt-4 text-sm">
          Didn’t receive OTP?{" "}
          <button
            onClick={handleResend}
            disabled={resending}
            className={`font-semibold 
              ${resending ? "text-gray-400" : "text-blue-700 hover:underline"}
            `}
          >
            {resending ? "Resending..." : "Resend OTP"}
          </button>
        </div>

      </div>
    </div>
  );
}
