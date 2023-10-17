import React, { useEffect, useState } from "react";
import { Button, Drawer, Form, Image, Input, InputNumber } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import axios from "axios";
const InformationPO = () => {
  const idAccount = localStorage.getItem("accountId");
  const [productowner, setProductOwner] = useState([]);
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
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
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
            onClick={showDrawer}
          >
            Chỉnh sửa <SettingOutlined />
          </Button>
          <Drawer
            title="Basic Drawer"
            placement="right"
            onClose={onClose}
            open={open}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
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
