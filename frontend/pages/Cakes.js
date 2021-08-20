import React, { useState } from "react";
import styles from "../styles/Cakes.module.scss";
import axios from "../helpers/Axios";
import { useQuery } from "react-query";
import { Row, Col, Spin } from "antd";

import CakeCard from "../components/Home/CakeCard";

const fetchCakeData = async (params) => {
  const sort = params.queryKey[1];

  if (sort) {
    const res = await axios.get(`cakes?_sort=price:${sort}`);
    const data = await res.data;
    return data;
  }

  const res = await axios.get("cakes");
  const data = await res.data;
  return data;
};

function Cakes() {
  const [sort, setSort] = useState(null);
  const [sidebar, setSidebar] = useState(false);
  const { data, status } = useQuery(["cakes", sort], fetchCakeData);

  if (status == "loading") {
    return <Spin wrapperClassName="loader" size="large" />;
  }

  return (
    <section className={styles.cakesPage}>
      <section className="cakesPageHeader"></section>

      <div className="titleWrapper">
        <h1 className="headings">Showcase</h1>
        <h2>Cakes</h2>
      </div>

      {status == "error" && (
        <h1 style={{ textAlign: "center" }}>
          Currently there is No Product available Available
        </h1>
      )}
      <Row>
        {status == "error" && <h1>Something went Wrong</h1>}

        {status == "success" &&
          data.map((cake) => {
            return (
              <Col key={cake.id} xs={24} sm={12} md={6} lg={6} xl={6}>
                <CakeCard cake={cake} showtrending={false} />
              </Col>
            );
          })}
      </Row>
      <style jsx>
        {`
          .cakesPageHeader {
            background: url(/images/cakePageHeader.svg) no-repeat center center;
            background-position: center center;
            background-size: 50%;
            background-repeat: no-repeat;
          }
          .cakesPageHeader {
            height: 40vh;
          }
        `}
      </style>
    </section>
  );
}

export default Cakes;
