import { useState } from "react";
import Flatpickr from "react-flatpickr";
import {
  FaCheckCircle,
  FaPenSquare,
  FaWifi,
  FaSwimmingPool,
  FaParking,
  FaUtensils,
  FaSpa,
} from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import "flatpickr/dist/flatpickr.min.css";

export default function DateSelector({
  dates,
  setDates,
  showCalendar,
  setShowCalendar,
  filterRooms,
  setSelectedRoomId,
  setSelectedRoomQty,
}) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = (show) => {
    setShowModal(show);
  };

  const proceedAction = () => {
    setShowModal(false);
    setShowCalendar(true);
    setSelectedRoomId(null);
    setSelectedRoomQty(0);
  };

  const formatDate = (date) => {
    return date instanceof Date && !isNaN(date)
      ? date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "Select Date";
  };

  const calculateNights = () => {
    if (dates.length === 2) {
      const diffTime = Math.abs(dates[1] - dates[0]);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const nights = calculateNights();

  return (
    <>
      <div
        className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 p-4 flex justify-between items-center text-white cursor-pointer shadow-lg hover:shadow-xl transition-all"
        onClick={() => toggleModal(true)}
      >
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-2 rounded-full">
            <FaCheckCircle className="text-xl" />
          </div>
          <div>
            <p className="text-sm font-medium">YOUR STAY</p>
            <p className="text-lg font-bold">
              {formatDate(dates[0])} - {formatDate(dates[1])} • {nights}{" "}
              {nights === 1 ? "Night" : "Nights"}
            </p>
          </div>
        </div>
        <button className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors">
          <FaPenSquare className="text-xl" />
        </button>
      </div>

      <div
        className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity ${
          showModal ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`bg-white rounded-xl p-8 max-w-md w-full shadow-2xl transform transition-all duration-300 ${
            showModal ? "scale-100" : "scale-95"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Change Dates</h2>
            <button
              onClick={() => toggleModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <IoIosClose className="text-2xl" />
            </button>
          </div>
          <p className="text-gray-600 mb-6">
            Changing dates will reset your current room selections. Are you sure
            you want to proceed?
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={proceedAction}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Proceed
            </button>
            <button
              onClick={() => toggleModal(false)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {showCalendar && (
        <div className="mt-8 bg-white shadow-xl rounded-xl p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <h3 className="text-lg font-semibold mb-3">
                Check In | Check Out Dates
              </h3>
              <Flatpickr
                value={dates}
                onChange={(selectedDates) => setDates(selectedDates)}
                options={{
                  mode: "range",
                  minDate: "today",
                  dateFormat: "Y-m-d",
                  disableMobile: true,
                }}
                className="w-full border rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={() => {
                  setShowCalendar(false);
                  filterRooms();
                }}
                className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition-colors shadow-md"
              >
                Search Availability
              </button>
            </div>
            <div className="md:w-2/3">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Aurika Udaipur Luxury By Lemon Tree Hotels
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-gray-600 font-medium">CONTACT</p>
                  <p className="text-gray-800">
                    <strong>EMAIL:</strong> aurika0@gmail.com
                  </p>
                  <p className="text-gray-800">
                    <strong>MOBILE:</strong> +919001992597
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 font-medium">TIMINGS</p>
                  <p className="text-gray-800">
                    <strong>CHECK IN:</strong> 2:00 PM
                  </p>
                  <p className="text-gray-800">
                    <strong>CHECK OUT:</strong> 12:00 PM
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-600 font-medium">AMENITIES</p>
                <div className="flex flex-wrap gap-4 mt-2">
                  <div className="flex items-center gap-2 text-indigo-600">
                    <FaWifi />
                    <span>Free WiFi</span>
                  </div>
                  <div className="flex items-center gap-2 text-indigo-600">
                    <FaSwimmingPool />
                    <span>Pool</span>
                  </div>
                  <div className="flex items-center gap-2 text-indigo-600">
                    <FaParking />
                    <span>Parking</span>
                  </div>
                  <div className="flex items-center gap-2 text-indigo-600">
                    <FaUtensils />
                    <span>Restaurant</span>
                  </div>
                  <div className="flex items-center gap-2 text-indigo-600">
                    <FaSpa />
                    <span>Spa</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}