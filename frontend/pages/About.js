function About() {
  return (
    <div>
      <section className="aboutHeader"></section>
      <div className="titleWrapper">
        <h1 className="headings">About</h1>
        <h2>Us</h2>
      </div>

      <style jsx>
        {`
          .aboutHeader {
            background: url(/images/aboutUs.svg) no-repeat center center;
            background-position: center center;
            background-size: 50%;
            background-repeat: no-repeat;
          }
          .aboutHeader {
            height: 40vh;
          }
        `}
      </style>
    </div>
  );
}

export default About;
