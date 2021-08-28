import { Input, Form, Button } from "antd";
import styles from "../styles/SignUp.module.scss";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import { BiLogIn } from "react-icons/bi";
import Link from "next/link";

import ButtonLoading from "../components/Login/ButtonWithLoading";
import { useState } from "react";
import axios from "../helpers/backendAxios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { loadCart } from "../Redux/Actions/Cart";

function SignIn() {
  const [button, setButton] = useState(false);
  const [errors, setErrors] = useState([]);
  const [done, setDone] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const val = { ...values };

    setErrors([]);
    try {
      const res = await axios.post("/signIn", val);
      if (res.status === 200) {
        setButton(false);
        setDone(true);
        dispatch(loadCart());
        router.push("/Profile");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setErrors([{ msg: error.response.data.err }]);
      } else if (error.response?.status === 400) {
        setErrors([{ msg: error.response.data.errors[0].msg }]);
      }
    }
  };

  return (
    <section className={styles.signUp}>
      <div className="titleWrapper">
        <h1 className="headings">Welcome back</h1>
        <h2>Sign In</h2>
      </div>
      <Form onFinish={onFinish}>
        <h1>Logo here</h1>

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

        <div className={styles.errorArea}>
          {errors?.length != 0 &&
            errors?.map((error, index) => {
              return <p key={index}>{error.msg}</p>;
            })}
        </div>
        <div className={styles.sucessArea}>
          {done ? <p> ...Logging In </p> : ""}
        </div>
        <div className={styles.signUpBtn}>
          <ButtonLoading
            htmlType="submit"
            elms={{ name: "Log In", status: button }}
          />
          <Button style={{ margin: "0 10px" }}>
            <GoogleOutlined /> Log In With Google
          </Button>
        </div>
        <div className={styles.alreadyHaveAc}>
          <Link href="/SignUp">
            <a>
              <p>
                Don't have account SignUp Here <BiLogIn />
              </p>
            </a>
          </Link>
        </div>
      </Form>
    </section>
  );
}

export default SignIn;
