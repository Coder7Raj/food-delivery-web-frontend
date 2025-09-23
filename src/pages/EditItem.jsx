import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUtensils } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { serveruri } from "../App";
import { setMyShopData } from "../redux/ownerSlice";

export default function EditItem() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentItem, setCurentItem] = useState(null);
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
  const [foodType, setFoodType] = useState("");
  const [frontImage, setFrontImage] = useState("");
  const [backImage, setBackImage] = useState(null);
  const { itemId } = useParams();
  const [loading, setLoading] = useState(false);

  //   const handleImage = (e) => {
  //     const file = e.target.files[0];
  //     setBackImage(file);
  //     setFrontImage(URL.createObjectURL(file));
  //   };
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return; // <-- safeguard
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
        `${serveruri}/api/item/edit_item/${itemId}`,
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

  useEffect(() => {
    const handleGetItemById = async () => {
      try {
        const result = await axios.get(
          `${serveruri}/api/item/get_by_id/${itemId}`,
          { withCredentials: true }
        );
        setCurentItem(result?.data);
      } catch (error) {
        console.log("get item error", error);
      }
    };
    handleGetItemById();
  }, [itemId]);

  useEffect(() => {
    setName(currentItem?.name || "");
    setPrice(currentItem?.price || 0);
    setCategory(currentItem?.category || "");
    setFoodType(currentItem?.foodType || "");
    setFrontImage(currentItem?.image || "");
  }, [currentItem]);
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
            Edit Food Item
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
              placeholder="Enter Shop Name"
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
            {loading ? "Saving..." : "Save Food"}
          </button>
        </form>
      </div>
    </div>
  );
}
