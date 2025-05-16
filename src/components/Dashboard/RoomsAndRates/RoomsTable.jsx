export default function RoomsTable({
  rooms,
  handleStatusToggle,
  handleDelete,
  setIsRatePlanPopupOpen,
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Rooms & Rate Plans</h1>
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
  );
}
