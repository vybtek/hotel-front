"use client";

import { useState, useCallback, memo } from "react";
import { useBookings } from "../../../context/BookingsContext/BookingContext";

const BookingRow = memo(({ booking, onStatusChange }) => (
  <tr className="border-b hover:bg-gray-50">
    <td className="p-3">{booking.id}</td>
    <td className="p-3">{booking.source}</td>
    <td className="p-3">{booking.date}</td>
    <td className="p-3">{booking.name}</td>
    <td className="p-3">{booking.checkIn}</td>
    <td className="p-3">{booking.checkOut}</td>
    <td className="p-3">{booking.category}</td>
    <td className="p-3">{booking.total}</td>
    <td className="p-3">{booking.payType}</td>
    <td className="p-3">
      <span className="inline-flex px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
        {booking.status}
      </span>
    </td>
    <td className="p-3">
      <div className="flex gap-2">
        <button
          onClick={() => onStatusChange(booking.id, "CNF")}
          className="px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          aria-label={`Confirm booking ${booking.id}`}
        >
          Confirm
        </button>
        <button
          onClick={() => onStatusChange(booking.id, "CANC")}
          className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label={`Cancel booking ${booking.id}`}
        >
          Cancel
        </button>
      </div>
    </td>
  </tr>
));

export default function HoldBookings() {
  const { holdBookings, updateBookingStatus } = useBookings();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const bookingsPerPage = 5;

  const handleStatusChange = useCallback(
    async (id, newStatus) => {
      setIsLoading(true);
      try {
        await updateBookingStatus(id, newStatus);
      } finally {
        setIsLoading(false);
      }
    },
    [updateBookingStatus]
  );

  const filteredBookings = holdBookings.filter(
    (booking) => booking.status === "HOLD"
  );

  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);
  const currentBookings = filteredBookings.slice(
    (currentPage - 1) * bookingsPerPage,
    currentPage * bookingsPerPage
  );

  const paginate = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);

  const goToPreviousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Hold Bookings</h1>

        <div className="mb-4">
          <p className="font-medium text-gray-700">
            Total Hold Bookings: {filteredBookings.length}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th className="p-2">Booking Id</th>
                  <th className="p-2">Source</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Check In</th>
                  <th className="p-2">Check Out</th>
                  <th className="p-2">Category</th>
                  <th className="p-2">Total</th>
                  <th className="p-2">Pay Type</th>
                  <th className="p-2">Status</th>
                  <th className="p-2 pl-8">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="11" className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : currentBookings.length > 0 ? (
                  currentBookings.map((booking) => (
                    <BookingRow
                      key={booking.id}
                      booking={booking}
                      onStatusChange={handleStatusChange}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" className="text-center py-4">
                      No hold bookings found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {filteredBookings.length > 0 && (
            <div className="p-4 flex items-center justify-between border-t border-gray-200">
              <div className="flex items-center gap-2 sm:gap-4">
                <p className="text-sm text-gray-700">
                  Showing {Math.max((currentPage - 1) * bookingsPerPage + 1, 1)}{" "}
                  to{" "}
                  {Math.min(
                    currentPage * bookingsPerPage,
                    filteredBookings.length
                  )}{" "}
                  of {filteredBookings.length} results
                </p>
              </div>

              <nav className="flex items-center gap-1" aria-label="Pagination">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="px-2 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  aria-label="Previous page"
                >
                  ←
                </button>

                {[...Array(totalPages).keys()].map((number) => (
                  <button
                    key={number + 1}
                    onClick={() => paginate(number + 1)}
                    className={`px-3 py-1 rounded border ${
                      currentPage === number + 1
                        ? "bg-blue-50 border-blue-500 text-blue-600"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                    aria-current={
                      currentPage === number + 1 ? "page" : undefined
                    }
                  >
                    {number + 1}
                  </button>
                ))}

                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="px-2 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  aria-label="Next page"
                >
                  →
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
