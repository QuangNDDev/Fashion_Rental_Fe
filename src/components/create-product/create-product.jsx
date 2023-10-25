import "./create-product.css";
import React, { useEffect, useState } from "react";
import { storage } from "../../firebase/firebase";
import { Button, Upload, Modal, Input, Tooltip, Radio } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import TextArea from "antd/es/input/TextArea";
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
      <div className="product-details">
        <div className="name">
          <span>Tên sản phẩm:</span>
          <Input placeholder="Nhập tên sản phẩm..." />
        </div>
        <div className="description">
          <span>Mô tả sản phẩm:</span>
          <TextArea rows={4} placeholder="Nhập mô tả sản phẩm..." />
        </div>

        <div className="rent-sale">
          <span>Cấu hình sản phẩm:</span>

          <Radio value={true}>Bán</Radio>
          <Radio value={false}>Cho thuê</Radio>
        </div>

        <div className="price">
          <span>Giá sản phẩm:</span>
          <NumericInput
            style={{
              width: 250,
            }}
            value={value}
            onChange={setValue}
          />
        </div>

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

        <div className="image">
          <span>Hình ảnh sản phẩm:</span>

          <Upload
            maxCount={9}
            onChange={handleFileChange}
            onPreview={handlePreview}
            beforeUpload={() => false}
            multiple={true}
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
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
    </div>
  );
};
export default CreateProduct;