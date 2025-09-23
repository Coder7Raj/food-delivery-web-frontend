import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { serveruri } from "../App";
import { useDispatch } from "react-redux";
import { setMyShopData } from "../redux/ownerSlice.js";

export default function useGetMyShop() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchShop = async () => {
      try {
        const result = await axios.get(`${serveruri}/api/shop/getmy_shop`, {
          withCredentials: true,
        });
        dispatch(setMyShopData(result.data));
      } catch (error) {
        console.error("Error fetching to shop:", error);
      }
    };
    fetchShop();
  }, [dispatch]);
}
