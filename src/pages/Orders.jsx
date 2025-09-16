import React, { useState } from "react";
import Modal from "../components/Modal";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../components/Toast";
import Spinner from "../components/Spinner";

const initialOrders = [
  { id: "WO-001", title: "A제품 1차 가공", status: "진행중", assignedTo: "홍길동" },
  { id: "WO-002", title: "B제품 포장", status: "대기", assignedTo: "김철수" },
  { id: "WO-003", title: "C제품 검사", status: "완료", assignedTo: "이영희" },
];

export default function Orders() {
  const { showToast } = useToast();
  const [orders, setOrders] = useState(initialOrders);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ id: "", title: "", status: "대기", assignedTo: "" });
  const [editIdx, setEditIdx] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // 검색/필터 상태
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  // 정렬 상태
  const [sortBy, setSortBy] = useState(""); // id, title, status, assignedTo
  const [sortDir, setSortDir] = useState("asc"); // asc, desc
  // 페이지네이션 상태
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // 정렬 핸들러
  const handleSort = (key) => {
    if (sortBy === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortDir("asc");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleAdd = () => {
    setForm({ id: "", title: "", status: "대기", assignedTo: "" });
    setEditIdx(null);
    setShowModal(true);
  };

  const handleEdit = (idx) => {
    setForm(orders[idx]);
    setEditIdx(idx);
    setShowModal(true);
  };

  const handleDelete = (idx) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      setOrders(orders.filter((_, i) => i !== idx));
      showToast("작업지시가 삭제되었습니다.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.id || !form.title || !form.assignedTo) {
      showToast("모든 항목을 입력하세요.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      if (editIdx === null) {
        setOrders([...orders, form]);
        showToast("작업지시가 추가되었습니다.");
      } else {
        setOrders(orders.map((o, i) => (i === editIdx ? form : o)));
        showToast("작업지시가 수정되었습니다.");
      }
      setShowModal(false);
      setIsLoading(false);
    }, 1200);
  };

  // 필터링, 정렬, 페이지네이션된 orders 계산
  let filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.title.toLowerCase().includes(search.toLowerCase()) ||
      order.assignedTo.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? order.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });
  if (sortBy) {
    filteredOrders = [...filteredOrders].sort((a, b) => {
      let v1 = a[sortBy];
      let v2 = b[sortBy];
      if (typeof v1 === "string" && typeof v2 === "string") {
        v1 = v1.toLowerCase();
        v2 = v2.toLowerCase();
      }
      if (v1 < v2) return sortDir === "asc" ? -1 : 1;
      if (v1 > v2) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }
  // 페이지네이션
  const totalRows = filteredOrders.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / rowsPerPage));
  const pagedOrders = filteredOrders.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  // 페이지/행수 변경 시 페이지 1로 리셋
  React.useEffect(() => { setPage(1); }, [search, statusFilter, sortBy, sortDir, rowsPerPage]);

  return (
    <div className="w-full max-w-2xl mx-auto px-2 sm:px-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">작업지시 목록</h2>

      {/* 검색/필터 UI */}
      <div className="card flex flex-col sm:flex-row gap-2 mb-4 bg-gradient-to-br from-blue-50 to-white">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="ID, 제목, 작업자 검색"
          className="input flex-1 text-[11px] sm:text-sm"
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="input text-[11px] sm:text-sm w-full sm:w-40"
        >
          <option value="">전체 상태</option>
          <option value="대기">대기</option>
          <option value="진행중">진행중</option>
          <option value="완료">완료</option>
        </select>
        <button onClick={handleAdd} className="btn-primary w-full sm:w-auto text-[11px] sm:text-base">작업지시 추가</button>
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title={editIdx === null ? "작업지시 추가" : "작업지시 수정"}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <input name="id" value={form.id} onChange={handleChange} placeholder="ID" className="input flex-1 text-sm sm:text-base" />
            <input name="title" value={form.title} onChange={handleChange} placeholder="제목" className="input flex-1 text-sm sm:text-base" />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <select name="status" value={form.status} onChange={handleChange} className="input flex-1 text-sm sm:text-base">
              <option value="대기">대기</option>
              <option value="진행중">진행중</option>
              <option value="완료">완료</option>
            </select>
            <input name="assignedTo" value={form.assignedTo} onChange={handleChange} placeholder="작업자" className="input flex-1 text-sm sm:text-base" />
          </div>
          <div className="flex gap-2 mt-2 flex-col sm:flex-row">
            {isLoading ? (
              <div className="flex justify-center w-full sm:w-auto"><Spinner /></div>
            ) : (
              <button type="submit" className="btn-primary w-full sm:w-auto">{editIdx === null ? "추가" : "수정"}</button>
            )}
            <button type="button" onClick={() => setShowModal(false)} className="btn-secondary w-full sm:w-auto">취소</button>
          </div>
        </form>
      </Modal>

      <div className="card overflow-x-auto pb-2">
        <table className="w-full bg-white rounded-2xl shadow text-[11px] sm:text-sm md:text-base min-w-[600px] whitespace-nowrap">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-2 border cursor-pointer select-none" onClick={() => handleSort("id")}>ID {sortBy === "id" && (sortDir === "asc" ? "▲" : "▼")}</th>
              <th className="p-2 border cursor-pointer select-none" onClick={() => handleSort("title")}>제목 {sortBy === "title" && (sortDir === "asc" ? "▲" : "▼")}</th>
              <th className="p-2 border cursor-pointer select-none" onClick={() => handleSort("status")}>상태 {sortBy === "status" && (sortDir === "asc" ? "▲" : "▼")}</th>
              <th className="p-2 border cursor-pointer select-none" onClick={() => handleSort("assignedTo")}>작업자 {sortBy === "assignedTo" && (sortDir === "asc" ? "▲" : "▼")}</th>
              <th className="p-2 border">관리</th>
            </tr>
          </thead>
          <tbody>
            {pagedOrders.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-gray-400 py-8">검색/필터 결과가 없습니다.</td>
              </tr>
            ) : (
              pagedOrders.map((order, idx) => (
                <tr key={order.id} className="hover:bg-blue-50">
                  <td className="p-2 border">
                    <button
                      className="text-blue-600 underline hover:text-blue-800 text-xs sm:text-sm"
                      onClick={() => navigate(`/orders/${order.id}`, { state: { order, idx } })}
                    >
                      {order.id}
                    </button>
                  </td>
                  <td className="p-2 border">{order.title}</td>
                  <td className="p-2 border">
                    {/* 상태 Badge */}
                    <span
                      className={
                        order.status === '완료'
                          ? 'badge badge-status badge-status-done'
                          : order.status === '진행중'
                          ? 'badge badge-status badge-status-progress'
                          : 'badge badge-status badge-status-waiting'
                      }
                    >
                      {order.status}
                    </span>
                    {/* 진행중 Progress Bar */}
                    {order.status === '진행중' && (
                      <div className="w-full bg-gray-200 rounded h-2 mt-1">
                        <div className="bg-yellow-400 h-2 rounded" style={{ width: '60%' }}></div>
                      </div>
                    )}
                  </td>
                  <td className="p-2 border">{order.assignedTo}</td>
                  <td className="p-2 border text-center">
                    <button onClick={() => handleEdit((page - 1) * rowsPerPage + idx)} className="btn-secondary text-xs px-2 py-1 mr-2 mb-1 sm:mb-0">수정</button>
                    <button onClick={() => handleDelete((page - 1) * rowsPerPage + idx)} className="btn-secondary bg-red-500 text-white text-xs px-2 py-1">삭제</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
  </table>
        {/* 페이지네이션 UI */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-4">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm">페이지당 행:</span>
            <select
              className="border rounded p-1 text-xs sm:text-sm"
              value={rowsPerPage}
              onChange={e => setRowsPerPage(Number(e.target.value))}
            >
              {[5, 10, 20, 50].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-1">
            <button
              className="px-2 py-1 rounded border bg-gray-100 disabled:opacity-50"
              onClick={() => setPage(1)}
              disabled={page === 1}
            >처음</button>
            <button
              className="px-2 py-1 rounded border bg-gray-100 disabled:opacity-50"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >이전</button>
            <span className="px-2 text-xs sm:text-sm">{page} / {totalPages}</span>
            <button
              className="px-2 py-1 rounded border bg-gray-100 disabled:opacity-50"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >다음</button>
            <button
              className="px-2 py-1 rounded border bg-gray-100 disabled:opacity-50"
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
            >마지막</button>
          </div>
          <div className="text-xs sm:text-sm text-gray-500">총 {totalRows}건</div>
        </div>
      </div>
    </div>
  );
}
