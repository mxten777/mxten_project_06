import React, { useState } from "react";

export default function QRCodeScanner({ onScan, onError }) {
  const [result, setResult] = useState("");
  const [manualInput, setManualInput] = useState("");
  
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 실제 환경에서는 QR 이미지 파싱이 필요하지만, 현재는 파일명을 결과로 처리
      const fileName = file.name.replace(/\.(jpg|jpeg|png|gif)$/i, '');
      setResult(fileName);
      if (onScan) onScan(fileName);
    }
  };

  const handleManualScan = () => {
    if (manualInput.trim()) {
      setResult(manualInput.trim());
      if (onScan) onScan(manualInput.trim());
      setManualInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleManualScan();
    }
  };
  
  return (
    <div className="space-y-3 sm:space-y-4">
      {/* QR 코드 이미지 업로드 */}
      <div className="card p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-white border border-purple-100">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-sm sm:text-base">
            📷
          </div>
          <div className="font-bold text-purple-700 text-sm sm:text-base">QR코드 이미지 스캔</div>
        </div>
        <input 
          type="file" 
          accept="image/*"
          onChange={handleFileInput}
          className="input w-full text-sm"
        />
        <div className="mt-2 sm:mt-3 text-xs text-gray-500">
          QR코드가 포함된 이미지 파일을 선택해주세요
        </div>
      </div>

      {/* 수동 입력 */}
      <div className="card p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-white border border-blue-100">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-sm sm:text-base">
            ⌨️
          </div>
          <div className="font-bold text-blue-700 text-sm sm:text-base">작업지시서 ID 직접 입력</div>
        </div>
        <div className="flex gap-2">
          <input 
            type="text"
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="예: WO-001"
            className="input flex-1 text-sm"
          />
          <button 
            onClick={handleManualScan}
            className="btn-primary px-3 sm:px-4 py-2 whitespace-nowrap text-sm"
          >
            스캔
          </button>
        </div>
        <div className="mt-2 sm:mt-3 text-xs text-gray-500">
          작업지시서 ID를 직접 입력하거나 Enter키를 눌러주세요
        </div>
      </div>

      {/* 스캔 결과 표시 */}
      {result && (
        <div className="card p-4 sm:p-6 bg-gradient-to-br from-green-50 to-white border border-green-100">
          <div className="flex items-center gap-2 sm:gap-3 mb-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white text-sm sm:text-base">
              ✅
            </div>
            <div className="font-bold text-green-700 text-sm sm:text-base">스캔 성공!</div>
          </div>
          <div className="bg-white p-3 sm:p-4 rounded-xl border-2 border-green-200">
            <div className="text-xs sm:text-sm text-gray-600 mb-1">작업지시서 ID:</div>
            <div className="text-base sm:text-lg font-mono font-bold text-green-700 break-all">{result}</div>
          </div>
        </div>
      )}
    </div>
  );
}
