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
} from "antd";
import "./style.css";
import { UploadOutlined } from "@ant-design/icons";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { storage } from "../../firebase/firebase";
import { v4 } from "uuid";
import axios from "axios";

const { Meta } = Card;

const ProfileStaff = (userHeaderInfo) => {
  const [loading, setLoading] = useState(false);
  const [urlImage, setUrlImage] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const [userInfo, setUserInfo] = useState(null);
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Notification Title",
      description: "Xác Thực Thành Công",
    });
  };
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
        // Handle the response from the server if needed
        console.log("Staff member created:", response.data);
        setUserInfo({
          fullName: response.data.fullName,
          avatarUrl: response.data.avatarUrl,
        });
        api["success"]({
          message: "Xác Thực Thành Công!",
          description: "Chúc mừng bạn đã đăng ký thành công",

          duration: 1800,
        });
        window.location.reload();
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error creating staff member:", error);
        api["error"]({
          message: "Xác Thực Thất Bại!",
          description: "Bạn đã xác thực thất bại",
          duration: 1800,
        });
      });
  };
  return (
    <Card className="profile-container">
      {contextHolder}
      <Form onFinish={onFinish}>
        <Form.Item>
          {userInfo && (
            <Meta
              avatar={<Avatar size={75} src={userInfo.avatarUrl} />}
              title={<div className="userName">{userInfo.fullName}</div>}
              description={<div className="userDescription">aaaaaaa</div>}
            />
          )}
        </Form.Item>

        <Form.Item name="avatarUrl">
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

        <Form.Item name="fullName">
          <div className="input-container">
            <Input placeholder="Họ và Tên" />
          </div>
        </Form.Item>

        <Form.Item>
          {loading ? ( // Nếu đang loading, hiển thị trạng thái loading
            <Spin />
          ) : (
            <div className="update-button">
              <Button type="primary" htmlType="submit">
                Xác Thực
              </Button>
            </div>
          )}
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ProfileStaff;
