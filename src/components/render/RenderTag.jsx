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
    } else if (renderTag === "0"){
        setColor("red");
        setStatus("Inactive")
    }else if (renderTag === "Customer"){
      setColor("green");
      setStatus("Khách hàng")
    }else if (renderTag === "ProductOwner"){
      setColor("green");
      setStatus("Chủ sản phẩm")
    }else if (renderTag === "Staff"){
      setColor("yellow");
      setStatus("Nhân viên")
    }else if (renderTag === "Pending"){
      setColor("yellow");
      setStatus("Chờ duyệt")
    }else if (renderTag === "Approve"){
      setColor("green");
      setStatus("Đã duyệt")
    }else if (renderTag === "Refuse"){
      setColor("red");
      setStatus("Từ chối")
    }else if (renderTag === "Cancel"){
      setColor("red");
      setStatus("Đã huỷ")
    }else if (renderTag === "VERIFIED"){
      setColor("green");
      setStatus("Đã xác minh")
    }else if (renderTag === "NOT_VERIFIED"){
      setColor("red");
      setStatus("Chưa xác minh")
    }else if (renderTag === "NOT_APPROVED"){
      setColor("red");
      setStatus("Đã từ chối")
    }else if (renderTag === "APPROVED"){
      setColor("green");
      setStatus("Đã duyệt")
    }else if (renderTag === "APPROVING"){
      setColor("yellow");
      setStatus("Chờ duyệt")
    }else if (renderTag === "WAITING"){
      setColor("yellow");
      setStatus("Chờ duyệt")
    }else if (renderTag === "RENT"){
      setColor("green");
      setStatus("THUÊ")
    }else if (renderTag === "SALE"){
      setColor("green");
      setStatus("BÁN")
    }else if (renderTag === "SALE_RENT"){
      setColor("green");
      setStatus("THUÊ/BÁN")
    }else if (renderTag === "BLOCKED"){
      setColor("red");
      setStatus("Tạm dừng")
    }
  }, []);

  return <Tag  color={colors}>{status}</Tag>;
}
