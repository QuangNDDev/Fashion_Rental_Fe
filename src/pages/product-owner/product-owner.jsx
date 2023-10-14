import React, { useEffect, useState } from "react";
import {
  ShoppingOutlined,
  LogoutOutlined,
  BellOutlined,
  ContainerOutlined,
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
import {  useNavigate } from "react-router-dom";
import Notification from "../../components/notification/Notification";
import axios from "axios";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
const ProductOwner = () => {
  const navigate = useNavigate();
  const [selectedMenuKey, setSelectedMenuKey] = useState("1");
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
  const idAccount = localStorage.getItem("accountId");
  const [productowner, setProductOwner] = useState([]);
  const fetchProductOwner = async () => {
    try {
      const response = await axios.get(
        "http://fashionrental.online:8080/account/getaccount?accountID=" + idAccount
      );
    //   const productowners = response.data.map((po) => ({
    //     ...po,
    //     fullName: po.productowner.fullName,
    //     avatarUrl: po.productowner.avatarUrl,
    //   }));
      setProductOwner(response.data.productowner);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProductOwner();
  }, []);
  
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [isNotificationModalVisible, setNotificationModalVisible] =
    useState(false);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(3);

  const handleLogout = () => {
    navigate("/login");
    localStorage.removeItem("roleId");
    localStorage.removeItem("accountId");
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
              <Breadcrumb.Item>Quản lí đơn hàng</Breadcrumb.Item>
              <Breadcrumb.Item>Tất cả</Breadcrumb.Item>
            </Breadcrumb>
            
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
              <Breadcrumb.Item>Quản lí đơn hàng</Breadcrumb.Item>
              <Breadcrumb.Item>Đơn huỷ</Breadcrumb.Item>
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
              <Breadcrumb.Item>Quản lí đơn hàng</Breadcrumb.Item>
              <Breadcrumb.Item>Trả hàng,hoàn tiền</Breadcrumb.Item>
            </Breadcrumb>
            
          </div>
        );
        case "4":
        return (
          <div>
            <Breadcrumb
              style={{
                padding: "0 16px",
              }}
            >
              <Breadcrumb.Item>Quản lí sản phẩm</Breadcrumb.Item>
              <Breadcrumb.Item>Tất cả sản phẩm</Breadcrumb.Item>
            </Breadcrumb>
            
          </div>
        );
        case "5":
        return (
          <div>
            <Breadcrumb
              style={{
                padding: "0 16px",
              }}
            >
              <Breadcrumb.Item>Quản lí sản phẩm</Breadcrumb.Item>
              <Breadcrumb.Item>Thêm sản phẩm</Breadcrumb.Item>
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
          backgroundColor: "#008000", // Căn chỉnh các phần tử theo chiều ngang và cách đều nhau
        }}
      >
        {/* Display a placeholder logo */}
        <div style={{ color: "#fff", display: "flex", alignItems: "center" }}>
          <img
            src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t1.15752-9/386474503_267425062928341_6987759511620074342_n.png?_nc_cat=106&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=sCYtopH2K4kAX-Ordr1&_nc_ht=scontent.fsgn2-5.fna&oh=03_AdRCrANYpogO50o9LUSIzscNAVPVMn2v3OMN1BmYx1MAAA&oe=654E9D9F"
            alt="Brand Logo"
            width={70}
            height={50}
          />
          <h2 style={{ color: "#fff", fontWeight: "normal" }}>
            Kênh người bán
          </h2>
        </div>
        {/* Notification bell icon and avatar */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={productowner.avatarUrl}
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
            {productowner.fullName}
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
            <SubMenu
              key="sub1"
              icon={<ContainerOutlined />}
              title="Quản Lí Đơn Hàng"
            >
              <Menu.Item key="1">Tất cả</Menu.Item>
              <Menu.Item key="2">Đơn huỷ</Menu.Item>
              <Menu.Item key="3">Trả hàng/Hoàn tiền</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              icon={<ShoppingOutlined />}
              title="Quản Lí Sản Phẩm"
            >
              <Menu.Item key="4">Tất cả sản phẩm</Menu.Item>
              <Menu.Item key="5">Thêm sản phẩm</Menu.Item>
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
        title="Thông báo"
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

export default ProductOwner;