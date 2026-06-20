// components/admin/StatsGrid.jsx
import React from "react";
import StatsCard from "./StatsCard";
import {
    FaUsers,
    FaChalkboardTeacher,
    FaClipboardList,
    FaComments,
    FaCommentDots,
    FaUserPlus,
} from "react-icons/fa";

const StatsGrid = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
            <StatsCard label="Total Users" value={stats?.totalUsers} icon={<FaUsers />} />
            <StatsCard label="Total Classes" value={stats?.totalClasses} icon={<FaChalkboardTeacher />} />
            <StatsCard label="Booked Classes" value={stats?.totalBookedClasses} icon={<FaClipboardList />} />
            <StatsCard label="Forum Posts" value={stats?.totalForumPosts} icon={<FaComments />} />
            <StatsCard label="Comments" value={stats?.totalComments} icon={<FaCommentDots />} />
            <StatsCard label="Trainer Applications" value={stats?.totalTrainerApplications} icon={<FaUserPlus />} />
        </div>
    );
};

export default StatsGrid;