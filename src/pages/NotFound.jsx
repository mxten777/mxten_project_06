import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className="text-3xl font-bold text-red-600 mb-4">404</h2>
      <p className="text-lg">페이지를 찾을 수 없습니다.</p>
      <a href="/" className="mt-6 text-blue-600 underline">홈으로 이동</a>
    </div>
  );
}
