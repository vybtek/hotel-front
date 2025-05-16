"use client";

import { useState, useMemo, useCallback } from "react";
import { useBookings } from "../../../context/BookingsContext/BookingContext";

// Custom debounce function
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export default function BookingReport() {
  const { confirmedBookings } = useBookings();
  const [currentPage, setCurrentPage] = useState(1);
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

  const bookingsPerPage = 5;

  // Debounced filter handler using custom debounce
  const debouncedHandleFilterChange = useCallback(
    debounce((name, value) => {
      setFilters((prev) => ({ ...prev, [name]: value }));
      setCurrentPage(1);
    }, 300),
    []
  );

  // Memoized filtered bookings
  const filteredBookings = useMemo(() => {
    return confirmedBookings
      .filter((booking) => booking.status === "CNF")
      .filter((booking) => {
        const lowerGuestName = filters.guestName.toLowerCase();
        return (
          (!filters.bookingDate ||
            booking.date.includes(filters.bookingDate)) &&
          (!filters.startDate || booking.checkIn.includes(filters.startDate)) &&
          (!filters.endDate || booking.checkOut.includes(filters.endDate)) &&
          (!filters.roomCategories ||
            booking.category.includes(filters.roomCategories)) &&
          (!filters.ratePlan || booking.payType.includes(filters.ratePlan)) &&
          (!filters.guestName ||
            booking.name.toLowerCase().includes(lowerGuestName)) &&
          (!filters.bookingStatus ||
            booking.status.includes(filters.bookingStatus)) &&
          (!filters.paymentType ||
            booking.payType.includes(filters.paymentType)) &&
          (!filters.users || booking.source.includes(filters.users)) &&
          (!filters.bookedChannels ||
            booking.roomAssigned.includes(filters.bookedChannels)) &&
          (!filters.invoiceNumber || booking.id.includes(filters.invoiceNumber))
        );
      });
  }, [confirmedBookings, filters]);

  // Memoized pagination calculations
  const {
    currentBookings,
    totalPages,
    indexOfFirstBooking,
    indexOfLastBooking,
  } = useMemo(() => {
    const indexOfLast = currentPage * bookingsPerPage;
    const indexOfFirst = indexOfLast - bookingsPerPage;
    const current = filteredBookings.slice(indexOfFirst, indexOfLast);
    const total = Math.ceil(filteredBookings.length / bookingsPerPage);

    return {
      currentBookings: current,
      totalPages: total,
      indexOfFirstBooking: indexOfFirst,
      indexOfLastBooking: indexOfLast,
    };
  }, [filteredBookings, currentPage]);

  // Pagination handler
  const paginate = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);

  // Filter input component
  const FilterInput = ({ name, placeholder }) => (
    <input
      name={name}
      value={filters[name]}
      onChange={(e) => debouncedHandleFilterChange(name, e.target.value)}
      placeholder={placeholder}
      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      aria-label={placeholder}
    />
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Confirmed Bookings
        </h1>

        {/* Filter Section */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <FilterInput name="bookingDate" placeholder="Booking Date" />
            <FilterInput name="startDate" placeholder="Check In" />
            <FilterInput name="endDate" placeholder="Check Out" />
            <FilterInput name="roomCategories" placeholder="Room Category" />
            <FilterInput name="ratePlan" placeholder="Rate Plan" />
            <FilterInput name="guestName" placeholder="Guest Name" />
            <FilterInput name="bookingStatus" placeholder="Booking Status" />
            <FilterInput name="paymentType" placeholder="Payment Type" />
            <FilterInput name="users" placeholder="Source" />
            <FilterInput name="bookedChannels" placeholder="Booked Channels" />
            <FilterInput name="invoiceNumber" placeholder="Invoice Number" />
            <button
              className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition col-span-full sm:col-span-1"
              aria-label="Search bookings"
            >
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
                  {[
                    "Booking Id",
                    "Source",
                    "Date",
                    "Name",
                    "Check In",
                    "Check Out",
                    "Category",
                    "Commission",
                    "Tax",
                    "Total",
                    "Pay Type",
                    "Room Assigned",
                    "Status",
                  ].map((header) => (
                    <th key={header} className="px-4 py-3">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentBookings.map((booking, index) => (
                  <tr
                    key={`${booking.id}-${index}`}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-2">{booking.id}</td>
                    <td className="px-4 py-2">{booking.source}</td>
                    <td className="px-4 py-2">{booking.date}</td>
                    <td className="px-4 py-2">{booking.name}</td>
                    <td className="px-4 py-2">{booking.checkIn}</td>
                    <td className="px-4 py-2">{booking.checkOut}</td>
                    <td className="px-4 py-2">{booking.category}</td>
                    <td className="px-4 py-2">{booking.commission}</td>
                    <td className="px-4 py-2">{booking.tax}</td>
                    <td className="px-4 py-2">{booking.total}</td>
                    <td className="px-4 py-2">{booking.payType}</td>
                    <td className="px-4 py-2">{booking.roomAssigned}</td>
                    <td className="px-4 py-2">
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
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
              aria-label="Previous page"
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
                  aria-label={`Page ${number}`}
                >
                  {number}
                </button>
              )
            )}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
              aria-label="Next page"
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
