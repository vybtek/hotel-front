"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { X, Plus, Check, Copy, Save, Trash2 } from "lucide-react";

const hotelOptions = [
  "Room Service",
  "24-Hour Front Desk",
  "Parking",
  "Travel Desk",
  "Internet Access",
  "Laundry/Iron",
  "Car Rentals",
  "Swimming Pool",
  "Fitness Center",
  "Spa",
  "Restaurant",
  "Bar/Lounge",
  "Conference Room",
  "Business Center",
];

const roomOptions = [
  "Air Conditioner",
  "Fan",
  "Cable Channels",
  "Telephone",
  "TV",
  "Cupboard",
  "Table-Chair",
  "Mini Fridge",
  "Coffee Maker",
  "Safe",
  "Hair Dryer",
  "Iron & Ironing Board",
  "Bathtub",
  "Shower",
  "Free WiFi",
  "Work Desk",
];

const roomConfigs = [
  { label: "All Rooms", key: "allRooms" },
  {
    label: "Premium Room with King Bed and Private Terrace",
    key: "premiumKing",
  },
  { label: "Deluxe Vista Room with King Bed", key: "deluxeVistaKing" },
  { label: "Deluxe Room with King Bed", key: "deluxeKing" },
  {
    label: "Premium Room with Twin Beds and Private Terrace",
    key: "premiumTwin",
  },
  { label: "Deluxe Room with Twin Beds", key: "deluxeTwin" },
];

const AmenityTag = ({ amenity, onRemove }) => (
  <span className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
    {amenity}
    <button
      type="button"
      onClick={() => onRemove(amenity)}
      className="ml-2 text-red-500 hover:text-red-700"
      aria-label={`Remove ${amenity}`}
    >
      <X size={14} />
    </button>
  </span>
);

