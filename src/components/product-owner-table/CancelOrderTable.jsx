import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Button, Drawer, Form, Input, Radio, Space, Table, Tag } from "antd";
import { EditTwoTone, DeleteFilled } from "@ant-design/icons";
import RenderTag from "../render/RenderTag";
import axios from "axios";
const CancelOrderTable = () => {
  const [users, setUsers] = useState();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [editingUser, setEditingUser] = useState(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  // const fetchUsers = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://134.209.111.144:8080/po/get-all-po"
  //     );
  //     const users = response.data.map((user) => ({
  //       ...user,
  //       roleName: user.accountDTO.roleDTO.roleName,
  //       email: user.accountDTO.email,
  //     }));
  //     setUsers(users);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // useEffect(() => {
  //   fetchUsers();
  // }, []);
  const [orderData, setOrderData] = useState([
    {
      orderID: 1,
      productID: 2,
      fullName: "Đặng Hoàng Tâm",
      phone: "098787767",
      date: "23/10/2023",
      address: "Land Mark 81",
      status: "Cancel",
      reason: "Tôi không muốn mua hàng nữa!",
    },
    {
      orderID: 2,
      productID: 4,
      fullName: "Bùi Đoàn Minh Đức",
      phone: "0985372187",
      date: "19/10/2023",
      address: "Vinhome Central Park",
      status: "Cancel",
      reason: "Tôi muốn thay đổi địa chỉ!",
    },
  ]);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const [form] = Form.useForm();
  const showEditDrawer = (record) => {
    setEditingUser(record);
    console.log(editingUser);
    setIsEdit(true);
    setIsDrawerVisible(true);
    form.setFieldsValue(record);
  };
  const onClose = () => {
    setIsDrawerVisible(false);
    setIsEdit(false);
    form.resetFields();
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
            Reset
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
      title: "Mã đơn",
      dataIndex: "orderID",
      key: "orderID",
      width: "5%",
      ...getColumnSearchProps("orderID"),
      render: (number) => (
        <p style={{ textAlign: "center" }}>{Number(number)}</p>
      ),
    },
    {
      title: "Mã sản phẩm",
      dataIndex: "productID",
      key: "productID",
      width: "5%",
      ...getColumnSearchProps("productID"),
      render: (number) => (
        <p style={{ textAlign: "center" }}>{Number(number)}</p>
      ),
    },
    {
      title: "Người mua",
      dataIndex: "fullName",
      key: "fullName",
      width: "10%",
      ...getColumnSearchProps("fullName"),
      render: (text) => <p style={{ textAlign: "center" }}>{text}</p>,
    },
    {
      title: "SĐT",
      dataIndex: "phone",
      key: "phone",
      width: "10%",
      ...getColumnSearchProps("phone"),
      render: (text) => <p style={{ textAlign: "center" }}>{text}</p>,
    },
    {
      title: "Thời gian",
      dataIndex: "date",
      key: "date",
      width: "10%",
      ...getColumnSearchProps("date"),
      render: (text) => <p style={{ textAlign: "center" }}>{text}</p>,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      width: "10%",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
      render: (text) => <p style={{ textAlign: "center" }}>{text}</p>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: "10%",
      ...getColumnSearchProps("status"),
      render: (status) => (
        <p style={{ textAlign: "center" }}>
          <RenderTag tagRender={status} />
        </p>
      ),
    },
    {
      title: "Lí do",
      dataIndex: "reason",
      key: "reason",
      width: "10%",
      ...getColumnSearchProps("reason"),
      render: (text) => <p style={{ textAlign: "center" }}>{text}</p>,
    },
    {
      title: "",
      key: "action",
      align: "left",
      width: "5%",
      render: (_, record) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {/* <Button
            style={{ marginRight: "15px" }}
            onClick={() => showEditDrawer(record)}
          >
            <EditTwoTone />
          </Button> */}
          <Button danger>
            <DeleteFilled />
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={orderData} />
      {/* <Drawer
        title={"Đơn hàng"}
        visible={isDrawerVisible}
        onClose={onClose}
        width={400}
      >
        <Form form={form}>
          <Form.Item
            name="fullName"
            label="Người mua"
            rules={[
              { required: true, message: "Xin vui lòng nhập Họ và Tên!" },
              {
                pattern: /^[^\d]+$/,
                message: "Không được nhập số!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="SĐT"
            rules={[
              { required: true, message: "Xin vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="date"
            label="Thời gian"
            rules={[{ required: true, message: "Xin vui lòng nhập email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true, message: "Xin vui lòng nhập địa chỉ!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="status"
            label="Trạng thái hoạt động"
            rules={[
              { required: true, message: "Cập nhật trạng thái hoạt động!" },
            ]}
          >
            <Radio.Group>
              <Radio value={true}>Đang hoạt động</Radio>
              <Radio value={false}>Không hoạt động</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            
            <Button
              type="primary"
            
              style={{
                backgroundColor: "red",
                color: "#fff",
                width: "100%",
                
              }}
              danger
            >
             Xoá
            </Button>
          </Form.Item>
        </Form>
      </Drawer> */}
    </div>
  );
};
export default CancelOrderTable;
