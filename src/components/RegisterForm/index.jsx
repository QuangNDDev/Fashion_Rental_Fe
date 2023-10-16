import React, { useState } from "react";
import {
  LoadingOutlined,
  UserAddOutlined,
  SolutionOutlined,
  UserOutlined,
  UploadOutlined,
  CheckCircleTwoTone,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Steps, Card, Form, Input, Button, Radio, Upload } from "antd";
import "./RegisterForm.css";

const { Step } = Steps;
const { Item } = Form;

const RegisterForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState(""); //theo dõi lựa chọn tại bước 2
  const [createDetails, setCreateDetails] = useState(null);
  const [chooseRoleDetail, setChooseRoleDetail] = useState(null);
  const [formCus, setFormCus] = useState("");
  const [formPO, setFormPO] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  //luu gia trị tát cả các field đã nhập vao state
  const [allDetails, setAllDetails] = useState({
    createDetails: null,
    chooseRoleDetail: null,
    formDetails: null,
  });
  console.log(allDetails);
  // Khi hoàn thành bước 1
  const onFinishCreateForm = (values) => {
    setCreateDetails(values);
    setCurrentStep(1);
    //luu gia trị step 1
    setAllDetails({ ...allDetails, createDetails: values });
  };
  //radioButton

  const onFinishChooseRoleForm = (values) => {
    setChooseRoleDetail(values);

    setCurrentStep(2);

    if (values.roleID === "1") {
      setSelectedRole("customer");
    } else {
      setSelectedRole("productOwner");
    }

    // Luu gia tri step 2
    setAllDetails({ ...allDetails, chooseRoleDetail: values });
  };

  // const onFinishFormCus = (values) => {
  //   setFormCus(values);
  //   setCurrentStep(3);
  //   // Luu gia tri step 3 cho form customer
  //   setAllDetails({ ...allDetails, formCus: values });
  // };

  // const onFinishFormPO = (values) => {
  //   setFormPO(values);
  //   setCurrentStep(3);
  //   // Luu gia tri step 3 cho form product owner
  //   setAllDetails({ ...allDetails, formPO: values });
  // };

  const onFishFormDetails = (values) => {
    setAllDetails({ ...allDetails, formDetails: values });
    setCurrentStep(3);
  };

  return (
    <div className="register-form-container">
      <Card className="register-card">
        <Steps current={currentStep} onChange={setCurrentStep}>
          <Step
            title="Thông tin"
            icon={<UserOutlined style={{ color: "green" }} />}
          />
          <Step
            title="Chọn vai trò"
            icon={<SolutionOutlined style={{ color: "green" }} />}
          />
          <Step
            title="Thông tin chi tiết"
            icon={<LoadingOutlined style={{ color: "green" }} />}
          />
          <Step
            title="Đăng ký"
            icon={<UserAddOutlined style={{ color: "green" }} />}
          />
        </Steps>
        {currentStep === 0 && (
          <Card className="card__children">
            <CreateForm onFinish={onFinishCreateForm} />
          </Card>
        )}
        {currentStep === 1 && (
          <Card className="card__children--chooserole">
            <ChooseRole onFinish={onFinishChooseRoleForm} />
          </Card>
        )}
        {currentStep === 2 && (
          <Card className="card__children">
            {selectedRole === "customer" ? (
              <FormCus onFinish={onFishFormDetails} />
            ) : (
              <FormPO onFinish={onFishFormDetails} />
            )}
          </Card>
        )}

        {currentStep === 3 && (
          <Card className="card__children--icon">
            {registrationSuccess ? <DoneSuccess /> : <DoneFailure />}
          </Card>
        )}
      </Card>
    </div>
  );

  function CreateForm({ onFinish }) {
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

  function ChooseRole({ onFinish }) {
    const [value, setValue] = useState(1);
    const onChange = (e) => {
      console.log("radio checked", e.target.value);
      setValue(e.target.value);
    };
    return (
      <Form onFinish={onFinish}>
        <Form.Item
          label="Chọn vai trò"
          initialValue={selectedRole}
          name={"roleID"}
          rules={[
            {
              required: true,
              message: "Vui lòng điền chọn vai trò",
            },
          ]}
        >
          <br />
          <div className="Custom-radio">
            <Radio.Group
              onChange={(e) => setSelectedRole(e.target.value)}
              value={selectedRole}
            >
              <div className="radio-container">
                <Radio
                  style={{ marginRight: "77px", marginTop: "10px" }}
                  value="1"
                >
                  <p>Khách Hàng</p>
                </Radio>
                <Radio
                  style={{ marginTop: "10px", marginLeft: "70px" }}
                  value="2"
                >
                  <p style={{ marginRight: "52.5px" }}>Chủ Sản Phẩm</p>
                </Radio>
              </div>
            </Radio.Group>
            <div className="image-container">
              <Card
                size="small"
                title="Khách Hàng"
                style={{
                  width: 260,
                }}
              >
                <p>
                  <img
                    style={{ width: "110px" }}
                    src="https://cdn-icons-png.flaticon.com/512/4143/4143099.png"
                    alt=""
                  />
                </p>
                <ul className="card__content">
                  <li>Thuê Hoặc Mua Sản Phẩm</li>
                  <li>Đảm Bảo Quyền Lợi Khách Hàng</li>
                </ul>
              </Card>
              <Card
                size="small"
                title="Chủ Sản Phẩm"
                style={{
                  width: 260,
                }}
              >
                <p>
                  <img
                    style={{ width: "110px" }}
                    src="https://cdn-icons-png.flaticon.com/512/4143/4143099.png"
                    alt=""
                  />
                </p>
                <ul className="card__content">
                  <li>Thuê Hoặc Mua Sản Phẩm</li>
                  <li>Đảm Bảo Quyền Lợi Khách Hàng</li>
                </ul>
              </Card>
            </div>
          </div>
        </Form.Item>
        <Button className="btn-submit" type="primary" htmlType="submit">
          Tiếp Tục
        </Button>
      </Form>
    );
  }

  function FormCus({ onFinish }) {
    const [value, setValue] = useState(1);
    const onChange = (e) => {
      console.log("radio checked", e.target.value);
      setValue(e.target.value);
    };

    return (
      <Form onFinish={onFinish}>
        <Form.Item
          label="Họ và Tên"
          name={"fullName"}
          rules={[
            {
              required: true,
              message: "Vui lòng điền tên khách hàng",
            },
            {
              pattern: /^[^\d]+$/,
              message: "Họ và tên không hợp lệ",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name={"phone"}
          rules={[
            {
              required: true,
              message: "Vui lòng điền số điện thoại",
            },
            {
              pattern: /^\d{10}$/,
              message: "Số điện thoại không hợp lệ",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Giới tính"
          name={"sex"}
          rules={[
            {
              required: true,
              message: "Vui lòng chọn giới tính",
            },
          ]}
        >
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}>Nam</Radio>
            <Radio value={2}>Nữ</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Ảnh đại diện"
          name={"avatarUrl"}
          rules={[
            {
              required: true,
              message: "Vui lòng chọn ảnh đại diện",
            },
          ]}
        >
          <Upload
            maxCount={1}
            // onChange={handleFileChange}
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />}>Select Image</Button>
          </Upload>
        </Form.Item>

        <Button className="btn-submit" type="primary" htmlType="submit">
          Đăng Ký
        </Button>
      </Form>
    );
  }

  function FormPO({ onFinish }) {
    return (
      <Form onFinish={onFinish}>
        <Form.Item
          label="Họ và Tên"
          name={"fullName"}
          rules={[
            {
              required: true,
              message: "Vui lòng điền tên khách hàng",
            },
            {
              pattern: /^[^\d]+$/,
              message: "Họ và tên không hợp lệ",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name={"phone"}
          rules={[
            {
              required: true,
              message: "Vui lòng điền số điện thoại",
            },
            {
              pattern: /^\d{10}$/,
              message: "Số điện thoại không hợp lệ",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Địa chỉ"
          name={"address"}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập địa chỉ",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Ảnh đại diện"
          name={"avatarUrl"}
          rules={[
            {
              required: true,
              message: "Vui lòng chọn ảnh đại diện",
            },
          ]}
        >
          <Upload
            maxCount={1}
            // onChange={handleFileChange}
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
        </Form.Item>

        <Button className="btn-submit" type="primary" htmlType="submit">
          Đăng Ký
        </Button>
      </Form>
    );
  }

  function DoneSuccess() {
    return (
      <div className="card__children--icons--icon ">
        <CheckCircleTwoTone
          twoToneColor="#52c41a"
          style={{ fontSize: "40px" }}
        />
        <p>Đăng ký thành công</p>
      </div>
    );
  }

  function DoneFailure() {
    return (
      <div className="card__children--icons--icon ">
        <CloseCircleOutlined style={{ color: "red", fontSize: "40px" }} />
        <p>Đăng ký thât bại</p>
      </div>
    );
  }
};

export default RegisterForm;
