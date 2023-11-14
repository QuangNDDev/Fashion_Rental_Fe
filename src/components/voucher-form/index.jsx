import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  notification,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import React, { useState } from "react";

function VoucherForm() {
  const [form] = Form.useForm();
  const [voucherType, setVoucherType] = useState(1);
  const [dateRange, setDateRange] = useState([null, null]);
  const productownerId = localStorage.getItem("productownerId");
  const [api, contextHolder] = notification.useNotification();

  const handleCancel = () => {
    form.resetFields();
  };

  const handleDateChange = (dates) => {
    if (Array.isArray(dates) && dates.length === 2) {
      setDateRange(dates);
      const formattedStartDate = formatDateToString(dates[0]);
      const formattedEndDate = formatDateToString(dates[1]);

      console.log(`Ngày bắt đầu đã định dạng: ${formattedStartDate}`);
      console.log(`Ngày kết thúc đã định dạng: ${formattedEndDate}`);
    }
  };

  function formatDateToString(date) {
    if (!(date instanceof Date)) {
      return "";
    }
  }
  const onFinish = async (values) => {
    const [startDate, endDate] = dateRange;
    const voucherData = {
      description: values.description,
      discountAmount: values.discountAmount,
      voucherCode: values.voucherCode,
      voucherName: values.voucherName,
      status: "true",
      startDate: startDate,
      endDate: endDate,
      maxDiscount: values.maxDiscount,
      voucherTypeID: voucherType,
      productownerID: productownerId,
    };
    try {
      const response = await axios.post(
        "http://fashionrental.online:8080/voucher",
        voucherData
      );
      const voucherName = values.voucherName;
      api["success"]({
        message: "Thêm Mã Khuyến Mãi Thành Công",
        description: `Bạn đã thêm ${voucherName} thành công`,
      });
      form.resetFields();
      console.log("Voucher successful", response.data);
    } catch (error) {
      console.error("Add new voucher failed", error);
      api["error"]({
        message: "Thêm Mã Khuyến Mãi Thất Bại",
        description: `Bạn đã thêm ${values.voucherName}vo thất bại`,
        duration: 1000,
      });
    }
  };

  const handleChangeVoucherType = (value) => {
    console.log(`selected ${value}`);
    setVoucherType(value);
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
          {contextHolder}
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
              marginLeft: "60%",
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
                  <p style={{ fontWeight: "bold" }}>Phần trăm giảm giá:</p>
                  <Form.Item
                    name={"discountAmount"}
                    rules={[
                      { required: true, message: "Không được để trống!" },
                    ]}
                  >
                    <Input
                      type="number"
                      suffix={<span style={{ fontWeight: "bold" }}>%</span>}
                      placeholder="Vui lòng nhập..."
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <span style={{ fontWeight: "bold" }}>
                    Số tiền giảm giá tối đa:
                  </span>
                  <Form.Item
                    name={"maxDiscount"}
                    rules={[
                      { required: true, message: "Không được để trống!" },
                    ]}
                  >
                    <Input
                      type="number"
                      suffix="VNĐ"
                      placeholder="Vui lòng nhập..."
                    />
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
