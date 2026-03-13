import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function ImageSlider() {
  return (
    <div className="h-64 md:h-96 w-full">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, Autoplay]}
        direction="horizontal"
        loop={true}
        pagination={{ clickable: true }}
        navigation={true}
        autoplay={{
          delay: 3000, 
          disableOnInteraction: false,
        }}
        scrollbar={{ draggable: true }}
        className="h-full rounded-lg"
      >
        {Array.from({ length: 7 }).map((_, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center bg-gray-100">
            <img
              src={`/images/slider/img${index + 1}.jpeg`}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover" 
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ImageSlider;
