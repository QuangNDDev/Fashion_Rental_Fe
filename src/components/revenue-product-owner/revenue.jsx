import axios from "axios";
import React, { useEffect, useState } from "react";
import RevenueTable from "./revenue-table";
import "./revenue.css";
import { Card, Col, Row, Statistic } from "antd";
import CountUp from "react-countup";

const Revenue = () => {
  const [orderRentData, setOrderRentData] = useState([]);
  const [orderRentWeekData, setOrderRentWeekData] = useState([]);
  const [orderRentMonthData, setOrderRentMonthData] = useState([]);
  const [orderSaleData, setOrderSaleData] = useState([]);
  const [orderSaleWeekData, setOrderSaleWeekData] = useState([]);
  const [orderSaleMonthData, setOrderSaleMonthData] = useState([]);
  const productownerId = localStorage.getItem("productownerId");
  const fetchOrderSales = async () => {
    try {
      const response = await axios.get(
        "http://fashionrental.online:8080/orderbuy/po/getall/" + productownerId
      );
      setOrderSaleData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchOrderSalesWeek = async () => {
    try {
      const response = await axios.get(
        "http://fashionrental.online:8080/orderbuy/1week/" + productownerId
      );
      setOrderSaleWeekData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchOrderSalesMonth = async () => {
    try {
      const response = await axios.get(
        "http://fashionrental.online:8080/orderbuy/1month/" + productownerId
      );
      setOrderSaleMonthData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchOrderRents = async () => {
    try {
      const response = await axios.get(
        "http://fashionrental.online:8080/orderrent/po/" + productownerId
      );
      setOrderRentData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchOrderRentsWeek = async () => {
    try {
      const response = await axios.get(
        "http://fashionrental.online:8080/orderrent/1week/" + productownerId
      );
      setOrderRentWeekData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchOrderRentsMonth = async () => {
    try {
      const response = await axios.get(
        "http://fashionrental.online:8080/orderrent/1month/" + productownerId
      );
      setOrderRentMonthData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrderSales();
    fetchOrderSalesWeek();
    fetchOrderSalesMonth();
    fetchOrderRents();
    fetchOrderRentsWeek();
    fetchOrderRentsMonth();
  }, []);
  const calculateUnpaid = () => {
    let total = 0;
    let totalSale = 0;
    let totalRent = 0;
    orderSaleData.forEach((order) => {
      if (
        ["PENDING", "PREPARE", "READY_PICKUP", "CONFIRMING"].includes(
          order.status
        )
      ) {
        totalSale += order.totalBuyPriceProduct;
      }
    });
    orderRentData.forEach((order) => {
      if (
        ["PENDING", "PREPARE", "READY_PICKUP", "CONFIRMING"].includes(
          order.status
        )
      ) {
        totalRent += order.totalRentPriceProduct;
      }
    });
    total = totalSale + totalRent;
    return total;
  };
  const calculatePaid = () => {
    let total = 0;
    let totalSale = 0;
    let totalRent = 0;
    orderSaleData.forEach((order) => {
      if (["COMPLETED"].includes(order.status)) {
        totalSale += order.totalBuyPriceProduct;
      }
    });
    orderRentData.forEach((order) => {
      if (["COMPLETED"].includes(order.status)) {
        totalRent += order.totalRentPriceProduct;
      }
    });
    total = totalSale + totalRent;
    return total;
  };
  const calculatePaidWeek = () => {
    let total = 0;
    let totalSale = 0;
    let totalRent = 0;
    orderSaleWeekData.forEach((order) => {
      if (["COMPLETED"].includes(order.status)) {
        totalSale += order.totalBuyPriceProduct;
      }
    });
    orderRentWeekData.forEach((order) => {
      if (["COMPLETED"].includes(order.status)) {
        totalRent += order.totalRentPriceProduct;
      }
    });
    total = totalSale + totalRent;
    return total;
  };
  const calculatePaidMonth = () => {
    let total = 0;
    let totalSale = 0;
    let totalRent = 0;
    orderSaleMonthData.forEach((order) => {
      if (["COMPLETED"].includes(order.status)) {
        totalSale += order.totalBuyPriceProduct;
      }
    });
    orderRentMonthData.forEach((order) => {
      if (["COMPLETED"].includes(order.status)) {
        totalRent += order.totalRentPriceProduct;
      }
    });
    total = totalSale + totalRent;
    return total;
  };
  const totalPaidWeek = calculatePaidWeek();
  const totalPaidMonth = calculatePaidMonth();
  const totalUnpaid = calculateUnpaid();
  const totalPaid = calculatePaid();
  //chuyen doi thanh dang tien te vnd ------------------------------------------------------
  const formatter = (value) => (
    <CountUp end={value} separator="," duration={1.5} /> // Thay duration bằng thời gian bạn muốn để con số hiển thị
  );

  return (
    <div>
      <div style={{ marginBottom: 20 }} className="revenue-container">
        <Card title="Tổng Quan">
          <Row gutter={16}>
            <Col span={6}>
              <Card bordered={true} title="Chưa thanh toán">
                <Statistic
                  title="Tổng cộng"
                  value={totalUnpaid}
                  precision={0}
                  valueStyle={{ color: "#FFA500" }}
                  suffix="VNĐ"
                  formatter={formatter}
                />
              </Card>
            </Col>

            <Col span={18}>
              <Card bordered={true} title="Đã thanh toán">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Statistic
                    title="Tuần này"
                    value={totalPaidWeek}
                    precision={0}
                    valueStyle={{ color: "#3f8600" }}
                    suffix="VNĐ"
                    formatter={formatter}
                  />
                  <Statistic
                    title="Tháng này"
                    value={totalPaidMonth}
                    precision={0}
                    valueStyle={{ color: "#3f8600" }}
                    suffix="VNĐ"
                    formatter={formatter}
                  />
                  <Statistic
                    title="Tổng cộng"
                    value={totalPaid}
                    precision={0}
                    valueStyle={{ color: "#3f8600" }}
                    suffix="VNĐ"
                    formatter={formatter}
                  />
                </div>
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
