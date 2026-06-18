"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // demo user (replace with Better Auth session)
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

  const handleLogout = () => {
    console.log("logout");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0F14] text-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">

        {/* LOGO UPDATED ONLY */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/images/logo.png"
            alt="BodySync Logo"
            className="h-10 w-10 rounded-full object-cover"
          />

          <span className="text-xl font-bold">
            BodySync
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`transition ${
                isActive(item.path)
                  ? "text-[#FF6A1C]"
                  : "text-gray-300 hover:text-[#FF6A1C]"
              }`}
            >
              {item.name}
            </Link>
          ))}

          {/* Conditional Dashboard */}
          {user && (
            <Link
              href="/dashboard"
              className={`transition ${
                pathname.startsWith("/dashboard")
                  ? "text-[#FF6A1C]"
                  : "text-gray-300 hover:text-[#FF6A1C]"
              }`}
            >
              Dashboard
            </Link>
          )}
        </nav>

        {/* RIGHT SIDE */}
        <div className="hidden items-center gap-3 md:flex">

          {!user ? (
            <>
              <Link
                href="/login"
                className="text-gray-300 hover:text-white"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-md bg-[#FF6A1C] px-4 py-2 font-medium text-black hover:opacity-90"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              {/* PROFILE */}
              <div className="flex items-center gap-2">
                <img
                  src={user.image}
                  alt="user"
                  className="h-9 w-9 rounded-full border border-white/20"
                />

                <span className="text-sm text-gray-300">
                  {user.name}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="rounded-md border border-white/10 px-3 py-1 text-sm text-gray-300 hover:border-[#FF6A1C] hover:text-[#FF6A1C]"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="border-t border-white/10 bg-[#0B0F14] px-4 py-4 md:hidden">

          {navLinks.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setOpen(false)}
              className="block py-2 text-gray-300 hover:text-[#FF6A1C]"
            >
              {item.name}
            </Link>
          ))}

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
                <Link
                  href="/login"
                  className="block py-2 text-gray-300"
                >
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
              <button
                onClick={handleLogout}
                className="py-2 text-red-400"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}