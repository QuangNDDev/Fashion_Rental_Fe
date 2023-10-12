import React, { useState } from "react";
import {
  NotificationOutlined,
  CloseCircleTwoTone,
  LogoutOutlined,
  LaptopOutlined,
  BellOutlined,
  CheckOutlined,
  CheckCircleTwoTone,
  ClockCircleTwoTone,
  UserOutlined,
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
import CustomerTable from "../../components/admin-table/CustomerTable";
import SubMenu from "antd/es/menu/SubMenu";
import StaffGrid from "../../components/Staff-Grid";
import { Navigate, useNavigate } from "react-router-dom";

const { Header, Content, Sider } = Layout;

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

//   {
//     key: "sub2",
//     icon: React.createElement(LaptopOutlined),
//     label: "Custom Subnav 2", // Đổi tên của subnav này
//     children: new Array(4).fill(null).map((_, j) => {
//       const subKey = 4 * 1 + j + 1;
//       return {
//         key: subKey,
//         label: `option${subKey}`,
//       };
//     }),
//   },
//   {
//     key: "sub3",
//     icon: React.createElement(NotificationOutlined),
//     label: "Custom Subnav 3", // Đổi tên của subnav này
//     children: new Array(4).fill(null).map((_, j) => {
//       const subKey = 4 * 2 + j + 1;
//       return {
//         key: subKey,
//         label: `option${subKey}`,
//       };
//     }),
//   },
// ];

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
    // Xử lý logic đăng xuất ở đây
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
              <Breadcrumb.Item>Duyệt Đơn</Breadcrumb.Item>
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
          justifyContent: "space-between", // Căn chỉnh các phần tử theo chiều ngang và cách đều nhau
        }}
      >
        {/* Hiển thị logo tạm thời */}
        <img
          src="https://scontent.fsgn5-9.fna.fbcdn.net/v/t1.15752-9/386474503_267425062928341_6987759511620074342_n.png?_nc_cat=106&ccb=1-7&_nc_sid=ae9488&_nc_ohc=4-cFRFMOAdUAX8yq9zd&_nc_ht=scontent.fsgn5-9.fna&_nc_e2o=s&oh=03_AdRDDVQ4N7qwFYjv9hA4tjrRIWC67TdiUvArbX1kCTzZKw&oe=6544BA5F"
          alt="Brand Logo"
          width={70}
          height={50}
        />
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
            Logout
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
