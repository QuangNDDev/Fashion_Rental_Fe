import {
  SearchOutlined,
  UploadOutlined,
  EditTwoTone,
  DeleteOutlined,
} from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import {
  Button,
  Drawer,
  Form,
  Input,
  message,
  Radio,
  Space,
  Table,
  Upload,
} from "antd";
import { storage } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import axios from "axios";
import RenderTag from "../render/RenderTag";
const StaffTable = () => {
  const [users, setUsers] = useState();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [editingUser, setEditingUser] = useState(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [urlImage, setUrlImage] = useState("");

  const handleFileChange = (event) => {
    console.log("handleFileChange called");
    console.log("File selected:", event.file);
    if (event.file) {
      const imageRef = ref(storage, `images/${event.file.name + v4()}`);

      uploadBytes(imageRef, event.file)
        .then((snapshot) => {
          // Set the URL after a successful upload
          getDownloadURL(snapshot.ref).then((url) => {
            setUrlImage(url);
          });
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
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
      const editData = {
        staffID: values.staffID,
        status: values.status,
      };
      try {
        console.log(editData);
        axios
          .put(
            `http://fashionrental.online:8080/staff?staffID=` +
              values.staffID +
              `&status=` +
              values.status
          )
          .then((response) => {
            message.success("Chỉnh sửa thành công!");
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


        message.success("Thêm mới thành công!");

        fetchUsers();
        onClose();
        form.resetFields();
        console.log("Registration successful", response.data);
      } catch (error) {
        message.error("Email đã tồn tại!");
        console.error("Registration failed", error);
      }
    } catch (error) {
      message.error("Đăng kí thất bại!");
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
      title: "ID",
      dataIndex: "staffID",
      key: "staffID",
      width: "1%",
      ...getColumnSearchProps("staffID"),
    },
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      key: "fullName",
      width: "20%",
      ...getColumnSearchProps("fullName"),
    },
    {
      title: "Vai trò",
      dataIndex: "roleName",
      key: "roleName",
      width: "15%",
      render: (roleName) => (
        <p style={{ textAlign: "center" }}>
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
        <p style={{ textAlign: "center" }}>
          <RenderTag key={status} tagRender={status} />
        </p>
      ),
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
      <Button
        style={{
          float: "right",
          backgroundColor: "#008000",
          color: "#fff",
          marginBottom: "10px",
        }}
        onClick={() => showAddDrawer()}
      >
        Thêm mới nhân viên
      </Button>
      <Drawer
        title={isEdit ? "Cập Nhật" : "Thêm mới nhân viên"}
        visible={isDrawerVisible}
        onClose={onClose}
        width={400}
      >
        {isEdit ? (
          // Render edit form when isEdit is true
          <Form form={form}>
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
            <p>Email:</p>
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",

                  message: "Vui lòng nhập email",
                },
                {
                  required: true,
                  message: "Vui lòng nhập email",

                },
              ]}
            >
              <Input />
            </Form.Item>
            <p>Mật Khẩu:</p>
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
            <p>Nhập Lại Mật Khẩu:</p>
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
                    return Promise.reject(
                      new Error(
                        "Mật khẩu không khớp!"
                      )
                    );
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
                  backgroundColor: "#008000",
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
      </Drawer>

      <Table columns={columns} dataSource={users} />
    </>
  );
};
export default StaffTable;
