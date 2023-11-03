import axios from "axios";
import React, { useEffect, useState } from "react";
import RevenueTable from "./revenue-table";
import "./revenue.css";
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
      if (
        ["COMPLETED"].includes(
          order.status
        )
      ) {
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
      <div className="revenue-container">
        <div className="overview">Tổng Quan</div>
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
        </div>
      </div>
      <div className="detail-table">
        <div className="detail-title">Chi tiết</div>
        <div className="table">
          <RevenueTable />
        </div>
      </div>
    </div>
  );
};
export default Revenue;
