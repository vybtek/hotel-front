"use client";

import { useState } from "react";
import React from "react";

export default function AvailabilityCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date("2025-04-25"));
  const [rooms, setRooms] = useState([
    {
      name: "Ocean View Suite",
      total: 40,
      availability: {},
      booked: 25,
      blocked: 10,
    },
    {
      name: "Mountain Retreat",
      total: 30,
      availability: {},
      booked: 15,
      blocked: 5,
    },
    {
      name: "Cityscape Loft",
      total: 25,
      availability: {},
      booked: 20,
      blocked: 5,
    },
    {
      name: "Garden Villa",
      total: 15,
      availability: {},
      booked: 10,
      blocked: 2,
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={openModal}
            className="bg-teal-500 text-white px-4 py-2 rounded-lg shadow hover:bg-teal-600 cursor-pointer"
          >
            Bulk Update
          </button>
          <input
            type="date"
            defaultValue="2025-04-25"
            className="border border-gray-300 rounded-lg p-2"
            onChange={(e) => setCurrentDate(new Date(e.target.value))}
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={handlePrev}
              className="text-blue-600 hover:text-blue-800"
            >
              ← Prev
            </button>
            <h2 className="text-xl font-bold text-gray-800">
              Room Availability
            </h2>
            <button
              onClick={handleNext}
              className="text-blue-600 hover:text-blue-800"
            >
              Next →
            </button>
          </div>

          <div className="overflow-x-auto">
            <div className="grid grid-cols-[200px_repeat(14,80px)] gap-2">
              <div className="font-semibold text-gray-700 p-2">
                Room Category
              </div>
              {days.map((day, index) => (
                <div key={index} className="text-center p-2">
                  <div className="text-sm text-gray-500">{day.weekday}</div>
                  <div className="text-lg font-semibold">{day.day}</div>
                  <div className="text-xs text-gray-400">{day.month}</div>
                </div>
              ))}

              {rooms.map((room, roomIndex) => (
                <React.Fragment key={room.name}>
                  <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center">
                    <div>
                      <div className="font-medium text-gray-800">
                        {room.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        Total: {room.total}
                      </div>
                    </div>
                  </div>
                  {days.map((day, dayIndex) => {
                    const available = room.availability[day.dateStr] || 0;
                    return (
                      <div key={dayIndex} className="p-2 text-center">
                        <div className="flex flex-col items-center gap-1">
                          {editMode.roomIndex === roomIndex &&
                          editMode.dayIndex === dayIndex ? (
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                value={editMode.value}
                                onChange={handleEditChange}
                                className="w-12 p-1 border border-gray-300 rounded"
                              />
                              <button
                                onClick={handleEditSave}
                                className="bg-teal-500 text-white px-1 py-0.5 rounded text-xs"
                              >
                                Save
                              </button>
                            </div>
                          ) : (
                            <div
                              onClick={() =>
                                handleEditClick(roomIndex, dayIndex)
                              }
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold cursor-pointer ${
                                available > 0
                                  ? "bg-green-400 text-white"
                                  : "bg-gray-300 text-gray-600"
                              }`}
                            >
                              {available}
                            </div>
                          )}
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                              room.booked > 0
                                ? "bg-blue-500 text-white"
                                : "bg-gray-300 text-gray-600"
                            }`}
                          >
                            {room.booked}
                          </div>
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                              room.blocked > 0
                                ? "bg-purple-500 text-white"
                                : "bg-gray-300 text-gray-600"
                            }`}
                          >
                            {room.blocked}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button className="bg-teal-500 text-white px-6 py-2 rounded-lg shadow hover:bg-teal-600 cursor-pointer">
              Update
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Bulk Update Inventory</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Choose Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
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
                <label className="block text-sm font-medium text-gray-700">
                  No of Rooms
                </label>
                <input
                  type="number"
                  name="noOfRooms"
                  value={formData.noOfRooms}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                  placeholder="Enter number of rooms"
                />
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Want to update Sold Out dates also?
                </label>
                <select
                  name="updateSoldOut"
                  value={formData.updateSoldOut}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              <button
                onClick={handleUpdateInventory}
                className="w-full cursor-pointer bg-teal-500 text-white px-4 py-2

 rounded-lg shadow hover:bg-teal-600"
              >
                Update Inventory
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
