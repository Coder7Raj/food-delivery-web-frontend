import axios from "axios";
import React from "react";
import { FaPen, FaTrash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { serveruri } from "../App";
import { setMyShopData } from "../redux/ownerSlice";
import { useDispatch } from "react-redux";
export default function OwnerItemCard({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      const result = await axios.get(
        `${serveruri}/api/item/delete_item/${data._id}`,
        { withCredentials: true }
      );
      dispatch(setMyShopData(result.data));
    } catch (error) {
      console.log("delete item error", error);
    }
  };
  return (
    <div className="flex bg-white rounded-lg shadow-md overflow-hidden border border-[#ff4d2d] w-full max-w-2xl">
      {/* Image Section */}
      <div className="w-36 h-36 bg-gray-50 flex items-center justify-center">
        <img
          src={data?.image || "/placeholder-food.png"}
          alt={data?.name || "Food item"}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col p-3 flex-1">
        <div>
          <h2 className="text-base font-semibold text-[#ff4d2d]">
            {data?.name || "Untitled Item"}
          </h2>
          <p className="text-gray-600">
            <span className="font-bold">Category:</span>{" "}
            {data?.category || "N/A"}
          </p>
          <p className="text-gray-600">
            <span className="font-bold">Food Type:</span>{" "}
            {data?.foodType || "N/A"}
          </p>
        </div>

        <div className="flex justify-between items-center gap-4 mt-2">
          <p className="text-gray-600">
            <span className="font-bold">Price: </span>
            {data?.price ? `$${data.price}` : "N/A"}
          </p>
          <div className="flex items-center gap-3">
            <p className="bg-[#ff4d2d] text-white p-2 rounded-full hover:bg-orange-600 hover:text-white transition-all cursor-pointer">
              <FaPen
                size={18}
                onClick={() => navigate(`/edit_food_items/${data._id}`)}
              />
            </p>
            <p className="bg-[#ff4d2d] text-white p-2 rounded-full hover:bg-orange-600 hover:text-white transition-all cursor-pointer">
              <FaTrash size={18} onClick={handleDelete} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
