import React, { useState } from "react";
import { Card, Avatar, Input, Upload, Button } from "antd";
import "./style.css";
import { UploadOutlined } from "@ant-design/icons";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { storage } from "../../firebase/firebase";
import { v4 } from "uuid";
import axios from "axios";

const { Meta } = Card;

const ProfileStaff = () => {
  const [urlImage, setUrlImage] = useState("");
  const [fullName, setFullName] = useState("");
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

  const handleUpdate = async () => {
    // Create an object with the data to be sent to the server
    const data = {
      avatarUrl: urlImage,
      fullName: fullName,
    };

    // Make a POST request to the server using Axios
    axios
      .post("http://fashionrental.online:8080/staff/createstaff", data)
      .then((response) => {
        // Handle the response from the server if needed
        console.log("Staff member created:", response.data);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error creating staff member:", error);
      });
  };
  return (
    <Card className="profile-container">
      <Meta
        avatar={<Avatar size={75} src="link_den_hinh_anh_dai_dien" />}
        title={<div className="user-name">Tên Người Dùng</div>}
        description={
          <div className="user-description">Mô tả cá nhân của bạn</div>
        }
      />
      <div className="input-container">
        <Input name="fullName" placeholder="Họ và Tên" />
      </div>
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
      <div className="update-button">
        <Button type="primary" onClick={handleUpdate}>
          Cập nhật
        </Button>
      </div>
    </Card>
  );
};

export default ProfileStaff;
