import { useSelector } from "react-redux";

function Contact() {
  const user = useSelector((state) => state);
  console.log(user);
  return (
    <>
      <section className="contactPageHeader"></section>

      <div className="titleWrapper">
        <h1 className="headings">Contact</h1>
        <h2>Us</h2>
      </div>

      <style jsx>
        {`
          .contactPageHeader {
            background: url(/images/contact.svg) no-repeat center center;
            background-position: center center;
            background-size: 50%;
            background-repeat: no-repeat;
          }
          .contactPageHeader {
            height: 40vh;
          }
        `}
      </style>
    </>
  );
}

export default Contact;
