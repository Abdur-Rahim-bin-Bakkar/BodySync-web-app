"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome,
  FaPlusCircle,
  FaClipboardList,
  FaComments,
  FaRegNewspaper,
  FaBars,
  FaTimes,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";

import SidebarContent from "./SidebarContent";

const Sidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { name: "Overview", icon: <FaHome />, href: "/dashboard/trainer" },
    { name: "Add Class", icon: <FaPlusCircle />, href: "/dashboard/trainer/add-class" },
    { name: "My Classes", icon: <FaClipboardList />, href: "/dashboard/trainer/my-classes" },
    { name: "Add Forum", icon: <FaComments />, href: "/dashboard/trainer/add-forum" },
    { name: "My Forum", icon: <FaRegNewspaper />, href: "/dashboard/trainer/my-forum" },
  ];

  return (
    <>
      {/* 🔥 TOP BAR (mobile) */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b">
        <button onClick={() => setOpen(true)}>
          <FaBars className="text-2xl" />
        </button>
      </div>

      {/* 💻 DESKTOP SIDEBAR */}
      <div className="hidden lg:flex h-screen">

        {/* Sidebar */}
        <motion.div
          animate={{ width: collapsed ? 80 : 288 }}
          transition={{ duration: 0.3 }}
          className="h-full bg-white dark:bg-[#0B0F14] border-r flex flex-col relative"
        >
          {/* Collapse button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-3 top-6 bg-orange-500 text-white p-1 rounded-full shadow"
          >
            {collapsed ? <FaAngleRight /> : <FaAngleLeft />}
          </button>

          <SidebarContent
            pathname={pathname}
            menuItems={menuItems}
            collapsed={collapsed}
          />
        </motion.div>
      </div>

      {/* 📱 MOBILE DRAWER */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            {/* overlay */}
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setOpen(false)}
            />

            {/* drawer */}
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3 }}
              className="relative z-50"
            >
              <SidebarContent
                pathname={pathname}
                menuItems={menuItems}
                onClick={() => setOpen(false)}
              />

              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-xl"
              >
                <FaTimes />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;