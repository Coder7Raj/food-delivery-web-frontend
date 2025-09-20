import { Route, Routes } from "react-router-dom";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import ForgotPass from "../pages/ForgotPass";

export const serverURi = "http://localhost:5000";
function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/forgot_password" element={<ForgotPass />} />
    </Routes>
  );
}

export default App;
