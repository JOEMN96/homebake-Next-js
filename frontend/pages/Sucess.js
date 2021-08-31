import { useEffect } from "react";
import axios from "../helpers/backendAxios";
import styles from "../styles/Sucess.module.scss";
import Link from "next/link";

function Sucess() {
  return (
    <section className={styles.sucess}>
      <section className="contactPageHeader"></section>

      <h3>
        Your Order is Sucessfully completed, You will receive a call from Our
        side Shortly !
      </h3>
      <div>
        <Link href="/">
          <a>Back to Home</a>
        </Link>
      </div>
      <style jsx>
        {`
          .contactPageHeader {
            background: url(/images/Sucess.svg) no-repeat center center;
            background-position: center center;
            background-size: 10%;
            background-repeat: no-repeat;
          }
          .contactPageHeader {
            height: 40vh;
          }
        `}
      </style>
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
    console.log(error);
    ctx.res.writeHeader(307, { Location: "/" });
    ctx.res.end();
    return { props: { data: null } };
  }
};

export default Sucess;
