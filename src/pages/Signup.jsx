import React from "react";
import { Form, Input, Button, Card, message } from "antd";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();


  const onFinish = async (values) => {
    try {
      const res = await api.post("/api/auth/create-user", values);
      localStorage.setItem("token", res.data.authToken);

      messageApi.success("Account created successfully!");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      messageApi.error(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="center-container">
      {contextHolder} 
      <Card title="Signup" style={{ width: 380 }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input type="email" placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, min: 5 }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Signup
          </Button>
        </Form>

        <p style={{ marginTop: 20 }}>
          Already have an account?{" "}
          <a onClick={() => navigate("/login")}>Login</a>
        </p>
      </Card>
    </div>
  );
};

export default Signup;
