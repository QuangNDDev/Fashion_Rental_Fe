import React from "react";
import { Tag } from "antd";

const RenderTag = ({ tagRender }) => {
  let color, text;

  switch (tagRender) {
    case "1":
      color = "green";
      text = "Đang hoạt động";
      break;
    case "0":
      color = "red";
      text = "Không hoạt động";
      break;
    case "Customer":
      color = "green";
      text = "Khách hàng";
      break;
    case "ProductOwner":
      color = "green";
      text = "Chủ sản phẩm";
      break;
    case "Staff":
      color = "yellow";
      text = "Nhân viên";
      break;
    case "Pending":
      color = "yellow";
      text = "Chờ duyệt";
      break;
    case "Approve":
      color = "green";
      text = "Đã duyệt";
      break;
    case "Refuse":
      color = "red";
      text = "Từ chối";
      break;
    case "Cancel":
      color = "red";
      text = "Đã hủy";
      break;
    case "VERIFIED":
      color = "green";
      text = "Đã xác minh";
      break;
    case "NOT_VERIFIED":
      color = "red";
      text = "Chưa xác minh";
      break;
    case "NOT_APPROVED":
      color = "red";
      text = "Đã từ chối";
      break;
    case "APPROVED":
      color = "green";
      text = "Đã duyệt";
      break;
    case "APPROVING":
      color = "yellow";
      text = "Chờ duyệt";
      break;
    case "WAITING":
      color = "yellow";
      text = "Chờ duyệt";
      break;
    case "RENT":
      color = "yellow";
      text = "THUÊ";
      break;
    case "SALE":
      color = "green";
      text = "BÁN";
      break;
    case "SALE_RENT":
      color = "green";
      text = "THUÊ/BÁN";
      break;
    case "SOLD_OUT":
      color = "red";
      text = "Đã bán";
      break;
    case "RENTING":
      color = "yellow";
      text = "Đang được thuê";
      break;
    case "AVAILABLE":
      color = "green";
      text = "Có Sẵn";
      break;
    case "PENDING":
      color = "yellow";
      text = "Chờ xác nhận";
      break;
    case "PREPARE":
      color = "yellow";
      text = "Đang được chuẩn bị";
      break;
    case "READY_PICKUP":
      color = "yellow";
      text = "Chờ vận chuyển";
      break;
    case "CONFIRMING":
      color = "yellow";
      text = "Chờ xác nhận";
      break;
    case "REJECTING":
      color = "red";
      text = "Từ chối";
      break;
    case "CANCELED":
      color = "red";
      text = "Đã hủy";
      break;
    case "BLOCKED":
      color = "red";
      text = "Đã khóa";
      break;
    case "COMPLETED":
      color = "green";
      text = "Hoàn thành";
      break;
    case "ACTIVE":
      color = "green";
      text = "Đang hoạt động";
      break;
    case "INACTIVE":
      color = "red";
      text = "Không hoạt động";
      break;
    case "OUTDATE":
      color = "red";
      text = "Hết hạn";
      break;
    case "RETURNING":
      color = "yellow";
      text = "Đang trả hàng";
      break;
    case "DELIVERY":
      color = "yellow";
      text = "Đang vận chuyển";
      break;
    case "REJECTING_COMPLETED":
      color = "green";
      text = "Trả hàng/hoàn tiền";
      break;
    case "OUT_OF_STOCK":
      color = "red";
      text = "Hết";
      break;
    case "RETURNING":
      color = "yellow";
      text = "Đang trả hàng";
      break;
    case "PROGRESSING":
      color = "yellow";
      text = "Chờ xử lí";
      break;
    case "PROGRESSING_FAILED":
      color = "red";
      text = "Bị từ chối";
      break;
    // default:
    //   color = "default";
    //   text = "Không Xác Định";
    default:
      if (Number(tagRender) < 0) {
        color = "red";
        text = `Đã trễ: ${-1 * Number(tagRender)} ngày`;
      } else {
        color = "green";
        text = `Còn lại: ${tagRender} ngày`;
      }
  }

  return <Tag color={color}>{text}</Tag>;
};

export default RenderTag;
