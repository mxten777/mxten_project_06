import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "../components/Toast";
import Spinner from "../components/Spinner";

export default function WorkerDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { worker, idx } = location.state || {};
  const { showToast } = useToast();
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(worker || {});
  const [isLoading, setIsLoading] = useState(false);
  // 파일 첨부 상태 (프론트 메모리)
  const [files, setFiles] = useState([]);

  if (!worker) {
    return <div className="text-red-600">작업자를 찾을 수 없습니다.</div>;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleFileRemove = (idx) => {
    setFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast("작업자가 수정되었습니다.");
      setEditMode(false);
      // 실제 파일 업로드는 추후 API 연동 시 구현
    }, 1200);
  };

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      showToast("작업자가 삭제되었습니다.");
      setTimeout(() => navigate("/workers"), 800);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto card mt-4">
      <h2 className="text-lg sm:text-2xl font-bold mb-4 text-center sm:text-left">작업자 상세</h2>
      <div className="card bg-gradient-to-br from-blue-50 to-white mb-6">
        {editMode ? (
          <form onSubmit={handleSave} className="flex flex-col gap-2 text-[11px] sm:text-base">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1">
                <label className="block text-[11px] text-gray-500 mb-1">ID</label>
                <input name="id" value={form.id} onChange={handleChange} className="input w-full bg-gray-100 text-[11px] sm:text-base" readOnly />
              </div>
              <div className="flex-1">
                <label className="block text-[11px] text-gray-500 mb-1">이름</label>
                <input name="name" value={form.name} onChange={handleChange} className="input w-full text-[11px] sm:text-base" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1">
                <label className="block text-[11px] text-gray-500 mb-1">역할</label>
                <select name="role" value={form.role} onChange={handleChange} className="input w-full text-[11px] sm:text-base">
                  <option value="작업자">작업자</option>
                  <option value="관리자">관리자</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-[11px] text-gray-500 mb-1">이메일</label>
                <input name="email" value={form.email} onChange={handleChange} className="input w-full text-[11px] sm:text-base" />
              </div>
            </div>
            {/* 파일 첨부 UI */}
            <div>
              <label className="block text-[11px] text-gray-500 mb-1">첨부파일</label>
              <input type="file" multiple onChange={handleFileChange} className="block text-[11px] sm:text-base" />
              {files.length > 0 && (
                <ul className="mt-2 text-[11px]">
                  {files.map((file, idx) => (
                    <li key={idx} className="flex items-center gap-2 mb-1">
                      <span>{file.name}</span>
                      <button type="button" onClick={() => handleFileRemove(idx)} className="btn-secondary text-red-500 text-[11px]">삭제</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex gap-2 mt-2 flex-col sm:flex-row">
              {isLoading ? (
                <div className="flex justify-center w-full sm:w-auto"><Spinner /></div>
              ) : (
                <button type="submit" className="btn-primary w-full sm:w-auto text-[11px] sm:text-base">저장</button>
              )}
              <button type="button" onClick={() => setEditMode(false)} className="btn-secondary w-full sm:w-auto text-[11px] sm:text-base">취소</button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-4 text-[11px] sm:text-base">
            <div>
              <div className="text-[11px] text-gray-500 mb-1">ID</div>
              <div className="font-mono text-[11px] sm:text-base">{worker.id}</div>
            </div>
            <div>
              <div className="text-[11px] text-gray-500 mb-1">이름</div>
              <div className="text-[11px] sm:text-base">{worker.name}</div>
            </div>
            <div>
              <div className="text-[11px] text-gray-500 mb-1">역할</div>
              <span
                className={
                  worker.role === '관리자'
                    ? 'badge badge-status bg-blue-500'
                    : 'badge badge-status badge-status-waiting'
                }
              >
                {worker.role}
              </span>
            </div>
            <div>
              <div className="text-[11px] text-gray-500 mb-1">이메일</div>
              <div className="text-[11px] sm:text-base">{worker.email}</div>
            </div>
            {/* 첨부파일 미리보기/다운로드 */}
            <div className="sm:col-span-2">
              <div className="text-[11px] text-gray-500 mb-1">첨부파일</div>
              {files.length === 0 ? (
                <div className="text-gray-400 text-[11px]">첨부된 파일 없음</div>
              ) : (
                <ul className="text-[11px]">
                  {files.map((file, idx) => (
                    <li key={idx} className="flex items-center gap-2 mb-1">
                      <span>{file.name}</span>
                      <a href={URL.createObjectURL(file)} download={file.name} className="text-blue-500 underline">다운로드</a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
        <div className="flex gap-2 mb-2">
          {!editMode && (
            <>
              <button onClick={() => setEditMode(true)} className="btn-secondary w-full sm:w-auto text-[11px] sm:text-base">수정</button>
              <button onClick={handleDelete} className="btn-secondary bg-red-500 text-white w-full sm:w-auto text-[11px] sm:text-base">삭제</button>
            </>
          )}
        </div>
      </div>
      {/* 이력 관리 샘플 섹션 */}
      <div className="card bg-gray-100 rounded p-2 sm:p-3 mb-4">
        <div className="font-bold text-[11px] sm:text-sm mb-2 text-gray-700">작업자 이력</div>
        <ul className="text-[11px] text-gray-600 list-disc pl-5">
          <li>2025-09-10 09:00 등록</li>
          <li>2025-09-12 14:30 역할 변경: 작업자 → 관리자</li>
          <li>2025-09-15 11:10 이메일 변경</li>
        </ul>
      </div>
      <button onClick={() => navigate(-1)} className="btn-primary w-full sm:w-auto text-[11px] sm:text-base">목록으로</button>
    </div>
  );
}
