"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const user = {
    name: "Rahim",
    image: "https://i.pravatar.cc/100",
    role: "user",
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Classes", path: "/classes" },
    { name: "Community Forum", path: "/forum" },
  ];

  const isActive = (path) => pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0F14] text-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">

        {/* LOGO (hover added) */}
        <Link href="/" className="flex items-center gap-2 group">
          <img
            src="/images/logo.png"
            alt="BodySync Logo"
            className="h-10 w-10 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
          />

          <span className="text-xl font-bold transition-colors duration-300 group-hover:text-[#FF6A1C]">
            BodySync
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => {
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                href={item.path}
                className="relative group transition"
              >
                {/* TEXT */}
                <span
                  className={`transition duration-300 ${
                    active
                      ? "text-[#FF6A1C]"
                      : "text-gray-300 group-hover:text-[#FF6A1C]"
                  }`}
                >
                  {item.name}
                </span>

                {/* UNDERLINE */}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-[#FF6A1C] transition-all duration-300 ${
                    active
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}

          {/* DASHBOARD */}
          {user && (
            <Link
              href="/dashboard"
              className="relative group transition"
            >
              <span
                className={`transition duration-300 ${
                  pathname.startsWith("/dashboard")
                    ? "text-[#FF6A1C]"
                    : "text-gray-300 group-hover:text-[#FF6A1C]"
                }`}
              >
                Dashboard
              </span>

              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-[#FF6A1C] transition-all duration-300 ${
                  pathname.startsWith("/dashboard")
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          )}
        </nav>

        {/* RIGHT SIDE */}
        <div className="hidden items-center gap-3 md:flex">

          {!user ? (
            <>
              <Link
                href="/login"
                className="text-gray-300 hover:text-[#FF6A1C] transition"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-md bg-[#FF6A1C] px-4 py-2 font-medium text-black hover:opacity-90 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 group">
                <img
                  src={user.image}
                  alt="user"
                  className="h-9 w-9 rounded-full border border-white/20 transition-transform group-hover:scale-110"
                />

                <span className="text-sm text-gray-300 group-hover:text-white transition">
                  {user.name}
                </span>
              </div>

              <button
                onClick={() => console.log("logout")}
                className="rounded-md border border-white/10 px-3 py-1 text-sm text-gray-300 hover:border-[#FF6A1C] hover:text-[#FF6A1C] transition"
              >
                Logout
              </button>
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
        <div className="border-t border-white/10 bg-[#0B0F14] px-4 py-4 md:hidden">

          {navLinks.map((item) => {
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setOpen(false)}
                className="relative block py-2 transition"
              >
                <span
                  className={`transition ${
                    active
                      ? "text-[#FF6A1C]"
                      : "text-gray-300 hover:text-[#FF6A1C]"
                  }`}
                >
                  {item.name}
                </span>

                <span
                  className={`absolute left-0 bottom-1 h-[2px] bg-[#FF6A1C] transition-all duration-300 ${
                    active ? "w-10" : "w-0"
                  }`}
                />
              </Link>
            );
          })}

          {user && (
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="block py-2 text-gray-300 hover:text-[#FF6A1C]"
            >
              Dashboard
            </Link>
          )}

          <div className="mt-3 border-t border-white/10 pt-3">
            {!user ? (
              <>
                <Link href="/login" className="block py-2 text-gray-300 hover:text-[#FF6A1C]">
                  Login
                </Link>

                <Link
                  href="/register"
                  className="mt-2 inline-block rounded-md bg-[#FF6A1C] px-4 py-2 text-black"
                >
                  Register
                </Link>
              </>
            ) : (
              <button className="py-2 text-red-400">
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}