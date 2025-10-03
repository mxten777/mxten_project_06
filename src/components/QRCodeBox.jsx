import React from "react";
import { QRCodeSVG } from "qrcode.react";

export default function QRCodeBox({ value, size = 128, label }) {
  return (
    <div className="flex flex-col items-center justify-center card p-4 bg-gradient-to-br from-blue-50 to-white">
      {label && <div className="font-bold mb-3 text-blue-700 text-center">{label}</div>}
      <div className="p-4 bg-white rounded-2xl shadow-lg border-2 border-blue-100">
        <QRCodeSVG 
          value={value || "NO_DATA"} 
          size={size}
          level="M"
          includeMargin={true}
          fgColor="#1e40af"
          bgColor="#ffffff"
        />
      </div>
      <div className="mt-3 text-xs text-gray-600 font-mono bg-gray-50 px-3 py-1 rounded-lg border">
        {value || "NO_DATA"}
      </div>
    </div>
  );
}
