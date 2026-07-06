# codeit-todo

개인 할 일 관리를 위한 투두 서비스 — Codeit 프론트엔드 지원과제

## 데모

- 배포 링크: (배포 후 추가)

## 주요 기능

### 할 일 목록 (메인 페이지)

- 완료 여부에 따라 Todo / Done 두 영역으로 나누어 목록 표시
- 검색바에 이름을 입력하고 추가하기 버튼(또는 Enter)으로 새 할 일 등록, 입력값이 있을 때만 버튼 활성 스타일로 전환
- 체크박스 클릭으로 완료 여부 토글 — 서버 응답을 기다리지 않고 화면에 먼저 반영(낙관적 업데이트)하고, 요청이 실패하면 이전 상태로 롤백
- 각 영역이 비어 있으면 안내용 empty 상태 UI 표시
- 항목 클릭 시 상세 페이지로 이동

### 할 일 상세 (상세 페이지)

- 진입 시 서버에서 최신 데이터를 조회해 이름 / 메모 / 이미지 / 완료 여부를 채움
- 제목을 인라인 인풋으로 바로 수정 (클릭 시 상세 페이지 이동과 충돌하지 않도록 이벤트 전파 차단)
- 메모를 textarea로 수정
- 이미지 업로드: 파일 선택 즉시 로컬 미리보기(`URL.createObjectURL`)를 먼저 보여주고, 업로드가 끝나면 서버 URL로 교체 — 파일명은 영문만 허용, 5MB 이하로 제한
- 완료 여부 토글, 수정 완료 버튼으로 서버에 반영 후 목록으로 이동
- 삭제 버튼으로 항목 삭제 후 목록으로 이동

## 기술 스택

- [Next.js](https://nextjs.org) 16 (App Router)
- React 19, TypeScript
- Tailwind CSS — 모바일 퍼스트로 스타일을 잡고 `md`/`lg` 브레이크포인트로 태블릿·데스크탑 레이아웃을 확장
- SVGR — SVG 아이콘을 React 컴포넌트처럼 import해서 사용

## 폴더 구조

```
src/
├─ app/                  # 라우팅 (/, /items/[id])
├─ components/
│  ├─ pages/             # 페이지 단위 컴포넌트 (MainPage, DetailPage)
│  └─ common/            # 공통 컴포넌트 (Button, CheckListItem, GNB 등)
├─ lib/api/              # API 클라이언트 및 도메인별 요청 함수
└─ types/                # 공용 타입 정의
```

## 설계 포인트

- **모바일 퍼스트 반응형**: 기본 클래스는 모바일 레이아웃을 기준으로 작성하고, `md:`/`lg:` prefix로 태블릿·데스크탑에서 여백·간격·2단 레이아웃(Todo/Done 좌우 배치) 등을 점진적으로 확장.
- **API 계층 분리**: `lib/api/client.ts`의 공통 fetch 래퍼(`apiFetch`)가 헤더 처리·에러 변환(`ApiError`)·204 응답 처리를 전담하고, `config.ts`가 tenant 기반 endpoint 조립을 담당. 페이지 컴포넌트는 `items.ts`/`images.ts`의 함수만 호출하면 되므로 fetch 세부사항을 몰라도 됨.
- **낙관적 업데이트(Optimistic UI)**: 완료 토글처럼 응답 속도가 체감에 중요한 액션은 먼저 상태를 바꾸고, 실패 시에만 롤백해 지연을 숨김.
- **이미지 업로드 UX**: 업로드가 끝나기 전까지 로컬 미리보기를 먼저 보여줘서 실제 대기 시간과 무관하게 즉각적인 피드백 제공.
- **컴포넌트 재사용**: `CheckListItem`을 메인의 pill 형태(`list`)와 상세의 카드 형태(`detail`) variant로 나눠 하나의 컴포넌트로 공유.

## 시작하기

### 1. 설치

```bash
npm install
```

### 2. 환경 변수 설정

루트에 `.env.local` 파일을 만들고 아래 값을 채워주세요. (API 요청 함수가 이 값이 없으면 에러를 던지므로 필수입니다.)

```bash
NEXT_PUBLIC_BASE_URL=
NEXT_PUBLIC_TENANT_ID=
```

### 3. 개발 서버 실행

```bash
npm run dev
```

이후 [http://localhost:3000](http://localhost:3000) 에서 확인할 수 있습니다.

## 스크립트

| 명령어          | 설명           |
| --------------- | -------------- |
| `npm run dev`   | 개발 서버 실행  |
| `npm run build` | 프로덕션 빌드   |
| `npm run start` | 빌드된 앱 실행  |
| `npm run lint`  | ESLint 검사     |

## 협업 방식

- 커밋: `feat`, `fix`, `chore` 등 접두어로 목적 구분
- PR: [PULL_REQUEST_TEMPLATE](.github/PULL_REQUEST_TEMPLATE.md)에 맞춰 작업 내용 / 변경 사항 / 셀프 체크리스트 작성 후 리뷰 요청
