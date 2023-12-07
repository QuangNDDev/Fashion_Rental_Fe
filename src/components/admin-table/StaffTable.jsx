import { DeleteOutlined, EditTwoTone, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Drawer,
  Form,
  Input,
  Radio,
  Space,
  Table,
  message,
  notification,
} from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { v4 } from "uuid";
import RenderTag from "../render/RenderTag";
const StaffTable = () => {
  const [users, setUsers] = useState();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [editingUser, setEditingUser] = useState(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const emailValidator = (rule, value, callback) => {
    if (value && !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      callback("Vui lòng nhập địa chỉ email phù hợp!");
    } else {
      callback();
    }
  };
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://fashionrental.online:8080/staff/getstaffs"
      );
      const users = response.data.map((user) => ({
        ...user,
        roleName: user.accountDTO.roleDTO.roleName,
        email: user.accountDTO.email,
        status: user.accountDTO.status,
        accountID: user.accountDTO.accountID,
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
    setIsEdit(true);
    setIsDrawerVisible(true);
    form.setFieldsValue(record);
  };
  const showAddDrawer = () => {
    setIsEdit(false);
    setIsDrawerVisible(true);
  };

  const onClose = () => {
    setIsDrawerVisible(false);
    setIsEdit(false);
    form.resetFields();
  };
  const editUser = async () => {
    form.validateFields().then((values) => {
      try {
        axios
          .put(
            `http://fashionrental.online:8080/account/updatestatus?accountID=` +
              values.accountID +
              `&status=` +
              values.status
          )
          .then((response) => {
            api["success"]({
              message: "Cập Nhật Thành Công",
              description: null,
            });
            console.log(response);
            setUsers((prevUsers) =>
              prevUsers.map((user) =>
                user.staffID === values.staffID
                  ? { ...user, status: values.status, key: v4() }
                  : user
              )
            );
          });
      } catch (error) {
        console.log(error);
      }

      onClose();
    });
  };
  const deleteUser = async () => {
    form.validateFields().then((values) => {
      try {
        console.log(values.staffID);
        axios
          .delete(`http://fashionrental.online:8080/staff?id=` + values.staffID)
          .then((response) => {
            message.success("Xoá tài khoản thành công!");
            console.log(response);
            fetchUsers();
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
          });
      } catch (error) {
        console.log(error);
      }
      onClose();
    });
  };
  const addUser = async () => {
    try {
      const formValues = await form.validateFields();
      const registerAccountData = {
        email: formValues.email,
        password: formValues.password,
        roleID: "3",
      };

      try {
        const response = await axios.post(
          "http://fashionrental.online:8080/account/create",
          registerAccountData
        );

        api["success"]({
          message: "Thêm Mới Nhân Viên Thành Công",
          description: (
            <div style={{ fontSize: "15px" }}>
              Email: {formValues.email}
              <br />
              Mật Khẩu: {formValues.password}
            </div>
          ),
          duration: 10000,
        });

        fetchUsers();
        onClose();
        form.resetFields();
        console.log("Registration successful", response.data);
      } catch (error) {
        api["warning"]({
          message: "Đăng Ký Thất Bại!",
          description: "Email đã tồn tại",
        });
        console.error("Registration failed", error);
      }
    } catch (error) {
      api["error"]({
        message: "Đăng Ký Thất Bại!",
        description: null,
      });
      console.error("Validation failed", error);
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

  const columns = [
    {
      title: "Mã tài khoản",
      dataIndex: "accountID",
      key: "accountID",

      ...getColumnSearchProps("accountID"),
    },
    {
      title: "Mã nhân viên",
      dataIndex: "staffID",
      key: "staffID",

      ...getColumnSearchProps("staffID"),
    },
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      key: "fullName",

      ...getColumnSearchProps("fullName"),
    },
    {
      title: "Vai trò",
      dataIndex: "roleName",
      key: "roleName",

      render: (roleName) => (
        <p style={{ textAlign: "left" }}>
          <RenderTag tagRender={roleName} />
        </p>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",

      ...getColumnSearchProps("status"),
      render: (status) => (
        <p style={{ textAlign: "left" }}>
          <RenderTag key={status} tagRender={status} />
        </p>
      ),
    },
    {
      title: "",
      key: "action",
      align: "left",

      render: (_, record) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            style={{ marginRight: "15px" }}
            onClick={() => showEditDrawer(record)}
          >
            <EditTwoTone />
          </Button>
        </div>
      ),
    },
    // {
    //   title: 'Address',
    //   dataIndex: 'address',
    //   key: 'address',
    //   ...getColumnSearchProps('address'),
    //   sorter: (a, b) => a.address.length - b.address.length,
    //   sortDirections: ['descend', 'ascend'],
    // },
  ];
  return (
    <>
      {contextHolder}
      <ConfigProvider
        theme={{
          token: {
            Button: {
              colorPrimary: "rgb(32, 30, 42)",
              colorPrimaryHover: "orange",
              colorPrimaryActive: "orange",
            },
          },
        }}
      >
        <Button
          type="primary"
          style={{
            float: "right",

            color: "#fff",
            marginBottom: "10px",
          }}
          onClick={() => showAddDrawer()}
        >
          Thêm mới nhân viên
        </Button>
      </ConfigProvider>

      <Drawer
        title={isEdit ? "Cập Nhật" : "Thêm mới nhân viên"}
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
          {isEdit ? (
            // Render edit form when isEdit is true

            <Form form={form}>
              <Form.Item name="accountID" style={{ display: "none" }}>
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
                <Radio value={"VERIFIED"||"NOT_VERIFIED"}>
                  Đang hoạt động
                </Radio>
                <Radio value={"BLOCKED"}>Không hoạt động</Radio>
              </Radio.Group>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  onClick={isEdit ? editUser : addUser}
                  style={{
                    backgroundColor: "#008000",
                    color: "#fff",
                    width: "70%",
                  }}
                >
                  {isEdit ? "Chỉnh sửa" : "Thêm mới"}
                </Button>
                <Button
                  danger
                  style={{
                    width: "20%",
                    marginLeft: "10px",
                  }}
                  onClick={deleteUser}
                >
                  <DeleteOutlined />
                </Button>
              </Form.Item>
              <Form.Item name="staffID" display="none"></Form.Item>
            </Form>
          ) : (
            // Render add form when isEdit is false
            <Form form={form}>
              <p style={{ fontWeight: "bold" }}>Email:</p>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,

                    message: "Vui lòng nhập email",
                  },
                  { validator: emailValidator },
                ]}
              >
                <Input />
              </Form.Item>
              <p style={{ fontWeight: "bold" }}>Mật Khẩu:</p>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,

                    message: "Vui lòng nhập mật khẩu!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
              <p style={{ fontWeight: "bold" }}>Nhập Lại Mật Khẩu:</p>
              <Form.Item
                name="confirm"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,

                    message: "Vui lòng nhập lại mật khẩu!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Mật khẩu không khớp!"));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              {/* <Form.Item
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
            </Form.Item> */}
              {/* <Form.Item label="Ảnh đại diện">
              <Upload
                maxCount={1}
                onChange={handleFileChange}
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />}>Select Image</Button>
              </Upload>
            </Form.Item> */}

              <Form.Item>
                <Button
                  type="primary"
                  onClick={isEdit ? editUser : addUser}
                  style={{
                    color: "#fff",
                    width: "100%",
                  }}

                  // disabled={!urlImage}
                >
                  {isEdit ? "Chỉnh sửa" : "Thêm mới"}
                </Button>
              </Form.Item>
            </Form>
          )}
        </ConfigProvider>
      </Drawer>

      <Table bordered={true} columns={columns} dataSource={users} />
    </>
  );
};
export default StaffTable;
