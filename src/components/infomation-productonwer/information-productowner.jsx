import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Drawer,
  Form,
  Input,
  Upload,
  notification,
} from "antd";
import {
  SettingOutlined,
  UploadOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { storage } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import axios from "axios";
import Meta from "antd/es/card/Meta";

const InformationPO = () => {
  const [api, contextHolder] = notification.useNotification();
  const idAccount = localStorage.getItem("accountId");
  const [productowner, setProductOwner] = useState([]);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [urlImage, setUrlImage] = useState("");

  const fetchProductOwner = async () => {
    try {
      const response = await axios.get(
        "http://fashionrental.online:8080/account/" + idAccount
      );
      setProductOwner(response.data.data.productowner);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProductOwner();
  }, []);

  const editUser = async () => {
    form.validateFields().then((values) => {
      const editData = {
        address: values.address,
        avatarUrl: urlImage,
        fullName: values.fullName,
      };

      try {
        axios
          .put(
            `http://fashionrental.online:8080/po?productownerID=` +
              productowner.productownerID,
            editData
          )
          .then((response) => {
            api["success"]({
              message: "Chỉnh Sửa Thành Công",
              description: null,
            });
            setProductOwner((prevProductOwner) => ({
              ...prevProductOwner,
              ...editData,
            }));
          });
      } catch (error) {
        api["error"]({
          message: "Chỉnh Sửa Không Thành Công",
          description: null,
        });
        console.log(error);
      }

      onClose();
    });
  };

  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const showDrawer = (productonwer) => {
    setOpen(true);
    form.setFieldsValue(productonwer);
    setIsDrawerVisible(true);
    setUrlImage(productonwer.avatarUrl);
  };
  const onClose = () => {
    setOpen(false);
    form.resetFields();
    setIsDrawerVisible(false);
  };

  const handleFileChange = (event) => {
    if (event.file.status !== "removed" && event.file) {
      const imageRef = ref(storage, `images/${event.file.name + v4()}`);

      uploadBytes(imageRef, event.file)
        .then((snapshot) => getDownloadURL(snapshot.ref))
        .then((url) => {
          if (url !== productowner.avatarUrl) {
            setUrlImage(url);
          }
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    } else {
      setUrlImage(productowner.avatarUrl);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        height: "100vh",
      }}
    >
      {contextHolder}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <h2>Thông tin cơ bản</h2>
        <>
          <Button onClick={() => showDrawer(productowner)}>
            Chỉnh sửa <SettingOutlined />
          </Button>
          <Drawer
            title="Chỉnh sửa thông tin"
            placement="right"
            visible={isDrawerVisible}
            onClose={onClose}
            open={open}
          >
            <Form form={form} style={{ padding: "5px" }}>
              <p>Họ và Tên:</p>
              <Form.Item
                name="fullName"
                rules={[
                  { required: true, message: "Xin vui lòng nhập Họ và Tên!" },
                  {
                    pattern: /^[^\d]+$/,
                    message: "Không được nhập số!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <p>Số Điện Thoại:</p>
              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Xin vui lòng nhập số điện thoại!",
                  },
                ]}
              >
                <Input readOnly disabled />
              </Form.Item>
              <p>Địa Chỉ:</p>
              <Form.Item
                name="address"
                rules={[
                  { required: true, message: "Xin vui lòng nhập địa chỉ!" },
                ]}
              >
                <Input />
              </Form.Item>
              <p>Ảnh Đại Diện:</p>
              <Form.Item>
                <Upload
                  maxCount={1}
                  onChange={handleFileChange}
                  beforeUpload={() => false}
                >
                  <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                </Upload>
              </Form.Item>
              <Form.Item>
                <Button
                  style={{
                    backgroundColor: "#008000",
                    color: "#fff",
                    width: "100%",
                  }}
                  onClick={editUser}
                  disabled={!urlImage}
                >
                  Chỉnh sửa
                </Button>
              </Form.Item>
              <Form.Item name="roleID">
                <Input style={{ display: "none" }} />
              </Form.Item>
            </Form>
          </Drawer>
        </>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Card>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px",
              backgroundColor: "#f0f0f0",
            }}
          >
            <div>
              <Avatar
                shape="square"
                alt="avatar"
                src={
                  productowner?.avatarUrl
                    ? productowner.avatarUrl
                    : "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
                }
                style={{
                  width: "200px", // Increase the width of the avatar
                  height: "200px", // Increase the height of the avatar

                  marginRight: "16px",
                }}
              />
              {/* <EditOutlined onClick={() => showDrawer(productowner)} /> */}
            </div>
            <div style={{ padding: "16px" }}>
              <Meta
                title={
                  <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                    {productowner?.fullName ? productowner.fullName : null}
                  </p>
                }
                description={
                  <div>
                    {productowner?.phone ? (
                      <p style={{ fontSize: "18px", fontWeight: "bold" }}>
                        Số Điện Thoại: {productowner.phone}
                      </p>
                    ) : null}
                    <br />
                    {productowner?.address ? (
                      <p style={{ fontSize: "18px", fontWeight: "bold" }}>
                        Địa chỉ: {productowner.address}
                      </p>
                    ) : null}
                  </div>
                }
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default InformationPO;
