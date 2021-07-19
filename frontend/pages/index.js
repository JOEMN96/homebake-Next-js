import Head from "next/head";

export default function Home() {
  return (
    <main>
      <Head>
        <title>CakeSpot </title>
        <meta name="description" content="HomeBaked Cakes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
