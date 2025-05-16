import { useState, useEffect } from "react";

export default function UpdateCategoryPopup({
  setIsUpdatePopupOpen,
  selectedCategory,
  setRoomCategories,
}) {
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

  const [updateErrors, setUpdateErrors] = useState({});

  useEffect(() => {
    if (selectedCategory) {
      setUpdateFormData({
        categoryName: selectedCategory.category,
        baseOcc: selectedCategory.baseOcc,
        maxOcc: selectedCategory.maxOcc,
        extraBed: selectedCategory.extraBed,
        extraBedCost: "0",
        child: selectedCategory.child,
        childCost: "0",
        totalRooms: selectedCategory.roomCount,
        defaultRate: selectedCategory.defaultRates,
        description: selectedCategory.description || "",
        priority: selectedCategory.priority,
        categoryType: selectedCategory.categoryType || "Room",
        status: selectedCategory.status,
      });
    }
  }, [selectedCategory]);

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

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData({ ...updateFormData, [name]: value });
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
  };

  return (
    <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          Update Room Category
        </h2>
        <form onSubmit={handleUpdateSubmit} className="grid grid-cols-3 gap-6">
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
              <p className="text-red-500 text-sm mt-1">{updateErrors.maxOcc}</p>
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
  );
}
