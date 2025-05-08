"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Sample initial data - FIXED to properly separate HOLD and CNF bookings
const initialConfirmedBookings = [
  {
    id: "NBE8615145474529",
    source: "AsiaTech",
    date: "24-Apr-25",
    name: "Sushrut Nallulwar",
    checkIn: "18-Feb-25",
    checkOut: "21-Feb-25",
    category: "Deluxe Room with King Bed (2)",
    commission: "N/A",
    tax: 0,
    total: 160002,
    payType: "Partial",
    roomAssigned: "WebCheckin",
    status: "CNF",
  },
  {
    id: "NBE8615145270748",
    source: "AsiaTech",
    date: "22-Apr-25",
    name: "Kristina Kea",
    checkIn: "18-Feb-25",
    checkOut: "21-Feb-25",
    category: "Deluxe Room with King Bed (1)",
    commission: "N/A",
    tax: 0,
    total: 80001,
    payType: "Partial",
    roomAssigned: "WebCheckin",
    status: "CNF",
  },
  {
    id: "NBE8615145174731",
    source: "AsiaTech",
    date: "21-Apr-25",
    name: "Vasu Jain",
    checkIn: "18-Feb-25",
    checkOut: "21-Feb-25",
    category: "Deluxe Room with King Bed (1)",
    commission: "N/A",
    tax: 0,
    total: 80001,
    payType: "Partial",
    roomAssigned: "WebCheckin",
    status: "CNF",
  },
  {
    id: "NBE8615144984749",
    source: "AsiaTech",
    date: "18-Apr-25",
    name: "Debra Squires",
    checkIn: "18-Feb-25",
    checkOut: "21-Feb-25",
    category: "Multiple",
    commission: "N/A",
    tax: 0,
    total: 220002,
    payType: "Partial",
    roomAssigned: "WebCheckin",
    status: "CNF",
  },
  {
    id: "NBE8615144586304",
    source: "AsiaTech",
    date: "14-Apr-25",
    name: "Natalie L Riva",
    checkIn: "18-Feb-25",
    checkOut: "21-Feb-25",
    category: "Deluxe Room with King Bed (1)",
    commission: "N/A",
    tax: 1203,
    total: 80000,
    payType: "Partial",
    roomAssigned: "WebCheckin",
    status: "CNF",
  },
  {
    id: "NBE8615145060075",
    source: "AsiaTech",
    date: "19-Apr-25",
    name: "Kavita Dua",
    checkIn: "18-Feb-25",
    checkOut: "21-Feb-25",
    category: "Deluxe Room with King Bed (1)",
    commission: "N/A",
    tax: 0,
    total: 80001,
    payType: "Partial",
    roomAssigned: "Not Assigned",
    status: "CNF",
  },
];

const initialHoldBookings = [
  {
    id: "NBE8615145060075",
    source: "AsiaTech",
    date: "19-Apr-25",
    name: "Kavita Dua",
    checkIn: "18-Feb-25",
    checkOut: "21-Feb-25",
    category: "Deluxe Room with King Bed (1)",
    commission: "N/A",
    tax: 0,
    total: 80001,
    payType: "Partial",
    roomAssigned: "Not Assigned",
    status: "HOLD",
  },
  {
    id: "NBE8615145474530",
    source: "AsiaTech",
    date: "25-Apr-25",
    name: "Rahul Sharma",
    checkIn: "20-Feb-25",
    checkOut: "23-Feb-25",
    category: "Deluxe Room with King Bed (1)",
    commission: "N/A",
    tax: 0,
    total: 85000,
    payType: "Partial",
    roomAssigned: "Not Assigned",
    status: "HOLD",
  },
  {
    id: "NBE8615145174732",
    source: "AsiaTech",
    date: "21-Apr-25",
    name: "Priya Mehta",
    checkIn: "19-Feb-25",
    checkOut: "22-Feb-25",
    category: "Deluxe Room with Queen Bed (1)",
    commission: "N/A",
    tax: 0,
    total: 75000,
    payType: "Pending",
    roomAssigned: "Not Assigned",
    status: "HOLD",
  },
  {
    id: "NBE8615145060076",
    source: "DirectBooking",
    date: "19-Apr-25",
    name: "Michael Chen",
    checkIn: "22-Feb-25",
    checkOut: "25-Feb-25",
    category: "Suite Room (1)",
    commission: "N/A",
    tax: 1500,
    total: 120000,
    payType: "Partial",
    roomAssigned: "Not Assigned",
    status: "HOLD",
  },
  {
    id: "NBE8615144984750",
    source: "TravelPartner",
    date: "18-Apr-25",
    name: "Sarah Johnson",
    checkIn: "21-Feb-25",
    checkOut: "24-Feb-25",
    category: "Deluxe Room with Twin Bed (1)",
    commission: "10%",
    tax: 1000,
    total: 90000,
    payType: "Pending",
    roomAssigned: "Not Assigned",
    status: "HOLD",
  },
  {
    id: "NBE8615145464529",
    source: "AsiaTech",
    date: "24-Apr-25",
    name: "Sushr Nallulwar",
    checkIn: "18-Feb-25",
    checkOut: "21-Feb-25",
    category: "Deluxe Room with King Bed (2)",
    commission: "N/A",
    tax: 0,
    total: 160002,
    payType: "Partial",
    roomAssigned: "Not Assigned",
    status: "HOLD",
  },
  {
    id: "NBE8615145260748",
    source: "AsiaTech",
    date: "23-Apr-25",
    name: "Kria Kea",
    checkIn: "18-Feb-25",
    checkOut: "21-Feb-25",
    category: "Deluxe Room with King Bed (1)",
    commission: "N/A",
    tax: 0,
    total: 80001,
    payType: "Partial",
    roomAssigned: "Not Assigned",
    status: "HOLD",
  },
];

// Create context
const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  // Load bookings from localStorage if available, otherwise use initial data
  const [confirmedBookings, setConfirmedBookings] = useState(() => {
    if (typeof window !== "undefined") {
      const savedBookings = localStorage.getItem("confirmedBookings");
      return savedBookings
        ? JSON.parse(savedBookings)
        : initialConfirmedBookings;
    }
    return initialConfirmedBookings;
  });

  const [holdBookings, setHoldBookings] = useState(() => {
    if (typeof window !== "undefined") {
      const savedBookings = localStorage.getItem("holdBookings");
      return savedBookings ? JSON.parse(savedBookings) : initialHoldBookings;
    }
    return initialHoldBookings;
  });

  // Save to localStorage whenever bookings change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "confirmedBookings",
        JSON.stringify(confirmedBookings)
      );
      localStorage.setItem("holdBookings", JSON.stringify(holdBookings));
    }
  }, [confirmedBookings, holdBookings]);

  // Function to change booking status
  const updateBookingStatus = (id, newStatus) => {
    // Find the booking in holdBookings
    const bookingToUpdate = holdBookings.find((booking) => booking.id === id);

    if (!bookingToUpdate) return;

    if (newStatus === "CNF") {
      // Update status, change roomAssigned to WebCheckin and add to confirmedBookings
      const updatedBooking = {
        ...bookingToUpdate,
        status: "CNF",
        roomAssigned: "WebCheckin",
      };

      // Remove from holdBookings
      setHoldBookings(holdBookings.filter((booking) => booking.id !== id));

      // Add to confirmedBookings
      setConfirmedBookings([...confirmedBookings, updatedBooking]);
    } else if (newStatus === "CANC") {
    }
  };

  return (
    <BookingContext.Provider
      value={{
        confirmedBookings,
        holdBookings,
        updateBookingStatus,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => useContext(BookingContext);
