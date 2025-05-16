"use client";

import { useState, useMemo, useCallback } from "react";

// Reusable Section Component
const Section = ({ title, children, borderColor, headerColor }) => (
  <div
    className={`bg-white p-6 rounded-2xl shadow-2xl mb-6 border-l-8 ${borderColor} transform hover:-translate-y-2 transition duration-300`}
  >
    <h2
      className={`text-2xl font-bold ${headerColor} mb-4 border-b-2 border-${headerColor.replace(
        "text-",
        ""
      )}-300 pb-2`}
    >
      {title}
    </h2>
    {children}
  </div>
);

// Bank Account Component
const BankAccount = ({ details }) => (
  <Section
    title="Bank Account"
    borderColor="border-blue-500"
    headerColor="text-blue-700"
  >
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
      {Object.entries(details).map(([key, value]) => (
        <p key={key}>
          <span className="font-semibold">
            {key.charAt(0).toUpperCase() +
              key
                .slice(1)
                .replace(/([A-Z])/g, " $1")
                .trim()}
            :{" "}
          </span>
          {value}
        </p>
      ))}
    </div>
    <div className="mt-4 flex space-x-4">
      <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
        Visible On Voucher
      </button>
      <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
        Stop Payment
      </button>
    </div>
  </Section>
);

