import React, { Component } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

  const images = [
    "https://brand2d.tech/kenchic/wp-content/uploads/2023/01/DOC-02.jpeg",
    "https://www.kenchic.com/wp-content/uploads/2023/09/careers.jpg",
    "https://brand2d.tech/kenchic/wp-content/uploads/2023/01/chicks-transport-01.jpeg",
    "https://brand2d.tech/kenchic/wp-content/uploads/2023/01/additional-homepage.jpeg",
    "https://brand2d.tech/kenchic/wp-content/uploads/2023/01/foods-3.png"
  ]

class Slider extends Component {
  render() {
    return (
      <div className="w-full overflow-hidden z-10">
        <Swiper
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          modules={[Autoplay, Navigation, Pagination]}
          className="800px:h-[50vh] h-[42vh]"
        >
          {
            images.map((image)=>(
              <SwiperSlide
            style={{ backgroundImage: `url(${image})` }}
            className="w-full h-full bg-cover bg-center cursor-grab"
          ></SwiperSlide>
            ))
          }
         
        </Swiper>
      </div>
    );
  }
}

export default Slider;
