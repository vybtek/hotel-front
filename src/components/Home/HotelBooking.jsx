"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import HotelInfo from "./HotelInfo";
import DateSelector from "./DateSelector";
import RoomManager from "./RoomManager";
import Link from "next/link";

const roomsData = [
  {
    id: 1,
    name: "Deluxe Room with King Bed",
    price: 26667,
    originalPrice: 27167,
    adults: 2,
    children: 1,
    area: "33 sq.mtr",
    roomsLeft: 51,
    images: [
      "https://asiatech-channel-manager-document-new.s3.amazonaws.com/hotel/8615/gallery/img_67dbf662999265.69158994.jpg",
      "https://asiatech-channel-manager-document-new.s3.amazonaws.com/hotel/8615/gallery/img_67dbf661279be4.49856276.jpg",
      "https://asiatech-channel-manager-document-new.s3.amazonaws.com/hotel/8615/gallery/img_67dd62e33f2cf3.40532551.jpg",
    ],
    description:
      "Equipped with modern facilities and deluxe amenities. Features a cozy day bed with a bay window.",
    amenities: ["Free WiFi", "Air Conditioning", "Minibar", "Safe", "TV"],
    rating: 4.7,
    reviews: 128,
  },
  {
    id: 2,
    name: "Deluxe Room with Twin Bed",
    price: 46890,
    originalPrice: 47167,
    adults: 2,
    children: 1,
    area: "33 sq.mtr",
    roomsLeft: 45,
    images: [
      "https://asiatech-channel-manager-document-new.s3.amazonaws.com/hotel/8615/gallery/img_67dd62e33f2cf3.40532551.jpg",
      "https://asiatech-channel-manager-document-new.s3.amazonaws.com/hotel/8615/gallery/img_67dea6732794d0.12333665.jpg",
      "https://asiatech-channel-manager-document-new.s3.amazonaws.com/hotel/8615/gallery/img_67dea5e59f6391.72580217.jpg",
    ],
    description:
      "Modern room with twin beds and deluxe amenities. Includes a bay window for relaxation.",
    amenities: [
      "Free WiFi",
      "Air Conditioning",
      "Minibar",
      "Safe",
      "TV",
      "Bathtub",
    ],
    rating: 4.5,
    reviews: 96,
  },
  {
    id: 3,
    name: "Premium Suite",
    price: 75000,
    originalPrice: 78000,
    adults: 4,
    children: 2,
    area: "50 sq.mtr",
    roomsLeft: 20,
    images: [
      "https://asiatech-channel-manager-document-new.s3.amazonaws.com/hotel/8615/gallery/img_67f235a122b582.44872500.jpg",
      "https://asiatech-channel-manager-document-new.s3.amazonaws.com/hotel/8615/gallery/img_67f235a2347eb0.26997671.jpeg",
      "https://asiatech-channel-manager-document-new.s3.amazonaws.com/hotel/8615/gallery/img_67e3f70487ad95.04425230.jpg",
    ],
    description:
      "Luxurious suite with spacious living area, premium amenities, and stunning views.",
    amenities: [
      "Free WiFi",
      "Air Conditioning",
      "Minibar",
      "Safe",
      "TV",
      "Bathtub",
      "Living Area",
      "Balcony",
    ],
    rating: 4.9,
    reviews: 64,
  },
];

export default function HotelBooking() {
  const [dates, setDates] = useState([
    new Date("2026-02-18"),
    new Date("2026-02-21"),
  ]);
  const [rooms, setRooms] = useState(roomsData);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [selectedRoomQty, setSelectedRoomQty] = useState(0);
  const [showCalendar, setShowCalendar] = useState(false);
  const [filters, setFilters] = useState({
    sort: "",
    adults: 0,
    children: 0,
  });

  const filterRooms = useCallback(() => {
    let filteredRooms = [...roomsData];

    if (filters.adults > 0) {
      filteredRooms = filteredRooms.filter(
        (room) => room.adults >= filters.adults
      );
    }
    if (filters.children > 0) {
      filteredRooms = filteredRooms.filter(
        (room) => room.children >= filters.children
      );
    }

    if (filters.sort === "price-low") {
      filteredRooms.sort((a, b) => a.price - b.price);
    } else if (filters.sort === "price-high") {
      filteredRooms.sort((a, b) => b.price - a.price);
    } else if (filters.sort === "availability") {
      filteredRooms.sort((a, b) => b.roomsLeft - a.roomsLeft);
    }

    setRooms(filteredRooms);
  }, [filters]);

  useEffect(() => {
    filterRooms();
  }, [filterRooms]);

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
       <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center py-3">
            {/* Logo with hover animation */}
            <Link href="/" className="flex items-center group">
              <Image
                src="/logo.png"
                alt="Logo"
                width={140}
                height={48}
                className="h-auto w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Navigation with micro-interactions */}
            <div className="flex items-center gap-6">
              <button
                suppressHydrationWarning
                className="relative px-1 py-2 text-gray-600 hover:text-indigo-600 transition-colors group"
              >
                <a
                  href="/help"
                  className="flex items-center gap-1 text-blue-600 "
                >
                  {/* <FiHelpCircle className="text-lg" /> */}
                  <span>Help</span>
                </a>

                <span className="absolute bottom-0 left-0 h-0.5 bg-indigo-600 w-0 group-hover:w-full transition-all duration-300"></span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <HotelInfo />
        <DateSelector
          dates={dates}
          setDates={setDates}
          showCalendar={showCalendar}
          setShowCalendar={setShowCalendar}
          filterRooms={filterRooms}
          setSelectedRoomId={setSelectedRoomId}
          setSelectedRoomQty={setSelectedRoomQty}
        />
        <RoomManager
          dates={dates}
          rooms={rooms}
          setRooms={setRooms}
          selectedRoomId={selectedRoomId}
          setSelectedRoomId={setSelectedRoomId}
          selectedRoomQty={selectedRoomQty}
          setSelectedRoomQty={setSelectedRoomQty}
          filters={filters}
          setFilters={setFilters}
        />
      </div>
    </div>
  );
}
