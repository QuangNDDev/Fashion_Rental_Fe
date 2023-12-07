import { DeleteFilled, EditTwoTone, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Drawer,
  Form,
  Input,
  Radio,
  Space,
  Table,
  notification,
} from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import RenderTag from "../render/RenderTag";

const CustomerTable = () => {
  const [users, setUsers] = useState();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [editingUser, setEditingUser] = useState(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();

  const emailValidator = (rule, value, callback) => {
    const trimmedValue = value.trim(); // Cắt giảm giá trị đầu vào
    if (!trimmedValue) {
      callback("Vui lòng nhập địa chỉ email!");
    } else if (
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(trimmedValue)
    ) {
      callback("Vui lòng nhập địa chỉ email phù hợp!");
    } else {
      callback();
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://fashionrental.online:8080/customer/get-all-customer"
      );
      const updatedUsers = response.data.map((user) => ({
        ...user,
        status: user.accountDTO.status,
        email: user.accountDTO.email,
        roleName: user.accountDTO.roleDTO.roleName,
      }));
      setUsers(updatedUsers);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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

  const showEditDrawer = (record) => {
    setEditingUser(record);
    setIsEdit(true);
    setIsDrawerVisible(true);
    form.setFieldsValue(record);
  };

  const onClose = () => {
    setIsDrawerVisible(false);
    setIsEdit(false);
    form.resetFields();
  };

  const editUser = async () => {
    try {
      const values = await form.validateFields();
      const spacefullName = values.fullName.trim();
      const spaceEmail = values.email.trim();
      const spacePhone = values.phone.trim();

      if (!spacefullName || !spaceEmail || !spacePhone) {
        notification.error({
          message: "Cập Nhật Thất Bại",
          description:
            "Tên, Email và Số điện thoại không được để trống hoặc chỉ chứa khoảng trắng!",
        });
        return;
      }

      const editData = {
        avatarUrl: values.avatarUrl,
        fullName: values.fullName,
        phone: values.phone,
        status: values.status,
        email: values.email,
      };

      const response = await axios.put(
        `http://134.209.111.144:8080/customer?customerID=${editingUser.customerID}`,
        editData
      );

      api["success"]({
        message: "Cập Nhật Thành Công!",
        description: null,
      });

      const updatedUsers = users.map((user) =>
        user === editingUser ? { ...user, ...values } : user
      );
      setUsers(updatedUsers);
      onClose();
    } catch (error) {
      api["error"]({
        message: "Cập Nhật Thất Bại!",
        description: null,
      });
      console.log(error);
    }
  };

  const addUser = () => {
    form.validateFields().then((values) => {
      setUsers([...users, values]);
      onClose();
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "customerID",
      key: "customerID",

      ...getColumnSearchProps("customerID"),
      render: (number) => <p style={{ textAlign: "left" }}>{Number(number)}</p>,
    },
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      key: "fullName",

      ...getColumnSearchProps("fullName"),
      render: (text) => <p style={{ textAlign: "left" }}>{text}</p>,
    },
    {
      title: "Vai trò",
      dataIndex: "roleName",
      key: "roleName",

      ...getColumnSearchProps("roleName"),
      render: (roleName) => (
        <p style={{ textAlign: "left", justifyContent: "left" }}>
          <RenderTag tagRender={roleName} />
        </p>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",

      render: (status) => (
        <p style={{ textAlign: "left" }}>
          <RenderTag tagRender={status} />
        </p>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",

      ...getColumnSearchProps("email"),
    },
    {
      title: "SĐT",
      dataIndex: "phone",
      key: "phone",

      ...getColumnSearchProps("phone"),
      render: (text) => <p style={{ textAlign: "left" }}>{text}</p>,
    },
    {
      title: "",
      key: "action",
      align: "left",

      render: (_, record) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ConfigProvider
            theme={{
              token: {
                Button: {
                  colorPrimaryHover: "rgb(32, 30, 42)",
                },
              },
            }}
          >
            <Button
              style={{ marginRight: "15px" }}
              onClick={() => showEditDrawer(record)}
            >
              <EditTwoTone twoToneColor={"rgb(32, 30, 42)"} />
            </Button>
            <Button danger>
              <DeleteFilled />
            </Button>
          </ConfigProvider>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table responsive bordered={true} columns={columns} dataSource={users} />
      {contextHolder}
      <Drawer
        title={isEdit ? "Cập Nhật Thông Tin Khách Hàng" : "Add User"}
        open={isDrawerVisible}
        onClose={onClose}
        width={400}
      >
        <ConfigProvider
          theme={{
            token: {
              Input: {
                activeBorderColor: "rgb(32, 30, 42)",
                hoverBorderColor: "rgb(32, 30, 42)",
              },
              Radio: {
                colorPrimary: "rgb(32, 30, 42)",
              },
            },
          }}
        >
          <Form form={form}>
            <p style={{ fontWeight: "bold" }}>Họ và Tên:</p>
            <Form.Item
              name="fullName"
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
            <p style={{ fontWeight: "bold" }}>Số Điện Thoại:</p>
            <Form.Item
              name="phone"
              rules={[
                { required: true, message: "Xin vui lòng nhập số điện thoại!" },
              ]}
            >
              <Input />
            </Form.Item>
            <p style={{ fontWeight: "bold" }}>Email:</p>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Xin vui lòng nhập email!" },
                { validator: emailValidator },
              ]}
            >
              <Input />
            </Form.Item>
            <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
              Trạng Thái Hoạt Động:
            </p>
            <Form.Item
              name="status"
              rules={[
                { required: true, message: "Cập nhật trạng thái hoạt động!" },
              ]}
            >
              <Radio.Group>
                <Radio style={{ marginLeft: "50px" }} value={"VERIFIED"||"NOT_VERIFIED"}>
                  Đang hoạt động
                </Radio>
                <Radio value={"BLOCKED"}>Không hoạt động</Radio>
              </Radio.Group>
            </Form.Item>
            <br />

            <Form.Item>
              <Button
                type="primary"
                onClick={isEdit ? editUser : addUser}
                style={{
                  backgroundColor: "rgb(32, 30, 42)",
                  color: "#fff",
                  width: "100%",
                }}
              >
                {isEdit ? "Cập Nhật" : "Add"}
              </Button>
            </Form.Item>
            <Form.Item name="roleID">
              <Input style={{ display: "none" }} />
            </Form.Item>
            <br />
          </Form>
        </ConfigProvider>
      </Drawer>
    </div>
  );
};

export default CustomerTable;
