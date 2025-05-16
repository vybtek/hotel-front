"use client";
import { useMemo } from "react";

// Reusable components for better organization and maintainability
const StatCard = ({ title, value, gradientFrom, gradientTo, prefix = "" }) => (
  <div
    className={`bg-gradient-to-r from-${gradientFrom} to-${gradientTo} p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform`}
  >
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-3xl font-bold">
      {prefix}
      {value}
    </p>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    Confirmed: "bg-green-200 text-green-700",
    Pending: "bg-yellow-200 text-yellow-700",
    Cancelled: "bg-red-200 text-red-700",
    Completed: "bg-blue-200 text-blue-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${
        styles[status] || "bg-gray-200 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
};

const BookingsTable = ({ bookings }) => (
  <div className="bg-white p-6 rounded-2xl shadow-md">
    <h3 className="text-2xl font-bold mb-6">Today&apos;s Bookings</h3>
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-xs leading-normal">
            <th className="py-3 px-6 text-left">Booking ID</th>
            <th className="py-3 px-6 text-left">Source</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Check In</th>
            <th className="py-3 px-6 text-left">Check Out</th>
            <th className="py-3 px-6 text-left">Room Name</th>
            <th className="py-3 px-6 text-left">Status</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr
                key={booking.id}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="py-4 px-6">{booking.id}</td>
                <td className="py-4 px-6">{booking.source}</td>
                <td className="py-4 px-6">{booking.name}</td>
                <td className="py-4 px-6">{booking.checkIn}</td>
                <td className="py-4 px-6">{booking.checkOut}</td>
                <td className="py-4 px-6">{booking.room}</td>
                <td className="py-4 px-6">
                  <StatusBadge status={booking.status} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-10 text-gray-500">
                No bookings for today.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

// Stats configuration for easy maintenance
const statsConfig = [
  {
    title: "Today's Bookings",
    value: 0,
    gradientFrom: "teal-600",
    gradientTo: "teal-400",
  },
  {
    title: "Today's Check Out",
    value: 0,
    gradientFrom: "orange-600",
    gradientTo: "orange-400",
  },
  {
    title: "Today's Check In",
    value: 0,
    gradientFrom: "purple-600",
    gradientTo: "purple-400",
  },
  {
    title: "April Bookings",
    value: 7,
    gradientFrom: "red-600",
    gradientTo: "red-400",
  },
  {
    title: "April Earning",
    value: "782,718",
    gradientFrom: "green-600",
    gradientTo: "green-400",
    prefix: "₹",
  },
];

const Dashboard = () => {
  // Mock data for bookings - in a real app, this would come from an API or context
  const bookings = useMemo(
    () => [
      {
        id: "NBE123456789",
        source: "Booking.com",
        name: "Aarav Sharma",
        checkIn: "25-Apr-2025",
        checkOut: "27-Apr-2025",
        room: "Suite with Balcony",
        status: "Confirmed",
      },
      {
        id: "NBE987654321",
        source: "Expedia",
        name: "Priya Mehra",
        checkIn: "24-Apr-2025",
        checkOut: "26-Apr-2025",
        room: "Deluxe Room",
        status: "Pending",
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8 text-white">
        {statsConfig.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            gradientFrom={stat.gradientFrom}
            gradientTo={stat.gradientTo}
            prefix={stat.prefix}
          />
        ))}
      </div>

      {/* Bookings Table */}
      <BookingsTable bookings={bookings} />
    </div>
  );
};

export default Dashboard;
