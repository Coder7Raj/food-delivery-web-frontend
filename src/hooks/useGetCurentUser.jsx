import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { serveruri } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/user.slice";

export default function useGetCurentUser() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serveruri}/api/user/current_user`, {
          withCredentials: true,
        });
        dispatch(setUserData(result.data));
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };
    fetchUser();
  }, [dispatch]);
}
