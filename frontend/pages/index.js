import Head from "next/head";
import Carousel from "../components/Home/Carousel";
import CakeCard from "../components/Home/CakeCard";
import BlogsCard from "../components/Home/BlogsCard";
import axios from "../helpers/Axios";
import { Row, Col } from "antd";

export default function Home({ trending }) {
  const { blogs, cakes } = trending[0];

  console.log(cakes);
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
            <Col xs={24} sm={12} md={6} lg={6} xl={6}>
              <CakeCard
                key={cake.id}
                price={cake.price}
                title={cake.title}
                img={cake.images[0].url}
                index={index}
              />
            </Col>
          ))}
        </Row>
      </section>

      {/* Trending Blogs */}
      <h1 className="headings">Trending Blogs</h1>

      <section className="Trendingblogs">
        <Row>
          {blogs.map((blog, index) => (
            <Col xs={24} sm={12} md={6} lg={6} xl={6}>
              <BlogsCard key={index} blog={blog} />
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
