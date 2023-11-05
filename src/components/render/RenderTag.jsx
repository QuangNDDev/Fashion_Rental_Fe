import { Tag } from "antd";
import React, { useEffect, useState } from "react";
export default function RenderTag(props) {
  const renderTag = props.tagRender;
  const [colors, setColor] = useState("");
  const [status, setStatus] = useState("");
  useEffect(() => {
    if (renderTag == "1") {
      setColor("green");
      setStatus("Active");
    } else if (renderTag == "0") {
      setColor("red");
      setStatus("Inactive");
    } else if (renderTag == "Customer") {
      setColor("green");
      setStatus("Khách hàng");
    } else if (renderTag == "ProductOwner") {
      setColor("green");
      setStatus("Chủ sản phẩm");
    } else if (renderTag == "Staff") {
      setColor("yellow");
      setStatus("Nhân viên");
    } else if (renderTag == "Pending") {
      setColor("yellow");
      setStatus("Chờ duyệt");
    } else if (renderTag == "Approve") {
      setColor("green");
      setStatus("Đã duyệt");
    } else if (renderTag == "Refuse") {
      setColor("red");
      setStatus("Từ chối");
    } else if (renderTag == "Cancel") {
      setColor("red");
      setStatus("Đã huỷ");
    } else if (renderTag == "VERIFIED") {
      setColor("green");
      setStatus("Đã xác minh");
    } else if (renderTag == "NOT_VERIFIED") {
      setColor("red");
      setStatus("Chưa xác minh");
    } else if (renderTag == "NOT_APPROVED") {
      setColor("red");
      setStatus("Đã từ chối");
    } else if (renderTag == "APPROVED") {
      setColor("green");
      setStatus("Đã duyệt");
    } else if (renderTag == "APPROVING") {
      setColor("yellow");
      setStatus("Chờ duyệt");
    } else if (renderTag == "WAITING") {
      setColor("yellow");
      setStatus("Chờ duyệt");
    } else if (renderTag == "RENT") {
      setColor("yellow");
      setStatus("THUÊ");
    } else if (renderTag == "SALE") {
      setColor("green");
      setStatus("BÁN");
    } else if (renderTag == "SALE_RENT") {
      setColor("green");
      setStatus("THUÊ/BÁN");
    } else if (renderTag == "SOLD_OUT") {
      setColor("red");
      setStatus("Đã bán");
    } else if (renderTag == "RENTING") {
      setColor("yellow");
      setStatus("Đang được thuê");
    } else if (renderTag == "AVAILABLE") {
      setColor("green");
      setStatus("Có Sẵn");
    } else if (renderTag == "PENDING") {
      setColor("yellow");
      setStatus("Chờ xác nhận");
    } else if (renderTag == "PREPARE") {
      setColor("yellow");
      setStatus("Đang được chuẩn bị");
    } else if (renderTag == "READY_PICKUP") {
      setColor("yellow");
      setStatus("Chờ vận chuyển");
    } else if (renderTag == "CONFIRMING") {
      setColor("green");
      setStatus("Đã xác nhận");
    } else if (renderTag == "REJECTING") {
      setColor("red");
      setStatus("Từ chối");
    } else if (renderTag == "CANCELED") {
      setColor("red");
      setStatus("Đã huỷ");
    } else if (renderTag == "BLOCKED") {
      setColor("red");
      setStatus("Đã khóa");
    } else if (renderTag == "COMPLETED") {
      setColor("green");
      setStatus("Hoàn thành");
    }
  }, []);

  return (
    <p>
      {" "}
      <Tag color={colors}>{status}</Tag>
    </p>
  );
}
