import React from "react";

function QRCodeSVG({ value, size = 128 }) {
  // 간단한 QR코드 대체 표시
  return (
    <div 
      className="border-2 border-blue-600 bg-white flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <div className="text-xs text-center p-2 break-all">{value}</div>
    </div>
  );
}

export default function QRCodeBox({ value, size = 128, label }) {
  return (
    <div className="flex flex-col items-center justify-center card p-4">
      {label && <div className="font-bold mb-2 text-blue-700">{label}</div>}
      <QRCodeSVG value={value} size={size} />
      <div className="mt-2 text-xs text-gray-500 break-all">{value}</div>
    </div>
  );
}
