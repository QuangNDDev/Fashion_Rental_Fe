import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Admin from "./pages/admin/Admin";
import Staff from "./pages/staff/Staff";
import LoginForm from "./pages/admin-login/admin-login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="admin" element={<Admin />} />
      <Route path="staff" element={<Staff />} />
      <Route path="admin/login" element={<LoginForm />} />
    </Routes>
  );
}

export default App;
