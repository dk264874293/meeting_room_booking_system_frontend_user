/*
 * @Author: 汪培良 rick_wang@yunquna.com
 * @Date: 2024-12-27 17:20:20
 * @LastEditors: 汪培良 rick_wang@yunquna.com
 * @LastEditTime: 2025-02-01 11:02:22
 * @FilePath: /meeting_room_booking_system_frontend_user/src/page/Login/Index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Checkbox, Form, Input, message } from "antd";
import { login } from "../../interface/interfaces.ts";
import "./login.css";

interface LoginUser {
  username: string;
  password: string;
}

const layout1 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const layout2 = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};

export function Login() {
  const navigate = useNavigate();
  const onFinish = async (values: LoginUser) => {
    const res = await login(values.username, values.password);
    console.log("res", res);
    if (res.status === 201 || res.status === 200) {
      message.success("登录成功");
      const { data } = res.data;

      localStorage.setItem("access_token", data.accessToken);
      localStorage.setItem("refresh_token", data.refreshToken);
      localStorage.setItem("user_info", JSON.stringify(data.userInfo));
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      message.error(res.data?.message || "系统繁忙，请稍后再试");
    }
  };

  return (
    <div id="login-container">
      <h1>会议室预订系统</h1>
      <Form {...layout1} onFinish={onFinish} colon={false} autoComplete="off">
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: "请输入用户名!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入密码!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...layout2}>
          <div className="links">
            <Link to="/register">创建账号</Link>
            <Link to="/update_password">忘记密码</Link>
          </div>
        </Form.Item>

        <Form.Item {...layout2}>
          <Button className="btn" type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
