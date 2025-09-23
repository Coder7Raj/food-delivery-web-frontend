import React from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { FaPen, FaUtensils } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function OwnerDashboard() {
  const { myShopData } = useSelector((state) => state.owner);
  console.log("my shop data", myShopData);
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

      {myShopData && (
        <div className="w-full flex flex-col items-center gap-6 px-4">
          <h1 className="text-xl text-gray-800 flex items-center gap-3 mt-6">
            <FaUtensils size={30} className="text-[#ff4d2d]" /> Welcome to{"- "}
            {myShopData?.name}
          </h1>

          <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-orange-100 hover:shadow-2xl transition-all duration-300 w-full max-w-3xl relative">
            <div className="absolute top-4 right-4 bg-[#ff4d2d] text-white p-2 rounded-full shadow-md hover:bg-orange-600 transition-all">
              <FaPen
                size={20}
                className="text-white cursor-pointer"
                onClick={() => navigate("/create_edit_shop")}
              />
            </div>
            <img
              src={myShopData?.image}
              alt={myShopData?.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h1 className="text-xl font-bold text-gray-800 mb-2">
                {myShopData?.name}
              </h1>
              <p className="text-gray-500 mb-2">
                {myShopData?.city}, {myShopData?.state}
              </p>
              <p className="text-gray-500 mb-2">{myShopData?.address}</p>
            </div>
          </div>
          {myShopData?.item?.length == 0 && (
            <div className="flex justify-center items-center p-4">
              <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col items-center text-center">
                  <FaUtensils size={20} className="text-[#ff4d2d]" />
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    Add Your Food Item
                  </h2>
                  <p className="text-gray-600 text-sm mb-2">
                    Share your delicious creations with our customers by adding
                    them to the menu.
                  </p>
                  <button
                    onClick={() => navigate("/add_food_item")}
                    className="bg-[#ff4d2d] text-white px-4 py-2 rounded-full font-medium shadow-md hover:bg-orange-600 transition-colors duration-200"
                  >
                    Add Food
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
