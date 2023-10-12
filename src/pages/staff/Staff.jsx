import React, { useState } from "react";
import {
  CloseCircleTwoTone,
  LogoutOutlined,
  BellOutlined,
  CheckOutlined,
  CheckCircleTwoTone,
  ClockCircleTwoTone,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Button,
  Avatar,
  Modal,
  Badge,
} from "antd";
import SubMenu from "antd/es/menu/SubMenu";
import StaffGrid from "../../components/Staff-Grid";

import { Navigate, useNavigate } from "react-router-dom";


const { Header, Content, Sider } = Layout;

const Staff = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [selectedMenuKey, setSelectedMenuKey] = useState("1");
  const [isNotificationModalVisible, setNotificationModalVisible] =
    useState(false);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState("3");

  const handleLogout = () => {

    navigate("/login");
    localStorage.removeItem("roleId");
    console.log("Logged out");
  };

  const showNotificationModal = () => {
    setNotificationModalVisible(true);
    setUnreadNotificationCount(0); // Đánh dấu tất cả thông báo là đã đọc khi mở modal
  };

  const hideNotificationModal = () => {
    setNotificationModalVisible(false);
  };

  const handleMenuClick = ({ key }) => {
    setSelectedMenuKey(key);
  };
  const renderContent = () => {
    switch (selectedMenuKey) {
      case "1":
        return (
          <div>
            <Breadcrumb
              style={{
                padding: "0 16px",
              }}
            >
              <Breadcrumb.Item>Duyệt đơn</Breadcrumb.Item>
              <Breadcrumb.Item>Đơn đã duyệt</Breadcrumb.Item>
            </Breadcrumb>
            <StaffGrid />
          </div>
        );
      case "2":
        return (
          <div>
            <Breadcrumb
              style={{
                padding: "0 16px",
              }}
            >
              <Breadcrumb.Item>Duyệt đơn</Breadcrumb.Item>
              <Breadcrumb.Item>Đơn đang chờ xử lý</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        );
      case "3":
        return (
          <div>
            <Breadcrumb
              style={{
                padding: "0 16px",
              }}
            >
              <Breadcrumb.Item>Duyệt đơn</Breadcrumb.Item>
              <Breadcrumb.Item>Đơn bị từ chối</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <Layout>
      <Header
       style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor:"#008000" // Căn chỉnh các phần tử theo chiều ngang và cách đều nhau
      }}
      >
        {/* Hiển thị logo tạm thời */}
        <div style={{color :"#fff" , display:"flex",alignItems:"center"}}>
        <img
          src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t1.15752-9/386474503_267425062928341_6987759511620074342_n.png?_nc_cat=106&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=sCYtopH2K4kAX-Ordr1&_nc_ht=scontent.fsgn2-5.fna&oh=03_AdRCrANYpogO50o9LUSIzscNAVPVMn2v3OMN1BmYx1MAAA&oe=654E9D9F"
          alt="Brand Logo"
          width={70}
          height={50}
        />
        <h2 style={{color :"#fff",fontWeight: "normal"}}>Kênh nhân viên</h2>
        </div>
        {/* Biểu tượng chuông thông báo và avatar */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src="https://via.placeholder.com/40x40.png?text=Avatar"
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
            Name staff
          </span>
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

      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            selectedKeys={[selectedMenuKey]}
            defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
              borderRight: 0,
              width: "110%",
            }}
            onClick={handleMenuClick}
          >
            <SubMenu key="sub1" icon={<CheckOutlined />} title="Duyệt đơn">
              <Menu.Item
                key="1"
                icon={<CheckCircleTwoTone twoToneColor="#52c41a" />}
              >
                Đơn đã duyệt
              </Menu.Item>
              <Menu.Item
                key="2"
                icon={<ClockCircleTwoTone twoToneColor="#ffcc00" />}
              >
                Đơn chờ xử lý
              </Menu.Item>

              <Menu.Item
                key="3"
                icon={<CloseCircleTwoTone twoToneColor="#ff0000" />}
              >
                Đơn bị từ chối
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Content
            style={{
              padding: 24,
              marginLeft: 10,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
      {/* Modal cho Thông báo */}
      <Modal
        title="Thông báo"
        visible={isNotificationModalVisible}
        onCancel={hideNotificationModal}
        footer={null}
        style={{ position: "absolute", bottom: "50px", right: "20px" }}
      >
        {/* Nội dung thông báo ở đây */}
      </Modal>
    </Layout>
  );
};

export default Staff;
