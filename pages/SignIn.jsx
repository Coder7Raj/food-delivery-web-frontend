import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import axios from "axios";
import { serverURi } from "../src/App";

export default function SignUp() {
  const primaryColor = "#ff4d2d";
  //   const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(email, password);
  const handleSignIn = async () => {
    try {
      const result = await axios.post(
        `${serverURi}/api/auth/signin`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log("result", result);
    } catch (error) {
      console.log("sign in error", error);
    }
  };
  return (
    <div
      className="min-h-screen flex items-center justify-center p-2"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 border"
        style={{ borderColor: borderColor }}
      >
        <h1 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
          Vingo
        </h1>
        <p className="text-gray-600 mb-8">
          Sign In with an account to get started with our food delivery service.
        </p>
        {/* form */}

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
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        {/* password */}
        <div className="mb-4 relative">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500 pr-10"
            placeholder="Enter your password"
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-9 cursor-pointer text-gray-500"
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </span>
          <div className="text-right mb-4">
            <Link
              to="/forgot_password"
              className="text-right text-sm text-[#ff4d2d] font-medium transition-colors"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
        <button
          onClick={handleSignIn}
          className="w-full font-semibold text-white rounded-lg py-2 transition duration-200 bg-[#ff4d2d] hover:bg-[#e64323] cursor-pointer"
        >
          Sign In
        </button>
        <p className="text-center">or</p>
        <button className="flex items-center justify-center border gap-2 w-full font-semibold text-black rounded-lg py-2 transition duration-200 hover:bg-gray-200 cursor-pointer">
          <FcGoogle size={20} /> Sign In with Google
        </button>
        <p className="text-sm text-gray-600 mt-2 text-center">
          Don't have an account?
          <Link
            to="/signup"
            className="text-[#ff4d2d] font-medium transition-colors"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
