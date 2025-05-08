"use client";

import { BookingProvider } from "../../context/BookingsContext/BookingContext";
import { HotelGalleryProvider } from "../../context/HotelGalleryContext/HotelGalleryContext";
import Navbar from "@/components/Dashboard/Navbar/Navbar";
import Sidebar from "@/components/Dashboard/Sidebar/Sidebar";
import { useState, useEffect } from "react";
import DashboardLoader from "@/components/dashboard/Loaders/DashboardLoader";

const Layout = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside className="h-screen bg-gray-100 border-r border-gray-200">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 w-full ml-64">
        <Navbar />
        <main className="flex-1 overflow-auto">
          {loading ? (
            <DashboardLoader />
          ) : (
            <BookingProvider>
              <HotelGalleryProvider>
                <div className="mx-auto">{children}</div>
              </HotelGalleryProvider>
            </BookingProvider>
          )}
        </main>
      </div>
    </div>
  );
};

export default Layout;
