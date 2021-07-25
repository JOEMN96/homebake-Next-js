import React, { useState, useEffect } from "react";
import styles from "../styles/Cakes.module.scss";
import axios from "../helpers/Axios";
import { useQuery } from "react-query";
import { Dropdown, Button, Menu, Drawer, Row, Col, Spin } from "antd";
import { BiSortZA } from "react-icons/bi";
import {
  FaSortAmountDownAlt,
  FaSortAmountUpAlt,
  FaFilter,
} from "react-icons/fa";
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

  //  ? Handling Price Sorting
  function handleMenuClick(e) {
    setSort(e.key);
  }
  // ? Sidebar Functions
  function showDrawer() {
    setSidebar(!sidebar);
  }

  function onClose() {
    setSidebar(!sidebar);
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="ASC" icon={<FaSortAmountUpAlt />}>
        Low to High
      </Menu.Item>
      <Menu.Item key="DESC" icon={<FaSortAmountDownAlt />}>
        High to Low
      </Menu.Item>
    </Menu>
  );
  return (
    <section className={styles.cakesPage}>
      <Button className={styles.filterDrawer} onClick={showDrawer}>
        <FaFilter color="#49A159" />
      </Button>
      <Drawer
        title="Cake Spot"
        placement="left"
        closable={false}
        onClose={onClose}
        visible={sidebar}
        key="left"
      >
        <div className={styles.filterDataConrols}>
          <Dropdown overlay={menu}>
            <Button className={styles.sortBtn}>
              Sort <BiSortZA />
            </Button>
          </Dropdown>
        </div>
      </Drawer>

      <h1>All Cakes</h1>

      {status == "loading" && <Spin wrapperClassName="loader" size="large" />}

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
    </section>
  );
}

export default Cakes;
