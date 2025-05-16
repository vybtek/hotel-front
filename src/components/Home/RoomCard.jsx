import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import {
  FaUser,
  FaChild,
  FaRulerCombined,
  FaFire,
  FaStar,
  FaRegStar,
  FaChevronRight,
} from "react-icons/fa";
import AmenityIcon from "./AmenityIcon";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function RoomCard({ room, updateSidebar }) {
  const [qty, setQty] = useState(0);
  const [showAmenities, setShowAmenities] = useState(false);

  const handleIncrement = () => {
    const newQty = qty + 1;
    setQty(newQty);
    updateSidebar(room.id, newQty);
  };

  const handleDecrement = () => {
    const newQty = Math.max(0, qty - 1);
    setQty(newQty);
    updateSidebar(room.id, newQty);
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(room.rating);
    const hasHalfStar = room.rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="text-yellow-400" />);
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
    }

    return stars;
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="w-full md:w-2/5 rounded-xl overflow-hidden relative group">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: `.swiper-button-next-${room.id}`,
            prevEl: `.swiper-button-prev-${room.id}`,
          }}
          pagination={{
            clickable: true,
            el: `.swiper-pagination-${room.id}`,
          }}
          loop={true}
          className="h-full"
          style={{
            "--swiper-navigation-color": "#ffffff",
            "--swiper-navigation-size": "24px",
            "--swiper-pagination-color": "#111827",
            "--swiper-pagination-bullet-inactive-color": "#1F2937",
          }}
        >
          {/* Slides */}
          {room.images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative w-full h-64 md:h-full">
                <img
                  src={img}
                  alt={`${room.name} - image ${idx + 1}`}
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            </SwiperSlide>
          ))}

          {/* Navigation buttons with custom classes */}
          <div
            className={`swiper-button-next swiper-button-next-${room.id} !text-indigo-600 bg-white/80 hover:bg-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          ></div>
          <div
            className={`swiper-button-prev swiper-button-prev-${room.id} !text-indigo-600 bg-white/80 hover:bg-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          ></div>

          {/* Pagination */}
          <div
            className={`swiper-pagination swiper-pagination-${room.id}`}
          ></div>
        </Swiper>
      </div>
      <div className="w-full md:w-3/5 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-gray-900">{room.name}</h2>
            <div className="flex items-center gap-1">
              {renderStars()}
              <span className="text-sm text-gray-500 ml-1">
                ({room.reviews})
              </span>
            </div>
          </div>

          {/* info area section */}
          <div className="flex items-center gap-4 mt-2 text-gray-600">
            <span className="flex items-center gap-1 text-sm">
              <FaUser className="text-indigo-600" /> {room.adults} Adults
            </span>
            <span className="flex items-center gap-1 text-sm">
              <FaChild className="text-indigo-600" /> {room.children} Children
            </span>
            <span className="flex items-center gap-1 text-sm">
              <FaRulerCombined className="text-indigo-600" /> {room.area}
            </span>
          </div>
          <p className="mt-3 text-gray-600">{room.description}</p>
          <button
            onClick={() => setShowAmenities(!showAmenities)}
            className="mt-3 text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center gap-1 transition-colors"
          >
            {showAmenities ? "Hide" : "View"} Amenities
            <FaChevronRight
              className={`text-xs transition-transform ${
                showAmenities ? "transform rotate-90" : ""
              }`}
            />
          </button>
          {showAmenities && (
            <div className="mt-3 grid grid-cols-2 gap-2">
              {room.amenities.map((amenity, idx) => (
                <AmenityIcon key={idx} amenity={amenity} />
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center justify-between mt-6">
          <div>
            <p className="text-sm text-indigo-600 font-semibold flex items-center gap-1 mb-2">
              <FaFire className="text-red-500" /> Only {room.roomsLeft} rooms
              left
            </p>
            <div className="flex items-baseline gap-2">
              <p className="text-sm text-gray-500 line-through">
                ₹ {room.originalPrice}
              </p>
              <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">
                Save ₹ {room.originalPrice - room.price}
              </span>
            </div>
            <p className="text-3xl font-bold text-indigo-700">
              ₹ {room.price.toLocaleString()}
              <span className="text-base font-normal text-gray-600">
                {" "}
                / night
              </span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Avg Per Night (Excl. taxes & fees)
            </p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="flex items-center border rounded-lg overflow-hidden shadow-sm">
              <button
                onClick={handleDecrement}
                className="bg-red-100 text-gray-800 px-4 py-2 hover:bg-red-200 transition-colors"
                disabled={qty === 0}
              >
                -
              </button>
              <span className="px-6 py-2 text-gray-800 font-semibold">
                {qty}
              </span>
              <button
                onClick={handleIncrement}
                className="bg-green-100 text-gray-800 px-4 py-2 hover:bg-green-200 transition-colors"
              >
                +
              </button>
            </div>
            {qty > 0 && (
              <p className="text-sm text-green-600 font-medium">
                Added to your booking
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
