import axios from "axios";
import React, { useEffect, useState } from "react";
import "./balance-productowner.css";
import TransactionTable from "./transaction-history-table";
import { Row, Card, Statistic, Col } from "antd";
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
  const formatPriceWithVND = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div>
      <div className="balance-container">
        {/* <div className="overview">Tổng Quan</div>
        <div className="balance-status">
          <div className="balance">
            <h3>Số dư</h3>
            <span className="money-1">
              {formatPriceWithVND(balanceData.balance)}
            </span>
          </div>
          <hr className="divider" />
          <div className="pending">
            <h3>Số dư đang chờ</h3>
            <span className="money-1">
              {formatPriceWithVND(balanceData.pendingMoney)}
            </span>
          </div>
        </div> */}
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
                />
              </Card>
            </Col>
          </Row>
        </Card>
      </div>

      <Card bordered={true} title={"Chi tiết"} style={{ marginTop: "30px" }}>
        <p className="history-title">Lịch sử giao dịch</p>
        <TransactionTable />
      </Card>
    </div>
  );
};
export default Balance;
