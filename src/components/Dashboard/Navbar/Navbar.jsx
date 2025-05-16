"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import { FaUserAlt } from "react-icons/fa";
import { MdBedroomParent } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNavigation = (path) => {
    router.push(path);
    setIsDropdownOpen(false);
  };

  const handleLogout = async () => {
    setIsDropdownOpen(false);
    router.push("/login");
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-200 shadow-md">
      <div className="flex items-center space-x-4">
        <span className="text-xl font-semibold text-black">
          Channel Manager
        </span>
      </div>
      <div className="relative flex items-center">
        <button
          className="text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
          onClick={toggleDropdown}
          aria-label="User profile dropdown"
        >
          <CgProfile />
        </button>
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-0 top-2 mt-8 w-44 bg-white border rounded shadow-lg z-50"
          >
            <div className="p-2 text-sm font-semibold text-blue-600">
              WELCOME!
            </div>
            <ul className="text-gray-700">
              <li
                className="p-2 hover:bg-gray-200 cursor-pointer flex items-center"
                onClick={() => handleNavigation("/dashboard/details")}
              >
                <span className="mr-2">
                  <FaUserAlt />
                </span>
                My Profile
              </li>
              <li
                className="p-2 hover:bg-gray-200 cursor-pointer flex items-center"
                onClick={() => handleNavigation("/dashboard/bookingreport")}
              >
                <span className="mr-2">
                  <MdBedroomParent />
                </span>
                My Bookings
              </li>
              <li
                className="p-2 hover:bg-gray-200 cursor-pointer flex items-center"
                onClick={handleLogout}
              >
                <span className="mr-2">
                  <RiLogoutCircleRLine />
                </span>
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
