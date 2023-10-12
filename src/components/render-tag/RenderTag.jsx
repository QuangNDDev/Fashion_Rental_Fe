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
    } else if (renderTag == "0"){
        setColor("red");
        setStatus("Inactive")
    }else if (renderTag == "Customer"){
      setColor("green");
      setStatus("Khách hàng")
    }else if (renderTag == "ProductOwner"){
      setColor("green");
      setStatus("Chủ sản phẩm")
    }else if (renderTag == "Staff"){
      setColor("yellow");
      setStatus("Nhân viên")
    }
  }, []);

  return <Tag style={{ float: "left" }} color={colors}>{status}</Tag>;
}