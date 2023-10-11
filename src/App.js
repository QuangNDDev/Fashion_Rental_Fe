import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Admin from "./pages/admin/Admin";
import Staff from "./pages/staff/Staff";
import LoginForm from "./pages/admin-login/admin-login";
import PrivateRoute from "./components/protect-page/Protect-Page-Admin";
import PrivateRouteAdmin from "./components/protect-page/Protect-Page-Admin";
import PrivateRouteStaff from "./components/protect-page/Protect-Pages-Staff";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />   
      <Route path="login" element={<LoginForm />} />   
      
      {/* Protect admin page  */}
      <Route element={<PrivateRouteAdmin />}>
      <Route path="admin" element={<Admin />} />
      </Route>
       {/* Protect staff page */}
      <Route element={<PrivateRouteStaff />}>
      <Route path="staff" element={<Staff />} />
      </Route>
    </Routes>
  );
}

export default App;
