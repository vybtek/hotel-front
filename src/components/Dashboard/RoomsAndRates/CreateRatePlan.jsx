import { useState } from "react";

export default function CreateRatePlanPopup({
  setIsRatePlanPopupOpen,
  roomCategories,
  setRooms,
  rooms,
}) {
  const [ratePlanFormData, setRatePlanFormData] = useState({
    selectedRoom: "",
    ratePlan: [],
  });

  const handleRatePlanInputChange = (e) => {
    const { name, value } = e.target;
    setRatePlanFormData({ ...ratePlanFormData, [name]: value });
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

  return (
    <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center z-50">
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
  );
}
