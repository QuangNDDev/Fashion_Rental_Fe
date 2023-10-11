import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Admin from "./pages/admin/Admin";
import Staff from "./pages/staff/Staff";
import LoginForm from "./pages/admin-login/admin-login";
import PrivateRoute from "./components/protect-page/Protect-Pages";

function App() {
  return (
    <Routes>
      <Route path="" element={<LoginForm />} />   
      <Route path="login" element={<LoginForm />} />   
      <Route path="staff" element={<Staff />} />
      {/* Protect admin page  */}
      <Route element={<PrivateRoute />}>
      <Route path="admin" element={<Admin />} />
      </Route>
    </Routes>
  );
}

export default App;
