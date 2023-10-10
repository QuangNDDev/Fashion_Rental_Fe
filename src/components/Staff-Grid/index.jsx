import React from "react";
import { Col, Divider, Row } from "antd";
import CardDetail from "../Card/CardDetail"; // Make sure this path is correct

export default function StaffGrid() {
  return (
    <>
      <Divider orientation="left">
        <h2 style={{ textAlign: "center" }}>Đơn đã duyệt</h2>
      </Divider>
      <Row>
        <Col style={{ paddingBottom: "10px" }} className="gutter-row" span={6}>
          <CardDetail />
        </Col>
        <Col className="gutter-row" span={6}>
          <CardDetail />
        </Col>
        <Col className="gutter-row" span={6}>
          <CardDetail />
        </Col>
        <Col className="gutter-row" span={6}>
          <CardDetail />
        </Col>
        <Col className="gutter-row" span={6}>
          <CardDetail />
        </Col>
        <Col className="gutter-row" span={6}>
          <CardDetail />
        </Col>
        <Col className="gutter-row" span={6}>
          <CardDetail />
        </Col>
      </Row>
    </>
  );
}
