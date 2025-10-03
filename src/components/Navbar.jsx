import React from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { to: "/", label: "홈" },
  { to: "/dashboard", label: "대시보드" },
  { to: "/orders", label: "작업지시" },
  { to: "/workers", label: "작업자" },
  { to: "/scan", label: "QR스캔" },
  { to: "/login", label: "로그인" },
];

export default function Navbar() {
  const location = useLocation();
  return (
    <nav className="app-navbar shadow-md">
      {navItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={`nav-link transition-all duration-150 ${location.pathname === item.to ? "nav-link-active scale-105" : ""}`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
