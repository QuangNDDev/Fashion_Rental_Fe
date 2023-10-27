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

const data = [
  {
    key: "1",
    fullName: "John Brown",
    phone: 32,
    address: "New York No. 1 Lake Park",
    invoiceCode: "https://kenh14cdn.com/2017/photo-4-1488968670853.jpg",
    status: "Approve",
    detailImg: {
      images: [
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=2069&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1529025530948-67e8a5c69b58?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1529025530948-67e8a5c69b58?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1691480288782-142b953cf664?auto=format&fit=crop&q=80&w=2080&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1691480288782-142b953cf664?auto=format&fit=crop&q=80&w=2080&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1691480288782-142b953cf664?auto=format&fit=crop&q=80&w=2080&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1691480288782-142b953cf664?auto=format&fit=crop&q=80&w=2080&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1691480288782-142b953cf664?auto=format&fit=crop&q=80&w=2080&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
    },
    fullName: "Tui LV",
  },
  {
    key: "2",
    fullName: "Joe Black",
    phone: 42,
    address: "London No. 1 Lake Park",
    invoiceCode: "https://kenh14cdn.com/2017/photo-4-1488968670853.jpg",
    status: "Approve",
    detailImg: {
      images: [
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=2069&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1529025530948-67e8a5c69b58?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1529025530948-67e8a5c69b58?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1529025530948-67e8a5c69b58?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1529025530948-67e8a5c69b58?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1529025530948-67e8a5c69b58?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1529025530948-67e8a5c69b58?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1529025530948-67e8a5c69b58?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
    },
    fullName: "Tui LV",
  },
  {
    key: "3",
    fullName: "Jim Green",
    phone: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    fullName: "Jim Red",
    phone: 32,
    address: "London No. 2 Lake Park",
  },
];
const TableAccept = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [form] = Form.useForm();
  const [requestsData, setRequestsData] = useState([]);
  const idStaff = localStorage.getItem("staffId");

  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        "http://fashionrental.online:8080/staffrequested/approved/" + idStaff
      );

      const updatedRequests = response.data.map((request) => ({
        ...request,
        requestAddingProductID:
          request.requestAddingProductDTO.requestAddingProductID,
        status: request.requestAddingProductDTO.status,
        description: request.requestAddingProductDTO.description,
      }));
      setRequestsData(updatedRequests);
      console.log(updatedRequests);

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
      // width: "10%",
      ...getColumnSearchProps("createDate"),
      render: (text) => <p style={{ textAlign: "left" }}>{text}</p>,
    },
    {
      title: "Trạng thái",
      dataIndex: "requestStatus",
      key: "requestStatus",
      render: (status) => (
        <p style={{ textAlign: "center", justifyContent: "center" }}>
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
    // {
    //   title: "Ảnh chi tiết",
    //   dataIndex: "detailImg",
    //   key: "detailImg",

    //   render: (detailImg, record) => {
    //     if (!detailImg || !detailImg.images) {
    //       return null;
    //     }

    //     return (
    //       <div style={{ display: "flex" }}>
    //         <MuntilImage images={detailImg.images} />
    //       </div>
    //     );
    //   },
    //   width: "30%",
    // },
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

          <Form.Item name="price">
            <span>Giá Sản Phẩm: </span>
            <strong style={{ marginLeft: "10px" }}>
              {selectedRecord?.price}vnđ
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

          <Form.Item name="forRent">
            <span>Hình Thức Thuê: </span>
            <strong style={{ marginLeft: "10px" }}>
              {selectedRecord?.forRent ? "Có" : "Không"}
            </strong>
          </Form.Item>

          <Form.Item name="forSale">
            <span>Hình Thức Bán: </span>
            <strong style={{ marginLeft: "10px" }}>
              {selectedRecord?.forSale ? "Có" : "Không"}
            </strong>
          </Form.Item>

          <Form.Item name="categoryName">
            <span>Phân Loại: </span>
            <strong style={{ marginLeft: "10px" }}>
              {selectedRecord?.category.categoryName}
            </strong>
          </Form.Item>

          <p style={{ marginBottom: "10px" }}>Ảnh Hóa Đơn:</p>
          <Form.Item name="invoiceCode">
            {selectedRecord?.invoiceCode && (
              <Image
                style={{ borderRadius: "10px" }}
                width={300}
                src={selectedRecord.invoiceCode}
              />
            )}
          </Form.Item>
        </Form>
        {/* Customize the content of the Drawer using selectedRecord */}
        <Form.Item name={"detailImg"} label="Ảnh Chi Tiết Sản Phẩm">
          {selectedRecord?.detailImg?.images && (
            <Carousel autoplay>
              {selectedRecord.detailImg.images.map((image, index) => (
                <div key={index}>
                  <img
                    style={{ width: "100%", height: "200px" }}
                    src={image}
                    alt={`Image ${index}`}
                  />
                </div>
              ))}
            </Carousel>
          )}
        </Form.Item>

        {/* Add more details as needed */}
      </Drawer>
    </div>
  );
};
export default TableAccept;
