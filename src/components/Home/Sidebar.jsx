export default function Sidebar({ selectedRooms, rooms, onCheckout }) {
  const calculateTotals = () => {
    let totalPrice = 0;
    let tax = 0;
    let allInclusive = 0;

    selectedRooms.forEach(({ id, qty }) => {
      const room = rooms.find((r) => r.id === id);
      if (room) {
        totalPrice += room.price * qty;
      }
    });

    tax = totalPrice * 0.18;
    allInclusive = totalPrice + tax;

    return { totalPrice, tax, allInclusive };
  };

  const { totalPrice, tax, allInclusive } = calculateTotals();

  if (!selectedRooms || selectedRooms.length === 0) {
    return (
      <div className="w-full lg:w-1/3 bg-white shadow-lg rounded-xl p-6 sticky top-24 h-fit">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Booking</h2>
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <p className="text-gray-500">No rooms selected yet</p>
          <p className="text-sm text-gray-400 mt-2">
            Select rooms to see booking details
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-1/3 bg-white rounded-md p-6 sticky top-24 h-fit border border-gray-300">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Booking</h2>
      <div className="bg-indigo-50 rounded-lg p-4">
        {/* List all selected rooms */}
        {selectedRooms.map(({ id, qty }) => {
          const room = rooms.find((r) => r.id === id);
          if (!room) return null;

          return (
            <div
              key={id}
              className="mb-4 pb-4 border-b border-gray-200 last:border-0 last:mb-0 last:pb-0"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-lg font-semibold text-indigo-900">
                    {room.name}
                  </p>
                  <p className="text-sm text-gray-600">Room Only</p>
                </div>
                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {qty} {qty > 1 ? "Rooms" : "Room"}
                </span>
              </div>
              <div className="mt-2 text-sm">
                <p className="flex justify-between">
                  <span className="text-gray-700">
                    {qty} x {room.name}
                  </span>
                  <span className="text-indigo-700">
                    ₹ {(room.price * qty).toLocaleString()}
                  </span>
                </p>
              </div>
            </div>
          );
        })}

        {/* Summary section */}
        <div className="mt-4 text-sm space-y-2">
          <p className="flex justify-between">
            <span className="text-gray-700">Subtotal</span>
            <span className="text-indigo-700">
              ₹ {totalPrice.toLocaleString()}
            </span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-700">GST/Taxes (18%)</span>
            <span className="text-indigo-700">₹ {tax.toLocaleString()}</span>
          </p>
          <div className="border-t border-gray-200 my-2"></div>
          <p className="flex justify-between font-semibold">
            <span className="text-gray-900">Total Price</span>
            <span className="text-indigo-900">
              ₹ {allInclusive.toLocaleString()}
            </span>
          </p>
        </div>
      </div>
      <button
        onClick={onCheckout}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg text-lg font-semibold mt-4 transition-colors shadow-md hover:shadow-lg"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
