import {
  Button,
  Card,
  Checkbox,
  Col,
  ConfigProvider,
  Form,
  Input,
  Row,
  Segmented,
  notification,
} from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterForm.css";

const RegisterForm = () => {
  const [accountType, setAccountType] = useState(1);

  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();

  const onFinish = async (values) => {
    const spaceEmail = values.email.trim();
    const spacePassword = values.password.trim();

    if (!spaceEmail || !spacePassword) {
      notification.error({
        message: "Đăng Ký Thất Bại",
        description:
          "Email và mật khẩu không được để trống hoặc chỉ chứa khoảng trắng!",
      });
      return;
    }
    const registerData = {
      agree: values.agree,
      email: values.email,
      password: values.password,
      roleID: accountType,
    };

    try {
      const response = await axios.post(
        "http://fashionrental.online:8080/account/create",
        registerData
      );
      if (response?.status === 200) {
        api["success"]({
          message: "Đăng Ký Thành Công!",
          description: "Chúc mừng bạn đã đăng ký thành công",
        });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.log(error);

      if (error.response && error.response.data) {
        if (
          error.response.data.message ===
          "Created Fail By Email Already Existed"
        ) {
          api["warning"]({
            message: "Đăng Ký Thất Bại!",
            description: "Email đã tồn tại",
          });
        } else {
          api["error"]({
            message: "Đăng Ký Thất Bại",
            description: error.response.data.message || "Đăng Ký Thất Bại",
          });
        }
      } else {
        api["error"]({
          message: "Đăng Ký Thất Bại",
          description: "Đăng Ký Thất Bại",
        });
      }
    }
  };
  const emailValidator = (rule, value, callback) => {
    if (value && !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      callback("Vui lòng nhập địa chỉ email phù hợp!");
    } else {
      callback();
    }
  };
  return (
    <div className="registration-container">
      <div className="left-panel">
        <div className="right-panel">
          <Card
            style={{
              width: "70%",
              marginLeft: "auto",
              marginTop: "20%",
            }}
          >
            {contextHolder}
            <div
              style={{ marginBottom: "30px", marginTop: "30px" }}
              className="d-flex mb-4"
            >
              <h1>Đăng Ký</h1>
            </div>
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
                  Segmented: {
                    itemHoverBg: "rgba(0, 0, 0, 0.06)",
                    itemSelectedBg: "rgb(32, 30, 42)",
                    itemSelectedColor: "#ffffff",
                  },
                },
              }}
            >
              <Form
                className="registerForm"
                layout="vertical"
                onFinish={onFinish}
              >
                <Segmented
                  className="choose"
                  style={{ marginBottom: 30, fontWeight: "bold" }}
                  options={["Khách Hàng", "Chủ Sản Phẩm"]}
                  onChange={(e) => {
                    if (e === "Khách Hàng") {
                      setAccountType(1);
                    }
                    if (e === "Chủ Sản Phẩm") {
                      setAccountType(2);
                    }
                  }}
                />
                <Row gutter={[16, 4]}>
                  <Col xs={24} sm={24} md={12} lg={12}>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập email!",
                        },
                        { validator: emailValidator },
                      ]}
                    >
                      <Input className="registerForm__input" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={24} md={12} lg={12}>
                    <Form.Item
                      name="password"
                      label="Mật Khẩu"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập mật khẩu",
                        },
                      ]}
                    >
                      <Input.Password className="registerForm__input" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12}>
                    <Form.Item
                      name="confirmPassword"
                      label="Nhâp lại mật khẩu"
                      dependencies={["password"]}
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập lại mật khẩu",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error("Mật khẩu không trùng khớp!")
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password className="registerForm__input" />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  name="agree"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error(
                                "Vui lòng đồng ý với các điều khoản và điều kiện"
                              )
                            ),
                    },
                  ]}
                >
                  <Checkbox>
                    Vui lòng đồng ý với các điều khoản và điều kiện
                  </Checkbox>
                </Form.Item>
                <Form.Item>
                  <Button
                    className="registerForm__button"
                    type="primary"
                    htmlType="submit"
                    style={{ backgroundColor: "rgb(32, 30, 42)" }}
                  >
                    Đăng Ký
                  </Button>
                  <div style={{ marginTop: "20px" }}>
                    Bạn đã có tài khoản? <Link to="/login"> Đăng nhập</Link>
                  </div>
                </Form.Item>
              </Form>
            </ConfigProvider>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