const AmenitySelector = ({
  id,
  label,
  options,
  selected,
  onChange,
  onSelectAll,
  onClear,
  showDropdown,
  setShowDropdown,
  onCustomAdd,
  customAmenity,
  setCustomAmenity,
  onSubmit,
  submitStatus,
  isRoom = false,
  onCopy,
}) => {
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onSubmit();
    },
    [onSubmit]
  );

  const handleChange = useCallback(
    (e) => {
      const selectedOptions = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      onChange(selectedOptions);
    },
    [onChange]
  );

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col space-y-4">
        <label htmlFor={id} className="mb-2 text-gray-700 font-medium">
          {label}
        </label>
        {!showDropdown ? (
          <input
            id={id}
            type="text"
            value={selected.join(", ")}
            onClick={() => setShowDropdown(true)}
            placeholder={`Select amenities for ${label}`}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 cursor-pointer"
            readOnly
            aria-expanded={showDropdown}
          />
        ) : (
          <select
            multiple
            value={selected}
            onChange={handleChange}
            onBlur={() => setShowDropdown(false)}
            size={8}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            aria-multiselectable="true"
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onSelectAll}
            className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300 transition duration-200 text-sm flex items-center"
            aria-label={`Select all amenities for ${label}`}
          >
            <Check size={16} className="mr-1" /> Select All
          </button>
          <button
            type="button"
            onClick={onClear}
            className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300 transition duration-200 text-sm flex items-center"
            aria-label={`Clear all amenities for ${label}`}
          >
            <Trash2 size={16} className="mr-1" /> Clear All
          </button>
          {isRoom && id !== "allRoomsAmenities" && (
            <button
              type="button"
              onClick={onCopy}
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300 transition duration-200 text-sm flex items-center"
              aria-label={`Copy amenities from All Rooms to ${label}`}
            >
              <Copy size={16} className="mr-1" /> Copy from All Rooms
            </button>
          )}
        </div>
        <div className="flex items-center mt-4">
          <input
            type="text"
            value={customAmenity}
            onChange={(e) => setCustomAmenity(e.target.value)}
            placeholder="Add custom amenity"
            className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 mr-2"
            aria-label="Add custom amenity"
          />
          <button
            type="button"
            onClick={onCustomAdd}
            className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition duration-200"
            aria-label="Add custom amenity"
          >
            <Plus size={20} />
          </button>
        </div>
        <h3 className="font-medium text-gray-700 mt-4">Selected Amenities:</h3>
        <div className="flex flex-wrap gap-2 min-h-8 p-2 border border-dashed border-gray-300 rounded-lg">
          {selected.length > 0 ? (
            selected.map((amenity) => (
              <AmenityTag key={amenity} amenity={amenity} onRemove={onChange} />
            ))
          ) : (
            <span className="text-gray-400 italic">No amenities selected</span>
          )}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className={`flex items-center ${
              submitStatus === "success"
                ? "bg-green-500 hover:bg-green-600"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white px-4 py-2 rounded-lg transition duration-200`}
            aria-label={submitStatus === "success" ? "Saved" : "Save Amenities"}
          >
            <Save size={18} className="mr-2" />
            {submitStatus === "success" ? "Saved!" : "Save Amenities"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default function AmenitiesPage() {
  const [hotelAmenities, setHotelAmenities] = useState([]);
  const [roomAmenities, setRoomAmenities] = useState(
    useMemo(
      () => ({
        allRooms: [],
        premiumKing: [],
        deluxeVistaKing: [],
        deluxeKing: [],
        premiumTwin: [],
        deluxeTwin: [],
      }),
      []
    )
  );
  const [dropdowns, setDropdowns] = useState(
    useMemo(
      () => ({
        hotel: false,
        rooms: {
          allRooms: false,
          premiumKing: false,
          deluxeVistaKing: false,
          deluxeKing: false,
          premiumTwin: false,
          deluxeTwin: false,
        },
      }),
      []
    )
  );
  const [customAmenity, setCustomAmenity] = useState("");
  const [submitStatus, setSubmitStatus] = useState(
    useMemo(
      () => ({
        hotel: null,
        rooms: {
          allRooms: null,
          premiumKing: null,
          deluxeVistaKing: null,
          deluxeKing: null,
          premiumTwin: null,
          deluxeTwin: null,
        },
      }),
      []
    )
  );
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const savedHotelAmenities = localStorage.getItem("hotelAmenities");
      const savedRoomAmenities = localStorage.getItem("roomAmenities");
      if (savedHotelAmenities)
        setHotelAmenities(JSON.parse(savedHotelAmenities));
      if (savedRoomAmenities) setRoomAmenities(JSON.parse(savedRoomAmenities));
    } catch (err) {
      setError("Failed to load saved amenities. Please try again.");
      console.error("Error loading from localStorage:", err);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("hotelAmenities", JSON.stringify(hotelAmenities));
      localStorage.setItem("roomAmenities", JSON.stringify(roomAmenities));
    } catch (err) {
      setError("Failed to save amenities. Please try again.");
      console.error("Error saving to localStorage:", err);
    }
  }, [hotelAmenities, roomAmenities]);

  const handleHotelSubmit = useCallback(() => {
    console.log("Hotel Amenities:", hotelAmenities);
    setSubmitStatus((prev) => ({ ...prev, hotel: "success" }));
    setTimeout(() => {
      setSubmitStatus((prev) => ({ ...prev, hotel: null }));
    }, 3000);
  }, [hotelAmenities]);

  const handleRoomSubmit = useCallback(
    (roomType) => {
      console.log(`${roomType} Amenities:`, roomAmenities[roomType]);
      setSubmitStatus((prev) => ({
        ...prev,
        rooms: { ...prev.rooms, [roomType]: "success" },
      }));
      setTimeout(() => {
        setSubmitStatus((prev) => ({
          ...prev,
          rooms: { ...prev.rooms, [roomType]: null },
        }));
      }, 3000);
    },
    [roomAmenities]
  );

  const handleHotelChange = useCallback((selectedOptions) => {
    setHotelAmenities(selectedOptions);
    setDropdowns((prev) => ({ ...prev, hotel: false }));
  }, []);

  const handleRoomChange = useCallback(
    (roomType) => (selectedOptions) => {
      setRoomAmenities((prev) => ({ ...prev, [roomType]: selectedOptions }));
      setDropdowns((prev) => ({
        ...prev,
        rooms: { ...prev.rooms, [roomType]: false },
      }));
    },
    []
  );

  const removeHotelAmenity = useCallback((amenity) => {
    setHotelAmenities((prev) => prev.filter((a) => a !== amenity));
  }, []);

  const removeRoomAmenity = useCallback((roomType, amenity) => {
    setRoomAmenities((prev) => ({
      ...prev,
      [roomType]: prev[roomType].filter((a) => a !== amenity),
    }));
  }, []);

  const addCustomHotelAmenity = useCallback(() => {
    if (
      customAmenity.trim() &&
      !hotelAmenities.includes(customAmenity.trim())
    ) {
      setHotelAmenities((prev) => [...prev, customAmenity.trim()]);
      setCustomAmenity("");
    }
  }, [customAmenity, hotelAmenities]);

  const addCustomRoomAmenity = useCallback(
    (roomType) => {
      if (
        customAmenity.trim() &&
        !roomAmenities[roomType].includes(customAmenity.trim())
      ) {
        setRoomAmenities((prev) => ({
          ...prev,
          [roomType]: [...prev[roomType], customAmenity.trim()],
        }));
        setCustomAmenity("");
      }
    },
    [customAmenity, roomAmenities]
  );

  const selectAllHotelAmenities = useCallback(() => {
    setHotelAmenities([...hotelOptions]);
  }, []);

  const selectAllRoomAmenities = useCallback((roomType) => {
    setRoomAmenities((prev) => ({ ...prev, [roomType]: [...roomOptions] }));
  }, []);

  const clearHotelAmenities = useCallback(() => {
    setHotelAmenities([]);
  }, []);

  const clearRoomAmenities = useCallback((roomType) => {
    setRoomAmenities((prev) => ({ ...prev, [roomType]: [] }));
  }, []);

  const copyFromAllRooms = useCallback((roomType) => {
    setRoomAmenities((prev) => ({ ...prev, [roomType]: [...prev.allRooms] }));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Hotel & Room Amenities Management
        </h1>
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg">
            {error}
          </div>
        )}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-gray-300 pb-2">
            HOTEL AMENITIES
          </h2>
          <AmenitySelector
            id="hotelAmenities"
            label="Select Amenities"
            options={hotelOptions}
            selected={hotelAmenities}
            onChange={handleHotelChange}
            onSelectAll={selectAllHotelAmenities}
            onClear={clearHotelAmenities}
            showDropdown={dropdowns.hotel}
            setShowDropdown={(value) =>
              setDropdowns((prev) => ({ ...prev, hotel: value }))
            }
            onCustomAdd={addCustomHotelAmenity}
            customAmenity={customAmenity}
            setCustomAmenity={setCustomAmenity}
            onSubmit={handleHotelSubmit}
            submitStatus={submitStatus.hotel}
          />
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-gray-300 pb-2">
            ROOM AMENITIES
          </h2>
          {roomConfigs.map(({ label, key }) => (
            <div key={key} className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                {label}
              </h3>
              <AmenitySelector
                id={`${key}Amenities`}
                label="Select Amenities"
                options={roomOptions}
                selected={roomAmenities[key]}
                onChange={handleRoomChange(key)}
                onSelectAll={() => selectAllRoomAmenities(key)}
                onClear={() => clearRoomAmenities(key)}
                showDropdown={dropdowns.rooms[key]}
                setShowDropdown={(value) =>
                  setDropdowns((prev) => ({
                    ...prev,
                    rooms: { ...prev.rooms, [key]: value },
                  }))
                }
                onCustomAdd={() => addCustomRoomAmenity(key)}
                customAmenity={customAmenity}
                setCustomAmenity={setCustomAmenity}
                onSubmit={() => handleRoomSubmit(key)}
                submitStatus={submitStatus.rooms[key]}
                isRoom
                onCopy={() => copyFromAllRooms(key)}
              />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
