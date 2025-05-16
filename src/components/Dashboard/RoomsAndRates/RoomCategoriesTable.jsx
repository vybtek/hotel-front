export default function RoomCategoriesTable({
  sortedCategories,
  sortConfig,
  handleSort,
  handleStatusToggle,
  handleViewClick,
  setIsCategoryPopupOpen,
}) {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Room Categories</h1>
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
              ₹{room.defaultRates ? room.defaultRates.toLocaleString() : "N/A"}
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
  );
}
