import React, { useState } from "react";
import {
  NotificationOutlined,
  UserOutlined,
  LogoutOutlined,
  LaptopOutlined,
  BellOutlined,
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
  Table,
} from "antd";
import { useNavigate } from "react-router-dom";
import Notification from "../../components/notification/Notification";
import CustomerTable from "../../components/admin-table/CustomerTable";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const items1 = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `customLabel ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  }
);

const Admin = () => {
  const navigate = useNavigate();
  const [selectedMenuKey, setSelectedMenuKey] = useState("1");
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [isNotificationModalVisible, setNotificationModalVisible] =
    useState(false);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(3);

  const handleLogout = () => {
    // Handle logout logic here
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
            <Breadcrumb.Item>Quản lí</Breadcrumb.Item>
            <Breadcrumb.Item>Khách hàng</Breadcrumb.Item>
          </Breadcrumb>
            <CustomerTable />
            
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
            <Breadcrumb.Item>Quản lí</Breadcrumb.Item>
            <Breadcrumb.Item>Người sở hữu sản phẩm</Breadcrumb.Item>
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
            <Breadcrumb.Item>Quản lí</Breadcrumb.Item>
            <Breadcrumb.Item>Nhân viên</Breadcrumb.Item>
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
          justifyContent: "space-between", // Căn chỉnh các phần tử theo chiều ngang và cách đều nhau
        }}
      >
        {/* Display a placeholder logo */}
        <img
          src="https://scontent.fsgn5-9.fna.fbcdn.net/v/t1.15752-9/386474503_267425062928341_6987759511620074342_n.png?_nc_cat=106&ccb=1-7&_nc_sid=ae9488&_nc_ohc=4-cFRFMOAdUAX8yq9zd&_nc_ht=scontent.fsgn5-9.fna&_nc_e2o=s&oh=03_AdRDDVQ4N7qwFYjv9hA4tjrRIWC67TdiUvArbX1kCTzZKw&oe=6544BA5F"
          alt="Brand Logo"
          width={70}
          height={50}
        />
        {/* Notification bell icon and avatar */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src="data:image/jpeg;base64,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"
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
            Admin Name
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
        <Sider width={200} theme="dark" breakpoint="md" collapsedWidth="0">
          <Menu
            mode="inline"
            selectedKeys={[selectedMenuKey]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            onClick={handleMenuClick}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="Quản lí">
              <Menu.Item key="1">Khách hàng</Menu.Item>
              <Menu.Item key="2">Chủ sở hữu sản phẩm</Menu.Item>
              <Menu.Item key="3">Nhân viên</Menu.Item>
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
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
      {/* Modal for Notifications */}
      <Modal
        title="Noti"
        visible={isNotificationModalVisible}
        onCancel={hideNotificationModal}
        footer={null}
        style={{ position: "absolute", bottom: "50px", right: "20px" }}
      >
        <Notification />
        {/* Nội dung thông báo ở đây */}
      </Modal>
    </Layout>
  );
};

export default Admin;
