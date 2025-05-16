import React from 'react';

export const BookingLoader = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
      {/* Spinning circle */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-t-amber-500 border-gray-200 rounded-full animate-spin"></div>
      </div>
      {/* Loading text */}
      <span className="text-gray-600 text-lg font-medium animate-pulse">
        Loading...
      </span>

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};