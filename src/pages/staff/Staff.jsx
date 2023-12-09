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
import { Avatar, Badge, Breadcrumb, Button, ConfigProvider, Layout, Menu, Modal, theme } from "antd";
import SubMenu from "antd/es/menu/SubMenu";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TablePending from "../../components/Staff-Grid";
import RejectTable from "../../components/Staff-Grid/reject";
import ProfileStaff from "../../components/information-staff";
import OrdersBuyStaff from "../../components/order-buy";
import TableAccept from "./../../components/Staff-Grid/accept";
import VerificationSuccess from "../../components/verifyPO/verified";
import OrdersRentStaff from "../../components/order-rent";
import CancelRentStaff from "../../components/order-rent/cancel-rent-staff";
import CancelBuyStaff from "../../components/order-buy/cancel-buy-staff";
import RequestTable from "../../components/Staff-Grid/request";

const { Header, Content, Sider } = Layout;

const Staff = () => {
  const idAccount = localStorage.getItem("accountId");
  const [staff, setStaff] = useState([]);
  const [accountID, setAccountID] = useState([]);
  const fetchStaff = async () => {
    try {
      const response = await axios.get("http://fashionrental.online:8080/account/" + idAccount);
      setStaff(response.data.data.staff);
      localStorage.setItem("staffId", response.data.data.staff.staffID);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStaff();
    fetchAccountID();
  }, []);
  const fetchAccountID = async () => {
    try {
      const response = await axios.get("http://fashionrental.online:8080/account/" + idAccount);
      setAccountID(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [selectedMenuKey, setSelectedMenuKey] = useState("1");
  const [isNotificationModalVisible, setNotificationModalVisible] = useState(false);
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
    const status = accountID.status;
    console.log(status);
    if (status === "NOT_VERIFIED") {
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
    }
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
              <Breadcrumb.Item>Xem đơn hàng</Breadcrumb.Item>
              <Breadcrumb.Item>Đơn hàng cho thuê</Breadcrumb.Item>
              <Breadcrumb.Item>Sản phẩm cho thuê</Breadcrumb.Item>
            </Breadcrumb>
            <OrdersRentStaff />
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
              <Breadcrumb.Item>Xem đơn hàng</Breadcrumb.Item>
              <Breadcrumb.Item>Đơn hàng bán</Breadcrumb.Item>
              <Breadcrumb.Item>Sản phẩm đã bán</Breadcrumb.Item>
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
              <Breadcrumb.Item>Xem đơn hàng</Breadcrumb.Item>
              <Breadcrumb.Item>Đơn hàng cho thuê</Breadcrumb.Item>
              <Breadcrumb.Item>Sản phẩm bị trả về</Breadcrumb.Item>
            </Breadcrumb>
            <CancelRentStaff />
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
        if (status === "VERIFIED") {
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
              <VerificationSuccess />
            </div>
          );
        } else {
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
        }

      case "9":
        return (
          <div>
            <Breadcrumb
              style={{
                padding: "0 16px",
              }}
            >
              <Breadcrumb.Item>Xem đơn hàng</Breadcrumb.Item>
              <Breadcrumb.Item>Đơn hàng bán</Breadcrumb.Item>
              <Breadcrumb.Item>Sản phẩm bị trả về</Breadcrumb.Item>
            </Breadcrumb>
            <CancelBuyStaff />
          </div>
        );
      case "10":
        return (
          <div>
            <Breadcrumb
              style={{
                padding: "0 16px",
              }}
            >
              <Breadcrumb.Item>Quản lý yêu cầu</Breadcrumb.Item>
              <Breadcrumb.Item>Danh sách yêu cầu</Breadcrumb.Item>
            </Breadcrumb>
            <RequestTable />
          </div>
        );

      // case "9":
      //   return (
      //     <div>
      //       <Breadcrumb
      //         style={{
      //           padding: "0 16px",
      //         }}
      //       >
      //         <Breadcrumb.Item>Nhắn tin</Breadcrumb.Item>
      //       </Breadcrumb>
      //       <StaffChat />
      //     </div>
      //   );
      default:
        return null;
    }
  };
  return (
    <Layout>
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
        <div style={{ color: "#fff", display: "flex", alignItems: "center" }}>
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
                navigate("/chat");
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

      <Layout style={{ background: "#000", marginLeft: 240 }}>
        <Sider
          width={215}
          style={{
            position: "fixed",
            left: 0,
            top: 65,
            bottom: 60,
            height: "100%",
          }}
          breakpoint="md"
          collapsedWidth="0"
        >
          <ConfigProvider
            theme={{
              components: {
                Menu: {
                  itemActiveBg: "rgb (220,220,220)",
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
                title={<p style={{ fontSize: "16px", fontWeight: "500" }}>Duyệt Sản Phẩm</p>}
              >
                <Menu.Item key="1">{<p style={{ fontSize: "14.5px" }}>Đơn chờ xử lý</p>}</Menu.Item>

                <Menu.Item key="2">{<p style={{ fontSize: "14.5px" }}>Đơn đã duyệt</p>}</Menu.Item>

                <Menu.Item key="3">{<p style={{ fontSize: "14.5px" }}>Đơn đã từ chối</p>}</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                icon={<DeliveredProcedureOutlined style={{ fontSize: "17px" }} />}
                title={<p style={{ fontSize: "16px", fontWeight: "500" }}>Quản Lý Yêu Cầu</p>}
              >
                <Menu.Item key="10">{<p style={{ fontSize: "14.5px" }}>Danh sách yêu cầu</p>}</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                icon={<EyeFilled style={{ fontSize: "17px" }} />}
                title={<p style={{ fontSize: "16px", fontWeight: "500" }}>Xem Đơn Hàng</p>}
              >
                <SubMenu key="sub2-1" title={<p style={{ fontSize: "16px", fontWeight: "500" }}>Đơn hàng cho thuê</p>}>
                  <Menu.Item key="4">{<p style={{ fontSize: "14.5px" }}>Sản phẩm đang cho thuê</p>}</Menu.Item>
                  <Menu.Item key="6">{<p style={{ fontSize: "14.5px" }}>Sản phẩm bị trả về</p>}</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2-2" title={<p style={{ fontSize: "16px", fontWeight: "500" }}>Đơn hàng bán</p>}>
                  <Menu.Item key="5">{<p style={{ fontSize: "14.5px" }}>Sản phẩm đã bán</p>}</Menu.Item>
                  <Menu.Item key="9">{<p style={{ fontSize: "14.5px" }}>Sản phẩm bị trả về</p>}</Menu.Item>
                </SubMenu>
              </SubMenu>

              <SubMenu key="sub3" title="Báo cáo" icon={<MailFilled twoToneColor="#ff0000" />}>
                <Menu.Item key="7">Báo cáo sản phẩm</Menu.Item>
              </SubMenu>

              <SubMenu
                key="sub4"
                icon={<NotificationFilled style={{ fontSize: "17px" }} />}
                title={<p style={{ fontSize: "16px", fontWeight: "500" }}>Thông Tin</p>}
              >
                <Menu.Item key="8">{<p style={{ fontSize: "14.5px" }}>Thông tin cá nhân</p>}</Menu.Item>
              </SubMenu>

              {/* <SubMenu
              key="sub5"
              icon={<NotificationFilled style={{ fontSize: "17px" }} />}
              title="Nhan tin"
            >
              <Menu.Item key="9">Thông tin cá nhân</Menu.Item>
            </SubMenu> */}
            </Menu>
          </ConfigProvider>
        </Sider>
        <Layout>
          <Content
            responsive
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
        open={isNotificationModalVisible}
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
