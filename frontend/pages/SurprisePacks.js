import SurprisepackCard from "../components/Home/SurprisepackCard";
import axios from "../helpers/Axios";
import { Row, Col } from "antd";

function SurprisePacks({ packs }) {
  return (
    <div>
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
