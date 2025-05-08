"use client";
import { useState, useEffect } from "react";
import HotelBooking from "@/components/Home/HotelBooking";
import { BookingLoader } from "@/components/Home/BookingLoader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for the HotelBooking component
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Adjust based on actual loading time

    return () => clearTimeout(timer);
  }, []);

  return <div>{isLoading ? <BookingLoader /> : <HotelBooking />}</div>;
}
