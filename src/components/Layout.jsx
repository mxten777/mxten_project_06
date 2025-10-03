import React from "react";
import Navbar from "./Navbar";
import NetworkStatus from "./NetworkStatus";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-hero">
      <NetworkStatus />
      <header className="app-header shadow-lg">
        <div className="header-inner">
          <span className="header-logo animate-bounce">📝</span>
          <span className="header-title heading-2">모바일/태블릿 기반 작업지시서</span>
        </div>
      </header>
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-2 sm:p-4 md:p-8 w-full max-w-7xl mx-auto text-[11px] sm:text-base">{children}</main>
      <footer className="bg-brand text-white text-center p-3 md:p-4 text-xs md:text-sm font-semibold shadow-inner">© 2025 제조업 MVP</footer>
    </div>
  );
}
