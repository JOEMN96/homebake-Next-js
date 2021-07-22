import Head from "next/head";
import Carousel from "../components/Home/Carousel";
import CakeCard from "../components/Home/CakeCard";

export default function Home() {
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
        <CakeCard price="100" title="Test name" />
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
