import React from "react";
import { Button, Card, Form, Input, Space, notification } from "antd";
import axios from "axios";

function RegisterDelivery() {
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    const registerGHNData = {
      poshopID: values.shopId,
      potoken: values.token,
    };
    console.log(registerGHNData);
    axios
      .put(
        "http://fashionrental.online:8080/po/updatetoken?productownerID=" +
          localStorage.getItem("productownerId"),
        registerGHNData
      )
      .then((response) => {
        // Xử lý trường hợp tài khoản đã đăng ký thành công
        console.log("Register GHN success:", response.data);
        api["success"]({
          message: "Đăng Ký GHN Thành Công!",
          description: "Chúc mừng bạn đã đăng ký GHN thành công",
          duration: 1500,
        });
      })
      .catch((error) => {
        api["error"]({
          message: "Đăng Ký GHN Thất Bại!",
          description: "Bạn đã đăng ký GHN thất bại",
          duration: 1500,
        });
      });
  };

  return (
    <div
      style={{
        backgroundColor: "#e7e9eb",
        height: "800px",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Space direction="vertical" size={16}>
        {contextHolder}
        <Card
          title={<div style={{ textAlign: "center" }}>Đăng kí GHN</div>}
          style={{
            width: 500,
            marginBottom: "100px ",
          }}
        >
          <Form form={form} onFinish={onFinish}>
            <p>Bạn hãy đăng kí tài khoản giao hàng nhanh:</p>
            <a
              href="https://5sao.ghn.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              Đăng kí tài khoản GHN
            </a>
            <p>Mã cửa hàng:</p>
            <Form.Item
              name={"shopId"}
              rules={[{ required: true, message: "Không được để trống!" }]}
            >
              <Input placeholder="Vui lòng nhập..." />
            </Form.Item>

            <p>Token:</p>
            <Form.Item
              name={"token"}
              rules={[{ required: true, message: "Không được để trống!" }]}
            >
              <Input placeholder="Vui lòng nhập..." />
            </Form.Item>
            <Form.Item style={{ textAlign: "center" }}>
              <Button
                style={{
                  backgroundColor: "green",
                  color: "white",
                }}
                htmlType="submit"
              >
                Đăng kí
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Space>
    </div>
  );
}

export default RegisterDelivery;
