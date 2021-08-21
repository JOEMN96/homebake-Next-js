// import axios from "../helpers/Axios";
import axios from "axios";
import { useQuery } from "react-query";
import { Row, Col, Spin } from "antd";
import DessertCard from "../components/desserts/DessertCard";

const fetchDesserts = async () => {
  // const res = await axios.get(`desserts`);
  const res = await axios.get("http://localhost:1337/desserts");
  const data = await res.data;
  return data;
};

function Deserts() {
  const { data, status } = useQuery(["desserts"], fetchDesserts);
  console.log(data);
  if (status == "loading") {
    return <Spin wrapperClassName="loader" size="large" />;
  }

  return (
    <>
      <section className="contactPageHeader"></section>

      <div className="titleWrapper">
        <h1 className="headings">Desserts</h1>
        <h2>Delicious</h2>
      </div>

      {status == "error" && (
        <h1 style={{ textAlign: "center" }}>
          Currently there is No Product available Available
        </h1>
      )}

      <Row>
        {status == "error" && <h1>Something went Wrong</h1>}

        {status == "success" &&
          data.map((dessert) => {
            return (
              <Col key={dessert.id} xs={24} sm={12} md={6} lg={6} xl={6}>
                <DessertCard dessert={dessert} />
              </Col>
            );
          })}
      </Row>

      <style jsx>
        {`
          .contactPageHeader {
            background: url(/images/deserts.svg) no-repeat center center;
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

export default Deserts;
