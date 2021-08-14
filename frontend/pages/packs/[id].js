import axios from "../../helpers/Axios";
import { useState } from "react";
import { Row, Col } from "antd";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/thumbs/thumbs.min.css";
import styles from "../../styles/SingleCakePage.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import Head from "next/head";
import SwiperCore, { Navigation, Thumbs } from "swiper/core";
import Image from "next/Image";

SwiperCore.use([Navigation, Thumbs]);

function Packs({ cake }) {
  const { title, price, description, images } = cake;

  console.log(cake);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <section>
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
                <SwiperSlide>
                  <Image layout="fill" src={`${image.url}`} alt={title} />
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
                <SwiperSlide>
                  <Image layout="fill" src={`${image.url}`} alt={title} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Col>
        <Col className={styles.col2} xs={24} sm={24} md={8} lg={12} xl={12}>
          <h1>{title}</h1>
          <h3>₹ {price}</h3>

          <p>{description}</p>
          <button>Buy Now</button>
        </Col>
      </Row>
    </section>
  );
}

export default Packs;

Packs.getInitialProps = async (ctx) => {
  const res = await axios.get(`surprise-packs/${ctx.query.id}`);
  const cake = await res.data;
  return {
    cake,
  };
};
