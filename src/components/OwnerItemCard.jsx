import React from "react";
import { FaPen, FaTrash } from "react-icons/fa6";

export default function OwnerItemCard({ data }) {
  console.log("OwnerItemCard data:", data);

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
          <div className="flex items-center gap-3 text-[#ff4d2d] cursor-pointer">
            <FaPen size={18} className="hover:text-orange-600" />
            <FaTrash size={18} className="hover:text-orange-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
