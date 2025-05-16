"use client";

const DashboardLoader = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center">
        {/* Hotel key animation */}
        <div className="relative mb-8">
          <div className="w-16 h-8 bg-amber-500 rounded-lg animate-pulse"></div>
          <div className="absolute -top-4 left-6 w-4 h-4 bg-amber-300 rounded-full animate-bounce"></div>
        </div>

        {/* Progress dots with staggered animation */}
        <div className="flex space-x-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
              style={{
                animationDelay: `${i * 0.1}s`,
                backgroundColor: `hsl(${i * 70}, 80%, 60%)`,
              }}
            ></div>
          ))}
        </div>
        <p className="mt-4 text-gray-600 animate-pulse">
          Preparing your dashboard...
        </p>
      </div>
    </div>
  );
};

export default DashboardLoader;
