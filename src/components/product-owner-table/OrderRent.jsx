import {
  SearchOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  EyeTwoTone,
} from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import {
  Button,
  Drawer,
  Form,
  Input,
  notification,
  Space,
  Table,
  Modal,
} from "antd";
import RenderTag from "../render/RenderTag";
import axios from "axios";
import ProductOrderRent from "./Product-Order-Rent";
const OrderRent = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const productownerId = localStorage.getItem("productownerId");
  const [selectedOrderID, setSelectedOrderID] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [isRejectConfirmModalVisible, setIsRejectConfirmModalVisible] =
    useState(false);
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://fashionrental.online:8080/orderrent/po/pending/" +
          productownerId
      );
      setOrderData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const showRejectConfirmModal = () => {
    setIsRejectConfirmModalVisible(true);
  };

  const handleRejectConfirmModalCancel = () => {
    setIsRejectConfirmModalVisible(false);
  };

  // Hàm xử lý từ chối đơn hàng
  const rejectOrder = (record) => {
    setSelectedOrderID(record.orderRentID);
    Modal.confirm({
      title: "Xác nhận từ chối đơn hàng",
      content: "Bạn có chắc chắn muốn từ chối đơn hàng này không?",
      okText: "Đồng ý",
      cancelText: "Hủy",
      okButtonProps: {
        style: {
          backgroundColor: "green", // Màu xanh lá
          borderColor: "#52c41a", // Màu viền xung quanh
        },
      },
      onOk: handleRejectConfirmModalOk,
      onCancel: handleRejectConfirmModalCancel,
    });
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  // ==============formatDate====================================
  function formatDate(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    const [month, day, year] = formattedDate.split("/");
    return `${day}/${month}/${year}`;
  }

  function formatDateTime(dateOrder) {
    if (!Array.isArray(dateOrder) || dateOrder.length < 5) {
      return "Invalid date format";
    }

    const [year, month, day, hour, minute] = dateOrder;
    const formattedDate = formatDate(`${year}-${month}-${day}`);
    const formattedTime = `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
    return `${formattedTime} ${formattedDate}`;
  }
  // =====================ApproveOrder============================
  const approveOrder = async (record) => {
    console.log("orderBuyID:", record.orderRentID);
    try {
      const response = await axios.put(
        `http://fashionrental.online:8080/orderrent?orderRentID=${record.orderRentID}&status=PREPARE`
      );
      api["success"]({
        message: "Duyệt Đơn Hàng Thành Công!",
        description: `Đơn hàng ${response.data.orderRentID} đã được duyệt`,
        duration: 1000,
      });
      console.log("Check order success!!!", response.data);
      fetchOrders();
    } catch (error) {
      api["error"]({
        message: "Duyệt Đơn Hàng Thất Bại!",
        description: null,
      });
      console.error("Check order  failed", error);
    }
  };
  // =======================RejectOrder===========================
  const handleRejectConfirmModalOk = async () => {
    console.log("orderRentID:", selectedOrderID);
    try {
      const response = await axios.put(
        `http://fashionrental.online:8080/orderrent?orderRentID=${selectedOrderID}&status=CANCELED`
      );

      setIsRejectConfirmModalVisible(false);

      fetchOrders();
    } catch (error) {
      api["error"]({
        message: "Từ Chối Đơn Hàng Thất Bại!",
        description: null,
      });
      console.error("Check order failed", error);
    }
  };

  // =============================================================
  const [form] = Form.useForm();
  const showDrawer = async (record) => {
    form.setFieldValue(record);
    form.setFieldsValue({ dateOrder: record.dateOrder });
    form.setFieldsValue({ customerAddress: record.customerAddress });
    setSelectedOrderID(record.orderRentID);
    setIsDrawerVisible(true);
    try {
      const response = await axios.get(
        "http://fashionrental.online:8080/customer/" + record.customerID
      );

      setSelectedCustomer(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Tìm kiếm...`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
            borderColor: "rgb(32, 30, 42)",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 110,
              backgroundColor: "rgb(32, 30, 42)",
            }}
          >
            Tìm kiếm
          </Button>
          <Button
            onClick={() =>
              clearFilters &&
              handleReset(clearFilters) &
                handleSearch(selectedKeys, confirm, dataIndex) &
                handleReset(clearFilters)
            }
            size="small"
            style={{
              width: 90,
              borderColor: "rgb(32, 30, 42)",
            }}
          >
            Đặt lại
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
            style={{ color: "rgb(32, 30, 42)" }}
          >
            Đóng
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  //format date ------------------------------------
  function formatDate(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    const [month, day, year] = formattedDate.split("/");
    return `${day}/ ${month}/ ${year}`;
  }
  //chuyen doi thanh dang tien te vnd ------------------------------------------------------
  const formatPriceWithVND = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const onCloseDrawer = () => {
    setIsDrawerVisible(false);
  };
  const columns = [
    {
      title: "Mã đơn",
      dataIndex: "orderRentID",

      key: "orderRentID",

      ...getColumnSearchProps("orderRentID"),
      render: (number) => <p style={{ textAlign: "left" }}>{Number(number)}</p>,
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "dateOrder",
      key: "dateOrder",

      ...getColumnSearchProps("dateOrder"),
      render: (text) => <p>{formatDateTime(text)}</p>,
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",

      ...getColumnSearchProps("total"),
      render: (text) => (
        <p style={{ textAlign: "left" }}>{formatPriceWithVND(text)}</p>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",

      render: (status) => (
        <p>
          <RenderTag tagRender={status} />
        </p>
      ),
    },
    {
      title: <p style={{ textAlign: "center" }}>Hành Động</p>,
      key: "action",
      align: "left",

      render: (text, record) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Space size="middle">
            <Button onClick={() => showDrawer(record)}>
              <EyeTwoTone />
              Xem Đơn
            </Button>
            <Button onClick={() => approveOrder(record)}>
              <CheckCircleTwoTone twoToneColor="#52c41a" />
            </Button>
            <Button onClick={() => rejectOrder(record)}>
              <CloseCircleTwoTone twoToneColor="#ff4d4f" />
            </Button>
            <Modal
              title="Xác nhận từ chối đơn hàng"
              open={isRejectConfirmModalVisible}
              onOk={handleRejectConfirmModalOk}
              onCancel={handleRejectConfirmModalCancel}
              okText="Đồng ý"
              cancelText="Hủy"
            >
              Bạn có chắc chắn muốn từ chối đơn hàng này không?
            </Modal>
          </Space>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table
        responsive
        bordered={true}
        columns={columns}
        dataSource={orderData}
      />
      {contextHolder}
      <Drawer
        title={"Đơn hàng"}
        open={isDrawerVisible}
        onClose={onCloseDrawer}
        width={500}
      >
        <Form form={form}>
          <Form.Item
            name="fullName"
            initialValue={selectedCustomer && selectedCustomer.fullName}
          >
            <div style={{ display: "flex" }}>
              <strong>Tên người mua:</strong>
              <p style={{ marginLeft: "10px" }}>
                {selectedCustomer && selectedCustomer.fullName}
              </p>
            </div>
          </Form.Item>
          <Form.Item
            name="phone"
            initialValue={selectedCustomer && selectedCustomer.phone}
          >
            <div style={{ display: "flex" }}>
              <strong>SĐT người mua:</strong>
              <p style={{ marginLeft: "10px" }}>
                {selectedCustomer && selectedCustomer.phone}
              </p>
            </div>
          </Form.Item>
          <Form.Item name="dateOrder">
            <div style={{ display: "flex" }}>
              <strong>Ngày đặt hàng:</strong>
              <p style={{ marginLeft: "10px" }}>
                <p>{formatDateTime(form.getFieldValue("dateOrder"))}</p>
              </p>
            </div>
          </Form.Item>

          <Form.Item name="customerAddress">
            <div style={{ display: "flex" }}>
              <strong style={{ minWidth: "55px" }}>Địa chỉ:</strong>
              <p style={{ marginLeft: "10px" }}>
                {form.getFieldValue("customerAddress")}
              </p>
            </div>
          </Form.Item>
        </Form>
        <h3>Danh sách sản phẩm:</h3>
        <ProductOrderRent key={selectedOrderID} orderID={selectedOrderID} />
      </Drawer>
    </div>
  );
};
export default OrderRent;
