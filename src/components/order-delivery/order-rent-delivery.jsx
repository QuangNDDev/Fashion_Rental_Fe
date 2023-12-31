import { SearchOutlined, UploadOutlined, CarFilled } from "@ant-design/icons";
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
  Upload,
  ConfigProvider,
} from "antd";
import { storage } from "../../firebase/firebase";
import RenderTag from "../render/RenderTag";
import axios from "axios";
import NotRegisterGHN from "./not_registerGHN";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import ProductRentOrder from "../product-owner-table/Product-Rent-Order";
const OrderRentDeliveryTable = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [orderDetailData, setOrderDetailData] = useState([]);
  const productownerId = localStorage.getItem("productownerId");
  const poshopId = localStorage.getItem("poshopID");
  const potoken = localStorage.getItem("potoken");
  const [selectedOrderID, setSelectedOrderID] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [urlImages, setUrlImages] = useState([]);
  const handleCancel = () => setPreviewOpen(false);
  const isGHNVisible = poshopId && potoken;

  const [api, contextHolder] = notification.useNotification();

  const fetchProducts = async (orderRentID) => {
    try {
      const response = await axios.get(
        "http://fashionrental.online:8080/orderrentdetail/" + orderRentID
      );

      const productDTO = response.data.map((item) => item.productDTO);
      // try {
      const products = [];
      for (const product of productDTO) {
        const productData = {
          name: product.productName,
          quantity: 1,
        };

        products.push(productData);
      }
      setSelectedProduct(products);
      console.log(products);
    } catch (error) {
      console.error(error);
    }
  };
  //----------------------------------------------------------------------
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://fashionrental.online:8080/orderrent/po/prepare/" +
          productownerId
      );
      setOrderData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchOrderDetails = async (orderRentId) => {
    try {
      const response = await axios.get(
        "http://fashionrental.online:8080/orderrentdetail/" + orderRentId
      );
      const orderRentDetailIDs = response.data.map(
        (item) => item.orderRentDetailID
      );
      setOrderDetailData(orderRentDetailIDs);
      console.log("order detail id:", orderRentDetailIDs);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchDataProvine();
  }, []);
  const [hasImages, setHasImages] = useState(false);


