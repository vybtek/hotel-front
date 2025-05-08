"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [admin, setAdmin] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Predefined credentials
  const PREDEFINED_ADMIN = "admin";
  const PREDEFINED_PASSWORD = "admin123";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (admin === PREDEFINED_ADMIN && password === PREDEFINED_PASSWORD) {
      router.push("/dashboard");
    } else {
      alert("Invalid credentials.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed  flex items-center justify-center"
      style={{ backgroundImage: "url('/login.svg')" }}
    >
      <div className="w-full max-w-4xl">
        {/* Login Form Container */}
        <div className="w-full md:w-1/2 mx-auto p-8 bg-white rounded-lg shadow-lg">
          <div className="w-full max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-teal-600 mb-6 text-center">
              Welcome Admin
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="admin"
                >
                  Username
                </label>
                <input
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  type="text"
                  id="admin"
                  value={admin}
                  onChange={(e) => setAdmin(e.target.value)}
                  placeholder="Enter Username"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  required
                />
              </div>
              <button
                type="submit"
                fdprocessedid="rgdnpo"
                className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition duration-300"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
