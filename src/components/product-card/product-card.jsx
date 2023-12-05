import { EyeOutlined, CommentOutlined } from "@ant-design/icons";
import {
  Card,
  Col,
  Form,
  Image,
  Modal,
  notification,
  Row,
  Switch,
  Badge,
  Table,
  Rate,
} from "antd";
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
  const [selectedProductDetail, setSelectedProductDetail] = useState([]);
  const productownerId = localStorage.getItem("productownerId");
  const idAccount = localStorage.getItem("accountId");
  const [productData, setProductData] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [productImage, setProductImage] = useState();
  const [productRentPrice, setProductRentPrice] = useState([]);
  const [showFullText, setShowFullText] = useState(false);
  const [showFullFeedback, setShowFullFeedback] = useState(false);

  //showModalFeedback
  const handleShowFeedback = () => {
    setShowFullFeedback(true);
  };

  const handleModalCloseFeedback = () => {
    setShowFullFeedback(false);
  };
  // showModal xem quy định
  const handleShowMore = () => {
    setShowFullText(true);
  };

  const handleModalClose = () => {
    setShowFullText(false);
  };

  //chuyen doi thanh dang tien te vnd ------------------------------------------------------
  const formatPriceWithVND = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  //-------------------------------------------------------------------------------------------------

  //-------------------------SWITCH-----------------------------------
  const onChange = async (checked, productID) => {
    console.log(`Bật/Tắt: ${checked}`);

    if (checked === true) {
      try {
        const response = await axios.put(
          `http://fashionrental.online:8080/product?productID=${productID}&status=AVAILABLE`
        );

        api["success"]({
          message: "Cập Nhật Trạng Thái Thành Công!",
          description: `Bật sản phẩm ${response.data.productName} thành công!!!`,
        });

        fetchProducts();
        console.log("Bật true hoàn tất!!!", response);
      } catch (error) {
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message;

          if (errorMessage === "This Product is Not Approved") {
            api["error"]({
              message: "Cập Nhật Thất Bại!",
              description: "Sản phẩm chưa được phê duyệt!",
            });
          } else if (errorMessage === "Product Is SoldOut!") {
            api["error"]({
              message: "Không Thể Cập Nhật!",
              description: "Sản phẩm đang được bán!",
            });
          } else if (
            errorMessage === "Product is Renting you cannot updated status"
          ) {
            api["error"]({
              message: "Không Thể Cập Nhật",
              description: "Sản phẩm đang được thuê!",
            });
          } else {
            api["error"]({
              message: "Cập Nhật Thất Bại!",
              description: null,
            });
          }

          console.log(error);
        }
      }
    } else if (checked === false) {
      try {
        const response = await axios.put(
          `http://fashionrental.online:8080/product?productID=${productID}&status=BLOCKED`
        );

        api["success"]({
          message: "Cập Nhật Trạng Thái Thành Công!",
          description: `Tắt sản phẩm ${response.data.productName} thành công!!!`,
        });

        fetchProducts();
        console.log("Tắt false hoàn tất!!!", response);
      } catch (error) {
        if (error.response && error.response.data) {
          console.log(error);
        }
      }
    }
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
  const [productFeedback, setProductFeedback] = useState([]);
  const [productFeedbackImg, setProductFeedbackImg] = useState([]);
  const showModalFeedback = (productData) => {
    setShowFullFeedback(true);
    const fetchProductFeedback = async () => {
      try {
        const response = await axios.get(
          "http://fashionrental.online:8080/feedback/" + productData.productID
        );
        setProductFeedback(response.data);
        console.log("Product Feedback", response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProductFeedback();
  };

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
    const fetchProductRentPrice = async () => {
      try {
        const response = await axios.get(
          "http://fashionrental.online:8080/rentprice/" + productData.productID
        );
        const filteredData = response.data.map((item) => ({
          mockDay: item.mockDay,
          rentPrice: item.rentPrice,
        }));

        setProductRentPrice(filteredData);
        console.log(filteredData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductRentPrice();
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
      term: productData.term,
      serialNumber: productData.serialNumber,
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
      requestDescription: productData.requestDTO.description,
      requestStatus: productData.requestDTO.status,
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
    setSelectedProductDetail(productData.details);
    console.log("product detail: ", selectedProductDetail);
    setSelectedProduct({
      term: productData.term,
      serialNumber: productData.serialNumber,
      requestStatus: productData.requestDTO.status,
      requestDescription: productData.requestDTO.description,
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
  const formatDate = (inputDate) => {
    const date = new Date(inputDate);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  };
  const handleCancel = () => {
    setIsModalVisible(false);

    form.resetFields();
  };
  const onFinish = (values) => {
    console.log("Received values:", values);

    setFormData(values);

    handleCancel();
  };
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const columns = [
    {
      title: "Số ngày thuê",
      dataIndex: "mockDay",
      key: "mockDay",
      width: "30%",
      render: (number) => <p style={{ textAlign: "left" }}>{Number(number)}</p>,
    },
    {
      title: "Giá thuê",
      dataIndex: "rentPrice",
      key: "rentPrice",
      width: "50%",
      render: (text) => (
        <p style={{ textAlign: "left" }}>{formatPriceWithVND(text)}</p>
      ),
    },
  ];
  const translateCategoryName = (categoryName) => {
    const categoryMappings = {
      Watch: "Đồng hồ",
      Bag: "Túi",
      Hat: "Nón",
      Jewelry: "Trang Sức",
      Shoe: "Giày",
      Sunglasses: "Mắt kính",
    };
    return categoryMappings[categoryName] || categoryName;
  };
  const feedbackElements = productFeedback.map((feedback, index) => (
    <div key={index} style={{ marginBottom: "20px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <img
          src={feedback.customerDTO.avatarUrl}
          alt="Avatar"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            marginRight: "10px",
          }}
        />
        <div>
          <div style={{ display: "flex" }}>
            <p style={{ fontWeight: "bold", marginRight: "5px" }}>
              {feedback.customerDTO.fullName}
            </p>
            <p style={{ color: "#888", margin: "0" }}>
              {formatDate(feedback.createdtDate)}
            </p>
          </div>
          <div>
            <Rate allowHalf defaultValue={feedback.ratingPoint} disabled />
          </div>
        </div>
      </div>
      <div>
        <div>
          <p>{feedback.description}</p>
        </div>
        {feedback.imgDTOs && feedback.imgDTOs.length > 0 && (
          <div>
            <h5>Hình ảnh:</h5>
            <div style={{ display: "flex", gap: "8px" }}>
              {feedback.imgDTOs.map((imgSrc, index) => (
                <Image
                  key={index}
                  width={70}
                  src={imgSrc.imgUrl}
                  alt={`Hình ảnh ${index + 1}`}
                  style={{ marginRight: "50px" }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  ));

  const shouldDisplayReadMore =
    selectedProduct &&
    selectedProduct.term &&
    selectedProduct.term.length > 100;

  const truncatedTerm =
    selectedProduct && selectedProduct.term
      ? selectedProduct.term.length > 100
        ? selectedProduct.term.substring(0, 100) + "..."
        : selectedProduct.term
      : "Không có";

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
              hoverable
              bordered={true}
              style={{
                width: 230,
                position: "relative",
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
                <Switch
                  checked={
                    product.status == "AVAILABLE" || product.status == "WAITING"
                  }
                  onChange={(checked) => onChange(checked, product.productID)}
                  size="small"
                  style={{
                    backgroundColor:
                      product.status === "AVAILABLE"
                        ? "#4CAF50"
                        : product.status === "WAITING"
                        ? "#4CAF50"
                        : "#F5F5F5",

                    borderColor:
                      product.status === "AVAILABLE"
                        ? "#4CAF50"
                        : product.status === "WAITING"
                        ? "#4CAF50"
                        : "#D3D3D3",
                  }}
                />,
                <EyeOutlined key="edit" onClick={() => showModal(product)} />,
                <CommentOutlined onClick={() => showModalFeedback(product)} />,
              ]}
            >
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                }}
              >
                {product.status === "WAITING" && (
                  <Badge.Ribbon
                    text="Chờ duyệt"
                    color="yellow"
                    placement="end"
                  />
                )}
                {product.status === "SOLD_OUT" && (
                  <Badge.Ribbon text="Đã bán" color="red" placement="end" />
                )}
                {product.status === "AVAILABLE" && (
                  <Badge.Ribbon text="Có sẵn" color="green" placement="end" />
                )}
                {product.status === "BLOCKED" && (
                  <Badge.Ribbon text="Đã khóa" color="black" placement="end" />
                )}
                {product.status === "RENTING" && (
                  <Badge.Ribbon
                    text="Đang cho thuê"
                    color="rgb(45, 183, 245)"
                    placement="end"
                  />
                )}
              </div>

              <Meta
                title={product.productName}
                description={formatPriceWithVND(product.price)}
                style={{ textAlign: "center" }}
              />
            </Card>
          </Col>
        ))}
        <Modal
          title={<p style={{ textAlign: "center" }}>Chi tiết sản phẩm</p>}
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
            {selectedProduct &&
              selectedProduct.requestStatus === "NOT_APPROVED" && (
                <>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <p
                      style={{
                        color: "red",
                        fontStyle: "italic",
                        fontSize: "20px",
                        margin: 0,
                      }}
                    >
                      *Sản phẩm bị từ chối vì lý do:
                    </p>
                    <Form.Item
                      name="requestDescription"
                      initialValue={
                        selectedProduct && selectedProduct.requestDescription
                      }
                      style={{
                        color: "red",
                        fontStyle: "italic",
                        fontSize: "20px",
                        margin: 0,
                      }}
                    >
                      <span
                        style={{
                          color: "red",
                          fontStyle: "italic",
                          fontSize: "20px",
                          marginLeft: "5px",
                        }}
                      >
                        {selectedProduct && selectedProduct.requestDescription}
                      </span>
                    </Form.Item>
                  </div>
                </>
              )}
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
              name="categoryName"
              initialValue={selectedProduct && selectedProduct.categoryName}
            >
              <div style={{ display: "flex" }}>
                <strong>Nghành Hàng:</strong>
                <p style={{ marginLeft: "10px" }}>
                  {translateCategoryName(
                    selectedProduct && selectedProduct.categoryName
                  )}
                </p>
              </div>
            </Form.Item>

            <Form.Item
              name="serialNumber"
              initialValue={selectedProduct && selectedProduct.serialNumber}
            >
              <div style={{ display: "flex" }}>
                <strong>Số Seri sản phẩm:</strong>
                <p style={{ marginLeft: "10px" }}>
                  {selectedProduct && selectedProduct.serialNumber}
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
                    maxWidth: "400px",
                  }}
                >
                  {selectedProduct && selectedProduct.description}
                </p>
              </div>
            </Form.Item>

            <Form.Item
              name="term"
              initialValue={selectedProduct && selectedProduct.term}
            >
              <div style={{ display: "flex" }}>
                <strong style={{ minWidth: "65px" }}>Quy định: </strong>
                <p
                  style={{
                    marginLeft: "5px",
                    maxWidth: "400px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {/* {selectedProduct && selectedProduct.description} */}
                  {showFullText ? selectedProduct.term : truncatedTerm}
                </p>
                {shouldDisplayReadMore && (
                  <span
                    style={{
                      color: "blue",
                      cursor: "pointer",
                      marginLeft: "5px",
                      minWidth: "65px",
                      textDecoration: "underline",
                    }}
                    onClick={handleShowMore}
                  >
                    Xem thêm
                  </span>
                )}
              </div>
            </Form.Item>
            <Modal
              title={<p style={{ textAlign: "center" }}>Nội dung đầy đủ</p>}
              open={showFullText}
              onCancel={handleModalClose}
              footer={null}
              style={{
                maxHeight: "70vh",
                overflowY: "auto",
              }}
            >
              <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}>
                {selectedProduct && selectedProduct.term}
              </pre>
            </Modal>
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

            {selectedProductDetail && selectedProductDetail.length > 0 && (
              <>
                {/* Vòng lặp để render các detailName và value từ selectedProductDetail */}
                {selectedProductDetail.map((detail, index) => (
                  <React.Fragment key={index}>
                    <Form.Item
                      name={`detailName_${index}`}
                      initialValue={detail.detailName}
                    >
                      <div style={{ display: "flex" }}>
                        <strong>{detail.detailName}:</strong>
                        <p style={{ marginLeft: "10px" }}>{detail.value}</p>
                      </div>
                    </Form.Item>
                  </React.Fragment>
                ))}
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
              name="status"
              initialValue={selectedProduct && selectedProduct.status}
            >
              <div style={{ display: "flex" }}>
                <strong>Trạng thái:</strong>

                <p style={{ marginLeft: "10px" }}>
                  <RenderTag
                    key={selectedProduct && selectedProduct.productName}
                    tagRender={selectedProduct && selectedProduct.status}
                  />
                </p>
              </div>
            </Form.Item>
            {selectedProduct && selectedProduct.checkType === "RENT" && (
              <>
                <strong>Giá thuê:</strong>
                <Table
                  responsive
                  pagination={false}
                  bordered={true}
                  columns={columns}
                  dataSource={productRentPrice}
                />
              </>
            )}
            <Form.Item
              name="checkType"
              initialValue={selectedProduct && selectedProduct.checkType}
            >
              <div style={{ display: "flex" }}>
                <strong>Hình thức sản phẩm:</strong>

                <p style={{ marginLeft: "10px" }}>
                  <RenderTag
                    key={selectedProduct && selectedProduct.productName}
                    tagRender={selectedProduct && selectedProduct.checkType}
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

        <Modal
          title={<p style={{ textAlign: "center" }}>Nhận xét</p>}
          open={showFullFeedback}
          onCancel={handleModalCloseFeedback}
          footer={false}
          width={1000}
        >
          {productFeedback.length > 0 ? (
            feedbackElements
          ) : (
            <p>Chưa có nhận xét nào.</p>
          )}
        </Modal>
      </Row>
    </>
  );
};

export default ProductCard;
