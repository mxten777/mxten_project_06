import React, { useState } from "react";
import { useToast } from "../components/Toast";
import Spinner from "../components/Spinner";

export default function Login() {
  const { showToast } = useToast();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("이메일과 비밀번호를 모두 입력하세요.");
      showToast("이메일과 비밀번호를 모두 입력하세요.");
      return;
    }
    setError("");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast("로그인 시도: " + JSON.stringify(form));
    }, 1200);
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded shadow p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">로그인</h2>
      <form className="flex flex-col gap-3 sm:gap-4" onSubmit={handleSubmit}>
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="이메일" className="border p-2 rounded text-sm sm:text-base" />
        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="비밀번호" className="border p-2 rounded text-sm sm:text-base" />
        {error && <div className="text-red-600 text-xs sm:text-sm">{error}</div>}
        {isLoading ? (
          <div className="flex justify-center"><Spinner /></div>
        ) : (
          <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 w-full sm:w-auto">로그인</button>
        )}
      </form>
      <div className="mt-4 text-xs sm:text-sm text-center">
        계정이 없으신가요? <a href="/register" className="text-blue-600 underline">회원가입</a>
      </div>
    </div>
  );
}
