"use client";

import Link from "next/link";

const SidebarItem = ({ item, isActive, onClick, collapsed }) => {
  return (
    <Link href={item.href} onClick={onClick}>
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all justify-center
        ${collapsed ? "justify-center" : ""}
        ${
          isActive
            ? "bg-orange-500 text-white"
            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
      >
        <span className="text-lg">{item.icon}</span>

        {!collapsed && <span className="text-sm">{item.name}</span>}
      </div>
    </Link>
  );
};

export default SidebarItem;