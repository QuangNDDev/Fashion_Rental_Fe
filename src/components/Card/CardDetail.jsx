import React, { useState } from "react";
import { EditOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Card, Form, Modal, Button } from "antd";
import MuntilImage from "../Mutil-Image";
import { Input } from "antd";
import InputNumber from "rc-input-number";
const { Meta } = Card;

const CardDetail = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState(null);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    // Đặt lại form về trạng thái ban đầu nếu cần
    form.resetFields();
  };

  const onFinish = (values) => {
    console.log("Received values:", values);
    // Lưu dữ liệu vào state
    setFormData(values);
    // Đóng modal
    handleCancel();
  };

  return (
    <>
      <Card
        style={{
          width: 300,
        }}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" onClick={showModal} />,
        ]}
      >
        <Meta
          avatar={
            <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
          }
          title="Card title"
          description="This is the description"
        />
      </Card>
      <Modal
        title="Chi tiết Card"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="modal_form"
          onFinish={onFinish}
          initialValues={{}} // Đặt giá trị mặc định cho các trường nếu cần
        >
          <Form.Item
            label="Tên sản phẩm"
            name="productName"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
          >
            <Input style={{ width: "300px", marginLeft: "13px" }} />
          </Form.Item>

          <Form.Item
            label="Tên chủ sở hữu"
            name="ownerName"
            rules={[
              { required: true, message: "Vui lòng nhập tên chủ sở hữu!" },
            ]}
          >
            <Input style={{ width: "300px", marginLeft: "7.1px" }} />
          </Form.Item>

          <Form.Item
            label="Mã hóa đơn"
            name="invoiceCode"
            rules={[{ required: true, message: "Vui lòng nhập mã hóa đơn!" }]}
          >
            <Input style={{ width: "300px", marginLeft: "24px" }} />
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
          >
            <Input style={{ width: "300px", marginLeft: "56.2px" }} />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phoneNumber"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input style={{ width: "300px", marginLeft: "16.8px" }} />
          </Form.Item>

          <Form.Item
            label="Hình ảnh sản phẩm"
            name="phoneNumber"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <br></br>
            <MuntilImage />
          </Form.Item>

          <Form.Item style={{ textAlign: "center" }}>
            <Button type="primary" danger onClick={handleCancel}>
              Hủy
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginLeft: "20px" }}
            >
              Xác Nhận
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CardDetail;
