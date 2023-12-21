import {
  SearchOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  EyeTwoTone,
  UploadOutlined,
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
  Upload,
} from "antd";
import RenderTag from "../render/RenderTag";
import axios from "axios";
import ProductOrderRent from "./Product-Order-Rent";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
const RentingOrderTable = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const productownerId = localStorage.getItem("productownerId");
  const [selectedOrderID, setSelectedOrderID] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState([]);
  const [selectedStaffResponse, setselectedStaffResponse] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [isRejectConfirmModalVisible, setIsRejectConfirmModalVisible] =
    useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [expectedCost, setExpectedCost] = useState("");
  const handleCancel = () => setPreviewOpen(false);
  const [urlImages, setUrlImages] = useState([]);
  const accountId = localStorage.getItem("accountId");
  const [customerAccountID, setCustomerAccountID] = useState(null);
  const navigate = useNavigate();
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://fashionrental.online:8080/orderrent/po/three/" + productownerId
      );

      const orderData = response.data;
      const dayRemainingArray = [];

      for (const order of orderData) {
        try {
          const responseDayRemaining = await axios.get(
            `http://fashionrental.online:8080/orderrentdetail/${order.orderRentID}`
          );
          dayRemainingArray.push(responseDayRemaining.data[0].dayRemaining);
        } catch (error) {
          console.error("Error fetching day remaining:", error);
          dayRemainingArray.push(null);
        }
      }
      const updatedOrderData = orderData.map((order, index) => ({
        ...order,
        dayRemaining: dayRemainingArray[index],
      }));
      console.log(updatedOrderData);
      setOrderData(updatedOrderData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const showRejectConfirmModal = (record) => {
    setIsRejectConfirmModalVisible(true);
  };

  const handleRejectConfirmModalCancel = () => {
    setIsRejectConfirmModalVisible(false);
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
  const handleRejectConfirmModalOk = async () => {
    setIsRejectConfirmModalVisible(false);
    const rejectData = {
      description: rejectReason,
      expectedCost: parseInt(expectedCost),
      productownerID: parseInt(productownerId),
      orderRentID: selectedOrderID,
    };
    console.log(rejectData);
    try {
      const response = await axios.post(
        `http://fashionrental.online:8080/complaining`,
        rejectData
      );

      api["success"]({
        message: "Gửi đơn yêu cầu trừ cọc thành công!",
        description: `Đơn ${response.data.requestComplainingOrderID} đã chuyển cho nhân viên`,
      });
      fetchOrders();
      setRejectReason("");
      setExpectedCost("");
      const imgUrls = urlImages.map((item) => item.imgUrl);
      const imgData = {
        accountID: localStorage.getItem("accountId"),
        img: imgUrls,
        orderRentID: selectedOrderID,
        status: "PO_RECEIVED",
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
        const responseStatus = await axios.put(
          `http://fashionrental.online:8080/orderrent?orderRentID=` +
            selectedOrderID +
            `&status=PROGRESSING`
        );
        console.log("Check order success!!!", responseStatus.data);
        fetchOrders();
      } catch (error) {
        console.error("Check order  failed", error);
      }
    } catch (error) {
      api["error"]({
        message: "Từ Chối Đơn Hàng Thất Bại!",
        description: null,
      });
      console.error("Check order failed", error);
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
  // =============================================================
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
  //================================================================
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
      setCustomerAccountID(response.data.accountDTO.accountID);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    if (record.status === "PROGRESSING_FAILED") {
      try {
        const response = await axios.get(
          `http://fashionrental.online:8080/complaining/${record.orderRentID}/notapproved`
        );

        setselectedStaffResponse(response.data);
        console.log("Staff respone: ", response.data);
      } catch (error) {
        console.error(error);
      }
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
            borderColor: "green",
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
            style={{ color: "green" }}
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
  // =====================ApproveOrder============================
  const approveOrder = async (record) => {
    console.log("orderBuyID:", record.orderRentID);
    try {
      const response = await axios.put(
        `http://fashionrental.online:8080/orderrent?orderRentID=` +
          record.orderRentID +
          `&status=COMPLETED`
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
  // Hàm xử lý từ chối đơn hàng
  const rejectOrder = (record) => {
    setIsRejectConfirmModalVisible(true);
    setSelectedOrderID(record.orderRentID);
  };

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
  // modal response--------------------------------------------------------------------------
  const [isModalOpenResponse, setIsModalOpenResponse] = useState(false);

  const showModalResponse = () => {
    setIsModalOpenResponse(true);
  };

  const handleOkResponse = () => {
    setIsModalOpenResponse(false);
  };

  const handleCancelResponse = () => {
    setIsModalOpenResponse(false);
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
      title: "Mã giao hàng",
      dataIndex: "orderCode",
      key: "orderCode",

      ...getColumnSearchProps("orderCode"),
      render: (text) => <p style={{ textAlign: "left" }}>{text}</p>,
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
      title: "Số ngày thuê còn lại",
      dataIndex: "dayRemaining",
      key: "dayRemaining",

      render: (dayRemaining) => (
        <p style={{ textAlign: "left" }}>
          <RenderTag tagRender={dayRemaining} />
        </p>
      ),
    },
    {
      title: <p style={{ textAlign: "center" }}>Hành Động</p>,
      key: "action",
      align: "left",

      render: (text, record) => {
        const isReturning = record.status === "RETURNING";
        const isProgressingFailed = record.status === "PROGRESSING_FAILED";
        if (isProgressingFailed) {
          return (
            <>
              <Button style={{margin:"2px"}} onClick={() => showDrawer(record)}>
                <EyeTwoTone />
                Xem Đơn
              </Button>
              <Button style={{margin:"2px"}} onClick={() => showModalResponse(record)}>Lí do</Button>
              <Button style={{margin:"2px"}} onClick={() => approveOrder(record)}>
                <CheckCircleTwoTone twoToneColor="#52c41a" />
              </Button>
              <Button style={{margin:"2px"}} onClick={() => rejectOrder(record)}>
                <CloseCircleTwoTone twoToneColor="#ff4d4f" />
              </Button>
            
            </>
          );
        }
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Space size="middle">
              {!isReturning && (
                <Button onClick={() => showDrawer(record)}>
                  <EyeTwoTone />
                  Xem Đơn
                </Button>
              )}
              {isReturning && (
                <>
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
                </>
              )}
              <Modal
                title="Gửi yêu cầu cho nhân viên"
                visible={isRejectConfirmModalVisible}
                onOk={handleRejectConfirmModalOk}
                onCancel={handleRejectConfirmModalCancel}
                okText="Đồng ý"
                cancelText="Hủy"
                okButtonProps={{ disabled: !urlImages || urlImages.length === 0 }}
              >
                <Form>
                  <span style={{ marginRight: "8px" }}>Chi phí:</span>
                  <Form.Item>
                    <Input
                      value={expectedCost}
                      onChange={(e) => setExpectedCost(e.target.value)}
                      placeholder="Nhập chi phí..."
                      suffix="VND"
                    />
                    <p style={{ color: "red", fontStyle: "italic" }}>
                      *Chi phí này sẽ được trừ vào tiền cọc của khách hàng
                    </p>
                  </Form.Item>
                  <span style={{ marginRight: "8px" }}>Lí do:</span>
                  <Form.Item>
                    <Input.TextArea
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      placeholder="Nhập lý do..."
                      autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                  </Form.Item>
                  <span style={{ marginRight: "8px" }}>Hình ảnh sản phẩm:</span>
                  <Form.Item>
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
                </Form>
              </Modal>
              <Modal
                title="Lí do từ chối"
                open={isModalOpenResponse}
                onOk={handleOkResponse}
                onCancel={handleCancelResponse}
                footer={false}
              >
                {selectedStaffResponse &&
                  selectedStaffResponse.map((item, index) => (
                    <Form key={index}>
                      <hr />
                      <Form.Item
                        name={`createdDate-${index}`}
                        initialValue={item.createdDate}
                      >
                        <div style={{ display: "flex" }}>
                          <strong>Ngày tạo yêu cầu:</strong>
                          <p style={{ marginLeft: "10px" }}>
                            {formatDate(item.createdDate)}
                          </p>
                        </div>
                      </Form.Item>
                      <Form.Item
                        name={`staffResponse-${index}`}
                        initialValue={item.staffResponse}
                      >
                        <div style={{ display: "flex" }}>
                          <strong>Lí do từ chối:</strong>
                          <p style={{ marginLeft: "10px" }}>
                            {item.staffResponse}
                          </p>
                        </div>
                      </Form.Item>
                      <hr />
                    </Form>
                  ))}
              </Modal>

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
            </Space>
          </div>
        );
      },
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

        <Button
          style={{
            marginTop: 20,
          }}
          onClick={async () => {
            const res = await axios.post(
              `http://fashionrental.online:8080/chat/room`,
              {
                accountID1: accountId,
                accountID2: customerAccountID,
              }
            );
            navigate(`/productOwner/chat/${res.data.roomID}`);
            console.log(res);
          }}
          type="primary"
        >
          Chat với người bán
        </Button>
      </Drawer>
    </div>
  );
};
export default RentingOrderTable;
