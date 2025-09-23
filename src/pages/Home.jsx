import React from "react";
import { useSelector } from "react-redux";
import UserDashboard from "../components/UserDashboard";
import OwnerDashboard from "../components/OwnerDashboard";
import DeliveryBoy from "../components/DeliveryBoy";

export default function Home() {
  const { userData } = useSelector((state) => state.user);
  return (
    <div className="min-h-[100vh] flex items-center justify-center">
      {userData.role == "user" && <UserDashboard />}
      {userData.role == "owner" && <OwnerDashboard />}
      {userData.role == "deliveryBoy" && <DeliveryBoy />}
    </div>
  );
}
