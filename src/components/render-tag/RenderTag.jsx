import { Tag } from "antd";
import React, { useEffect, useState } from "react";
export default function RenderTag(props) {
  const renderTag = props.tagRender;
  const [colors, setColor] = useState("");
  const [status, setStatus] = useState("");
  useEffect(() => {
    if (renderTag == "Active") {
      setColor("green");
      setStatus("Đang hoạt động");
    } else if (renderTag == "Inactive"){
        setColor("red");
        setStatus("Không hoạt động")
    }
  }, []);

  return <Tag style={{ float: "left" }} color={colors}>{status}</Tag>;
}
