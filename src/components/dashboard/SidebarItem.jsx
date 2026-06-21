"use client";

import Link from "next/link";

const SidebarItem = ({ item, isActive, onClick, collapsed }) => {
  return (
    <Link href={item.href} onClick={onClick}>
      <div
        className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all
    ${collapsed ? "justify-center" : ""}
    ${isActive
            ? "text-orange-500 font-semibold bg-orange-50 dark:bg-orange-500/10"
            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
      >
        {isActive && (
          <span className="absolute left-0 top-0 h-full w-1 bg-orange-500 rounded-r-full"></span>
        )}

        <span className="text-lg">{item.icon}</span>

        {!collapsed && <span className="text-sm">{item.name}</span>}
      </div>
    </Link>
  );
};

export default SidebarItem;