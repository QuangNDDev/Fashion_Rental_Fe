import React from "react";
import RevenueTable from "./revenue-table";
import "./revenue.css";
const Revenue = () => {
  return (
    <div>
      <div className="revenue-container">
        <div className="overview">Tổng Quan</div>
        <div className="payment-status">
          <div className="unpaid">
            <h3>Chưa thanh toán</h3>
            <span>Tổng cộng</span>
            <span className="money-1">0đ</span>
          </div>
          <div className="paid-this-week">
            <h3>Đã thanh toán</h3>
            <span>Tuần này</span>
            <span className="money-1">0đ</span>
          </div>
          <div className="paid-this-month">
            <span>Tháng này</span>
            <span className="money-2">0đ</span>
          </div>
          <div className="total-paid">
            <span>Tổng cộng</span>
            <span className="money-2">0đ</span>
          </div>
        </div>
      </div>
      <div className="detail-table">
        <div className="detail-title">
            Chi tiết
        </div>
        <div className="table">
            <RevenueTable/>
        </div>
      </div>
    </div>
  );
};
export default Revenue;
