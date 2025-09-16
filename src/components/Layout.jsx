import React from "react";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-blue-700 text-white p-2 sm:p-4 md:p-6 font-bold text-base sm:text-lg md:text-2xl text-center md:text-left">
        작업지시 디지털화
      </header>
      <Navbar />
  <main className="flex-1 flex flex-col items-center justify-center p-2 sm:p-4 md:p-8 w-full max-w-7xl mx-auto text-[11px] sm:text-base">{children}</main>
  <footer className="bg-gray-200 text-center p-2 md:p-4 text-[11px] md:text-sm text-gray-600">© 2025 제조업 MVP</footer>
    </div>
  );
}
