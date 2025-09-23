import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPass from "./pages/ForgotPass";
import useGetCurentUser from "./hooks/useGetCurentUser";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import useGetCity from "./hooks/useGetCity";
import useGetMyShop from "./hooks/useGetMyShop";

export const serveruri = "http://localhost:5000";
function App() {
  useGetCurentUser();
  useGetCity();
  useGetMyShop();
  const { userData } = useSelector((state) => state.user);
  return (
    <Routes>
      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to="/" />}
      />
      <Route
        path="/signin"
        element={!userData ? <SignIn /> : <Navigate to="/" />}
      />
      <Route
        path="/forgot_password"
        element={!userData ? <ForgotPass /> : <Navigate to="/" />}
      />
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to="/signin" />}
      />
    </Routes>
  );
}

export default App;
