import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCodeScanner from "../components/QRCodeScanner";
import { useToast } from "../components/Toast";

export default function ScanOrder() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [scannedOrderId, setScannedOrderId] = useState("");

  // 임시 작업지시 데이터 (실제로는 API에서 가져올 데이터)
  const availableOrders = ["WO-001", "WO-002", "WO-003"];

  const handleScan = (id) => {
    setScannedOrderId(id);
    showToast(`작업지시서 QR 스캔 완료: ${id}`, "success");
    
    // 스캔된 ID가 실제 작업지시서인지 확인
    if (availableOrders.includes(id)) {
      showToast(`작업지시서 ${id}를 찾았습니다!`, "success");
    } else {
      showToast(`작업지시서 ${id}를 찾을 수 없습니다.`, "error");
    }
  };

  const goToOrderDetail = () => {
    if (scannedOrderId && availableOrders.includes(scannedOrderId)) {
      navigate(`/orders/${scannedOrderId}`);
    } else {
      showToast("유효하지 않은 작업지시서 ID입니다.", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {/* 헤더 */}
      <div className="text-center">
        <div className="text-4xl mb-3">📱</div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
          작업지시서 QR코드 스캔
        </h1>
        <p className="text-gray-600">
          QR코드를 스캔하거나 작업지시서 ID를 입력하세요
        </p>
      </div>

      {/* QR 스캐너 */}
      <QRCodeScanner onScan={handleScan} />

      {/* 스캔 결과 및 액션 */}
      {scannedOrderId && (
        <div className="card p-6 bg-gradient-to-br from-indigo-50 to-white border border-indigo-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-xl">
              📋
            </div>
            <div>
              <div className="font-bold text-indigo-700">스캔된 작업지시서</div>
              <div className="text-sm text-gray-600">아래 버튼으로 상세 정보를 확인하세요</div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl border mb-4">
            <div className="text-sm text-gray-600 mb-1">작업지시서 ID:</div>
            <div className="text-xl font-mono font-bold text-indigo-700 mb-3">{scannedOrderId}</div>
            
            <div className="flex items-center gap-2 text-sm">
              <div className={`w-3 h-3 rounded-full ${availableOrders.includes(scannedOrderId) ? 'bg-green-400' : 'bg-red-400'}`}></div>
              <span className={availableOrders.includes(scannedOrderId) ? 'text-green-700' : 'text-red-700'}>
                {availableOrders.includes(scannedOrderId) ? '유효한 작업지시서' : '존재하지 않는 작업지시서'}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={goToOrderDetail}
              disabled={!availableOrders.includes(scannedOrderId)}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              작업지시서 상세보기
            </button>
            <button 
              onClick={() => setScannedOrderId("")}
              className="btn-secondary px-6"
            >
              다시 스캔
            </button>
          </div>
        </div>
      )}

      {/* 사용 가능한 작업지시서 목록 */}
      <div className="card p-6 bg-gradient-to-br from-gray-50 to-white border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl flex items-center justify-center text-white">
            📝
          </div>
          <div className="font-bold text-gray-700">테스트용 작업지시서 목록</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {availableOrders.map(orderId => (
            <button
              key={orderId}
              onClick={() => handleScan(orderId)}
              className="text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <div className="font-mono text-sm font-bold text-blue-600">{orderId}</div>
              <div className="text-xs text-gray-500">클릭하여 스캔</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
