import Head from "next/head";
import Carousel from "../components/Home/Carousel";
import CakeCard from "../components/Home/CakeCard";
import BlogsCard from "../components/Home/BlogsCard";
import axios from "../helpers/Axios";
import { Row, Col } from "antd";
import SurprisepackCard from "../components/Home/SurprisepackCard";

export default function Home({ trending }) {
  try {
    const { blogs, cakes, surprise_packs } = trending[0];
    return (
      <main>
        <Head>
          <title>CakeSpot </title>
          <meta name="description" content="HomeBaked Cakes" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Carousel />

        {/* Trending Cakes */}
        <div className="titleWrapper">
          <h1 className="headings">Trending</h1>
          <h2>Cakes</h2>
        </div>
        <section className="trendingCakes">
          <Row>
            {cakes.map((cake, index) => (
              <Col key={cake.id} xs={24} sm={12} md={6} lg={6} xl={6}>
                <CakeCard cake={cake} />
              </Col>
            ))}
          </Row>
        </section>

        {/* Trending Blogs */}
        <div className="titleWrapper">
          <h1 className="headings">Read About </h1>
          <h2>Blogs</h2>
        </div>

        <section className="Trendingblogs">
          <Row>
            {blogs.map((blog) => (
              <Col
                style={{ padding: "20px" }}
                key={blog.id}
                xs={24}
                sm={12}
                md={12}
                lg={12}
                xl={12}
              >
                <BlogsCard blog={blog} />
              </Col>
            ))}
          </Row>
        </section>

        {/* Surprise packs cards */}

        <div className="titleWrapper">
          <h1 className="headings">Happiness</h1>
          <h2>Surprise Packs</h2>
        </div>

        <section>
          <Row>
            {surprise_packs.map((packs) => (
              <Col key={packs.id} xs={24} sm={12} md={6} lg={6} xl={6}>
                <SurprisepackCard pack={packs} />
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
  } catch (e) {
    return (
      <div className="fallback">
        <h1>CMS server is Down</h1>
      </div>
    );
  }
}

export async function getServerSideProps(context) {
  const res = await axios.get("home-page-showcases");
  let trending;
  if (!res.status == 200) {
    trending = [];
  }
  trending = res.data;
  return {
    props: { trending },
  };
}
