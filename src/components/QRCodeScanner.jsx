import React, { useState } from "react";

export default function QRCodeScanner({ onScan, onError }) {
  const [result, setResult] = useState("");
  
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResult(file.name);
      if (onScan) onScan(file.name);
    }
  };
  
  return (
    <div className="card p-4 flex flex-col items-center">
      <div className="font-bold mb-2 text-blue-700">QR코드 스캔 (파일 업로드)</div>
      <input 
        type="file" 
        accept="image/*"
        onChange={handleFileInput}
        className="input mb-4"
      />
      <div className="mt-2 text-xs text-gray-500 break-all">
        {result ? `스캔 결과: ${result}` : "QR코드 이미지를 업로드해주세요."}
      </div>
    </div>
  );
}
