"use client";
import { useState, useMemo } from "react";
import RoomCategoriesTable from "../../../components/Dashboard/RoomsAndRates/RoomCategoriesTable";
import RoomsTable from "../../../components/Dashboard/RoomsAndRates/RoomsTable";
import CreateCategoryPopup from "../../../components/Dashboard/RoomsAndRates/CreateRoomCategory";
import CreateRatePlanPopup from "../../../components/Dashboard/RoomsAndRates/CreateRatePlan";
import UpdateCategoryPopup from "../../../components/Dashboard/RoomsAndRates/UpdateRatePlan";

const initialRooms = [
  {
    id: 1,
    type: "Deluxe Room with King Bed",
    rateType: "EP",
    status: "Active",
  },
  {
    id: 2,
    type: "Deluxe Room with Twin Beds",
    rateType: "EP",
    status: "Active",
  },
  {
    id: 3,
    type: "Deluxe Vista Room with King Bed",
    rateType: "EP",
    status: "Active",
  },
  {
    id: 4,
    type: "Premium Room with King Bed and Private Terrace",
    rateType: "EP",
    status: "Active",
  },
  {
    id: 5,
    type: "Premium Room with Twin Beds and Private Terrace",
    rateType: "EP",
    status: "Active",
  },
];

const initialRoomCategories = [
  {
    id: 1,
    category: "Deluxe Room with King Bed",
    baseOcc: 2,
    maxOcc: 2,
    extraBed: "0",
    child: 1,
    roomCount: 51,
    priority: 1,
    defaultRates: 80000,
    status: "Active",
    description:
      "Equipped with modern facilities and deluxe amenities. Each room features an inviting day bed with a bay window, which is a cozy corner to relax.",
    categoryType: "Room",
    roomNumbers: Array.from({ length: 51 }, (_, i) => `Room No-${i + 2}`),
  },
  {
    id: 2,
    category: "Deluxe Room with Twin Beds",
    baseOcc: 2,
    maxOcc: 2,
    extraBed: "NA",
    child: 1,
    roomCount: 21,
    priority: 2,
    defaultRates: 80000,
    status: "Active",
    description: "",
    categoryType: "Room",
    roomNumbers: Array.from({ length: 21 }, (_, i) => `Room No-${i + 2}`),
  },
  {
    id: 3,
    category: "Deluxe Vista Room with King Bed",
    baseOcc: 2,
    maxOcc: 2,
    extraBed: "NA",
    child: 1,
    roomCount: 36,
    priority: 3,
    defaultRates: 100000,
    status: "Active",
    description: "",
    categoryType: "Room",
    roomNumbers: [],
  },
  {
    id: 4,
    category: "Premium Room with King Bed and Private Terrace",
    baseOcc: 2,
    maxOcc: 2,
    extraBed: "NA",
    child: 1,
    roomCount: 17,
    priority: 4,
    defaultRates: 120000,
    status: "Active",
    description: "",
    categoryType: "Room",
    roomNumbers: [],
  },
  {
    id: 5,
    category: "Premium Room with Twin Beds and Private Terrace",
    baseOcc: 2,
    maxOcc: 2,
    extraBed: "NA",
    child: 1,
    roomCount: 7,
    priority: 5,
    defaultRates: 120000,
    status: "Active",
    description: "",
    categoryType: "Room",
    roomNumbers: [],
  },
];

export default function RoomsAndRates() {
  const [rooms, setRooms] = useState(initialRooms);
  const [roomCategories, setRoomCategories] = useState(initialRoomCategories);
  const [isCategoryPopupOpen, setIsCategoryPopupOpen] = useState(false);
  const [isRatePlanPopupOpen, setIsRatePlanPopupOpen] = useState(false);
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "priority",
    direction: "asc",
  });

  const handleDelete = (id) => {
    setRooms(rooms.filter((room) => room.id !== id));
  };

  const handleViewClick = (category) => {
    setSelectedCategory(category);
    setIsUpdatePopupOpen(true);
  };

  const handleStatusToggle = (id, type) => {
    if (type === "room") {
      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.id === id
            ? {
                ...room,
                status: room.status === "Active" ? "Inactive" : "Active",
              }
            : room
        )
      );
    } else if (type === "category") {
      setRoomCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === id
            ? {
                ...category,
                status: category.status === "Active" ? "Inactive" : "Active",
              }
            : category
        )
      );
    }
  };

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };
  const sortedCategories = useMemo(() => {
    let sortableCategories = [...roomCategories];
    if (sortConfig.key) {
      sortableCategories.sort((a, b) => {
        // Handle undefined values first
        if (a[sortConfig.key] === undefined) return 1; // push undefined to end
        if (b[sortConfig.key] === undefined) return -1; // push undefined to end

        // Numeric sorting
        if (
          sortConfig.key === "defaultRates" ||
          sortConfig.key === "priority"
        ) {
          const aValue = a[sortConfig.key] || 0;
          const bValue = b[sortConfig.key] || 0;
          return sortConfig.direction === "asc"
            ? aValue - bValue
            : bValue - aValue;
        }

        // String sorting
        if (sortConfig.key === "category") {
          const aValue = a[sortConfig.key] || "";
          const bValue = b[sortConfig.key] || "";
          return sortConfig.direction === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        return 0;
      });
    }
    return sortableCategories;
  }, [roomCategories, sortConfig]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <RoomCategoriesTable
          sortedCategories={sortedCategories}
          sortConfig={sortConfig}
          handleSort={handleSort}
          handleStatusToggle={handleStatusToggle}
          handleViewClick={handleViewClick}
          setIsCategoryPopupOpen={setIsCategoryPopupOpen}
        />

        <RoomsTable
          rooms={rooms}
          handleStatusToggle={handleStatusToggle}
          handleDelete={handleDelete}
          setIsRatePlanPopupOpen={setIsRatePlanPopupOpen}
        />

        {isCategoryPopupOpen && (
          <CreateCategoryPopup
            setIsCategoryPopupOpen={setIsCategoryPopupOpen}
            setRoomCategories={setRoomCategories}
            roomCategories={roomCategories}
          />
        )}

        {isRatePlanPopupOpen && (
          <CreateRatePlanPopup
            setIsRatePlanPopupOpen={setIsRatePlanPopupOpen}
            roomCategories={roomCategories}
            setRooms={setRooms}
            rooms={rooms}
          />
        )}

        {isUpdatePopupOpen && selectedCategory && (
          <UpdateCategoryPopup
            setIsUpdatePopupOpen={setIsUpdatePopupOpen}
            selectedCategory={selectedCategory}
            setRoomCategories={setRoomCategories}
          />
        )}
      </div>
    </div>
  );
}
