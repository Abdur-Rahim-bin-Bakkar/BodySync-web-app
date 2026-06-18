"use client";

import Link from "next/link";
import {
  FaXTwitter,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#0B0F14] text-gray-300 border-t border-white/10 ">
      <div className="mx-auto max-w-7xl px-4 py-12">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">

          {/* LOGO */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-3 group cursor-pointer">

              <img
                src="/images/logo.png"
                alt="BodySync Logo"
                className="h-10 w-10 rounded-full transition-transform duration-300 group-hover:scale-110"
              />

              <h1 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-[#FF6A1C]">
                BodySync
              </h1>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              BodySync is a modern fitness & gym management platform
              for trainers, members, and admins.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h2 className="text-white font-semibold mb-4">
              Quick Links
            </h2>

            <ul className="space-y-3">

              {[
                { name: "Home", href: "/" },
                { name: "All Classes", href: "/classes" },
                { name: "Community Forum", href: "/forum" },
                { name: "Login", href: "/login" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="relative text-gray-300 transition-colors duration-300 hover:text-[#FF6A1C] group"
                  >
                    <span className="relative">
                      {item.name}

                      {/* underline animation */}
                      <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#FF6A1C] transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h2 className="text-white font-semibold mb-4">
              Contact Info
            </h2>

            <div className="space-y-2 text-sm">
              <p className="hover:text-[#FF6A1C] transition">
                📍 Dhaka, Bangladesh
              </p>
              <p className="hover:text-[#FF6A1C] transition">
                📧 support@bodysync.com
              </p>
              <p className="hover:text-[#FF6A1C] transition">
                📞 +880 1873-135444
              </p>
            </div>
          </div>
        </div>

        {/* SOCIAL + BOTTOM */}
        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col items-center gap-6">

          {/* SOCIAL ICONS */}
          <div className="flex items-center gap-6 text-xl">

            {[
              FaFacebookF,
              FaInstagram,
              FaXTwitter,
              FaYoutube,
              FaLinkedinIn,
            ].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="group relative text-gray-400 transition-all duration-300 hover:text-[#FF6A1C] hover:-translate-y-1"
              >
                <Icon className="transition-transform duration-300 group-hover:scale-125" />

                {/* glow effect */}
                <span className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-40 bg-[#FF6A1C] transition" />
              </a>
            ))}
          </div>

          {/* COPYRIGHT */}
          <p className="text-sm text-gray-500 text-center hover:text-gray-300 transition">
            © {new Date().getFullYear()} BodySync. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}