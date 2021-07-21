import Head from "next/head";
import Carousel from "../components/Home/Carousel";

export default function Home() {
  return (
    <main>
      <Head>
        <title>CakeSpot </title>
        <meta name="description" content="HomeBaked Cakes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Carousel />

      <div className="headings">
        <h1>Trending</h1>
        <h6>Cakes</h6>
      </div>

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
