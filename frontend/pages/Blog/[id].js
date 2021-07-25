import axios from "../../helpers/Axios";
import Head from "next/head";
import { Row, Col } from "antd";
import styles from "../../styles/SingleBlogPage.module.scss";
import Moment from "react-moment";

function Blog({ blog }) {
  const {
    title,
    author,
    created_at,
    description,
    html,
    externaLink,
    readTime,
    showCaseImage,
  } = blog;
  return (
    <section className={styles.blog}>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="keywords"
          content="Nagercoil Cakes,kanyakumari cakes,cakes"
        />
      </Head>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div
          style={{
            backgroundImage: `url(${process.env.CMSDOMAIN}${showCaseImage.url})`,
          }}
          className={styles.banner}
        >
          <h1>{title}</h1>
        </div>
        <div className={styles.blogHeader}>
          <p className={styles.desc}>{description}</p>
          <div className={styles.details}>
            <p>author:{author}</p>
            <p>
              <Moment format="D-MMMM-YYYY" date={created_at}></Moment>
            </p>
            <p>{readTime}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

Blog.getInitialProps = async (ctx) => {
  const res = await axios.get(`blogs/${ctx.query.id}`);
  const blog = res.data;
  return {
    blog,
  };
};

export default Blog;
