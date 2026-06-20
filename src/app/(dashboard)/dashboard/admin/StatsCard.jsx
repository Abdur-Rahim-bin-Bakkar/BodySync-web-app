// components/admin/StatsCard.jsx
import React from "react";

const StatsCard = ({ label, value, icon }) => {
    return (
        <div className="bg-white shadow-md rounded-xl p-5 flex items-center gap-4 hover:shadow-lg transition">
            <div className="text-3xl text-blue-600">{icon}</div>

            <div>
                <h3 className="text-gray-500 text-sm">{label}</h3>
                <p className="text-2xl font-bold">{value ?? 0}</p>
            </div>
        </div>
    );
};

export default StatsCard;