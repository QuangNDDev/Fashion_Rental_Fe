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
    console.log(dates);

    // Định dạng phạm vi ngày tháng được chọn thành chuỗi "dd/mm/yyyy HH:mm:ss" với múi giờ địa phương của Việt Nam
    const formattedStartDate = formatDateWithTime(dates[0]);
    const formattedEndDate = formatDateWithTime(dates[1]);
    console.log(`Ngày bắt đầu đã định dạng: ${formattedStartDate}`);
    console.log(`Ngày kết thúc đã định dạng: ${formattedEndDate}`);
  };

  function formatDateWithTime(date) {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };

    const formattedDate = date
      ? new Intl.DateTimeFormat("vi-VN", options).format(date)
      : "";
    return formattedDate;
  }
  const onFinish = (values) => {
    // description: values.description;
    // discountAmount: values.discountAmount;
    // voucherTypeID: voucherType;
    // voucherCode: values.voucherCode;
    // voucherName: values.voucherName;
  };

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
              marginLeft: "50%",
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
                    name={"discountAmount"}
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
