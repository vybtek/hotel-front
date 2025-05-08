"use client";

import { useState, useEffect } from "react";
import { X, Plus, Check, Copy, Save, Trash2 } from "lucide-react";

export default function AmenitiesPage() {
  // Initialize state with defaults loaded from localStorage if available
  const [hotelAmenities, setHotelAmenities] = useState([]);
  const [roomAmenities, setRoomAmenities] = useState({
    allRooms: [],
    premiumKing: [],
    deluxeVistaKing: [],
    deluxeKing: [],
    premiumTwin: [],
    deluxeTwin: [],
  });
  const [showHotelDropdown, setShowHotelDropdown] = useState(false);
  const [showRoomDropdown, setShowRoomDropdown] = useState({
    allRooms: false,
    premiumKing: false,
    deluxeVistaKing: false,
    deluxeKing: false,
    premiumTwin: false,
    deluxeTwin: false,
  });
  const [customAmenity, setCustomAmenity] = useState("");
  const [submitStatus, setSubmitStatus] = useState({
    hotel: null,
    rooms: {
      allRooms: null,
      premiumKing: null,
      deluxeVistaKing: null,
      deluxeKing: null,
      premiumTwin: null,
      deluxeTwin: null,
    },
  });

  // Default amenity options
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

  // Load data from localStorage on component mount
  useEffect(() => {
    try {
      const savedHotelAmenities = localStorage.getItem("hotelAmenities");
      const savedRoomAmenities = localStorage.getItem("roomAmenities");

      if (savedHotelAmenities) {
        setHotelAmenities(JSON.parse(savedHotelAmenities));
      }

      if (savedRoomAmenities) {
        setRoomAmenities(JSON.parse(savedRoomAmenities));
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem("hotelAmenities", JSON.stringify(hotelAmenities));
      localStorage.setItem("roomAmenities", JSON.stringify(roomAmenities));
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  }, [hotelAmenities, roomAmenities]);

  // Handle form submissions
  const handleHotelSubmit = (e) => {
    e.preventDefault();
    console.log("Hotel Amenities:", hotelAmenities);

    // Show success status
    setSubmitStatus((prev) => ({
      ...prev,
      hotel: "success",
    }));

    // Reset status after 3 seconds
    setTimeout(() => {
      setSubmitStatus((prev) => ({
        ...prev,
        hotel: null,
      }));
    }, 3000);
  };

  const handleRoomSubmit = (roomType) => (e) => {
    e.preventDefault();
    console.log(`${roomType} Amenities:`, roomAmenities[roomType] || []);

    // Show success status
    setSubmitStatus((prev) => ({
      ...prev,
      rooms: {
        ...prev.rooms,
        [roomType]: "success",
      },
    }));

    // Reset status after 3 seconds
    setTimeout(() => {
      setSubmitStatus((prev) => ({
        ...prev,
        rooms: {
          ...prev.rooms,
          [roomType]: null,
        },
      }));
    }, 3000);
  };

  // Handle amenity selection
  const handleHotelChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setHotelAmenities(selectedOptions);
    setShowHotelDropdown(false);
  };

  const handleRoomChange = (roomType) => (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoomAmenities((prev) => ({ ...prev, [roomType]: selectedOptions }));
    setShowRoomDropdown((prev) => ({ ...prev, [roomType]: false }));
  };

  // Handle amenity removal
  const removeAmenity = (roomType, amenityToRemove) => {
    setRoomAmenities((prev) => ({
      ...prev,
      [roomType]: (prev[roomType] || []).filter(
        (amenity) => amenity !== amenityToRemove
      ),
    }));
  };

  const removeHotelAmenity = (amenityToRemove) => {
    setHotelAmenities((prev) =>
      prev.filter((amenity) => amenity !== amenityToRemove)
    );
  };

  // Select all amenities
  const selectAllHotelAmenities = () => {
    setHotelAmenities([...hotelOptions]);
  };

  const selectAllRoomAmenities = (roomType) => {
    setRoomAmenities((prev) => ({
      ...prev,
      [roomType]: [...roomOptions],
    }));
  };

  // Add custom amenity
  const addCustomHotelAmenity = () => {
    if (
      customAmenity.trim() &&
      !hotelAmenities.includes(customAmenity.trim())
    ) {
      setHotelAmenities((prev) => [...prev, customAmenity.trim()]);
      setCustomAmenity("");
    }
  };

  const addCustomRoomAmenity = (roomType) => {
    if (
      customAmenity.trim() &&
      !roomAmenities[roomType]?.includes(customAmenity.trim())
    ) {
      setRoomAmenities((prev) => ({
        ...prev,
        [roomType]: [...(prev[roomType] || []), customAmenity.trim()],
      }));
      setCustomAmenity("");
    }
  };

  // Copy amenities from "All Rooms" to other room types
  const copyFromAllRooms = (roomType) => {
    setRoomAmenities((prev) => ({
      ...prev,
      [roomType]: [...prev.allRooms],
    }));
  };

  // Clear all amenities
  const clearHotelAmenities = () => {
    setHotelAmenities([]);
  };

  const clearRoomAmenities = (roomType) => {
    setRoomAmenities((prev) => ({
      ...prev,
      [roomType]: [],
    }));
  };

  // Room configuration mapping
  const roomConfigs = [
    { label: "All Rooms", key: "allRooms" },
    {
      label: "Premium room with King Bed and Private Terrace",
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Hotel & Room Amenities Management
        </h1>

        {/* Hotel Amenities Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-gray-300 pb-2">
            HOTEL AMENITIES
          </h2>
          <form
            onSubmit={handleHotelSubmit}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col">
                <label
                  htmlFor="hotelAmenities"
                  className="mb-2 text-gray-700 font-medium"
                >
                  Select Amenities
                </label>

                {!showHotelDropdown ? (
                  <input
                    id="hotelAmenities"
                    type="text"
                    value={hotelAmenities.join(", ")}
                    onClick={() => setShowHotelDropdown(true)}
                    placeholder="Click to select hotel amenities"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 cursor-pointer"
                    readOnly
                  />
                ) : (
                  <select
                    multiple
                    value={hotelAmenities}
                    onChange={handleHotelChange}
                    onBlur={() => setShowHotelDropdown(false)}
                    size={8}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  >
                    {hotelOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={selectAllHotelAmenities}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300 transition duration-200 text-sm flex items-center"
                >
                  <Check size={16} className="mr-1" /> Select All
                </button>
                <button
                  type="button"
                  onClick={clearHotelAmenities}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300 transition duration-200 text-sm flex items-center"
                >
                  <Trash2 size={16} className="mr-1" /> Clear All
                </button>
              </div>

              <div className="flex items-center mt-4">
                <input
                  type="text"
                  value={customAmenity}
                  onChange={(e) => setCustomAmenity(e.target.value)}
                  placeholder="Add custom amenity"
                  className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 mr-2"
                />
                <button
                  type="button"
                  onClick={addCustomHotelAmenity}
                  className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition duration-200"
                >
                  <Plus size={20} />
                </button>
              </div>

              <h3 className="font-medium text-gray-700 mt-4">
                Selected Amenities:
              </h3>
              <div className="flex flex-wrap gap-2 min-h-8 p-2 border border-dashed border-gray-300 rounded-lg">
                {hotelAmenities.length > 0 ? (
                  hotelAmenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                    >
                      {amenity}
                      <button
                        type="button"
                        onClick={() => removeHotelAmenity(amenity)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 italic">
                    No amenities selected
                  </span>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className={`flex items-center ${
                    submitStatus.hotel === "success"
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white px-4 py-2 rounded-lg transition duration-200`}
                >
                  <Save size={18} className="mr-2" />
                  {submitStatus.hotel === "success"
                    ? "Saved!"
                    : "Save Hotel Amenities"}
                </button>
              </div>
            </div>
          </form>
        </section>

        {/* Room Amenities Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-gray-300 pb-2">
            ROOM AMENITIES
          </h2>

          {roomConfigs.map(({ label, key }) => (
            <div key={key} className="mb-8 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                {label}
              </h3>

              <form onSubmit={handleRoomSubmit(key)}>
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col">
                    <label
                      htmlFor={`${key}Amenities`}
                      className="mb-2 text-gray-700 font-medium"
                    >
                      Select Amenities
                    </label>

                    {!showRoomDropdown[key] ? (
                      <input
                        id={`${key}Amenities`}
                        type="text"
                        value={(roomAmenities[key] || []).join(", ")}
                        onClick={() =>
                          setShowRoomDropdown((prev) => ({
                            ...prev,
                            [key]: true,
                          }))
                        }
                        placeholder={`Select amenities for ${label}`}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 cursor-pointer"
                        readOnly
                      />
                    ) : (
                      <select
                        multiple
                        value={roomAmenities[key] || []}
                        onChange={handleRoomChange(key)}
                        onBlur={() =>
                          setShowRoomDropdown((prev) => ({
                            ...prev,
                            [key]: false,
                          }))
                        }
                        size={8}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                      >
                        {roomOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => selectAllRoomAmenities(key)}
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300 transition duration-200 text-sm flex items-center"
                    >
                      <Check size={16} className="mr-1" /> Select All
                    </button>

                    <button
                      type="button"
                      onClick={() => clearRoomAmenities(key)}
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300 transition duration-200 text-sm flex items-center"
                    >
                      <Trash2 size={16} className="mr-1" /> Clear All
                    </button>

                    {key !== "allRooms" && (
                      <button
                        type="button"
                        onClick={() => copyFromAllRooms(key)}
                        className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300 transition duration-200 text-sm flex items-center"
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
                    />
                    <button
                      type="button"
                      onClick={() => addCustomRoomAmenity(key)}
                      className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition duration-200"
                    >
                      <Plus size={20} />
                    </button>
                  </div>

                  <h3 className="font-medium text-gray-700 mt-4">
                    Selected Amenities:
                  </h3>
                  <div className="flex flex-wrap gap-2 min-h-8 p-2 border border-dashed border-gray-300 rounded-lg">
                    {(roomAmenities[key] || []).length > 0 ? (
                      (roomAmenities[key] || []).map((amenity) => (
                        <span
                          key={amenity}
                          className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                        >
                          {amenity}
                          <button
                            type="button"
                            onClick={() => removeAmenity(key, amenity)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400 italic">
                        No amenities selected
                      </span>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className={`flex items-center ${
                        submitStatus.rooms[key] === "success"
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-blue-500 hover:bg-blue-600"
                      } text-white px-4 py-2 rounded-lg transition duration-200`}
                    >
                      <Save size={18} className="mr-2" />
                      {submitStatus.rooms[key] === "success"
                        ? "Saved!"
                        : `Save Amenities`}
                      {/* : `Save ${label} Amenities`} */}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
