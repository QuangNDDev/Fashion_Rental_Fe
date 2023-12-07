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
import { UserOutlined, LockOutlined, LoadingOutlined } from "@ant-design/icons";
import { auth, provider } from "../../firebase/firebase.js";
import React, { useEffect, useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "./admin-login.css";
const LoginForm = () => {
  const [loadingIcon, setLoadingIcon] = useState(false);
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
  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(credential);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  useEffect(() => {
    localStorage.getItem("email");
  });
  const onFinish = async (values) => {
    const email = values.email.trim();
    const password = values.password.trim();
    console.log("Received values:", values);

    if (!email || !password) {
      api["warning"]({
        message: "Đăng Nhập Thất Bại",
        description: "Email và Mật Khẩu không được chứa khoảng trắng",
      });
      return;
    }

    try {
      setLoadingIcon(true);
      const response = await axios.post(
        `http://fashionrental.online:8080/account/login?email=${email}&password=${password}`
      );
      console.log(response.data.status);

      if (response.data.status != "BLOCKED") {
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
      }else{
        api["warning"]({
          message: "Đăng Nhập Thất Bại",
          description: "Tài khoản của bạn đã bị khoá!!!",
        });
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
          description: "Vui lòng kiểm tra lại email và mật khẩu.",
        });
      } else {
        api["error"]({
          message: "Đăng Nhập Thất Bại",
          description: "Đã xảy ra lỗi trong quá trình đăng nhập.",
        });
      }
    }
    setLoadingIcon(false);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        padding: 0,
        margin: 0,
      }}
    >
      <div
        style={{
          width: "100%",

          backgroundImage:
            "url('https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div
          style={{
            width: "35%", // Use string for percentage values
            backgroundColor: "none", // Assuming you want no background color
            paddingTop: "20px",
            paddingBottom: "20px",
            paddingLeft: 0,
            paddingRight: 0,
            backgroundSize: "cover",
            marginLeft: "auto",
            height: "100%", // Use string for percentage values
            backgroundImage: 'url("/Rectangle 12.png")',
          }}
        >
          <Card style={{ width: 400, marginLeft: "35%", marginTop: "20%" }}>
            {contextHolder}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  marginBottom: "20px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <a href="">
                  <img
                    src="/brand_logo-black.png"
                    alt="Logo"
                    style={{ width: 100, height: 100 }}
                  />
                </a>
              </div>
            </div>
            <div>
              <h2 style={{ textAlign: "center", marginBottom: 24 }}>
                ĐĂNG NHẬP
              </h2>
              <ConfigProvider
                theme={{
                  token: {
                    Input: {
                      activeBorderColor: "rgb(32, 30, 42)",
                      hoverBorderColor: "rgb(32, 30, 42)",
                    },
                    Checkbox: {
                      colorPrimary: "rgb(32, 30, 42)",
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
                    rules={[
                      { required: true, message: "Vui lòng nhập email!" },
                    ]}
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
                    rules={[
                      { required: true, message: "Vui lòng nhập mật khẩu!" },
                    ]}
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
                          backgroundColor: "rgb(32, 30, 42)",
                          fontWeight: "bold",
                          borderColor: "rgb(32, 30, 42)",
                        }}
                        type="primary"
                        htmlType="submit"

                        // loading={loadings[0]}
                        // onClick={() => enterLoading(0)}
                      >
                        {loadingIcon && (
                          <LoadingOutlined style={{ fontSize: "20px" }} />
                        )}
                        &nbsp;Đăng Nhập
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
                <button
                  className="login-with-google-btn"
                  onClick={handleGoogleLogin}
                >
                  Đăng nhập với Google
                </button>
              </div>
              <div style={{ marginTop: "20px" }}>
                Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
              </div>
            </div>
          </Card>
        </div>
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
