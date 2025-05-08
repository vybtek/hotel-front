"use client";

import { useState } from "react";
import { useBookings } from "../../../context/BookingsContext/BookingContext";

export default function BookingReport() {
  const { confirmedBookings } = useBookings();
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 5;

  const [filters, setFilters] = useState({
    bookingDate: "",
    startDate: "",
    endDate: "",
    roomCategories: "",
    ratePlan: "",
    guestName: "",
    bookingStatus: "",
    paymentType: "",
    users: "",
    bookedChannels: "",
    invoiceNumber: "",
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Only show confirmed bookings
  const filteredBookings = confirmedBookings
    .filter((booking) => booking.status === "CNF")
    .filter(
      (booking) =>
        (!filters.bookingDate || booking.date.includes(filters.bookingDate)) &&
        (!filters.startDate || booking.checkIn.includes(filters.startDate)) &&
        (!filters.endDate || booking.checkOut.includes(filters.endDate)) &&
        (!filters.roomCategories ||
          booking.category.includes(filters.roomCategories)) &&
        (!filters.ratePlan || booking.payType.includes(filters.ratePlan)) &&
        (!filters.guestName ||
          booking.name
            .toLowerCase()
            .includes(filters.guestName.toLowerCase())) &&
        (!filters.bookingStatus ||
          booking.status.includes(filters.bookingStatus)) &&
        (!filters.paymentType ||
          booking.payType.includes(filters.paymentType)) &&
        (!filters.users || booking.source.includes(filters.users)) &&
        (!filters.bookedChannels ||
          booking.roomAssigned.includes(filters.bookedChannels)) &&
        (!filters.invoiceNumber || booking.id.includes(filters.invoiceNumber))
    );

  // Get current bookings
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

  return (
    <div className="min-h-screen bg-gray-100 p-2">
      {/* Container to limit width */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Confirmed Bookings
        </h1>

        {/* Filter Section */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.keys(filters).map((key) => (
              <input
                key={key}
                name={key}
                value={filters[key]}
                onChange={handleFilterChange}
                placeholder={key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            ))}
            <button className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition col-span-full sm:col-span-1">
              Search Bookings
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-4">
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
                  <th className="px-3 sm:px-4 py-3">Commission</th>
                  <th className="px-3 sm:px-4 py-3">Tax</th>
                  <th className="px-3 sm:px-4 py-3">Total</th>
                  <th className="px-3 sm:px-4 py-3">Pay Type</th>
                  <th className="px-3 sm:px-4 py-3">Room Assigned</th>
                  <th className="px-3 sm:px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {currentBookings.map((booking, index) => (
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
                    <td className="px-3 sm:px-4 py-2">{booking.commission}</td>
                    <td className="px-3 sm:px-4 py-2">{booking.tax}</td>
                    <td className="px-3 sm:px-4 py-2">{booking.total}</td>
                    <td className="px-3 sm:px-4 py-2">{booking.payType}</td>
                    <td className="px-3 sm:px-4 py-2">
                      {booking.roomAssigned}
                    </td>
                    <td className="px-3 sm:px-4 py-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {filteredBookings.length > bookingsPerPage && (
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === number ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  {number}
                </button>
              )
            )}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        {/* Showing entries info */}
        <div className="text-sm text-gray-600 mt-2">
          Showing {indexOfFirstBooking + 1} to{" "}
          {Math.min(indexOfLastBooking, filteredBookings.length)} of{" "}
          {filteredBookings.length} entries
        </div>
      </div>
    </div>
  );
}
