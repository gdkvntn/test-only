import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/historical-dates.module.scss";
import { SwiperComponent } from "./SwiperComponent";
import slidesData from "../data/data.json";
import gsap from "gsap";
import { Slide } from "../types/types";
import { ReactComponent as Arrow } from "../assets/arrow.svg";

const slides: { [key: string]: Slide } = slidesData;

const animateNumber = (
  prev: number,
  val: number,
  onUpdateCallback: (value: number) => void
) => {
  gsap.to(
    { val: prev },
    {
      val: val,
      duration: 0.7,

      onUpdate: function () {
        const updatedValue = Math.floor(this.targets()[0].val);
        onUpdateCallback(updatedValue);
      },
    }
  );
};

const formatPageNumber = (number: number) => {
  return String(number).padStart(2, "0");
};

const firstKey = Object.keys(slides)[0];

export const HistoricalDates: React.FC = () => {
  const [firstNumber, setFirstNumber] = useState<number>(
    slides[firstKey].numbers[0]
  );
  const [secondNumber, setSecondNumber] = useState<number>(
    slides[firstKey].numbers[1]
  );
  const [currentSlide, setCurrentSlide] = useState<string>(firstKey);
  const [currentEvents, setCurrentEvents] = useState(slides[firstKey].events);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [rotateAngle, setRotateAngle] = useState(0);

  const circleRef = useRef<HTMLDivElement>(null);
  const circleTextRefs = useRef<(HTMLDivElement | null)[]>([]);
  const swiperRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef<boolean>(true);
  const mobileTextRef = useRef<HTMLDivElement>(null);

  const slideKeys = Object.keys(slides);
  const totalSlides = slideKeys.length;
  const currentIndex = slideKeys.indexOf(currentSlide);

  const rotateToNext = (nextIndex: number) => {
    const anglePerSlide = 360 / slideKeys.length;
    const rotationAngle = nextIndex * anglePerSlide;
    setRotateAngle(rotationAngle);

    if (circleRef.current) {
      gsap.to(circleRef.current, {
        rotation: -rotationAngle,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          const textRef = circleTextRefs.current[nextIndex];

          gsap.to(textRef, {
            scale: 1,
            delay: 0,
            ease: "power2.inOut",
          });
        },
      });
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      const prevSlideKey = slideKeys[currentIndex - 1];

      animateNumber(
        slides[currentSlide].numbers[0],
        slides[prevSlideKey].numbers[0],
        setFirstNumber
      );
      animateNumber(
        slides[currentSlide].numbers[1],
        slides[prevSlideKey].numbers[1],
        setSecondNumber
      );

      if (mobileTextRef.current) {
        gsap.to(mobileTextRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "power2.in",
        });
      }

      if (swiperRef.current) {
        gsap.to(swiperRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => {
            setCurrentSlide(prevSlideKey);
            setCurrentEvents(slides[prevSlideKey].events);
            rotateToNext(currentIndex - 1);
          },
        });
      }
    }
  };

  const nextSlide = () => {
    if (currentIndex < slideKeys.length - 1) {
      const nextSlideKey = slideKeys[currentIndex + 1];

      animateNumber(
        slides[currentSlide].numbers[0],
        slides[nextSlideKey].numbers[0],
        setFirstNumber
      );
      animateNumber(
        slides[currentSlide].numbers[1],
        slides[nextSlideKey].numbers[1],
        setSecondNumber
      );

      if (mobileTextRef.current) {
        gsap.to(mobileTextRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "power2.in",
        });
      }
      if (swiperRef.current) {
        gsap.to(swiperRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => {
            setCurrentSlide(nextSlideKey);
            setCurrentEvents(slides[nextSlideKey].events);
            rotateToNext(currentIndex + 1);
          },
        });
      }
    }
  };

  const changeSlide = (id: number) => {
    if (currentIndex === id) return;
    const slideKey = slideKeys[id];
    animateNumber(
      slides[currentSlide].numbers[0],
      slides[slideKey].numbers[0],
      setFirstNumber
    );
    animateNumber(
      slides[currentSlide].numbers[1],
      slides[slideKey].numbers[1],
      setSecondNumber
    );

    if (mobileTextRef.current) {
      gsap.to(mobileTextRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.in",
      });
    }
    if (swiperRef.current) {
      gsap.to(swiperRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          setCurrentSlide(slideKey);
          setCurrentEvents(slides[slideKey].events);
          rotateToNext(id);
        },
      });
    }
  };

  useEffect(() => {
    const textRef = circleTextRefs.current[currentIndex];
    gsap.to(textRef, {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "power2.inOut",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (swiperRef.current) {
      gsap.to(swiperRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: 0.3,
        ease: "power2.out",
      });
    }

    if (mobileTextRef.current) {
      gsap.to(mobileTextRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
      });
    }
  }, [currentSlide]);

  return (
    <div className={styles.container}>
      <div className={styles.divider}>
        <div ref={mobileTextRef} className={styles["divider-mobile-name"]}>
          {currentSlide}
        </div>
      </div>
      <div className={styles.title}>
        <h1>
          Исторические
          <br /> даты
        </h1>
      </div>
      <div className={styles.dates}>
        <div className={styles.years}>
          <span>{firstNumber}</span> <span>{secondNumber}</span>
        </div>
        <div ref={circleRef} className={styles.circle}>
          {slideKeys.map((el, i) => {
            const angle = (i / slideKeys.length) * 360 - 60;
            const x = Math.cos((angle * Math.PI) / 180) * 265;
            const y = Math.sin((angle * Math.PI) / 180) * 265;
            const isHovered = hoveredIndex === i || currentIndex === i;
            const left = isHovered ? `${265 + x - 28}px` : `${265 + x - 3}px`;
            const top = isHovered ? `${265 + y - 28}px` : `${265 + y - 3}px`;

            if (!circleTextRefs.current[i]) {
              circleTextRefs.current[i] = null;
            }

            return (
              <div
                key={el}
                className={`${styles["circle-button"]} ${
                  isHovered ? styles.hovered : ""
                }`}
                style={{
                  left: left,
                  top: top,
                  transform: `rotate(${rotateAngle}deg)`,
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => changeSlide(i)}
              >
                <span> {i + 1}</span>
                {isHovered && (
                  <div
                    ref={(el) => (circleTextRefs.current[i] = el)}
                    className={styles["circle-name"]}
                  >
                    {el}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>{" "}
      <div className={styles.control}>
        <span className={styles.pagination}>{`${formatPageNumber(
          currentIndex + 1
        )}/${formatPageNumber(totalSlides)}`}</span>
        <div className={styles["control-btns"]}>
          <button disabled={currentIndex === 0} onClick={prevSlide}>
            <Arrow style={{ transform: "rotate(180deg)" }} />
          </button>
          <button
            disabled={currentIndex === slideKeys.length - 1}
            onClick={nextSlide}
          >
            <Arrow />
          </button>
          <div className={styles["pagination-mobile"]}>
            {slideKeys.map((el, i) => {
              return (
                <div
                  key={el + i}
                  onClick={() => {
                    changeSlide(i);
                  }}
                  className={`${styles["pagination-mobile-circle"]} ${
                    currentIndex === i ? styles.active : ""
                  }`}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
      <div ref={swiperRef} className={styles["swiper-wrapper"]}>
        <SwiperComponent data={currentEvents} />
      </div>
    </div>
  );
};
