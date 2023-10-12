import React, { useState } from "react";
import { EditOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Form, Modal, Button, Result, Carousel } from "antd";
import MuntilImage from "../Mutil-Image";
import { Input } from "antd";
import { Tag } from "antd";

const { Meta } = Card;

const CardDetail = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState(null);
  const [form] = Form.useForm();
  const [cardData, setCardData] = useState({
    avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel",
    product_Name: "Louis Vuitton", // Thay đổi title
    productOwner_Name: "Nguyễn Đăng Quang", // Thay đổi description
    status: "Đã duyệt",
    invoice_Code: "ACCCAAA",
    address: "Vinhome grandpark Quận 9",
    phone_Number: "0822833799",
    imgProduct: { MuntilImage },
  });

  const tagColor = {
    Active: "green",
    InActive: "red",
  };

  const tagValue = {
    Active: "green",
    InActive: "red",
  };

  const contentStyle = {
    display: "flex",
  };

  const showModal = () => {
    setIsModalVisible(true);
    // Cập nhật dữ liệu cho Modal dựa trên thẻ hiện tại
    form.setFieldsValue({
      avatar: cardData.avatar,
      productName: cardData.product_Name,
      ownerName: cardData.productOwner_Name,
      invoiceCode: cardData.invoice_Code,
      address: cardData.address,
      status: cardData.status,
      phoneNumber: cardData.phone_Number,
      imgProduct: cardData.imgProduct,
      // Các trường dữ liệu khác tương tự
    });
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

  const centeredCarousel = {
    display: "flex",
    justifyContent: "center",
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
            src="https://vn.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-t%C3%BAi-onthego-mm-monogram-t%C3%BAi--M45321_PM2_Front%20view.jpg"
          />
        }
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" onClick={showModal} />,
        ]}
      >
        <Meta
          avatar={<Avatar src={cardData.avatar} />}
          title={cardData.product_Name} /* Sử dụng "Tên sản phẩm" */
          description={
            <>
              <div>{cardData.productOwner_Name}</div>
              <div>
                {cardData.status === "Đã duyệt" && (
                  <Tag style={{ textAlign: "center" }} color="green">
                    {cardData.status}
                  </Tag>
                )}
                {cardData.status === "Đang chờ xử lý" && (
                  <Tag style={{ textAlign: "center" }} color="yellow">
                    {cardData.status}
                  </Tag>
                )}
                {cardData.status === "Đã từ chối" && (
                  <Tag style={{ textAlign: "center" }} color="red">
                    {cardData.status}
                  </Tag>
                )}
              </div>
            </>
          }
          icon={formData && formData.imgProduct ? <MuntilImage /> : null}
        />
      </Card>
      <Modal
        title="Chi tiết đơn duyệt sản phẩm"
        open={isModalVisible}
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
            label="Hình đại diện"
            name="avatar" //lấy value của cái name gán lên cái setFormValue
          >
            <Avatar
              style={{ width: "80%" }}
              icon={<UserOutlined />}
              src={cardData.avatar}
            />
          </Form.Item>

          <Form.Item
            label="Tên sản phẩm"
            name="productName" //lấy value của cái name gán lên cái setFormValue
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
            name="imgProduct"
            rules={[{ required: true, message: "" }]}
          >
            {cardData && cardData.imgProduct ? <MuntilImage /> : null}
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
