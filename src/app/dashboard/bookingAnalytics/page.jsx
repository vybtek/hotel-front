"use client";
import React, { useState, useMemo, useCallback } from "react";

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

// Reusable Input Component
const DateInput = ({ label, value, onChange }) => (
  <div>
    <label className="block text-gray-600 mb-1 text-sm font-medium">
      {label}
    </label>
    <input
      type="date"
      className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
      value={value}
      onChange={onChange}
    />
  </div>
);

// Reusable Select Component
const ChannelSelect = ({ value, onChange }) => (
  <div>
    <label className="block text-gray-600 mb-1 text-sm font-medium">
      Select Channels
    </label>
    <select
      className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
      value={value}
      onChange={onChange}
    >
      <option value="">All Channels</option>
      <option value="Online">Online</option>
      <option value="Direct">Direct</option>
      <option value="Agent">Agent</option>
    </select>
  </div>
);

// Reusable Report Section Component
const ReportSection = ({
  title,
  description,
  formula,
  buttonText,
  onClick,
  isActive,
  notes,
}) => (
  <div className="bg-teal-700 text-white rounded-lg shadow-md">
    <div className="px-6 py-4 border-b border-teal-600 font-semibold text-lg">
      {title}
    </div>
    <div className="px-6 py-6 bg-teal-600 space-y-6">
      <p className="text-sm">{description}</p>
      {formula && (
        <div className="text-center space-y-2">
          <p>{formula.title}</p>
          <p className="text-sm">{formula.equation}</p>
        </div>
      )}
      {notes && (
        <div className="text-sm text-gray-200 space-y-2">
          {notes.map((note, index) => (
            <p key={index} className="list-disc list-inside">
              {note}
            </p>
          ))}
        </div>
      )}
      <button
        className="bg-sky-400 hover:bg-sky-500 text-white rounded-md px-6 py-2 text-sm font-medium transition-colors duration-200"
        onClick={onClick}
      >
        {isActive ? `Hide ${buttonText}` : `Get ${buttonText}`}
      </button>
    </div>
  </div>
);

// Main Component
const BookingAnalytics = () => {
  const [filters, setFilters] = useState({
    checkInDate: "",
    checkOutDate: "",
    bookingDate: "",
    channel: "",
  });
  const [activeReport, setActiveReport] = useState(null);

  // Debounce function to limit rapid state updates
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // Memoized input handler
  const handleFilterChange = useCallback(
    debounce((key, value) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    }, 300),
    []
  );

  // Memoized filtered reports
  const filteredReports = useMemo(() => {
    return dummyReports.filter((report) => {
      const { checkInDate, checkOutDate, bookingDate, channel } = filters;
      return (
        (!bookingDate || report.bookingDate === bookingDate) &&
        (!checkInDate || report.checkIn === checkInDate) &&
        (!checkOutDate || report.checkOut === checkOutDate) &&
        (!channel || report.channel === channel)
      );
    });
  }, [filters]);

  // Memoized metric calculations
  const calculateMetrics = useCallback(
    (report) => ({
      occupancy: ((report.roomsOccupied / report.totalRooms) * 100).toFixed(2),
      adr: (report.revenue / report.roomsSold).toFixed(2),
      revpar: (report.revenue / report.totalRooms).toFixed(2),
    }),
    []
  );

  // Memoized report data transformation
  const reports = useMemo(() => {
    if (!activeReport) return filteredReports;

    return filteredReports.map((report) => {
      const metrics = calculateMetrics(report);
      switch (activeReport) {
        case "occupancy":
          return {
            ...report,
            displayValue: `${metrics.occupancy}%`,
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
            displayValue: `₹${metrics.adr}`,
            metricName: "ADR",
          };
        case "revpar":
          return {
            ...report,
            displayValue: `₹${metrics.revpar}`,
            metricName: "RevPAR",
          };
        default:
          return report;
      }
    });
  }, [activeReport, filteredReports, calculateMetrics]);

  // Toggle report visibility
  const toggleReport = useCallback((reportType) => {
    setActiveReport((prev) => (prev === reportType ? null : reportType));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Filter Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Booking Reports Per Day
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ChannelSelect
              value={filters.channel}
              onChange={(e) => handleFilterChange("channel", e.target.value)}
            />
            <DateInput
              label="Booking Date"
              value={filters.bookingDate}
              onChange={(e) =>
                handleFilterChange("bookingDate", e.target.value)
              }
            />
            <div className="flex items-end">
              <button className="bg-sky-400 hover:bg-sky-500 text-white rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200">
                Total Bookings
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <DateInput
              label="Check-In Date"
              value={filters.checkInDate}
              onChange={(e) =>
                handleFilterChange("checkInDate", e.target.value)
              }
            />
            <DateInput
              label="Check-Out Date"
              value={filters.checkOutDate}
              onChange={(e) =>
                handleFilterChange("checkOutDate", e.target.value)
              }
            />
          </div>
        </div>

        {/* Reports Table */}
        {activeReport && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 capitalize">
              {activeReport} Reports
            </h3>
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-teal-600 text-white">
                  <th className="p-2 text-left">Booking Date</th>
                  <th className="p-2 text-left">Check-In</th>
                  <th className="p-2 text-left">Check-Out</th>
                  <th className="p-2 text-left">Channel</th>
                  <th className="p-2 text-left">{reports[0]?.metricName}</th>
                </tr>
              </thead>
              <tbody>
                {reports.length > 0 ? (
                  reports.map((report) => (
                    <tr key={report.id} className="border-b hover:bg-gray-50">
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

        {/* Report Sections */}
        <ReportSection
          title="A. Occupancy Percentage"
          description="Occupancy is the key parameter to measure your hotel's performance."
          formula={{
            title: "Occupancy % =",
            equation:
              "Number of Occupied Room ÷ Total Number of available room × 100",
          }}
          buttonText="Occupancy Report"
          onClick={() => toggleReport("occupancy")}
          isActive={activeReport === "occupancy"}
        />

        <ReportSection
          title="B. Total Revenue"
          description="Total revenue generated from room bookings."
          buttonText="Revenue Report"
          onClick={() => toggleReport("revenue")}
          isActive={activeReport === "revenue"}
        />

        <ReportSection
          title="C. Average Daily Rate (ADR)"
          description="ADR is a metric that measures the average revenue earned from the occupied rooms on a day."
          formula={{
            title: "ADR =",
            equation: "Revenue Earned from rooms ÷ Number of rooms sold",
          }}
          notes={[
            "*ADR does not count:",
            "Vacant Rooms, Complimentary Rooms, hotel use rooms.",
            "'No shows' and forfeited deposit rooms.",
            "Cancelled booking and charges levied for the same.",
          ]}
          buttonText="ADR Report"
          onClick={() => toggleReport("adr")}
          isActive={activeReport === "adr"}
        />

        <ReportSection
          title="D. Revenue Per Available Room (RevPAR)"
          description="RevPAR is a measurement of a hotel's average daily rates and its ability to fill its rooms."
          formula={{
            title: "RevPAR =",
            equation: "Room's Revenue ÷ Number of available rooms",
          }}
          buttonText="RevPAR Report"
          onClick={() => toggleReport("revpar")}
          isActive={activeReport === "revpar"}
        />
      </div>
    </div>
  );
};

export default BookingAnalytics;
