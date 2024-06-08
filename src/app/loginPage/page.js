"use client";
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Alert } from "antd";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { UserElement } from "@/components/Store";

const LoginPage = () => {
  const setUserDetails = UserElement((state) => state.setUserData);
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const router = useRouter();
  const onFinish = (values) => {
    setUserDetails({
      username,
      password,
    });

    router.push("/dashboard");
  };
  const onFinishFailed = (errorInfo) => {
    Swal.fire({
      title: "Invalid Login ",
      text: `${errorInfo.errorFields[0]?.errors}`,
      icon: "error",
    });
    console.log("error", errorInfo);
  };

  return (
    <div className=" w-screen h-screen p-2 flex items-center justify-center bg-[url('https://picsum.photos/1600/800')] bg-center bg-cover ">
      <Form
        name="normal_login"
        className="bg-[rgba(255,255,255,0.7)] sm:w-[40%] w-full  h-[60%]  rounded-xl flex justify-center items-center flex-col backdrop-blur-sm "
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <h1 className="text-2xl font-bold m-5 text-blue-500">Login</h1>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
          className="sm:w-[40%]"
        >
          <Input
            value={username}
            prefix={<UserOutlined className="p-2" />}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
          className="sm:w-[40%]"
        >
          <Input
            value={password}
            prefix={<LockOutlined className="p-2" />}
            type="password"
            placeholder="Password"
            onChange={(e) => setpassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item className="sm:w-[40%]">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="float-right hover:text-blue-700" href="">
            Forgot password
          </a>
        </Form.Item>
        <Form.Item className="w-[40%]">
          <Button type="primary" htmlType="submit" className="w-full">
            Log in
          </Button>
        </Form.Item>
        <Form.Item>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
