"use client";

import Link from "next/link";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import SidebarItem from "./SidebarItem";
import { useUserSessionClient } from "@/lib/session/client";

const SidebarContent = ({ pathname, menuItems, onClick, collapsed }) => {
    const session = useUserSessionClient();
    const user = session?.user;

    return (
        <div
            className={`h-screen bg-white dark:bg-[#0B0F14] border-r flex flex-col transition-all duration-300
      ${collapsed ? "w-20" : "w-72"}`}
        >
            {/* Logo */}
            <Link
                href="/"
                className="px-4 py-5 border-b flex items-center gap-2 justify-center"
            >
                <Image src="/images/logo.png" alt="logo" width={32} height={32} />
                {!collapsed && (
                    <span className="text-xl font-bold">BodySync</span>
                )}
            </Link>

            {/* Profile */}
            <div className="p-4 border-b flex items-center gap-3 justify-center">
                {user?.image ? (
                    <Image
                        width={400}
                        height={300}
                        alt="user image"
                        unoptimized
                        src={user.image}
                        className="w-10 h-10 rounded-full"
                    />
                ) : (
                    <FaUserCircle className="text-3xl text-gray-400" />
                )}

                {!collapsed && (
                    <div>
                        <p className="text-sm font-semibold">{user?.name}</p>
                        <p className="text-xs text-orange-500">{user?.role}</p>
                    </div>
                )}
            </div>

            {/* Menu */}
            <div className="flex-1 px-3 py-4 space-y-2">
                {menuItems.map((item) => (
                    <SidebarItem
                        key={item.href}
                        item={item}
                        isActive={pathname === item.href}
                        onClick={onClick}
                        collapsed={collapsed}
                    />
                ))}
            </div>

            {/* Footer */}
            {!collapsed && (
                <div className="text-xs text-center p-3 text-gray-400 border-t">
                    © {new Date().getFullYear()}
                </div>
            )}
        </div>
    );
};

export default SidebarContent;