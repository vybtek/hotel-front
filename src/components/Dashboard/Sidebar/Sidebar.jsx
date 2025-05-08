"use client";
import {
  AlarmClockCheck,
  AppWindow,
  Bed,
  Blinds,
  CalendarDays,
  ChartColumnBig,
  ChartNoAxesCombined,
  ChartPie,
  ClipboardPlus,
  DollarSign,
  Hotel,
  ImageDown,
  LayoutDashboard,
  LayoutList,
  Mail,
  NotebookTabs,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Sidebar = () => {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (key) => {
    setActiveDropdown((prevActive) => (prevActive === key ? null : key));
  };

  const isActive = (href) =>
    pathname === href
      ? "text-white"
      : "text-gray-300 hover:bg-gray-700 hover:text-white";

  return (
    <div className="fixed w-64 h-full bg-gray-800 text-white">
      <div className="bg-white">
        <Link href="/dashboard">
          <Image
            src="/global stay.webp"
            height={2}
            width={260}
            className="h-28 bg-white cursor-pointer"
            alt="logo"
            priority={true}
          />
        </Link>
      </div>
      <nav className="mt-6">
        <div>
          <Link
            href="/dashboard"
            className={`w-full py-2.5 px-4 flex items-center space-x-2 transition-all duration-200 ${isActive(
              "/dashboard"
            )}`}
          >
            <LayoutDashboard
              className={`transition-colors duration-200 ${
                pathname === "/dashboard"
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            />
            <span className="flex-1 text-left">Dashboard</span>
          </Link>
        </div>
        <div>
          <button
            onClick={() => toggleDropdown("bookings")}
            className={`w-full py-2.5 px-4 flex items-center space-x-2 transition-all duration-200 ${
              isActive("/dashboard/bookingreport") ||
              isActive("/dashboard/checkInOut") ||
              isActive("/dashboard/holdbookings")
            }`}
          >
            <AppWindow
              className={`transition-colors duration-200 ${
                pathname === "/dashboard/bookingreport" ||
                pathname === "/dashboard/checkInOut" ||
                pathname === "/dashboard/holdbookings"
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            />
            <span className="flex-1 text-left">Bookings</span>
            <svg
              className={`cursor-pointer w-4 h-4 transform transition-transform duration-200 ${
                activeDropdown === "bookings" ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div
            className={`ml-4 overflow-hidden transition-all duration-300 ease-in-out ${
              activeDropdown === "bookings" ? "max-h-40" : "max-h-0"
            }`}
          >
            <Link
              href="/dashboard/holdbookings"
              className={`flex items-center space-x-2 py-2 px-4 transition-colors duration-200 ${isActive(
                "/dashboard/holdbookings"
              )}`}
            >
              <Blinds
                className={`transition-colors duration-200 ${
                  pathname === "/dashboard/holdbookings"
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              />
              <span>Hold Bookings</span>
            </Link>

            <Link
              href="/dashboard/bookingreport"
              className={`flex items-center space-x-2 py-2 px-4 transition-colors duration-200 ${isActive(
                "/dashboard/bookingreport"
              )}`}
            >
              <ChartColumnBig
                className={`transition-colors duration-200 ${
                  pathname === "/dashboard/bookingreport"
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              />
              <span>Booking Report</span>
            </Link>
            <Link
              href="/dashboard/checkInOut"
              className={`flex items-center space-x-2 py-2 px-4 transition-colors duration-200 ${isActive(
                "/dashboard/checkInOut"
              )}`}
            >
              <AlarmClockCheck
                className={`transition-colors duration-200 ${
                  pathname === "/dashboard/checkInOut"
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              />
              <span>Today Check(In-out)</span>
            </Link>
          </div>
        </div>
        <div>
          <button
            onClick={() => toggleDropdown("roomManagement")}
            className={`w-full py-2.5 px-4 flex items-center space-x-2 transition-all duration-200 ${
              isActive("/dashboard/availCalender") ||
              isActive("/dashboard/roomrateplan")
            }`}
          >
            <Bed
              className={`transition-colors duration-200 ${
                pathname === "/dashboard/availCalender" ||
                pathname === "/dashboard/roomrateplan"
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            />
            <span className="flex-1 text-left">Room Management</span>
            <svg
              className={`cursor-pointer w-4 h-4 transform transition-transform duration-200 ${
                activeDropdown === "roomManagement" ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div
            className={`ml-4 overflow-hidden transition-all duration-300 ease-in-out ${
              activeDropdown === "roomManagement" ? "max-h-40" : "max-h-0"
            }`}
          >
            <Link
              href="/dashboard/availCalender"
              className={`flex items-center space-x-2 py-2 px-4 transition-colors duration-200 ${isActive(
                "/dashboard/availCalender"
              )}`}
            >
              <CalendarDays
                className={`transition-colors duration-200 ${
                  pathname === "/dashboard/availCalender"
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              />
              <span>Availability Calender</span>
            </Link>
            <Link
              href="/dashboard/roomrateplan"
              className={`flex items-center space-x-2 py-2 px-4 transition-colors duration-200 ${isActive(
                "/dashboard/roomrateplan"
              )}`}
            >
              <DollarSign
                className={`transition-colors duration-200 ${
                  pathname === "/dashboard/roomrateplan"
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              />
              <span>Room and Rate Plan</span>
            </Link>
          </div>
        </div>
        <div>
          <button
            onClick={() => toggleDropdown("hotelDetails")}
            className={`w-full py-2.5 px-4 flex items-center space-x-2 transition-all duration-200 ${
              isActive("/dashboard/details") ||
              isActive("/dashboard/amenities") ||
              isActive("/dashboard/photoGallery") ||
              isActive("/dashboard/propertyPolicy")
            }`}
          >
            <Hotel
              className={`transition-colors duration-200 ${
                pathname === "/dashboard/details" ||
                pathname === "/dashboard/amenities" ||
                pathname === "/dashboard/photoGallery" ||
                pathname === "/dashboard/propertyPolicy"
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            />
            <span className="flex-1 text-left">Hotel Details</span>
            <svg
              className={`cursor-pointer w-4 h-4 transform transition-transform duration-200 ${
                activeDropdown === "hotelDetails" ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div
            className={`ml-4 overflow-hidden transition-all duration-300 ease-in-out ${
              activeDropdown === "hotelDetails" ? "max-h-40" : "max-h-0"
            }`}
          >
            <Link
              href="/dashboard/details"
              className={`flex items-center space-x-2 py-2 px-4 transition-colors duration-200 ${isActive(
                "/dashboard/details"
              )}`}
            >
              <NotebookTabs
                className={`transition-colors duration-200 ${
                  pathname === "/dashboard/details"
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              />
              <span>General Details</span>
            </Link>
            <Link
              href="/dashboard/amenities"
              className={`flex items-center space-x-2 py-2 px-4 transition-colors duration-200 ${isActive(
                "/dashboard/amenities"
              )}`}
            >
              <LayoutList
                className={`transition-colors duration-200 ${
                  pathname === "/dashboard/amenities"
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              />
              <span>Amenities</span>
            </Link>
            <Link
              href="/dashboard/photoGallery"
              className={`flex items-center space-x-2 py-2 px-4 transition-colors duration-200 ${isActive(
                "/dashboard/photoGallery"
              )}`}
            >
              <ImageDown
                className={`transition-colors duration-200 ${
                  pathname === "/dashboard/photoGallery"
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              />
              <span>Photo Gallery</span>
            </Link>
            <Link
              href="/dashboard/propertyPolicy"
              className={`flex items-center space-x-2 py-2 px-4 transition-colors duration-200 ${isActive(
                "/dashboard/propertyPolicy"
              )}`}
            >
              <Mail
                className={`transition-colors duration-200 ${
                  pathname === "/dashboard/propertyPolicy"
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              />
              <span>Property Policy</span>
            </Link>
          </div>
        </div>
        <div>
          <button
            onClick={() => toggleDropdown("reports")}
            className={`w-full py-2.5 px-4 flex items-center space-x-2 transition-all duration-200 ${
              isActive("/dashboard/revenueReport") ||
              isActive("/dashboard/bookingAnalytics")
            }`}
          >
            <ChartNoAxesCombined
              className={`transition-colors duration-200 ${
                pathname === "/dashboard/revenueReport" ||
                pathname === "/dashboard/bookingAnalytics"
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            />
            <span className="flex-1 text-left">Reports</span>
            <svg
              className={`cursor-pointer w-4 h-4 transform transition-transform duration-200 ${
                activeDropdown === "reports" ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div
            className={`ml-4 overflow-hidden transition-all duration-300 ease-in-out ${
              activeDropdown === "reports" ? "max-h-40" : "max-h-0"
            }`}
          >
            <Link
              href="/dashboard/revenueReport"
              className={`flex items-center space-x-2 py-2 px-4 transition-colors duration-200 ${isActive(
                "/dashboard/revenueReport"
              )}`}
            >
              <ClipboardPlus
                className={`transition-colors duration-200 ${
                  pathname === "/dashboard/revenueReport"
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              />
              <span>Revenue Reports</span>
            </Link>
            <Link
              href="/dashboard/bookingAnalytics"
              className={`flex items-center space-x-2 py-2 px-4 transition-colors duration-200 ${isActive(
                "/dashboard/bookingAnalytics"
              )}`}
            >
              <ChartPie
                className={`transition-colors duration-200 ${
                  pathname === "/dashboard/bookingAnalytics"
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              />
              <span>Booking Analytics</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
