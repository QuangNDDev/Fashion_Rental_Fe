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
const ProductOwnerTable = () => {
  const [users, setUsers] = useState();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [editingUser, setEditingUser] = useState(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://fashionrental.online:8080/po/get-all-po"
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
  const editUser = async () => {
    try {
      const values = await form.validateFields();

      const spacefullName = values.fullName.trim();
      const spaceEmail = values.email.trim();
      const spacePhone = values.phone.trim();
      const spaceAddress = values.address.trim();

      if (!spacefullName || !spaceEmail || !spacePhone || !spaceAddress) {
        notification.error({
          message: "Cập Nhật Thất Bại",
          description:
            "Tên, Email, Số điện thoại và Địa chỉ không được để trống hoặc chỉ chứa khoảng trắng!",
        });
        return;
      }

      const editData = {
        address: spaceAddress,
        avatarUrl: values.avatarUrl,
        fullName: spacefullName,
        phone: spacePhone,
        status: values.status,
      };

      console.log(editData);

      const response = await axios.put(
        `http://134.209.111.144:8080/po?productownerID=` +
          editingUser.productownerID,
        editData
      );

      api["success"]({
        message: "Cập Nhật Thành Công",
        description: null,
      });

      const updatedUsers = users.map((user) =>
        user === editingUser ? { ...user, ...values } : user
      );
      setUsers(updatedUsers);
      onClose();
    } catch (error) {
      api["error"]({
        message: "Cập Nhật Thất Bại",
        description:
          "Tên, Email, Số điện thoại và Địa chỉ không được để trống hoặc chỉ chứa khoảng trắng!",
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
      dataIndex: "productownerID",
      key: "productownerID",
      width: "1%",
      ...getColumnSearchProps("productownerID"),
      render: (number) => <p style={{ textAlign: "left" }}>{Number(number)}</p>,
    },
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      key: "fullName",
      width: "10%",
      ...getColumnSearchProps("fullName"),
      render: (text) => <p style={{ textAlign: "left" }}>{text}</p>,
    },
    {
      title: "Vai trò",
      dataIndex: "roleName",
      key: "roleName",
      width: "10%",
      render: (roleName) => (
        <p style={{ textAlign: "left", marginBottom: "20px" }}>
          <RenderTag tagRender={roleName} />
        </p>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: "10%",
      ...getColumnSearchProps("status"),
      render: (status) => (
        <p style={{ textAlign: "left", marginBottom: "20px" }}>
          <RenderTag tagRender={status} />
        </p>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "10%",
      ...getColumnSearchProps("email"),
      render: (text) => <p style={{ textAlign: "left" }}>{text}</p>,
    },
    {
      title: "SĐT",
      dataIndex: "phone",
      key: "phone",
      width: "10%",
      ...getColumnSearchProps("phone"),
      render: (text) => <p style={{ textAlign: "left" }}>{text}</p>,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      width: "15%",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
      render: (text) => <p style={{ textAlign: "left" }}>{text}</p>,
    },
    {
      title: "",
      key: "action",
      align: "left",
      width: "10%",
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
      <Table bordered={true} columns={columns} dataSource={users} />
      {contextHolder}
      <Drawer
        title={isEdit ? "Cập Nhật" : "Add User"}
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
              Button: {
                colorPrimary: "rgb(32, 30, 42)",
                colorPrimaryHover: "orange",
                colorPrimaryActive: "orange",
              },
            },
          }}
        >
          <Form form={form}>
            <p style={{ fontWeight: "bold" }}>Họ và tên:</p>
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
              <Input type="number" />
            </Form.Item>
            <p style={{ fontWeight: "bold" }}>Email:</p>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Xin vui lòng nhập email!",
                },
                {
                  type: "email",
                  message: "Email không hợp lệ. Vui lòng kiểm tra lại!",
                },
              ]}
            >
              <Input placeholder="email" />
            </Form.Item>
            <p style={{ fontWeight: "bold" }}>Địa Chỉ:</p>
            <Form.Item
              name="address"
              rules={[
                { required: true, message: "Xin vui lòng nhập địa chỉ!" },
              ]}
            >
              <Input placeholder="địa chỉ" />
            </Form.Item>
            <p style={{ marginBottom: "10px", fontWeight: "bold" }}>
              Trạng Thái Hoạt Động:
            </p>
            <Form.Item
              name="status"
              rules={[
                { required: true, message: "Cập nhật trạng thái hoạt động!" },
              ]}
            >
              <Radio.Group>
                <Radio style={{ marginLeft: "50px" }} value={true}>
                  Đang hoạt động
                </Radio>
                <Radio value={false}>Không hoạt động</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                onClick={isEdit ? editUser : addUser}
                style={{
                  color: "#fff",
                  width: "100%",
                }}
              >
                {isEdit ? "Cập Nhật" : "Cập Nhật"}
              </Button>
            </Form.Item>
            <Form.Item name="roleID">
              <Input style={{ display: "none" }} />
            </Form.Item>
          </Form>
        </ConfigProvider>
      </Drawer>
    </div>
  );
};
export default ProductOwnerTable;
