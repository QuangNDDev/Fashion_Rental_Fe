import { EyeTwoTone, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Carousel,
  Drawer,
  Form,
  Image,
  Input,
  Space,
  Table,
} from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import RenderTag from "../render/RenderTag";

const RejectTable = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [form] = Form.useForm();
  const [requestsData, setRequestsData] = useState([]);
  const idStaff = localStorage.getItem("staffId");
  const [productImage, setProductImage] = useState();

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
        "http://fashionrental.online:8080/staffrequested/notapproved/" + idStaff
      );

      setRequestsData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  {
    previewImage && (
      <div className="image-preview">
        <img
          src={previewImage}
          alt="Xem Trước"
          onClick={() => setPreviewImage(null)} // Khi nhấp vào xem trước, đóng cửa sổ xem trước
        />
      </div>
    );
  }

  const showDrawer = (record) => {
    console.log(record);

    axios
      .get("http://fashionrental.online:8080/product/" + record.productID)
      .then((response) => {
        console.log(response.data);
        form.setFieldsValue(response.data);
        setSelectedRecord(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    setIsDrawerVisible(true);

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
      console.log(selectedRecord?.checkType);
    };

    fetchProductImg();
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
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
      dataIndex: "staffRequestedID",
      key: "staffRequestedID",
      // width: "20%",
      ...getColumnSearchProps("staffRequestedID"),
      render: (number) => <p style={{ textAlign: "left" }}>{Number(number)}</p>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createDate",
      key: "createDate",
      ...getColumnSearchProps("createDate"),
      render: (text) => <p style={{ textAlign: "left" }}>{formatDate(text)}</p>,
    },
    {
      title: "Ngày từ chối",
      dataIndex: "updateDate",
      key: "updateDate",
      ...getColumnSearchProps("updateDate"),
      render: (text) => <p style={{ textAlign: "left" }}>{formatDate(text)}</p>,
    },
    {
      title: "Trạng thái",
      dataIndex: "requestStatus",
      key: "requestStatus",
      render: (status) => (
        <p style={{ textAlign: "left", justifyContent: "left" }}>
          <RenderTag tagRender={status} />
        </p>
      ),
    },
    {
      title: "Lí do",
      dataIndex: "description",
      key: "description",
      render: (description) => <p>{description}</p>,
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
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={requestsData} />
      <Drawer
        title="Thông tin đơn hàng" // Customize the title as needed
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
              {selectedRecord?.status}
            </strong>
            {/* <Input value={selectedRecord?.productName} readOnly /> */}
          </Form.Item>

          <Form.Item name="checkType">
            <span>Hình Thức Sản Phẩm: </span>
            <strong style={{ marginLeft: "10px" }}>
              {selectedRecord?.checkType}
            </strong>
          </Form.Item>

          <Form.Item name="categoryName">
            <span>Phân Loại: </span>
            <strong style={{ marginLeft: "10px" }}>
              {selectedRecord?.category.categoryName}
            </strong>
          </Form.Item>

          <p style={{ marginBottom: "3px" }}>Ảnh Hóa Đơn:</p>
          <Form.Item name="productReceiptUrl">
            {selectedRecord?.productReceiptUrl && (
              <Image
                style={{ borderRadius: "10px" }}
                width={200}
                src={selectedRecord.productReceiptUrl}
              />
            )}
          </Form.Item>
        </Form>
        {/* Customize the content of the Drawer using selectedRecord */}
        <p style={{ marginBottom: "10px" }}>Ảnh Chi Tiết Sản Phảm:</p>
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

        {/* Add more details as needed */}
      </Drawer>
    </div>
  );
};
export default RejectTable;
