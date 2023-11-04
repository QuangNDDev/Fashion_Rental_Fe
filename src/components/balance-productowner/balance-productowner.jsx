import axios from "axios";
import React, { useEffect, useState } from "react";
import "./balance-productowner.css";
import TransactionTable from "./transaction-history-table";
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
        <div className="overview">Tổng Quan</div>
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
        </div>
      </div>
      <div className="detail-table">
        <div className="detail-title-balance">Chi tiết</div>
        <p className="history-title">Lịch sử giao dịch</p>
        <div className="table"><TransactionTable/></div>
      </div>
    </div>
  );
};
export default Balance;
