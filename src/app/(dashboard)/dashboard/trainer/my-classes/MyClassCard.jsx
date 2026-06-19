import { Edit, Trash2, Users } from "lucide-react";

const MyClassCard = ({ cls }) => {
  return (
    <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-sm hover:shadow-md transition">

      {/* Left Side */}
      <div className="flex items-center gap-4">
        {/* Image */}
        <img
          src={cls.image}
          alt={cls.className}
          className="w-16 h-16 rounded-xl object-cover border"
        />

        {/* Info */}
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {cls.className}
            </h2>

            <span
              className={`text-xs px-3 py-1 rounded-full font-medium ${
                cls.status === "Approved"
                  ? "bg-green-100 text-green-600"
                  : cls.status === "Pending"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {cls.status}
            </span>
          </div>

          <div className="text-sm text-gray-500 mt-1 flex flex-wrap gap-3">
            <span>🏷 {cls.category}</span>
            <span>⏱ {cls.duration}</span>
            <span>💲 {cls.price}</span>
          </div>
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex gap-3">
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl border text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800">
          <Users size={16} /> Enrolled
        </button>

        <button className="flex items-center gap-2 px-4 py-2 rounded-xl border text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20">
          <Edit size={16} /> Edit
        </button>

        <button className="flex items-center gap-2 px-4 py-2 rounded-xl border text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
          <Trash2 size={16} /> Delete
        </button>
      </div>
    </div>
  );
};

export default MyClassCard;