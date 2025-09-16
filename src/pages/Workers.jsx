import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { useToast } from "../components/Toast";
import Spinner from "../components/Spinner";

export default function Workers() {
  const navigate = useNavigate();
  const initialWorkers = [
    { id: "U-001", name: "홍길동", role: "작업자", email: "hong@test.com" },
    { id: "U-002", name: "김철수", role: "작업자", email: "kim@test.com" },
    { id: "U-003", name: "이영희", role: "작업자", email: "lee@test.com" },
  ];
  const { showToast } = useToast();
  const [workers, setWorkers] = useState(initialWorkers);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ id: "", name: "", role: "작업자", email: "" });
  const [editIdx, setEditIdx] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // 검색/필터 상태
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleAdd = () => {
    setForm({ id: "", name: "", role: "작업자", email: "" });
    setEditIdx(null);
    setShowModal(true);
  };

  const handleEdit = (idx) => {
    setForm(workers[idx]);
    setEditIdx(idx);
    setShowModal(true);
  };

  const handleDelete = (idx) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      setWorkers(workers.filter((_, i) => i !== idx));
      showToast("작업자가 삭제되었습니다.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.id || !form.name || !form.email) {
      showToast("모든 항목을 입력하세요.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      if (editIdx === null) {
        setWorkers([...workers, form]);
        showToast("작업자가 추가되었습니다.");
      } else {
        setWorkers(workers.map((w, i) => (i === editIdx ? form : w)));
        showToast("작업자가 수정되었습니다.");
      }
      setShowModal(false);
      setIsLoading(false);
    }, 1200);
  };

  // 정렬 상태
  const [sortBy, setSortBy] = useState(""); // id, name, role, email
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

  // 필터링, 정렬, 페이지네이션된 workers 계산
  let filteredWorkers = workers.filter(worker => {
    const matchesSearch =
      worker.id.toLowerCase().includes(search.toLowerCase()) ||
      worker.name.toLowerCase().includes(search.toLowerCase()) ||
      worker.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter ? worker.role === roleFilter : true;
    return matchesSearch && matchesRole;
  });
  if (sortBy) {
    filteredWorkers = [...filteredWorkers].sort((a, b) => {
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
  const totalRows = filteredWorkers.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / rowsPerPage));
  const pagedWorkers = filteredWorkers.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  // 페이지/행수 변경 시 페이지 1로 리셋
  React.useEffect(() => { setPage(1); }, [search, roleFilter, sortBy, sortDir, rowsPerPage]);

  return (
    <div className="w-full max-w-2xl mx-auto px-2 sm:px-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">작업자 목록</h2>

      {/* 검색/필터 UI */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="ID, 이름, 이메일 검색"
          className="border p-2 rounded flex-1 text-[11px] sm:text-sm"
        />
        <select
          value={roleFilter}
          onChange={e => setRoleFilter(e.target.value)}
          className="border p-2 rounded text-[11px] sm:text-sm w-full sm:w-40"
        >
          <option value="">전체 역할</option>
          <option value="작업자">작업자</option>
          <option value="관리자">관리자</option>
        </select>
  <button onClick={handleAdd} className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-[11px] sm:text-base w-full sm:w-auto">작업자 추가</button>
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title={editIdx === null ? "작업자 추가" : "작업자 수정"}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <input name="id" value={form.id} onChange={handleChange} placeholder="ID" className="border p-2 rounded flex-1 text-sm sm:text-base" />
            <input name="name" value={form.name} onChange={handleChange} placeholder="이름" className="border p-2 rounded flex-1 text-sm sm:text-base" />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <select name="role" value={form.role} onChange={handleChange} className="border p-2 rounded flex-1 text-sm sm:text-base">
              <option value="작업자">작업자</option>
              <option value="관리자">관리자</option>
            </select>
            <input name="email" value={form.email} onChange={handleChange} placeholder="이메일" className="border p-2 rounded flex-1 text-sm sm:text-base" />
          </div>
          <div className="flex gap-2 mt-2 flex-col sm:flex-row">
            {isLoading ? (
              <div className="flex justify-center w-full sm:w-auto"><Spinner /></div>
            ) : (
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto">{editIdx === null ? "추가" : "수정"}</button>
            )}
            <button type="button" onClick={() => setShowModal(false)} className="bg-gray-300 px-4 py-2 rounded w-full sm:w-auto">취소</button>
          </div>
        </form>
      </Modal>

      <div className="overflow-x-auto pb-2">
        <table className="w-full border bg-white rounded shadow text-[11px] sm:text-sm md:text-base min-w-[600px] whitespace-nowrap">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-2 border cursor-pointer select-none" onClick={() => handleSort("id")}>ID {sortBy === "id" && (sortDir === "asc" ? "▲" : "▼")}</th>
              <th className="p-2 border cursor-pointer select-none" onClick={() => handleSort("name")}>이름 {sortBy === "name" && (sortDir === "asc" ? "▲" : "▼")}</th>
              <th className="p-2 border cursor-pointer select-none" onClick={() => handleSort("role")}>역할 {sortBy === "role" && (sortDir === "asc" ? "▲" : "▼")}</th>
              <th className="p-2 border cursor-pointer select-none" onClick={() => handleSort("email")}>이메일 {sortBy === "email" && (sortDir === "asc" ? "▲" : "▼")}</th>
              <th className="p-2 border">관리</th>
            </tr>
          </thead>
          <tbody>
            {pagedWorkers.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-gray-400 py-8">검색/필터 결과가 없습니다.</td>
              </tr>
            ) : (
              pagedWorkers.map((worker, idx) => (
                <tr key={worker.id} className="hover:bg-blue-50 cursor-pointer" onClick={e => {
                  // 상세로 이동, 버튼 클릭은 이벤트 버블링 방지
                  if (e.target.tagName === 'BUTTON') return;
                  navigate(`/workers/${worker.id}`, { state: { worker, idx: (page - 1) * rowsPerPage + idx } });
                }}>
                  <td className="p-2 border">{worker.id}</td>
                  <td className="p-2 border">{worker.name}</td>
                  <td className="p-2 border">
                    <span
                      className={
                        worker.role === '관리자'
                          ? 'bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold'
                          : 'bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-semibold'
                      }
                    >
                      {worker.role}
                    </span>
                  </td>
                  <td className="p-2 border">{worker.email}</td>
                  <td className="p-2 border text-center">
                    <button onClick={e => { e.stopPropagation(); handleEdit((page - 1) * rowsPerPage + idx); }} className="text-[11px] px-2 py-1 bg-yellow-400 rounded mr-2 mb-1 sm:mb-0">수정</button>
                    <button onClick={e => { e.stopPropagation(); handleDelete((page - 1) * rowsPerPage + idx); }} className="text-[11px] px-2 py-1 bg-red-500 text-white rounded">삭제</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
  </table>
        {/* 페이지네이션 UI */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] sm:text-sm">페이지당 행:</span>
            <select
              className="border rounded p-1 text-[11px] sm:text-sm"
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
            <span className="px-2 text-[11px] sm:text-sm">{page} / {totalPages}</span>
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
          <div className="text-[11px] sm:text-sm text-gray-500">총 {totalRows}건</div>
        </div>
      </div>
    </div>
  );
}
