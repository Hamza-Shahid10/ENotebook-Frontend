import React from "react";
import { Form, Input, Button, Card, message } from "antd";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    try {
      const res = await api.post("/api/auth/login", values);
      localStorage.setItem("token", res.data.authToken);

      const resUser = await api.post("/api/auth/get-user");
      localStorage.setItem("user_id", resUser.data.user._id);
      localStorage.setItem("user_name", resUser.data.user.name);

      messageApi.success("Login successful!");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      messageApi.error(err.response?.data?.error || "Invalid credentials");
      console.log(err);
    }
  };

  return (
    <div className="center-container">
      {contextHolder}
      <Card title="Login" style={{ width: 380 }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input type="email" placeholder="Enter your email" />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form>

        <p style={{ marginTop: 20 }}>
          Don't have an account?{" "}
          <a onClick={() => navigate("/signup")}>Signup</a>
        </p>
      </Card>
    </div>
  );
};

export default Login;
