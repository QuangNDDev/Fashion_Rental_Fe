import { SearchOutlined, EyeTwoTone } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Button, Drawer, Form, Input, Space, Table } from "antd";
import RenderTag from "../render/RenderTag";
import axios from "axios";
import ProductOrder from "../product-owner-table/Product-Order";
const OrdersBuyStaff = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [selectedCustomer, setSelectedCustomer] = useState([]);
  const [selectedProductowner, setSelectedProductowner] = useState([]);
  const [selectedOrderID, setSelectedOrderID] = useState(null);
  const [selectedOrderBuy, setselectedOrderBuy] = useState([]);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [requestOrderBuyData, setRequestOrderBuyData] = useState();

  const fetchRequestsAllOrderBuy = async () => {
    try {
      const response = await axios.get(
        "http://fashionrental.online:8080/orderbuy/staff"
      );
      setRequestOrderBuyData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequestsAllOrderBuy();
  }, []);

  function formatDate(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    const [month, day, year] = formattedDate.split("/");
    return `${day}/${month}/${year}`;
  }
  const [form] = Form.useForm();
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
  const formatPriceWithVND = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  const showDrawer = async (record) => {
    console.log("record", record);
    form.setFieldValue(record);
    setSelectedOrderID(record.orderBuyID);
    setIsDrawerVisible(true);
    try {
      const responseCustomer = await axios.get(
        "http://fashionrental.online:8080/customer/" + record.customerID
      );

      setSelectedCustomer(responseCustomer.data);
      console.log(responseCustomer.data);
    } catch (error) {
      console.error(error);
    }
    try {
      const responsePo = await axios.get(
        "http://fashionrental.online:8080/po/" + record.productownerID
      );

      setSelectedProductowner(responsePo.data);
      console.log(responsePo.data);
    } catch (error) {
      console.error(error);
    }
    try {
      const responseOrderbuy = await axios.get(
        "http://fashionrental.online:8080/orderbuy/" + record.orderBuyID
      );

      setselectedOrderBuy(responseOrderbuy.data);
      console.log("OrderBuy: ", responseOrderbuy.data);
    } catch (error) {
      console.error(error);
    }
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
  const onCloseDrawer = () => {
    setIsDrawerVisible(false);
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

  const columns = [
    {
      title: "Mã đơn",
      dataIndex: "orderBuyID",
      key: "orderBuyID",
      ...getColumnSearchProps("orderBuyID"),
      render: (text) => <p style={{ textAlign: "center" }}>{text}</p>,
    },
    {
      title: "Ngày bán",
      dataIndex: "dateOrder",
      key: "dateOrder",

      ...getColumnSearchProps("dateOrder"),
      render: (text) => (
        <p style={{ textAlign: "left" }}>{formatDateTime(text)}</p>
      ),
    },
    {
      title: "Khách hàng",
      dataIndex: "customerName",
      key: "customerName",

      ...getColumnSearchProps("customerName"),
    },
    {
      title: "Chủ sản phẩm",
      dataIndex: "productOwnerName",
      key: "productOwnerName",

      ...getColumnSearchProps("productOwnerName"),
    },
    {
      title: "Tổng cộng",
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

      ...getColumnSearchProps("status"),
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
        dataSource={requestOrderBuyData}
      />
      <Drawer
        title={"Đơn hàng"}
        open={isDrawerVisible}
        onClose={onCloseDrawer}
        width={900}
      >
        <Form form={form}>
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}>
              <hr />
              <h3>Thông tin người bán</h3>
              <hr />
              <Form.Item
                name="fullName"
                initialValue={
                  selectedProductowner && selectedProductowner.fullName
                }
              >
                <div style={{ display: "flex" }}>
                  <strong>Tên người bán:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {selectedProductowner && selectedProductowner.fullName}
                  </p>
                </div>
              </Form.Item>
              <Form.Item
                name="phonePo"
                initialValue={
                  selectedProductowner && selectedProductowner.phone
                }
              >
                <div style={{ display: "flex" }}>
                  <strong>SĐT:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {selectedProductowner && selectedProductowner.phone}
                  </p>
                </div>
              </Form.Item>
              <Form.Item
                name="addressPo"
                initialValue={
                  selectedProductowner && selectedProductowner.address
                }
              >
                <div style={{ display: "flex" }}>
                  <strong>Địa chỉ:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {selectedProductowner && selectedProductowner.address}
                  </p>
                </div>
              </Form.Item>
              <hr />
              <h3>Thông tin người mua</h3>
              <hr />
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
                name="phonePo"
                initialValue={selectedCustomer && selectedCustomer.phone}
              >
                <div style={{ display: "flex" }}>
                  <strong>SĐT:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {selectedCustomer && selectedCustomer.phone}
                  </p>
                </div>
              </Form.Item>
              <Form.Item
                name="addressCus"
                initialValue={
                  selectedOrderBuy && selectedOrderBuy.customerAddress
                }
              >
                <div style={{ display: "flex" }}>
                  <strong>Địa chỉ:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {selectedOrderBuy && selectedOrderBuy.customerAddress}
                  </p>
                </div>
              </Form.Item>
            </div>
            <hr />
            <div style={{ width: "50%" }}>
              <hr />
              <h3>Thông tin đơn hàng:</h3>
              <hr />
              <Form.Item
                name="dateOrder"
                initialValue={selectedOrderBuy && selectedOrderBuy.dateOrder}
              >
                <div style={{ display: "flex" }}>
                  <strong>Ngày đặt hàng:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {formatDateTime(selectedOrderBuy.dateOrder)}
                  </p>
                </div>
              </Form.Item>
              <Form.Item
                name="orderCode"
                initialValue={selectedOrderBuy && selectedOrderBuy.orderCode}
                style={{
                  display:
                    selectedOrderBuy && selectedOrderBuy.orderCode
                      ? "block"
                      : "none",
                }}
              >
                {selectedOrderBuy && selectedOrderBuy.orderCode && (
                  <div style={{ display: "flex" }}>
                    <strong>Mã giao hàng:</strong>
                    <p style={{ marginLeft: "10px" }}>
                      {selectedOrderBuy && selectedOrderBuy.orderCode}
                    </p>
                  </div>
                )}
              </Form.Item>
              <Form.Item
                name="totalBuyPriceProduct"
                initialValue={
                  selectedOrderBuy && selectedOrderBuy.totalBuyPriceProduct
                }
              >
                <div style={{ display: "flex" }}>
                  <strong>Tổng giá sản phẩm:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {formatPriceWithVND(selectedOrderBuy.totalBuyPriceProduct)}
                  </p>
                </div>
              </Form.Item>
              <Form.Item
                name="shippingFee"
                initialValue={selectedOrderBuy && selectedOrderBuy.shippingFee}
              >
                <div style={{ display: "flex" }}>
                  <strong>Giá vận chuyển:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {formatPriceWithVND(selectedOrderBuy.shippingFee)}
                  </p>
                </div>
              </Form.Item>
              <Form.Item
                name="total"
                initialValue={selectedOrderBuy && selectedOrderBuy.total}
              >
                <div style={{ display: "flex" }}>
                  <strong>Tổng tiền:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {formatPriceWithVND(selectedOrderBuy.total)}
                  </p>
                </div>
              </Form.Item>
            </div>
          </div>
        </Form>
        <hr />
        <h3>Danh sách sản phẩm:</h3>
        <hr />
        <ProductOrder key={selectedOrderID} orderID={selectedOrderID} />
      </Drawer>
    </div>
  );
};
export default OrdersBuyStaff;
