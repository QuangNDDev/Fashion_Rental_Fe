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
  Image,
} from "antd";
import RenderTag from "../render/RenderTag";
import axios from "axios";
const RequestTable = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const productownerId = localStorage.getItem("productownerId");
  const [selectedRequestID, setSelectedRequestID] = useState(null);
  const [api, contextHolder] = notification.useNotification();
  const [isRejectConfirmModalVisible, setIsRejectConfirmModalVisible] =
    useState(false);
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://fashionrental.online:8080/complaining/getapproving"
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
  // =============================================================
  const [form] = Form.useForm();
  const [selectedRequest, setSelectedRequest] = useState([]);
  const [selectedPo, setSelectedPo] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [selectedImgRequestCusSend, setselectedImgRequestCusSend] = useState(
    []
  );
  const [selectedImgRequestCusReceived, setselectedImgRequestCusReceived] =
    useState([]);
  const [selectedImgRequestPoSend, setselectedImgRequestPoSend] = useState([]);
  const [selectedImgRequestPoReceived, setselectedImgRequestPoReceived] =
    useState([]);
  const showDrawer = async (record) => {
    form.setFieldValue(record);
    setSelectedRequestID(record.requestComplainingOrderID);
    setIsDrawerVisible(true);
    try {
      const response = await axios.get(
        "http://fashionrental.online:8080/complaining/" +
          record.requestComplainingOrderID
      );

      setSelectedRequest(response.data);
      setSelectedCustomer(response.data.orderRentDTO.customerDTO);
      setSelectedPo(response.data.orderRentDTO.productownerDTO);
      setSelectedOrder(response.data.orderRentDTO);
      try {
        const responseImg = await axios.get(
          "http://fashionrental.online:8080/pic/img/" +
            response.data.orderRentDTO.orderRentID
        );

        console.log("img data:", responseImg.data);
        const imgData = responseImg.data;
        const imgDataPoSend = imgData.filter(
          (item) => item.status === "PO_SEND"
        );
        const imgDataCusSend = imgData.filter(
          (item) => item.status === "CUS_SEND"
        );
        const imgDataCusReceived = imgData.filter(
          (item) => item.status === "CUS_RECEIVED"
        );
        const imgDataPoReceived = imgData.filter(
          (item) => item.status === "PO_RECEIVED"
        );
        const allImgUrlsPosend = imgDataPoSend.map((item) => item.imgUrl);
        const allImgUrlsPoReceived = imgDataPoReceived.map(
          (item) => item.imgUrl
        );
        const allImgUrlsCussend = imgDataCusSend.map((item) => item.imgUrl);
        const allImgUrlsCusReceived = imgDataCusReceived.map(
          (item) => item.imgUrl
        );
        setselectedImgRequestPoSend(allImgUrlsPosend);
        setselectedImgRequestCusSend(allImgUrlsCussend);
        setselectedImgRequestCusReceived(allImgUrlsCusReceived);
        setselectedImgRequestPoReceived(allImgUrlsPoReceived);
        console.log("img data PO_SEND:", allImgUrlsPosend);
        console.log("img data CUS_SEND:", imgDataCusSend);
        console.log("img data CUS_RECEIVED:", imgDataCusReceived);
        console.log("img data PO_RECEIVED:", imgDataPoReceived);
      } catch (error) {
        console.error(error);
      }
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
      dataIndex: "requestComplainingOrderID",

      key: "requestComplainingOrderID",

      ...getColumnSearchProps("requestComplainingOrderID"),
      render: (number) => <p style={{ textAlign: "left" }}>{Number(number)}</p>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
      key: "createdDate",

      ...getColumnSearchProps("createdDate"),
      render: (text) => <p>{formatDate(text)}</p>,
    },
    {
      title: "Tiền yêu cầu trừ",
      dataIndex: "expectedCost",
      key: "expectedCost",

      ...getColumnSearchProps("expectedCost"),
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
          </Space>
        </div>
      ),
    },
  ];
  const [descriptionApproveValue, setdescriptionApproveValue] = useState("");
  const [isModalApproveOpen, setIsModalApproveOpen] = useState(false);
  const [descriptionNotApproveValue, setdescriptionNotApproveValue] =
    useState("");
  const [isModalNotApproveOpen, setIsModalNotApproveOpen] = useState(false);
  const showModalApprove = () => {
    setIsModalApproveOpen(true);
  };
  const showModalNotApprove = () => {
    setIsModalNotApproveOpen(true);
  };
  const handleOkApprove = async () => {
    setIsModalApproveOpen(false);
    setIsDrawerVisible(false);
    try {
      const response = await axios.put(
        `http://fashionrental.online:8080/complaining?requestID=${selectedRequestID}&staffID=${localStorage.getItem(
          "staffId"
        )}&staffResponse=${descriptionApproveValue}&status=APPROVED`
      );
      console.log("Approve request success!!!", response.data);

      api["success"]({
        message: "Chấp Nhận Yêu Cầu Thành Công!",
        description: `Yêu cầu ${selectedRequestID} đã được chấp nhận`,
      });
      fetchOrders();
    } catch (error) {
      console.error("Approve request faild!!!", error);
      api["error"]({
        message: "Chấp Nhận Yêu Cầu Thất Bại!",
        description: null,
      });
    }
  };
  const handleNotApprove = async () => {
    setIsModalNotApproveOpen(false);
    setIsDrawerVisible(false);
    try {
      const response = await axios.put(
        `http://fashionrental.online:8080/complaining?requestID=${selectedRequestID}&staffID=${localStorage.getItem(
          "staffId"
        )}&staffResponse=${descriptionNotApproveValue}&status=NOT_APPROVED`
      );
      console.log("NOT Approve request success!!!", response.data);

      api["success"]({
        message: "Từ Chối Yêu Cầu Thành Công!",
        description: `Yêu cầu ${selectedRequestID} đã bị từ chối`,
      });
      fetchOrders();
    } catch (error) {
      console.error("NOT Approve request faild!!!", error);
      api["error"]({
        message: "Từ Chối Yêu Cầu Thất Bại!",
        description: null,
      });
    }
  };
  const handleCancelApprove = () => {
    setIsModalApproveOpen(false);
  };
  const handleCancelNotApprove = () => {
    setIsModalNotApproveOpen(false);
  };
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
        width={1250}
        extra={
          <Space>
            <Button
              style={{ backgroundColor: "#008000", color: "#fff" }}
              onClick={() => showModalApprove()}
            >
              Chấp nhận
            </Button>
            <Button onClick={() => showModalNotApprove()}>Từ chối</Button>
          </Space>
        }
      >
        <Form form={form}>
          <div style={{ display: "flex", width: "100%" }}>
            <div style={{ width: "50%" }}>
              <hr />
              <h3>Thông tin khách hàng:</h3>
              <hr />
              <Form.Item
                name="cusID"
                initialValue={selectedCustomer && selectedCustomer.customerID}
              >
                <div style={{ display: "flex" }}>
                  <strong>Mã khách hàng:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {selectedCustomer && selectedCustomer.customerID}
                  </p>
                </div>
              </Form.Item>
              <Form.Item
                name="fullNameCus"
                initialValue={selectedCustomer && selectedCustomer.fullName}
              >
                <div style={{ display: "flex" }}>
                  <strong>Tên khách hàng:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {selectedCustomer && selectedCustomer.fullName}
                  </p>
                </div>
              </Form.Item>
              <Form.Item
                name="phoneCus"
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
                name="customerAddress"
                initialValue={selectedOrder && selectedOrder.customerAddress}
              >
                <div style={{ display: "flex" }}>
                  <strong>Địa chỉ:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {selectedOrder && selectedOrder.customerAddress}
                  </p>
                </div>
              </Form.Item>
              <hr />
              <h3>Thông tin người bán:</h3>
              <hr />
              <Form.Item
                name="poID"
                initialValue={selectedPo && selectedPo.productownerID}
              >
                <div style={{ display: "flex" }}>
                  <strong>Mã người bán:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {selectedPo && selectedPo.productownerID}
                  </p>
                </div>
              </Form.Item>
              <Form.Item
                name="fullNamePo"
                initialValue={selectedPo && selectedPo.fullName}
              >
                <div style={{ display: "flex" }}>
                  <strong>Tên người mua:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {selectedPo && selectedPo.fullName}
                  </p>
                </div>
              </Form.Item>
              <Form.Item
                name="PoAddress"
                initialValue={selectedPo && selectedPo.address}
              >
                <div style={{ display: "flex" }}>
                  <strong>Địa chỉ:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {selectedPo && selectedPo.address}
                  </p>
                </div>
              </Form.Item>
              <hr />
              <h3>Thông tin đơn hàng:</h3>
              <hr />
              <Form.Item
                name="totalRentPriceProduct"
                initialValue={
                  selectedOrder && selectedOrder.totalRentPriceProduct
                }
              >
                <div style={{ display: "flex" }}>
                  <strong>Tổng tiền thuê:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {formatPriceWithVND(selectedOrder.totalRentPriceProduct)}
                  </p>
                </div>
              </Form.Item>
              <Form.Item
                name="shippingFee"
                initialValue={selectedOrder && selectedOrder.shippingFee}
              >
                <div style={{ display: "flex" }}>
                  <strong>Phí giao hàng:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {formatPriceWithVND(selectedOrder.shippingFee)}
                  </p>
                </div>
              </Form.Item>
              <Form.Item
                name="cocMoneyTotal"
                initialValue={selectedOrder && selectedOrder.cocMoneyTotal}
              >
                <div style={{ display: "flex" }}>
                  <strong>Tiền cọc:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {formatPriceWithVND(selectedOrder.cocMoneyTotal)}
                  </p>
                </div>
              </Form.Item>
              <Form.Item
                name="dateOrder"
                initialValue={selectedOrder && selectedOrder.dateOrder}
              >
                <div style={{ display: "flex" }}>
                  <strong>Ngày tạo đơn hàng:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {formatDate(selectedOrder.dateOrder)}
                  </p>
                </div>
              </Form.Item>
              <hr />
              <h3>Thông tin yêu cầu:</h3>
              <hr />
              <Form.Item
                name="createdDate"
                initialValue={selectedRequest && selectedRequest.createdDate}
              >
                <div style={{ display: "flex" }}>
                  <strong>Ngày tạo yêu cầu:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {formatDate(selectedRequest.createdDate)}
                  </p>
                </div>
              </Form.Item>
              <Form.Item
                name="expectedCost"
                initialValue={selectedRequest && selectedRequest.expectedCost}
              >
                <div style={{ display: "flex" }}>
                  <strong>Số tiền yêu cầu trừ cọc:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {formatPriceWithVND(selectedRequest.expectedCost)}
                  </p>
                </div>
              </Form.Item>
              <Form.Item
                name="description"
                initialValue={selectedRequest && selectedRequest.description}
              >
                <div style={{ display: "flex" }}>
                  <strong>Lí do:</strong>
                  <p style={{ marginLeft: "10px" }}>
                    {selectedRequest && selectedRequest.description}
                  </p>
                </div>
              </Form.Item>
            </div>
            <hr />
            <div style={{ width: "50%" }}>
              <hr />
              <h3>Hình ảnh sản phẩm:</h3>
              <hr />
              <Form.Item
                name="imgPoSend"
                initialValue={
                  selectedImgRequestPoSend && selectedImgRequestPoSend
                }
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <strong>Hình ảnh sản phẩm người bán gửi đi:</strong>
                  <div style={{ display: "flex" }}>
                    {selectedImgRequestPoSend &&
                      selectedImgRequestPoSend.map((imgUrl, index) => (
                        <div key={index} style={{ marginBottom: "10px" }}>
                          <Image width={150} src={imgUrl} />
                        </div>
                      ))}
                  </div>
                </div>
              </Form.Item>
              <Form.Item
                name="imgPoRecevied"
                initialValue={
                  selectedImgRequestPoReceived && selectedImgRequestPoReceived
                }
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <strong>Hình ảnh sản phẩm người bán nhận về:</strong>
                  <div style={{ display: "flex" }}>
                    {selectedImgRequestPoReceived &&
                      selectedImgRequestPoReceived.map((imgUrl, index) => (
                        <div key={index} style={{ marginBottom: "10px" }}>
                          <Image width={150} src={imgUrl} />
                        </div>
                      ))}
                  </div>
                </div>
              </Form.Item>
              <Form.Item
                name="imgCusRecevied"
                initialValue={
                  selectedImgRequestCusReceived && selectedImgRequestCusReceived
                }
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <strong>Hình ảnh sản phẩm khách hàng nhận hàng:</strong>
                  <div style={{ display: "flex" }}>
                    {selectedImgRequestCusReceived &&
                      selectedImgRequestCusReceived.map((imgUrl, index) => (
                        <div key={index} style={{ marginBottom: "10px" }}>
                          <Image width={150} src={imgUrl} />
                        </div>
                      ))}
                  </div>
                </div>
              </Form.Item>
              <Form.Item
                name="imgCusSend"
                initialValue={
                  selectedImgRequestCusSend && selectedImgRequestCusSend
                }
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <strong>Hình ảnh sản phẩm khách hàng trả hàng:</strong>
                  <div style={{ display: "flex" }}>
                    {selectedImgRequestCusSend &&
                      selectedImgRequestCusSend.map((imgUrl, index) => (
                        <div key={index} style={{ marginBottom: "10px" }}>
                          <Image width={150} src={imgUrl} />
                        </div>
                      ))}
                  </div>
                </div>
              </Form.Item>
            </div>
          </div>
        </Form>
      </Drawer>
      <>
        <Modal
          title="Lí do"
          open={isModalApproveOpen}
          onOk={handleOkApprove}
          onCancel={handleCancelApprove}
        >
          <Form.Item name={"descriptionApprove"}>
            <Input
              value={descriptionApproveValue}
              onChange={(e) => setdescriptionApproveValue(e.target.value)}
              placeholder="Nhập lí do"
            />
          </Form.Item>
        </Modal>
        <Modal
          title="Lí do"
          open={isModalNotApproveOpen}
          onOk={handleNotApprove}
          onCancel={handleCancelNotApprove}
        >
          <Form.Item name={"descriptionNotApprove"}>
            <Input
              value={descriptionNotApproveValue}
              onChange={(e) => setdescriptionNotApproveValue(e.target.value)}
              placeholder="Nhập lí do"
            />
          </Form.Item>
        </Modal>
      </>
    </div>
  );
};
export default RequestTable;
