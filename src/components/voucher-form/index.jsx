import {
  Button,
  Card,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";

function VoucherForm() {
  const [form] = Form.useForm();
  const [voucherType, setVoucherType] = useState(1);
  const [dateRange, setDateRange] = useState([null, null]);

  const handleCancel = () => {
    form.resetFields();
  };

  const handleDateChange = (dates) => {
    setDateRange(dates);
  };
  const onFinish = (values) => {};

  const handleChangeVoucherType = (value) => {
    console.log(`selected ${value}`);
    setVoucherType(value);
  };

  const onChangeCreateDate = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <div
      style={{
        backgroundColor: "#e7e9eb",
        height: "800px",
      }}
    >
      <div className="container__voucher">
        <Space direction="vertical" size={16}>
          <Card
            title={
              <div
                style={{
                  textAlign: "center",
                  fontSize: "20px ",
                }}
              >
                Thêm Mã Khuyến Mãi
              </div>
            }
            style={{
              width: 700,
              height: "max-content",
              marginTop: "50px",
              marginLeft: "65%",
            }}
          >
            <Form form={form} onFinish={onFinish}>
              <Row
                gutter={24}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: 10,
                }}
              >
                <span style={{ fontWeight: "bold" }}>Mã khuyến mãi:</span>

                <Form.Item
                  name={"voucherCode"}
                  rules={[{ required: true, message: "Không được để trống!" }]}
                >
                  <Input placeholder="Nhập mã giảm giá..." />
                </Form.Item>
              </Row>
              <Row
                gutter={24}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: 10,
                }}
              >
                <span style={{ fontWeight: "bold" }}>Tên mã khuyến mãi:</span>
                <Form.Item
                  name={"voucherName"}
                  rules={[{ required: true, message: "Không được để trống!" }]}
                >
                  <Input placeholder="Nhập tên mã giảm giá..." />
                </Form.Item>
              </Row>
              <Row
                gutter={24}
                style={{
                  display: "flex",
                }}
              >
                <Col span={12}>
                  <p style={{ fontWeight: "bold" }}>Hình thức giảm giá:</p>

                  <Select
                    placeholder="Vui lòng chọn"
                    style={{
                      width: 130,
                    }}
                    onChange={handleChangeVoucherType}
                    options={[
                      {
                        value: 1,
                        label: "Bán",
                      },
                      {
                        value: 2,
                        label: "Thuê",
                      },
                    ]}
                  />
                </Col>
                <Col span={12}>
                  <span style={{ fontWeight: "bold" }}>Nhập thời hạn:</span>
                  <Form.Item
                    name={"startDate"}
                    rules={[
                      { required: true, message: "Không được để trống!" },
                    ]}
                  >
                    <DatePicker.RangePicker
                      onChange={handleDateChange}
                      placeholder={["Từ ngày", "Đến ngày"]}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row
                gutter={24}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: 10,
                }}
              >
                <span style={{ fontWeight: "bold" }}>Tên mã khuyến mãi:</span>
                <Form.Item
                  name={"description"}
                  rules={[{ required: true, message: "Không được để trống!" }]}
                >
                  <TextArea rows={4} placeholder="Nhập mô tả của voucher..." />
                </Form.Item>
              </Row>

              <Row
                gutter={24}
                style={{
                  display: "flex",
                }}
              >
                <Col span={12}>
                  <p style={{ fontWeight: "bold" }}>Giảm giá tối đa:</p>
                  <Form.Item
                    name={"maxDiscount"}
                    rules={[
                      { required: true, message: "Không được để trống!" },
                    ]}
                  >
                    <Input suffix="%" placeholder="Vui lòng nhập..." />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <span style={{ fontWeight: "bold" }}>Số tiền giảm giá:</span>
                  <Form.Item
                    name={"createDate"}
                    rules={[
                      { required: true, message: "Không được để trống!" },
                    ]}
                  >
                    <Input placeholder="Vui lòng nhập..." />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item style={{ marginLeft: "40%", marginTop: "35px" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ backgroundColor: "red" }}
                  onClick={handleCancel}
                >
                  Hủy
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: "20px", backgroundColor: "green" }}
                >
                  Thêm
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Space>
      </div>
    </div>
  );
}

export default VoucherForm;
