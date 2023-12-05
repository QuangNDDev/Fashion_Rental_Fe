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
import CancelOrderRent from "../../components/product-owner-table/CancelOrderRent";
import CancelOrderSaleTable from "../../components/product-owner-table/CancelOrderTable";
import ReturnOrderSale from "../../components/product-owner-table/ReturnOrderSale";
import ReturnOrderRent from "../../components/product-owner-table/ReturnOrderRent";
import OrderRentDeliveryTable from "../../components/order-delivery/order-rent-delivery";
import OrderCompletedTable from "../../components/product-owner-table/CompletedOrderSale";
import RentingOrderTable from "../../components/product-owner-table/RentingReturningOrderRent";
import OrderRentCompletedTable from "../../components/product-owner-table/OrderRentCompleted";

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
              <Breadcrumb.Item>Trả hàng/Hoàn tiền </Breadcrumb.Item>
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
              <Breadcrumb.Item>Đơn bán</Breadcrumb.Item>
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
      case "19":
        return (
          <div>
            <Breadcrumb
              style={{
                padding: "0 16px",
              }}
            >
              <Breadcrumb.Item>Giao hàng</Breadcrumb.Item>
              <Breadcrumb.Item>Đơn hàng chưa giao</Breadcrumb.Item>
              <Breadcrumb.Item>Đơn thuê</Breadcrumb.Item>
            </Breadcrumb>
            <OrderRentDeliveryTable />
          </div>
        );
      case "20":
        return (
          <div>
            <Breadcrumb
              style={{
                padding: "0 16px",
              }}
            >
              <Breadcrumb.Item>Quản lý đơn hàng</Breadcrumb.Item>
              <Breadcrumb.Item>Quản lý đơn bán </Breadcrumb.Item>
              <Breadcrumb.Item>Đang vận chuyển/Thành công </Breadcrumb.Item>
            </Breadcrumb>
            <OrderCompletedTable />
          </div>
        );
      case "21":
        return (
          <div>
            <Breadcrumb
              style={{
                padding: "0 16px",
              }}
            >
              <Breadcrumb.Item>Quản lý đơn hàng</Breadcrumb.Item>
              <Breadcrumb.Item>Quản lý đơn bán </Breadcrumb.Item>
              <Breadcrumb.Item>Đơn đang được thuê/Đang trả </Breadcrumb.Item>
            </Breadcrumb>
            <RentingOrderTable />
          </div>
        );
      case "22":
        return (
          <div>
            <Breadcrumb
              style={{
                padding: "0 16px",
              }}
            >
              <Breadcrumb.Item>Quản lý đơn hàng</Breadcrumb.Item>
              <Breadcrumb.Item>Quản lý đơn bán </Breadcrumb.Item>
              <Breadcrumb.Item>Đơn thuê thành công</Breadcrumb.Item>
            </Breadcrumb>
            <OrderRentCompletedTable />
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

      <Layout
        style={{
          background: "#000",
          marginLeft: 240,
        }}
      >
        <Sider
          width={242}
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
                title={
                  <p style={{ fontSize: "16px", fontWeight: "500" }}>
                    Quản Lý Đơn Hàng
                  </p>
                }
              >
                <SubMenu
                  key={"sub1-1"}
                  title={
                    <p style={{ fontSize: "15px", fontWeight: "500" }}>
                      Quản lý đơn bán
                    </p>
                  }
                >
                  <Menu.Item key="1">
                    {<p style={{ fontSize: "14.5px" }}>Đơn bán</p>}
                  </Menu.Item>
                  <Menu.Item key="3">
                    {<p style={{ fontSize: "14.5px" }}>Đơn hủy</p>}
                  </Menu.Item>
                  <Menu.Item key="4">
                    {<p style={{ fontSize: "14.5px" }}>Trả hàng/Hoàn tiền</p>}
                  </Menu.Item>
                  <Menu.Item key="20">
                    {
                      <p style={{ fontSize: "14.5px" }}>
                        Đang vận chuyển/Thành công
                      </p>
                    }
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key={"sub1-2"}
                  title={
                    <p style={{ fontSize: "15px", fontWeight: "500" }}>
                      Quản lý đơn thuê
                    </p>
                  }
                >
                  <Menu.Item key="2">
                    {<p style={{ fontSize: "14.5px" }}>Đơn thuê</p>}
                  </Menu.Item>
                  <Menu.Item key="21">
                    {
                      <p style={{ fontSize: "14.5px" }}>
                        Đơn đang được thuê/Đang trả
                      </p>
                    }
                  </Menu.Item>
                  <Menu.Item key="22">
                    {<p style={{ fontSize: "14.5px" }}>Đơn thuê thành công</p>}
                  </Menu.Item>
                  <Menu.Item key="17">
                    {<p style={{ fontSize: "14.5px" }}>Đơn hủy </p>}
                  </Menu.Item>
                  <Menu.Item key="18">
                    {<p style={{ fontSize: "14.5px" }}>Trả hàng/Hoàn tiền </p>}
                  </Menu.Item>
                </SubMenu>
              </SubMenu>
              <SubMenu
                key="sub2"
                icon={<ShopFilled style={{ fontSize: "17px" }} />}
                title={
                  <p style={{ fontSize: "16px", fontWeight: "500" }}>
                    Quản Lý Sản Phẩm
                  </p>
                }
              >
                <Menu.Item key="7">
                  {<p style={{ fontSize: "14.5px" }}>Tất cả sản phẩm </p>}
                </Menu.Item>
                <Menu.Item key="8">
                  {<p style={{ fontSize: "14.5px" }}>Thêm sản phẩm </p>}
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                icon={<UserOutlined style={{ fontSize: "17px" }} />}
                title={
                  <p style={{ fontSize: "16px", fontWeight: "500" }}>
                    Quản Lý Tài Khoản
                  </p>
                }
              >
                <Menu.Item key="10">
                  {<p style={{ fontSize: "14.5px" }}>Xác thực tài khoản </p>}
                </Menu.Item>
                <Menu.Item key="9">
                  {<p style={{ fontSize: "14.5px" }}>Thông tin cơ bản </p>}
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub4"
                icon={<WalletOutlined style={{ fontSize: "17px" }} />}
                title={
                  <p style={{ fontSize: "16px", fontWeight: "500" }}>
                    Tài Chính
                  </p>
                }
              >
                <Menu.Item key="11">
                  {<p style={{ fontSize: "14.5px" }}>Doanh thu </p>}
                </Menu.Item>
                <Menu.Item key="12">
                  {<p style={{ fontSize: "14.5px" }}>Số dư TK </p>}
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub5"
                icon={<PercentageOutlined style={{ fontSize: "17px" }} />}
                title={
                  <p style={{ fontSize: "16px", fontWeight: "500" }}>
                    Khuyến Mãi
                  </p>
                }
              >
                <Menu.Item key="13">
                  {<p style={{ fontSize: "14.5px" }}>Thêm mã khuyến mãi </p>}
                </Menu.Item>
                <Menu.Item key="14">
                  {<p style={{ fontSize: "14.5px" }}>Xem mã khuyến mãi </p>}
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub6"
                icon={<CarOutlined style={{ fontSize: "17px" }} />}
                title={
                  <p style={{ fontSize: "16px", fontWeight: "500" }}>
                    Giao Hàng
                  </p>
                }
              >
                <Menu.Item key="15">
                  {
                    <p style={{ fontSize: "15px", fontWeight: "500" }}>
                      Đăng ký GHN
                    </p>
                  }
                </Menu.Item>
                <SubMenu
                  key={"sub6-1"}
                  title={
                    <p style={{ fontSize: "15px", fontWeight: "500" }}>
                      Đơn hàng chưa giao
                    </p>
                  }
                >
                  <Menu.Item key="16">
                    {<p style={{ fontSize: "14.5px" }}>Đơn bán</p>}
                  </Menu.Item>
                  <Menu.Item key="19">
                    {<p style={{ fontSize: "14.5px" }}>Đơn thuê </p>}
                  </Menu.Item>
                </SubMenu>
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
