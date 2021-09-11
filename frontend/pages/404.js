export default function Custom404() {
  return (
    <section style={{ textAlign: "center" }}>
      <img src="./images/404.png" style={{ maxWidth: "100%" }} alt="" />
      <style jsx>
        {`
          section {
            display: flex;
            align-items: center;
            justify-content: center;
            height: calc(100vh - 54px);
          }
        `}
      </style>
    </section>
  );
}
