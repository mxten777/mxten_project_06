
import React from "react";
import { useNavigate } from "react-router-dom";
import { Pie, Bar, Doughnut, Line } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

export default function Dashboard() {
  // 샘플 데이터 (실제 데이터는 추후 API 연동)
  const orderStats = [
    { label: "전체", count: 3, color: "bg-gray-400" },
    { label: "대기", count: 1, color: "bg-gray-300" },
    { label: "진행중", count: 1, color: "bg-yellow-400" },
    { label: "완료", count: 1, color: "bg-green-400" },
  ];
  const workerStats = [
    { label: "전체", count: 3, color: "bg-gray-400" },
    { label: "작업자", count: 2, color: "bg-blue-400" },
    { label: "관리자", count: 1, color: "bg-indigo-400" },
  ];
  const navigate = useNavigate();

  // 차트 데이터 변환
  const orderPieData = {
    labels: orderStats.filter(s => s.label !== "전체").map(s => s.label),
    datasets: [
      {
        data: orderStats.filter(s => s.label !== "전체").map(s => s.count),
        backgroundColor: ["#d1d5db", "#fde68a", "#bbf7d0"],
        borderWidth: 1,
      },
    ],
  };
  const workerBarData = {
    labels: workerStats.filter(s => s.label !== "전체").map(s => s.label),
    datasets: [
      {
        label: "작업자 수",
        data: workerStats.filter(s => s.label !== "전체").map(s => s.count),
        backgroundColor: ["#60a5fa", "#818cf8"],
      },
    ],
  };
  const workerBarOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
  };

  // 추가 차트 데이터
  const orderDoughnutData = {
    labels: orderStats.filter(s => s.label !== "전체").map(s => s.label),
    datasets: [
      {
        data: orderStats.filter(s => s.label !== "전체").map(s => s.count),
        backgroundColor: ["#d1d5db", "#fde68a", "#bbf7d0"],
        borderWidth: 1,
      },
    ],
  };
  // 월별 작업지시 생성수 (샘플)
  const orderMonthlyLineData = {
    labels: ["3월", "4월", "5월", "6월", "7월", "8월", "9월"],
    datasets: [
      {
        label: "작업지시 생성수",
        data: [2, 3, 4, 2, 5, 3, 4],
        borderColor: "#2563eb",
        backgroundColor: "#93c5fd",
        tension: 0.3,
        fill: true,
      },
    ],
  };
  const orderMonthlyLineOptions = {
    responsive: true,
    plugins: { legend: { display: true } },
    scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
  };
  // 작업자 역할별 파이차트
  const workerPieData = {
    labels: workerStats.filter(s => s.label !== "전체").map(s => s.label),
    datasets: [
      {
        data: workerStats.filter(s => s.label !== "전체").map(s => s.count),
        backgroundColor: ["#60a5fa", "#818cf8"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-2 sm:p-4">
      <h2 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6">대시보드</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-6 mb-4 sm:mb-8">
        <div className="bg-white rounded shadow p-2 sm:p-4">
          <div className="font-bold mb-2 text-[11px] sm:text-base">작업지시 현황</div>
          <div className="flex gap-1 sm:gap-2 mb-3 sm:mb-4">
            {orderStats.map(stat => (
              <div key={stat.label} className={`flex-1 rounded p-2 text-center text-[11px] sm:text-xs text-white font-semibold ${stat.color}`}>
                {stat.label}<br />{stat.count}건
              </div>
            ))}
          </div>
          <button onClick={() => navigate("/orders")} className="px-3 py-2 bg-blue-600 text-white rounded w-full text-[11px] sm:text-base">작업지시 목록</button>
        </div>
        <div className="bg-white rounded shadow p-2 sm:p-4">
          <div className="font-bold mb-2 text-[11px] sm:text-base">작업자 현황</div>
          <div className="flex gap-1 sm:gap-2 mb-3 sm:mb-4">
            {workerStats.map(stat => (
              <div key={stat.label} className={`flex-1 rounded p-2 text-center text-[11px] sm:text-xs text-white font-semibold ${stat.color}`}>
                {stat.label}<br />{stat.count}명
              </div>
            ))}
          </div>
          <button onClick={() => navigate("/workers")} className="px-3 py-2 bg-blue-600 text-white rounded w-full text-[11px] sm:text-base">작업자 목록</button>
        </div>
      </div>
      {/* 차트/그래프 */}
      <div className="bg-gray-50 rounded p-2 sm:p-4 mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="flex flex-col items-center min-w-[220px] max-w-[340px] w-full mx-auto bg-white rounded shadow p-2 md:p-4">
          <div className="font-bold mb-2 text-[11px] sm:text-base">작업지시 상태별 파이차트</div>
          <Pie data={orderPieData} />
        </div>
        <div className="flex flex-col items-center min-w-[220px] max-w-[340px] w-full mx-auto bg-white rounded shadow p-2 md:p-4">
          <div className="font-bold mb-2 text-[11px] sm:text-base">작업지시 상태별 도넛차트</div>
          <Doughnut data={orderDoughnutData} />
        </div>
        <div className="flex flex-col items-center min-w-[220px] max-w-[340px] w-full mx-auto bg-white rounded shadow p-2 md:p-4">
          <div className="font-bold mb-2 text-[11px] sm:text-base">작업지시 월별 생성수</div>
          <Line data={orderMonthlyLineData} options={orderMonthlyLineOptions} />
        </div>
        <div className="flex flex-col items-center min-w-[220px] max-w-[340px] w-full mx-auto bg-white rounded shadow p-2 md:p-4">
          <div className="font-bold mb-2 text-[11px] sm:text-base">작업자 역할별 바차트</div>
          <Bar data={workerBarData} options={workerBarOptions} />
        </div>
        <div className="flex flex-col items-center min-w-[220px] max-w-[340px] w-full mx-auto bg-white rounded shadow p-2 md:p-4">
          <div className="font-bold mb-2 text-[11px] sm:text-base">작업자 역할별 파이차트</div>
          <Pie data={workerPieData} />
        </div>
      </div>
    </div>
  );
}
