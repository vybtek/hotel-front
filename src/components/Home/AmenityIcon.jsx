import {
  FaWifi,
  FaSwimmingPool,
  FaParking,
  FaUtensils,
  FaSpa,
  FaRulerCombined,
} from "react-icons/fa";

export default function AmenityIcon({ amenity }) {
  const icons = {
    "Free WiFi": <FaWifi className="text-indigo-500" />,
    "Air Conditioning": <FaRulerCombined className="text-indigo-500" />,
    "Swimming Pool": <FaSwimmingPool className="text-indigo-500" />,
    Parking: <FaParking className="text-indigo-500" />,
    Restaurant: <FaUtensils className="text-indigo-500" />,
    Spa: <FaSpa className="text-indigo-500" />,
    Minibar: <FaRulerCombined className="text-indigo-500" />,
    Safe: <FaRulerCombined className="text-indigo-500" />,
    TV: <FaRulerCombined className="text-indigo-500" />,
    Bathtub: <FaRulerCombined className="text-indigo-500" />,
    "Living Area": <FaRulerCombined className="text-indigo-500" />,
    Balcony: <FaRulerCombined className="text-indigo-500" />,
  };

  return (
    <div className="flex items-center gap-2">
      {icons[amenity] || <FaRulerCombined className="text-indigo-500" />}
      <span>{amenity}</span>
    </div>
  );
}
