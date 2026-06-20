"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function AdminStatsChart({ stats }) {
  const data = [
    {
      name: "Users",
      value: stats?.totalUsers || 0,
    },
    {
      name: "Classes",
      value: stats?.totalClasses || 0,
    },
    {
      name: "Booked",
      value: stats?.totalBookedClasses || 0,
    },
    {
      name: "Comments",
      value: stats?.totalComments || 0,
    },
    {
      name: "Forum",
      value: stats?.totalForumPosts || 0,
    },
    {
      name: "Trainer Apps",
      value: stats?.totalTrainerApplications || 0,
    },
  ];

  return (
    <div className="w-full h-[350px] bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
      <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
        Platform Overview
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}