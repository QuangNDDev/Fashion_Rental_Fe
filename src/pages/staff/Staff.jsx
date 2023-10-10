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

const { Header, Content, Sider } = Layout;

const items1 = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2 = [
  {
    key: "sub1",
    icon: <CheckOutlined />,
    label: "Duyệt Đơn",
    children: [
      {
        key: 1,
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
        label: "Đơn đã duyệt",
      },
      {
        key: 2,
        icon: <ClockCircleTwoTone twoToneColor="#ffcc00" />,
        label: "Đơn đang chờ xử lý",
      },
      {
        key: 3,
        icon: <CloseCircleTwoTone twoToneColor="#ff0000" />,
        label: "Đơn đã từ chối",
      },
    ],
  },

  {
    key: "sub2",
    icon: React.createElement(LaptopOutlined),
    label: "Custom Subnav 2", // Đổi tên của subnav này
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = 4 * 1 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  },
  {
    key: "sub3",
    icon: React.createElement(NotificationOutlined),
    label: "Custom Subnav 3", // Đổi tên của subnav này
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = 4 * 2 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  },
];

const Staff = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [isNotificationModalVisible, setNotificationModalVisible] =
    useState(false);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(3);

  const handleLogout = () => {
    // Xử lý logic đăng xuất ở đây
    console.log("Logged out");
  };

  const showNotificationModal = () => {
    setNotificationModalVisible(true);
    setUnreadNotificationCount(0); // Đánh dấu tất cả thông báo là đã đọc khi mở modal
  };

  const hideNotificationModal = () => {
    setNotificationModalVisible(false);
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
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
              borderRight: 0,
              width: "110%",
            }}
            items={items2}
          />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 10px",
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              marginLeft: 10,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            Content
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