useEffect(() => {

  if (urlImages && urlImages.length > 0) {
    setHasImages(true); 
  } else {
    setHasImages(false);
  }
}, [urlImages]);
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
            token: potoken,
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
            token: potoken,
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
            token: potoken,
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
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleFileChange = async (event) => {
    try {
      if (event.file.status !== "removed") {
        console.log("handleFileChange called");
        console.log("File selected:", event.file);
        const imageRef = ref(storage, `images/${event.file.name + v4()}`);

        uploadBytes(imageRef, event.file)
          .then((snapshot) => {
            // Set the URL after a successful upload
            getDownloadURL(snapshot.ref).then((url) => {
              setUrlImages((prevUrls) => [
                ...prevUrls,
                { imgUrl: url, fileName: event.file.name },
              ]);
            });
          })
          .catch((error) => {
            console.error("Error uploading image:", error);
          });
      } else {
        setUrlImages((prevUrls) =>
          prevUrls.filter((item) => item.fileName !== event.file.name)
        );
        console.log("File removed:", event.file);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
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
    const formValues = await form.validateFields();
    const data = {
      payment_type_id: 2,
      required_note: selectedrequiredNote,
      to_name: selectedCustomer.fullName,
      to_phone: selectedCustomer.phone,
      to_address: form.getFieldValue("customerAddress"),
      to_ward_name: selectedWard,
      to_district_name: selectedDistrict,
      to_province_name: selectedProvince,
      weight: parseInt(formValues.weight),
      length: parseInt(formValues.length),
      width: parseInt(formValues.width),
      height: parseInt(formValues.height),
      service_type_id: 2,
      items: selectedProduct,
    };
    console.log("Data GHN:", data);
    const imgUrls = urlImages.map((item) => item.imgUrl);
    const imgData = {
      accountID: localStorage.getItem("accountId"),
      img: imgUrls,
      orderRentID: selectedOrderID,
      status: "PO_SEND",
    };
    console.log("img data:", imgData);
    try {
      const imgDataResponse = await axios.post(
        "http://fashionrental.online:8080/pic",
        imgData
      );
      console.log("Img data success!!!", imgDataResponse.data);
    } catch (error) {
      console.error("Img data failed!!!", error);
    }
    try {
      const response = await fetch(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ShopId: poshopId,
            Token: potoken,
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

      try {
        const updateResponse = await axios.put(
          `http://fashionrental.online:8080/orderrent?orderRentID=${form.getFieldValue(
            "orderRentID"
          )}&status=DELIVERY`
        );
        console.log("Delivery order success!!!", updateResponse.data);
        fetchOrders();
      } catch (error) {
        console.error("Delivery order failed!!!", error);
      }
      try {
        const orderCodeUpdateResponse = await axios.put(
          `http://fashionrental.online:8080/orderrent/updateorderrentcode?orderCode=${
            responseData.data.order_code
          }&orderRentID=${form.getFieldValue("orderRentID")}`
        );
        console.log(
          "Order code update success!!!",
          orderCodeUpdateResponse.data
        );
      } catch (error) {
        console.error("Order code update failed!!!", error);
      }
      setTimeout(async () => {
        try {
          const updateComfirmingResponse = await axios.put(
            `http://fashionrental.online:8080/orderrent?orderRentID=${form.getFieldValue(
              "orderRentID"
            )}&status=CONFIRMING`
          );
          console.log(
            "Update confirming Success:",
            updateComfirmingResponse.data
          );
        } catch (error) {
          console.error("Update confirming API Failed!!!", error);
        }
      }, 30 * 1000);
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
    fetchProducts(record.orderRentID);
    fetchOrderDetails(record.orderRentID);
    form.setFieldsValue(record);
    form.setFieldsValue({ dateOrder: record.dateOrder });
    form.setFieldsValue({ customerAddress: record.customerAddress });
    form.setFieldsValue({ orderRentID: record.orderRentID });
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
      render: (number) => (
        <p style={{ textAlign: "center" }}>{Number(number)}</p>
      ),
    },
    {
      title: "Thời gian",
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
              <CarFilled />
              Giao hàng
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
      {isGHNVisible ? (
        <Drawer
          title={"Đơn hàng"}
          open={isDrawerVisible}
          onClose={onCloseDrawer}
          width={1100}
          extra={
            <Space>
              <ConfigProvider
                theme={{
                  token: {
                    Button: {
                      colorPrimary: "rgb(32, 30, 42)",
                      colorPrimaryHover: "orange",
                      colorPrimaryActive: "orange",
                    },
                  },
                }}
              >
                <Button
                  type="primary"
                  style={{ fontWeight: "bold" }}
                  onClick={() => createDelivery()}
                  disabled={!hasImages}
                >
                  Tạo đơn hàng
                </Button>
              </ConfigProvider>
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
                      <p>{formatDateTime(form.getFieldValue("dateOrder"))}</p>
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
                <ProductRentOrder
                  key={selectedOrderID}
                  orderID={selectedOrderID}
                />
              </div>
              <hr></hr>

              <div name="GHN" style={{ marginLeft: "20px" }}>
                {" "}
                <h3>Chọn địa chỉ giao hàng:</h3>
                <Form.Item>
                  <span style={{ marginRight: "10px" }}>
                    Chọn tỉnh/thành phố:
                  </span>
                  <Select
                    style={{
                      width: 300,
                    }}
                    placeholder="Vui lòng chọn"
                    showSearch // Bật tính năng tìm kiếm
                    filterOption={(input, option) =>
                      option.label.toLowerCase().indexOf(input.toLowerCase()) >=
                      0
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
                  <span style={{ marginRight: "10px" }}>Chọn quận/huyện:</span>
                  <Select
                    style={{
                      width: 300,
                    }}
                    placeholder="Vui lòng chọn"
                    showSearch // Bật tính năng tìm kiếm
                    filterOption={(input, option) =>
                      option.label.toLowerCase().indexOf(input.toLowerCase()) >=
                      0
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
                  <span style={{ marginRight: "10px" }}>Chọn phường/xã:</span>
                  <Select
                    style={{
                      width: 300,
                    }}
                    placeholder="Vui lòng chọn"
                    showSearch // Bật tính năng tìm kiếm
                    filterOption={(input, option) =>
                      option.label.toLowerCase().indexOf(input.toLowerCase()) >=
                      0
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
                  name={"weight"}
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
                  <span style={{ marginRight: "10px" }}>
                    Ghi chú đơn hàng:{" "}
                  </span>
                  <Select
                    style={{
                      width: 300,
                    }}
                    placeholder="Vui lòng chọn"
                    showSearch // Bật tính năng tìm kiếm
                    filterOption={(input, option) =>
                      option.label.toLowerCase().indexOf(input.toLowerCase()) >=
                      0
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
                <div style={{ display: "flex" }}>
                  <span style={{ marginRight: "8px" }}>Hình ảnh đơn hàng:</span>
                  <Form.Item name={"imgRentOrder"}>
                    <Upload
                      maxCount={10}
                      onChange={handleFileChange}
                      onPreview={handlePreview}
                      beforeUpload={() => false}
                      multiple={true}
                    >
                      <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                      <span
                        style={{
                          marginLeft: "20px",
                          fontStyle: "italic",
                          fontWeight: "normal",
                          color: "grey",
                        }}
                      ></span>
                    </Upload>
                  </Form.Item>

                  <Modal
                    open={previewOpen}
                    title={previewTitle}
                    footer={null}
                    onCancel={handleCancel}
                  >
                    <img
                      alt="example"
                      style={{
                        width: "100%",
                      }}
                      src={previewImage}
                    />
                  </Modal>
                </div>
              </div>
            </div>
          </Form>
        </Drawer>
      ) : (
        <NotRegisterGHN />
      )}
    </div>
  );
};
export default OrderRentDeliveryTable;
