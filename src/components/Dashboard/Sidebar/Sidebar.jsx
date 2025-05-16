"use client";
import { useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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

// Navigation menu data structure
const navMenu = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    key: "bookings",
    label: "Bookings",
    icon: AppWindow,
    submenu: [
      {
        label: "Hold Bookings",
        href: "/dashboard/holdbookings",
        icon: Blinds,
      },
      {
        label: "Booking Report",
        href: "/dashboard/bookingreport",
        icon: ChartColumnBig,
      },
      {
        label: "Today Check(In-out)",
        href: "/dashboard/checkInOut",
        icon: AlarmClockCheck,
      },
    ],
  },
  {
    key: "roomManagement",
    label: "Room Management",
    icon: Bed,
    submenu: [
      {
        label: "Availability Calender",
        href: "/dashboard/availCalender",
        icon: CalendarDays,
      },
      {
        label: "Room and Rate Plan",
        href: "/dashboard/roomrateplan",
        icon: DollarSign,
      },
    ],
  },
  {
    key: "hotelDetails",
    label: "Hotel Details",
    icon: Hotel,
    submenu: [
      {
        label: "General Details",
        href: "/dashboard/details",
        icon: NotebookTabs,
      },
      {
        label: "Amenities",
        href: "/dashboard/amenities",
        icon: LayoutList,
      },
      {
        label: "Photo Gallery",
        href: "/dashboard/photoGallery",
        icon: ImageDown,
      },
      {
        label: "Property Policy",
        href: "/dashboard/propertyPolicy",
        icon: Mail,
      },
    ],
  },
  {
    key: "reports",
    label: "Reports",
    icon: ChartNoAxesCombined,
    submenu: [
      {
        label: "Revenue Reports",
        href: "/dashboard/revenueReport",
        icon: ClipboardPlus,
      },
      {
        label: "Booking Analytics",
        href: "/dashboard/bookingAnalytics",
        icon: ChartPie,
      },
    ],
  },
];

// Dropdown component to reduce repetition
const DropdownMenu = ({ item, isActive, activeDropdown, toggleDropdown, pathname }) => {
  // Check if any submenu item is active
  const isSubmenuActive = item.submenu?.some(subItem => pathname === subItem.href);
  
  return (
    <div key={item.key}>
      <button
        onClick={() => toggleDropdown(item.key)}
        className={`w-full py-2.5 px-4 flex items-center space-x-2 transition-all duration-200 ${
          isSubmenuActive ? "text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
        }`}
      >
        <item.icon
          className={`transition-colors duration-200 ${
            isSubmenuActive ? "text-white" : "text-gray-400 hover:text-white"
          }`}
        />
        <span className="flex-1 text-left">{item.label}</span>
        <svg
          className={`cursor-pointer w-4 h-4 transform transition-transform duration-200 ${
            activeDropdown === item.key ? "rotate-180" : ""
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
          activeDropdown === item.key ? "max-h-96" : "max-h-0"
        }`}
      >
        {item.submenu?.map((subItem) => (
          <Link
            key={subItem.href}
            href={subItem.href}
            className={`flex items-center space-x-2 py-2 px-4 transition-colors duration-200 ${
              pathname === subItem.href
                ? "text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            <subItem.icon
              className={`transition-colors duration-200 ${
                pathname === subItem.href
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            />
            <span>{subItem.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

const Sidebar = () => {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Set initial active dropdown based on current path (only runs once on mount)
  useState(() => {
    const activeSection = navMenu.find(item => 
      item.submenu?.some(subItem => pathname === subItem.href)
    );
    if (activeSection) {
      setActiveDropdown(activeSection.key);
    }
  }, []);

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
            alt="Global Stay Logo"
            priority={true}
          />
        </Link>
      </div>
      <nav className="mt-6">
        {navMenu.map((item) => (
          item.submenu ? (
            <DropdownMenu
              key={item.key}
              item={item}
              isActive={isActive}
              activeDropdown={activeDropdown}
              toggleDropdown={toggleDropdown}
              pathname={pathname}
            />
          ) : (
            <div key={item.key}>
              <Link
                href={item.href}
                className={`w-full py-2.5 px-4 flex items-center space-x-2 transition-all duration-200 ${isActive(
                  item.href
                )}`}
              >
                <item.icon
                  className={`transition-colors duration-200 ${
                    pathname === item.href
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                />
                <span className="flex-1 text-left">{item.label}</span>
              </Link>
            </div>
          )
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;