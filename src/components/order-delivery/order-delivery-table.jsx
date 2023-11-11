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
  Select,
  Divider,
} from "antd";
import RenderTag from "../render/RenderTag";
import axios from "axios";
import ProductOrder from "../product-owner-table/Product-Order";

const OrderDeliveryTable = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const productownerId = localStorage.getItem("productownerId");
  const [selectedOrderID, setSelectedOrderID] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [api, contextHolder] = notification.useNotification();

  const fetchProducts = async (orderID) => {
    try {
      const response = await axios.get(
        "http://fashionrental.online:8080/orderbuydetail/" + orderID
      );

      const productIDs = response.data.map((item) => item.productID);
      try {
        const products = [];
        for (const productID of productIDs) {
          const productResponse = await axios.get(
            "http://fashionrental.online:8080/product/" + productID
          );

          // Lọc chỉ lấy productName và thêm quantity là 1
          const productData = {
            name: productResponse.data.productName,
            quantity: 1,
          };

          products.push(productData);
        }
        setSelectedProduct(products);
        console.log(products);
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //----------------------------------------------------------------------
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://fashionrental.online:8080/orderbuy/po/prepare/" + productownerId
      );
      setOrderData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchDataProvine();
  }, []);
  // -----------------------------lấy data địa chỉ của GHN----------------------------------------
  const [provinceData, setProvineData] = useState([]);
  const [selectedProvince, setSelectedProvine] = useState(null);
  const [districtData, setDistrictData] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [wardData, setWardData] = useState([]);
  const [selectedWard, setSelectedWard] = useState(null);
  const [selectedrequiredNote, setSelectedRequiredNote] = useState(null);
  const handleProvinceChange = (value, option) => {
    const provineName = option.label;
    setSelectedProvine(provineName);
    fetchDataDistrict(value);
    console.log("provineName:", provineName);
  };
  const handleDistrictChange = (value, option) => {
    const districtName = option.label;
    setSelectedDistrict(districtName);
    fetchDataWard(value);
    console.log("districtName:", districtName);
  };
  const handleWardChange = (value, option) => {
    const wardName = option.label;
    setSelectedWard(wardName);
    console.log("wardName:", wardName);
  };
  const handleRequiredNoteChange = (value) => {
    setSelectedRequiredNote(value);
    console.log("requiredNote:", value);
  };

  const fetchDataProvine = async () => {
    try {
      const response = await axios.get(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province",
        {
          headers: {
            token: "8ffa5c52-7f16-11ee-a6e6-e60958111f48",
            "Content-Type": "application/json",
          },
        }
      );
      setProvineData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchDataDistrict = async (provinceId) => {
    try {
      const response = await axios.get(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district",
        {
          headers: {
            token: "8ffa5c52-7f16-11ee-a6e6-e60958111f48",
            "Content-Type": "application/json",
          },
          params: {
            province_id: provinceId,
          },
        }
      );
      setDistrictData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchDataWard = async (districtId) => {
    try {
      const response = await axios.post(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id",
        {
          district_id: districtId,
        },
        {
          headers: {
            token: "8ffa5c52-7f16-11ee-a6e6-e60958111f48",
            "Content-Type": "application/json",
          },
        }
      );

      setWardData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error calling API:", error);
      throw error;
    }
  };
  // ===================================================================================================================
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
    return `${day}/ ${month}/ ${year}`;
  }
  const [requiredNote, setRequiredNote] = useState([
    { name: "Cho thử hàng", value: "CHOTHUHANG" },
    { name: "Cho xem hàng không thử", value: "CHOXEMHANGKHONGTHU" },
    { name: "Không cho xem hàng", value: "KHONGCHOXEMHANG" },
  ]);
  const createDelivery = async () => {
    setIsDrawerVisible(false);
    const data = {
      payment_type_id: 2,
      required_note: selectedrequiredNote,
      to_name: selectedCustomer.fullName,
      to_phone: selectedCustomer.phone,
      to_address: form.getFieldValue("customerAddress"),
      to_ward_name: selectedWard,
      to_district_name: selectedDistrict,
      to_province_name: selectedProvince,
      weight: 200,
      length: 1,
      width: 19,
      height: 10,
      service_type_id: 2,
      items: selectedProduct,
    };
    console.log(data);
    try {
      const response = await fetch(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ShopId: "190296",
            Token: "8ffa5c52-7f16-11ee-a6e6-e60958111f48",
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();
      api["success"]({
        message: "Tạo đơn hàng thành công!",
        description: `Bạn đã tạo đơn hàng cho ${
          selectedCustomer.fullName
        } thành công. Mã đơn hàng của bạn là ${
          responseData.data.order_code
        }. Thời gian giao hàng dự kiến: ${formatDate(
          responseData.data.expected_delivery_time
        )}`,
        duration: 1000,
      });

      console.log("Create Delivery Success:", responseData);
      // try {
      //   const updateResponse = await axios.put(
      //     `http://fashionrental.online:8080/orderbuy?orderBuyID=${form.getFieldValue("orderBuyID")}&status=READY_PICKUP`
      //   );
      //   console.log("Ready pickup order success!!!", updateResponse.data);
      //   fetchOrders();
      // } catch (error) {
      //   console.error("Ready pickup order failed!!!", error);
      // }
    } catch (error) {
      console.error("Create Delivery Failed:", error);
      api["error"]({
        message: "Tạo đơn hàng thất bại!",
        description: `Bạn đã thêm ${selectedCustomer.fullName} thất bại`,
        duration: 1000,
      });
    }
  };

  // =============================================================
  const [form] = Form.useForm();
  const showDrawer = async (record) => {
    fetchProducts(record.orderBuyID);
    form.setFieldValue(record);
    form.setFieldsValue({ dateOrder: record.dateOrder });
    form.setFieldsValue({ customerAddress: record.customerAddress });
    form.setFieldsValue({ orderBuyID: record.orderBuyID });
    setSelectedOrderID(record.orderBuyID);
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
              backgroundColor: "#008000",
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
          >
            close
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
      dataIndex: "orderBuyID",
      key: "orderBuyID",
      width: "5%",
      ...getColumnSearchProps("orderBuyID"),
      render: (number) => (
        <p style={{ textAlign: "center" }}>{Number(number)}</p>
      ),
    },
    {
      title: "Thời gian",
      dataIndex: "dateOrder",
      key: "dateOrder",
      width: "10%",
      ...getColumnSearchProps("dateOrder"),
      render: (text) => <p>{formatDate(text)}</p>,
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      width: "15%",
      ...getColumnSearchProps("total"),
      render: (text) => (
        <p style={{ textAlign: "left" }}>{formatPriceWithVND(text)}</p>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: "15%",
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
      width: "15%",
      render: (text, record) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Space size="middle">
            <Button onClick={() => showDrawer(record)}>
              <EyeTwoTone />
              Xem Đơn
            </Button>
            {/* <Button onClick={() => deliveryOrder(record)}>
              <CheckCircleTwoTone twoToneColor="#52c41a" />
            </Button> */}
            {/*  */}
          </Space>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table bordered={true} columns={columns} dataSource={orderData} />
      {contextHolder}

      <Drawer
        title={"Đơn hàng"}
        open={isDrawerVisible}
        onClose={onCloseDrawer}
        width={1000}
        extra={
          <Space>
            <Button
              style={{ backgroundColor: "#008000", color: "#fff" }}
              onClick={() => createDelivery()}
            >
              Tạo đơn hàng
            </Button>
          </Space>
        }
      >
        <Form form={form}>
          <div style={{ display: "flex" }}>
            <div>
              <h3>Thông tin khách hàng:</h3>
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
                    <p>{formatDate(form.getFieldValue("dateOrder"))}</p>
                  </p>
                </div>
              </Form.Item>
              <Form.Item name="customerAddress">
                <div style={{ display: "flex" }}>
                  <strong>Địa chỉ:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {form.getFieldValue("customerAddress")}
                  </p>
                </div>
              </Form.Item>
              <h3>Danh sách sản phẩm:</h3>
              <ProductOrder key={selectedOrderID} orderID={selectedOrderID} />
            </div>
            <hr></hr>
            <div style={{ marginLeft: "20px" }}>
              {" "}
              <h3>Chọn địa chỉ giao hàng:</h3>
              <Form.Item>
                <span>Chọn tỉnh/thành phố:</span>
                <Select
                  style={{
                    width: 300,
                  }}
                  placeholder="Vui lòng chọn"
                  showSearch // Bật tính năng tìm kiếm
                  filterOption={(input, option) =>
                    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider
                        style={{
                          margin: "8px 0",
                        }}
                      />
                      <Space
                        style={{
                          padding: "0 8px 4px",
                        }}
                      ></Space>
                    </>
                  )}
                  options={provinceData.map((item) => ({
                    label: item.ProvinceName,
                    value: item.ProvinceID,
                  }))}
                  onChange={handleProvinceChange}
                />
              </Form.Item>
              <Form.Item>
                <span>Chọn quận/huyện:</span>
                <Select
                  style={{
                    width: 300,
                  }}
                  placeholder="Vui lòng chọn"
                  showSearch // Bật tính năng tìm kiếm
                  filterOption={(input, option) =>
                    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider
                        style={{
                          margin: "8px 0",
                        }}
                      />
                      <Space
                        style={{
                          padding: "0 8px 4px",
                        }}
                      ></Space>
                    </>
                  )}
                  options={districtData.map((item) => ({
                    label: item.DistrictName,
                    value: item.DistrictID,
                  }))}
                  onChange={handleDistrictChange}
                />
              </Form.Item>
              <Form.Item>
                <span>Chọn phường/xã:</span>
                <Select
                  style={{
                    width: 300,
                  }}
                  placeholder="Vui lòng chọn"
                  showSearch // Bật tính năng tìm kiếm
                  filterOption={(input, option) =>
                    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider
                        style={{
                          margin: "8px 0",
                        }}
                      />
                      <Space
                        style={{
                          padding: "0 8px 4px",
                        }}
                      ></Space>
                    </>
                  )}
                  options={wardData.map((item) => ({
                    label: item.WardName,
                    value: item.WardCode,
                  }))}
                  onChange={handleWardChange}
                />
              </Form.Item>
              <h3>Thông tin đơn hàng:</h3>
              <span>Nhập cân nặng đơn hàng:</span>
              <Form.Item
                name={"weigh"}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập cân nặng đơn hàng!",
                  },
                  {
                    pattern: /^(0|[1-9][0-9]*)$/,
                    message: "Vui lòng chỉ nhập số nguyên dương!",
                  },
                  {
                    validator: (_, value) => {
                      if (value <= 30000) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        "Cân nặng không được vượt quá 30000 gram!"
                      );
                    },
                  },
                ]}
              >
                <Input
                  type="number"
                  placeholder="Cân nặng đơn hàng"
                  suffix="gram"
                />
              </Form.Item>
              <span>Nhập chiều dài đơn hàng:</span>
              <Form.Item
                name={"length"}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập chiều dài đơn hàng!",
                  },
                  {
                    pattern: /^(0|[1-9][0-9]*)$/,
                    message: "Vui lòng chỉ nhập số nguyên dương!",
                  },
                  {
                    validator: (_, value) => {
                      if (value <= 150) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        "Chiều dài không được vượt quá 150 cm!"
                      );
                    },
                  },
                ]}
              >
                <Input
                  type="number"
                  placeholder="Chiều dài đơn hàng"
                  suffix="cm"
                />
              </Form.Item>
              <span>Nhập chiều rộng đơn hàng:</span>
              <Form.Item
                name={"width"}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập chiều rộng đơn hàng!",
                  },
                  {
                    pattern: /^(0|[1-9][0-9]*)$/,
                    message: "Vui lòng chỉ nhập số nguyên dương!",
                  },
                  {
                    validator: (_, value) => {
                      if (value <= 150) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        "Chiều rộng không được vượt quá 150 cm!"
                      );
                    },
                  },
                ]}
              >
                <Input
                  type="number"
                  placeholder="Chiều rộng đơn hàng"
                  suffix="cm"
                />
              </Form.Item>
              <span>Nhập chiều cao đơn hàng:</span>
              <Form.Item
                name={"height"}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập chiều rộng đơn hàng!",
                  },
                  {
                    pattern: /^(0|[1-9][0-9]*)$/,
                    message: "Vui lòng chỉ nhập số nguyên dương!",
                  },
                  {
                    validator: (_, value) => {
                      if (value <= 150) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        "Chiều cao không được vượt quá 150 cm!"
                      );
                    },
                  },
                ]}
              >
                <Input
                  type="number"
                  placeholder="Chiều cao đơn hàng"
                  suffix="cm"
                />
              </Form.Item>
              <Form.Item>
                <span>Ghi chú đơn hàng: </span>
                <Select
                  style={{
                    width: 300,
                  }}
                  placeholder="Vui lòng chọn"
                  showSearch // Bật tính năng tìm kiếm
                  filterOption={(input, option) =>
                    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider
                        style={{
                          margin: "8px 0",
                        }}
                      />
                    </>
                  )}
                  options={requiredNote.map((item) => ({
                    label: item.name,
                    value: item.value,
                  }))}
                  onChange={handleRequiredNoteChange}
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Drawer>
    </div>
  );
};
export default OrderDeliveryTable;
