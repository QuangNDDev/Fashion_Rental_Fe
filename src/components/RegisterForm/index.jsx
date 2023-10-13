import React, { useState } from "react";
import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Steps, Card, Form, Input, Button } from "antd";
import "./RegisterForm.css";

const { Step } = Steps;
const { Item } = Form;

const RegisterForm = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const [createDetails, setCreateDetails] = useState(null);
  // Khi hoàn thành bước 1
  const onFinishCreateForm = (values) => {
    setCreateDetails(values);
    setCurrentStep(1);
    console.log(values);
  };

  return (
    <div className="register-form-container">
      <Card className="register-card">
        <Steps current={currentStep} onChange={setCurrentStep}>
          <Step title="Thông tin" icon={<UserOutlined />} />
          <Step title="Chọn vai trò" icon={<SolutionOutlined />} />
          <Step title="Thông tin chi tiết" icon={<LoadingOutlined />} />
          <Step title="Đăng kí thành công" icon={<SmileOutlined />} />
        </Steps>
        <Card className="card_children">
          <LoginForm onFinish={onFinishCreateForm} />
        </Card>
      </Card>
    </div>
  );

  function LoginForm({ onFinish }) {
    return (
      <Form onFinish={onFinish}>
        <Form.Item
          label="Email"
          name={"email"}
          rules={[
            {
              required: true,
              type: "email",
              message: "Vui lòng điền Email",
            },
          ]}
        >
          <Input style={{ width: "348px", marginLeft: "24px" }} />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          name={"password"}
          rules={[
            {
              required: true,
              message: "Vui lòng điền password",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Button className="btn-submit" type="primary" htmlType="submit">
          Tiếp Tục
        </Button>
      </Form>
    );
  }
};

export default RegisterForm;
