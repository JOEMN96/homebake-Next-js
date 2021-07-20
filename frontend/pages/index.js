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
