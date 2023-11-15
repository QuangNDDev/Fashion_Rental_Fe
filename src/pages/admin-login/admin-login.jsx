import {
  Form,
  Input,
  Button,
  Card,
  Checkbox,
  notification,
  Divider,
  ConfigProvider,
} from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./admin-login.css";
const LoginForm = () => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const handleNavigationAdmin = () => {
    navigate(`/admin`);
  };
  const handleNavigationStaff = () => {
    navigate(`/staff`);
  };
  const handleNavigationProductOwner = () => {
    // const paramValue = idPo;
    navigate(`/productOwner`);
  };

  const onFinish = async (values) => {
    const email = values.email;
    const password = values.password;
    console.log("Received values:", values);
    try {
      const response = await axios.post(
        `http://fashionrental.online:8080/account/login?email=` +
          email +
          `&password=` +
          password
      );
      console.log(response);

      if (response.data) {
        localStorage.setItem("accountId", response.data.accountID);
        localStorage.setItem("roleId", response.data.role.roleID);

        if (response.data.role.roleID == 4) {
          api["success"]({
            message: "Đăng Nhập Thành Công",
            description: `Xin Chào Admin!`,
            duration: 1000,
          });
          setTimeout(() => {
            handleNavigationAdmin();
          }, 500);
        } else if (response.data.role.roleID == 3) {
          api["success"]({
            message: "Đăng Nhập Thành Công",
            description: null,
            duration: 1000,
          });
          setTimeout(() => {
            handleNavigationStaff();
          }, 500);
        } else if (response.data.role.roleID == 2) {
          api["success"]({
            message: "Đăng Nhập Thành Công",
            description: null,

            duration: 1000,
          });
          setTimeout(() => {
            handleNavigationProductOwner();
          }, 500);
        } else {
          api["warning"]({
            message: "Đăng Nhập Thất Bại",
            description: "Tài khoản của bạn không có quyền truy cập!!!",
          });
        }
      }
    } catch (error) {
      console.error(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message === "Login Fail"
      ) {
        api["error"]({
          message: "Đăng Nhập Thất Bại",
          description: " Vui lòng kiểm tra lại email và mật khẩu.",
        });
      } else {
        api["error"]({
          message: "Đăng Nhập Thất Bại",
          description: " Đã xảy ra lỗi trong quá trình đăng nhập.",
        });
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
      }}
    >
      <div
        style={{
          flex: 8,
          backgroundImage:
            "url('https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: "cover",
          transform: "translateZ(0)",
        }}
      />
      <div
        style={{
          flex: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        <Card style={{ width: 400 }}>
          {contextHolder}
          <h2 style={{ textAlign: "center", marginBottom: 24 }}>ĐĂNG NHẬP</h2>
          <ConfigProvider
            theme={{
              token: {
                Input: {
                  activeBorderColor: "#008000",
                  hoverBorderColor: "#008000",
                },
                Checkbox: {
                  colorPrimary: "#008000",
                },
              },
            }}
          >
            <Form
              name="loginForm"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              style={{ marginTop: "10px" }}
            >
              <Form.Item
                name="email"
                rules={[{ required: true, message: "Vui lòng nhập email!" }]}
              >
                <Input
                  style={{
                    fontSize: "15px",
                    padding: "10px",
                  }}
                  prefix={<UserOutlined />}
                  placeholder="Email"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input.Password
                  style={{
                    fontSize: "15px",
                    padding: "10px",
                  }}
                  prefix={<LockOutlined />}
                  placeholder="Mật Khẩu"
                />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Ghi Nhớ</Checkbox>
              </Form.Item>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <Form.Item style={{ width: "100%" }}>
                  <Button
                    style={{
                      width: "100%",
                      height: "43px",
                      backgroundColor: "#008000",
                      fontWeight: "bold",
                      borderColor: "#008000",
                    }}
                    type="primary"
                    htmlType="submit"
                    // loading={loadings[0]}
                    // onClick={() => enterLoading(0)}
                  >
                    Đăng Nhập
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </ConfigProvider>

          <Divider style={{ fontSize: "14px", fontWeight: "400" }}>
            Hoặc
          </Divider>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "25px 0px",
            }}
          >
            <button className="login-with-google-btn">
              Đăng nhập với Google
            </button>
          </div>
          <div style={{ marginTop: "20px" }}>
            Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
// const user = {
//   accountID: response.data.accountID,
//   email: response.data.email,
//   status: response.data.status,
//   role: {
//     roleID: response.data.role.roleID,
//     roleName: response.data.role.roleName,
//   },
//   staff: {
//     staffID: response.data.staff.staffID,
//     fullName: response.data.staff.fullName,
//     avatarUrl: response.data.staff.avatarUrl,
//   },
// };
