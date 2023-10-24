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
  Space,
  Table,
} from "antd";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import RenderTag from "../render/RenderTag";

const data = [
  {
    key: "1",
    fullName: "John Brown",
    phone: 32,
    address: "New York No. 1 Lake Park",
    invoiceCode: "https://kenh14cdn.com/2017/photo-4-1488968670853.jpg",
    status: "Pending",
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
  },
  {
    key: "2",
    fullName: "Joe Black",
    phone: 42,
    address: "London No. 1 Lake Park",
    invoiceCode: "https://kenh14cdn.com/2017/photo-4-1488968670853.jpg",
    status: "Pending",
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
    setSelectedRecord(record);
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
      title: "Họ và Tên",
      dataIndex: "fullName",
      key: "fullName",
      // width: "20%",
      ...getColumnSearchProps("fullName"),
    },
    {
      title: <p style={{ textAlign: "center" }}>Số Điện Thoại</p>,
      dataIndex: "phone",
      key: "phone",
      // width: "10%",
      ...getColumnSearchProps("phone"),
      render: (number) => <p style={{ textAlign: "center" }}>{number}</p>,
    },
    {
      title: "Địa Chỉ",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
      // width: "25%",
    },
    // {
    //   title: <p style={{ textAlign: "center" }}>Hóa Đơn</p>,
    //   dataIndex: "invoiceCode",
    //   key: "invoiceCode",
    //   render: (text, record) => (
    //     <div style={{ display: "flex", justifyContent: "center" }}>
    //       <Image style={{ borderRadius: "10px" }} width={100} src={text} />
    //     </div>
    //   ),
    //   // width: "20%",
    // },

    {
      title: <p style={{ textAlign: "center" }}>Trạng Thái</p>,
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <RenderTag tagRender={status} />
        </div>
      ),
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
          <Button style={{ marginRight: "15px" }}>
            <CheckCircleTwoTone twoToneColor="#52c41a" />
          </Button>
          <Button>
            <CloseCircleTwoTone twoToneColor="#ff4d4f" />
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={data} />
      <Drawer
        title="Thông tin đơn hàng" // Customize the title as needed
        width={450} // Customize the width as needed
        onClose={() => setIsDrawerVisible(false)} // Close the Drawer when the close button is clicked
        open={isDrawerVisible} // Show the Drawer when isDrawerVisible is true
      >
        <Form form={form}>
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
