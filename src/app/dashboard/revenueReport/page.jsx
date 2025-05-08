"use client";
import { useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function RevenueDashboard() {
  // Initial data for multiple reports
  const initialData = {
    labels: [
      "Apr 2024",
      "May 2024",
      "Jun 2024",
      "Jul 2024",
      "Aug 2024",
      "Sep 2024",
      "Oct 2024",
      "Nov 2024",
      "Dec 2024",
      "Jan 2025",
      "Feb 2025",
      "Mar 2025",
      "Apr 2025",
    ],
    revenue: [
      500000, 600000, 750000, 800000, 900000, 850000, 950000, 1000000, 1100000,
      1200000, 1150000, 1250000, 1300000,
    ],
    expenses: [
      300000, 350000, 400000, 420000, 450000, 430000, 440000, 500000, 550000,
      580000, 540000, 600000, 620000,
    ],
    profit: [
      200000, 250000, 350000, 380000, 450000, 420000, 510000, 500000, 550000,
      620000, 610000, 650000, 680000,
    ],
    salesByRegion: {
      North: [
        120000, 150000, 180000, 200000, 220000, 210000, 230000, 250000, 270000,
        290000, 280000, 310000, 320000,
      ],
      South: [
        150000, 170000, 200000, 210000, 230000, 220000, 240000, 260000, 280000,
        300000, 290000, 320000, 330000,
      ],
      East: [
        110000, 130000, 160000, 180000, 200000, 190000, 210000, 230000, 250000,
        270000, 260000, 290000, 310000,
      ],
      West: [
        120000, 150000, 210000, 210000, 250000, 230000, 270000, 260000, 300000,
        340000, 320000, 330000, 340000,
      ],
    },
    productCategories: {
      labels: [
        "Deluxe Room",
        "Deluxe Room with King bed",
        "Deluxe Room with twin bed",
        "Premium Suite",
        "Other",
      ],
      data: [45, 25, 15, 10, 5],
    },
  };

  // State for filtered data and search criteria
  const [filteredData, setFilteredData] = useState(initialData);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activeReport, setActiveReport] = useState("revenue");

  // Function to filter data by date range
  const filterData = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Convert labels to Date objects for comparison
    const filteredIndices = initialData.labels
      .map((label, index) => {
        const labelDate = new Date(label);
        return labelDate >= start && labelDate <= end ? index : -1;
      })
      .filter((index) => index !== -1);

    if (filteredIndices.length === 0) {
      alert("No data found in the selected date range");
      return;
    }

    // Filter all data based on the filtered indices
    const newFilteredData = {
      labels: filteredIndices.map((i) => initialData.labels[i]),
      revenue: filteredIndices.map((i) => initialData.revenue[i]),
      expenses: filteredIndices.map((i) => initialData.expenses[i]),
      profit: filteredIndices.map((i) => initialData.profit[i]),
      salesByRegion: {
        North: filteredIndices.map((i) => initialData.salesByRegion.North[i]),
        South: filteredIndices.map((i) => initialData.salesByRegion.South[i]),
        East: filteredIndices.map((i) => initialData.salesByRegion.East[i]),
        West: filteredIndices.map((i) => initialData.salesByRegion.West[i]),
      },
      productCategories: initialData.productCategories,
    };

    setFilteredData(newFilteredData);
  };

  const resetFilters = () => {
    setStartDate("");
    setEndDate("");
    setFilteredData(initialData);
  };

  // Chart options
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Revenue, Expenses & Profit",
      },
    },
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Sales by Season",
      },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Sales by Room Category",
      },
    },
  };

  // Chart data configurations
  const barChartData = {
    labels: filteredData.labels,
    datasets: [
      {
        label: "Revenue",
        data: filteredData.revenue,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Expenses",
        data: filteredData.expenses,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
      {
        label: "Profit",
        data: filteredData.profit,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  const lineChartData = {
    labels: filteredData.labels,
    datasets: [
      {
        label: "Summer",
        data: filteredData.salesByRegion.North,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Winter",
        data: filteredData.salesByRegion.South,
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
      {
        label: "Monsoon",
        data: filteredData.salesByRegion.East,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  const pieChartData = {
    labels: filteredData.productCategories.labels,
    datasets: [
      {
        data: filteredData.productCategories.data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 159, 64, 0.7)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Calculate summary metrics
  const calculateTotalRevenue = () => {
    return filteredData.revenue.reduce((sum, val) => sum + val, 0);
  };

  const calculateTotalProfit = () => {
    return filteredData.profit.reduce((sum, val) => sum + val, 0);
  };

  const calculateAverageProfit = () => {
    return filteredData.profit.length > 0
      ? filteredData.profit.reduce((sum, val) => sum + val, 0) /
          filteredData.profit.length
      : 0;
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800">Revenue Reports</h1>
      {/* Search Criteria */}
      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Filter Reports</h2>
        <div className="grid md:grid-cols-5 gap-4">
          <div className="space-y-1">
            <label className="text-sm text-gray-600">Start Date</label>
            <input
              type="date"
              className="rounded-md border border-gray-300 shadow-sm w-full p-2"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-gray-600">End Date</label>
            <input
              type="date"
              className="rounded-md border border-gray-300 shadow-sm w-full p-2"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-gray-600">Report Type</label>
            <select
              className="rounded-md border border-gray-300 shadow-sm w-full p-2"
              value={activeReport}
              onChange={(e) => setActiveReport(e.target.value)}
            >
              <option value="revenue">Revenue Overview</option>
              <option value="regional">Seasonal Sales</option>
              <option value="product">Room Categories</option>
            </select>
          </div>
          <button
            onClick={filterData}
            className="bg-pink-500 text-white rounded-md p-2 hover:bg-pink-600 self-end"
          >
            Apply Filters
          </button>
          <button
            onClick={resetFilters}
            className="bg-gray-300 text-gray-700 rounded-md p-2 hover:bg-gray-400 self-end"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Total Revenue
          </h3>
          <p className="text-3xl font-bold text-pink-500">
            ${calculateTotalRevenue().toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            For period: {filteredData.labels[0]} -{" "}
            {filteredData.labels[filteredData.labels.length - 1]}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Total Profit
          </h3>
          <p className="text-3xl font-bold text-emerald-500">
            ${calculateTotalProfit().toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Net earnings after expenses
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Average Monthly Profit
          </h3>
          <p className="text-3xl font-bold text-blue-500">
            ${Math.round(calculateAverageProfit()).toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Monthly average for selected period
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        {activeReport === "revenue" && (
          <>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Revenue Overview
            </h2>
            <div className="h-96">
              <Bar options={barOptions} data={barChartData} />
            </div>
          </>
        )}

        {/* line chart  */}
        {activeReport === "regional" && (
          <>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Seasonal Sales Performance
            </h2>
            <div className="h-96">
              <Line options={lineOptions} data={lineChartData} />
            </div>
          </>
        )}

        {/* pie chart */}
        {activeReport === "product" && (
          <>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Sales by Room Category
            </h2>
            <div className="h-96 flex justify-center">
              <div className="w-1/2">
                <Pie options={pieOptions} data={pieChartData} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
