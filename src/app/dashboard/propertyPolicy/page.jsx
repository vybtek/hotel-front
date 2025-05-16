"use client";

import { useState, useCallback } from "react";

const initialFormData = {
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
};

const SelectField = ({ label, name, value, options, onChange }) => (
  <div className="space-y-1">
    <label className="block text-gray-700 font-medium">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-teal-400 transition"
    >
      {options.map((option) => (
        <option key={option.value || option} value={option.value || option}>
          {option.label || option}
        </option>
      ))}
    </select>
  </div>
);

const RadioField = ({ label, name, value, options, onChange }) => (
  <div className="space-y-1">
    <label className="block text-gray-700 font-medium">{label}</label>
    <div className="flex space-x-6">
      {options.map((option) => (
        <label key={option.value} className="flex items-center">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={onChange}
            className="mr-2 accent-teal-500"
          />
          {option.label}
        </label>
      ))}
    </div>
  </div>
);

const CheckboxField = ({ label, name, values, options, onChange }) => (
  <div className="space-y-1">
    <label className="block text-gray-700 font-medium">{label}</label>
    <div className="flex space-x-6">
      {options.map((option) => (
        <label key={option} className="flex items-center">
          <input
            type="checkbox"
            value={option}
            checked={values.includes(option)}
            onChange={onChange}
            className="mr-2 accent-teal-500"
          />
          {option}
        </label>
      ))}
    </div>
  </div>
);

const TimeField = ({ label, name, value, onChange }) => (
  <div className="space-y-1">
    <label className="block text-gray-700 font-medium">{label}</label>
    <div className="flex space-x-4">
      <select
        value={value.hour}
        onChange={(e) => onChange(name, "hour", e.target.value)}
        className="w-1/3 border rounded-lg p-2 focus:ring-2 focus:ring-teal-400"
      >
        {[...Array(12)].map((_, i) => (
          <option key={i} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      <select
        value={value.minute}
        onChange={(e) => onChange(name, "minute", e.target.value)}
        className="w-1/3 border rounded-lg p-2 focus:ring-2 focus:ring-teal-400"
      >
        <option>00</option>
        <option>30</option>
      </select>
      <select
        value={value.period}
        onChange={(e) => onChange(name, "period", e.target.value)}
        className="w-1/3 border rounded-lg p-2 focus:ring-2 focus:ring-teal-400"
      >
        <option>AM</option>
        <option>PM</option>
      </select>
    </div>
  </div>
);

export default function PropertyPolicyPage() {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      if (type === "checkbox") {
        const newPrefs = checked
          ? [...prev.foodPreference, value]
          : prev.foodPreference.filter((pref) => pref !== value);
        return { ...prev, foodPreference: newPrefs };
      }
      return { ...prev, [name]: value };
    });
  }, []);

  const handleTimeChange = useCallback((type, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [type]: { ...prev[type], [field]: value },
    }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log(formData);
      alert("Form submitted! Check console for data.");
    },
    [formData]
  );

  const handleReset = useCallback(() => {
    setFormData(initialFormData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <div className="border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold text-teal-600">Property Policy</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Left Section */}
          <div className="space-y-4">
            <SelectField
              label="Transport Policies"
              name="transport"
              value={formData.transport}
              onChange={handleChange}
              options={[
                "No transport facility",
                "Complementry pick and drop",
                "Paid transportation on call",
              ]}
            />
            <SelectField
              label="Smoking Policies"
              name="smoking"
              value={formData.smoking}
              onChange={handleChange}
              options={["Not-Allowed", "Allowed", "Dedicated zone"]}
            />
            <SelectField
              label="Liquor Policies"
              name="liquor"
              value={formData.liquor}
              onChange={handleChange}
              options={[
                "Not-Allowed",
                "Allowed",
                "Not-Specified",
                "Dedicated zone",
              ]}
            />
            <SelectField
              label="Pets Policy"
              name="pets"
              value={formData.pets}
              onChange={handleChange}
              options={["Not-Allowed", "Allowed", "In Some Area"]}
            />
            <SelectField
              label="Currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              options={[
                "Rupee",
                "Dollar",
                "Euro",
                "Dirham",
                "Rupiah",
                "Nepalirupee",
                "Thai Bhat",
              ]}
            />
            <SelectField
              label="Kids Free Upto"
              name="kidsFree"
              value={formData.kidsFree}
              onChange={handleChange}
              options={["1 Yr", "2 Yr", "3 Yr", "4 Yr", "5 Yr", "6 Yr"]}
            />
            <SelectField
              label="Consider Kids Upto"
              name="kidsConsider"
              value={formData.kidsConsider}
              onChange={handleChange}
              options={["1 Yr", "2 Yr", "3 Yr", "4 Yr", "5 Yr", "6 Yr"]}
            />
            <RadioField
              label="Senior Citizen Discount"
              name="seniorDiscount"
              value={formData.seniorDiscount}
              onChange={handleChange}
              options={[
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" },
              ]}
            />
            <CheckboxField
              label="Food Preference"
              name="foodPreference"
              values={formData.foodPreference}
              onChange={handleChange}
              options={["Vegetarian", "Non Veg", "Other"]}
            />
          </div>

          {/* Right Section */}
          <div className="space-y-4">
            <SelectField
              label="Pay at Hotel"
              name="payAtHotel"
              value={formData.payAtHotel}
              onChange={handleChange}
              options={["Allowed", "Not-Allowed"]}
            />
            <SelectField
              label="Multi Language"
              name="multiLanguage"
              value={formData.multiLanguage}
              onChange={handleChange}
              options={["Yes", "No"]}
            />
            <SelectField
              label="Foreigner Allowed"
              name="foreignerAllowed"
              value={formData.foreignerAllowed}
              onChange={handleChange}
              options={["Allowed", "Not-Allowed"]}
            />
            <SelectField
              label="Late Checkout"
              name="lateCheckout"
              value={formData.lateCheckout}
              onChange={handleChange}
              options={["Subject To Availability", "Allowed", "Not-Allowed"]}
            />
            <SelectField
              label="Early Checkin"
              name="earlyCheckin"
              value={formData.earlyCheckin}
              onChange={handleChange}
              options={["Subject To Availability", "Allowed", "Not-Allowed"]}
            />
            <SelectField
              label="Today Block Period"
              name="blockPeriod"
              value={formData.blockPeriod}
              onChange={handleChange}
              options={[
                "23:00",
                "22:00",
                "21:00",
                "20:00",
                "18:00",
                "16:00",
                "14:00",
                "12:00",
              ]}
            />
            <RadioField
              label="Check In/Out Policy"
              name="checkInOutPolicy"
              value={formData.checkInOutPolicy}
              onChange={handleChange}
              options={[
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" },
              ]}
            />
            <RadioField
              label="Check In Type"
              name="checkInType"
              value={formData.checkInType}
              onChange={handleChange}
              options={[
                { value: "24 Hour", label: "24 Hour" },
                { value: "After Noon", label: "After Noon" },
              ]}
            />
            <TimeField
              label="Check In Time"
              name="checkInTime"
              value={formData.checkInTime}
              onChange={handleTimeChange}
            />
            <TimeField
              label="Check Out Time"
              name="checkOutTime"
              value={formData.checkOutTime}
              onChange={handleTimeChange}
            />
          </div>

          {/* Buttons */}
          <div className="col-span-1 md:col-span-2 flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg shadow-md transition"
            >
              Reset
            </button>
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
