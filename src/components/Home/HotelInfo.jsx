import { useState} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade, Thumbs } from "swiper/modules";
import { FaMapMarkerAlt, FaStar, FaRegStar } from "react-icons/fa";
import { useHotelGallery } from "../../context/HotelGalleryContext/HotelGalleryContext";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/thumbs";

export default function HotelInfo() {
  const { galleryImages } = useHotelGallery();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const rating = 4.7;
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  // Display images
  const displayImages =
    galleryImages.length > 0
      ? galleryImages.map((img) => img.src)
      : ["/fallback-image.jpg"];

  return (
    <div className="mb-12">
      {/* Header with hotel info */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Aurika Udaipur Luxury By Lemon Tree Hotels
          </h1>

          <div className="flex items-center gap-2 mt-2">
            <FaMapMarkerAlt className="text-indigo-600" />
            <span className="text-gray-600">Udaipur, Rajasthan, India</span>
          </div>

          <div className="flex items-center mt-3 gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) =>
                i < filledStars ? (
                  <FaStar key={i} className="text-yellow-400" />
                ) : i === filledStars && hasHalfStar ? (
                  <div key={i} className="relative">
                    <FaRegStar className="text-yellow-400" />
                    <FaStar className="text-yellow-400 absolute top-0 w-1/2 overflow-hidden" />
                  </div>
                ) : (
                  <FaRegStar key={i} className="text-yellow-400" />
                )
              )}
            </div>
            <span className="text-gray-700 font-medium">
              {rating.toFixed(1)}
            </span>
            <span className="text-gray-500">(128 reviews)</span>
          </div>
        </div>
      </div>

      {/* Main Image Gallery - Fixed Height Container */}
      <div className="relative h-[500px] sm:h-[550px] md:h-[600px] lg:h-[650px] xl:h-[700px]">
        <Swiper
          modules={[Pagination, Autoplay, EffectFade, Thumbs]}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            renderBullet: (index, className) => {
              return `<span class="${className} bg-white opacity-70 hover:opacity-100 transition-opacity"></span>`;
            },
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          effect="fade"
          fadeEffect={{
            crossFade: true,
            duration: 600,
          }}
          loop={true}
          speed={800}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            slideThumbActiveClass: "thumb-active",
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="h-full w-full rounded-2xl shadow-xl overflow-hidden mb-4"
        >
          {displayImages.map((img, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative w-full h-full">
                <img
                  src={img}
                  alt={`Hotel gallery ${idx + 1}`}
                  className="object-cover w-full h-full"
                  loading={idx === 0 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={idx === 0 ? "high" : "low"}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/fallback-image.jpg";
                  }}
                />
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                  {idx + 1}/{displayImages.length}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Thumbnail Navigation */}
      <div className="mt-4">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={5}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[Thumbs]}
          className="hidden md:block"
          breakpoints={{
            1024: {
              slidesPerView: 6,
              spaceBetween: 12,
            },
            1280: {
              slidesPerView: 7,
              spaceBetween: 14,
            },
          }}
        >
          {displayImages.map((img, idx) => (
            <SwiperSlide key={idx}>
              <button
                className={`w-full h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                  activeIndex === idx
                    ? "ring-3 ring-indigo-500 scale-105"
                    : "opacity-80 hover:opacity-100 hover:ring-2 hover:ring-gray-300"
                }`}
                aria-label={`View image ${idx + 1}`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="object-cover w-full h-full"
                  loading="lazy"
                  decoding="async"
                />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
