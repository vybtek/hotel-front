"use client";

import { useState } from "react";

export default function DetailsPage() {
  const [bankDetails] = useState({
    bankName: "ICICI Bank",
    beneficiaryName: "Aurika Resort",
    accountType: "CA",
    accountNumber: "1234567890",
    ifscCode: "hello123",
    branch: "UDAIPUR, RAJ.",
  });

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

  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    google: "",
    gplus: "",
    instagram: "",
    linkedin: "",
    pinterest: "",
    tripadvisor: "",
    twitter: "",
    youtube: "",
  });

  const [settings, setSettings] = useState({
    currentPassword: "********",
    newPassword: "********",
    confirmPassword: "********",
  });

  const [documents] = useState([
    "NOC Form",
    "EMT Consent Letter",
    "Desiya Contract Form",
    "HyperGuest Contract Form",
    "Goibibo Contract Form",
    "Ctrip Agreement",
    // "Letter Head PDF",
    // "Vendor Registration Form",
    // "HappyEasyGo MOU",
    // "HappyEasyGo Agreement",
    // "MMT",
    // "Aubergine Hospitality and Travel Private Limited Form",
    // "Yatra Form",
    // "Ease My Trip Contract Form",
    // "AkbarTravels Contract Form",
    // "Easemytrip Creation Form",
    // "RoomkeyBooking Contract Form",
  ]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({ ...overviewDetails });

  const handleSocialLinkChange = (key, value) => {
    setSocialLinks((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSettingsChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleFormChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleUpdate = () => {
    setOverviewDetails({ ...formData });
    setIsPopupOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6">
      {/* Navigation */}
      {/* <nav className="flex justify-around bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl shadow-lg mb-6">
        <button className="hover:text-yellow-300 font-semibold transition duration-300">BANK ACCOUNT</button>
        <button className="hover:text-yellow-300 font-semibold transition duration-300">OVERVIEW</button>
        <button className="hover:text-yellow-300 font-semibold transition duration-300">SOCIAL LINKS</button>
        <button className="hover:text-yellow-300 font-semibold transition duration-300">MENU LIST</button>
        <button className="hover:text-yellow-300 font-semibold transition duration-300">SETTINGS</button>
        <button className="hover:text-yellow-300 font-semibold transition duration-300">DOCUMENTS</button>
      </nav> */}

      {/* Bank Account Section */}
      <div className="bg-white p-6 rounded-2xl shadow-2xl mb-6 border-l-8 border-blue-500 transform hover:-translate-y-2 transition duration-300">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 border-b-2 border-blue-300 pb-2">
          Bank Account
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <p>
            <span className="font-semibold text-gray-700">Bank Name:</span>
            {bankDetails.bankName}
          </p>
          <p>
            <span className="font-semibold text-gray-700">
              Beneficiary Name:
            </span>{" "}
            {bankDetails.beneficiaryName}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Account Type:</span>
            {bankDetails.accountType}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Account Number:</span>
            {bankDetails.accountNumber}
          </p>
          <p>
            <span className="font-semibold text-gray-700">IFSC Code:</span>
            {bankDetails.ifscCode}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Branch:</span>
            {bankDetails.branch}
          </p>
        </div>
        <div className="mt-4 flex space-x-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
            Visible On Voucher
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
            Stop Payment
          </button>
        </div>
      </div>

      {/* Overview Section */}
      <div className="bg-white p-6 rounded-2xl shadow-2xl mb-6 border-t-8 border-purple-500 transform hover:-translate-y-2 transition duration-300">
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
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              ></path>
            </svg>
            Edit
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <p>
            <span className="font-semibold text-gray-700">Latitude:</span>
            {overviewDetails.latitude}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Longitude:</span>
            {overviewDetails.longitude}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Default Color:</span>
            <span style={{ color: overviewDetails.defaultColor }}>Sample</span>
          </p>
          <p>
            <span className="font-semibold text-gray-700">
              Voucher Landline:
            </span>
            {overviewDetails.voucherLandline}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Voucher Mobile:</span>
            {overviewDetails.voucherMobile}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Voucher Email:</span>
            {overviewDetails.voucherEmail}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Website:</span>
            <a
              href={overviewDetails.website}
              className="text-purple-500 hover:underline"
              target="blank"
            >
              {overviewDetails.website}
            </a>
          </p>
          <p>
            <span className="font-semibold text-gray-700">Address:</span>
            {overviewDetails.address}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Location:</span>
            {overviewDetails.location}
          </p>
          <p>
            <span className="font-semibold text-gray-700">
              Hotel Description:
            </span>{" "}
            {overviewDetails.hotelDescription}
          </p>
          <p>
            <span className="font-semibold text-gray-700">CIN No:</span>
            {overviewDetails.cinNo}
          </p>
          <p>
            <span className="font-semibold text-gray-700">FSSAI No:</span>
            {overviewDetails.fssaiNo}
          </p>
          <p>
            <span className="font-semibold text-gray-700">GST No:</span>
            {overviewDetails.gstNo}
          </p>
          <p>
            <span className="font-semibold text-gray-700">PAN No:</span>
            {overviewDetails.panNo}
          </p>
          <p>
            <span className="font-semibold text-gray-700">MSME No:</span>
            {overviewDetails.msmeNo}
          </p>
        </div>
      </div>

      {/* Popup for Editing Overview Details */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-purple-700">
                Update General Details
              </h2>
              <button
                onClick={() => setIsPopupOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Latitude
                </label>
                <input
                  type="text"
                  value={formData.latitude}
                  onChange={(e) => handleFormChange("latitude", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Longitude
                </label>
                <input
                  type="text"
                  value={formData.longitude}
                  onChange={(e) =>
                    handleFormChange("longitude", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Default Color
                </label>
                <input
                  type="text"
                  value={formData.defaultColor}
                  onChange={(e) =>
                    handleFormChange("defaultColor", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Voucher Landline No
                </label>
                <input
                  type="text"
                  value={formData.voucherLandline}
                  onChange={(e) =>
                    handleFormChange("voucherLandline", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Voucher Mobile
                </label>
                <input
                  type="text"
                  value={formData.voucherMobile}
                  onChange={(e) =>
                    handleFormChange("voucherMobile", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Voucher Email
                </label>
                <input
                  type="email"
                  value={formData.voucherEmail}
                  onChange={(e) =>
                    handleFormChange("voucherEmail", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-1">
                  Website
                </label>
                <input
                  type="text"
                  value={formData.website}
                  onChange={(e) => handleFormChange("website", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleFormChange("address", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Landmark
                </label>
                <input
                  type="text"
                  value={formData.location.split(",")[0]} // Extracting landmark from location
                  onChange={(e) =>
                    handleFormChange(
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
                  value={formData.location.match(/Pin Code: (\d+)/)?.[1] || ""} // Extracting pin code from location
                  onChange={(e) => {
                    const newPin = e.target.value;
                    const updatedLocation = formData.location.replace(
                      /Pin Code: \d+/,
                      `Pin Code: ${newPin}`
                    );
                    handleFormChange("location", updatedLocation);
                  }}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-1">
                  Hotel Description
                </label>
                <textarea
                  value={formData.hotelDescription}
                  onChange={(e) =>
                    handleFormChange("hotelDescription", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  rows="3"
                />
              </div>
            </div>
            <button
              onClick={handleUpdate}
              className="mt-4 bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition"
            >
              Update
            </button>
          </div>
        </div>
      )}

      {/* Social Links Section */}
      {/* <div className="bg-white p-6 rounded-2xl shadow-2xl mb-6 border-r-8 border-green-500 transform hover:-translate-y-2 transition duration-300">
        <h2 className="text-2xl font-bold text-green-500 mb-4 border-b-2 border-green-300 pb-2">
          Social Links
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          {Object.entries(socialLinks).map(([key, value]) => (
            <p key={key}>
              <span className="font-semibold text-gray-700">
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </span>
              <input
                type="text"
                value={value}
                onChange={(e) => handleSocialLinkChange(key, e.target.value)}
                className="w-full p-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </p>
          ))}
        </div>
        <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
          Add Link
        </button>
      </div> */}

      {/* Settings Section */}
      <div className="bg-white p-6 rounded-2xl shadow-2xl mb-6 border-b-8 border-yellow-500 transform hover:-translate-y-2 transition duration-300">
        <h2 className="text-2xl font-bold text-yellow-500 mb-4 border-b-2 border-yellow-300 pb-2">
          Settings
        </h2>
        <div className="space-y-4 text-gray-700">
          <p>
            <span className="font-semibold text-gray-700">
              Current Password:
            </span>
            <input
              type="password"
              value={settings.currentPassword}
              readOnly
              className="w-[50%] ml-4 p-2 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
            />
          </p>
          <p>
            <span className="font-semibold text-gray-700">New Password:</span>
            <input
              type="password"
              value={settings.newPassword}
              onChange={(e) =>
                handleSettingsChange("newPassword", e.target.value)
              }
              className="w-[50%] ml-11 p-2 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
            />
          </p>
          <p>
            <span className="font-semibold text-gray-700">
              Confirm Password:
            </span>
            <input
              type="password"
              value={settings.confirmPassword}
              onChange={(e) =>
                handleSettingsChange("confirmPassword", e.target.value)
              }
              className="w-[50%] ml-4 p-2 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
            />
          </p>
        </div>
        <button className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition">
          Change
        </button>
      </div>

      {/* Documents Section */}
      <div className="bg-white p-6 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold text-red-700 mb-4 border-b-2 border-red-300 pb-2">
          Documents
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-red-100">
                <th className="p-3 border-b-2 border-red-300 text-red-700">
                  Document Type
                </th>
                <th className="p-3 border-b-2 border-red-300 text-red-700">
                  View
                </th>
                <th className="p-3 border-b-2 border-red-300 text-red-700">
                  Download
                </th>
                <th className="p-3 border-b-2 border-red-300 text-red-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, index) => (
                <tr
                  key={index}
                  className="hover:bg-red-50 transition duration-200"
                >
                  <td className="p-3 border-b border-red-200">{doc}</td>
                  <td className="p-3 border-b border-red-200">
                    <button className="text-blue-500 hover:underline">
                      View
                    </button>
                  </td>
                  <td className="p-3 border-b border-red-200">
                    <button className="text-blue-500 hover:underline">
                      Download
                    </button>
                  </td>
                  <td className="p-3 border-b border-red-200">
                    <button className="text-red-500 hover:underline">
                      Delete
                    </button>
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
      </div>
    </div>
  );
}
