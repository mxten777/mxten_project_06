import React, { useState } from "react";
import QRCodeScanner from "../components/QRCodeScanner";
import { useToast } from "../components/Toast";

export default function ScanOrder() {
  const { showToast } = useToast();
  const [orderId, setOrderId] = useState("");

  const handleScan = (id) => {
    setOrderId(id);
    showToast(`작업지시서 QR 스캔: ${id}`);
    // 실제로는 id로 작업지시 상세 조회/처리
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="heading-2 mb-4 text-center">작업지시서 QR코드 스캔</h2>
      <QRCodeScanner onScan={handleScan} />
      {orderId && (
        <div className="card mt-4 text-center">
          <div className="font-bold text-blue-700 mb-2">스캔된 작업지시서 ID</div>
          <div className="text-lg font-mono">{orderId}</div>
        </div>
      )}
    </div>
  );
}
