import axios from "axios";
import React, { useState } from "react";
import { FaUtensils } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { serveruri } from "../App";
import { setMyShopData } from "../redux/ownerSlice";

export default function AddFoodItem() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //   const [name, setName] = useState(myShopData?.name || "");
  //   const [address, setAddress] = useState(myShopData?.address || currentAddress);
  //   const [city, setCity] = useState(myShopData?.city || currentCity);
  //   const [state, setState] = useState(myShopData?.state || currentState);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const categories = [
    "Snacks",
    "Main Course",
    "Desserts",
    "Pizza",
    "Burgers",
    "Chinese",
    "Sandwiches",
    "Fast Food",
    "Soup",
    "Others",
  ];
  const [foodType, setFoodType] = useState("veg");
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackImage(file);
    setFrontImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("foodType", foodType);
      if (backImage) {
        formData.append("image", backImage);
      }

      const result = await axios.post(
        `${serveruri}/api/item/add_item`,
        formData,
        { withCredentials: true }
      );
      dispatch(setMyShopData(result.data));
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log("form submit error", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center flex-col items-center p-6 bg-gradient-to-br from-orange-50 relative to-white min-h-screen">
      <div
        className="absolute top-5 left-5 z-10 mb-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <IoIosArrowBack size={35} className="text-[#ff4d2d]" />
      </div>
      <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 border border-orange-100">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-orange-100 p-4 rounded-full mb-4">
            <FaUtensils size={25} className="text-[#ff4d2d]" />
          </div>
          <div className="text-2xl font-medium text-gray-600">
            Add food item
          </div>
        </div>
        {/* form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Name:
            </label>
            <input
              type="text"
              placeholder="Enter Food Name"
              className="w-full py-2 px-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Price:
            </label>
            <input
              type="number"
              placeholder="0"
              className="w-full py-2 px-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Category:
            </label>
            <select
              className="w-full py-2 px-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="">Select Category</option>
              {categories?.map((cat, index) => (
                <option value={cat} key={index}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Food Type:
            </label>
            <select
              className="w-full py-2 px-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => setFoodType(e.target.value)}
              value={foodType}
            >
              <option value="veg">veg</option>
              <option value="non-veg">non veg</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Image:
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full py-2 px-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={handleImage}
            />
            {frontImage && (
              <div className="mt-2">
                <img
                  src={frontImage}
                  alt=""
                  className="w-full h-48 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>
          <button
            disabled={loading}
            className="w-full bg-[#ff4d2d] text-white px-6 py-3 cursor-pointer rounded-lg font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg transition-all"
          >
            {loading ? "Adding Food..." : "Add Food"}
          </button>
        </form>
      </div>
    </div>
  );
}
