// import { Tag } from "antd";
// import React, { useEffect, useState } from "react";
// export default function RenderTag(props) {
//   const renderTag = props.tagRender;
//   const [colors, setColor] = useState("");
//   const [status, setStatus] = useState("");
//   useEffect(() => {
//     if (renderTag == "1") {
//       setColor("green");
//       setStatus("Active");
//     } else if (renderTag == "0") {
//       setColor("red");
//       setStatus("Inactive");
//     } else if (renderTag == "Customer") {
//       setColor("green");
//       setStatus("Khách hàng");
//     } else if (renderTag == "ProductOwner") {
//       setColor("green");
//       setStatus("Chủ sản phẩm");
//     } else if (renderTag == "Staff") {
//       setColor("yellow");
//       setStatus("Nhân viên");
//     } else if (renderTag == "Pending") {
//       setColor("yellow");
//       setStatus("Chờ duyệt");
//     } else if (renderTag == "Approve") {
//       setColor("green");
//       setStatus("Đã duyệt");
//     } else if (renderTag == "Refuse") {
//       setColor("red");
//       setStatus("Từ chối");
//     } else if (renderTag == "Cancel") {
//       setColor("red");
//       setStatus("Đã huỷ");
//     } else if (renderTag == "VERIFIED") {
//       setColor("green");
//       setStatus("Đã xác minh");
//     } else if (renderTag == "NOT_VERIFIED") {
//       setColor("red");
//       setStatus("Chưa xác minh");
//     } else if (renderTag == "NOT_APPROVED") {
//       setColor("red");
//       setStatus("Đã từ chối");
//     } else if (renderTag == "APPROVED") {
//       setColor("green");
//       setStatus("Đã duyệt");
//     } else if (renderTag == "APPROVING") {
//       setColor("yellow");
//       setStatus("Chờ duyệt");
//     } else if (renderTag == "WAITING") {
//       setColor("yellow");
//       setStatus("Chờ duyệt");
//     } else if (renderTag == "RENT") {
//       setColor("yellow");
//       setStatus("THUÊ");
//     } else if (renderTag == "SALE") {
//       setColor("green");
//       setStatus("BÁN");
//     } else if (renderTag == "SALE_RENT") {
//       setColor("green");
//       setStatus("THUÊ/BÁN");
//     } else if (renderTag == "SOLD_OUT") {
//       setColor("red");
//       setStatus("Đã bán");
//     } else if (renderTag == "RENTING") {
//       setColor("yellow");
//       setStatus("Đang được thuê");
//     } else if (renderTag == "AVAILABLE") {
//       setColor("green");
//       setStatus("Có Sẵn");
//     } else if (renderTag == "PENDING") {
//       setColor("yellow");
//       setStatus("Chờ xác nhận");
//     } else if (renderTag == "PREPARE") {
//       setColor("yellow");
//       setStatus("Đang được chuẩn bị");
//     } else if (renderTag == "READY_PICKUP") {
//       setColor("yellow");
//       setStatus("Chờ vận chuyển");
//     } else if (renderTag == "CONFIRMING") {
//       setColor("green");
//       setStatus("Đã xác nhận");
//     } else if (renderTag == "REJECTING") {
//       setColor("red");
//       setStatus("Từ chối");
//     } else if (renderTag == "CANCELED") {
//       setColor("red");
//       setStatus("Đã huỷ");
//     } else if (renderTag == "BLOCKED") {
//       setColor("red");
//       setStatus("Đã khóa");
//     } else if (renderTag == "COMPLETED") {
//       setColor("green");
//       setStatus("Hoàn thành");
//     }
//   }, []);

//   return (
//
//       <Tag color={colors}>{status}</Tag>
//
//   );
//}
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
      color = "green";
      text = "Đã xác nhận";
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
    case "true":
      color = "green";
      text = "Đang hoạt động";
      break;
    case "false":
      color = "red";
      text = "Không hoạt động";
      break;
    default:
      color = "default";
      text = "Không Xác Định";
  }

  return <Tag color={color}>{text}</Tag>;
};

export default RenderTag;
