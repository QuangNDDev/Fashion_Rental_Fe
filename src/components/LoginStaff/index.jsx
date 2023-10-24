import { Form, Input, Button, Card, message, Checkbox } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
const LoginForm = () => {
  const navigate = useNavigate();
  const handleNavigationAdmin = () => {
    navigate(`/admin`);
  };
  const handleNavigationStaff = () => {
    navigate(`/staff`);
  };
  const handleNavigationProductOwner = () => {
    // const paramValue = idPo;
    navigate(`/productOwner`);
  };

  const onFinish = async (values) => {
    const email = values.email;
    const password = values.password;
    console.log("Received values:", values);
    try {
      const response = await axios.post(
        `http://134.209.111.144:8080/account/login?email=` +
          email +
          `&password=` +
          password
      );
      console.log(response);

      if (response.data) {
        localStorage.setItem("accountId", response.data.accountID);
        localStorage.setItem("roleId", response.data.role.roleID);

        if (response.data.role.roleID == 3) {
          handleNavigationStaff();
        } else {
          message.info("Tài khoản của bạn không có quyền truy cập!!!");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
      }}
    >
      <div
        style={{
          flex: 8,
          backgroundImage:
            "url('https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: "cover",
          transform: "translateZ(0)",
        }}
      />
      <div
        style={{
          flex: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        <Card style={{ width: 400 }}>
          <h2 style={{ textAlign: "center", marginBottom: 24 }}>ĐĂNG NHẬP</h2>
          <Form
            name="loginForm"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            style={{ marginTop: "10px" }}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please enter your username!" },
                // { validator: validateEmailOrPhone },
              ]}
            >
              <Input
                style={{ fontSize: "15px", padding: "10px" }}
                prefix={<UserOutlined />}
                placeholder="Email or phone number"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <Input.Password
                style={{ fontSize: "15px", padding: "10px" }}
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Form.Item style={{ width: "100%" }}>
                <Button
                  style={{ width: "100%", height: "43px" }}
                  type="primary"
                  htmlType="submit"
                  // loading={loadings[0]}
                  // onClick={() => enterLoading(0)}
                >
                  Log in
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;