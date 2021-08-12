import axios from "../../helpers/Axios";
import Head from "next/head";
import styles from "../../styles/SingleBlogPage.module.scss";
import Moment from "react-moment";
import { MdDateRange } from "react-icons/md";
import { AiOutlineRead, AiOutlineUser } from "react-icons/ai";
import marked from "marked";
marked.use({
  baseUrl: `https://cakespotcms.herokuapp.com/`,
});

marked.Renderer.prototype.paragraph = (text) => {
  if (text.startsWith("<img")) {
    return text + "\n";
  }
  return "<p>" + text + "</p>";
};

function Blog({ blog }) {
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
            backgroundImage: `url(${showCaseImage.url})`,
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
          <div dangerouslySetInnerHTML={{ __html: html_render }}></div>
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
