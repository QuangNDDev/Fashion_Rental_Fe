import React, { useEffect, useState } from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Col, Input, Row } from "antd";
import { Form, Modal, Button } from "antd";
import MuntilImage from "../Mutil-Image";
import axios from "axios";
const { Meta } = Card;
// const products = [
//   {
//     id: 1,
//     img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2969&q=80",
//     name: "Túi Gucci",
//     price: "13.000.000 VND",
//   },
//   {
//     id: 2,
//     img: "https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2735&q=80",
//     name: "Túi Prada",
//     price: "7.000.000 VND",
//   },
//   {
//     id: 3,
//     img: "https://images.unsplash.com/photo-1598452963314-b09f397a5c48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2981&q=80",
//     name: "Son Gucci",
//     price: "700.000 VND",
//   },
//   {
//     id: 4,
//     img: "https://images.unsplash.com/photo-1575176647993-a8a6f538e940?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80",
//     name: "Giày Gucci",
//     price: "4.000.000 VND",
//   },
//   {
//     id: 5,
//     img: "https://images.unsplash.com/photo-1590739225287-bd31519780c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2592&q=80",
//     name: "Túi Prada",
//     price: "11.000.000 VND",
//   },
//   {
//     id: 6,
//     img: "https://images.unsplash.com/photo-1571273260782-bab4699dde20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80",
//     name: "Gucci Bag",
//     price: "5.000.000 VND",
//   },
//   {
//     id: 7,
//     img: "https://images.unsplash.com/photo-1624796037770-c57cb79a567a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80",
//     name: "Túi Gucii",
//     price: "8.000.000 VND",
//   },
//   {
//     id: 8,
//     img: "https://images.unsplash.com/photo-1592842312573-dca0b185d2e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2592&q=80",
//     name: "Nước Hoa Chanel",
//     price: "2.500.000 VND",
//   },

// ];

const ProductCard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState(null);
  const [form] = Form.useForm();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const productownerId = localStorage.getItem("productownerId");
  const idAccount = localStorage.getItem("accountId");
  const [productData, setProductData] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://fashionrental.online:8080/product/getproducts/" + productownerId
      );
      setProductData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const showModal = (productData) => {
    setIsModalVisible(true);
    setSelectedProduct(productData);
    const specificationData = JSON.parse(productData.productSpecificationData);
  const madeOfValue = specificationData.madeof;
  const brand = specificationData.brandName;
    form.setFieldsValue({
      avatar: productData.avatar,
      productName: productData.productName,
      productReceiptUrl: productData.productReceiptUrl,
      description: productData.description,
      price: productData.price,
      status: productData.status,
      forSale: productData.forSale,
      forRent: productData.forRent,
      categoryName: productData.category.categoryName,
      imgProduct: productData.imgProduct,
      madeOf : madeOfValue,
      brandName : brand,

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
  return (
    <>
      <Row gutter={[16, 16]}>
        {productData.map((product) => (
          <Col
            xs={24}
            sm={12}
            md={8}
            lg={6}
            xl={6}
            key={product.id}
            style={{ paddingTop: 20 }}
          >
            <Card
              style={{
                width: 230,
              }}
              cover={
                <img
                  alt="example"
                  src={product.avatar}
                  style={{
                    height: 150,
                  }}
                />
              }
              actions={[
                <EditOutlined key="edit" onClick={() => showModal(product)} />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                title={product.productName}
                description={product.price}
                style={{ textAlign: "center" }}
              />
            </Card>
          </Col>
        ))}
        <Modal
          title="Chi tiết sản phẩm"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            form={form}
            name="modal_form"
            onFinish={onFinish}
            // Đặt giá trị mặc định cho các trường nếu cần
          >
            <Form.Item
              label="Tên sản phẩm"
              name="productName" //lấy value của cái name gán lên cái setFormValue
              rules={[
                { required: true, message: "Vui lòng nhập tên sản phẩm!" },
              ]}
            >
              <Input readOnly style={{ width: "300px", marginLeft: "13px" }} />
            </Form.Item>

            <Form.Item
              label="Mã hóa đơn"
              name="productReceiptUrl"
              rules={[{ required: true, message: "Vui lòng nhập mã hóa đơn!" }]}
            >
              <Input readOnly style={{ width: "300px", marginLeft: "24px" }} />
            </Form.Item>

            <Form.Item
              label="Mô tả"
              name="description"
              rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
            >
              <Input
                readOnly
                style={{ width: "300px", marginLeft: "56.2px" }}
              />
            </Form.Item>

            <Form.Item
              label="Chất liệu"
              name="madeOf"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
              ]}
            >
              <Input
                readOnly
                style={{ width: "300px", marginLeft: "16.8px" }}
              />
            </Form.Item>
            <Form.Item
              label="Thương hiệu"
              name="brandName"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
              ]}
            >
              <Input
                readOnly
                style={{ width: "300px", marginLeft: "16.8px" }}
              />
            </Form.Item>
            <Form.Item
              label="Giá sản phẩm"
              name="price"
              rules={[
                { required: true, message: "Vui lòng nhập giá của sản phẩm!" },
              ]}
            >
              <Input
                readOnly
                style={{ width: "300px", marginLeft: "16.8px" }}
              />
            </Form.Item>
            <Form.Item
              label="Hình ảnh sản phẩm"
              name="imgProduct"
              rules={[{ required: true, message: "" }]}
            >
              {productData && productData.imgProduct ? <MuntilImage /> : null}
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
      </Row>
    </>
  );
};
export default ProductCard;
