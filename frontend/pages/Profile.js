import { useState, useEffect } from "react";
import axios from "../helpers/backendAxios";
import { useRouter } from "next/router";
import { Row, Col } from "antd";
import styles from "../styles/Profile.module.scss";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { loadLocalStorage } from "../Redux/Actions/Cart";
import { isUserLoggedIn } from "../Redux/Actions/User";

function Profile({ data }) {
  const [profile, setProfile] = useState(undefined);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = async () => {
    const res = await axios.get("logout");
    dispatch(loadLocalStorage());
    dispatch(isUserLoggedIn());
    router.push("/");
  };

  return (
    <section>
      <Row>
        <Col
          xs={24}
          sm={12}
          className={styles.profileArea}
          md={12}
          lg={12}
          xl={12}
        >
          <div className={styles.first}>
            <Avatar size="large" icon={<UserOutlined />} />
            <h2>Hi, Welcome Back {data.name} !</h2>
          </div>
          <p>Email: {data.email}</p>
          <button onClick={handleLogout}> LogOut </button>
        </Col>
        <Col
          xs={24}
          sm={12}
          md={12}
          className={styles.uploadArea}
          lg={12}
          xl={12}
        ></Col>
      </Row>
    </section>
  );
}

export const getServerSideProps = async (ctx) => {
  const headers = ctx.req.headers;

  try {
    const res = await axios.get("profile", {
      headers,
    });
    return { props: { data: res.data } };
  } catch (error) {
    ctx.res.writeHeader(307, { Location: "/SignIn" });
    ctx.res.end();
    return { props: { data: null } };
  }
};

export default Profile;
