import Head from "next/head";

export default function Home() {
  return (
    <main>
      <Head>
        <title>CakeSpot </title>
        <meta name="description" content="HomeBaked Cakes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Hi</h1>
      <h1>Almost before we kne</h1>

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
