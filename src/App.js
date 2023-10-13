
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Admin from "./pages/admin/Admin";
import Staff from "./pages/staff/Staff";
import LoginForm from "./pages/admin-login/admin-login";
import PrivateRouteAdmin from "./components/protect-page/Protect-Page-Admin";
import PrivateRouteStaff from "./components/protect-page/Protect-Pages-Staff";
import ProductOwner from "./pages/product-owner/product-owner";
import PrivateRouteProductOwner from "./components/protect-page/Protect-Page-ProductOwner";

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
      {/* Protect product owner page */}
      <Route element={<PrivateRouteProductOwner />}>
      <Route path="productowner" element={<ProductOwner />} />
      </Route>
    </Routes>
  );
}

export default App;
