export const BookingLoader = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center">
      <div className="relative w-64 h-48 mb-8">
        {/* Calendar animation */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-48 bg-white border-2 border-gray-200 rounded-lg shadow-lg">
          <div className="h-8 bg-amber-600 rounded-t-md flex items-center justify-center">
            <span className="text-white font-medium text-sm">Booking...</span>
          </div>
          {/* Calendar dates animation */}
          <div className="grid grid-cols-7 gap-1 p-2">
            {[...Array(31)].map((_, i) => (
              <div
                key={i}
                className={`h-6 flex items-center justify-center text-xs font-medium 
                    ${i < 7 ? "text-amber-600" : "text-gray-700"} 
                    ${i === 15 ? "bg-amber-100 rounded-full" : ""}`}
                style={{
                  animationDelay: `${i * 0.05}s`,
                  opacity: i < 7 ? 1 : 0.6,
                }}
              >
                {i < 7 ? ["S", "M", "T", "W", "T", "F", "S"][i] : i - 6}
              </div>
            ))}
          </div>
        </div>

        {/* Key animation */}
        <div className="absolute -bottom-6 -right-4 animate-bounce">
          <div className="w-8 h-16 bg-yellow-500 rounded-full relative">
            <div className="w-6 h-6 bg-yellow-400 rounded-full absolute -top-3 left-1"></div>
            <div className="w-1 h-3 bg-yellow-700 absolute top-2 left-3.5"></div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-600 rounded-full animate-progress"
          style={{
            animation: "progress 2s ease-in-out infinite",
          }}
        ></div>
      </div>

      <style jsx>{`
        @keyframes progress {
          0% {
            width: 0%;
          }
          50% {
            width: 100%;
          }
          100% {
            width: 0%;
          }
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};
