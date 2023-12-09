// src/ChatDetail.js
import React, { useEffect, useRef, useState } from "react";
import { Input, Button, List, Row, Col, Avatar, Tooltip } from "antd";
import "./index.scss";
import { useOutletContext, useParams } from "react-router-dom";
import axios from "axios";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import useRealtime from "../../hooks/useRealtime";
import useLatest from "../../hooks/useLatest";

const ChatDetail = () => {
  const params = useParams();
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState();
  const [messages, setMessages] = useState([]);
  const id = useRef(params.id);
  const accountID = localStorage.getItem("accountId");
  const nameAccount = useRef();
  const [typing, setTyping] = useState([]);
  const fetchRoom = useOutletContext();

  useRealtime((message) => {
    if (message.body.includes("Typing: ")) {
      const name = message.body.replace("Typing:", "");
      if (name?.trim() !== nameAccount.current?.trim()) {
        setTyping([...typing, name]);
        setTimeout(() => {
          console.log("run");
          setTyping(typing.filter((item) => item !== name));
        }, 5000);
      }
    } else {
      fetchChatDetail();
    }

    // setTyping()
  });

  const fetchAccount = async () => {
    try {
      const response = await axios.get("http://fashionrental.online:8080/account/" + accountID);
      console.log(response.data.data.email);
      nameAccount.current = response.data.data.email;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  useEffect(() => {
    id.current = params.id;
  }, [params.id]);

  const messagesEndRef = useRef(null);
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (message.trim() !== "") {
      //   setMessages([...messages, { sender: "You", text: message, self: true }]);
      //   setMessage("");
      await axios.post(`http://fashionrental.online:8080/chat/send/${id.current}`, {
        accountID: Number(accountID),
        roomID: Number(id.current),
        message: message,
      });
      setMessage("");
      fetchChatDetail();
      fetchRoom();
    }
  };
  const fetchChatDetail = async () => {
    const response = await axios.get(`http://fashionrental.online:8080/chat/detail/${id.current}`);
    setRoom(response.data);
    setMessages(
      response.data.messages.map((message) => {
        return {
          sender: message.account.accountID == accountID ? "" : message.account.email + ":",
          text: message.message,
          self: message.account.accountID == accountID,
          created: message.createAt,
        };
      })
    );
  };

  useEffect(() => {
    // Scroll to the bottom when the messages update
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    fetchChatDetail();
  }, [params.id]);

  return (
    <div className="chat-detail" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <Row style={{ padding: "10px", paddingBottom: 20, borderBottom: "1px solid #ddd" }}>
        <Col span={22}>
          <h2>{room?.name}</h2>
        </Col>
        {/* Add room members or any other room information */}
        <Col span={2}>
          <Avatar.Group maxCount={2} maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
            {room?.accounts.map((item) => {
              return (
                <Tooltip title={item.email}>
                  <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />
                </Tooltip>
              );
            })}
          </Avatar.Group>
        </Col>
      </Row>

      {/* Body */}
      <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
        <List
          dataSource={messages}
          renderItem={(item, index) => (
            <List.Item style={{ textAlign: item.self ? "right" : "left" }}>
              <div
                ref={index === messages.length - 1 ? messagesEndRef : null}
                style={{
                  background: item.self ? "#e6f7ff" : "#f0f0f0",
                  padding: "10px",
                  borderRadius: "8px",
                  display: "inline-block",
                  marginLeft: item.self ? "auto" : "0",
                }}
              >
                <strong>{item.sender}</strong> {item.text}
                <br />
                <small>{formatDistanceToNow(new Date(item.created), { addSuffix: false, includeSeconds: true })}</small>
              </div>
            </List.Item>
          )}
        />
      </div>

      {/* Footer */}
      <div style={{ padding: "10px" }}>
        {typing.length > 0 && <p className="typing">{`${typing?.join(",")} is typing...`}</p>}
        <Row>
          <Col span={22}>
            <Input
              onInput={async () => {
                const response = await axios.post(
                  `http://fashionrental.online:8080/chat/typing/${id.current}/${nameAccount.current}`
                );
              }}
              placeholder="Type your message..."
              value={message}
              onChange={handleMessageChange}
            />
          </Col>
          <Col span={2}>
            <Button type="primary" onClick={handleSendMessage} style={{ marginLeft: "10px", width: "100%" }}>
              Send
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ChatDetail;
