import React, { useState } from "react";
import { FaLock, FaRedo, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Otp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const correctOTP = localStorage.getItem("otp");

  const handleChange = (e) => {
    const { value } = e.target;
    if (value.length <= 6 && /^[0-9]*$/.test(value)) {
      setOtp(value);
    }
  };

  const handleSubmit = () => {
    if (otp != correctOTP) {
      alert("You have entered wrong otp");
      return;
    }
    navigate("/");
  };

  const handleResendOtp = () => {
    alert("OTP Resent!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 w-full max-w-xs sm:max-w-sm md:w-96">
        <div className="flex flex-col items-center">
          <FaLock className="text-3xl md:text-4xl text-blue-500 mb-3 md:mb-4" />
          <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-700">
            Enter OTP
          </h2>
          <p className="text-xs md:text-sm text-gray-600 mb-4 md:mb-6 text-center">
            We've sent an OTP to your email. Please enter it below to verify
            your account.
          </p>
          <div className="mb-4 md:mb-6 w-full">
            <input
              type="text"
              value={otp}
              onChange={handleChange}
              maxLength="6"
              placeholder="Enter 6-digit OTP"
              className="w-full px-3 md:px-4 py-2 text-center text-base md:text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all mb-3 md:mb-4 text-sm md:text-base"
            onClick={handleSubmit}
          >
            <FaCheckCircle className="mr-2" /> Verify OTP
          </button>
          <button
            className="text-blue-500 text-xs md:text-sm flex items-center hover:text-blue-700"
            onClick={handleResendOtp}
          >
            <FaRedo className="mr-1" /> Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default Otp;
