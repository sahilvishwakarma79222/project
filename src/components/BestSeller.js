"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Pagination, Navigation } from "swiper/modules";
import { useRouter } from 'next/navigation';

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./BestSeller.css";

export default function BestSeller() {
  const router = useRouter();

  const images = [
    { src: '/images/heroDoor/heroDoor/1.png', link: "/products/woodenDoor/product13" },
    { src: '/images/heroDoor/heroDoor/2.png', link: "/products/woodenDoor/product14" },
    { src: '/images/heroDoor/heroDoor/3.png', link: "/products/woodenDoor/product15" },
    { src: '/images/heroDoor/heroDoor/4.png', link: "/products/woodenDoor/product16" },
    { src: '/images/heroDoor/heroDoor/5.png', link: "/products/woodenDoor/product17" },
    { src: '/images/heroDoor/heroDoor/6.png', link: "/products/woodenDoor/product18" },
    { src: '/images/heroDoor/heroDoor/7.png', link: "/products/woodenDoor/product19" },
    { src: '/images/heroDoor/heroDoor/8.png', link: "/products/woodenDoor/product20" }
  ];

  return (
    <section className="best-seller-section">
      <h2 className="best-seller-heading">
        <span className="heading-text">BEST</span>
        <span className="heading-accent">DOORS</span>
      </h2>

      <p className="best-seller-subtitle">
        Discover our most popular doors, chosen by thousands of satisfied customers
      </p>

      <div className="coverflow-container">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"}
          initialSlide={2}
          speed={800}
          spaceBetween={40} // Increased space between slides
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: -80, // Increased negative value for more gap
            depth: 200,
            modifier: 2.5, // Increased modifier
            slideShadows: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
          className="coverflow-swiper"
          breakpoints={{
            320: {
              spaceBetween: 20,
              coverflowEffect: {
                stretch: -40,
                depth: 100,
                modifier: 1.5,
              }
            },
            768: {
              spaceBetween: 30,
              coverflowEffect: {
                stretch: -60,
                depth: 150,
                modifier: 2,
              }
            },
            1024: {
              spaceBetween: 40,
              coverflowEffect: {
                stretch: -80,
                depth: 200,
                modifier: 2.5,
              }
            }
          }}
        >
          {images.map((item, i) => (
            <SwiperSlide key={i} className="coverflow-slide">
              <div className="coverflow-image-box">
                <img src={item.src} alt={`Door ${i + 1}`} className="coverflow-image" onClick={()=>{router.push(item.link)}} />

                {/* Best Seller Label - Only for active slide */}
                {/* <div className="best-seller-label">BEST SELLER</div> */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows */}
        <div className="swiper-button-prev-custom custom-navigation">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </div>
        <div className="swiper-button-next-custom custom-navigation">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>

        {/* Custom Pagination */}
        <div className="custom-pagination-wrapper">
          <div className="swiper-pagination-custom"></div>
        </div>
      </div>
    </section>
  );
}