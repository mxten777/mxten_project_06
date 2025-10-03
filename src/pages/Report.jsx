import React from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

export default function Report() {
  // 샘플 데이터
  const workOrderStats = {
    labels: ["대기", "진행중", "완료", "지연"],
    datasets: [
      {
        label: "작업지시 수",
        data: [3, 5, 8, 2],
        backgroundColor: ["#d1d5db", "#fde68a", "#bbf7d0", "#fca5a5"],
      },
    ],
  };
  const workerStats = {
    labels: ["작업자", "관리자"],
    datasets: [
      {
        label: "작업자 수",
        data: [12, 3],
        backgroundColor: ["#60a5fa", "#818cf8"],
      },
    ],
  };
  const monthlyOrderLine = {
    labels: ["3월", "4월", "5월", "6월", "7월", "8월", "9월"],
    datasets: [
      {
        label: "월별 작업지시 생성수",
        data: [2, 3, 4, 2, 5, 3, 4],
        borderColor: "#2563eb",
        backgroundColor: "#93c5fd",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-2 sm:p-4">
      <h2 className="heading-2 mb-6 text-center">작업지시/작업자 통계 리포트</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card flex flex-col items-center">
          <div className="font-bold mb-2 text-[11px] sm:text-base">작업지시 상태별 바차트</div>
          <Bar data={workOrderStats} />
        </div>
        <div className="card flex flex-col items-center">
          <div className="font-bold mb-2 text-[11px] sm:text-base">작업자 역할별 파이차트</div>
          <Pie data={workerStats} />
        </div>
      </div>
      <div className="card flex flex-col items-center mb-8">
        <div className="font-bold mb-2 text-[11px] sm:text-base">월별 작업지시 생성 추이</div>
        <Line data={monthlyOrderLine} />
      </div>
      <div className="card p-4 mb-8">
        <div className="font-bold mb-2 text-[11px] sm:text-base">상세 리포트(샘플)</div>
        <ul className="list-disc pl-5 text-[11px] sm:text-base text-gray-700">
          <li>9월 완료 작업지시: 4건</li>
          <li>지연 작업지시: 2건 (최근 1주)</li>
          <li>작업자별 평균 처리시간: 2.3시간</li>
          <li>관리자별 작업지시 배정수: 3~5건</li>
        </ul>
      </div>
    </div>
  );
}
