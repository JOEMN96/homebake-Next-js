import React from "react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import SwiperCore, { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Pagination]);

function Carousel() {
  return (
    <div className="swiperWrapper">
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        ...
      </Swiper>

      <style>
        {`
            .swiperWrapper {
                min-height:80vh
            }
            .swiper-container {
                height:80vh
            }
        `}
      </style>
    </div>
  );
}

export default Carousel;
