"use client";

import { useState } from "react";

export default function PropertyPolicyPage() {
  const [formData, setFormData] = useState({
    transport: "No transport facility",
    smoking: "Dedicated zone",
    liquor: "Dedicated zone",
    pets: "Not-Allowed",
    currency: "Rupee",
    kidsFree: "1 Yr",
    kidsConsider: "6 Yr",
    seniorDiscount: "No",
    foodPreference: [],
    payAtHotel: "Not-Allowed",
    multiLanguage: "Yes",
    foreignerAllowed: "Allowed",
    lateCheckout: "Subject To Availability",
    earlyCheckin: "Subject To Availability",
    blockPeriod: "23:00",
    checkInOutPolicy: "Yes",
    checkInType: "After Noon",
    checkInTime: { hour: "2", minute: "00", period: "PM" },
    checkOutTime: { hour: "12", minute: "00", period: "PM" },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => {
        const newPrefs = checked
          ? [...prev.foodPreference, value]
          : prev.foodPreference.filter((pref) => pref !== value);
        return { ...prev, foodPreference: newPrefs };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleTimeChange = (type, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [type]: { ...prev[type], [field]: value },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Form submitted! Check console for data.");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-xl shadow-md space-y-8">
        <div className="flex justify-between items-center border-b pb-4">
          <h1 className="text-2xl font-bold text-teal-600">Property Policy</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Left Section */}
          <div className="space-y-4">
            {/* Transport Policies */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Transport Policies
              </label>
              <select
                name="transport"
                value={formData.transport}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-400"
              >
                <option value="No transport facility">
                  No transport facility
                </option>
                <option value="Complementry pick and drop">
                  Complementry pick and drop
                </option>
                <option value="Paid transportation on call">
                  Paid transportation on call
                </option>
              </select>
            </div>

            {/* Smoking Policies */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Smoking Policies
              </label>
              <select
                name="smoking"
                value={formData.smoking}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-400"
              >
                <option value="Not-Allowed">Not-Allowed</option>
                <option value="Allowed">Allowed</option>
                <option value="Dedicated zone">Dedicated zone</option>
              </select>
            </div>

            {/* Liquor Policies */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Liquor Policies
              </label>
              <select
                name="liquor"
                value={formData.liquor}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-400"
              >
                <option value="Not-Allowed">Not-Allowed</option>
                <option value="Allowed">Allowed</option>
                <option value="Not-Specified">Not-Specified</option>
                <option value="Dedicated zone">Dedicated zone</option>
              </select>
            </div>

            {/* Pets Policy */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Pets Policy
              </label>
              <select
                name="pets"
                value={formData.pets}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-400"
              >
                <option value="Not-Allowed">Not-Allowed</option>
                <option value="Allowed">Allowed</option>
                <option value="In Some Area">In Some Area</option>
              </select>
            </div>

            {/* Currency */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Currency
              </label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-400"
              >
                <option value="Rupee">Rupee</option>
                <option value="Dollar">Dollar</option>
                <option value="Euro">Euro</option>
                <option value="Dirham">Dirham</option>
                <option value="Rupiah">Rupiah</option>
                <option value="Nepalirupee">Nepalirupee</option>
                <option value="Thai Bhat">Thai Bhat</option>
              </select>
            </div>

            {/* Kids Free Upto */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Kids Free Upto
              </label>
              <select
                name="kidsFree"
                value={formData.kidsFree}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-400"
              >
                <option value="1 Yr">1 Yr</option>
                <option value="2 Yr">2 Yr</option>
                <option value="3 Yr">3 Yr</option>
                <option value="4 Yr">4 Yr</option>
                <option value="5 Yr">5 Yr</option>
                <option value="6 Yr">6 Yr</option>
              </select>
            </div>

            {/* Consider Kids Upto */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Consider Kids Upto
              </label>
              <select
                name="kidsConsider"
                value={formData.kidsConsider}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-400"
              >
                <option value="1 Yr">1 Yr</option>
                <option value="2 Yr">2 Yr</option>
                <option value="3 Yr">3 Yr</option>
                <option value="4 Yr">4 Yr</option>
                <option value="5 Yr">5 Yr</option>
                <option value="6 Yr">6 Yr</option>
                {/* <option value="7 Yr">7 Yr</option>
                <option value="8 Yr">8 Yr</option>
                <option value="9 Yr">9 Yr</option>
                <option value="10 Yr">10 Yr</option>
                <option value="11 Yr">11 Yr</option>
                <option value="12 Yr">12 Yr</option> */}
              </select>
            </div>

            {/* Senior Citizen Discount */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Senior citizen discount
              </label>
              <div className="flex space-x-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="seniorDiscount"
                    value="Yes"
                    checked={formData.seniorDiscount === "Yes"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="seniorDiscount"
                    value="No"
                    checked={formData.seniorDiscount === "No"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            {/* Food Preference */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Food preference
              </label>
              <div className="flex space-x-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Vegetarian"
                    checked={formData.foodPreference.includes("Vegetarian")}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Vegetarian
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Non Veg"
                    checked={formData.foodPreference.includes("Non Veg")}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Non Veg
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Other"
                    checked={formData.foodPreference.includes("Other")}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Other
                </label>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="space-y-4">
            {/* Pay at Hotel */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Pay at hotel
              </label>
              <select
                name="payAtHotel"
                value={formData.payAtHotel}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-400"
              >
                <option value="Allowed">Allowed</option>
                <option value="Not-Allowed">Not-Allowed</option>
                {/* <option value="Partial Payment">Partial Payment</option> */}
              </select>
            </div>

            {/* Multi Language */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Multi Language
              </label>
              <select
                name="multiLanguage"
                value={formData.multiLanguage}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-400"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Foreigner Allowed */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Foreigner Allowed
              </label>
              <select
                name="foreignerAllowed"
                value={formData.foreignerAllowed}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-400"
              >
                <option value="Allowed">Allowed</option>
                <option value="Not-Allowed">Not-Allowed</option>
              </select>
            </div>

            {/* Late Checkout */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Late checkout
              </label>
              <select
                name="lateCheckout"
                value={formData.lateCheckout}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-400"
              >
                <option value="Subject To Availability">
                  Subject To Availability
                </option>
                <option value="Allowed">Allowed</option>
                <option value="Not-Allowed">Not-Allowed</option>
              </select>
            </div>

            {/* Early Checkin */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Early checkin
              </label>
              <select
                name="earlyCheckin"
                value={formData.earlyCheckin}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-400"
              >
                <option value="Subject To Availability">
                  Subject To Availability
                </option>
                <option value="Allowed">Allowed</option>
                <option value="Not-Allowed">Not-Allowed</option>
              </select>
            </div>

            {/* Today Block Period */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Today Block Period
              </label>
              <select
                name="blockPeriod"
                value={formData.blockPeriod}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-400"
              >
                <option value="23:00">23:00</option>
                <option value="22:00">22:00</option>
                <option value="21:00">21:00</option>
                <option value="20:00">20:00</option>
                <option value="18:00">18:00</option>
                <option value="16:00">16:00</option>
                <option value="14:00">14:00</option>
                <option value="12:00">12:00</option>
              </select>
            </div>

            {/* Check In/Out Policy */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Check In/Out Policy
              </label>
              <div className="flex space-x-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="checkInOutPolicy"
                    value="Yes"
                    checked={formData.checkInOutPolicy === "Yes"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="checkInOutPolicy"
                    value="No"
                    checked={formData.checkInOutPolicy === "No"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            {/* 24 Hour / After Noon */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Check In Type
              </label>
              <div className="flex space-x-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="checkInType"
                    value="24 Hour"
                    checked={formData.checkInType === "24 Hour"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  24 Hour
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="checkInType"
                    value="After Noon"
                    checked={formData.checkInType === "After Noon"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  After Noon
                </label>
              </div>
            </div>

            {/* Check In Time */}
            <div className="flex space-x-4">
              <div className="w-1/3">
                <label className="block text-gray-700 font-medium mb-1">
                  Check In Time
                </label>
                <select
                  value={formData.checkInTime.hour}
                  onChange={(e) =>
                    handleTimeChange("checkInTime", "hour", e.target.value)
                  }
                  className="w-full border rounded-lg p-2"
                >
                  {[...Array(12)].map((_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-1/3">
                <label className="block text-gray-700 font-medium mb-1 invisible">
                  Minutes
                </label>
                <select
                  value={formData.checkInTime.minute}
                  onChange={(e) =>
                    handleTimeChange("checkInTime", "minute", e.target.value)
                  }
                  className="w-full border rounded-lg p-2"
                >
                  <option>00</option>
                  <option>30</option>
                </select>
              </div>
              <div className="w-1/3">
                <label className="block text-gray-700 font-medium mb-1 invisible">
                  Period
                </label>
                <select
                  value={formData.checkInTime.period}
                  onChange={(e) =>
                    handleTimeChange("checkInTime", "period", e.target.value)
                  }
                  className="w-full border rounded-lg p-2"
                >
                  <option>AM</option>
                  <option>PM</option>
                </select>
              </div>
            </div>

            {/* Check Out Time */}
            <div className="flex space-x-4">
              <div className="w-1/3">
                <label className="block text-gray-700 font-medium mb-1">
                  Check Out Time
                </label>
                <select
                  value={formData.checkOutTime.hour}
                  onChange={(e) =>
                    handleTimeChange("checkOutTime", "hour", e.target.value)
                  }
                  className="w-full border rounded-lg p-2"
                >
                  {[...Array(12)].map((_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-1/3">
                <label className="block text-gray-700 font-medium mb-1 invisible">
                  Minutes
                </label>
                <select
                  value={formData.checkOutTime.minute}
                  onChange={(e) =>
                    handleTimeChange("checkOutTime", "minute", e.target.value)
                  }
                  className="w-full border rounded-lg p-2"
                >
                  <option>00</option>
                  <option>30</option>
                </select>
              </div>
              <div className="w-1/3">
                <label className="block text-gray-700 font-medium mb-1 invisible">
                  Period
                </label>
                <select
                  value={formData.checkOutTime.period}
                  onChange={(e) =>
                    handleTimeChange("checkOutTime", "period", e.target.value)
                  }
                  className="w-full border rounded-lg p-2"
                >
                  <option>AM</option>
                  <option>PM</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg shadow-md transition"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