// Overview Edit Form Component
const OverviewForm = ({ formData, onChange, onSubmit, onCancel }) => (
  <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-purple-700">
          Update General Details
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { key: "latitude", label: "Latitude" },
          { key: "longitude", label: "Longitude" },
          { key: "defaultColor", label: "Default Color" },
          { key: "voucherLandline", label: "Voucher Landline No" },
          { key: "voucherMobile", label: "Voucher Mobile" },
          { key: "voucherEmail", label: "Voucher Email", type: "email" },
          { key: "website", label: "Website", span: true },
          { key: "address", label: "Address", span: true },
          {
            key: "hotelDescription",
            label: "Hotel Description",
            type: "textarea",
            span: true,
          },
        ].map(({ key, label, type = "text", span }) => (
          <div key={key} className={span ? "col-span-2" : ""}>
            <label className="block text-gray-700 font-semibold mb-1">
              {label}
            </label>
            {type === "textarea" ? (
              <textarea
                value={formData[key]}
                onChange={(e) => onChange(key, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                rows="3"
              />
            ) : (
              <input
                type={type}
                value={formData[key]}
                onChange={(e) => onChange(key, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            )}
          </div>
        ))}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Landmark
          </label>
          <input
            type="text"
            value={formData.location.split(",")[0]}
            onChange={(e) =>
              onChange(
                "location",
                `${e.target.value}, ${formData.location
                  .split(",")
                  .slice(1)
                  .join(",")}`
              )
            }
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Pin Code
          </label>
          <input
            type="text"
            value={formData.location.match(/Pin Code: (\d+)/)?.[1] || ""}
            onChange={(e) => {
              const newPin = e.target.value;
              const updatedLocation = formData.location.replace(
                /Pin Code: \d+/,
                `Pin Code: ${newPin}`
              );
              onChange("location", updatedLocation);
            }}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>
      <button
        onClick={onSubmit}
        className="mt-4 bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition"
      >
        Update
      </button>
    </div>
  </div>
);

// Settings Component
const Settings = ({ settings, onChange }) => (
  <Section
    title="Settings"
    borderColor="border-yellow-500"
    headerColor="text-yellow-500"
  >
    <div className="space-y-4 text-gray-700">
      {[
        { key: "currentPassword", label: "Current Password", readOnly: true },
        { key: "newPassword", label: "New Password" },
        { key: "confirmPassword", label: "Confirm Password" },
      ].map(({ key, label, readOnly }) => (
        <p key={key}>
          <span className="font-semibold">{label}: </span>
          <input
            type="password"
            value={settings[key]}
            onChange={(e) => onChange(key, e.target.value)}
            readOnly={readOnly}
            className={`w-[50%] ml-4 p-2 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 ${
              readOnly ? "bg-gray-100" : ""
            }`}
          />
        </p>
      ))}
    </div>
    <button className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition">
      Change
    </button>
  </Section>
);

// Documents Component
const Documents = ({ documents }) => (
  <Section
    title="Documents"
    borderColor="border-red-500"
    headerColor="text-red-700"
  >
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-red-100">
            {["Document Type", "View", "Download", "Action"].map((header) => (
              <th
                key={header}
                className="p-3 border-b-2 border-red-300 text-red-700"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {documents.map((doc, index) => (
            <tr key={index} className="hover:bg-red-50 transition duration-200">
              <td className="p-3 border-b border-red-200">{doc}</td>
              <td className="p-3 border-b border-red-200">
                <button className="text-blue-500 hover:underline">View</button>
              </td>
              <td className="p-3 border-b border-red-200">
                <button className="text-blue-500 hover:underline">
                  Download
                </button>
              </td>
              <td className="p-3 border-b border-red-200">
                <button className="text-red-500 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="mt-4 flex space-x-4">
      <select className="p-2 border border-red-300 rounded-lg">
        <option>Sign & Stamp</option>
      </select>
      <input type="file" className="p-2 border border-red-300 rounded-lg" />
      <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
        Upload
      </button>
    </div>
  </Section>
);

export default function DetailsPage() {
  // Initial state definitions
  const bankDetails = useMemo(
    () => ({
      bankName: "ICICI Bank",
      beneficiaryName: "Aurika Resort",
      accountType: "CA",
      accountNumber: "1234567890",
      ifscCode: "hello123",
      branch: "UDAIPUR, RAJ.",
    }),
    []
  );

  const [overviewDetails, setOverviewDetails] = useState({
    latitude: "24.574037",
    longitude: "73.5600765",
    defaultColor: "#ff0000",
    voucherLandline: "0901992597",
    voucherMobile: "0901992597",
    voucherEmail: "plan.regalweddings@gmail.com",
    website: "https://hello.in",
    address: "01 Kala Rohi Rani Rd Udaipur Rajasthan",
    location:
      "Kala Rohi Rani Rd Udaipur, Udaipur, Rajasthan Pin Code: 313001 India",
    hotelDescription: "Aurika Udaipur Luxury By Lemon Tree Hotels",
    cinNo: "Add/Update CIN No",
    fssaiNo: "Add/Update FSSAI No",
    gstNo: "GST Number or Non GST Declaration",
    panNo: "Add/Update PAN No",
    msmeNo: "MSME/2021/11863",
  });

  const [settings, setSettings] = useState({
    currentPassword: "********",
    newPassword: "*********",
    confirmPassword: "********",
  });

  const documents = useMemo(
    () => [
      "NOC Form",
      "EMT Consent Letter",
      "Desiya Contract Form",
      "HyperGuest Contract Form",
      "Goibibo Contract Form",
      "Ctrip Agreement",
    ],
    []
  );

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState(overviewDetails);

  // Handlers
  const handleFormChange = useCallback((key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSettingsChange = useCallback((key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleUpdate = useCallback(() => {
    setOverviewDetails(formData);
    setIsPopupOpen(false);
  }, [formData]);

  return (
    <div className="min-h-screen bg-white p-6">
      <BankAccount details={bankDetails} />

      <Section
        title="Overview"
        borderColor="border-purple-500"
        headerColor="text-purple-700"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-purple-700 border-b-2 border-purple-300 pb-2">
            Overview
          </h2>
          <button
            onClick={() => setIsPopupOpen(true)}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          {Object.entries(overviewDetails).map(([key, value]) => (
            <p key={key}>
              <span className="font-semibold">
                {key.charAt(0).toUpperCase() +
                  key
                    .slice(1)
                    .replace(/([A-Z])/g, " $1")
                    .trim()}
                :{" "}
              </span>
              {key === "website" ? (
                <a
                  href={value}
                  className="text-purple-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {value}
                </a>
              ) : key === "defaultColor" ? (
                <span style={{ color: value }}>Sample</span>
              ) : (
                value
              )}
            </p>
          ))}
        </div>
      </Section>

      {isPopupOpen && (
        <OverviewForm
          formData={formData}
          onChange={handleFormChange}
          onSubmit={handleUpdate}
          onCancel={() => setIsPopupOpen(false)}
        />
      )}

      <Settings settings={settings} onChange={handleSettingsChange} />
      <Documents documents={documents} />
    </div>
  );
}
