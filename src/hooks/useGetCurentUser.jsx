import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { serveruri } from "../App";

export default function useGetCurentUser() {
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serveruri}/api/user/current_user`, {
          withCredentials: true,
        });
        console.log("Current user:", result);
      } catch (error) {
        console.log("error in fetchUser", error);
      }
    };
    fetchUser();
  }, []);
}
