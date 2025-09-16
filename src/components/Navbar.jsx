import React from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { to: "/", label: "홈" },
  { to: "/dashboard", label: "대시보드" },
  { to: "/orders", label: "작업지시" },
  { to: "/workers", label: "작업자" },
  { to: "/login", label: "로그인" },
];

export default function Navbar() {
  const location = useLocation();
  return (
  <nav className="flex flex-wrap gap-1 sm:gap-4 p-1 sm:p-4 bg-blue-100 border-b border-blue-200 justify-center md:justify-start text-[11px] sm:text-base">
      {navItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={`px-2 sm:px-3 py-1 rounded hover:bg-blue-200 transition-colors font-medium text-[11px] sm:text-base ${
            location.pathname === item.to ? "bg-blue-600 text-white" : "text-blue-700"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
