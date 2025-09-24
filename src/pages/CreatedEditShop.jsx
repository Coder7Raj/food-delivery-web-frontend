import axios from "axios";
import React, { useState } from "react";
import { FaUtensils } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { serveruri } from "../App";
import { setMyShopData } from "../redux/ownerSlice";

export default function CreatedEditShop() {
  const { myShopData } = useSelector((state) => state.owner);
  const { currentCity, currentState, currentAddress } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //   const [name, setName] = useState(myShopData?.name || "");
  //   const [address, setAddress] = useState(myShopData?.address || currentAddress);
  //   const [city, setCity] = useState(myShopData?.city || currentCity);
  //   const [state, setState] = useState(myShopData?.state || currentState);
  const [name, setName] = useState(myShopData?.name ?? "");
  const [address, setAddress] = useState(
    myShopData?.address ?? currentAddress ?? ""
  );
  const [city, setCity] = useState(myShopData?.city ?? currentCity ?? "");
  const [state, setState] = useState(myShopData?.state ?? currentState ?? "");
  const [frontImage, setFrontImage] = useState(myShopData?.image || null);
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
      formData.append("city", city);
      formData.append("state", state);
      formData.append("address", address);
      if (backImage) {
        formData.append("image", backImage);
      }

      const result = await axios.post(
        `${serveruri}/api/shop/create_edit_shop`,
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
            {myShopData ? "Edit Shop" : "Add Shop"}
          </div>
        </div>
        {/* form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Shop Name:
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
              Shop Image:
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              {" "}
              <label className="block text-sm font-medium text-gray-600 mb-1">
                City:
              </label>
              <input
                type="text"
                placeholder="Enter City"
                className="w-full py-2 px-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
            </div>
            <div>
              {" "}
              <label className="block text-sm font-medium text-gray-600 mb-1">
                State:
              </label>
              <input
                type="text"
                placeholder="Enter State"
                className="w-full py-2 px-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setState(e.target.value)}
                value={state}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Shop Address:
            </label>
            <input
              type="text"
              placeholder="Enter Shop Address"
              className="w-full py-2 px-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
          </div>
          <button
            disabled={loading}
            className="w-full bg-[#ff4d2d] text-white px-6 py-3 cursor-pointer rounded-lg font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg transition-all"
          >
            {loading ? "Saving..." : "Save Shop"}
          </button>
        </form>
      </div>
    </div>
  );
}
