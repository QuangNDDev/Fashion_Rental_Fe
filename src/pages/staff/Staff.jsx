import React, { useEffect, useState } from "react";
import {
  CloseCircleTwoTone,
  LogoutOutlined,
  BellOutlined,
  CheckOutlined,
  CheckCircleTwoTone,
  ClockCircleTwoTone,
  ShoppingTwoTone,
  SyncOutlined,
  DollarOutlined,
  DollarTwoTone,
  QuestionCircleTwoTone,
  EyeTwoTone,
  NotificationTwoTone,
  NotificationFilled,
  MailFilled,
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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CancelOrderTable from "../../components/product-owner-table/CancelOrderTable";
import TableAccept from "./../../components/Staff-Grid/accept";
import ProfileStaff from "../../components/information-staff";
import TablePending from "../../components/Staff-Grid";
import RejectTable from "../../components/Staff-Grid/reject";
import OrdersBuyStaff from "../../components/order-buy";

const { Header, Content, Sider } = Layout;

const Staff = () => {
  const idAccount = localStorage.getItem("accountId");
  const [staff, setStaff] = useState([]);
  const fetchStaff = async () => {
    try {
      const response = await axios.get(
        "http://fashionrental.online:8080/account/" + idAccount
      );
      setStaff(response.data.data.staff);
      localStorage.setItem("staffId", response.data.data.staff.staffID);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

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
    localStorage.removeItem("staffId");
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
              <Breadcrumb.Item>Duyệt sản phẩm</Breadcrumb.Item>
              <Breadcrumb.Item>Đơn chờ xử lý</Breadcrumb.Item>
            </Breadcrumb>
            <TablePending />
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
              <Breadcrumb.Item>Duyệt sản phẩm</Breadcrumb.Item>
              <Breadcrumb.Item>Đơn đã duyệt</Breadcrumb.Item>
            </Breadcrumb>
            <TableAccept />
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
              <Breadcrumb.Item>Duyệt sản phẩm</Breadcrumb.Item>
              <Breadcrumb.Item>Đơn bị từ chối</Breadcrumb.Item>
            </Breadcrumb>
            <RejectTable />
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
              <Breadcrumb.Item>Xem đơn đặt hàng</Breadcrumb.Item>
              <Breadcrumb.Item>Sản phẩm cho thuê</Breadcrumb.Item>
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
              <Breadcrumb.Item>Xem đơn đặt hàng</Breadcrumb.Item>
              <Breadcrumb.Item>Sản phẩm bán</Breadcrumb.Item>
            </Breadcrumb>
            <OrdersBuyStaff />
          </div>
        );

      case "6":
        return (
          <div>
            <Breadcrumb
              style={{
                padding: "0 16px",
              }}
            >
              <Breadcrumb.Item>Xem đơn đặt hàng</Breadcrumb.Item>
              <Breadcrumb.Item>Sản phẩm bị trả về</Breadcrumb.Item>
            </Breadcrumb>
            <CancelOrderTable />
          </div>
        );
      case "7":
        return (
          <div>
            <Breadcrumb
              style={{
                padding: "0 16px",
              }}
            >
              <Breadcrumb.Item>Báo cáo</Breadcrumb.Item>
              <Breadcrumb.Item>Báo cáo sản phẩm</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        );
      case "8":
        return (
          <div>
            <Breadcrumb
              style={{
                padding: "0 16px",
              }}
            >
              <Breadcrumb.Item>Thông Tin</Breadcrumb.Item>
              <Breadcrumb.Item>Thông tin cá nhân</Breadcrumb.Item>
            </Breadcrumb>
            <ProfileStaff />
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
        {/* Hiển thị logo tạm thời */}
        <div style={{ color: "#fff", display: "flex", alignItems: "center" }}>
          <img
            src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t1.15752-9/386474503_267425062928341_6987759511620074342_n.png?_nc_cat=106&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=sCYtopH2K4kAX-Ordr1&_nc_ht=scontent.fsgn2-5.fna&oh=03_AdRCrANYpogO50o9LUSIzscNAVPVMn2v3OMN1BmYx1MAAA&oe=654E9D9F"
            alt="Brand Logo"
            width={70}
            height={50}
          />
          <h2 style={{ color: "#fff", fontWeight: "normal" }}>
            Kênh nhân viên
          </h2>
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
              width: "124%",
            }}
            onClick={handleMenuClick}
          >
            <SubMenu
              key="sub1"
              icon={<CheckOutlined style={{ fontSize: "17px" }} />}
              title="Duyệt sản phẩm"
            >
              <Menu.Item key="1">Đơn chờ xử lý</Menu.Item>

              <Menu.Item key="2">Đơn đã duyệt</Menu.Item>

              <Menu.Item key="3">Đơn đã từ chối</Menu.Item>
            </SubMenu>

            <SubMenu
              key="sub2"
              icon={<EyeTwoTone style={{ fontSize: "17px" }} />}
              title="Xem đơn hàng"
            >
              <Menu.Item key="4">Sản phẩm đang cho thuê</Menu.Item>
              <Menu.Item key="5">Sản phẩm bán</Menu.Item>

              <Menu.Item key="6">Sản phẩm bị trả về</Menu.Item>
            </SubMenu>

            <SubMenu
              key="sub3"
              title="Báo cáo"
              icon={<MailFilled twoToneColor="#ff0000" />}
            >
              <Menu.Item key="7">Báo cáo sản phẩm</Menu.Item>
            </SubMenu>

            <SubMenu
              key="sub4"
              icon={
                <NotificationFilled
                  style={{ fontSize: "17px", color: "red" }}
                />
              }
              title="Thông tin"
            >
              <Menu.Item key="8">Thông tin cá nhân</Menu.Item>
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
              marginLeft: 15,
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
