// src/ChatApp.js
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Layout,
  Menu,
  Modal,
  Row,
  Select,
  Spin,
} from "antd";
import "./index.scss";
import ChatDetail from "./chat-detail";
import useRealtime from "../../hooks/useRealtime";
import FormItem from "antd/es/form/FormItem";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Sider, Content } = Layout;

const ChatApp = ({ role }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [rooms, setRooms] = useState([]);
  const accountID = localStorage.getItem("accountId");
  const navigate = useNavigate();
  const params = useParams();

  useRealtime((message) => {
    const name = message.body;
    console.log(name);
    if (name === "New message") {
      fetchRoom();
    }
  });

  const fetchAccount = async () => {
    setLoading(true);
    const response = await axios.get(
      "http://fashionrental.online:8080/account/getall"
    );
    setAccounts(response.data);
    setLoading(false);
  };

  const fetchRoom = async () => {
    const response = await axios.get(
      `http://fashionrental.online:8080/chat/${accountID}`
    );
    console.log(response.data);
    setRooms(response.data);
  };

  const showModal = () => {
    fetchAccount();
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleRoomClick = (room) => {
    console.log(room);
    navigate(`${room}`);
  };

  useEffect(() => {
    fetchRoom();
  }, []);

  const onFinish = async (values) => {
    console.log(values);
    const response = await axios.post(`http://fashionrental.online:8080/chat`, {
      ...values,
      members: [...values.members, Number(accountID)],
    });
    fetchRoom();
    form.resetFields();
    handleCancel();
  };

  function truncateAndCreateLink(value) {
    if (value?.length > 25) {
      value = value.substring(0, 25) + "...";
    }

    return value;
  }

  return (
    <Layout className="chat-page">
      <Sider
        width={300}
        style={{
          background: "#fff",
          height: "100%",
          borderRight: 0,
          padding: 10,
        }}
      >
        <Row
          style={{
            justifyContent: "center",
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          <Row
            align={"middle"}
            justify={"space-around"}
            gutter={12}
            style={{
              cursor: "pointer",
            }}
          >
            <Col span={10}>
              <Row
                align={"middle"}
                onClick={() => {
                  if (role === "PO") {
                    navigate("/productOwner");
                  }
                  if (role === "ST") {
                    navigate("/staff");
                  }
                  if (role === "AD") {
                    navigate("/admin");
                  }
                }}
              >
                <ArrowLeftOutlined />{" "}
                <span
                  style={{
                    marginLeft: 10,
                    fontWeight: 700,
                  }}
                >
                  Trở về
                </span>
              </Row>
            </Col>
            <Col span={14}>
              <Button
                type="primary"
                onClick={showModal}
                style={{ fontWeight: "bold" }}
              >
                Tạo phòng
              </Button>
            </Col>
          </Row>
          <Modal
            title={<p style={{ textAlign: "center" }}>Tạo phòng</p>}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Form
              form={form}
              labelCol={{
                span: 24,
              }}
              onFinish={onFinish}
            >
              <FormItem
                name={"name"}
                label="Tên phòng"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn thành viên!",
                  },
                ]}
              >
                <Input placeholder="Vui lòng nhập..." />
              </FormItem>
              <FormItem
                name={"members"}
                label="Thành viên"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn thành viên!",
                  },
                ]}
              >
                {loading ? (
                  <Spin />
                ) : (
                  <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder="Vui lòng chọn..."
                    //   onChange={handleChange}
                    allowClear
                    filterOption={(input, options) => {
                      return options.label
                        .toLocaleLowerCase()
                        .includes(input.toLocaleLowerCase());
                    }}
                    options={accounts.map((item) => {
                      return {
                        label: item.email,
                        value: item.accountID,
                      };
                    })}
                  />
                )}
              </FormItem>
            </Form>
          </Modal>
        </Row>
        <Menu
          mode="vertical"
          selectedKeys={params.id}
          defaultSelectedKeys={["1"]}
        >
          {rooms.map((room) => {
            return (
              <Menu.Item
                style={{
                  padding: "15px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
                key={room.roomID}
                onClick={() => handleRoomClick(room.roomID)}
              >
                <span className="chat-box">
                  <p className="chat-title">{room.name}</p>
                  <p className="chat-message">
                    {truncateAndCreateLink(room.lastMessage)}
                  </p>
                </span>
                <span className="time">
                  {formatDistanceToNow(new Date(room.lastUpdated), {
                    addSuffix: false,
                    includeSeconds: true,
                  })}
                </span>
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
      <Layout style={{ padding: "16px", height: "100%" }}>
        <Content
          style={{
            background: "#fff",
            padding: 24,
            margin: 0,
            minHeight: 280,
            height: "100%",
          }}
        >
          {/* {currentRoom ? <ChatDetail room={currentRoom} /> : <h2>Select a room</h2>} */}
          <Outlet
            context={() => {
              //   console.log(123);
              fetchRoom();
            }}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ChatApp;
