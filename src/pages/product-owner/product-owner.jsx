import React, { useEffect, useState } from "react";
import {
  LogoutOutlined,
  BellOutlined,
  ContainerOutlined,
  UserOutlined,
  ShopFilled,
  WalletOutlined,
  PercentageOutlined,
  CarOutlined,
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
  ConfigProvider,
} from "antd";
import { useNavigate } from "react-router-dom";
import Notification from "../../components/notification/Notification";
import axios from "axios";
import ProductCard from "../../components/product-card/product-card";
import InformationPO from "../../components/infomation-productonwer/information-productowner";
import OrderTable from "../../components/product-owner-table/OrderTable";
import CancelOrderTable from "../../components/product-owner-table/CancelOrderTable";
import Revenue from "../../components/revenue-product-owner/revenue";
import CreateProduct from "../../components/create-product/create-product";

import VoucherForm from "../../components/voucher-form";

import Balance from "../../components/balance-productowner/balance-productowner";
import OrderRent from "../../components/product-owner-table/OrderRent";
import VoucherTable from "../../components/voucher-form/voucher-table";
import OrderDeliveryTable from "../../components/order-delivery/order-delivery-table";
import VerifyProductOwner from "../../components/verifyPO";
import VerificationSuccess from "../../components/verifyPO/verified";
import RegisterDelivery from "../../components/order-delivery/register-delivery";
import CancelOrderBuyTable from "../../components/product-owner-table/CancelOrderTable";
import CancelOrderRent from "../../components/product-owner-table/CancelOrderRent";
import CancelOrderSaleTable from "../../components/product-owner-table/CancelOrderTable";
import ReturnOrderSale from "../../components/product-owner-table/ReturnOrderSale";
import ReturnOrderRent from "../../components/product-owner-table/ReturnOrderRent";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
const ProductOwner = () => {
  const navigate = useNavigate();
  const [selectedMenuKey, setSelectedMenuKey] = useState("1");
  const idAccount = localStorage.getItem("accountId");
  const [productowner, setProductOwner] = useState([]);
  const [accountID, setAccountID] = useState([]);

  const fetchProductOwner = async () => {
    try {
      const response = await axios.get(
        "http://fashionrental.online:8080/account/" + idAccount
      );
      setProductOwner(response.data.data.productowner);
      localStorage.setItem(
        "productownerId",
        response.data.data.productowner.productownerID
      );
      localStorage.setItem(
        "poshopID",
        response.data.data.productowner.poshopID
      );
      localStorage.setItem("potoken", response.data.data.productowner.potoken);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProductOwner();
    fetchAccountID();
  }, []);
  const fetchAccountID = async () => {
    try {
      const response = await axios.get(
        "http://fashionrental.online:8080/account/" + idAccount
      );
      setAccountID(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

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
    localStorage.removeItem("productownerId");
    localStorage.removeItem("poshopID");
    localStorage.removeItem("potoken");
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
            <Breadcrumb.Item>Quản lý tài khoản</Breadcrumb.Item>
            <Breadcrumb.Item>Xác thực tài khoản</Breadcrumb.Item>
          </Breadcrumb>
          <VerifyProductOwner />
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
              <Breadcrumb.Item>Quản lý đơn hàng</Breadcrumb.Item>
              <Breadcrumb.Item>Quản lý đơn bán</Breadcrumb.Item>
              <Breadcrumb.Item>Đơn bán</Breadcrumb.Item>
            </Breadcrumb>
            <OrderTable />
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
              <Breadcrumb.Item>Quản lý đơn hàng</Breadcrumb.Item>
              <Breadcrumb.Item>Quản lý đơn thuê</Breadcrumb.Item>
              <Breadcrumb.Item>Đơn thuê</Breadcrumb.Item>
            </Breadcrumb>
            <OrderRent />
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
              <Breadcrumb.Item>Quản lý đơn hàng</Breadcrumb.Item>
              <Breadcrumb.Item>Quản lý đơn bán </Breadcrumb.Item>
              <Breadcrumb.Item>Đơn hủy </Breadcrumb.Item>
            </Breadcrumb>
            <CancelOrderSaleTable />
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
              <Breadcrumb.Item>Quản lý đơn hàng</Breadcrumb.Item>
              <Breadcrumb.Item>Quản lý đơn bán </Breadcrumb.Item>
              <Breadcrumb.Item>Trả hàng,hoàn tiền </Breadcrumb.Item>
            </Breadcrumb>
            <ReturnOrderSale />
          </div>
        );
      case "17":
        return (
          <div>
            <Breadcrumb
              style={{
                padding: "0 16px",
              }}
            >
              <Breadcrumb.Item>Quản lý đơn hàng</Breadcrumb.Item>
              <Breadcrumb.Item>Quản lý đơn thuê</Breadcrumb.Item>
              <Breadcrumb.Item>Đơn huỷ</Breadcrumb.Item>
            </Breadcrumb>
            <CancelOrderRent />
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
              <Breadcrumb.Item>Quản lý đơn hàng</Breadcrumb.Item>
              <Breadcrumb.Item>Quản lý đơn thuê</Breadcrumb.Item>
              <Breadcrumb.Item>Trả hàng,hoàn tiền</Breadcrumb.Item>
            </Breadcrumb>
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
              <Breadcrumb.Item>Quản lý sản phẩm</Breadcrumb.Item>
              <Breadcrumb.Item>Tất cả sản phẩm</Breadcrumb.Item>
            </Breadcrumb>
            <ProductCard />
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
              <Breadcrumb.Item>Quản lý sản phẩm</Breadcrumb.Item>
              <Breadcrumb.Item>Thêm sản phẩm</Breadcrumb.Item>
            </Breadcrumb>
            <CreateProduct />
          </div>
        );
      case "9":
        return (
          <div>
            <Breadcrumb
              style={{
                padding: "0 16px",
              }}
            >
              <Breadcrumb.Item>Quản lý tài khoản</Breadcrumb.Item>

              <Breadcrumb.Item>Thông tin cơ bản</Breadcrumb.Item>
            </Breadcrumb>
            <InformationPO />
          </div>
        );
      case "10":
        if (status === "VERIFIED") {
          return (
            <div>
              <Breadcrumb
                style={{
                  padding: "0 16px",
                }}
              >
                <Breadcrumb.Item>Quản lý tài khoản</Breadcrumb.Item>
                <Breadcrumb.Item>Xác thực tài khoản</Breadcrumb.Item>
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
                <Breadcrumb.Item>Quản lý tài khoản</Breadcrumb.Item>
                <Breadcrumb.Item>Xác thực tài khoản</Breadcrumb.Item>
              </Breadcrumb>

              <VerifyProductOwner />
            </div>
          );
        }

      case "11":
        return (
          <div>
            <Breadcrumb
              style={{
                padding: "0 16px",
              }}
            >
              <Breadcrumb.Item>Tài chính</Breadcrumb.Item>
              <Breadcrumb.Item>Doanh thu</Breadcrumb.Item>
            </Breadcrumb>
            <Revenue />
          </div>
        );
      case "12":
        return (
          <div>
            <Breadcrumb
              style={{
                padding: "0 16px",
              }}
            >
              <Breadcrumb.Item>Tài chính</Breadcrumb.Item>
              <Breadcrumb.Item>Số dư TK</Breadcrumb.Item>
            </Breadcrumb>
            <Balance />
          </div>
        );
      case "13":
        return (
          <div>
            <Breadcrumb
              style={{
                padding: "0 16px",
              }}
            >
              <Breadcrumb.Item>Khuyến mãi</Breadcrumb.Item>
              <Breadcrumb.Item>Thêm mã khuyến mãi</Breadcrumb.Item>
            </Breadcrumb>
            <VoucherForm />
          </div>
        );
      case "14":
        return (
          <div>
            <Breadcrumb
              style={{
                padding: "0 16px",
              }}
            >
              <Breadcrumb.Item>Khuyến mãi</Breadcrumb.Item>
              <Breadcrumb.Item>Xem mã khuyến mãi</Breadcrumb.Item>
            </Breadcrumb>
            <VoucherTable />
          </div>
        );
      case "15":
        return (
          <div>
            <Breadcrumb
              style={{
                padding: "0 16px",
              }}
            >
              <Breadcrumb.Item>Giao hàng</Breadcrumb.Item>
              <Breadcrumb.Item>Đăng ký GHN</Breadcrumb.Item>
            </Breadcrumb>
            <RegisterDelivery />
          </div>
        );
      case "16":
        return (
          <div>
            <Breadcrumb
              style={{
                padding: "0 16px",
              }}
            >
              <Breadcrumb.Item>Giao hàng</Breadcrumb.Item>
              <Breadcrumb.Item>Đơn hàng chưa giao</Breadcrumb.Item>
            </Breadcrumb>
            <OrderDeliveryTable />
          </div>
        );
      case "17":
        return (
          <div>
            <Breadcrumb
              style={{
                padding: "0 16px",
              }}
            >
              <Breadcrumb.Item>Quản lý đơn hàng</Breadcrumb.Item>
              <Breadcrumb.Item>Quản lý đơn thuê</Breadcrumb.Item>
              <Breadcrumb.Item>Đơn hủy</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        );
      case "18":
        return (
          <div>
            <Breadcrumb
              style={{
                padding: "0 16px",
              }}
            >
              <Breadcrumb.Item>Quản lý đơn hàng</Breadcrumb.Item>
              <Breadcrumb.Item>Quản lý đơn thuê</Breadcrumb.Item>
              <Breadcrumb.Item>Trả hàng/Hoàn tiền</Breadcrumb.Item>
            </Breadcrumb>
            <ReturnOrderRent />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
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
        <div style={{ color: "#fff", display: "flex", alignItems: "center" }}>
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

      <Layout style={{ background: "#000", marginLeft: 200 }}>
        <Sider
          width={200}
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
                  itemActiveBg: "#008000",
                  itemSelectedBg: "#008000",
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
                width: "120%",
              }}
              onClick={handleMenuClick}
            >
              <SubMenu
                key="sub1"
                icon={<ContainerOutlined style={{ fontSize: "17px" }} />}
                title="Quản Lý Đơn Hàng"
              >
                <SubMenu key={"sub1-1"} title="Quản lý đơn bán">
                  <Menu.Item key="1">Đơn bán</Menu.Item>
                  <Menu.Item key="3">Đơn hủy</Menu.Item>
                  <Menu.Item key="4">Trả hàng/Hoàn tiền</Menu.Item>
                </SubMenu>
                <SubMenu key={"sub1-2"} title="Quản lý đơn thuê">
                  <Menu.Item key="2">Đơn thuê</Menu.Item>
                  <Menu.Item key="17">Đơn hủy</Menu.Item>
                  <Menu.Item key="18">Trả hàng/Hoàn tiền</Menu.Item>
                </SubMenu>
              </SubMenu>
              <SubMenu
                key="sub2"
                icon={<ShopFilled style={{ fontSize: "17px" }} />}
                title="Quản Lí Sản Phẩm"
              >
                <Menu.Item key="7">Tất cả sản phẩm</Menu.Item>
                <Menu.Item key="8">Thêm sản phẩm</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                icon={<UserOutlined style={{ fontSize: "17px" }} />}
                title="Quản Lý Tài Khoản"
              >
                {" "}
                <Menu.Item key="10">Xác thực tài khoản</Menu.Item>
                <Menu.Item key="9">Thông tin cơ bản</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub4"
                icon={<WalletOutlined style={{ fontSize: "17px" }} />}
                title="Tài chính"
              >
                <Menu.Item key="11">Doanh thu</Menu.Item>
                <Menu.Item key="12">Số dư TK</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub5"
                icon={<PercentageOutlined style={{ fontSize: "17px" }} />}
                title="Khuyến mãi"
              >
                <Menu.Item key="13">Thêm mã khuyến mãi</Menu.Item>
                <Menu.Item key="14">Xem mã khuyến mãi</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub6"
                icon={<CarOutlined style={{ fontSize: "17px" }} />}
                title="Giao hàng"
              >
                <Menu.Item key="15">Đăng ký GHN</Menu.Item>
                <Menu.Item key="16">Đơn hàng chưa giao</Menu.Item>
              </SubMenu>
            </Menu>
          </ConfigProvider>
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",

            background: "#fff",
          }}
        >
          <Content
            style={{
              padding: 24,
              marginLeft: 14,
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

export default ProductOwner;
