import { Avatar, Badge, Button, Modal } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import {
  LogoutOutlined,
  BellOutlined,
  ContainerOutlined,
  UserOutlined,
  ShopFilled,
  WalletOutlined,
  PercentageOutlined,
  CarOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Notification from "../notification/Notification";

function PrivateRouteProductOwner() {
  const isAuthen = true;
  // let [isLoad, setIsLoad] = useState(true);
  let navigate = useNavigate();
  const [productowner, setProductOwner] = useState([]);
  const [accountID, setAccountID] = useState([]);
  const idAccount = localStorage.getItem("accountId");
  const [isNotificationModalVisible, setNotificationModalVisible] = useState(false);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(3);

  useEffect(() => {
    const account = localStorage.getItem("roleId");
    if (account != 2) {
      navigate("/login");
    }
  });

  const fetchProductOwner = async () => {
    try {
      const response = await axios.get("http://fashionrental.online:8080/account/" + idAccount);
      setProductOwner(response.data.data.productowner);
      localStorage.setItem("productownerId", response.data.data.productowner.productownerID);
      localStorage.setItem("poshopID", response.data.data.productowner.poshopID);
      localStorage.setItem("potoken", response.data.data.productowner.potoken);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    navigate("/login");
    localStorage.removeItem("roleId");
    localStorage.removeItem("accountId");
    localStorage.removeItem("productownerId");
    localStorage.removeItem("poshopID");
    localStorage.removeItem("potoken");
    console.log("Logged out");
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
    fetchProductOwner();
    fetchAccountID();
  }, []);

  const showNotificationModal = () => {
    setNotificationModalVisible(true);
    setUnreadNotificationCount(0); // Đánh dấu tất cả thông báo là đã đọc khi mở modal
  };

  const hideNotificationModal = () => {
    setNotificationModalVisible(false);
  };

  if (isAuthen) {
    return (
      <>
        <Header
          // style={{
          //   display: "flex",
          //   alignItems: "center",
          //
          //   backgroundColor: "#008000", // Căn chỉnh các phần tử theo chiều ngang và cách đều nhau
          // }}
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            // backgroundColor: "#008000",
            backgroundColor: "RGB(32, 30, 42)",
          }}
        >
          {/* Display a placeholder logo */}
          <div
            style={{ color: "#fff", cursor: "pointer", display: "flex", alignItems: "center" }}
            onClick={() => {
              navigate("/productOwner");
            }}
          >
            <img src="/brand_logo.png" alt="Brand Logo" width={70} height={50} />
            <h2
              style={{
                color: "#fff",
                fontWeight: "normal",
              }}
            >
              Chủ sản phẩm
            </h2>
          </div>
          {/* Notification bell icon and avatar */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={
                productowner?.avatarUrl
                  ? productowner.avatarUrl
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
              {productowner?.fullName ? productowner.fullName : ""}
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
                  navigate("/productOwner/chat");
                }}
              />
            </Badge>
            <Badge count={unreadNotificationCount}>
              <BellOutlined
                style={{
                  fontSize: "20px",
                  color: "white",
                  cursor: "pointer",
                  marginLeft: "25px",
                }}
                onClick={showNotificationModal}
              />
            </Badge>
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
          <Notification />
          {/* Nội dung thông báo ở đây */}
        </Modal>
      </>
    );
  }

  return <div>PrivateRoute</div>;
}

export default PrivateRouteProductOwner;
