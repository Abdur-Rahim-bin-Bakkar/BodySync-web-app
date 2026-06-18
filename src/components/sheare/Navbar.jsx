"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Menu,
  X,
  Home,
  BookOpen,
  MessageCircle,
  LayoutDashboard,
  LogOut,
  User,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useUserSessionClient } from "@/lib/session/client";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const session = useUserSessionClient();
  const user = session?.user || null;

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Classes", path: "/classes", icon: BookOpen },
    { name: "Forum", path: "/forum", icon: MessageCircle },
  ];

  const isActive = (path) => pathname === path;

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.push("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0F14] text-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <img
            src="/images/logo.png"
            className="h-10 w-10 rounded-full transition-transform group-hover:scale-110"
            alt="logo"
          />
          <span className="text-xl font-bold group-hover:text-[#FF6A1C] transition">
            BodySync
          </span>
        </Link>

        {/* NAV LINKS */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                href={item.path}
                className="relative group flex items-center gap-1"
              >
                <Icon
                  size={16}
                  className={
                    active
                      ? "text-[#FF6A1C]"
                      : "text-gray-400 group-hover:text-[#FF6A1C]"
                  }
                />

                <span
                  className={`transition ${
                    active
                      ? "text-[#FF6A1C]"
                      : "text-gray-300 group-hover:text-[#FF6A1C]"
                  }`}
                >
                  {item.name}
                </span>

                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-[#FF6A1C] transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* RIGHT SIDE DESKTOP */}
        <div className="hidden md:flex items-center gap-4">

          {user ? (
            <>
              {/* DASHBOARD */}
              <Link
                href="/dashboard"
                className="flex items-center gap-1 px-3 py-1 rounded-md border border-white/10 hover:border-[#FF6A1C] hover:text-[#FF6A1C] transition"
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>

              {/* USER */}
              <div className="flex items-center gap-2">
                <img
                  src={user.image || "/images/user.png"}
                  className="h-9 w-9 rounded-full border border-white/20"
                  alt="user"
                />
                <span className="text-sm text-gray-300">
                  <span className="font-bold">Hi,</span>
                  {user.name}
                </span>
              </div>

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-1 rounded-md text-sm text-red-400 border border-red-500/20 hover:bg-red-500/10 transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-300 hover:text-[#FF6A1C]">
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

        {/* MOBILE BUTTON */}
        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden border-t border-white/10 px-4 py-4 space-y-2">

          {/* NAV LINKS */}
          {navLinks.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 py-2 text-gray-300 hover:text-[#FF6A1C]"
              >
                <Icon size={16} />
                {item.name}
              </Link>
            );
          })}

          {/* DASHBOARD */}
          {user && (
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 py-2 text-gray-300 hover:text-[#FF6A1C]"
            >
              <LayoutDashboard size={16} />
              Dashboard
            </Link>
          )}

          {/* USER PROFILE MOBILE */}
          {user && (
            <div className="flex items-center gap-3 py-3 border-t border-white/10 mt-2">
              <img
                src={user.image || "/images/user.png"}
                className="h-10 w-10 rounded-full border"
                alt="user"
              />
              <div>
                <p className="text-sm text-gray-400">Hi,</p>
                <p className="font-semibold text-white">{user.name}</p>
              </div>
            </div>
          )}

          {/* LOGOUT */}
          {user ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2 mt-2 rounded-md text-red-400 border border-red-500/20 hover:bg-red-500/10 transition"
            >
              <LogOut size={16} />
              Logout
            </button>
          ) : (
            <div className="mt-3 space-y-2">
              <Link href="/login" className="block text-gray-300">
                Login
              </Link>

              <Link
                href="/register"
                className="inline-block bg-[#FF6A1C] text-black px-4 py-2 rounded-md"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}