import React, { useState, useEffect } from "react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import SwiperCore, { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "../../helpers/Axios";

SwiperCore.use([Pagination]);

function Carousel() {
  const [slides, setslides] = useState([]);

  useEffect(() => {
    async function getSliderData() {
      const sliderImages = await axios.get("Homepage-carousels");
      setslides(sliderImages.data);
    }
    getSliderData();
  }, []);
  return (
    <div className="swiperWrapper">
      <Swiper slidesPerView={1} navigation pagination={{ clickable: true }}>
        {slides.length > 0 ? (
          slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <img src={`${slide.Image.url}`} alt="" />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <img src="/images/bkupSlide.jpg" alt="" />
          </SwiperSlide>
        )}
      </Swiper>

      <style suppressHydrationWarning>
        {`
            .swiperWrapper {
                min-height:80vh
                border-radius:10px;
                margin:10px;
            }
            .swiper-container {
                height:80vh
            }
            .swiperWrapper > div {
                border-radius:10px;
            }

            img {
              width:100%;
            }

        `}
      </style>
    </div>
  );
}

export default Carousel;
