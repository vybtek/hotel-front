"use client";
import { useState, useMemo } from "react";

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
  ]);

  const [isCategoryPopupOpen, setIsCategoryPopupOpen] = useState(false);
  const [isRatePlanPopupOpen, setIsRatePlanPopupOpen] = useState(false);
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "priority",
    direction: "asc",
  });

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

  const [categoryErrors, setCategoryErrors] = useState({});
  const [updateErrors, setUpdateErrors] = useState({});

  const validateCategoryForm = (formData) => {
    const errors = {};
    if (!formData.categoryName.trim())
      errors.categoryName = "Category name is required";
    if (!formData.baseOcc) errors.baseOcc = "Base occupancy is required";
    if (!formData.maxOcc) errors.maxOcc = "Max occupancy is required";
    if (
      !formData.defaultRate ||
      isNaN(formData.defaultRate) ||
      formData.defaultRate <= 0
    )
      errors.defaultRate = "Valid default rate is required";
    if (
      !formData.totalRooms ||
      isNaN(formData.totalRooms) ||
      formData.totalRooms <= 0
    )
      errors.totalRooms = "Valid room count is required";
    return errors;
  };

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
    const errors = validateCategoryForm(categoryFormData);
    if (Object.keys(errors).length > 0) {
      setCategoryErrors(errors);
      return;
    }
    setRoomCategories([
      ...roomCategories,
      {
        id: roomCategories.length + 1,
        ...categoryFormData,
        roomNumbers: [],
        priority: roomCategories.length + 1,
        categoryType: "Room",
      },
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
    setCategoryErrors({});
  };

  const handleRatePlanSubmit = (e) => {
    e.preventDefault();
    if (
      !ratePlanFormData.selectedRoom ||
      ratePlanFormData.ratePlan.length === 0
    ) {
      alert("Please select a room category and at least one rate plan.");
      return;
    }
    setRooms([
      ...rooms,
      {
        id: rooms.length + 1,
        type: ratePlanFormData.selectedRoom,
        rateType: ratePlanFormData.ratePlan.join(", "),
        status: "Active",
      },
    ]);
    setIsRatePlanPopupOpen(false);
    setRatePlanFormData({
      selectedRoom: "",
      ratePlan: [],
    });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const errors = validateCategoryForm(updateFormData);
    if (Object.keys(errors).length > 0) {
      setUpdateErrors(errors);
      return;
    }
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
    setUpdateErrors({});
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
        if (sortConfig.key === "defaultRates") {
          return sortConfig.direction === "asc"
            ? a.defaultRates - b.defaultRates
            : b.defaultRates - a.defaultRates;
        } else if (sortConfig.key === "priority") {
          return sortConfig.direction === "asc"
            ? a.priority - b.priority
            : b.priority - a.priority;
        } else if (sortConfig.key === "category") {
          return sortConfig.direction === "asc"
            ? a.category.localeCompare(b.category)
            : b.category.localeCompare(a.category);
        }
        return 0;
      });
    }
    return sortableCategories;
  }, [roomCategories, sortConfig]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Added Room Categories Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Room Categories
            </h1>
            <button
              onClick={() => setIsCategoryPopupOpen(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
            >
              Create Room Category
            </button>
          </div>
          <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
            <div className="grid grid-cols-10 gap-4 p-4 bg-blue-50 font-semibold text-blue-900 sticky top-0">
              <div
                className="cursor-pointer hover:text-blue-600"
                onClick={() => handleSort("category")}
              >
                Category{" "}
                {sortConfig.key === "category" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </div>
              <div>Base Occ</div>
              <div>Max Occ</div>
              <div>E Beds</div>
              <div>Child</div>
              <div>Room Count</div>
              <div
                className="cursor-pointer hover:text-blue-600"
                onClick={() => handleSort("priority")}
              >
                Priority{" "}
                {sortConfig.key === "priority" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </div>
              <div
                className="cursor-pointer hover:text-blue-600"
                onClick={() => handleSort("defaultRates")}
              >
                Default Rates{" "}
                {sortConfig.key === "defaultRates" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </div>
              <div>Status</div>
              <div>Action</div>
            </div>
            {sortedCategories.map((room) => (
              <div
                key={room.id}
                className="grid grid-cols-10 gap-4 p-4 border-b border-gray-200 hover:bg-gray-100 transition duration-150"
              >
                <div className="text-gray-800 font-medium">{room.category}</div>
                <div className="text-gray-600">{room.baseOcc}</div>
                <div className="text-gray-600">{room.maxOcc}</div>
                <div className="text-gray-600">{room.extraBed}</div>
                <div className="text-gray-600">{room.child}</div>
                <div className="text-gray-600">{room.roomCount}</div>
                <div className="text-gray-600">{room.priority}</div>
                <div className="text-gray-600">
                  ₹{room.defaultRates.toLocaleString()}
                </div>
                <div>
                  <span
                    onClick={() => handleStatusToggle(room.id, "category")}
                    className={`px-3 py-1 rounded-full text-sm cursor-pointer transition duration-200 ${
                      room.status === "Active"
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-red-100 text-red-700 hover:bg-red-200"
                    }`}
                  >
                    {room.status}
                  </span>
                </div>
                <div>
                  <button
                    onClick={() => handleViewClick(room)}
                    className="text-blue-600 hover:text-blue-800 font-medium transition duration-150"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rooms & Rate Plans Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Rooms & Rate Plans
            </h1>
            <button
              onClick={() => setIsRatePlanPopupOpen(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
            >
              Create Rate Plan
            </button>
          </div>
          <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
            <div className="grid grid-cols-4 gap-4 p-4 bg-blue-50 font-semibold text-blue-900 sticky top-0">
              <div>Room Type</div>
              <div>Rate Type</div>
              <div>Status</div>
              <div>Action</div>
            </div>
            {rooms.map((room) => (
              <div
                key={room.id}
                className="grid grid-cols-4 gap-4 p-4 border-b border-gray-200 hover:bg-gray-100 transition duration-150"
              >
                <div className="text-gray-800 font-medium">{room.type}</div>
                <div className="text-gray-600">{room.rateType}</div>
                <div>
                  <span
                    onClick={() => handleStatusToggle(room.id, "room")}
                    className={`px-3 py-1 rounded-full text-sm cursor-pointer transition duration-200 ${
                      room.status === "Active"
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-red-100 text-red-700 hover:bg-red-200"
                    }`}
                  >
                    {room.status}
                  </span>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleDelete(room.id)}
                    className="text-red-600 hover:text-red-800 font-medium transition duration-150"
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                Create Room Category
              </h2>
              <form
                onSubmit={handleCategorySubmit}
                className="grid grid-cols-3 gap-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Room Category Name
                  </label>
                  <input
                    type="text"
                    name="categoryName"
                    value={categoryFormData.categoryName}
                    onChange={handleCategoryInputChange}
                    className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      categoryErrors.categoryName ? "border-red-500" : ""
                    }`}
                    placeholder="Room Category Name"
                  />
                  {categoryErrors.categoryName && (
                    <p className="text-red-500 text-sm mt-1">
                      {categoryErrors.categoryName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Base Occupancy
                  </label>
                  <select
                    name="baseOcc"
                    value={categoryFormData.baseOcc}
                    onChange={handleCategoryInputChange}
                    className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      categoryErrors.baseOcc ? "border-red-500" : ""
                    }`}
                  >
                    <option value="">Select Base Occupancy</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                  {categoryErrors.baseOcc && (
                    <p className="text-red-500 text-sm mt-1">
                      {categoryErrors.baseOcc}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Occupancy
                  </label>
                  <input
                    type="number"
                    name="maxOcc"
                    value={categoryFormData.maxOcc}
                    onChange={handleCategoryInputChange}
                    className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      categoryErrors.maxOcc ? "border-red-500" : ""
                    }`}
                    placeholder="Max Occupancy"
                  />
                  {categoryErrors.maxOcc && (
                    <p className="text-red-500 text-sm mt-1">
                      {categoryErrors.maxOcc}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Default Rate
                  </label>
                  <input
                    type="number"
                    name="defaultRate"
                    value={categoryFormData.defaultRate}
                    onChange={handleCategoryInputChange}
                    className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      categoryErrors.defaultRate ? "border-red-500" : ""
                    }`}
                    placeholder="Default Rate"
                  />
                  {categoryErrors.defaultRate && (
                    <p className="text-red-500 text-sm mt-1">
                      {categoryErrors.defaultRate}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Extra Bed Allowed
                  </label>
                  <select
                    name="extraBed"
                    value={categoryFormData.extraBed}
                    onChange={handleCategoryInputChange}
                    className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="NA">NA</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Extra Bed Cost
                  </label>
                  <input
                    type="number"
                    name="extraBedCost"
                    value={categoryFormData.extraBedCost}
                    onChange={handleCategoryInputChange}
                    className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Extra Bed Cost"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Child Allowed
                  </label>
                  <select
                    name="child"
                    value={categoryFormData.child}
                    onChange={handleCategoryInputChange}
                    className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Child Cost
                  </label>
                  <input
                    type="number"
                    name="childCost"
                    value={categoryFormData.childCost}
                    onChange={handleCategoryInputChange}
                    className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Child Cost"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Rooms
                  </label>
                  <input
                    type="number"
                    name="totalRooms"
                    value={categoryFormData.totalRooms}
                    onChange={handleCategoryInputChange}
                    className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      categoryErrors.totalRooms ? "border-red-500" : ""
                    }`}
                    placeholder="Total Rooms"
                  />
                  {categoryErrors.totalRooms && (
                    <p className="text-red-500 text-sm mt-1">
                      {categoryErrors.totalRooms}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={categoryFormData.status}
                    onChange={handleCategoryInputChange}
                    className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category Description
                  </label>
                  <textarea
                    name="description"
                    value={categoryFormData.description}
                    onChange={handleCategoryInputChange}
                    className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Category Description"
                    rows="4"
                  ></textarea>
                </div>
                <div className="col-span-3 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsCategoryPopupOpen(false)}
                    className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition duration-150"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
                  >
                    Add Category
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Create Rate Plan Popup */}
        {isRatePlanPopupOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                Create Rate Plan
              </h2>
              <form onSubmit={handleRatePlanSubmit}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Room Category
                  </label>
                  <select
                    name="selectedRoom"
                    value={ratePlanFormData.selectedRoom}
                    onChange={handleRatePlanInputChange}
                    className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Room Category</option>
                    {roomCategories.map((room) => (
                      <option key={room.id} value={room.category}>
                        {room.category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rate Plan
                  </label>
                  <div className="space-y-3">
                    {["EP", "CP", "MAP", "AP"].map((plan) => (
                      <label key={plan} className="flex items-center">
                        <input
                          type="checkbox"
                          value={plan}
                          checked={ratePlanFormData.ratePlan.includes(plan)}
                          onChange={handleRatePlanCheckboxChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-gray-700">
                          {plan === "EP" && "EP (Only Room)"}
                          {plan === "CP" && "CP (Breakfast + Room)"}
                          {plan === "MAP" &&
                            "MAP (Breakfast, Lunch or Dinner + Room)"}
                          {plan === "AP" && "AP (All Meals + Room)"}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsRatePlanPopupOpen(false)}
                    className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition duration-150"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
                  >
                    Save Rate Plan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Update Room Category Popup */}
        {isUpdatePopupOpen && selectedCategory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                Update Room Category
              </h2>
              <form
                onSubmit={handleUpdateSubmit}
                className="grid grid-cols-3 gap-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Room Category Name
                  </label>
                  <input
                    type="text"
                    name="categoryName"
                    value={updateFormData.categoryName}
                    onChange={handleUpdateInputChange}
                    className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      updateErrors.categoryName ? "border-red-500" : ""
                    }`}
                  />
                  {updateErrors.categoryName && (
                    <p className="text-red-500 text-sm mt-1">
                      {updateErrors.categoryName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Base Occupancy
                  </label>
                  <input
                    type="number"
                    name="baseOcc"
                    value={updateFormData.baseOcc}
                    onChange={handleUpdateInputChange}
                    className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      updateErrors.baseOcc ? "border-red-500" : ""
                    }`}
                  />
                  {updateErrors.baseOcc && (
                    <p className="text-red-500 text-sm mt-1">
                      {updateErrors.baseOcc}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Occupancy
                  </label>
                  <input
                    type="number"
                    name="maxOcc"
                    value={updateFormData.maxOcc}
                    onChange={handleUpdateInputChange}
                    className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      updateErrors.maxOcc ? "border-red-500" : ""
                    }`}
                  />
                  {updateErrors.maxOcc && (
                    <p className="text-red-500 text-sm mt-1">
                      {updateErrors.maxOcc}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Default Rate
                  </label>
                  <input
                    type="number"
                    name="defaultRate"
                    value={updateFormData.defaultRate}
                    onChange={handleUpdateInputChange}
                    className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      updateErrors.defaultRate ? "border-red-500" : ""
                    }`}
                  />
                  {updateErrors.defaultRate && (
                    <p className="text-red-500 text-sm mt-1">
                      {updateErrors.defaultRate}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Extra Bed
                  </label>
                  <select
                    name="extraBed"
                    value={updateFormData.extraBed}
                    onChange={handleUpdateInputChange}
                    className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Extra Bed Cost
                  </label>
                  <input
                    type="number"
                    name="extraBedCost"
                    value={updateFormData.extraBedCost}
                    onChange={handleUpdateInputChange}
                    className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Child Allowed
                  </label>
                  <select
                    name="child"
                    value={updateFormData.child}
                    onChange={handleUpdateInputChange}
                    className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Child Cost
                  </label>
                  <input
                    type="number"
                    name="childCost"
                    value={updateFormData.childCost}
                    onChange={handleUpdateInputChange}
                    className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category Type
                  </label>
                  <select
                    name="categoryType"
                    value={updateFormData.categoryType}
                    onChange={handleUpdateInputChange}
                    className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Room">Room</option>
                    <option value="Suite">Suite</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={updateFormData.priority}
                    onChange={handleUpdateInputChange}
                    className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Room Count
                  </label>
                  <input
                    type="number"
                    name="totalRooms"
                    value={updateFormData.totalRooms}
                    onChange={handleUpdateInputChange}
                    className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      updateErrors.totalRooms ? "border-red-500" : ""
                    }`}
                  />
                  {updateErrors.totalRooms && (
                    <p className="text-red-500 text-sm mt-1">
                      {updateErrors.totalRooms}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={updateFormData.status}
                    onChange={handleUpdateInputChange}
                    className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Room Numbers
                  </label>
                  <div className="grid grid-cols-5 gap-2 mt-1">
                    {selectedCategory.roomNumbers.map((roomNumber, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {roomNumber}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category Description
                  </label>
                  <textarea
                    name="description"
                    value={updateFormData.description}
                    onChange={handleUpdateInputChange}
                    className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                  ></textarea>
                </div>
                <div className="col-span-3 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsUpdatePopupOpen(false)}
                    className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition duration-150"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
                  >
                    Update Category
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
