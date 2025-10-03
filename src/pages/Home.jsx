import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] w-full px-2 sm:px-0">
      <div className="max-w-xl w-full card bg-white/80 text-center shadow-2xl p-6 sm:p-10 mt-8">
        <div className="flex flex-col items-center gap-2 mb-4">
          <span className="text-4xl sm:text-5xl md:text-6xl mb-2 animate-bounce">📝</span>
          <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl text-blue-700 mb-2">모바일/태블릿 기반<br />디지털 작업지시서</h1>
          <p className="text-gray-700 text-base sm:text-lg mb-2">제조 현장의 종이 작업지시서를 <span className="font-bold text-blue-600">실시간 디지털</span>로 전환하세요.</p>
        </div>
        <ul className="text-left text-gray-700 text-sm sm:text-base mb-6 space-y-1">
          <li>✔️ 작업지시 생성/수정/삭제, 실시간 현황 모니터링</li>
          <li>✔️ 작업자별 이력, 사진/메모 첨부, 상태 관리</li>
          <li>✔️ 모바일/태블릿 완벽 대응, 반응형 UI</li>
          <li>✔️ Firebase 기반 실시간 동기화, 안전한 인증</li>
        </ul>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
          <Link to="/dashboard" className="btn-primary w-full sm:w-auto">대시보드 바로가기</Link>
          <Link to="/login" className="btn-secondary w-full sm:w-auto">로그인</Link>
        </div>
      </div>

      {/* 앱 소개/사용법/FAQ/문의 카드 추가 */}
      <div className="max-w-2xl w-full mx-auto">
        <div className="card mb-6">
          <h2 className="heading-2 mb-2">앱 소개</h2>
          <ul className="list-disc pl-5 body-text mb-2 text-left">
            <li>종이 작업지시서의 불편함 해소</li>
            <li>작업자에게 실시간 지시 전달</li>
            <li>진행상황 실시간 모니터링</li>
            <li>사진/메모 첨부, 실시간 알림</li>
            <li>관리자/작업자별 맞춤 기능</li>
          </ul>
        </div>
        <div className="card mb-6">
          <h2 className="heading-2 mb-2">앱 사용법</h2>
          <ul className="list-decimal pl-5 body-text text-left">
            <li>로그인/회원가입 후 역할에 따라 대시보드 또는 작업자 메인으로 이동</li>
            <li>관리자는 작업지시 생성/수정/삭제, 작업자 배정, 상태 변경 가능</li>
            <li>작업자는 본인 작업지시 실시간 확인, 진행/완료 처리, 사진/메모 첨부 가능</li>
            <li>실시간 알림 및 네트워크 상태 안내 제공</li>
          </ul>
        </div>
        <div className="card mb-6">
          <h2 className="heading-2 mb-2">FAQ</h2>
          <ul className="list-disc pl-5 body-text text-left">
            <li>Q: 오프라인에서도 사용 가능한가요?<br />A: 네트워크 연결이 끊기면 안내가 표시되며, 일부 기능은 제한될 수 있습니다.</li>
            <li>Q: 사진 첨부는 어떻게 하나요?<br />A: 작업지시 상세/진행 화면에서 파일 첨부 버튼을 이용하세요.</li>
            <li>Q: 관리자/작업자 역할은 어떻게 구분되나요?<br />A: 회원가입 시 역할을 선택하거나 관리자가 지정합니다.</li>
          </ul>
        </div>
        <div className="card mb-6">
          <h2 className="heading-2 mb-2">문의</h2>
          <p className="body-text mb-2">앱 관련 문의는 아래 이메일로 연락해 주세요.</p>
          <div className="font-mono text-blue-700">support@mxten.co.kr</div>
        </div>
      </div>
    </section>
  );
}
