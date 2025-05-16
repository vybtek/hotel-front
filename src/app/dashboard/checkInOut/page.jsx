"use client";
import { useState, useEffect, useMemo, useCallback } from "react";

// Utility to get current date in YYYY-MM-DD format
const getCurrentDate = () => {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(today.getDate()).padStart(2, "0")}`;
};

// Utility to format date for display
const formatDateForDisplay = (dateString) => {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Memoized table row component
const TableRow = ({ item }) => {
  const formattedTime = useMemo(
    () =>
      new Date(item.time).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    [item.time]
  );

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-3">{item.id}</td>
      <td className="p-3 font-medium">{item.name}</td>
      <td className="p-3">{formattedTime}</td>
      <td className="p-3">
        <span
          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
            item.type === "Check In"
              ? "bg-blue-100 text-blue-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {item.type}
        </span>
      </td>
    </tr>
  );
};

export default function CheckInOutReport() {
  // State management
  const [filter, setFilter] = useState("All");
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [displayedData, setDisplayedData] = useState([]);

  // Sample data
  const dummyData = useMemo(
    () => [
      {
        id: 1,
        name: "John Doe",
        time: "2025-04-25 09:00",
        type: "Check In",
        date: "2025-04-25",
      },
      {
        id: 2,
        name: "Jane Smith",
        time: "2025-04-25 09:05",
        type: "Check In",
        date: "2025-04-25",
      },
      {
        id: 3,
        name: "Bob Johnson",
        time: "2025-04-25 10:15",
        type: "Check In",
        date: "2025-04-25",
      },
      {
        id: 4,
        name: "John Doe",
        time: "2025-04-25 17:00",
        type: "Check Out",
        date: "2025-04-25",
      },
      {
        id: 5,
        name: "Jane Smith",
        time: "2025-04-25 17:05",
        type: "Check Out",
        date: "2025-04-25",
      },
      {
        id: 6,
        name: "Bob Johnson",
        time: "2025-04-25 18:30",
        type: "Check Out",
        date: "2025-04-25",
      },
      {
        id: 7,
        name: "Alice Brown",
        time: "2025-04-26 08:45",
        type: "Check In",
        date: "2025-04-26",
      },
      {
        id: 8,
        name: "Charlie Davis",
        time: "2025-04-26 09:20",
        type: "Check In",
        date: "2025-04-26",
      },
      {
        id: 9,
        name: "Alice Brown",
        time: "2025-04-26 16:50",
        type: "Check Out",
        date: "2025-04-26",
      },
      {
        id: 10,
        name: "Charlie Davis",
        time: "2025-04-26 17:15",
        type: "Check Out",
        date: "2025-04-26",
      },
      {
        id: 11,
        name: "Eva Wilson",
        time: "2025-05-02 08:30",
        type: "Check In",
        date: "2025-05-02",
      },
      {
        id: 12,
        name: "Frank Miller",
        time: "2025-05-02 09:10",
        type: "Check In",
        date: "2025-05-02",
      },
    ],
    []
  );

  // Memoized filtered data
  const { checkInData, checkOutData, filteredData } = useMemo(() => {
    const dataForSelectedDate = dummyData.filter(
      (item) => item.date === selectedDate
    );
    const checkIn = dataForSelectedDate.filter(
      (item) => item.type === "Check In"
    );
    const checkOut = dataForSelectedDate.filter(
      (item) => item.type === "Check Out"
    );

    let filtered;
    if (filter === "Check In") {
      filtered = checkIn;
    } else if (filter === "Check Out") {
      filtered = checkOut;
    } else {
      filtered = [...checkIn, ...checkOut].sort(
        (a, b) => new Date(a.time) - new Date(b.time)
      );
    }

    return {
      checkInData: checkIn,
      checkOutData: checkOut,
      filteredData: filtered,
    };
  }, [dummyData, selectedDate, filter]);

  // Update displayed data
  useEffect(() => {
    setDisplayedData(filteredData);
  }, [filteredData]);

  // Handle filter change
  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        Check In/Out Reports
      </h1>

      {/* Date selector */}
      <div className="mb-6">
        <label htmlFor="dateSelect" className="block mb-2 font-medium">
          Select Date:
        </label>
        <input
          type="date"
          id="dateSelect"
          className="p-2 border rounded w-full"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* Filter buttons */}
      <div className="flex justify-around mb-6">
        {["Check In", "Check Out", "All"].map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded transition-colors ${
              filter === type
                ? `bg-${
                    type === "Check In"
                      ? "blue"
                      : type === "Check Out"
                      ? "green"
                      : "purple"
                  }-500 text-white`
                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            }`}
            onClick={() => handleFilterChange(type)}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Summary box */}
      <div className="bg-blue-50 p-4 rounded mb-6 border border-blue-200">
        <h2 className="font-semibold mb-2">
          Summary for {formatDateForDisplay(selectedDate)}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-3 rounded shadow-sm">
            <p className="text-blue-700">
              <span className="font-bold">{checkInData.length}</span> Check-ins
            </p>
          </div>
          <div className="bg-white p-3 rounded shadow-sm">
            <p className="text-green-700">
              <span className="font-bold">{checkOutData.length}</span>{" "}
              Check-outs
            </p>
          </div>
          <div className="bg-white p-3 rounded shadow-sm">
            <p className="text-purple-700">
              <span className="font-bold">
                {checkInData.length - checkOutData.length}
              </span>{" "}
              Currently checked in
            </p>
          </div>
        </div>
      </div>

      {/* Empty state */}
      {displayedData.length === 0 && (
        <div className="bg-yellow-50 p-6 rounded text-center border border-yellow-200 mb-6">
          <p className="text-yellow-800 font-medium">
            No {filter !== "All" ? filter.toLowerCase() : ""} records available
            for {formatDateForDisplay(selectedDate)}
          </p>
        </div>
      )}

      {/* Report table */}
      {displayedData.length > 0 && (
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-lg font-bold mb-4">
            {filter === "All"
              ? "Complete Check In/Out Report"
              : `${filter} Report`}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 border-b font-medium">ID</th>
                  <th className="p-3 border-b font-medium">Name</th>
                  <th className="p-3 border-b font-medium">Time</th>
                  <th className="p-3 border-b font-medium">Type</th>
                </tr>
              </thead>
              <tbody>
                {displayedData.map((item) => (
                  <TableRow key={item.id} item={item} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
