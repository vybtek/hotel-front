"use client";

import { useState } from "react";
import React from "react";

export default function EnhancedAvailabilityCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date("2025-04-25"));
  const [rooms, setRooms] = useState([
    {
      name: "Deluxe Room with King Bed",
      total: 51,
      availability: {},
      booked: 0,
      blocked: 51,
    },
    {
      name: "Deluxe Room with Twin Beds",
      total: 21,
      availability: {},
      booked: 0,
      blocked: 21,
    },
    {
      name: "Deluxe Vista Room with King Bed",
      total: 36,
      availability: {},
      booked: 0,
      blocked: 36,
    },
    {
      name: "Premium Room with King Bed and Private Terrace",
      total: 17,
      availability: {},
      booked: 0,
      blocked: 17,
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    noOfRooms: "",
    startDate: "",
    endDate: "",
    updateSoldOut: "No",
  });
  const [editMode, setEditMode] = useState({
    roomIndex: null,
    dayIndex: null,
    value: "",
  });

  const days = [];
  const startDate = new Date(currentDate);
  for (let i = 0; i < 14; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const dateStr = date.toISOString().split("T")[0];
    days.push({
      dateStr,
      day: date.getDate(),
      month: date.toLocaleString("default", { month: "short" }),
      weekday: date.toLocaleString("default", { weekday: "short" }),
    });
  }

  const handlePrev = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 14);
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 14);
    setCurrentDate(newDate);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateInventory = () => {
    if (
      !formData.category ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.noOfRooms
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    if (start > end) {
      alert("End date must be after start date.");
      return;
    }

    const updatedRooms = rooms.map((room) => {
      if (room.name === formData.category) {
        const newAvailability = { ...room.availability };
        let currentDate = new Date(start);
        while (currentDate <= end) {
          const dateStr = currentDate.toISOString().split("T")[0];
          newAvailability[dateStr] = parseInt(formData.noOfRooms) || 0;
          currentDate.setDate(currentDate.getDate() + 1);
        }
        return { ...room, availability: newAvailability };
      }
      return room;
    });

    setRooms(updatedRooms);
    closeModal();
  };

  const handleEditClick = (roomIndex, dayIndex) => {
    const room = rooms[roomIndex];
    const day = days[dayIndex];
    const currentValue = room.availability[day.dateStr] || 0;
    setEditMode({ roomIndex, dayIndex, value: currentValue.toString() });
  };

  const handleEditChange = (e) => {
    setEditMode((prev) => ({ ...prev, value: e.target.value }));
  };

  const handleEditSave = () => {
    if (editMode.roomIndex !== null && editMode.dayIndex !== null) {
      const updatedRooms = [...rooms];
      const room = updatedRooms[editMode.roomIndex];
      const day = days[editMode.dayIndex];
      const newAvailability = {
        ...room.availability,
        [day.dateStr]: parseInt(editMode.value) || 0,
      };
      updatedRooms[editMode.roomIndex] = {
        ...room,
        availability: newAvailability,
      };
      setRooms(updatedRooms);
      setEditMode({ roomIndex: null, dayIndex: null, value: "" });
    }
  };

  return (
    <div className="min-h-screen pt-4 pb-5">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-  overflow-hidden">
          {/* Header */}
          <div className="bg-gray-100 p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-700">
                Hotel Room Availability
              </h1>
              <div className="flex gap-4 items-center">
                <div className="relative">
                  <input
                    type="date"
                    defaultValue="2025-04-25"
                    className="border-0 bg-white/20 text-gray-600 px-4 py-2 rounded-lg focus:ring-2 focus:ring-white/50 focus:outline-none"
                    onChange={(e) => setCurrentDate(new Date(e.target.value))}
                  />
                </div>

                <button
                  onClick={openModal}
                  className="bg-white text-indigo-700 px-4 py-2 rounded-lg shadow hover:bg-indigo-50 transition-all font-medium flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                  Bulk Update
                </button>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="bg-gray-50 p-4 border-b border-gray-200">
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-700">Available Rooms</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                <span className="text-sm text-gray-700">Booked Rooms</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                <span className="text-sm text-gray-700">Blocked Rooms</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span className="text-sm text-gray-700">Sold Out</span>
              </div>
            </div>
          </div>

          {/* Calendar Navigation */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 px-3 py-1 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              Previous
            </button>
            <h2 className="text-xl font-bold text-gray-800">
              {new Date(days[0].dateStr).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </h2>
            <button
              onClick={handleNext}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 px-3 py-1 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 sticky left-0 bg-gray-50 min-w-48 z-10 border-r border-gray-200">
                    Room Category
                  </th>
                  {days.map((day, index) => (
                    <th
                      key={index}
                      className="p-2 min-w-20 border-r border-gray-200 last:border-r-0"
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-xs text-gray-500 font-medium">
                          {day.weekday}
                        </span>
                        <span className="text-lg font-bold text-gray-800">
                          {day.day}
                        </span>
                        <span className="text-xs text-gray-500">
                          {day.month}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {rooms.map((room, roomIndex) => (
                  <React.Fragment key={room.name}>
                    <tr className="hover:bg-blue-50/50 transition-colors">
                      <td className="sticky left-0 bg-white min-w-48 z-10 border-r border-gray-200 hover:bg-blue-50/50">
                        <div className="p-4">
                          <div className="font-medium text-gray-800">
                            {room.name}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Total: {room.total} | Blocked: {room.blocked}
                          </div>
                        </div>
                      </td>
                      {days.map((day, dayIndex) => {
                        const available = room.availability[day.dateStr] || 0;
                        const isAvailable = available > 0;
                        const hasNoneAvailable =
                          available === 0 && room.booked === 0;

                        return (
                          <td
                            key={dayIndex}
                            className="p-2 text-center border-r border-gray-200 last:border-r-0"
                          >
                            <div className="flex flex-col items-center gap-1">
                              {editMode.roomIndex === roomIndex &&
                              editMode.dayIndex === dayIndex ? (
                                <div className="flex items-center gap-1">
                                  <input
                                    type="number"
                                    value={editMode.value}
                                    onChange={handleEditChange}
                                    className="w-16 p-1 border border-gray-300 rounded text-center"
                                    min="0"
                                    max={room.total - room.blocked}
                                  />
                                  <button
                                    onClick={handleEditSave}
                                    className="bg-indigo-500 text-white px-2 py-1 rounded text-xs hover:bg-indigo-600"
                                  >
                                    Save
                                  </button>
                                </div>
                              ) : (
                                <div className="mb-1">
                                  <div
                                    onClick={() =>
                                      handleEditClick(roomIndex, dayIndex)
                                    }
                                    className={`w-12 py-1 rounded-lg flex items-center justify-center font-medium cursor-pointer transition-colors ${
                                      hasNoneAvailable
                                        ? "bg-red-500 text-white"
                                        : isAvailable
                                        ? "bg-green-500 text-white"
                                        : "bg-gray-200 text-gray-600"
                                    }`}
                                  >
                                    {available}
                                  </div>
                                </div>
                              )}
                              <div className="grid grid-cols-2 gap-1">
                                <div
                                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium ${
                                    room.booked > 0
                                      ? "bg-blue-500 text-white"
                                      : "bg-gray-200 text-gray-500"
                                  }`}
                                  title="Booked"
                                >
                                  {room.booked}
                                </div>
                                <div
                                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium ${
                                    room.blocked > 0
                                      ? "bg-purple-500 text-white"
                                      : "bg-gray-200 text-gray-500"
                                  }`}
                                  title="Blocked"
                                >
                                  {room.blocked}
                                </div>
                              </div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing {rooms.length} room categories over 14 days
            </div>
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition-colors font-medium">
              Update All
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div
            className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                Bulk Update Inventory
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Room Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                >
                  <option value="">Select a category</option>
                  {rooms.map((room) => (
                    <option key={room.name} value={room.name}>
                      {room.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Rooms Available
                </label>
                <input
                  type="number"
                  name="noOfRooms"
                  value={formData.noOfRooms}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  placeholder="Enter number of rooms"
                  min="0"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Update Sold Out dates?
                </label>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="updateSoldOut"
                      value="Yes"
                      checked={formData.updateSoldOut === "Yes"}
                      onChange={handleInputChange}
                      className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="updateSoldOut"
                      value="No"
                      checked={formData.updateSoldOut === "No"}
                      onChange={handleInputChange}
                      className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleUpdateInventory}
                  className="w-full bg-indigo-600 text-white px-4 py-3 rounded-lg shadow hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                    <polyline points="17 21 17 13 7 13 7 21"></polyline>
                    <polyline points="7 3 7 8 15 8"></polyline>
                  </svg>
                  Update Inventory
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
