import { EyeOutlined } from "@ant-design/icons";
import { Card, Col, Form, Image, Modal, notification, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import MuntilImage from "../Mutil-Image";
const { Meta } = Card;

const ProductOrderRent = ({ orderID }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState(null);
  const [form] = Form.useForm();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const productownerId = localStorage.getItem("productownerId");
  const idAccount = localStorage.getItem("accountId");
  const [productData, setProductData] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [productImage, setProductImage] = useState();
  const [selectedOrderRentDetail, setselectedOrderRentDetail] = useState([]);

  //chuyen doi thanh dang tien te vnd ------------------------------------------------------
  const formatPriceWithVND = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  //-------------------------------------------------------------------------------------------------
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://fashionrental.online:8080/orderrentdetail/" + orderID
      );

      const productDTO = response.data.map((item) => item.productDTO);

      console.log("product dto:", productDTO);
      setProductData(productDTO);
      console.log("Product DTO:", productDTO);
    } catch (error) {
      console.error(error);
    }
  };
  //----------------------------------------------------------------------
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
        const imgUrlArray = response.data.map((item) => item.imgUrl);
        setProductImage(imgUrlArray);
        console.log(imgUrlArray);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchRentDetail = async () => {
      try {
        const responseOrderRentDetail = await axios.get(
          `http://fashionrental.online:8080/orderrentdetail/${productData.productID}/${orderID}/rentdetail`
        );
        setselectedOrderRentDetail(responseOrderRentDetail.data);
        console.log("detail:", responseOrderRentDetail.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRentDetail();
    fetchProductImg();
    setIsModalVisible(true);
    const specificationData = JSON.parse(productData.productSpecificationData);
    const strapMaterialWatch = specificationData.strapMaterialWatch;
    const brandNameWatch = specificationData.brandNameWatch;
    const clockFaceWatch = specificationData.clockFaceWatch;
    const originWatch = specificationData.originWatch;
    const brandNameGlasses = specificationData.brandNameGlasses;
    const typeLensGlasses = specificationData.typeLensGlasses;
    const glassShape = specificationData.glassShape;
    const glassMaterial = specificationData.glassMaterial;
    const brandNameBag = specificationData.brandNameBag;
    const skinTexture = specificationData.skinTexture;
    const typeSkinBag = specificationData.typeSkinBag;
    const originBag = specificationData.originBag;
    const brandNameHat = specificationData.brandNameHat;
    const materialHat = specificationData.materialHat;
    const typeHat = specificationData.typeHat;
    const originHat = specificationData.originHat;
    const brandNameJewelry = specificationData.brandNameJewelry;
    const typeJewelrys = specificationData.typeJewelrys;
    const occasion = specificationData.occasion;
    const originJewelry = specificationData.originJewelry;
    const brandNameShoe = specificationData.brandNameShoe;
    const typeSkinShoe = specificationData.typeSkinShoe;
    const outsideSkin = specificationData.outsideSkin;
    const originShoe = specificationData.originShoe;
    form.setFieldsValue({
      brandNameHat: brandNameHat,
      typeHat: typeHat,
      materialHat: materialHat,
      originHat: originHat,
      brandNameJewelry: brandNameJewelry,
      typeJewelrys: typeJewelrys,
      occasion: occasion,
      originJewelry: originJewelry,
      brandNameShoe: brandNameShoe,
      typeSkinShoe: typeSkinShoe,
      outsideSkin: outsideSkin,
      originShoe: originShoe,
      checkType: productData.checkType,
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
      strapMaterialWatch: strapMaterialWatch,
      brandNameWatch: brandNameWatch,
      clockFaceWatch: clockFaceWatch,
      originWatch: originWatch,
      glassMaterial: glassMaterial,
      brandNameGlasses: brandNameGlasses,
      typeLensGlasses: typeLensGlasses,
      glassShape: glassShape,
      brandNameBag: brandNameBag,
      skinTexture: skinTexture,
      typeSkinBag: typeSkinBag,
      originBag: originBag,
      
      // Các trường dữ liệu khác tương tự
    });
    setSelectedProduct({
      checkType: productData.checkType,
      avatar: productData.avatar,
      productName: productData.productName,
      productCondition: productData.productCondition,
      productReceiptUrl: productData.productReceiptUrl,
      description: productData.description,
      price: productData.price,
      status: productData.status,
      forSale: productData.forSale,
      forRent: productData.forRent,
      categoryName: productData.category.categoryName,
      imgProduct: productData.imgProduct,
      strapMaterialWatch: strapMaterialWatch,
      brandNameWatch: brandNameWatch,
      clockFaceWatch: clockFaceWatch,
      originWatch: originWatch,
      glassMaterial: glassMaterial,
      brandNameGlasses: brandNameGlasses,
      typeLensGlasses: typeLensGlasses,
      glassShape: glassShape,
      brandNameBag: brandNameBag,
      skinTexture: skinTexture,
      typeSkinBag: typeSkinBag,
      originBag: originBag,
      brandNameHat: brandNameHat,
      typeHat: typeHat,
      materialHat: materialHat,
      originHat: originHat,
      brandNameJewelry: brandNameJewelry,
      typeJewelrys: typeJewelrys,
      occasion: occasion,
      originJewelry: originJewelry,
      brandNameShoe: brandNameShoe,
      typeSkinShoe: typeSkinShoe,
      outsideSkin: outsideSkin,
      originShoe: originShoe,
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
  //format date ------------------------------------
  function formatDate(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    const [month, day, year] = formattedDate.split("/");
    return `${day}/ ${month}/ ${year}`;
  }
  return (
    <>
      {contextHolder}
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
              bordered={true}
              style={{
                width: 230,
              }}
              cover={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    alt="example"
                    src={product.productAvt}
                    style={{
                      height: 150,
                      width: 200,
                      marginTop: 5,
                    }}
                  />
                </div>
              }
              actions={[
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
            <hr />
            <h3>Thông tin thuê:</h3>
            <hr />
            <Form.Item name="startDate">
              <div style={{ display: "flex" }}>
                <strong>Ngày bắt đầu:</strong>
                <p style={{ marginLeft: "10px" }}>
                  <p>{formatDate(selectedOrderRentDetail.startDate)}</p>
                </p>
              </div>
            </Form.Item>
            <Form.Item name="endDate">
              <div style={{ display: "flex" }}>
                <strong>Ngày kết thúc:</strong>
                <p style={{ marginLeft: "10px" }}>
                  <p>{formatDate(selectedOrderRentDetail.endDate)}</p>
                </p>
              </div>
            </Form.Item>
            <Form.Item name="rentPrice">
              <div style={{ display: "flex" }}>
                <strong>Giá thuê:</strong>
                <p style={{ marginLeft: "10px" }}>
                  <p>{formatPriceWithVND(selectedOrderRentDetail.rentPrice)}</p>
                </p>
              </div>
            </Form.Item>
            <Form.Item name="cocMoney">
              <div style={{ display: "flex" }}>
                <strong>Tiền cọc:</strong>
                <p style={{ marginLeft: "10px" }}>
                  <p>{formatPriceWithVND(selectedOrderRentDetail.cocMoney)}</p>
                </p>
              </div>
            </Form.Item>
            <hr />
            <h3>Thông tin sản phẩm</h3>
            <hr />
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
              name="categoryName" //lấy value của cái name gán lên cái setFormValue
              initialValue={selectedProduct && selectedProduct.categoryName}
            >
              <div style={{ display: "flex" }}>
                <strong>Nghành Hàng:</strong>
                <p style={{ marginLeft: "10px" }}>
                  {selectedProduct && selectedProduct.categoryName}
                </p>
              </div>
            </Form.Item>

            <Form.Item
              name="productCondition" //lấy value của cái name gán lên cái setFormValue
              initialValue={selectedProduct && selectedProduct.productCondition}
            >
              <div style={{ display: "flex" }}>
                <strong>Tình trạng sản phẩm:</strong>
                <p style={{ marginLeft: "10px" }}>
                  {selectedProduct && selectedProduct.productCondition}%
                </p>
              </div>
            </Form.Item>

            <Form.Item
              name="description"
              initialValue={selectedProduct && selectedProduct.description}
            >
              <div style={{ display: "flex" }}>
                <strong>Mô tả:</strong>
                <p
                  style={{
                    marginLeft: "10px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "300px",
                  }}
                >
                  {selectedProduct && selectedProduct.description}
                </p>
              </div>
            </Form.Item>
            {/* Set điều kiện để hiện thị theo category */}
            {selectedProduct && selectedProduct.categoryName === "Watch" && (
              <>
                <Form.Item
                  name="brandNameWatch"
                  initialValue={
                    selectedProduct && selectedProduct.brandNameWatch
                  }
                >
                  <div style={{ display: "flex" }}>
                    <strong>Thương hiệu:</strong>
                    <p style={{ marginLeft: "10px" }}>
                      {selectedProduct && selectedProduct.brandNameWatch}
                    </p>
                  </div>
                </Form.Item>
                <Form.Item
                  name="clockFaceWatch"
                  initialValue={
                    selectedProduct && selectedProduct.clockFaceWatch
                  }
                >
                  <div style={{ display: "flex" }}>
                    <strong>Mặt đồng hồ:</strong>
                    <p style={{ marginLeft: "10px" }}>
                      {selectedProduct && selectedProduct.clockFaceWatch}
                    </p>
                  </div>
                </Form.Item>
                <Form.Item
                  name="strapMaterialWatch"
                  initialValue={
                    selectedProduct && selectedProduct.strapMaterialWatch
                  }
                >
                  <div style={{ display: "flex" }}>
                    <strong>Chất liệu dây đeo:</strong>
                    <p style={{ marginLeft: "10px" }}>
                      {selectedProduct && selectedProduct.strapMaterialWatch}
                    </p>
                  </div>
                </Form.Item>
                <Form.Item
                  name="originWatch"
                  initialValue={selectedProduct && selectedProduct.originWatch}
                >
                  <div style={{ display: "flex" }}>
                    <strong>Xuất sứ:</strong>
                    <p style={{ marginLeft: "10px" }}>
                      {selectedProduct && selectedProduct.originWatch}
                    </p>
                  </div>
                </Form.Item>
              </>
            )}
            {selectedProduct &&
              selectedProduct.categoryName === "Sunglasses" && (
                <>
                  <Form.Item
                    name="brandNameGlasses"
                    initialValue={
                      selectedProduct && selectedProduct.brandNameGlasses
                    }
                  >
                    <div style={{ display: "flex" }}>
                      <strong>Thương hiệu:</strong>
                      <p style={{ marginLeft: "10px" }}>
                        {selectedProduct && selectedProduct.brandNameGlasses}
                      </p>
                    </div>
                  </Form.Item>
                  <Form.Item
                    name="glassMaterial"
                    initialValue={
                      selectedProduct && selectedProduct.glassMaterial
                    }
                  >
                    <div style={{ display: "flex" }}>
                      <strong>Chất liệu khung kính:</strong>
                      <p style={{ marginLeft: "10px" }}>
                        {selectedProduct && selectedProduct.glassMaterial}
                      </p>
                    </div>
                  </Form.Item>

                  <Form.Item
                    name="typeLensGlasses"
                    initialValue={
                      selectedProduct && selectedProduct.typeLensGlasses
                    }
                  >
                    <div style={{ display: "flex" }}>
                      <strong>Loại lens:</strong>
                      <p style={{ marginLeft: "10px" }}>
                        {selectedProduct && selectedProduct.typeLensGlasses}
                      </p>
                    </div>
                  </Form.Item>
                  <Form.Item
                    name="glassShape"
                    initialValue={selectedProduct && selectedProduct.glassShape}
                  >
                    <div style={{ display: "flex" }}>
                      <strong>Hình dạng khung kính:</strong>
                      <p style={{ marginLeft: "10px" }}>
                        {selectedProduct && selectedProduct.glassShape}
                      </p>
                    </div>
                  </Form.Item>
                </>
              )}

            {selectedProduct && selectedProduct.categoryName === "Hat" && (
              <>
                <Form.Item
                  name="brandNameHat"
                  initialValue={selectedProduct && selectedProduct.brandNameHat}
                >
                  <div style={{ display: "flex" }}>
                    <strong>Thương hiệu:</strong>
                    <p style={{ marginLeft: "10px" }}>
                      {selectedProduct && selectedProduct.brandNameHat}
                    </p>
                  </div>
                </Form.Item>
                <Form.Item
                  name="materialHat"
                  initialValue={selectedProduct && selectedProduct.materialHat}
                >
                  <div style={{ display: "flex" }}>
                    <strong>Chất liệu:</strong>
                    <p style={{ marginLeft: "10px" }}>
                      {selectedProduct && selectedProduct.materialHat}
                    </p>
                  </div>
                </Form.Item>

                <Form.Item
                  name="typeHat"
                  initialValue={selectedProduct && selectedProduct.typeHat}
                >
                  <div style={{ display: "flex" }}>
                    <strong>Kiểu nón:</strong>
                    <p style={{ marginLeft: "10px" }}>
                      {selectedProduct && selectedProduct.typeHat}
                    </p>
                  </div>
                </Form.Item>
                <Form.Item
                  name="originHat"
                  initialValue={selectedProduct && selectedProduct.originHat}
                >
                  <div style={{ display: "flex" }}>
                    <strong>Xuất xứ:</strong>
                    <p style={{ marginLeft: "10px" }}>
                      {selectedProduct && selectedProduct.originHat}
                    </p>
                  </div>
                </Form.Item>
              </>
            )}

            {selectedProduct && selectedProduct.categoryName === "Jewelry" && (
              <>
                <Form.Item
                  name="brandNameJewelry"
                  initialValue={
                    selectedProduct && selectedProduct.brandNameJewelry
                  }
                >
                  <div style={{ display: "flex" }}>
                    <strong>Thương hiệu:</strong>
                    <p style={{ marginLeft: "10px" }}>
                      {selectedProduct && selectedProduct.brandNameJewelry}
                    </p>
                  </div>
                </Form.Item>
                <Form.Item
                  name="typeJewelrys"
                  initialValue={selectedProduct && selectedProduct.typeJewelrys}
                >
                  <div style={{ display: "flex" }}>
                    <strong>Chất liệu khung kính:</strong>
                    <p style={{ marginLeft: "10px" }}>
                      {selectedProduct && selectedProduct.typeJewelrys}
                    </p>
                  </div>
                </Form.Item>

                <Form.Item
                  name="occasion"
                  initialValue={selectedProduct && selectedProduct.occasion}
                >
                  <div style={{ display: "flex" }}>
                    <strong>Dịp:</strong>
                    <p style={{ marginLeft: "10px" }}>
                      {selectedProduct && selectedProduct.occasion}
                    </p>
                  </div>
                </Form.Item>
                <Form.Item
                  name="originJewelry"
                  initialValue={
                    selectedProduct && selectedProduct.originJewelry
                  }
                >
                  <div style={{ display: "flex" }}>
                    <strong>Xuất xứ:</strong>
                    <p style={{ marginLeft: "10px" }}>
                      {selectedProduct && selectedProduct.originJewelry}
                    </p>
                  </div>
                </Form.Item>
              </>
            )}
            {selectedProduct && selectedProduct.categoryName === "Shoe" && (
              <>
                <Form.Item
                  name="brandNameShoe"
                  initialValue={
                    selectedProduct && selectedProduct.brandNameShoe
                  }
                >
                  <div style={{ display: "flex" }}>
                    <strong>Thương hiệu:</strong>
                    <p style={{ marginLeft: "10px" }}>
                      {selectedProduct && selectedProduct.brandNameShoe}
                    </p>
                  </div>
                </Form.Item>
                <Form.Item
                  name="typeSkinShoe"
                  initialValue={selectedProduct && selectedProduct.typeSkinShoe}
                >
                  <div style={{ display: "flex" }}>
                    <strong>Loại da:</strong>
                    <p style={{ marginLeft: "10px" }}>
                      {selectedProduct && selectedProduct.typeSkinShoe}
                    </p>
                  </div>
                </Form.Item>

                <Form.Item
                  name="outsideSkin"
                  initialValue={selectedProduct && selectedProduct.outsideSkin}
                >
                  <div style={{ display: "flex" }}>
                    <strong>Da ngoài:</strong>
                    <p style={{ marginLeft: "10px" }}>
                      {selectedProduct && selectedProduct.outsideSkin}
                    </p>
                  </div>
                </Form.Item>
                <Form.Item
                  name="originShoe"
                  initialValue={selectedProduct && selectedProduct.originShoe}
                >
                  <div style={{ display: "flex" }}>
                    <strong>Xuất xứ:</strong>
                    <p style={{ marginLeft: "10px" }}>
                      {selectedProduct && selectedProduct.originShoe}
                    </p>
                  </div>
                </Form.Item>
              </>
            )}
            {selectedProduct && selectedProduct.categoryName === "Bag" && (
              <>
                <Form.Item
                  name="brandNameBag"
                  initialValue={selectedProduct && selectedProduct.brandNameBag}
                >
                  <div style={{ display: "flex" }}>
                    <strong>Thương hiệu:</strong>
                    <p style={{ marginLeft: "10px" }}>
                      {selectedProduct && selectedProduct.brandNameBag}
                    </p>
                  </div>
                </Form.Item>
                <Form.Item
                  name="skinTexture"
                  initialValue={selectedProduct && selectedProduct.skinTexture}
                >
                  <div style={{ display: "flex" }}>
                    <strong>Kết cấu da:</strong>
                    <p style={{ marginLeft: "10px" }}>
                      {selectedProduct && selectedProduct.skinTexture}
                    </p>
                  </div>
                </Form.Item>

                <Form.Item
                  name="typeSkinBag"
                  initialValue={selectedProduct && selectedProduct.typeSkinBag}
                >
                  <div style={{ display: "flex" }}>
                    <strong>Loại da:</strong>
                    <p style={{ marginLeft: "10px" }}>
                      {selectedProduct && selectedProduct.typeSkinBag}
                    </p>
                  </div>
                </Form.Item>
                <Form.Item
                  name="originBag"
                  initialValue={selectedProduct && selectedProduct.originBag}
                >
                  <div style={{ display: "flex" }}>
                    <strong>Xuất xứ:</strong>
                    <p style={{ marginLeft: "10px" }}>
                      {selectedProduct && selectedProduct.originBag}
                    </p>
                  </div>
                </Form.Item>
              </>
            )}
            {/* ======================================================================== */}
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
export default ProductOrderRent;
