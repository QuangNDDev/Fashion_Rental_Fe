import React, { useState } from "react";
import {
  Card,
  Avatar,
  Input,
  Upload,
  Button,
  Form,
  Spin,
  notification,
  ConfigProvider,
} from "antd";
import "./style.css";
import { UploadOutlined } from "@ant-design/icons";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { storage } from "../../firebase/firebase";
import { v4 } from "uuid";
import axios from "axios";

const { Meta } = Card;

const ProfileStaff = () => {
  const [loading, setLoading] = useState(false);
  const [urlImage, setUrlImage] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const [userInfo, setUserInfo] = useState(null);

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
    setLoading(true);
    const url = `http://fashionrental.online:8080/account/updatestatus?accountID=${accountID}&status=${status}`;

    axios
      .put(url)
      .then((response) => {
        console.log("Account status updated:", response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error updating account status:", error);
        setLoading(false); // Ẩn loading khi xảy ra lỗi
      });
  };

  const onFinish = async (values) => {
    // Create an object with the data to be sent to the server
    const verifyData = {
      accountID: localStorage.getItem("accountId"),
      avatarUrl: urlImage,
      fullName: values.fullName,
    };

    updateAccountStatus(verifyData.accountID, "VERIFIED");
    // Make a POST request to the server using Axios
    axios
      .post("http://fashionrental.online:8080/staff/createstaff", verifyData)
      .then((response) => {
        if (response.data.message === "Created Fail By Email Already Existed") {
          // Xử lý trường hợp tài khoản đã tồn tại
          api["error"]({
            message: "Tài Khoản Này Đã Được Xác Thực",
            description: "Thông báo tài khoản đã tồn tại",
            duration: 1800,
          });
        } else {
          // Xử lý trường hợp tài khoản đã xác thực thành công
          console.log("Staff member created:", response.data);
          setUserInfo({
            fullName: response.data.fullName,
            avatarUrl: response.data.avatarUrl,
          });
          api["success"]({
            message: "Xác Thực Thành Công!",
            description: "Chúc mừng bạn đã xác thực thành công",
            duration: 1800,
          });
        }
        window.location.reload();
      })
      .catch((error) => {
        // Xử lý các lỗi khác
        console.error("Created Fail By Email Already Existed:", error);
        api["error"]({
          message: "Xác Thực Thất Bại!",
          description: "Bạn đã xác thực thất bại",
          duration: 1800,
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
      <Card
        className="profile-container"
        title={
          <div style={{ textAlign: "center", fontSize: "20px" }}>
            Xác Thực Tài Khoản
          </div>
        }
      >
        {contextHolder}
        <Form onFinish={onFinish}>
          <span>Họ và Tên:</span>
          <Form.Item
            name="fullName"
            rules={[{ required: true, message: "Vui lòng nhập Họ và Tên!" }]}
            style={{ textAlign: "center" }}
          >
            <div className="input-container">
              <ConfigProvider
                theme={{
                  token: {
                    Input: {
                      activeBorderColor: "#008000",
                      hoverBorderColor: "#008000",
                    },
                  },
                }}
              >
                <Input placeholder="Họ và Tên" />
              </ConfigProvider>
            </div>
          </Form.Item>
          <span>Chọn ảnh đại diện:</span>
          <Form.Item
            name="avatarUrl"
            rules={[{ required: true, message: "Vui lòng chọn ảnh đại diện!" }]}
          >
            <div className="select-image">
              <ConfigProvider
                theme={{
                  token: {
                    Button: {
                      // action: null, // hoặc action: undefined
                      // colorPrimary: "#008000",
                      colorPrimaryHover: "#008000",
                    },
                  },
                }}
              >
                <Upload
                  label="Hình đại diện"
                  name="avatarUrl"
                  maxCount={1}
                  onChange={handleFileChange}
                  beforeUpload={() => false}
                >
                  <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                </Upload>
              </ConfigProvider>
            </div>
          </Form.Item>

          <Form.Item style={{ textAlign: "center" }}>
            {loading ? ( // Nếu đang loading, hiển thị trạng thái loading
              <Spin />
            ) : (
              <div className="update-button">
                <Button
                  style={{ backgroundColor: "#008000" }}
                  type="primary"
                  htmlType="submit"
                >
                  Xác Thực
                </Button>
              </div>
            )}
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ProfileStaff;
