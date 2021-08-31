import { useEffect } from "react";
import axios from "../helpers/backendAxios";
import styles from "../styles/Sucess.module.scss";
import Link from "next/link";

function Failure() {
  return (
    <section className={styles.sucess}>
      <section className="contactPageHeader"></section>

      <h3>Something Went Wrong give us a call @ 9087531393</h3>
      <div>
        <Link href="/">
          <a>Back to Home</a>
        </Link>
      </div>
      <style jsx>
        {`
          .contactPageHeader {
            background: url(/images/serverDown.svg) no-repeat center center;
            background-position: center center;
            background-size: 30%;
            background-repeat: no-repeat;
          }
          .contactPageHeader {
            height: 50vh;
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

export default Failure;
