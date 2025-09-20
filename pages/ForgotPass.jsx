import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function ForgotPass() {
  const navigate = useNavigate();
  const [step, setStep] = useState(3);
  const [otp, setOtp] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#fff9f6]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center gap-2">
          <FaArrowLeftLong
            size={20}
            className="text-[#ff4d2d] cursor-pointer"
            onClick={() => navigate("/signin")}
          />
          <h1 className="text-xl font-bold text-center text-[#ff4d2d]">
            Forgot Password
          </h1>
        </div>
        {/* Step 1: Email Input */}
        {step === 1 && (
          <>
            {/* email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                placeholder="Enter your email"
                style={{ border: `1px solid #ddd` }}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <button className="w-full font-semibold text-white rounded-lg py-2 transition duration-200 bg-[#ff4d2d] hover:bg-[#e64323] cursor-pointer">
              Send OTP
            </button>
          </>
        )}
        {/* Step 2: OTP Input */}
        {step === 2 && (
          <>
            <div className="mb-4 relative">
              <label
                htmlFor="OTP"
                className="block text-gray-700 font-medium mb-1"
              >
                OTP
              </label>
              <input
                type={showOTP ? "text" : "password"}
                className="w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:border-orange-500"
                placeholder="Enter the OTP"
                style={{ border: `1px solid #ddd` }}
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
              />
              <span
                onClick={() => setShowOTP((prev) => !prev)}
                className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
                title={showOTP ? "Hide OTP" : "Show OTP"}
              >
                {showOTP ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </span>
            </div>
            <button className="w-full font-semibold text-white rounded-lg py-2 transition duration-200 bg-[#ff4d2d] hover:bg-[#e64323] cursor-pointer">
              Verify OTP
            </button>
          </>
        )}
        {/* Step 2: OTP Input */}
        {step === 3 && (
          <>
            <div className="mb-4 relative">
              <label
                htmlFor="newPassword"
                className="block text-gray-700 font-medium mb-1"
              >
                New Password
              </label>
              <input
                type={password ? "text" : "password"}
                className="w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:border-orange-500"
                placeholder="Enter your new password"
                style={{ border: `1px solid #ddd` }}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <span
                onClick={() => setPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
                title={password ? "Hide Password" : "Show Password"}
              >
                {password ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </span>
            </div>
            <div className="mb-4 relative">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-medium mb-1"
              >
                Confirm Password
              </label>
              <input
                type={confirmPassword ? "text" : "password"}
                className="w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:border-orange-500"
                placeholder="Enter your confirm password"
                style={{ border: `1px solid #ddd` }}
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
              <span
                onClick={() => setShowOTP((prev) => !prev)}
                className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
                title={
                  confirmPassword
                    ? "Hide Confirm Password"
                    : "Show Confirm Password"
                }
              >
                {confirmPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </span>
            </div>
            <button className="w-full font-semibold text-white rounded-lg py-2 transition duration-200 bg-[#ff4d2d] hover:bg-[#e64323] cursor-pointer">
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
}
