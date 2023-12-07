import React, { useRef, useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Space,
  Upload,
  notification,
} from "antd";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { setUpRecaptha, storage } from "../../firebase/firebase";
import { v4 } from "uuid";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import PhoneInput from "react-phone-number-input";

function VerifyProductOwner() {
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const [urlImage, setUrlImage] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [otp, setOtp] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const recaptchaContainerRef = useRef();
  const handleFileChange = (event) => {
    if (event.file) {
      const imageRef = ref(storage, `images/${event.file.name + v4()}`);
      uploadBytes(imageRef, event.file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setUrlImage(url);
        });
      });
    }
  };

  const updateAccountStatus = (accountID, status) => {
    const url = `http://fashionrental.online:8080/account/updatestatus?accountID=${accountID}&status=${status}`;

    axios
      .put(url)
      .then((response) => {
        console.log("Account status updated:", response.data);
      })
      .catch((error) => {
        console.error("Error updating account status:", error);
      });
  };

  const onFinish = async (values) => {
    setError("");

    if (values.phone === "" || values.phone === undefined) {
      return setError("Please enter a valid phone number!");
    } else {
      try {
        const response = await setUpRecaptha(values.phone);
        setResult(response);
        setPhone(values.phone);
        setPhone(values.phone);
        setFullName(values.fullName);
        setAddress(values.address);

        setUrlImage(urlImage);
        setIsModalOpen(true);
      } catch (err) {
        setError(err.message);
      }
    }
  };
  const handleOk = async () => {
    if (otp === "" || otp === null) return;

    try {
      const response = await result.confirm(otp);
      if (response.operationType == "signIn") {
        console.log("dung ne");
        const createPO = {
          accountID: localStorage.getItem("accountId"),
          fullName: fullName,
          address: address,
          phone: phone,
          avatarUrl: urlImage,
        };
        updateAccountStatus(createPO.accountID, "VERIFIED");
        axios
          .post("http://fashionrental.online:8080/po/sign-up", createPO)
          .then((response) => {
            if (
              response.data.message === "Created Fail By Email Already Existed"
            ) {
              api["error"]({
                message: "Tài Khoản Này Đã Được Xác Thực",
                description: "Thông báo tài khoản đã tồn tại",
                duration: 1500,
              });
            } else {
              console.log("Staff member created:", response.data);
              api["success"]({
                message: "Xác Thực Thành Công!",
                description: "Chúc mừng bạn đã đăng ký thành công",
                duration: 1500,
              });
              window.location.reload();
            }
          })
          .catch((error) => {
            console.error("Created Fail By Email Already Existed:", error);
            api["error"]({
              message: "Xác Thực Thất Bại!",
              description: "Bạn đã xác thực thất bại",
              duration: 1500,
            });
          });
        // setIsModalOpen(false);
      }
    } catch (err) {
      setError(err.message);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
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
      <Modal
        title="Nhập OTP"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Xác Nhận"
        cancelText="Hủy"
      >
        <Input onChange={(e) => setOtp(e.target.value)} />
      </Modal>
      <Space direction="vertical" size={16}>
        {contextHolder}

        <Card
          title={<div style={{ textAlign: "center" }}>Xác Thực Tài Khoản</div>}
          style={{
            width: 500,
            marginBottom: "100px ",
          }}
        >
          <Form form={form} onFinish={onFinish}>
            {" "}
            <p>Họ và tên:</p>
            <Form.Item
              name={"fullName"}
              rules={[{ required: true, message: "Không được để trống!" }]}
            >
              <Input placeholder="Vui lòng nhập..." />
            </Form.Item>
            <p>Số điện thoại:</p>
            <Form.Item
              name={"phone"}
              rules={[{ required: true, message: "Không được để trống!" }]}
            >
              <Input placeholder="Vui lòng nhập..." />
            </Form.Item>
            <p>Địa chỉ:</p>
            <Form.Item
              name={"address"}
              rules={[{ required: true, message: "Không được để trống!" }]}
            >
              <Input placeholder="Vui lòng nhập..." />
            </Form.Item>
            <p>Chọn ảnh đại diện:</p>
            <Form.Item
              name="avatarUrl"
              rules={[
                { required: true, message: "Vui lòng chọn ảnh đại diện!" },
              ]}
              style={{ textAlign: "center" }}
            >
              <div className="select-image">
                <Upload
                  label="Hình đại diện"
                  name="avatarUrl"
                  maxCount={1}
                  onChange={handleFileChange}
                  beforeUpload={() => false}
                >
                  <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                </Upload>
              </div>
            </Form.Item>
            <Form.Item style={{ textAlign: "center" }}>
              <Button
                style={{
                  backgroundColor: "green",
                  color: "white",
                }}
                htmlType="submit"
              >
                Xác Thực
              </Button>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div id="recaptcha-container" ref={recaptchaContainerRef} />
              </div>
            </Form.Item>
          </Form>
        </Card>
      </Space>
    </div>
  );
}

export default VerifyProductOwner;
