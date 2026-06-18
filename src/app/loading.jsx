export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#0B0F14]">
      
      {/* Logo */}
      <div className="relative">
        <div className="h-20 w-20 rounded-full border-4 border-[#FF6A1C]/20"></div>

        <div className="absolute inset-0 h-20 w-20 rounded-full border-4 border-transparent border-t-[#FF6A1C] animate-spin"></div>
      </div>

      {/* Brand */}
      <h1 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
        Body<span className="text-[#FF6A1C]">Sync</span>
      </h1>

      {/* Text */}
      <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
        Loading your fitness journey...
      </p>

      {/* Dots */}
      <div className="mt-5 flex gap-2">
        <span className="h-2 w-2 rounded-full bg-[#FF6A1C] animate-bounce"></span>
        <span
          className="h-2 w-2 rounded-full bg-[#FF6A1C] animate-bounce"
          style={{ animationDelay: "0.15s" }}
        ></span>
        <span
          className="h-2 w-2 rounded-full bg-[#FF6A1C] animate-bounce"
          style={{ animationDelay: "0.3s" }}
        ></span>
      </div>
    </div>
  );
}