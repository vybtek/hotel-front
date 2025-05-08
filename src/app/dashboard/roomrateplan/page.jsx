"use client";
import { useState } from "react";

export default function RoomsAndRates() {
  const [rooms, setRooms] = useState([
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
  ]);

  const [roomCategories, setRoomCategories] = useState([
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
        "Equipped with modern facilities and deluxe amenities. Each room features an inviting day bed with a bay window, which is a cozy corner to",
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
      roomNumbers: Array.from({ length: 31 }, (_, i) => `Room No-${i + 2}`),
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
      categoryType: "",
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
      categoryType: "",
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
      categoryType: "",
      roomNumbers: [],
    },
  ]);

  const [isCategoryPopupOpen, setIsCategoryPopupOpen] = useState(false);
  const [isRatePlanPopupOpen, setIsRatePlanPopupOpen] = useState(false);
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryFormData, setCategoryFormData] = useState({
    categoryName: "",
    baseOcc: "",
    maxOcc: "",
    extraBed: "",
    extraBedCost: "",
    child: "",
    childCost: "",
    totalRooms: "",
    defaultRate: "",
    description: "",
    status: "Active",
  });
  const [ratePlanFormData, setRatePlanFormData] = useState({
    selectedRoom: "",
    ratePlan: [],
  });
  const [updateFormData, setUpdateFormData] = useState({
    categoryName: "",
    baseOcc: "",
    maxOcc: "",
    extraBed: "",
    extraBedCost: "",
    child: "",
    childCost: "",
    totalRooms: "",
    defaultRate: "",
    description: "",
    priority: "",
    categoryType: "",
    status: "Active",
  });

  const handleDelete = (id) => {
    setRooms(rooms.filter((room) => room.id !== id));
  };

  const handleCategoryInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryFormData({ ...categoryFormData, [name]: value });
  };

  const handleRatePlanInputChange = (e) => {
    const { name, value } = e.target;
    setRatePlanFormData({ ...ratePlanFormData, [name]: value });
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData({ ...updateFormData, [name]: value });
  };

  const handleRatePlanCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setRatePlanFormData((prev) => ({
      ...prev,
      ratePlan: checked
        ? [...prev.ratePlan, value]
        : prev.ratePlan.filter((plan) => plan !== value),
    }));
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    console.log("Category Form submitted:", categoryFormData);
    setRoomCategories([
      ...roomCategories,
      { id: roomCategories.length + 1, ...categoryFormData, roomNumbers: [] },
    ]);
    setIsCategoryPopupOpen(false);
    setCategoryFormData({
      categoryName: "",
      baseOcc: "",
      maxOcc: "",
      extraBed: "",
      extraBedCost: "",
      child: "",
      childCost: "",
      totalRooms: "",
      defaultRate: "",
      description: "",
      status: "Active",
    });
  };

  const handleRatePlanSubmit = (e) => {
    e.preventDefault();
    console.log("Rate Plan Form submitted:", ratePlanFormData);
    setIsRatePlanPopupOpen(false);
    setRatePlanFormData({
      selectedRoom: "",
      ratePlan: [],
    });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    console.log("Update Form submitted:", updateFormData);
    setRoomCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === selectedCategory.id
          ? {
              ...category,
              ...updateFormData,
              category: updateFormData.categoryName,
            }
          : category
      )
    );
    setIsUpdatePopupOpen(false);
    setSelectedCategory(null);
    setUpdateFormData({
      categoryName: "",
      baseOcc: "",
      maxOcc: "",
      extraBed: "",
      extraBedCost: "",
      child: "",
      childCost: "",
      totalRooms: "",
      defaultRate: "",
      description: "",
      priority: "",
      categoryType: "",
      status: "Active",
    });
  };

  const handleViewClick = (category) => {
    setSelectedCategory(category);
    setUpdateFormData({
      categoryName: category.category,
      baseOcc: category.baseOcc,
      maxOcc: category.maxOcc,
      extraBed: category.extraBed,
      extraBedCost: "0",
      child: category.child,
      childCost: "0",
      totalRooms: category.roomCount,
      defaultRate: category.defaultRates,
      description: category.description || "",
      priority: category.priority,
      categoryType: category.categoryType || "Room",
      status: category.status,
    });
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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Added Room Categories Section */}
        <div className="mb-12 max-w-5xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Added Room Categories
            </h1>
            <button
              onClick={() => setIsCategoryPopupOpen(true)}
              className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
            >
              Create Room Category
            </button>
          </div>
          <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
            <div className="grid grid-cols-10 gap-4 p-4 bg-indigo-100 font-semibold text-indigo-800">
              <div>Category</div>
              <div>Base Occ</div>
              <div>Max Occ</div>
              <div>E Beds</div>
              <div>Child</div>
              <div>Room Count</div>
              <div>Priority</div>
              <div>Default Rates</div>
              <div>Status</div>
              <div>Action</div>
            </div>
            {roomCategories.map((room) => (
              <div
                key={room.id}
                className="grid grid-cols-10 gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <div className="text-gray-800">{room.category}</div>
                <div className="text-gray-600">{room.baseOcc}</div>
                <div className="text-gray-600">{room.maxOcc}</div>
                <div className="text-gray-600">{room.extraBed}</div>
                <div className="text-gray-600">{room.child}</div>
                <div className="text-gray-600">{room.roomCount}</div>
                <div className="text-gray-600">{room.priority}</div>
                <div className="text-gray-600">{room.defaultRates}</div>
                <div>
                  <span
                    onClick={() => handleStatusToggle(room.id, "category")}
                    className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                      room.status === "Active"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {room.status}
                  </span>
                </div>
                <div>
                  <button
                    onClick={() => handleViewClick(room)}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Existing Rooms & Rate Plans Section */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">
              Rooms & Rate Plans
            </h1>
            <button
              onClick={() => setIsRatePlanPopupOpen(true)}
              className="bg-indigo-600 text-white cursor-pointer px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
            >
              Create a Rate Plan
            </button>
          </div>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-4 gap-12 p-4 bg-indigo-100 font-semibold text-indigo-800">
              <div>Room Type</div>
              <div className="pl-28">Rate Type</div>
              <div className="pl-16">Status</div>
              <div className="pl-16">Action</div>
            </div>
            {rooms.map((room) => (
              <div
                key={room.id}
                className="grid grid-cols-4 gap-12 p-4 border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <div className="text-gray-800">{room.type}</div>
                <div className="text-gray-600 pl-28">{room.rateType}</div>
                <div className="pl-16">
                  <span
                    onClick={() => handleStatusToggle(room.id, "room")}
                    className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                      room.status === "Active"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {room.status}
                  </span>
                </div>
                <div className="flex space-x-2  pl-16">
                  <button
                    onClick={() => handleDelete(room.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create Room Category Popup */}
        {isCategoryPopupOpen && (
          <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                CREATE ROOM CATEGORY
              </h2>
              <form
                onSubmit={handleCategorySubmit}
                className="grid grid-cols-3 gap-4"
              >
                <div>
                  <label className="block text-gray-700">
                    Room Category Name
                  </label>
                  <input
                    type="text"
                    name="categoryName"
                    value={categoryFormData.categoryName}
                    onChange={handleCategoryInputChange}
                    className="w-full mt-1 p-2 border rounded"
                    placeholder="Room Category Name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">
                    Room Base Occupancy
                  </label>
                  <select
                    name="baseOcc"
                    value={categoryFormData.baseOcc}
                    onChange={handleCategoryInputChange}
                    className="w-full mt-1 p-2 border rounded"
                  >
                    <option value="">Base Occupancy</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">
                    Room Max Occupancy
                  </label>
                  <input
                    type="text"
                    name="maxOcc"
                    value={categoryFormData.maxOcc}
                    onChange={handleCategoryInputChange}
                    className="w-full mt-1 p-2 border rounded"
                    placeholder="Max Occupancy"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">
                    Room Default Rate
                  </label>
                  <input
                    type="text"
                    name="defaultRate"
                    value={categoryFormData.defaultRate}
                    onChange={handleCategoryInputChange}
                    className="w-full mt-1 p-2 border rounded"
                    placeholder="Default Rate"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">
                    Extra Bed Allowed
                  </label>
                  <select
                    name="extraBed"
                    value={categoryFormData.extraBed}
                    onChange={handleCategoryInputChange}
                    className="w-full mt-1 p-2 border rounded"
                  >
                    <option value="">SELECT</option>
                    <option value="Yes">Yes</option>
                    <option value="NA">NA</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">Extra Bed Cost</label>
                  <input
                    type="text"
                    name="extraBedCost"
                    value={categoryFormData.extraBedCost}
                    onChange={handleCategoryInputChange}
                    className="w-full mt-1 p-2 border rounded"
                    placeholder="Extra Cost"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Select Child</label>
                  <select
                    name="child"
                    value={categoryFormData.child}
                    onChange={handleCategoryInputChange}
                    className="w-full mt-1 p-2 border rounded"
                  >
                    <option value="">SELECT</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">Child Cost</label>
                  <input
                    type="text"
                    name="childCost"
                    value={categoryFormData.childCost}
                    onChange={handleCategoryInputChange}
                    className="w-full mt-1 p-2 border rounded"
                    placeholder="Cost of Child"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Total Rooms</label>
                  <input
                    type="text"
                    name="totalRooms"
                    value={categoryFormData.totalRooms}
                    onChange={handleCategoryInputChange}
                    className="w-full mt-1 p-2 border rounded"
                    placeholder="No. of Rooms"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Status</label>
                  <select
                    name="status"
                    value={categoryFormData.status}
                    onChange={handleCategoryInputChange}
                    className="w-full mt-1 p-2 border rounded"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="col-span-3">
                  <label className="block text-gray-700">
                    Category Description
                  </label>
                  <textarea
                    name="description"
                    value={categoryFormData.description}
                    onChange={handleCategoryInputChange}
                    className="w-full mt-1 p-2 border rounded"
                    placeholder="Description"
                  ></textarea>
                </div>
                <div className="col-span-3 flex justify-end">
                  <button
                    type="submit"
                    className="bg-yellow-500 text-white px-6 py-2 rounded-lg shadow hover:bg-yellow-600 transition"
                  >
                    Add Category
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCategoryPopupOpen(false)}
                    className="ml-4 text-gray-600 hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Create Rate Plan Popup */}
        {isRatePlanPopupOpen && (
          <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Create a Rate Plan
              </h2>
              <form onSubmit={handleRatePlanSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Select Room Category
                  </label>
                  <select
                    name="selectedRoom"
                    value={ratePlanFormData.selectedRoom}
                    onChange={handleRatePlanInputChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Please Choose Room</option>
                    {roomCategories.map((room) => (
                      <option key={room.id} value={room.category}>
                        {room.category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Rate Plan Name
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        value="EP"
                        checked={ratePlanFormData.ratePlan.includes("EP")}
                        onChange={handleRatePlanCheckboxChange}
                        className="mr-2"
                      />
                      EP (Only Room)
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        value="CP"
                        checked={ratePlanFormData.ratePlan.includes("CP")}
                        onChange={handleRatePlanCheckboxChange}
                        className="mr-2"
                      />
                      CP (Breakfast + Room)
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        value="MAP"
                        checked={ratePlanFormData.ratePlan.includes("MAP")}
                        onChange={handleRatePlanCheckboxChange}
                        className="mr-2"
                      />
                      MAP (Breakfast, Lunch or Dinner + Room)
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        value="AP"
                        checked={ratePlanFormData.ratePlan.includes("AP")}
                        onChange={handleRatePlanCheckboxChange}
                        className="mr-2"
                      />
                      AP (All Meals + Room)
                    </label>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsRatePlanPopupOpen(false)}
                    className="cursor-pointer bg-gray-300 text-gray-800 px-4 py-2 rounded-lg mr-2 hover:bg-gray-400 transition"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Update Room Category Popup */}
        {isUpdatePopupOpen && selectedCategory && (
          <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Update Category
              </h2>
              <form
                onSubmit={handleUpdateSubmit}
                className="grid grid-cols-3 gap-4"
              >
                <div>
                  <label className="block text-gray-700">Room Name</label>
                  <input
                    type="text"
                    name="categoryName"
                    value={updateFormData.categoryName}
                    onChange={handleUpdateInputChange}
                    className="w-full mt-1 p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Base Occ</label>
                  <input
                    type="text"
                    name="baseOcc"
                    value={updateFormData.baseOcc}
                    onChange={handleUpdateInputChange}
                    className="w-full mt-1 p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Max Occ</label>
                  <input
                    type="text"
                    name="maxOcc"
                    value={updateFormData.maxOcc}
                    onChange={handleUpdateInputChange}
                    className="w-full mt-1 p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Default Rate</label>
                  <input
                    type="text"
                    name="defaultRate"
                    value={updateFormData.defaultRate}
                    onChange={handleUpdateInputChange}
                    className="w-full mt-1 p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">
                    No. of Extra Bed
                  </label>
                  <select
                    name="extraBed"
                    value={updateFormData.extraBed}
                    onChange={handleUpdateInputChange}
                    className="w-full mt-1 p-2 border rounded"
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">
                    Cost of Extra Bed
                  </label>
                  <input
                    type="text"
                    name="extraBedCost"
                    value={updateFormData.extraBedCost}
                    onChange={handleUpdateInputChange}
                    className="w-full mt-1 p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Child</label>
                  <select
                    name="child"
                    value={updateFormData.child}
                    onChange={handleUpdateInputChange}
                    className="w-full mt-1 p-2 border rounded"
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">Child Cost</label>
                  <input
                    type="text"
                    name="childCost"
                    value={updateFormData.childCost}
                    onChange={handleUpdateInputChange}
                    className="w-full mt-1 p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Category Type</label>
                  <select
                    name="categoryType"
                    value={updateFormData.categoryType}
                    onChange={handleUpdateInputChange}
                    className="w-full mt-1 p-2 border rounded"
                  >
                    <option value="Room">Room</option>
                    <option value="Suite">Suite</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">Priority</label>
                  <select
                    name="priority"
                    value={updateFormData.priority}
                    onChange={handleUpdateInputChange}
                    className="w-full mt-1 p-2 border rounded"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">Room Count</label>
                  <input
                    type="text"
                    name="totalRooms"
                    value={updateFormData.totalRooms}
                    onChange={handleUpdateInputChange}
                    className="w-full mt-1 p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Status</label>
                  <select
                    name="status"
                    value={updateFormData.status}
                    onChange={handleUpdateInputChange}
                    className="w-full mt-1 p-2 border rounded"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="col-span-3">
                  <label className="block text-gray-700">
                    Room Numbers (B Version)
                  </label>
                  <div className="grid grid-cols-5 gap-2 mt-1">
                    {selectedCategory.roomNumbers &&
                      selectedCategory.roomNumbers.map((roomNumber, index) => (
                        <span
                          key={index}
                          className="bg-gray-200 text-gray-800 px-2 py-1 rounded"
                        >
                          {roomNumber}
                        </span>
                      ))}
                  </div>
                </div>
                <div className="col-span-3">
                  <label className="block text-gray-700">
                    Category Description
                  </label>
                  <textarea
                    name="description"
                    value={updateFormData.description}
                    onChange={handleUpdateInputChange}
                    className="w-full mt-1 p-2 border rounded"
                  ></textarea>
                </div>
                <div className="col-span-3 flex justify-end">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 transition"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsUpdatePopupOpen(false)}
                    className="ml-4 text-gray-600 hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
