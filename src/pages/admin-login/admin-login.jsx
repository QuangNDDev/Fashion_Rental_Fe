import React, { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const handleNavigationOwner = (idUser) => {
    const paramValue = idUser;
    navigate(`/admin?idShowroom=${paramValue}`);
  };
  const handleNavigationAdmin = () => {
    navigate(`/admin`);
  };

  const onFinish = async (values) => {
    const email = values.email;
    const password = values.password;
    console.log("Received values:", values);
    try {
      const response = await axios.post(
        `http://159.223.36.66:8080/account/login?email=` +
         email +
          `&password=` +
          password
      );
      console.log(response);
      if (response.data) {
        localStorage.setItem("accountId", response.data.accountID);
        localStorage.setItem("roleId", response.data.role.roleID);
      }
      if (response.data.role.roleID == 2) {
        // const accountID = response.data.accountID;
        // try {
        //   const response = await axios.get(
        //     "http://localhost:8080/showrooms/get-showroom/" + userID
        //   );
          handleNavigationAdmin();
        // } catch (error) {
        //   console.error(error);
        // }
      } else if (response.data.roleID == 1) {
        handleNavigationAdmin();
      } else {
        message.info("Tài khoản của bạn không có quyền truy cập!!!");
      }
    } catch (error) {
      console.error(error);
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
          flex: 8, // Occupies 4 parts
          backgroundImage:
            "url('https://img3.thuthuatphanmem.vn/uploads/2019/10/10/background-anh-dong_032845920.gif')",
          backgroundSize: "cover",
          transform: "translateZ(0)", // Reduces aliasing effect
        }}
      />
      <div
        style={{
          flex: 3, // Occupies 8 parts
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        <Card style={{ width: 400 }}>
          <h2 style={{ textAlign: "center", marginBottom: 24 }}>ĐĂNG NHẬP</h2>
          <Form
            name="loginForm"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Xin vui lòng nhập email!",
                },
              ]}
              style={{ marginBottom: 16 }}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              label="Mật Khẩu"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Xin vui lòng nhập mật khẩu!",
                },
              ]}
              style={{ marginBottom: 24 }}
            >
              <Input.Password size="large" />
            </Form.Item>

            <Form.Item
              wrapperCol={{ span: 24 }}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                // onClick={onClickOnwer}
              >
                Đăng Nhập
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
