import { EyeOutlined } from "@ant-design/icons";
import { Card, Col, Form, Image, Modal, Row, Switch } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import MuntilImage from "../Mutil-Image";
import RenderTag from "../render/RenderTag";
const { Meta } = Card;

const ProductCard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState(null);
  const [form] = Form.useForm();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const productownerId = localStorage.getItem("productownerId");
  const idAccount = localStorage.getItem("accountId");
  const [productData, setProductData] = useState([]);

  const [productImage, setProductImage] = useState();

  //chuyen doi thanh dang tien te vnd ------------------------------------------------------
  const formatPriceWithVND = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  //-------------------------------------------------------------------------------------------------


  //-------------------------SWITCH-----------------------------------
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  //----------------------------------------------------------------------
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
    const fetchProductImg = async () => {
      try {
        const response = await axios.get(
          "http://fashionrental.online:8080/productimg?productID=" +
            productData.productID
        );
        const imgUrlArray = response.data.map(item => item.imgUrl);
        setProductImage(imgUrlArray);
        console.log(imgUrlArray);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductImg();
    setIsModalVisible(true);
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
      madeOf: madeOfValue,
      brandName: brand,
      

      // Các trường dữ liệu khác tương tự
    });
    setSelectedProduct({
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
      madeOf: madeOfValue,
      brandName: brand,
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
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
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
                  src={product.productAvt}
                  style={{
                    height: 150,
                  }}
                />
              }
              actions={[
                <Switch
                  defaultChecked
                  onChange={onChange}
                  style={{ backgroundColor: "green" }}
                  size="small"
                />,
                <EyeOutlined key="edit" onClick={() => showModal(product)} />,
              ]}
            >
              <Meta
                title={product.productName}
                description={formatPriceWithVND(product.price)}
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
              name="productName" //lấy value của cái name gán lên cái setFormValue
              initialValue={selectedProduct && selectedProduct.productName}
            >
              <div style={{ display: "flex" }}>
                <strong>Tên sản phẩm:</strong>
                <p style={{ marginLeft: "10px" }}>
                  {selectedProduct && selectedProduct.productName}
                </p>
              </div>
            </Form.Item>

            <Form.Item
              name="description"
              initialValue={selectedProduct && selectedProduct.description}
            >
              <div style={{ display: "flex" }}>
                <strong>Mô tả:</strong>
                <p style={{ marginLeft: "10px" }}>
                  {selectedProduct && selectedProduct.description}
                </p>
              </div>
            </Form.Item>

            <Form.Item
              name="madeOf"
              initialValue={selectedProduct && selectedProduct.madeOf}
            >
              <div style={{ display: "flex" }}>
                <strong>Chất liệu:</strong>
                <p style={{ marginLeft: "10px" }}>
                  {selectedProduct && selectedProduct.madeOf}
                </p>
              </div>
            </Form.Item>
            <Form.Item
              name="brandName"
              initialValue={selectedProduct && selectedProduct.brandName}
            >
              <div style={{ display: "flex" }}>
                <strong>Thương hiệu:</strong>
                <p style={{ marginLeft: "10px" }}>
                  {selectedProduct && selectedProduct.brandName}
                </p>
              </div>
            </Form.Item>
            <Form.Item
              name="price"
              initialValue={selectedProduct && selectedProduct.price}
            >
              <div style={{ display: "flex" }}>
                <strong>Giá sản phẩm:</strong>
                <p style={{ marginLeft: "10px" }}>
                  {selectedProduct &&
                    `${selectedProduct.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })} `}
                </p>
              </div>
            </Form.Item>
            {/* <Form.Item
              name="price"
              initialValue={selectedProduct && selectedProduct.price}
            >
              <div style={{ display: "flex" }}>
                <strong>Giá sản phẩm:</strong>
                <p style={{ marginLeft: "10px" }}>
                  {selectedProduct && selectedProduct.price}
                </p>
                <strong style={{ marginLeft: "10px" }}>vnđ</strong>
              </div>
            </Form.Item> */}
            <Form.Item
              name="status"
              initialValue={selectedProduct && selectedProduct.status}
            >
              <div style={{ display: "flex" }}>
                <strong>Trạng thái:</strong>

                <p style={{ marginLeft: "10px" }}>
                  <RenderTag
                    tagRender={selectedProduct && selectedProduct.status}
                  />
                </p>
              </div>
            </Form.Item>
            <Form.Item
              name="productReceiptUrl"
              initialValue={
                selectedProduct && selectedProduct.productReceiptUrl
              }
            >
              <strong style={{ marginRight: "10px" }}>Hoá đơn:</strong>
              <Image
                width={150}
                src={selectedProduct && selectedProduct.productReceiptUrl}
              />
            </Form.Item>

            <Form.Item
              name="imgProduct"
              initialValue={selectedProduct && selectedProduct.imgProduct}
            >
              <strong>Hình ảnh sản phẩm:</strong>

              
                <>
                 <MuntilImage images={productImage} /> 
                </>
              

            </Form.Item>
          </Form>
        </Modal>
      </Row>
    </>
  );
};
export default ProductCard;
