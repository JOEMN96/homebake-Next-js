import axios from "../../helpers/Axios";
import { useState } from "react";
import { Row, Col } from "antd";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/thumbs/thumbs.min.css";
import styles from "../../styles/SingleCakePage.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import Head from "next/head";
import { Radio } from "antd";
import SwiperCore, { Navigation, Thumbs } from "swiper/core";

// install Swiper modules
SwiperCore.use([Navigation, Thumbs]);

function Dessert({ dessert }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { description, images, offer, price, title, EggOReggless } = dessert;

  const handleChecked = (e) => {
    console.log("radio checked", e.target.value);
  };
  const handleShape = (e) => {
    console.log("radio checked", e.target.value);
  };
  return (
    <section className={styles.cakePage}>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="keywords"
          content="Nagercoil Cakes,kanyakumari cakes,cakes"
        />
      </Head>
      <Row>
        <Col
          className={styles.sliderArea}
          xs={24}
          sm={24}
          md={16}
          lg={12}
          xl={12}
        >
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
              height: "77vh",
            }}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            className="mySwiper2"
          >
            {images.map((image) => {
              return (
                <SwiperSlide key={image._id}>
                  <img className={styles.img} src={`${image.url}`} alt="" />
                </SwiperSlide>
              );
            })}
          </Swiper>

          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={1}
            slidesPerView={4}
            freeMode={true}
            watchSlidesVisibility={true}
            watchSlidesProgress={true}
            className={styles.mySwiper}
            style={{
              height: "70px",
              cursor: "pointer",
            }}
          >
            {images.map((image) => {
              return (
                <SwiperSlide key={image._id}>
                  <img src={`${image.url}`} alt={title} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Col>
        <Col className={styles.col2} xs={24} sm={24} md={8} lg={12} xl={12}>
          <h1>{title}</h1>
          <h3>
            ??? {price}
            {offer && <span className={styles.offer}>{"-" + offer}</span>}
          </h3>
          <p>{description}</p>
          {EggOReggless && (
            <Radio.Group
              defaultValue="a"
              onChange={handleChecked}
              buttonStyle="solid"
            >
              <Radio.Button value="eggless">Eggless</Radio.Button>
              <Radio.Button value="egg">Egg</Radio.Button>
            </Radio.Group>
          )}

          <button>Buy Now</button>
        </Col>
      </Row>
      <style jsx>{``}</style>
    </section>
  );
}

export async function getServerSideProps(ctx) {
  const res = await axios.get(`desserts/${ctx.query.id}`);
  const dessert = await res.data;
  return {
    props: { dessert },
  };
}

export default Dessert;
