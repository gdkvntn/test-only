import React, { useRef, useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import styles from "../styles/swiper.module.scss";
import { ReactComponent as Arrow } from "../assets/arrow.svg";

import "swiper/css";
import "swiper/css/navigation";

type SwiperComponentProps = {
  data: {
    year: string;
    desc: string;
  }[];
};

export const SwiperComponent: React.FC<SwiperComponentProps> = ({ data }) => {
  const swiperRef = useRef<SwiperClass>(null!);
  const [isPrevVisible, setPrevVisible] = useState(false);
  const [isNextVisible, setNextVisible] = useState(true);

  return (
    <>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={() => {
          setPrevVisible(!swiperRef.current.isBeginning);
          setNextVisible(!swiperRef.current.isEnd);
        }}
        modules={[Navigation]}
        spaceBetween={25}
        slidesPerView={"auto"}
        breakpoints={{
          620: {
            spaceBetween: 80,
          },
        }}
      >
        {data.map((el, i) => {
          return (
            <SwiperSlide key={i} className={styles.slide}>
              <h4>{el.year}</h4>
              <p>{el.desc}</p>
            </SwiperSlide>
          );
        })}{" "}
      </Swiper>{" "}
      <button
        onClick={() => swiperRef.current.slidePrev()}
        className={`${styles["swiper-button-prev"]} ${
          isPrevVisible ? styles.active : ""
        }`}
      >
        <Arrow />
      </button>
      <button
        onClick={() => swiperRef.current.slideNext()}
        className={`${styles["swiper-button-next"]} ${
          isNextVisible ? styles.active : ""
        }`}
      >
        <Arrow />
      </button>
    </>
  );
};
