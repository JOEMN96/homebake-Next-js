import React, { useState, useEffect } from "react";
import Image from "next/image";
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
        {slides.length > 1 ? (
          slides.map((slide, index) => (
            <SwiperSlide key={index}>
              {/* <img src={`${process.env.CMSDOMAIN}${slide.Image.url}`} alt="" /> */}
              <Image
                layout="fill"
                src={`${process.env.CMSDOMAIN}${slide.Image.url}`}
                alt="Picture of the author"
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            {" "}
            <Image
              layout="fill"
              src="/images/Chocolate+Mirror+Cake+1200.jpg"
              alt="Picture of the author"
            />{" "}
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

        `}
      </style>
    </div>
  );
}

export default Carousel;
