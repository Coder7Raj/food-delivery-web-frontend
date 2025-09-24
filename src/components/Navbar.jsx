import React from "react";
import { FaLocationDot, FaPlus } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/user.slice";
import axios from "axios";
import { serveruri } from "../App";
import toast from "react-hot-toast";
import { TbReceipt2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { userData, currentCity } = useSelector((state) => state.user);
  // const { myShopData } = useSelector((state) => state.owner);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const result = await axios.get(`${serveruri}/api/auth/signout`, {
        withCredentials: true,
      });
      if (result?.data?.success) {
        dispatch(setUserData(null));
      }
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error(
        `${error?.response?.data?.message} || ${"Something went wrong"}`
      );
    }
  };
  return (
    <div className="w-full h-[80px] flex items-center justify-between md:justify-center gap-8 px-5 fixed top-0 z-[9999] bg-[#fff9f6] overflow-visible">
      <h1 className="text-3xl font-bold mb-2 text-[#ff4d2d]">Vingo</h1>
      {userData.role == "user" && (
        <div className="md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl rounded-lg hidden md:flex items-center gap-5">
          {/*  */}
          <div className="flex items-center w-[30%] overflow-hidden gap-3 px-3 border-r-2 border-gray-400">
            <FaLocationDot size={25} className="text-[#ff4d2d]" />
            <div className="w-[80%] truncate text-gray-600">{currentCity}</div>
          </div>
          <div className="w-[80%] flex items-center gap-2">
            <IoIosSearch size={25} className="text-[#ff4d2d] cursor-pointer" />
            <input
              type="text"
              placeholder="Search delicious food..."
              className="px-2 text-gray-700 outline-0 w-full"
            />
          </div>
          {/*  */}
        </div>
      )}
      {/* for user */}
      {userData.role == "user" && (
        <div className="relative cursor-pointer">
          <FiShoppingCart size={25} className="text-[#ff4d2d]" />
          <span className="absolute right-[-9px] top-[-12px] text-[#ff4d2d]">
            0
          </span>
        </div>
      )}
      {/* owner */}
      {/* {userData.role == "owner" && (
        <>
          <div className="flex gap-1 items-center px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium cursor-pointer">
            <FaPlus size={20} />
            <span>Add Food Item</span>
          </div>
        </>
      )} */}
      {userData.role == "owner" && (
        <>
          <div
            onClick={() => navigate("/add_food_items")}
            className="flex gap-1 items-center px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium cursor-pointer"
          >
            <FaPlus size={20} />
            <span>Add Food Item</span>
          </div>
        </>
      )}
      {userData.role == "user" && (
        <button className="hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium cursor-pointer">
          My Order's
        </button>
      )}
      {/* owner */}
      {userData.role == "owner" && (
        <>
          <div className="relative flex gap-1 items-center px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium cursor-pointer">
            <TbReceipt2 size={20} />
            <span>Pending Orders</span>
            <span className="absolute -right-2 -top-2 text-xs font-bold bg-[#ff4d2d] text-white px-2 py-1 rounded-full">
              0
            </span>
          </div>
        </>
      )}
      {/* name */}
      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-lg shadow-xl font-semibold cursor-pointer">
        {userData?.fullName.slice(0, 1).toUpperCase()}
      </div>
      {/* logout button */}
      <button
        onClick={handleLogout}
        className="w-10 h-10 rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-lg shadow-xl font-semibold cursor-pointer"
      >
        out
      </button>
    </div>
  );
}
