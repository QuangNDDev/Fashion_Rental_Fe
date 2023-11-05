import axios from "axios";
import React, { useEffect, useState } from "react";
import RevenueTable from "./revenue-table";
import "./revenue.css";
import { Card, Col, Row, Statistic } from "antd";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DollarOutlined,
} from "@ant-design/icons";
const Revenue = () => {
  const [orderData, setOrderData] = useState([]);
  const [orderWeekData, setOrderWeekData] = useState([]);
  const [orderMonthData, setOrderMonthData] = useState([]);
  const productownerId = localStorage.getItem("productownerId");
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://fashionrental.online:8080/orderbuy/po/" + productownerId
      );
      setOrderData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  const fetchOrdersWeek = async () => {
    try {
      const response = await axios.get(
        "http://fashionrental.online:8080/orderbuy/1week/" + productownerId
      );
      setOrderWeekData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchOrdersMonth = async () => {
    try {
      const response = await axios.get(
        "http://fashionrental.online:8080/orderbuy/1month/" + productownerId
      );
      setOrderMonthData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchOrdersWeek();
    fetchOrdersMonth();
  }, []);
  const calculateUnpaid = () => {
    let total = 0;
    orderData.forEach((order) => {
      if (
        ["PENDING", "PREPARE", "READY_PICKUP", "CONFIRMING"].includes(
          order.status
        )
      ) {
        total += order.total;
      }
    });
    return total;
  };
  const calculatePaid = () => {
    let total = 0;
    orderData.forEach((order) => {
      if (["COMPLETED"].includes(order.status)) {
        total += order.total;
      }
    });
    return total;
  };
  const calculatePaidWeek = () => {
    let total = 0;
    orderWeekData.forEach((order) => {
      if (["COMPLETED"].includes(order.status)) {
        total += order.total;
      }
    });
    return total;
  };
  const calculatePaidMonth = () => {
    let total = 0;
    orderMonthData.forEach((order) => {
      if (["COMPLETED"].includes(order.status)) {
        total += order.total;
      }
    });
    return total;
  };
  const totalPaidWeek = calculatePaidWeek();
  const totalPaidMonth = calculatePaidMonth();
  const totalUnpaid = calculateUnpaid();
  const totalPaid = calculatePaid();
  //chuyen doi thanh dang tien te vnd ------------------------------------------------------
  const formatPriceWithVND = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }} className="revenue-container">
        {/* <div className="overview">Tổng Quan</div>
        <div className="payment-status">
          <div className="unpaid">
            <h3>Chưa thanh toán</h3>
            <span>Tổng cộng</span>
            <span className="money-1">{formatPriceWithVND(totalUnpaid)}</span>
          </div>
          <hr className="divider" />
          <div className="paid-this-week">
            <h3>Đã thanh toán</h3>
            <span>Tuần này</span>
            <span className="money-1">{formatPriceWithVND(totalPaidWeek)}</span>
          </div>

          <div className="paid-this-month">
            <span>Tháng này</span>
            <span className="money-2">{formatPriceWithVND(totalPaidMonth)}</span>
          </div>
          <div className="total-paid">
            <span>Tổng cộng</span>
            <span className="money-2">{formatPriceWithVND(totalPaid)}</span>
          </div>
        </div> */}
        <Card title="Tổng Quan">
          <Row gutter={16}>
            <Col span={6}>
              <Card bordered={true}>
                <Statistic
                  title="Chưa thanh toán"
                  value={totalUnpaid}
                  precision={0}
                  valueStyle={{ color: "#FFA500" }}
                  suffix="VNĐ"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={true}>
                <Statistic
                  title="Đã thanh toán"
                  value={totalPaidWeek}
                  precision={0}
                  valueStyle={{ color: "#3f8600" }}
                  suffix="VNĐ"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={true}>
                <Statistic
                  title="Tháng này"
                  value={totalPaidMonth}
                  precision={0}
                  valueStyle={{ color: "#3f8600" }}
                  suffix="VNĐ"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={true}>
                <Statistic
                  title="Tổng cộng"
                  value={totalPaid}
                  precision={0}
                  valueStyle={{ color: "#3f8600" }}
                  suffix="VNĐ"
                />
              </Card>
            </Col>
          </Row>
        </Card>
      </div>

      <Card title="Chi tiết">
        {" "}
        <RevenueTable />
      </Card>
    </div>
  );
};
export default Revenue;
