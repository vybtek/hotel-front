"use client";
import React, { useState } from "react";

const BookingAnalytics = () => {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [channel, setChannel] = useState("");
  const [activeReport, setActiveReport] = useState(null); // Track which report section is active

  // Dummy report data
  const dummyReports = [
    {
      id: 1,
      bookingDate: "2025-04-01",
      checkIn: "2025-04-05",
      checkOut: "2025-04-07",
      channel: "Online",
      roomsOccupied: 10,
      totalRooms: 50,
      revenue: 125000,
      roomsSold: 10,
    },
    {
      id: 2,
      bookingDate: "2025-04-02",
      checkIn: "2025-04-10",
      checkOut: "2025-04-12",
      channel: "Direct",
      roomsOccupied: 15,
      totalRooms: 50,
      revenue: 187500,
      roomsSold: 15,
    },
    {
      id: 3,
      bookingDate: "2025-03-25",
      checkIn: "2025-04-01",
      checkOut: "2025-04-03",
      channel: "Agent",
      roomsOccupied: 8,
      totalRooms: 50,
      revenue: 100000,
      roomsSold: 8,
    },
  ];

  const handleChannelChange = (e) => {
    setChannel(e.target.value);
  };

  // Filter reports based on check-in, check-out, booking date, and channel
  const filteredReports = dummyReports.filter((report) => {
    const bookingDateMatch = bookingDate
      ? report.bookingDate === bookingDate
      : true;
    const checkInMatch = checkInDate ? report.checkIn === checkInDate : true;
    const checkOutMatch = checkOutDate
      ? report.checkOut === checkOutDate
      : true;
    const channelMatch = channel ? report.channel === channel : true;

    return checkInMatch && checkOutMatch && bookingDateMatch && channelMatch;
  });

  // Calculate metrics
  const calculateOccupancy = (report) =>
    ((report.roomsOccupied / report.totalRooms) * 100).toFixed(2);
  const calculateADR = (report) =>
    (report.revenue / report.roomsSold).toFixed(2);
  const calculateRevPAR = (report) =>
    (report.revenue / report.totalRooms).toFixed(2);

  // Show reports based on active report type
  const showReport = (reportType) => {
    setActiveReport(activeReport === reportType ? null : reportType);
  };

  // Get reports based on active report type
  const getReportsByType = () => {
    if (!activeReport) return filteredReports;

    return filteredReports.map((report) => {
      switch (activeReport) {
        case "occupancy":
          return {
            ...report,
            displayValue: `${calculateOccupancy(report)}%`,
            metricName: "Occupancy %",
          };
        case "revenue":
          return {
            ...report,
            displayValue: `₹${report.revenue.toLocaleString()}`,
            metricName: "Revenue",
          };
        case "adr":
          return {
            ...report,
            displayValue: `₹${calculateADR(report)}`,
            metricName: "ADR",
          };
        case "revpar":
          return {
            ...report,
            displayValue: `₹${calculateRevPAR(report)}`,
            metricName: "RevPAR",
          };
        default:
          return report;
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800">
            BOOKING REPORTS PER DAY
          </h2>

          {/* Selectors and Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div>
              <label className="block text-gray-600 mb-1">
                Select Channels
              </label>
              <select
                className="w-full border border-gray-300 rounded-md p-2"
                value={channel}
                onChange={handleChannelChange}
              >
                <option value="">All Channels</option>
                <option value="Online">Online</option>
                <option value="Direct">Direct</option>
                <option value="Agent">Agent</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Booking Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md p-2"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
              />
            </div>
            <div className="flex gap-2 items-end">
              <button className="bg-sky-400 hover:bg-sky-500 text-white rounded-md px-4 py-2">
                Total Bookings
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-gray-600 mb-1">Check-In Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md p-2"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Check-Out Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md p-2"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Reports Table - Only shown when a specific report is selected */}
        {activeReport && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {activeReport === "occupancy" && "Occupancy Reports"}
              {activeReport === "revenue" && "Revenue Reports"}
              {activeReport === "adr" && "ADR Reports"}
              {activeReport === "revpar" && "RevPAR Reports"}
            </h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-teal-600 text-white">
                  <th className="p-2 text-left">Booking Date</th>
                  <th className="p-2 text-left">Check-In</th>
                  <th className="p-2 text-left">Check-Out</th>
                  <th className="p-2 text-left">Channel</th>
                  <th className="p-2 text-left">
                    {activeReport === "occupancy" && "Occupancy %"}
                    {activeReport === "revenue" && "Revenue"}
                    {activeReport === "adr" && "ADR"}
                    {activeReport === "revpar" && "RevPAR"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {getReportsByType().length > 0 ? (
                  getReportsByType().map((report) => (
                    <tr key={report.id} className="border-b">
                      <td className="p-2">{report.bookingDate}</td>
                      <td className="p-2">{report.checkIn}</td>
                      <td className="p-2">{report.checkOut}</td>
                      <td className="p-2">{report.channel}</td>
                      <td className="p-2">{report.displayValue}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-2 text-center text-gray-600">
                      No reports found for the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Section: Occupancy Percentage */}
        <div className="bg-teal-700 text-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-teal-600 font-semibold">
            A. OCCUPANCY PERCENTAGE
          </div>
          <div className="px-6 py-6 bg-teal-600 space-y-6">
            <p>
              Occupancy is the key parameter to measure your hotel's
              performance. It can be calculated as:
            </p>
            <div className="text-center space-y-2">
              <p>Occupancy % =</p>
              <p>
                <span className="font-bold">Number of Occupied Room</span> ÷{" "}
                <span className="font-bold">
                  Total Number of available room
                </span>{" "}
                × 100
              </p>
            </div>
            <button
              className="bg-sky-400 hover:bg-sky-500 text-white rounded-md px-6 py-2 cursor-pointer"
              onClick={() => showReport("occupancy")}
            >
              {activeReport === "occupancy"
                ? "Hide Occupancy Report"
                : "Get Occupancy Report"}
            </button>
          </div>
        </div>

        {/* Section: Total Revenue */}
        <div className="bg-teal-700 text-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-teal-600 font-semibold">
            B. TOTAL REVENUE
          </div>
          <div className="px-6 py-6 bg-teal-600 flex justify-start">
            <button
              className="bg-sky-400 hover:bg-sky-500 text-white rounded-md px-6 py-2 cursor-pointer"
              onClick={() => showReport("revenue")}
            >
              {activeReport === "revenue"
                ? "Hide Revenue Report"
                : "Get Revenue Report"}
            </button>
          </div>
        </div>

        {/* Section: ADR */}
        <div className="bg-teal-700 text-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-teal-600 font-semibold">
            C. AVERAGE DAILY RATE (ADR)
          </div>
          <div className="px-6 py-6 bg-teal-600 space-y-6">
            <p>
              ADR is a metric that measures the average revenue earned from the
              occupied rooms on a day. It can be calculated as:
            </p>
            <div className="text-center space-y-2">
              <p>ADR =</p>
              <p>
                <span className="font-bold">Revenue Earned from rooms</span> ÷{" "}
                <span className="font-bold">Number of rooms sold</span>
              </p>
            </div>
            <div className="text-sm text-gray-200 space-y-2">
              <p>(*ADR does not count:)</p>
              <ul className="list-disc list-inside">
                <li>Vacant Rooms, Complimentary Rooms, hotel use rooms.</li>
                <li>'No shows' and forfeited deposit rooms.</li>
                <li>Cancelled booking and charges levied for the same.</li>
              </ul>
            </div>
            <button
              className="bg-sky-400 hover:bg-sky-500 text-white rounded-md px-6 py-2 cursor-pointer"
              onClick={() => showReport("adr")}
            >
              {activeReport === "adr" ? "Hide ADR Report" : "Get ADR Report"}
            </button>
          </div>
        </div>

        {/* Section: RevPAR */}
        <div className="bg-teal-700 text-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-teal-600 font-semibold">
            D. REVENUE PER AVAILABLE ROOM (REVPAR)
          </div>
          <div className="px-6 py-6 bg-teal-600 space-y-6">
            <p>
              RevPAR is a measurement of a hotel's average daily rates and its
              ability to fill its rooms. There are two basic formulas to
              calculate RevPAR:
            </p>
            <div className="text-center space-y-2">
              <p>RevPAR =</p>
              <p>
                <span className="font-bold">Room's Revenue</span> ÷{" "}
                <span className="font-bold">Number of available rooms</span>
              </p>
            </div>
            <button
              className="bg-sky-400 hover:bg-sky-500 text-white rounded-md px-6 py-2 cursor-pointer"
              onClick={() => showReport("revpar")}
            >
              {activeReport === "revpar"
                ? "Hide RevPAR Report"
                : "Get RevPAR Report"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingAnalytics;
