// components/admin/StatsCard.jsx
import React from "react";

const StatsCard = ({ label, value, icon }) => {
    return (
        <div
            className="
                bg-white dark:bg-gray-800
                border border-gray-200 dark:border-gray-700
                shadow-md hover:shadow-lg
                rounded-xl p-5
                flex items-center gap-4
                transition-all duration-300
            "
        >
            <div className="text-3xl text-blue-600 dark:text-blue-400">
                {icon}
            </div>

            <div>
                <h3 className="text-sm text-gray-500 dark:text-gray-400">
                    {label}
                </h3>

                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {value ?? 0}
                </p>
            </div>
        </div>
    );
};

export default StatsCard;