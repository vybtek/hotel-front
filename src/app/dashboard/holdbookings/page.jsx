"use client";

import { useState } from "react";
import { useBookings } from "../../../context/BookingsContext/BookingContext";

export default function HoldBookings() {
  const { holdBookings, updateBookingStatus } = useBookings();
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 5;

  const handleStatusChange = (id, newStatus) => {
    updateBookingStatus(id, newStatus);
  };

  // Only show HOLD bookings
  const filteredBookings = holdBookings.filter(
    (booking) => booking.status === "HOLD"
  );

  // Calculate pagination
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );
  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Navigate to previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Navigate to next page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-2">
      {/* Container to limit width */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Hold Bookings</h1>

        {/* Display number of hold bookings */}
        <div className="mb-4">
          <p className="font-medium text-gray-700">
            Total Hold Bookings: {filteredBookings.length}
          </p>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th className="px-3 sm:px-4 py-3">Booking Id</th>
                  <th className="px-3 sm:px-4 py-3">Source</th>
                  <th className="px-3 sm:px-4 py-3">Date</th>
                  <th className="px-3 sm:px-4 py-3">Name</th>
                  <th className="px-3 sm:px-4 py-3">Check In</th>
                  <th className="px-3 sm:px-4 py-3">Check Out</th>
                  <th className="px-3 sm:px-4 py-3">Category</th>
                  <th className="px-3 sm:px-4 py-3">Total</th>
                  <th className="px-3 sm:px-4 py-3">Pay Type</th>
                  <th className="px-3 sm:px-4 py-3">Status</th>
                  <th className="px-3 sm:px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentBookings.length > 0 ? (
                  currentBookings.map((booking, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="px-3 sm:px-4 py-2">{booking.id}</td>
                      <td className="px-3 sm:px-4 py-2">{booking.source}</td>
                      <td className="px-3 sm:px-4 py-2">{booking.date}</td>
                      <td className="px-3 sm:px-4 py-2">{booking.name}</td>
                      <td className="px-3 sm:px-4 py-2">{booking.checkIn}</td>
                      <td className="px-3 sm:px-4 py-2">{booking.checkOut}</td>
                      <td className="px-3 sm:px-4 py-2">{booking.category}</td>
                      <td className="px-3 sm:px-4 py-2">{booking.total}</td>
                      <td className="px-3 sm:px-4 py-2">{booking.payType}</td>
                      <td className="px-3 sm:px-4 py-2">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-2">
                        <div className="flex space-x-2">
                          <button
                            onClick={() =>
                              handleStatusChange(booking.id, "CNF")
                            }
                            className="px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(booking.id, "CANC")
                            }
                            className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
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

          {/* Pagination Controls */}
          {filteredBookings.length > 0 && (
            <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">
                      {indexOfFirstBooking + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(indexOfLastBooking, filteredBookings.length)}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">
                      {filteredBookings.length}
                    </span>{" "}
                    results
                  </p>
                </div>
                <div>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === 1
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <span className="sr-only">Previous</span>
                      &larr;
                    </button>

                    {/* Page number buttons */}
                    {[...Array(totalPages).keys()].map((number) => (
                      <button
                        key={number + 1}
                        onClick={() => paginate(number + 1)}
                        className={`relative inline-flex items-center px-4 py-2 border ${
                          currentPage === number + 1
                            ? "bg-blue-50 border-blue-500 text-blue-600 z-10"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                        } text-sm font-medium`}
                      >
                        {number + 1}
                      </button>
                    ))}

                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === totalPages
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <span className="sr-only">Next</span>
                      &rarr;
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
