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
import {
  Steps,
  Card,
  Form,
  Input,
  Button,
  Radio,
  Upload,
  notification,
} from "antd";
import "./RegisterForm.css";
import { storage } from "../../firebase/firebase";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

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
  const [urlImage, setUrlImage] = useState("");

  //convert img to url
  const handleFileChange = (event) => {
    if (event.file) {
      const imageRef = ref(storage, `images/${event.file.name + v4()}`);
      uploadBytes(imageRef, event.file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setUrlImage(url);
        });
      });
    }
  };

  //luu gia trị tát cả các field đã nhập vao state
  const [allDetails, setAllDetails] = useState({
    createDetails: null,
    chooseRoleDetail: null,
    // formDetails: null,
    formCus: {},
    formPO: {},
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

  // const onFishFormDetails = (values) => {
  //   setAllDetails({ ...allDetails, formDetails: values });
  //   setCurrentStep(3);
  // };
  const onFinishFormCus = (values) => {
    setAllDetails({ ...allDetails, formCus: values });
    setCurrentStep(3);
  };

  const onFinishFormPO = (values) => {
    setAllDetails({ ...allDetails, formPO: values });
    setCurrentStep(3);
  };
  //ham hien thi thong bao
  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  return (
    <div className="register-form-container">
      <Card className="register-card">
        <Steps current={currentStep} onChange={setCurrentStep}>
          <Step
            title="Thông tin"
            disabled={currentStep < 0}
            icon={<UserOutlined style={{ color: "green" }} />}
            onClick={() => {
              if (currentStep >= 0) {
                setCurrentStep(0);
              } else {
                openNotificationWithIcon(
                  "info",
                  "Vui lòng hoàn thành bước 0 để tiếp tục."
                );
              }
            }}
          />
          <Step
            style={{ cursor: "pointer" }}
            title="Chọn vai trò"
            disabled={currentStep < 1}
            icon={<SolutionOutlined style={{ color: "green" }} />}
            onClick={() => {
              if (currentStep >= 1) {
                // Bước 1 đã hoàn thành, cho phép chuyển đến bước 1
                setCurrentStep(1);
              } else {
                // Bước 1 chưa hoàn thành, hiển thị thông báo
                openNotificationWithIcon(
                  "info",
                  "Vui lòng hoàn thành bước nhập Thông Tin để tiếp tục."
                );
              }
            }}
          />
          <Step
            title="Thông tin chi tiết"
            disabled={currentStep < 2}
            style={{ cursor: "pointer" }}
            icon={<LoadingOutlined style={{ color: "green" }} />}
            onClick={() => {
              if (currentStep >= 2) {
                setCurrentStep(2);
              } else {
                openNotificationWithIcon(
                  "info",
                  "Vui lòng chọn Vai Trò để tiếp tục."
                );
              }
            }}
          />
          <Step
            title="Đăng ký"
            disabled={currentStep < 3}
            style={{ cursor: "pointer" }}
            icon={<UserAddOutlined style={{ color: "green" }} />}
            onClick={() => {
              if (currentStep >= 3) {
                setCurrentStep(3);
              } else {
                openNotificationWithIcon(
                  "info",
                  "Vui lòng điền thông tin chi tiết để hoàn tất."
                );
              }
            }}
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
          <Card
            title={
              selectedRole === "customer"
                ? "Đăng kí khách hàng"
                : "Đăng kí chủ sản phẩm"
            }
            className="card__children--form"
          >
            {selectedRole === "customer" ? (
              <FormCus
                onFinish={onFinishFormCus}
                initialValues={allDetails.formCus}
              />
            ) : (
              <FormPO
                onFinish={onFinishFormPO}
                initialValues={allDetails.formPO}
              />
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
                className="img__chooserole"
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
                className="img__chooserole"
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
            onChange={handleFileChange()}
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
        <br />
        <br />
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
        <br />
        <br />
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
        <br />
        <br />

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
        <br />
        <br />

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
        <p style={{ fontWeight: "bold" }}>Đăng ký thành công</p>
      </div>
    );
  }

  function DoneFailure() {
    return (
      <div className="card__children--icons--icon ">
        <CloseCircleOutlined style={{ color: "red", fontSize: "40px" }} />
        <p style={{ fontWeight: "bold" }}>Đăng ký thât bại</p>
      </div>
    );
  }
};

export default RegisterForm;
