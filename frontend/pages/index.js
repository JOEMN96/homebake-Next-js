import Head from "next/head";
import Carousel from "../components/Home/Carousel";
import CakeCard from "../components/Home/CakeCard";
import BlogsCard from "../components/Home/BlogsCard";
import axios from "../helpers/Axios";
import { Row, Col } from "antd";

export default function Home({ trending }) {
  const { blogs, cakes } = trending[0];

  return (
    <main>
      <Head>
        <title>CakeSpot </title>
        <meta name="description" content="HomeBaked Cakes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Carousel />

      {/* Trending Cakes */}

      <h1 className="headings">Trending Cakes</h1>
      <section className="trendingCakes">
        <Row>
          {cakes.map((cake, index) => (
            <Col key={cake.id} xs={24} sm={12} md={6} lg={6} xl={6}>
              <CakeCard cake={cake} trending={index} />
            </Col>
          ))}
        </Row>
      </section>

      {/* Trending Blogs */}
      <h1 className="headings">Trending Blogs</h1>

      <section className="Trendingblogs">
        <Row>
          {blogs.map((blog) => (
            <Col key={blog.id} xs={24} sm={12} md={6} lg={6} xl={6}>
              <BlogsCard blog={blog} />
            </Col>
          ))}
        </Row>
      </section>

      <style jsx>
        {`
          main {
            min-height: 100vh;
          }
        `}
      </style>
    </main>
  );
}

export async function getServerSideProps(context) {
  const res = await axios.get("home-page-showcases");
  const trending = res.data;
  return {
    props: { trending },
  };
}
