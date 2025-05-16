import { memo, useCallback, useState } from "react";
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
import PropTypes from "prop-types";
import "flatpickr/dist/flatpickr.min.css";

const HOTEL_INFO = {
  name: "Aurika Udaipur Luxury By Lemon Tree Hotels",
  email: "aurika0@gmail.com",
  mobile: "+919001992597",
  checkIn: "2:00 PM",
  checkOut: "12:00 PM",
  amenities: [
    { icon: FaWifi, label: "Free WiFi" },
    { icon: FaSwimmingPool, label: "Pool" },
    { icon: FaParking, label: "Parking" },
    { icon: FaUtensils, label: "Restaurant" },
    { icon: FaSpa, label: "Spa" },
  ],
};

const Modal = memo(({ isOpen, onClose, onProceed }) => (
  <div
    className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300 ${
      isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}
    aria-hidden={!isOpen}
  >
    <div
      className={`bg-white rounded-xl p-6 max-w-md w-full shadow-2xl transform transition-all duration-300 ${
        isOpen ? "scale-100" : "scale-95"
      }`}
      role="dialog"
      aria-labelledby="modal-title"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 id="modal-title" className="text-2xl font-bold text-gray-900">
          Change Dates
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full"
          aria-label="Close modal"
        >
          <IoIosClose className="text-2xl" />
        </button>
      </div>
      <p className="text-gray-600 mb-6">
        Changing dates will reset your current room selections. Are you sure you want to proceed?
      </p>
      <div className="flex justify-end gap-4">
        <button
          onClick={onProceed}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Proceed
        </button>
        <button
          onClick={onClose}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
));

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onProceed: PropTypes.func.isRequired,
};

const DateSelector = ({
  dates,
  setDates,
  showCalendar,
  setShowCalendar,
  filterRooms,
  setSelectedRoomId,
  setSelectedRoomQty,
}) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = useCallback((show) => setShowModal(show), []);

  const proceedAction = useCallback(() => {
    setShowModal(false);
    setShowCalendar(true);
    setSelectedRoomId(null);
    setSelectedRoomQty(0);
  }, [setShowCalendar, setSelectedRoomId, setSelectedRoomQty]);

  const formatDate = useCallback((date) => {
    return date instanceof Date && !isNaN(date)
      ? date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "Select Date";
  }, []);

  const calculateNights = useCallback(() => {
    if (dates.length === 2 && dates[0] instanceof Date && dates[1] instanceof Date) {
      const diffTime = Math.abs(dates[1] - dates[0]);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 0;
  }, [dates]);

  const nights = calculateNights();

  return (
    <>
      <div
        className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 p-4 flex justify-between items-center text-white cursor-pointer shadow-lg hover:shadow-xl transition-shadow"
        onClick={() => toggleModal(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && toggleModal(true)}
      >
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-2 rounded-full">
            <FaCheckCircle className="text-xl" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-medium">YOUR STAY</p>
            <p className="text-lg font-bold">
              {formatDate(dates[0])} - {formatDate(dates[1])} • {nights}{" "}
              {nights === 1 ? "Night" : "Nights"}
            </p>
          </div>
        </div>
        <button
          className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Edit dates"
        >
          <FaPenSquare className="text-xl" />
        </button>
      </div>

      <Modal isOpen={showModal} onClose={() => toggleModal(false)} onProceed={proceedAction} />

      {showCalendar && (
        <div className="mt-8 bg-white shadow-xl rounded-xl p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <h3 className="text-lg font-semibold mb-3">Check In | Check Out Dates</h3>
              <Flatpickr
                value={dates}
                onChange={setDates}
                options={{
                  mode: "range",
                  minDate: "today",
                  dateFormat: "Y-m-d",
                  disableMobile: true,
                }}
                className="w-full border rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <button
                onClick={() => {
                  setShowCalendar(false);
                  filterRooms();
                }}
                className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Search Availability
              </button>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold text-gray-900">{HOTEL_INFO.name}</h2>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-gray-600 font-medium">CONTACT</p>
                  <p className="text-gray-800">
                    <strong>EMAIL:</strong> {HOTEL_INFO.email}
                  </p>
                  <p className="text-gray-800">
                    <strong>MOBILE:</strong> {HOTEL_INFO.mobile}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 font-medium">TIMINGS</p>
                  <p className="text-gray-800">
                    <strong>CHECK IN:</strong> {HOTEL_INFO.checkIn}
                  </p>
                  <p className="text-gray-800">
                    <strong>CHECK OUT:</strong> {HOTEL_INFO.checkOut}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-600 font-medium">AMENITIES</p>
                <div className="flex flex-wrap gap-4 mt-2">
                  {HOTEL_INFO.amenities.map(({ icon: Icon, label }, idx) => (
                    <div key={label + idx} className="flex items-center gap-2 text-indigo-600">
                      <Icon aria-hidden="true" />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

DateSelector.propTypes = {
  dates: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
  setDates: PropTypes.func.isRequired,
  showCalendar: PropTypes.bool.isRequired,
  setShowCalendar: PropTypes.func.isRequired,
  filterRooms: PropTypes.func.isRequired,
  setSelectedRoomId: PropTypes.func.isRequired,
  setSelectedRoomQty: PropTypes.func.isRequired,
};

export default memo(DateSelector);