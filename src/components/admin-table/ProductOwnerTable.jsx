import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Button, Drawer, Form, Input, Radio, Space, Table, Tag } from "antd";
import { EditTwoTone, DeleteFilled } from "@ant-design/icons";
import RenderTag from "../render-tag/RenderTag";
import axios from "axios";
const ProductOwnerTable = () => {
  const [users, setUsers] = useState();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [editingUser, setEditingUser] = useState(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://134.209.111.144:8080/po/get-all-po"
      );
      const users = response.data.map((user) => ({
        ...user,
        roleName: user.accountDTO.roleDTO.roleName,
        email: user.accountDTO.email,
      }));
      setUsers(users);
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
  const editUser = async () => {
    form.validateFields().then((values) => {
      const editData = {
        address: values.address,
        avatarUrl: values.avatarUrl,
        fullName: values.fullName,
        phone: values.phone,
        status: values.status,
      };
      console.log(editData);

      try {
        axios
          .put(
            `http://134.209.111.144:8080/po?productownerID=` +
              editingUser.productownerID,
            editData
          )
          .then((response) => {
            console.log(response);
          });
      } catch (error) {
        console.log(error);
      }

      const updatedUsers = users.map((user) =>
        user === editingUser ? { ...user, ...values } : user
      );
      setUsers(updatedUsers);
      onClose();
    });
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
        <p style={{ textAlign: "center", marginBottom: "50px" }}>
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
        <p style={{ textAlign: "center", marginBottom: "50px" }}>
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
          <Button
            style={{ marginRight: "15px" }}
            onClick={() => showEditDrawer(record)}
          >
            <EditTwoTone />
          </Button>
          <Button danger>
            <DeleteFilled />
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={users} />
      <Drawer
        title={isEdit ? "Cập Nhật" : "Add User"}
        visible={isDrawerVisible}
        onClose={onClose}
        width={400}
      >
        <Form form={form}>
          <Form.Item
            name="fullName"
            label="Họ và tên"
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
            name="email"
            label="Email"
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
            <Button type="primary" onClick={isEdit ? editUser : addUser}>
              {isEdit ? "Update" : "Add"}
            </Button>
          </Form.Item>
          <Form.Item name="roleID">
            <Input style={{ display: "none" }} />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};
export default ProductOwnerTable;