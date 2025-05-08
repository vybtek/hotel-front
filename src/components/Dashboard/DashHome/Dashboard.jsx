const Dashboard = () => {
  const bookings = [
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
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-8">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8 text-white">
        <div className="bg-gradient-to-r from-teal-600 to-teal-400 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
          <h3 className="text-lg font-semibold">Today&apos;s Bookings</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
        {/* <div className="bg-gradient-to-r from-pink-600 to-pink-400 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
          <h3 className="text-lg font-semibold">Today&apos;s Earning</h3>
          <p className="text-3xl font-bold">₹0</p>
        </div> */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-400 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
          <h3 className="text-lg font-semibold">Today&apos;s Check Out</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="bg-gradient-to-r from-purple-600 to-purple-400 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
          <h3 className="text-lg font-semibold">Today&apos;s Check In</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="bg-gradient-to-r from-red-600 to-red-400 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
          <h3 className="text-lg font-semibold">April Bookings</h3>
          <p className="text-3xl font-bold">7</p>
        </div>
        <div className="bg-gradient-to-r from-green-600 to-green-400 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
          <h3 className="text-lg font-semibold">April Earning</h3>
          <p className="text-3xl font-bold">₹782,718</p>
        </div>
      </div>

      {/* Bookings Table */}
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
              {bookings.map((booking, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="py-4 px-6">{booking.id}</td>
                  <td className="py-4 px-6">{booking.source}</td>
                  <td className="py-4 px-6">{booking.name}</td>
                  <td className="py-4 px-6">{booking.checkIn}</td>
                  <td className="py-4 px-6">{booking.checkOut}</td>
                  <td className="py-4 px-6">{booking.room}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        booking.status === "Confirmed"
                          ? "bg-green-200 text-green-700"
                          : "bg-yellow-200 text-yellow-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
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
    </div>
  );
};

export default Dashboard;
