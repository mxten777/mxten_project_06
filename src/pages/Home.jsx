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

      {/* 개선된 앱 소개/사용법/FAQ 섹션 - TailwindCSS 3.4.0 기능 활용 */}
      <div className="max-w-4xl w-full mx-auto mt-12 px-4 sm:px-6">
        {/* 그리드 레이아웃으로 카드들 배치 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* 앱 소개 카드 */}
          <div className="group relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 rounded-3xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-blue-100/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
                  📱
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">앱 소개</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/60 backdrop-blur-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700 text-sm sm:text-base">종이 작업지시서의 불편함 해소</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/60 backdrop-blur-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700 text-sm sm:text-base">작업자에게 실시간 지시 전달</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/60 backdrop-blur-sm">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700 text-sm sm:text-base">진행상황 실시간 모니터링</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/60 backdrop-blur-sm">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700 text-sm sm:text-base">사진/메모 첨부, 실시간 알림</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/60 backdrop-blur-sm">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-slate-700 text-sm sm:text-base">관리자/작업자별 맞춤 기능</span>
                </div>
              </div>
            </div>
          </div>

          {/* 앱 사용법 카드 */}
          <div className="group relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50 rounded-3xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-green-100/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
                  📋
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">앱 사용법</h2>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4 p-4 rounded-xl bg-white/60 backdrop-blur-sm">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">1</div>
                  <span className="text-slate-700 text-sm sm:text-base leading-relaxed">로그인/회원가입 후 역할에 따라 대시보드 또는 작업자 메인으로 이동</span>
                </div>
                <div className="flex gap-4 p-4 rounded-xl bg-white/60 backdrop-blur-sm">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">2</div>
                  <span className="text-slate-700 text-sm sm:text-base leading-relaxed">관리자는 작업지시 생성/수정/삭제, 작업자 배정, 상태 변경 가능</span>
                </div>
                <div className="flex gap-4 p-4 rounded-xl bg-white/60 backdrop-blur-sm">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">3</div>
                  <span className="text-slate-700 text-sm sm:text-base leading-relaxed">작업자는 본인 작업지시 실시간 확인, 진행/완료 처리, 사진/메모 첨부 가능</span>
                </div>
                <div className="flex gap-4 p-4 rounded-xl bg-white/60 backdrop-blur-sm">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">4</div>
                  <span className="text-slate-700 text-sm sm:text-base leading-relaxed">실시간 알림 및 네트워크 상태 안내 제공</span>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ 카드 */}
          <div className="group relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-violet-50 rounded-3xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-purple-100/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
                  ❓
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">FAQ</h2>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/60 backdrop-blur-sm">
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-purple-600 font-bold text-sm">Q:</span>
                    <span className="text-slate-800 font-medium text-sm">오프라인에서도 사용 가능한가요?</span>
                  </div>
                  <div className="flex items-start gap-2 pl-4">
                    <span className="text-green-600 font-bold text-sm">A:</span>
                    <span className="text-slate-600 text-sm leading-relaxed">네트워크 연결이 끊기면 안내가 표시되며, 일부 기능은 제한될 수 있습니다.</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/60 backdrop-blur-sm">
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-purple-600 font-bold text-sm">Q:</span>
                    <span className="text-slate-800 font-medium text-sm">사진 첨부는 어떻게 하나요?</span>
                  </div>
                  <div className="flex items-start gap-2 pl-4">
                    <span className="text-green-600 font-bold text-sm">A:</span>
                    <span className="text-slate-600 text-sm leading-relaxed">작업지시 상세/진행 화면에서 파일 첨부 버튼을 이용하세요.</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/60 backdrop-blur-sm">
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-purple-600 font-bold text-sm">Q:</span>
                    <span className="text-slate-800 font-medium text-sm">관리자/작업자 역할은 어떻게 구분되나요?</span>
                  </div>
                  <div className="flex items-start gap-2 pl-4">
                    <span className="text-green-600 font-bold text-sm">A:</span>
                    <span className="text-slate-600 text-sm leading-relaxed">회원가입 시 역할을 선택하거나 관리자가 지정합니다.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 문의 카드 */}
          <div className="group relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-yellow-50 rounded-3xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-amber-100/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
                  📧
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">문의</h2>
              </div>
              <div className="space-y-4">
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">앱 관련 문의는 아래 이메일로 연락해 주세요.</p>
                <div className="p-4 rounded-xl bg-white/60 backdrop-blur-sm border-2 border-dashed border-amber-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white">
                      ✉️
                    </div>
                    <span className="font-mono text-amber-700 font-semibold text-sm sm:text-base">support@mxten.co.kr</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>평일 9:00-18:00 응답</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
