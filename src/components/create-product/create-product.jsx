import "./create-product.css";
import React, { useEffect, useState } from "react";
import { storage } from "../../firebase/firebase";
import {
  Button,
  Upload,
  Modal,
  Input,
  Tooltip,
  Select,
  Space,
  Form,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const CreateProduct = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [urlImages, setUrlImages] = useState([]);
  const [urlReceiptImage, setUrlReceiptImage] = useState("");
  const [value, setValue] = useState("");
  const handleCancel = () => setPreviewOpen(false);
  const [checkType, setCheckType] = useState("SALE");
  const [checkCategory, setCheckCategory] = useState(""); // Giá trị mặc định của cái select
  const [categorys, setCategorys] = useState();
  const productownerId = localStorage.getItem("productownerId");
  const fetchCategorys = async () => {
    try {
      const response = await axios.get(
        "http://fashionrental.online:8080/category/getall"
      );

      setCategorys(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategorys();
  }, []);
  //------------------------regex chỉ được nhập số---------------------

  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleInputChange = (e) => {
    const { value } = e.target;
    // Sử dụng regex để chỉ chấp nhận số
    const regex = /^[0-9]*$/;

    if (regex.test(value)) {
      setInputValue(value);
    }
  };
  //-------------------------------------------------------------------

  const onFinish = async (values) => {
    const productSpecificationData = {
      madeOf: values.madeOf,
      brandName: values.brandName,
    };
    const addProductData = {
      checkType: checkType,
      description: values.description,
      price: values.price,
      productAvt: urlImages.length > 0 ? urlImages[0].imgUrl : "",
      productName: values.productName,
      productSpecificationData: JSON.stringify(productSpecificationData),
      productReceiptUrl: urlReceiptImage,
      categoryID: checkCategory,
      status: "WAITING",
      productownerID: productownerId,
    };

    try {
      const response = await axios.post(
        "http://fashionrental.online:8080/product/create",
        addProductData
      );

      message.success("Thêm sản phẩm mới thành công!");
      console.log("Registration successful", response.data);
      if (response.data.checkType === "RENT" || response.data.checkType === "SALE_RENT") {
        // Gọi API khi checkType là "RENT" hoặc "SALE_RENT"
        const formRentPrice = {
          productID: response.data.productID,
          rentPrice1:values.rentPrice1,
          rentPrice4:values.rentPrice4,
          rentPrice7:values.rentPrice7,
          rentPrice10:values.rentPrice10,
          rentPrice14:values.rentPrice14,
        }
        try {
          const rentPriceResponse = await axios.post(
            "http://fashionrental.online:8080/rentprice/create",
            formRentPrice
          );
  
          console.log("Rent price Success!!");
          console.log(rentPriceResponse.data);
        } catch (error) {
          console.error("Error rent price:", error);
        }
      }
      const formRequest = {
        productID: response.data.productID
      }
      try {
        const requestResponse = await axios.post(
          "http://fashionrental.online:8080/request",
          formRequest
        );

        console.log("Request Success!!");
        console.log(requestResponse.data);
      } catch (error) {
        console.error("Error request:", error);
      }
      const formData = {
        imgUrl: urlImages.map((image) => image.imgUrl),
        productID: response.data.productID,
      };
      try {
        const imgResponse = await axios.post(
          "http://fashionrental.online:8080/productimg",
          formData
        );

        console.log("Img Success!!");
        console.log(imgResponse.data);
      } catch (error) {
        console.error("Error uploading images:", error);
      }
    } catch (error) {
      console.error("Add new product failed", error);
    }

    console.log(addProductData);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  useEffect(() => {
    console.log(urlImages);
  }, [urlImages]);
  const handleFileChange = async (event) => {
    try {
      if (event.file.status !== "removed") {
        console.log("handleFileChange called");
        console.log("File selected:", event.file);
        const file = event.file;
        const imageRef = ref(storage, `images/${file.name + v4()}`);
        const snapshot = await uploadBytes(imageRef, file.originFileObj);
        const url = await getDownloadURL(snapshot.ref);

        setUrlImages((prevUrls) => [
          ...prevUrls,
          { imgUrl: url, fileName: event.file.name },
        ]);
      } else {
        setUrlImages((prevUrls) =>
          prevUrls.filter((item) => item.fileName !== event.file.name)
        );
        console.log("File removed:", event.file);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const handleFileChangeReceipt = async (event) => {
    try {
      if (event.file.status !== "removed") {
        const file = event.file;
        const imageRef = ref(storage, `images/${file.name + v4()}`);
        const snapshot = await uploadBytes(imageRef, file.originFileObj);
        const url = await getDownloadURL(snapshot.ref);

        setUrlReceiptImage(url);
      } else {
        setUrlReceiptImage("");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  //ham select ------------------------------------------------------------------------
  const selectChange = (value) => {
    console.log(`Đã chọn giá trị ${value}`);
    setCheckType(value);
  };
  const selectChangeCategory = (value) => {
    console.log(`Đã chọn giá trị ${value}`);
    setCheckCategory(value);
  };
  //-----------------------------------------------------------------------------------
  const formatNumber = (value) => new Intl.NumberFormat().format(value);
  const NumericInput = (props) => {
    const { value, onChange } = props;
    const handleChange = (e) => {
      const { value: inputValue } = e.target;
      const reg = /^-?\d*(\.\d*)?$/;
      if (reg.test(inputValue) || inputValue === "" || inputValue === "-") {
        onChange(inputValue);
      }
    };
    const handleBlur = () => {
      let valueTemp = value;
      if (value.charAt(value.length - 1) === "." || value === "-") {
        valueTemp = value.slice(0, -1);
      }
      onChange(valueTemp.replace(/0*(\d+)/, "$1"));
    };
    const title = value ? (
      <span className="numeric-input-title">
        {value !== "-" ? formatNumber(Number(value)) : "-"}
      </span>
    ) : (
      "Nhập giá sản phẩm..."
    );

    return (
      <Tooltip
        trigger={["focus"]}
        title={title}
        placement="topLeft"
        overlayClassName="numeric-input"
      >
        <Input
          {...props}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Nhập giá sản phẩm..."
          maxLength={16}
        />
      </Tooltip>
    );
  };

  return (
    <div style={{ backgroundColor: "#f9f9f9" }}>
      <div className="section-title">Thông tin sản phẩm</div>
      <Form onFinish={onFinish}>
        <div className="product-details">
          <div className="name">
            <span>Tên sản phẩm:</span>
            <Form.Item name={"productName"}>
              <Input placeholder="Nhập tên sản phẩm..." />
            </Form.Item>
          </div>
          <div className="name">
            <span>Thương hiệu:</span>
            <Form.Item name={"brandName"}>
              <Input placeholder="Nhập tên thương hiệu..." />
            </Form.Item>
          </div>
          <div className="name">
            <span>Chất liệu:</span>
            <Form.Item name={"madeOf"}>
              <Input placeholder="Nhập chất liệu..." />
            </Form.Item>
          </div>
          <div className="description">
            <span>Mô tả sản phẩm:</span>
            <Form.Item name={"description"}>
              <TextArea rows={4} placeholder="Nhập mô tả sản phẩm..." />
            </Form.Item>
          </div>
          <div className="category">
            <span>Phân loại sản phẩm:</span>

            <Space wrap>
              <Select
                defaultValue="Chọn loại sản phẩm"
                style={{
                  width: 150,
                }}
                onChange={selectChangeCategory}
                options={
                  categorys &&
                  categorys.map((category) => ({
                    value: category.categoryID,
                    label: category.categoryName,
                  }))
                }
              />
            </Space>
          </div>
          <div className="rent-sale">
            <span>Cấu hình sản phẩm:</span>

            <Space wrap>
              <Select
                defaultValue="Chọn cấu hình sản phẩm"
                style={{
                  width: 150,
                }}
                onChange={selectChange}
                options={[
                  {
                    value: "SALE",
                    label: "Bán",
                  },
                  {
                    value: "RENT",
                    label: "Cho Thuê",
                  },
                  {
                    value: "SALE_RENT",
                    label: "Bán Và Cho Thuê",
                  },
                ]}
              />
            </Space>
          </div>
          <Form.Item
            name={"price"}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập giá!",
              },
            ]}
          >
            <div className="price">
              <span>Giá sản phẩm:</span>
              <Input
                suffix="VND"
                style={{ width: "11.6%" }}
                onChange={handleInputChange}
                value={inputValue}
              />
            </div>
          </Form.Item>

          {(checkType === "RENT" || checkType === "SALE_RENT") && (
            <div className="rent-price">
              <Form.Item name={"rentPrice1"}>
                <div className="rent-price__day">
                  <p style={{ fontWeight: "bold" }}>
                    Giá thuê sản phẩm 1 ngày:
                  </p>
                  <Input
                    prefix=""
                    suffix="VND"
                    style={{ width: "70%", marginRight: "30px" }}
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                </div>
              </Form.Item>
              <Form.Item name={"rentPrice4"}>
                <div className="rent-price__day">
                  <p style={{ fontWeight: "bold" }}>
                    Giá thuê sản phẩm 4 ngày:
                  </p>
                  <Input
                    suffix="VND"
                    style={{ width: "70%", marginRight: "30px" }}
                    onChange={handleInputChange}
                  />
                </div>
              </Form.Item>
              <Form.Item name={"rentPrice7"}>
                <div className="rent-price__day">
                  <p style={{ fontWeight: "bold" }}>
                    Giá thuê sản phẩm 7 ngày:
                  </p>
                  <Input
                    suffix="VND"
                    style={{ width: "70%", marginRight: "30px" }}
                    onChange={handleInputChange}
                  />
                </div>
              </Form.Item>
              <Form.Item name={"rentPrice10"}>
                <div className="rent-price__day">
                  <p style={{ fontWeight: "bold" }}>
                    Giá thuê sản phẩm 10 ngày:
                  </p>
                  <Input
                    suffix="VND"
                    style={{ width: "70%", marginRight: "30px" }}
                    onChange={handleInputChange}
                  />
                </div>
              </Form.Item>
              <Form.Item name={"rentPrice14"}>
                <div className="rent-price__day">
                  <p style={{ fontWeight: "bold" }}>
                    Giá thuê sản phẩm 14 ngày:
                  </p>
                  <Input
                    suffix="VND"
                    style={{ width: "70%", marginRight: "30px" }}
                    onChange={handleInputChange}
                  />
                </div>
              </Form.Item>
            </div>
          )}
          <Form.Item name={"productReceiptUrl"}>
            <div className="receipt">
              <span>Hoá đơn sản phẩm:</span>
              <Upload
                maxCount={1}
                onChange={handleFileChangeReceipt}
                onPreview={handlePreview}
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
              </Upload>
            </div>
          </Form.Item>

          <div className="image">
            <span>Hình ảnh sản phẩm:</span>
            <Form.Item name={"productAvt"}>
              <Upload
                maxCount={9}
                onChange={handleFileChange}
                onPreview={handlePreview}
                beforeUpload={() => false}
                multiple={true}
              >
                <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                <span
                  style={{
                    marginLeft: "20px",
                    fontStyle: "italic",
                    fontWeight: "normal",
                    color: "grey",
                  }}
                >
                  • Tối đa 9 ảnh
                </span>
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "20%",
                  backgroundColor: "green",
                }}
              >
                Thêm Sản Phẩm
              </Button>
            </Form.Item>

            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img
                alt="example"
                style={{
                  width: "100%",
                }}
                src={previewImage}
              />
            </Modal>
          </div>
        </div>
      </Form>
    </div>
  );
};
export default CreateProduct;
