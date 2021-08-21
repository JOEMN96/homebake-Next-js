import React, { useState, useEffect } from "react";
import styles from "../styles/Cakes.module.scss";
import axios from "../helpers/Axios";
import { useQuery } from "react-query";
import { Row, Col, Spin } from "antd";
import {
  HiOutlineSortAscending,
  HiOutlineSortDescending,
  HiSearch,
} from "react-icons/hi";
import CakeCard from "../components/Home/CakeCard";

const fetchCakeData = async (params) => {
  const sort = params.queryKey[1];

  // if (sort) {
  //   const res = await axios.get(`cakes?_sort=price:${sort}`);
  //   const data = await res.data;
  //   return data;
  // }

  const res = await axios.get("cakes");
  const data = await res.data;
  return data;
};

function Cakes() {
  const [filter, setFilter] = useState([]);
  const { data, status } = useQuery(["cakes"], fetchCakeData);

  if (status == "loading") {
    return <Spin wrapperClassName="loader" size="large" />;
  }

  const handleSort = (param) => {
    var element_to_scroll_to = document.querySelector(".scrol");

    if (param == "all") {
      element_to_scroll_to.scrollIntoView();
      return setFilter([]);
    }

    if (param == "lowToHigh") {
      const filteredData = data.sort(
        (a, b) => parseInt(a.price) - parseInt(b.price)
      );
      element_to_scroll_to.scrollIntoView();
      setFilter(filteredData);
      return;
    } else if (param == "highToLow") {
      const filteredData = data.sort(
        (a, b) => parseInt(b.price) - parseInt(a.price)
      );
      element_to_scroll_to.scrollIntoView();
      setFilter(filteredData);
      return;
    }
    const filteredData = data.filter((item) => item.Flavour == param);
    if (filteredData.length === 0) return;
    element_to_scroll_to.scrollIntoView();
    setFilter(filteredData);
  };

  const handleSearch = (e) => {
    let reg = new RegExp(e.target.value.toLowerCase());

    const filteredData = data.filter((item) => {
      return item.title.toLowerCase().match(reg);
    });

    if (filteredData.length > 0) {
      return setFilter(filteredData);
    }
    setFilter([]);
  };

  const handleSub = () => {
    console.log("fired");
    let element_to_scroll_to = document.querySelector(".scrol");
    element_to_scroll_to.scrollIntoView();
  };

  return (
    <section className={styles.cakesPage}>
      <section className="cakesPageHeader"></section>

      <div className="titleWrapper">
        <h1 className="headings">Categories</h1>
        <h2>Cakes</h2>
      </div>

      <div className={styles.contols}>
        <Row className={styles.row}>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <article onClick={() => handleSort("all")}>
              <img src="/images/cakesPage/flavoured.png" alt="" />
              <h2>All Cakes</h2>
              <p>Our Cake Collection</p>
            </article>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <article onClick={() => handleSort("Black Forest")}>
              <img src="/images/cakesPage/black_forest.jfif" alt="" />
              <h2>Black Forest</h2>
              <p>The all time Favourite</p>
            </article>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <article onClick={() => handleSort("Chocolate")}>
              <img src="/images/cakesPage/chocolate.jfif" alt="" />
              <h2>Chocolate</h2>
              <p>For choco addicts</p>
            </article>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <article onClick={() => handleSort("Exotic")}>
              <img src="/images/cakesPage/exotics.jfif" alt="" />
              <h2>Exotics</h2>
              <p>Oreo, Rochers & more</p>
            </article>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <article onClick={() => handleSort("Flavors")}>
              <img src="/images/cakesPage/fruit.jfif" alt="" />
              <h2>Fruit</h2>
              <p>A taste of tropics</p>
            </article>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <article onClick={() => handleSort("Rainbow")}>
              <img src="/images/cakesPage/rainbow2.png" alt="" />
              <h2>Rainbow</h2>
              <p>Rainbow of flavours</p>
            </article>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <article onClick={() => handleSort("Designer cakes")}>
              <img src="/images/cakesPage/designer.png" alt="" />
              <h2>Designer Cakes</h2>
              <p>Different Themed Cakes</p>
            </article>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <article onClick={() => handleSort("Velvet")}>
              <img src="/images/cakesPage/velvet.png" alt="" />
              <h2>Velvet</h2>
              <p>Different Themed Cakes</p>
            </article>
          </Col>
        </Row>
      </div>
      <div className={styles.otherWrapper}>
        <div className={styles.otherFilters}>
          <input onChange={handleSearch} type="text" name="Search" id="" />
          <button onClick={handleSub}>
            <HiSearch />
          </button>
          <div className={styles.sort}>
            <span>Sort by Price : </span>
            <button onClick={() => handleSort("lowToHigh")}>
              <HiOutlineSortAscending />
            </button>
            <button onClick={() => handleSort("highToLow")}>
              <HiOutlineSortDescending />
            </button>
          </div>
        </div>
      </div>
      <div className="titleWrapper">
        <h1 className="headings scrol">Showcase</h1>
        <h2>Cakes</h2>
      </div>
      {status == "error" && (
        <h1 style={{ textAlign: "center" }}>
          Currently there is No Product available Available
        </h1>
      )}
      <Row>
        {status == "error" && <h1>Something went Wrong</h1>}

        {status == "success" && !filter.length > 0
          ? data.map((cake) => {
              return (
                <Col key={cake.id} xs={24} sm={12} md={6} lg={6} xl={6}>
                  <CakeCard cake={cake} showtrending={false} />
                </Col>
              );
            })
          : ""}

        {filter &&
          filter.map((cake) => {
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
