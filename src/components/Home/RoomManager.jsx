import { useState, useCallback } from "react";
import { FaBed } from "react-icons/fa";
import RoomCard from "./RoomCard";
import Sidebar from "./Sidebar";
import { IoIosClose } from "react-icons/io";

export default function RoomManager({
  dates,
  rooms,
  setRooms,
  filters,
  setFilters,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]); // Changed to array for multiple selections

  const updateSidebar = useCallback(
    (roomId, qty) => {
      setSelectedRooms((prev) => {
        // Remove the room if it already exists
        const filtered = prev.filter((r) => r.id !== roomId);
        // Add it back with the new quantity if qty > 0
        return qty > 0 ? [...filtered, { id: roomId, qty }] : filtered;
      });
    },
    [setSelectedRooms]
  );

  const formatDate = (date) => {
    return date instanceof Date && !isNaN(date)
      ? date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "Select Date";
  };

  const calculateNights = () => {
    if (dates.length === 2) {
      const diffTime = Math.abs(dates[1] - dates[0]);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const nights = calculateNights();

  // Calculate totals for checkout modal
  const calculateTotals = () => {
    let roomTotal = 0;
    let tax = 0;
    let grandTotal = 0;

    selectedRooms.forEach(({ id, qty }) => {
      const room = rooms.find((r) => r.id === id);
      if (room) {
        roomTotal += room.price * qty;
      }
    });

    tax = roomTotal * 0.18;
    grandTotal = roomTotal + tax;

    return { roomTotal, tax, grandTotal };
  };

  const { roomTotal, tax, grandTotal } = calculateTotals();

  return (
    <>
      <div className="mt-8 flex items-center gap-4">
        <div className="bg-indigo-600 p-3 rounded-lg text-white">
          <FaBed className="text-xl" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Choose Your Room</h2>
      </div>

      <div className="mt-6 bg-white p-4 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Filter Rooms
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            className="border rounded-lg p-3 text-gray-800"
          >
            <option value="">Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="availability">Availability</option>
          </select>
          <div className="relative">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-500">
              Adults
            </label>
            <input
              type="number"
              placeholder="0"
              min="0"
              value={filters.adults || ""}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  adults: parseInt(e.target.value) || 0,
                })
              }
              className="w-full border rounded-lg p-3 text-gray-800"
            />
          </div>
          <div className="relative">
            <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-500">
              Children
            </label>
            <input
              type="number"
              placeholder="0"
              min="0"
              value={filters.children || ""}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  children: parseInt(e.target.value) || 0,
                })
              }
              className="w-full border rounded-lg p-3 text-gray-800"
            />
          </div>
          <button
            onClick={() => setFilters({ sort: "", adults: 0, children: 0 })}
            className="text-indigo-600 hover:text-indigo-800 font-medium border border-indigo-600 hover:border-indigo-800 rounded-lg p-3 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        <div className="w-full lg:w-2/3">
          {isLoading ? (
            <div className="flex flex-col gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 shadow-lg animate-pulse"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-2/5 h-64 bg-gray-200 rounded-lg"></div>
                    <div className="w-full md:w-3/5 space-y-4">
                      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      <div className="h-8 bg-gray-200 rounded w-1/4 mt-8"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : rooms.length > 0 ? (
            <div className="space-y-6">
              {rooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  selectedQty={
                    selectedRooms.find((r) => r.id === room.id)?.qty || 0
                  }
                  updateSidebar={updateSidebar}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 text-center shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No rooms match your criteria
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters or dates
              </p>
              <button
                onClick={() => setFilters({ sort: "", adults: 0, children: 0 })}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
        <Sidebar
          selectedRooms={selectedRooms}
          rooms={rooms}
          onCheckout={() => setShowCheckout(true)}
        />
      </div>

      {showCheckout && selectedRooms.length > 0 && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 md:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 md:mb-6  top-0 bg-white py-2">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Complete Your Booking
              </h2>
              <button
                onClick={() => setShowCheckout(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close modal"
              >
                <IoIosClose className="text-3xl md:text-5xl" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-4 md:space-y-6">
              {/* Your Stay Section */}
              <div>
                <h3 className="text-md md:text-lg font-semibold mb-2">
                  Your Stay
                </h3>
                <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                  {selectedRooms.map(({ id, qty }) => {
                    const room = rooms.find((r) => r.id === id);
                    return (
                      <div key={id} className="mb-3 last:mb-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-sm md:text-base">
                              {room.name} × {qty}
                            </p>
                            <p className="text-gray-600 text-xs md:text-sm">
                              {formatDate(dates[0])} - {formatDate(dates[1])} •{" "}
                              {nights} {nights === 1 ? "Night" : "Nights"}
                            </p>
                          </div>
                          <span className="text-sm md:text-base font-medium">
                            ₹ {(room.price * qty).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Guest Information section*/}
              <div>
                <h3 className="text-md md:text-lg font-semibold mb-2">
                  Guest Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-700 text-sm mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded-lg p-2 text-sm md:text-base focus:ring-2 focus:ring-indigo-500"
                      placeholder="First name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded-lg p-2 text-sm md:text-base focus:ring-2 focus:ring-indigo-500"
                      placeholder="Last name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full border rounded-lg p-2 text-sm md:text-base focus:ring-2 focus:ring-indigo-500"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="w-full border rounded-lg p-2 text-sm md:text-base focus:ring-2 focus:ring-indigo-500"
                      placeholder="Phone number"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div>
                <h3 className="text-md md:text-lg font-semibold mb-2">
                  Payment Summary
                </h3>
                <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                  <div className="space-y-2">
                    {selectedRooms.map(({ id, qty }) => {
                      const room = rooms.find((r) => r.id === id);
                      return (
                        <div
                          key={id}
                          className="flex justify-between text-sm md:text-base"
                        >
                          <span className="text-gray-700">
                            {room.name} × {qty}
                          </span>
                          <span className="font-medium">
                            ₹ {(room.price * qty).toLocaleString()}
                          </span>
                        </div>
                      );
                    })}

                    <div className="flex justify-between text-sm md:text-base">
                      <span className="text-gray-700">Taxes (18%)</span>
                      <span className="font-medium">
                        ₹ {tax.toLocaleString()}
                      </span>
                    </div>

                    <div className="border-t border-gray-300 my-2"></div>

                    <div className="flex justify-between text-base md:text-lg font-bold">
                      <span>Total Amount</span>
                      <span>₹ {grandTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 md:py-3 rounded-lg text-base md:text-lg font-semibold mt-2 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                onClick={() => {
                  // Handle booking confirmation
                }}
              >
                Confirm Booking & Pay Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
