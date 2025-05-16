import { useState } from "react";

export default function CreateCategoryPopup({
  setIsCategoryPopupOpen,
  setRoomCategories,
  roomCategories,
}) {
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

  const [categoryErrors, setCategoryErrors] = useState({});

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

  const handleCategoryInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryFormData({ ...categoryFormData, [name]: value });
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

  return (
    <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center z-50">
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
  );
}
