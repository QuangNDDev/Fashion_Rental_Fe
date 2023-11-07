import axios from "axios";
import React, { useEffect, useState } from "react";
import "./balance-productowner.css";
import TransactionTable from "./transaction-history-table";
import { Row, Card, Statistic, Col } from "antd";
import CountUp from "react-countup";
const Balance = () => {
  const [balanceData, setBalanceData] = useState([]);
  const accountId = localStorage.getItem("accountId");
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

  //chuyen doi thanh dang tien te vnd ------------------------------------------------------
  const formatter = (value) => (
    <CountUp end={value} separator="," duration={1} /> // Thay duration bằng thời gian bạn muốn để con số hiển thị
  );

  return (
    <div>
      <div className="balance-container">
        <Card title="Tổng Quan">
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

      <Card
        bordered={true}
        title={"Lịch sử giao dịch"}
        style={{ marginTop: "30px" }}
      >
        <TransactionTable />
      </Card>
    </div>
  );
};
export default Balance;
