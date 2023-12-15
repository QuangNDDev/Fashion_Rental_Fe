import React, { useState } from "react";
import { UserOutlined, LogoutOutlined, BellOutlined, MessageOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, Button, Avatar, Modal, Badge, ConfigProvider } from "antd";
import { useNavigate } from "react-router-dom";
import Notification from "../../components/notification/Notification";
import CustomerTable from "../../components/admin-table/CustomerTable";
import ProductOwnerTable from "../../components/admin-table/ProductOwnerTable";
import StaffTable from "../../components/admin-table/StaffTable";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
const Admin = () => {
  const navigate = useNavigate();
  const [selectedMenuKey, setSelectedMenuKey] = useState("1");
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [isNotificationModalVisible, setNotificationModalVisible] = useState(false);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(3);

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
              <Breadcrumb.Item>Chủ sở hữu sản phẩm</Breadcrumb.Item>
            </Breadcrumb>
            <ProductOwnerTable />
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
            <StaffTable />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <Layout style={{ marginLeft: 240 }}>
        <Sider
          width={240}
          theme="dark"
          breakpoint="md"
          collapsedWidth="0"
          trigger
          style={{
            position: "fixed",
            left: 0,
            top: 65,
            bottom: 60,
            height: "100%",
          }}
        >
          <ConfigProvider
            theme={{
              components: {
                Menu: {
                  itemActiveBg: "grey",
                  itemSelectedBg: "rgb(32, 30, 42)",
                  itemSelectedColor: "orange",
                },
              },
            }}
          >
            <Menu
              mode="inline"
              selectedKeys={[selectedMenuKey]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
              onClick={handleMenuClick}
            >
              <SubMenu
                key="sub1"
                icon={<UserOutlined />}
                title={<p style={{ fontSize: "16px", fontWeight: "500" }}>Quản lý người dùng</p>}
              >
                <Menu.Item key="1">{<p style={{ fontSize: "14.5px" }}>Khách hàng</p>}</Menu.Item>
                <Menu.Item key="2">{<p style={{ fontSize: "14.5px" }}>Chủ sở hữu sản phẩm</p>}</Menu.Item>
                <Menu.Item key="3">{<p style={{ fontSize: "14.5px" }}>Nhân viên</p>}</Menu.Item>
              </SubMenu>
              {/* <SubMenu key="sub2" icon={<UserOutlined />} title="Quản lí 1">
              <Menu.Item key="1">Khách hàng</Menu.Item>
              <Menu.Item key="2">Chủ sở hữu sản phẩm</Menu.Item>
              <Menu.Item key="3">Nhân viên</Menu.Item>
            </SubMenu> */}
            </Menu>
          </ConfigProvider>
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
        title="Thông báo"
        open={isNotificationModalVisible}
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
