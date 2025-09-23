import React from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { FaUtensils } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function OwnerDashboard() {
  const { myShopData } = useSelector((state) => state.owner);
  const navigate = useNavigate();

  return (
    <div className="w-full h-[100vh] bg-[#fff9f6] flex justify-center items-center">
      <Navbar />
      {!myShopData && (
        <>
          <div className="flex justify-center items-center p-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col items-center text-center">
                <FaUtensils size={20} className="text-[#ff4d2d]" />
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  Add Your Restaurant
                </h2>
                <p className="text-gray-600 text-sm mb-2">
                  Join our food delivery platform and reach thousands or hungry
                  customers every day.
                </p>
                <button
                  onClick={() => navigate("/create_edit_shop")}
                  className="bg-[#ff4d2d] text-white px-4 py-2 rounded-full font-medium shadow-md hover:bg-orange-600 transition-colors duration-200"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
