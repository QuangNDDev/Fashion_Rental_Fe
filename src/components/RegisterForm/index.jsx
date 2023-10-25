import {
  Button,
  Card,
  Checkbox,
  Col,
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
        const responseData = response.data;

        if (responseData.message === "registration_successful") {
          api["success"]({
            message: "Đăng Ký Thành Công!",
            description: "Chúc mừng bạn đã đăng ký thành công",
            duration: 1000,
          });
          navigate("/");
        } else if (
          responseData.message === "Created Fail By Email Already Existed"
        ) {
          api["warning"]({
            message: "Đăng Ký Thất Bại",
            description: "Email đã tồn tại",
          });
        } else {
          api["error"]({
            message: "Đăng Ký Thất Bại",
            description: "Đăng Ký Thất Bại",
          });
        }
      }
    } catch (error) {
      console.log(error);

      api["error"]({
        message: "Đăng Ký Thất Bại",
        description: error.response.data.message || "Đăng Ký Thất Bại",
      });
    }
  };
  const validateEmail = (email) => {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
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
                      {
                        validator: (_, value) =>
                          validateEmail(value) || "Email không hợp lệ!",
                      },
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
                            new Error("The two passwords do not match")
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
                >
                  Đăng Ký
                </Button>
                <div style={{ marginTop: "20px" }}>
                  Bạn đã có tài khoản? <Link to="/login"> Đăng nhập</Link>
                </div>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
