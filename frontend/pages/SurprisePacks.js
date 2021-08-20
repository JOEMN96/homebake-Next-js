import SurprisepackCard from "../components/Home/SurprisepackCard";
import axios from "../helpers/Axios";
import { useQuery } from "react-query";
import { Row, Col, Spin } from "antd";

const fetchPacks = async () => {
  const res = await axios.get("surprise-packs");
  const data = await res.data;
  return data;
};

function SurprisePacks() {
  const { data, status } = useQuery("packs", fetchPacks);

  if (status == "loading") {
    return <Spin wrapperClassName="loader" size="large" />;
  }

  return (
    <div>
      <section className="packsHeader"></section>
      <div className="titleWrapper">
        <h1 className="headings">Surprise</h1>
        <h2>Packs</h2>
      </div>
      {status == "error" && (
        <h1 style={{ textAlign: "center" }}>
          Currently there is No Product available Available
        </h1>
      )}
      <Row>
        {status == "success" &&
          data.map((pack) => {
            return (
              <Col key={pack.id} xs={24} sm={12} md={6} lg={8} xl={8}>
                <SurprisepackCard pack={pack} />
              </Col>
            );
          })}
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
          .ant-radio-group-solid
            .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
            color: #49a159 !important;
            border-color: #49a159 !important;
          }
        `}
      </style>
    </div>
  );
}

export default SurprisePacks;
