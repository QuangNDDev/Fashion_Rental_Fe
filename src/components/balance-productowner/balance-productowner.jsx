import axios from "axios";
import React, { useEffect, useState } from "react";
import { PlusCircleOutlined, MinusOutlined } from "@ant-design/icons";
import "./balance-productowner.css";
import TransactionTable from "./transaction-history-table";
import { Row, Card, Statistic, Col, Space, Button, Modal, Form, Input, ConfigProvider } from "antd";
import CountUp from "react-countup";
import { async } from "@firebase/util";
import { useNavigate } from "react-router-dom";
import useRealtime from "../../hooks/useRealtime";
import useNotification from "antd/es/notification/useNotification";

const Balance = () => {
  const [balanceData, setBalanceData] = useState([]);
  const accountId = localStorage.getItem("accountId");
  const [api, context] = useNotification();

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const fetchBalance = async () => {
    try {
      const response = await axios.get("http://fashionrental.online:8080/wallet/" + accountId);
      setBalanceData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  //chuyen doi thanh dang tien te vnd ------------------------------------------------------
  const formatter = (value) => (
    <CountUp end={value} separator="," duration={1.5} /> // Thay duration bằng thời gian bạn muốn để con số hiển thị
  );
  // ----------------------modal nạp tiền--------------------------------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  useRealtime((message) => {
    if (message.body === "payment success") {
      fetchBalance();
      api["success"]({
        description: "Nạp tiền thành công.",
        message: "Thông báo",
      });
    }
  });

  const handleOk = async (values) => {
    setIsModalOpen(false);
    console.log(values);
    try {
      const response = await axios.post(
        "http://localhost:8080/VNPaycontroller/submitOrder?accountID=" +
          accountId +
          "&amount=" +
          values.amount +
          "&orderInfo=Nap tien"
      );

      console.log("VN-Pay successful!!!", response.data);
      if (response.data) {
        window.open(response.data, "_blank");
      }
    } catch (error) {
      console.error("Error calling API:", error);
      throw error;
    }
  };
  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };
  // ----------------------modal rút tiền--------------------------------
  const [isModalOpenWithdraw, setIsModalOpenWithdraw] = useState(false);
  const showModalWithdraw = () => {
    setIsModalOpenWithdraw(true);
  };
  const handleOkWithdraw = async (values) => {
    setIsModalOpenWithdraw(false);
    console.log(values);
    try {
      const response = await axios.post(
        "http://fashionrental.online:8080/VNPaycontroller/submitOrder?accountID=" +
          accountId +
          "&amount=" +
          values.amount +
          "&orderInfo=Rut tien"
      );
      console.log("VN-Pay successful!!!", response.data);
      if (response.data) {
        window.open(response.data, "_blank");
      }
    } catch (error) {
      console.error("Error calling API:", error);
      throw error;
    }
  };
  const handleCancelWithdraw = () => {
    form.resetFields();
    setIsModalOpenWithdraw(false);
  };

  return (
    <div>
      {context}
      <ConfigProvider
        theme={{
          token: {
            Button: {
              colorPrimary: "rgb(32, 30, 42)",
              colorPrimaryHover: "orange",
              colorPrimaryActive: "orange",
            },
            Input: {
              activeBorderColor: "rgb(32, 30, 42)",
              hoverBorderColor: "rgb(32, 30, 42)",
            },
          },
        }}
      >
        <div className="balance-container">
          <Card
            title="Tổng Quan"
            extra={
              <Space>
                <Button
                  type="primary"
                  style={{ fontWeight: "bolder" }}
                  onClick={showModal}
                  icon={<PlusCircleOutlined />}
                >
                  Nạp tiền
                </Button>
                <Button
                  type="primary"
                  style={{ fontWeight: "bolder" }}
                  onClick={showModalWithdraw}
                  icon={<MinusOutlined />}
                >
                  Rút tiền
                </Button>
              </Space>
            }
          >
            <Row gutter={16}>
              <Col span={12}>
                <Card bordered={true}>
                  <Statistic
                    title="Số dư"
                    value={balanceData.balance}
                    precision={0}
                    valueStyle={{ color: "green" }}
                    // prefix={<DollarOutlined />}
                    suffix="VNĐ"
                    formatter={formatter}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card bordered={true}>
                  <Statistic
                    title="Số dư đang chờ"
                    value={balanceData.pendingMoney}
                    precision={0}
                    valueStyle={{ color: "#FFA500" }}
                    // prefix={<DollarOutlined />}
                    suffix="VNĐ"
                    formatter={formatter}
                  />
                </Card>
              </Col>
            </Row>
          </Card>
        </div>

        <Card bordered={true} title={"Lịch sử giao dịch"} style={{ marginTop: "30px" }}>
          <TransactionTable />
        </Card>
        <Modal title="Thanh toán VN-Pay" open={isModalOpen} onCancel={handleCancel} footer={false}>
          <Form form={form} onFinish={handleOk}>
            <span style={{ marginBottom: "5px" }}>Nhập số tiền muốn nạp:</span>
            <Form.Item
              name="amount"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số tiền!",
                },

                {
                  validator: async (_, value) => {
                    if (value >= 10000 && value <= 1000000000) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Số tiền phải lớn hơn 10,000 VND và nhỏ hơn 1,000,000,000 VND!"));
                  },
                },
              ]}
            >
              <Input type="number" placeholder="Nhập số tiền" suffix="VND" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                style={{
                  float: "right",
                }}
                htmlType="submit"
              >
                Thanh toán
              </Button>
              <Button style={{ float: "right", marginRight: "10px" }} danger onClick={handleCancel}>
                Huỷ
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Modal title="Thanh toán VN-Pay" open={isModalOpenWithdraw} onCancel={handleCancelWithdraw} footer={false}>
          <Form form={form} onFinish={handleOkWithdraw}>
            <span style={{ marginBottom: "5px" }}>Nhập số tiền muốn rút:</span>
            <Form.Item
              name="amount"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số tiền!",
                },

                {
                  validator: async (_, value) => {
                    if (value >= 10000 && value <= 1000000000) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Số tiền phải lớn hơn 10,000 VND và nhỏ hơn 1,000,000,000 VND!"));
                  },
                },
              ]}
            >
              <Input type="number" placeholder="Nhập số tiền" suffix="VND" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                style={{
                  float: "right",
                }}
                htmlType="submit"
              >
                Thanh toán
              </Button>
              <Button style={{ float: "right", marginRight: "10px" }} danger onClick={handleCancelWithdraw}>
                Huỷ
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </ConfigProvider>
    </div>
  );
};
export default Balance;
