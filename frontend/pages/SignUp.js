import { Input, Form, Button } from "antd";
import styles from "../styles/SignUp.module.scss";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  MobileOutlined,
  GoogleOutlined,
} from "@ant-design/icons";

import ButtonLoading from "../components/Login/ButtonWithLoading";
import { useState } from "react";
import axios from "../helpers/backendAxios";

function SignUp() {
  const [button, setButton] = useState(false);

  const onFinish = async (values) => {
    try {
      const res = await axios.post("/signUp", values);
      console.log(res);
    } catch (error) {
      console.log(error);
    }

    console.log("Success:", values);
    setButton(true);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setButton(false);
  };

  return (
    <section className={styles.signUp}>
      <div className="titleWrapper">
        <h1 className="headings">Create Account</h1>
        <h2>Sign Up</h2>
      </div>
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <h1>Logo here</h1>
        <div className={styles.pw}>
          <Form.Item
            name="name"
            rules={[
              { required: true, message: "Please input your username!" },
              { min: 3, message: "Username must be minimum 5 characters." },
            ]}
          >
            <Input
              placeholder="User Name"
              name="name"
              suffix={<MobileOutlined />}
            />
          </Form.Item>
        </div>
        <div className={styles.pw}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter  Email!",
              },
              {
                type: "email",
                message: "Please enter valid Email!",
              },
            ]}
          >
            <Input placeholder="Email" prefix={<UserOutlined />} />
          </Form.Item>
        </div>
        <div className={styles.pw}>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                min: 8,
                message:
                  "Must be 8 Char Long with atleast 1 Uppercase , 1 Symbol.",
              },
            ]}
          >
            <Input.Password
              placeholder="Password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
        </div>
        <div className={styles.pw}>
          <Form.Item
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Please input your Phone Number!",
              },
              {
                min: 10,
                message: "Must be 10 Digits",
              },
              {
                max: 10,
                message: "Must be 10 Digits",
              },
            ]}
          >
            <Input placeholder="Phone Number" suffix={<MobileOutlined />} />
          </Form.Item>
        </div>
        <div className={styles.signUpBtn}>
          <ButtonLoading
            htmlType="submit"
            elms={{ name: "Sign Up", status: button }}
          />
          <Button style={{ margin: "0 10px" }}>
            <GoogleOutlined /> Sign Up With Google
          </Button>
        </div>
      </Form>
    </section>
  );
}

export default SignUp;
