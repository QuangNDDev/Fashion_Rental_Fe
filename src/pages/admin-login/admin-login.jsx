import { Form, Input, Button, Card, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const handleNavigationAdmin = () => {
    navigate(`/admin`);
  };
  const handleNavigationStaff = () => {
    navigate(`/staff`);
  }
  const handleNavigationProductOwner = () => {
    // const paramValue = idPo;
    navigate(`/productOwner`);
  }

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

        if (response.data.role.roleID == 4) {
          handleNavigationAdmin();
        
        } else if (response.data.role.roleID == 3){
          handleNavigationStaff();
        } else if (response.data.role.roleID == 2){
          handleNavigationProductOwner();
        }
         else {
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
            "url('https://img3.thuthuatphanmem.vn/uploads/2019/10/10/background-anh-dong_032845920.gif')",
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
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Xin vui lòng nhập email!",
                },
              ]}
              style={{ marginBottom: 16 }}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              label="Mật Khẩu"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Xin vui lòng nhập mật khẩu!",
                },
              ]}
              style={{ marginBottom: 24 }}
            >
              <Input.Password size="large" />
            </Form.Item>

            <Form.Item
              wrapperCol={{ span: 24 }}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Đăng Nhập
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
