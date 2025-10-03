import React, { useEffect, useState } from "react";

export default function NetworkStatus() {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (online) return null;
  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-xs card bg-gradient-to-r from-red-500 to-pink-500 text-white text-center py-2 shadow-lg animate-fade-in">
      <span className="badge badge-status badge-status-delay mr-2">오프라인</span>
      네트워크 연결이 끊어졌습니다. 저장/동기화가 제한됩니다.
    </div>
  );
}
