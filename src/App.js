import "./App.css";
import { Route, Routes } from "react-router-dom";
import Admin from "./pages/admin/Admin";
import Staff from "./pages/staff/Staff";
import LoginForm from "./pages/admin-login/admin-login";
import PrivateRouteAdmin from "./components/protect-page/Protect-Page-Admin";
import PrivateRouteStaff from "./components/protect-page/Protect-Pages-Staff";
import ProductOwner from "./pages/product-owner/product-owner";
import PrivateRouteProductOwner from "./components/protect-page/Protect-Page-ProductOwner";
import RegisterForm from "./components/RegisterForm";
import Chat from "./components/chat";
import ChatDetail from "./components/chat/chat-detail";
import useRealtime from "./hooks/useRealtime";
import useNotification from "antd/es/notification/useNotification";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="login" element={<LoginForm />} />

        {/* Protect admin page  */}
        <Route element={<PrivateRouteAdmin />}>
          <Route path="admin">
            <Route path="" element={<Admin />} />
            <Route path="chat" element={<Chat role={"AD"} />}>
              <Route path=":id" element={<ChatDetail />} />
            </Route>
          </Route>
        </Route>
        {/* Protect staff page */}
        <Route element={<PrivateRouteStaff />}>
          <Route path="staff">
            <Route path="" element={<Staff />} />
            <Route path="chat" element={<Chat role={"ST"} />}>
              <Route path=":id" element={<ChatDetail />} />
            </Route>
          </Route>
        </Route>
        {/* Protect product owner page */}
        <Route element={<PrivateRouteProductOwner />}>
          <Route path="productowner">
            <Route path="" element={<ProductOwner />}></Route>
            <Route path="chat" element={<Chat role={"PO"} />}>
              <Route path=":id" element={<ChatDetail />} />
            </Route>
          </Route>
        </Route>
        {/* Register */}
        <Route path="register" element={<RegisterForm />}></Route>
      </Routes>
    </>
  );
}

export default App;
