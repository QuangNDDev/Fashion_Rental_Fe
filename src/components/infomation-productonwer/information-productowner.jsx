import React, { useEffect, useState } from "react";
import { Button, Drawer, Form, Image, Input, InputNumber } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import axios from "axios";
const InformationPO = () => {
  const idAccount = localStorage.getItem("accountId");
  const [productowner, setProductOwner] = useState([]);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const fetchProductOwner = async () => {
    try {
      const response = await axios.get(
        "http://fashionrental.online:8080/account/getaccount?accountID=" +
          idAccount
      );
      setProductOwner(response.data.productowner);
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
        avatarUrl: values.avatarUrl,
        fullName: values.fullName,
        phone: values.phone,
      };
      console.log(editData);

      try {
        axios
          .put(
            `http://134.209.111.144:8080/po?productownerID=` +
              productowner.productownerID,
            editData
          )
          .then((response) => {
            console.log(response);
            setProductOwner((prevProductOwner) => ({
              ...prevProductOwner,
              ...editData,
            }));
          });
          
      } catch (error) {
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
    setEditingUser(productonwer);
   
  };
  const onClose = () => {
    setOpen(false);
    form.resetFields();
    setIsDrawerVisible(false);
  };
  return (
    <div style={{ justifyContent: "center" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2>Thông tin cơ bản</h2>
        <>
          <Button
            style={{ float: "right" }}
            onClick={() => showDrawer(productowner)}
          >
            Chỉnh sửa <SettingOutlined />
          </Button>
          <Drawer
            title="Chỉnh sửa thông tin"
            placement="right"
            visible={isDrawerVisible}
            onClose={onClose}
            open={open}
          >
            <Form form={form} style={{padding:"5px"}}>
              <Form.Item
                name="fullName"
                label="Họ và tên"
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
              <Form.Item
                name="phone"
                label="SĐT"
                rules={[
                  {
                    required: true,
                    message: "Xin vui lòng nhập số điện thoại!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="address"
                label="Địa chỉ"
                rules={[
                  { required: true, message: "Xin vui lòng nhập địa chỉ!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="avatarUrl" label="Ảnh đại diện">
                <Input />
              </Form.Item>

              <Form.Item>
                <Button style={{backgroundColor: "#008000",color:"#fff"}} onClick={editUser}>Chỉnh sửa</Button>
              </Form.Item>
              <Form.Item name="roleID">
                <Input style={{ display: "none" }} />
              </Form.Item>
            </Form>
          </Drawer>
        </>
      </div>
      <div style={{ display: "flex", flexDirection: "column", marginLeft: 20 }}>
        <Image width={200} src={productowner.avatarUrl} />
        <span
          style={{
            fontWeight: "bold",
            padding: "5px 0 5px 0",
            fontSize: "15px",
          }}
        >
          Họ và tên:{" "}
        </span>
        {productowner.fullName}
        <span
          style={{
            fontWeight: "bold",
            padding: "5px 0 5px 0",
            fontSize: "15px",
          }}
        >
          Địa chỉ:{" "}
        </span>
        {productowner.address}
        <span
          style={{
            fontWeight: "bold",
            padding: "5px 0 5px 0",
            fontSize: "15px",
          }}
        >
          Số điện thoại:
        </span>
        {productowner.phone}
      </div>
    </div>
  );
};
export default InformationPO;
