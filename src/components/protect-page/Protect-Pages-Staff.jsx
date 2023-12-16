import { Avatar, Badge, Button, Modal } from "antd";
import { Header } from "antd/es/layout/layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import {
  BellOutlined,
  CheckOutlined,
  EyeFilled,
  LogoutOutlined,
  MailFilled,
  NotificationFilled,
  DeliveredProcedureOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import Notification from "../notification/Notification";
function PrivateRouteStaff() {
  const isAuthen = true;
  // let [isLoad, setIsLoad] = useState(true);
  let navigate = useNavigate();
  const [staff, setStaff] = useState([]);
  const [accountID, setAccountID] = useState([]);
  const idAccount = localStorage.getItem("accountId");
  const [unreadNotificationCount, setUnreadNotificationCount] = useState("3");
  const [isNotificationModalVisible, setNotificationModalVisible] = useState(false);

  useEffect(() => {
    const account = localStorage.getItem("roleId");
    if (account != 3) {
      navigate("/login");
    }
  });

  const fetchStaff = async () => {
    try {
      const response = await axios.get("http://fashionrental.online:8080/account/" + idAccount);
      setStaff(response.data.data.staff);
      localStorage.setItem("staffId", response.data.data.staff.staffID);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAccountID = async () => {
    try {
      const response = await axios.get("http://fashionrental.online:8080/account/" + idAccount);
      setAccountID(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStaff();
    fetchAccountID();
  }, []);

  const showNotificationModal = () => {
    setNotificationModalVisible(true);
    setUnreadNotificationCount(0); // Đánh dấu tất cả thông báo là đã đọc khi mở modal
  };

  const hideNotificationModal = () => {
    setNotificationModalVisible(false);
  };
  const handleLogout = () => {
    navigate("/login");
    localStorage.removeItem("roleId");
    localStorage.removeItem("staffId");
    localStorage.removeItem("accountId");
    console.log("Logged out");
  };

  if (isAuthen) {
    return (
      <>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",

            backgroundColor: "RGB(32, 30, 42)",
          }}
          responsive
        >
          {/* Hiển thị logo tạm thời */}
          <div
            onClick={() => {
              navigate("/staff");
            }}
            style={{ color: "#fff", display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <img src="/brand_logo.png" alt="Brand Logo" width={70} height={50} />
            <h2 style={{ color: "#fff", fontWeight: "normal" }}>Kênh nhân viên</h2>
          </div>
          {/* Biểu tượng chuông thông báo và avatar */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={
                staff?.avatarUrl
                  ? staff.avatarUrl
                  : "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
              }
              alt="User Avatar"
              style={{ width: "38px", height: "38px", marginLeft: "10px" }}
            />
            <span
              style={{
                marginLeft: "10px",
                color: "white",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              {staff?.fullName ? staff.fullName : ""}
            </span>

            <Badge count={unreadNotificationCount}>
              <MessageOutlined
                style={{
                  fontSize: "20px",
                  color: "white",
                  cursor: "pointer",
                  marginLeft: "25px",
                }}
                onClick={() => {
                  navigate("/staff/chat");
                }}
              />
            </Badge>
            <Notification />
            <Button
              type="link"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              style={{ marginLeft: 16, color: "white" }}
            >
              Đăng xuất
            </Button>
          </div>
        </Header>
        <Outlet />
        <Modal
          title="Thông báo"
          open={isNotificationModalVisible}
          onCancel={hideNotificationModal}
          footer={null}
          style={{ position: "absolute", bottom: "50px", right: "20px" }}
        >
          {/* Nội dung thông báo ở đây */}
          <Notification />
        </Modal>
      </>
    );
  }

  return <div>PrivateRoute</div>;
}

export default PrivateRouteStaff;
