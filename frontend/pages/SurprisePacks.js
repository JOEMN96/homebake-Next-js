import SurprisepackCard from "../components/Home/SurprisepackCard";
import axios from "../helpers/Axios";
import { Row, Col } from "antd";

function SurprisePacks({ packs }) {
  return (
    <div>
      <section className="packsHeader"></section>

      <h1>packs</h1>
      <Row>
        {packs.length > 0 &&
          packs.map((pack) => {
            return (
              <Col key={pack.id} xs={24} sm={12} md={6} lg={6} xl={6}>
                <SurprisepackCard pack={pack} />
              </Col>
            );
          })}
        {packs.length == 0 && <h1> No Surprise Packs to show </h1>}
      </Row>
      <style jsx>
        {`
          .packsHeader {
            background: url(/images/surpriseHeader.svg) no-repeat center center;
            background-position: center center;
            background-size: 50%;
            background-repeat: no-repeat;
          }
          .packsHeader {
            height: 40vh;
          }
        `}
      </style>
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await axios.get("/surprise-packs");
  const packs = await res.data;
  return {
    props: { packs },
  };
};

export default SurprisePacks;
