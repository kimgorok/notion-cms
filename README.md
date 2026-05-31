# 개인 개발 블로그 (Notion CMS)

Notion을 CMS로 활용한 개인 Claude 활용 기술 블로그입니다.
Notion에서 글을 작성하면 자동으로 블로그에 반영됩니다.

## 기술 스택

- **Next.js 15** - App Router 기반 SSR/SSG 프레임워크
- **TypeScript** - 타입 안전성 확보
- **Notion API** (`@notionhq/client`) - 콘텐츠 소스 (CMS)
- **Tailwind CSS** - 유틸리티 기반 스타일링
- **shadcn/ui** - 재사용 가능한 UI 컴포넌트
- **Lucide React** - 아이콘 라이브러리
- **Vercel** - 배포 플랫폼

## 주요 기능

- Notion 데이터베이스에서 블로그 글 목록 자동 연동
- 개별 글 상세 페이지 렌더링
- 카테고리별 필터링
- 검색 기능
- 반응형 디자인

## Notion 데이터베이스 구조

| 속성 | 타입 | 설명 |
|------|------|------|
| Title | title | 글 제목 |
| Category | select | 카테고리 |
| Tags | multi_select | 태그 목록 |
| Published | date | 발행일 |
| Status | select | 초안 / 발행됨 |

## 시작하기

### 1. 패키지 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 아래 값을 입력하세요:

```env
NOTION_API_KEY=secret_xxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

> Notion Integration 생성 및 데이터베이스 공유 방법은 [PRD 문서](docs/PRD.md)를 참고하세요.

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

### 4. 프로덕션 빌드

```bash
npm run build
npm start
```

## 프로젝트 구조

```
.
├── app/                   # Next.js App Router
│   ├── layout.tsx        # 루트 레이아웃
│   ├── page.tsx          # 홈 페이지 (글 목록)
│   ├── globals.css       # 글로벌 스타일
│   └── posts/[slug]/     # 글 상세 페이지
├── components/
│   ├── ui/               # shadcn/ui 컴포넌트
│   ├── layout/           # 헤더, 푸터, 사이드바
│   └── common/           # 공통 컴포넌트
├── lib/
│   ├── utils.ts          # 유틸리티 함수
│   └── notion.ts         # Notion API 클라이언트
├── docs/
│   └── PRD.md            # 프로젝트 요구사항 문서
└── public/               # 정적 파일
```

## 스크립트

```bash
npm run dev    # 개발 서버 실행
npm run build  # 프로덕션 빌드
npm start      # 프로덕션 서버 실행
npm run lint   # ESLint 실행
```

## 참고 문서

- [Next.js 공식 문서](https://nextjs.org/docs)
- [Notion API 문서](https://developers.notion.com)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [shadcn/ui 문서](https://ui.shadcn.com)

## 라이선스

MIT
