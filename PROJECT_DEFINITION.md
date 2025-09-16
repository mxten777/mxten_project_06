# 작업지시 디지털화 앱 프로젝트 정의

## 1. 프로젝트 개요
- 목표: 제조 현장의 종이 작업지시서를 모바일/태블릿 기반 디지털 앱으로 전환하여, 작업자에게 실시간으로 작업지시를 전달하고, 진행상황을 실시간으로 관리
- 대상: 생산/공정 현장 작업자, 현장 관리자

## 2. 주요 기능
### 1) 관리자(사무실/현장 관리자)
- 작업지시 생성/수정/삭제 (제품, 수량, 작업공정, 작업자 배정 등)
- 작업지시 현황 모니터링 (진행중/완료/지연 등 상태별 필터)
- 작업자별 작업 이력 조회
- 실시간 알림(작업 시작/완료/이상 발생 등)

### 2) 작업자(현장)
- 본인에게 할당된 작업지시 실시간 확인
- 작업 시작/일시중지/완료 처리
- 작업 진행 중 사진/메모 첨부
- 작업지시 이력 조회

## 3. 기술 스택
- Frontend: Vite + React + TailwindCSS
- Backend/Infra: Firebase (Firestore DB, Firebase Auth, Cloud Functions), Firebase Hosting, Vercel(선택)
- 배포/운영: GitHub + Vercel CI/CD, Firebase Console

## 4. 데이터 모델(예시)
### 작업지시서 (WorkOrder)
- id: string
- title: string
- description: string
- product: string
- quantity: number
- assignedTo: userId
- status: “대기” | “진행중” | “완료” | “지연”
- createdAt: timestamp
- updatedAt: timestamp

### 사용자 (User)
- id: string
- name: string
- role: “관리자” | “작업자”
- email: string

### 작업 로그 (WorkLog)
- id: string
- workOrderId: string
- userId: string
- action: “시작” | “일시중지” | “완료” | “메모” | “사진첨부”
- timestamp: timestamp
- note: string (optional)
- photoUrl: string (optional)

## 5. 화면(페이지) 구성
1. 로그인/회원가입 (Firebase Auth)
2. 관리자 대시보드
   - 작업지시 목록/생성/수정/삭제
   - 작업자 관리
   - 실시간 현황판
3. 작업자 메인
   - 내 작업지시 목록
   - 작업 상세/진행/완료 처리
   - 사진/메모 첨부
4. 공통
   - 알림(Toast, Push 등)
   - 반응형 UI(모바일/태블릿 최적화)

## 6. MVP(최소기능제품) 범위
- 관리자: 작업지시 생성/수정/삭제, 작업자 배정, 상태 변경
- 작업자: 내 작업지시 확인, 진행/완료 처리, 메모/사진 첨부
- 실시간 데이터 동기화(Firestore)
- Firebase Auth(이메일/비밀번호 로그인)
- 반응형 UI

## 7. 확장 아이디어
- 바코드/QR코드로 작업지시 확인
- 공정별 실적 통계/리포트
- 외부 MES/ERP 연동
- 다국어 지원
