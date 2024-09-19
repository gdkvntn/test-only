import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import styles from "../styles/swiper.module.scss";

import "swiper/css";
import "swiper/css/navigation";

type SwiperComponentProps = {
  data: {
    year: string;
    desc: string;
  }[];
};

export const SwiperComponent: React.FC<SwiperComponentProps> = ({ data }) => {
  return (
    <Swiper
      modules={[Navigation]}
      pagination={{
        type: "fraction",
      }}
      spaceBetween={80}
      slidesPerView={"auto"}
      // onSlideChange={() => console.log("slide change")}
      // onSwiper={(swiper) => console.log(swiper)}
    >
      {data.map((el) => {
        return (
          <SwiperSlide className={styles.slide}>
            <h4>{el.year}</h4>
            <p>{el.desc}</p>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
