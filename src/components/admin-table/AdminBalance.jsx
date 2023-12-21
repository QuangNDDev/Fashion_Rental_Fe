import axios from "axios";
import React, { useEffect, useState } from "react";
import { PlusCircleOutlined, MinusOutlined } from "@ant-design/icons";
import "./AdminBalance.css";
import {
  Row,
  Card,
  Statistic,
  Col,
  Space,
  Button,
  Modal,
  Form,
  Input,
  ConfigProvider,
} from "antd";
import CountUp from "react-countup";
import { async } from "@firebase/util";
import { useNavigate } from "react-router-dom";
import useRealtime from "../../hooks/useRealtime";
import useNotification from "antd/es/notification/useNotification";
import TransactionAdminTable from "./transaction-admin";

const AdminBalance = () => {
  const [balanceData, setBalanceData] = useState([]);
  const accountId = localStorage.getItem("accountId");
  const [api, context] = useNotification();

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const fetchBalance = async () => {
    try {
      const response = await axios.get(
        "http://fashionrental.online:8080/wallet/" + accountId
      );
      setBalanceData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);
  const [reloadTable, setReloadTable] = useState(false);
  useRealtime((message) => {
    if (message.body === "payment success") {
      fetchBalance();
      api["success"]({
        description: "Nạp tiền thành công.",
        message: "Thông báo",
      });
      setReloadTable(prevState => !prevState); // Thay đổi giá trị của reloadTable để load lại TransactionTable
    }
  });
  //chuyen doi thanh dang tien te vnd ------------------------------------------------------
  const formatter = (value) => (
    <CountUp end={value} separator="," duration={1.5} /> // Thay duration bằng thời gian bạn muốn để con số hiển thị
  );

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
            </Row>
          </Card>
        </div>

        <Card
          bordered={true}
          title={"Lịch sử giao dịch"}
          style={{ marginTop: "30px" }}
        >
          <TransactionAdminTable reloadTable={reloadTable} />
        </Card>
        <Modal
          title="Thanh toán VN-Pay"
          open={isModalOpenWithdraw}
          onCancel={handleCancelWithdraw}
          footer={false}
        >
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
                    if (value > balanceData.balance) {
                      return Promise.reject(
                        new Error(
                          "Số tiền rút không được lớn hơn số dư tài khoản!"
                        )
                      );
                    }
                    return Promise.resolve();
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
              <Button
                style={{ float: "right", marginRight: "10px" }}
                danger
                onClick={handleCancelWithdraw}
              >
                Huỷ
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </ConfigProvider>
    </div>
  );
};
export default AdminBalance;
