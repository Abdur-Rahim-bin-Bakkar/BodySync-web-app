"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  BookOpen,
  MessageCircle,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { useUserSessionClient } from "@/lib/session/client";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const session = useUserSessionClient();
  const user = session?.user || null;

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Classes", path: "/classes", icon: BookOpen },
    { name: "Forum", path: "/forum", icon: MessageCircle },
  ];

  const isActive = (path) => pathname === path;

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  // 🔥 Prevent SSR hydration mismatch
  if (!mounted) return null;

  return (
    <header
      className="
        sticky top-0 z-50 border-b backdrop-blur transition-colors
        bg-white text-gray-900 border-gray-200
        dark:bg-[#0B0F14] dark:text-white dark:border-white/10
      "
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">

        {/* LOGO */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link href="/" className="flex items-center gap-2 group">
            <img
              src="/images/logo.png"
              className="h-10 w-10 rounded-full"
              alt="logo"
            />
            <span className="text-xl font-bold group-hover:text-[#FF6A1C] transition">
              BodySync
            </span>
          </Link>
        </motion.div>

        {/* NAV */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((item, i) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={item.path} className="flex items-center gap-1 group relative">

                  <Icon
                    size={16}
                    className={
                      active
                        ? "text-[#FF6A1C]"
                        : "text-gray-500 dark:text-gray-400 group-hover:text-[#FF6A1C]"
                    }
                  />

                  <span
                    className={
                      active
                        ? "text-[#FF6A1C]"
                        : "text-gray-700 dark:text-gray-300 group-hover:text-[#FF6A1C]"
                    }
                  >
                    {item.name}
                  </span>

                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-[#FF6A1C] transition-all ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* RIGHT */}
        <div className="hidden md:flex items-center gap-3">

          <ThemeToggle />

          {user ? (
            <>
              <Link
                href="/dashboard"
                className="
                  px-3 py-1 rounded-md border transition
                  border-gray-200 text-gray-700 hover:border-[#FF6A1C] hover:text-[#FF6A1C]
                  dark:border-white/10 dark:text-gray-300
                "
              >
                <LayoutDashboard size={16} className="inline mr-1" />
                Dashboard
              </Link>

              <div className="flex items-center gap-2">
                <img
                  src={user.image || "/images/user.png"}
                  className="h-9 w-9 rounded-full border border-gray-200 dark:border-white/20"
                />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Hi, <span className="font-semibold text-gray-900 dark:text-white">{user.name}</span>
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="
                  flex items-center gap-1 px-3 py-1 rounded-md text-sm
                  text-red-500 border border-red-200 hover:bg-red-50
                  dark:text-red-400 dark:border-red-500/20 dark:hover:bg-red-500/10
                "
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              

              <Link href="/login" className="text-gray-600 dark:text-gray-300 hover:text-[#FF6A1C]">
                Login
              </Link>

              <Link
                href="/register"
                className="bg-[#FF6A1C] text-black px-4 py-2 rounded-md hover:opacity-90"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* MOBILE */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              md:hidden border-t px-4 py-4 space-y-2
              bg-white text-gray-900 border-gray-200
              dark:bg-[#0B0F14] dark:text-white dark:border-white/10
            "
          >
            {navLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 py-2 text-gray-600 dark:text-gray-300 hover:text-[#FF6A1C]"
                >
                  <Icon size={16} />
                  {item.name}
                </Link>
              );
            })}

            {user && (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2 mt-2 rounded-md text-red-500 border border-red-200 dark:border-red-500/20 hover:bg-red-50 dark:hover:bg-red-500/10"
              >
                <LogOut size={16} />
                Logout
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}