import React, { useEffect, useState } from "react";
import "./Notification.css";
import useRealtime from "../../hooks/useRealtime";
import { Badge, Col, Modal, Row } from "antd";
import { BellOutlined } from "@ant-design/icons";
import useNotification from "antd/es/notification/useNotification";
import axios from "axios";
const Notification = () => {
  const idAccount = localStorage.getItem("accountId");
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);
  const [isNotificationModalVisible, setNotificationModalVisible] = useState(false);
  const [api, context] = useNotification();
  const [notifications, setNotifications] = useState([]);

  useRealtime((message) => {
    if (message.headers.destination.includes("/topic/notification")) {
      const [title, des] = message.body.split("-");
      api["info"]({
        message: title,
        description: des,
        duration: 5000,
      });

      fetchNotification();
    }
  });

  // useEffect(() => {}, [idAccount]);
  const showNotificationModal = () => {
    setNotificationModalVisible(true);
  };

  const hideNotificationModal = async () => {
    setNotificationModalVisible(false);
    setUnreadNotificationCount(0);
    const response = await axios.post(`http://fashionrental.online:8080/notification/${idAccount}`);
    fetchNotification();
  };

  const fetchNotification = async () => {
    const response = await axios.get(`http://fashionrental.online:8080/notification/${idAccount}`);
    setNotifications(response.data);
    console.log(response.data.filter((item) => !item.read).length);
    setUnreadNotificationCount(response.data.filter((item) => !item.read).length);
    console.log(response.data);
  };

  useEffect(() => {
    fetchNotification();
  }, [idAccount]);

  return (
    <>
      {context}
      <Badge count={unreadNotificationCount}>
        <BellOutlined
          style={{
            fontSize: "20px",
            color: "white",
            cursor: "pointer",
            marginLeft: "25px",
          }}
          onClick={showNotificationModal}
        />
      </Badge>

      <Modal
        title="Thông báo"
        open={isNotificationModalVisible}
        onCancel={hideNotificationModal}
        footer={null}
        style={{ position: "absolute", bottom: "50px", right: "20px" }}
      >
        <div className="notification-wrapper">
          {notifications.map((notification) => {
            return (
              <Row className="notification-item" align={"middle"}>
                <Col span={23}>
                  <p
                    style={{
                      fontWeight: 700,
                    }}
                  >
                    {notification.title}
                  </p>
                  <p
                    style={{
                      color: "rgb(210, 208, 208)",
                    }}
                  >
                    {notification.message}
                  </p>
                </Col>
                <Col span={1}>{!notification.read && <span className="unread-icon"></span>}</Col>
              </Row>
            );
          })}
        </div>
      </Modal>
    </>
  );
};

export default Notification;
