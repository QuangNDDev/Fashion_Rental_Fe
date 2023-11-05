import {
  CheckCircleTwoTone,
  EyeTwoTone,
  SearchOutlined,
  CloseCircleTwoTone,
} from "@ant-design/icons";
import {
  Button,
  Carousel,
  Drawer,
  Form,
  Image,
  Input,
  Modal,
  Space,
  Table,
  notification,
} from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import RenderTag from "../render/RenderTag";

const TablePending = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [form] = Form.useForm();
  const [requestsData, setRequestsData] = useState();
  const [isCustomModalVisible, setIsCustomModalVisible] = useState(false);
  const [productImage, setProductImage] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [descriptionRequest, setDescriptionRequest] = useState("");
  const [descriptionReject, setDescriptionReject] = useState("");
  const staffId = localStorage.getItem("staffId");
  const [isModalVisibleNotApprove, setIsModalVisibleNotApprove] =
    useState(false);
  const [api, contextHolder] = notification.useNotification();

  function formatDate(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    const [month, day, year] = formattedDate.split("/");
    return `${day}/ ${month}/ ${year}`;
  }

  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        "http://fashionrental.online:8080/request/getapproving"
      );
      setRequestsData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  const showDrawer = (record) => {
    console.log(record);
    const fetchProductImg = async () => {
      try {
        const response = await axios.get(
          "http://fashionrental.online:8080/productimg?productID=" +
            record.productID
        );
        const imgUrlArray = response.data.map((item) => item.imgUrl);
        setProductImage(imgUrlArray);
        console.log(imgUrlArray);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductImg();
    axios
      .get("http://fashionrental.online:8080/product/" + record.productID)
      .then((response) => {
        console.log(response.data);
        form.setFieldsValue(response.data);
        setSelectedRecord(response.data);
        setIsDrawerVisible(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };
  //Modal duyet
  const showModalApprove = (record) => {
    setIsModalVisible(true);
    localStorage.setItem(
      "requestAddingProductID",
      record.requestAddingProductID
    );
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  //-----------------------------
  const handleOk = async (record) => {
    console.log(record.requestAddingProductID);
    try {
      const response = await axios.put(
        `http://fashionrental.online:8080/request?description=` +
          descriptionRequest +
          `&requestID=` +
          localStorage.getItem("requestAddingProductID") +
          `&status=APPROVED`
      );
     if(response){
      try {
        const staffRequest = await axios.post(
          "http://fashionrental.online:8080/staffrequested?requestAddingProductID=" +
            response.data.requestAddingProductID +
            "&staffID=" +
            staffId
        );
        api["success"]({
          message: "Duyệt Sản Phẩm Thành Công!",
          description: null,
        });
        console.log("update request staff success", staffRequest.data);
      } catch (error) {
        api["error"]({
          message: "Duyệt Sản Phẩm Thất Bại!",
          description: null,
        });
        console.error("Validation failed", error);
      }
      try {
        const productStatus = await axios.put(
          `http://fashionrental.online:8080/product/update/}?productID=` +
            record.productID +
            `&status=AVAILABLE`
        );
        console.log("update product success", productStatus.data);
      } catch (error) {
        console.error("Validation failed", error);
      }
     }
      setIsModalVisible(false);
      fetchRequests();
    } catch (error) {
      console.log(error);
    }
  };

  //Modal Huy
  const showModalNotApprove = (record) => {
    setIsModalVisibleNotApprove(true);
    localStorage.setItem(
      "requestAddingProductID",
      record.requestAddingProductID
    );
  };
  const handleCancelNotApprove = () => {
    setIsModalVisibleNotApprove(false);
  };
  const handleSend = async (record) => {
    try {
      const response = await axios.put(
        `http://fashionrental.online:8080/request?description=` +
          descriptionReject +
          `&requestID=` +
          localStorage.getItem("requestAddingProductID") +
          `&status=NOT_APPROVED`
      );
      try {
        const staffRequest = await axios.post(
          "http://fashionrental.online:8080/staffrequested?requestAddingProductID=" +
            response.data.requestAddingProductID +
            "&staffID=" +
            staffId
        );
        api["success"]({
          message: "Từ Chối Sản Phẩm Thành Công!",
          description: null,
        });
        console.log("update request staff success", staffRequest.data);
      } catch (error) {
        api["error"]({
          message: "Từ Chối Sản Phẩm Thất Bại!",
          description: null,
        });
        console.error("Validation failed", error);
      }
      try {
        const productStatus = await axios.put(
          `http://fashionrental.online:8080/product/update/}?productID=` +
            record.productID +
            `&status=BLOCKED`
        );
        console.log("update product success", productStatus.data);
      } catch (error) {
        console.error("Validation failed", error);
      }
      setIsModalVisibleNotApprove(false);
      fetchRequests();
    } catch (error) {
      console.log(error);
    }
  };

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
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
          placeholder={`Search ${dataIndex}`}
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
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
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
  const columns = [
    {
      title: "ID",
      dataIndex: "requestAddingProductID",
      key: "requestAddingProductID",
      // width: "20%",
      ...getColumnSearchProps("requestAddingProductID"),
      render: (number) => <p style={{ textAlign: "left" }}>{Number(number)}</p>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
      key: "createdDate",
      ...getColumnSearchProps("createdDate"),
      render: (text) => <p style={{ textAlign: "left" }}>{formatDate(text)}</p>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <p style={{ textAlign: "left", justifyContent: "left" }}>
          <RenderTag tagRender={status} />
        </p>
      ),
    },

    {
      title: <p style={{ textAlign: "center" }}>Hành Động</p>,
      key: "action",

      // width: "10%",
      render: (_, record) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            style={{ marginRight: "15px" }}
            onClick={() => showDrawer(record)}
          >
            <EyeTwoTone />
            Xem Đơn
          </Button>
          <Button
            style={{ marginRight: "15px" }}
            onClick={() => showModalApprove(record)}
          >
            <CheckCircleTwoTone twoToneColor="#52c41a" />
          </Button>
          <Button onClick={() => showModalNotApprove(record)}>
            <CloseCircleTwoTone twoToneColor="#ff4d4f" />
          </Button>
          <Modal
            title="Duyệt Sản Phẩm"
            open={isModalVisible}
            onCancel={handleCancel}
            footer={null}
            
          >
            <Form form={form}>
              <p>Lý Do Duyệt:</p>
              <Form.Item
                name="descriptionRequest"
                onChange={(e) => setDescriptionRequest(e.target.value)}
              >
                <Input />
              </Form.Item>
              <Form.Item style={{ textAlign: "center" }}>
                <Button
                  type="primary"
                  style={{ backgroundColor: "red" }}
                  onClick={handleCancel}
                >
                  Hủy
                </Button>
                <Button
                  type="primary"
                  style={{ backgroundColor: "#008000", marginLeft: "20px" }}
                  onClick={() => handleOk(record)}
                >
                  Duyệt
                </Button>
              </Form.Item>
            </Form>
          </Modal>
          <Modal
            title="Từ Chối Sản Phẩm"
            open={isModalVisibleNotApprove}
            onOk={handleSend}
            onCancel={handleCancelNotApprove}
            footer={null}
          >
            <Form form={form}>
              <p>Lý Do Từ Chối:</p>
              <Form.Item
                name="descriptionNotApprove"
                onChange={(e) => setDescriptionReject(e.target.value)}
              >
                <Input />
              </Form.Item>
              <Form.Item style={{ textAlign: "center" }}>
                <Button
                  type="primary"
                  style={{ backgroundColor: "red" }}
                  onClick={handleCancelNotApprove}
                >
                  Hủy
                </Button>
                <Button
                  type="primary"
                  style={{ backgroundColor: "#008000", marginLeft: "20px" }}
                  onClick={() => handleSend(record)}
                >
                  Gửi
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={requestsData} />
      {contextHolder}
      <Drawer
        title="Thông tin đơn hàng " // Customize the title as needed
        width={450} // Customize the width as needed
        onClose={() => setIsDrawerVisible(false)} // Close the Drawer when the close button is clicked
        open={isDrawerVisible} // Show the Drawer when isDrawerVisible is true
      >
        <Form form={form}>
          <Form.Item name="productName">
            <span>Tên Sản Phẩm: </span>
            <strong style={{ marginLeft: "10px" }}>
              {selectedRecord?.productName}
            </strong>
            {/* <Input value={selectedRecord?.productName} readOnly /> */}
          </Form.Item>
          <Form.Item name="description">
            <span>Mô Tả: </span>
            <strong style={{ marginLeft: "10px" }}>
              {selectedRecord?.description}
            </strong>
            {/* <Input value={selectedRecord?.productName} readOnly /> */}
          </Form.Item>

          <Form.Item name="productCondition">
            <span>Tình Trạng Sản Phẩm: </span>
            <strong style={{ marginLeft: "10px" }}>
              {selectedRecord?.productCondition}
            </strong>
            {/* <Input value={selectedRecord?.productName} readOnly /> */}
          </Form.Item>

          <Form.Item name="price">
            <span>Giá Sản Phẩm: </span>
            <strong style={{ marginLeft: "10px" }}>
              {selectedRecord?.price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </strong>
            {/* <Input value={selectedRecord?.productName} readOnly /> */}
          </Form.Item>

          <Form.Item name="status">
            <span>Trạng Thái Sản Phẩm: </span>
            <strong style={{ marginLeft: "10px" }}>
              <RenderTag tagRender={selectedRecord?.status} />
            </strong>
            {/* <Input value={selectedRecord?.productName} readOnly /> */}
          </Form.Item>

          <Form.Item name="checkType">
            <span>Hình Thức Sản Phẩm: </span>
            <strong style={{ marginLeft: "10px" }}>
              <RenderTag tagRender={selectedRecord?.checkType} />
            </strong>
          </Form.Item>

          <Form.Item name="categoryName">
            <span>Phân Loại: </span>
            <strong style={{ marginLeft: "10px" }}>
              {selectedRecord?.category.categoryName}
            </strong>
          </Form.Item>
          <p style={{ marginBottom: "10px" }}>Ảnh Hóa Đơn:</p>
          <Form.Item name="productReceiptUrl">
            {selectedRecord?.productReceiptUrl && (
              <Image
                style={{ borderRadius: "10px" }}
                width={300}
                src={selectedRecord.productReceiptUrl}
              />
            )}
          </Form.Item>
          <p style={{ marginBottom: "10px" }}>Ảnh Chi Tiết Sản Phẩm:</p>
          <Form.Item name="detailImg">
            {productImage && productImage.length > 0 ? (
              <Carousel autoplay>
                {productImage.map((image, index) => (
                  <div key={index}>
                    <Image.PreviewGroup>
                      <Image
                        style={{
                          width: "100%",
                          height: "200px",
                          cursor: "pointer",
                        }}
                        src={image}
                        alt={`Image ${index}`}
                      />
                    </Image.PreviewGroup>
                  </div>
                ))}
              </Carousel>
            ) : (
              <div>No images available</div>
            )}
          </Form.Item>
        </Form>
        {/* Customize the content of the Drawer using selectedRecord */}

        {/* Add more details as needed */}
      </Drawer>
    </div>
  );
};
export default TablePending;
