import axios from "../../helpers/Axios";
import Head from "next/head";
import { Row, Col } from "antd";
import styles from "../../styles/SingleBlogPage.module.scss";
import Moment from "react-moment";
import { MdDateRange } from "react-icons/md";
import { AiOutlineRead, AiOutlineUser } from "react-icons/ai";
import marked from "marked";
import { useRef, useEffect } from "react";
marked.use({
  baseUrl: `${process.env.CMSDOMAIN}`,
});

marked.Renderer.prototype.paragraph = (text) => {
  if (text.startsWith("<img")) {
    return text + "\n";
  }
  return "<p>" + text + "</p>";
};

function Blog({ blog }) {
  const htmlDiv = useRef();

  const {
    title,
    author,
    created_at,
    description,
    html,
    readTime,
    showCaseImage,
  } = blog;

  const html_render = marked(html);
  console.log(html_render);
  useEffect(function () {
    setTimeout(() => {
      htmlDiv.current.innerHTML = html_render;
    }, 2000);
  }, []);

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
            <AiOutlineUser />
            <p>{author}</p>
            <MdDateRange />
            <p>
              <Moment format="MMMM Do YYYY" date={created_at}></Moment>
            </p>
            <AiOutlineRead />
            <p>{readTime}</p>
          </div>
        </div>
        <div className={styles.render}>
          <div ref={htmlDiv}></div>
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
