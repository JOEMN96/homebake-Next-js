import { Input, Form, Button } from "antd";
import styles from "../styles/SignUp.module.scss";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  MobileOutlined,
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

function SignUp() {
  const [button, setButton] = useState(false);
  const [errors, setErrors] = useState([]);
  const [done, setDone] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const val = { ...values };

    setErrors([]);
    try {
      const res = await axios.post("/signUp", val);

      if (res.status === 201) {
        setButton(false);
        setDone(true);
        dispatch(loadCart());
        router.push("/Profile");
      }
      console.log(res);
    } catch (error) {
      if (error.response?.status == 400) {
        setDone(false);
        return setErrors(
          error.response.data.errors || [{ msg: error.response.data.msg }]
        );
      }
      setErrors(error.response.data.errors || []);
      setButton(false);
      setDone(false);
    }
  };

  const hangleGoogleAuth = async () => {
    try {
      window.location.href = process.env.NEXT_PUBLIC_BACKEND_URL + "google";
    } catch (error) {
      router.push("/error");
    }
  };

  console.log(process.env.NEXT_PUBLIC_BACKEND_URL);

  return (
    <section className={styles.signUp}>
      <div className="titleWrapper">
        <h1 className="headings">Create Account</h1>
        <h2>Sign Up</h2>
      </div>
      <Form onFinish={onFinish}>
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
        <div className={styles.errorArea}>
          {errors?.length != 0 &&
            errors?.map((error, index) => {
              return <p key={index}>{error.msg}</p>;
            })}
        </div>
        <div className={styles.sucessArea}>
          {done ? <p> Sucess User Created </p> : ""}
        </div>
        <div className={styles.signUpBtn}>
          <ButtonLoading
            htmlType="submit"
            elms={{ name: "Sign Up", status: button }}
          />
          <Button onClick={hangleGoogleAuth} style={{ margin: "0 10px" }}>
            <GoogleOutlined /> Sign Up With Google
          </Button>
        </div>
        <div className={styles.alreadyHaveAc}>
          <Link href="/SignIn">
            <a>
              <p>
                Already have account SignIn <BiLogIn />
              </p>
            </a>
          </Link>
        </div>
      </Form>
    </section>
  );
}

export default SignUp;
