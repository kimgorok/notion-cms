# 개인 개발 블로그 (Notion CMS 기반) 로드맵

> PRD 기준 문서: `docs/PRD.md`  
> 작성 기준: 솔로 개발자 1인, 2026-06-01 기준

---

## 1. 프로젝트 개요

| 항목 | 내용 |
|------|------|
| **프로젝트명** | 개인 개발 블로그 (Notion CMS 기반) |
| **목적** | Notion을 CMS로 활용한 Claude AI 기술 블로그 운영 |
| **대상 독자** | 개발자, Claude AI 활용에 관심 있는 독자 |
| **배포 환경** | Vercel (서버리스) |
| **기술 스택** | Next.js 15, TypeScript 5, Tailwind CSS 4, shadcn/ui, Notion API |
| **개발 체계** | 솔로 개발자 1인 |
| **총 예상 기간** | MVP 4일 + 개선 단계 |

### 성공 기준

- [ ] Notion에서 글을 발행하면 블로그에 60초 이내 자동 반영된다
- [ ] 모바일/태블릿/데스크톱에서 정상적으로 표시된다
- [ ] 카테고리 필터 및 제목 검색이 동작한다
- [ ] Vercel에 배포 완료 및 공개 URL이 존재한다
- [ ] Lighthouse SEO 점수 90점 이상

---

## 2. 전략적 목표

### 비즈니스 목표
- Notion 편집기만으로 블로그 콘텐츠를 관리할 수 있는 워크플로우 구축
- 별도 백엔드 서버 없이 서버리스 아키텍처로 유지비용 최소화
- Claude AI 관련 기술 글을 체계적으로 아카이빙하는 플랫폼 확보

### 기술적 목표
- Next.js 15 App Router + ISR(60초 revalidate)로 성능과 최신성 균형 확보
- Notion API 연동 레이어를 `lib/notion.ts`에 캡슐화하여 유지보수성 향상
- 시맨틱 HTML + Tailwind CSS로 접근성 및 SEO 기반 확보
- Notion API 키를 서버 사이드에서만 사용하여 보안 준수

### 사용자 가치 제안
- 독자: 카테고리/검색으로 원하는 글을 빠르게 찾을 수 있다
- 작성자(본인): Notion에서 글을 작성하는 것만으로 블로그가 자동 업데이트된다

---

## 3. 주요 마일스톤 (Timeline)

| Phase | 기간 | 주요 목표 | 완료 기준 |
|-------|------|----------|----------|
| **Phase 1** | Day 1 오전 (0.5일) | 환경 설정 + Notion 구성 | Notion API 연결 확인, 샘플 글 조회 성공 |
| **Phase 2** | Day 1 오후 (0.5일) | Notion API 연동 레이어 | `getPosts()`, `getPost()`, `getPageBlocks()` 동작 확인 |
| **Phase 3** | Day 2 (1일) | 글 목록 페이지 구현 | 홈 페이지에서 글 목록 렌더링, 카테고리 필터 동작 |
| **Phase 4** | Day 3 (1일) | 글 상세 페이지 구현 | Notion 블록 렌더링, ISR 적용, SEO 메타데이터 설정 |
| **Phase 5** | Day 4 (1일) | 스타일링 + 배포 | 반응형 완성, 검색 기능, Vercel 배포 완료 |
| **Phase 6** | MVP 이후 | 개선 기능 (다크 모드, RSS) | 별도 일정 수립 |

---

## 4. Phase별 상세 계획

---

### Phase 1: 환경 설정 및 Notion 구성

**기간**: Day 1 오전 (약 0.5일)  
**목표**: 개발 환경을 완성하고 Notion 데이터베이스와의 연결을 검증한다  
**성공 기준**: Notion API 호출이 성공하고, 샘플 글 데이터가 콘솔에 출력된다

#### Sprint 1.1 — 패키지 및 환경변수 설정

---

**Task 1.1.1: Notion 클라이언트 패키지 설치**

- 설명: `@notionhq/client` 패키지를 설치하고 의존성을 확인한다
- 명령어: `npm install @notionhq/client`
- 스토리 포인트: 1
- 담당 역할: Frontend/Full-stack
- 선행 작업: 없음
- 수락 기준:
  - `package.json`에 `@notionhq/client` 의존성이 추가되어 있다
  - `npm run build`가 오류 없이 통과한다

---

**Task 1.1.2: 환경변수 설정**

- 설명: `.env.local` 파일에 Notion API 키와 데이터베이스 ID를 설정한다. `.env.example` 파일도 함께 생성하여 팀 공유용 템플릿을 만든다
- 파일 위치: `.env.local`, `.env.example`
- 스토리 포인트: 1
- 담당 역할: Full-stack
- 선행 작업: Task 1.1.1
- 수락 기준:
  - `.env.local`에 `NOTION_API_KEY`, `NOTION_DATABASE_ID`가 정의되어 있다
  - `.env.example`에 키 이름만 있고 값은 비어있는 상태로 작성되어 있다
  - `.env.local`이 `.gitignore`에 포함되어 있다

---

**Task 1.1.3: TypeScript 타입 정의 파일 생성**

- 설명: Notion 데이터베이스 속성을 TypeScript 인터페이스로 정의한다. PRD의 데이터베이스 속성(Title, Category, Tags, Published, Status)을 타입화한다
- 파일 위치: `types/notion.ts`
- 스토리 포인트: 2
- 담당 역할: Full-stack
- 선행 작업: 없음
- 수락 기준:
  - `PostMeta` 인터페이스가 id, title, category, tags, publishedAt, status 필드를 포함한다
  - `NotionBlock` 타입이 지원할 블록 타입(paragraph, heading_1~3, code, quote, bulleted_list_item, numbered_list_item, image, divider)을 포함한다
  - TypeScript strict 모드에서 컴파일 오류가 없다

---

#### Sprint 1.2 — Notion 데이터베이스 구성

**Task 1.2.1: Notion Integration 생성 및 데이터베이스 연결**

- 설명: Notion에서 Integration을 생성하고, 블로그용 데이터베이스에 Integration을 공유(Share)한다. PRD 기준 속성(Title, Category, Tags, Published, Status)을 데이터베이스에 정의한다
- 스토리 포인트: 2
- 담당 역할: Full-stack (Notion 설정)
- 선행 작업: Task 1.1.2
- 수락 기준:
  - Notion Integration이 생성되어 API 키가 발급되어 있다
  - 데이터베이스에 5개 속성(Title, Category, Tags, Published, Status)이 정확한 타입으로 생성되어 있다
  - Integration이 데이터베이스에 공유(Share)되어 있다

---

**Task 1.2.2: 샘플 콘텐츠 작성**

- 설명: Notion 데이터베이스에 `Status=발행됨`인 샘플 글을 3~5개 작성한다. 다양한 블록 타입(제목, 단락, 코드, 인용, 목록)을 포함하여 렌더러 테스트에 활용한다
- 스토리 포인트: 2
- 담당 역할: Full-stack (콘텐츠 작성)
- 선행 작업: Task 1.2.1
- 수락 기준:
  - `Status=발행됨`인 글이 최소 3개 이상 존재한다
  - 각 글에 카테고리, 태그, 발행일이 설정되어 있다
  - 최소 1개의 글에 코드 블록, 인용, 이미지가 포함되어 있다

---

### Phase 2: Notion API 연동 레이어

**기간**: Day 1 오후 (약 0.5일)  
**목표**: `lib/notion.ts`에 재사용 가능한 API 함수를 구현한다  
**성공 기준**: 각 함수가 정확한 데이터를 반환하고 TypeScript 타입이 맞는다

#### Sprint 2.1 — API 레이어 구현

**Task 2.1.1: Notion 클라이언트 초기화 및 `getPosts()` 구현**

- 설명: `lib/notion.ts`를 생성하고 Notion 클라이언트를 초기화한다. `getPosts()`는 `Status=발행됨` 필터와 `Published` 내림차순 정렬을 적용하여 글 목록을 반환한다. 반환 데이터는 `PostMeta[]` 타입으로 정규화한다
- 파일 위치: `lib/notion.ts`
- 스토리 포인트: 3
- 담당 역할: Full-stack
- 선행 작업: Task 1.1.2, Task 1.1.3, Task 1.2.1
- 수락 기준:
  - `getPosts()`가 `PostMeta[]`를 반환한다
  - `Status=초안`인 글은 결과에 포함되지 않는다
  - 발행일 내림차순으로 정렬된다
  - 환경변수가 없을 때 명확한 에러 메시지를 출력한다

---

**Task 2.1.2: `getPost()` 및 `getPageBlocks()` 구현**

- 설명: `getPost(pageId)`는 단일 글의 메타데이터를 반환한다. `getPageBlocks(pageId)`는 Notion 페이지의 블록 목록을 반환한다. 두 함수 모두 `PostMeta`와 `NotionBlock[]` 타입으로 정규화한다
- 파일 위치: `lib/notion.ts`
- 스토리 포인트: 3
- 담당 역할: Full-stack
- 선행 작업: Task 2.1.1
- 수락 기준:
  - `getPost(pageId)`가 유효한 pageId에 대해 `PostMeta`를 반환한다
  - `getPageBlocks(pageId)`가 블록 배열을 반환한다
  - 존재하지 않는 pageId에 대해 `null` 또는 빈 배열을 반환한다 (앱이 크래시되지 않는다)
  - TypeScript strict 모드에서 타입 오류가 없다

---

**Task 2.1.3: Notion API 연동 동작 검증**

- 설명: Playwright MCP를 사용한 브라우저 자동화 테스트를 작성하여 세 함수가 실제 Notion 데이터를 정상 반환하는지 검증한다. 간단한 테스트 페이지 또는 임시 API 라우트(`app/api/test/route.ts`)를 생성하여 테스트하고, 검증 완료 후 삭제한다
- 스토리 포인트: 1
- 담당 역할: Full-stack
- 선행 작업: Task 2.1.2
- 수락 기준:
  - Playwright MCP를 사용하여 `getPosts()`의 응답 검증 (샘플 글 3개 이상 반환)
  - `getPageBlocks()`가 블록 데이터를 정상 반환하는지 확인
  - 테스트 페이지/라우트에서 데이터 로딩 및 렌더링이 성공함을 Playwright로 확인
  - 테스트 후 임시 라우트 또는 테스트 페이지가 완전히 삭제되어 있다

---

### Phase 3: 글 목록 페이지 구현

**기간**: Day 2 (1일)  
**목표**: 홈 페이지에서 글 목록을 렌더링하고 카테고리 필터가 동작한다  
**성공 기준**: `npm run dev`에서 홈 페이지가 글 목록을 표시하고, 카테고리 탭이 URL 쿼리 파라미터와 연동된다

#### Sprint 3.1 — 홈 페이지 레이아웃

**Task 3.1.1: 블로그 공통 헤더/푸터 컴포넌트 구현**

- 설명: 기존 `components/layout/header.tsx`와 `footer.tsx`를 블로그에 맞게 수정하거나 새로 작성한다. 헤더에는 블로그 로고(텍스트), 홈 링크가 포함된다. 푸터에는 저작권 표시와 GitHub 링크가 포함된다
- 파일 위치: `components/layout/blog-header.tsx`, `components/layout/blog-footer.tsx`
- 스토리 포인트: 2
- 담당 역할: Frontend
- 선행 작업: 없음
- 수락 기준:
  - 헤더에 블로그명과 홈 링크(`/`)가 있다
  - 푸터에 저작권 표시와 GitHub 링크가 있다
  - 반응형으로 모바일/데스크톱에서 레이아웃이 깨지지 않는다

---

**Task 3.1.2: PostCard 컴포넌트 구현**

- 설명: 글 목록에서 각 글을 표시하는 카드 컴포넌트를 구현한다. 표시 항목: 제목, 카테고리 배지, 태그 목록, 발행일. shadcn/ui의 `Card` 컴포넌트를 기반으로 구현한다. 카드 클릭 시 `/posts/[slug]`로 이동한다
- 파일 위치: `components/blog/PostCard.tsx`
- 스토리 포인트: 3
- 담당 역할: Frontend
- 선행 작업: Task 1.1.3
- 수락 기준:
  - 제목, 카테고리 배지, 태그, 발행일이 표시된다
  - 발행일은 `YYYY.MM.DD` 형식으로 포맷된다
  - 카드 전체 영역이 클릭 가능하고 `/posts/[id]`로 이동한다
  - `PostMeta` 타입의 props를 받는다

---

**Task 3.1.3: CategoryFilter 컴포넌트 구현**

- 설명: 카테고리 목록을 탭 형태로 표시하는 필터 컴포넌트를 구현한다. "전체" 탭이 기본 선택 상태이다. 탭 선택 시 URL 쿼리 파라미터(`?category=Claude`)가 업데이트된다. Next.js `useSearchParams`와 `useRouter`를 활용한다
- 파일 위치: `components/blog/CategoryFilter.tsx`
- 스토리 포인트: 3
- 담당 역할: Frontend
- 선행 작업: Task 1.1.3
- 수락 기준:
  - "전체" 탭과 각 카테고리 탭이 표시된다
  - 탭 선택 시 URL 쿼리 파라미터가 변경된다 (`?category=Claude`)
  - 현재 선택된 탭이 시각적으로 강조된다
  - "전체" 탭 선택 시 쿼리 파라미터가 제거된다
  - `use client` 지시자가 포함되어 있다

---

#### Sprint 3.2 — 홈 페이지 통합

**Task 3.2.1: 홈 페이지(`app/page.tsx`) 구현**

- 설명: `app/page.tsx`에서 `getPosts()`를 호출하여 글 목록을 조회한다. URL 쿼리 파라미터의 `category` 값으로 글 목록을 필터링하여 표시한다. 글 목록은 3열(데스크톱) 그리드로 배치한다. ISR `revalidate: 60`을 설정한다. 구현 후 Playwright MCP로 브라우저 테스트를 수행한다
- 파일 위치: `app/page.tsx`
- 스토리 포인트: 3
- 담당 역할: Full-stack
- 선행 작업: Task 2.1.1, Task 3.1.1, Task 3.1.2, Task 3.1.3
- 수락 기준:
  - 글 목록이 `PostCard` 컴포넌트로 렌더링된다
  - `?category=Claude` 쿼리 파라미터로 필터링이 동작한다
  - `revalidate = 60`이 설정되어 있다
  - 글이 없을 때 빈 상태 메시지가 표시된다
  - Hero 섹션(블로그 소개 문구)이 상단에 표시된다
  - **테스트**: Playwright MCP로 홈 페이지 로드 및 글 목록 렌더링 검증, 카테고리 필터 클릭 동작 검증

---

**Task 3.2.2: 카테고리 상세 페이지(`app/category/[name]/page.tsx`) 구현**

- 설명: `/category/[name]` 경로에서 특정 카테고리의 글 목록만 표시한다. `getPosts()`에서 카테고리를 필터링하거나, 별도 API 함수를 추가한다. 홈 페이지와 동일한 `PostCard` 그리드 레이아웃을 사용한다
- 파일 위치: `app/category/[name]/page.tsx`
- 스토리 포인트: 2
- 담당 역할: Full-stack
- 선행 작업: Task 3.2.1
- 수락 기준:
  - `/category/Claude`에 접근하면 Claude 카테고리 글만 표시된다
  - 존재하지 않는 카테고리는 404 페이지로 처리된다
  - 페이지 제목에 카테고리명이 표시된다
  - `revalidate = 60`이 설정되어 있다

---

### Phase 4: 글 상세 페이지 구현

**기간**: Day 3 (1일)  
**목표**: Notion 블록을 HTML로 렌더링하고, ISR 및 SEO 메타데이터가 적용된다  
**성공 기준**: 글 상세 페이지가 본문을 정상 렌더링하고, 뷰소스에서 og 메타태그가 확인된다

#### Sprint 4.1 — Notion 블록 렌더러

**Task 4.1.1: NotionRenderer 컴포넌트 구현**

- 설명: Notion 블록 배열을 받아 HTML 요소로 변환하는 렌더러 컴포넌트를 구현한다. PRD에서 요구하는 블록 타입을 지원한다: `paragraph`, `heading_1`, `heading_2`, `heading_3`, `code`, `quote`, `bulleted_list_item`, `numbered_list_item`, `image`, `divider`. 지원하지 않는 블록 타입은 무시한다(앱 크래시 방지)
- 파일 위치: `components/blog/NotionRenderer.tsx`
- 스토리 포인트: 5
- 담당 역할: Frontend
- 선행 작업: Task 1.1.3, Task 2.1.2
- 수락 기준:
  - 9가지 블록 타입이 올바른 HTML 요소로 렌더링된다 (h1, h2, h3, p, pre/code, blockquote, ul/li, ol/li, img, hr)
  - 코드 블록에 언어 정보가 표시된다 (예: `language-typescript` 클래스)
  - 이미지에 alt 속성이 포함된다 (접근성)
  - 지원하지 않는 블록 타입이 있어도 페이지가 크래시되지 않는다
  - TypeScript strict 모드에서 타입 오류가 없다

---

**Task 4.1.2: 글 상세 페이지(`app/posts/[slug]/page.tsx`) 구현**

- 설명: `getPost()`와 `getPageBlocks()`를 호출하여 글 메타데이터와 본문을 조회한다. `NotionRenderer`로 본문을 렌더링한다. PRD 와이어프레임에 따라 뒤로가기 버튼, 글 제목(H1), 카테고리 배지, 태그 목록, 발행일을 표시한다. `generateMetadata()`로 og:title, og:description을 설정한다. ISR `revalidate: 60`을 설정한다. 구현 후 Playwright MCP로 렌더링 및 메타데이터 검증을 수행한다
- 파일 위치: `app/posts/[slug]/page.tsx`
- 스토리 포인트: 5
- 담당 역할: Full-stack
- 선행 작업: Task 4.1.1, Task 2.1.2
- 수락 기준:
  - 글 제목, 카테고리 배지, 태그, 발행일이 표시된다
  - `NotionRenderer`로 본문 블록이 렌더링된다
  - 뒤로가기 버튼이 이전 페이지 또는 홈으로 이동한다
  - `generateMetadata()`에서 `og:title`과 `og:description`이 글 데이터로 설정된다
  - 존재하지 않는 slug는 `notFound()`로 404 처리된다
  - `revalidate = 60`이 설정되어 있다
  - **테스트**: Playwright MCP로 글 상세 페이지 로드 및 내용 렌더링 검증, 메타데이터(og:title, og:description) 검증, 뒤로가기 네비게이션 동작 검증

---

**Task 4.1.3: `generateStaticParams()` 구현**

- 설명: 빌드 시 발행된 글의 slug를 미리 생성하여 SSG(Static Site Generation)를 적용한다. `getPosts()`를 활용하여 pageId 목록을 반환한다
- 파일 위치: `app/posts/[slug]/page.tsx` (동일 파일 내)
- 스토리 포인트: 2
- 담당 역할: Full-stack
- 선행 작업: Task 4.1.2
- 수락 기준:
  - `generateStaticParams()`가 현재 발행된 글의 slug 배열을 반환한다
  - `npm run build` 후 정적 페이지가 생성된다
  - 빌드 타임에 존재하지 않는 slug는 런타임에 ISR로 생성된다

---

### Phase 5: 스타일링 및 배포

**기간**: Day 4 (1일)  
**목표**: 반응형 레이아웃을 완성하고, 검색 기능을 추가하고, Vercel에 배포한다  
**성공 기준**: 공개 Vercel URL에서 모든 기능이 정상 동작한다

#### Sprint 5.1 — 반응형 및 검색

**Task 5.1.1: 반응형 그리드 레이아웃 적용**

- 설명: PRD 요구사항에 따라 글 목록 그리드를 반응형으로 적용한다. Tailwind CSS 반응형 prefix를 사용한다: 모바일 1열, 태블릿(md:) 2열, 데스크톱(lg:) 3열. 홈 페이지와 카테고리 페이지에 동일하게 적용한다
- 스토리 포인트: 2
- 담당 역할: Frontend
- 선행 작업: Task 3.2.1, Task 3.2.2
- 수락 기준:
  - 모바일(~767px)에서 1열로 표시된다
  - 태블릿(768~1023px)에서 2열로 표시된다
  - 데스크톱(1024px~)에서 3열로 표시된다
  - Chrome DevTools 모바일 에뮬레이터에서 레이아웃이 깨지지 않는다

---

**Task 5.1.2: 글 상세 페이지 본문 타이포그래피 스타일링**

- 설명: `NotionRenderer`가 출력하는 HTML 요소에 Tailwind CSS Prose 스타일 또는 커스텀 스타일을 적용한다. 제목 계층 구조(H1>H2>H3), 코드 블록 배경색, 인용 블록 좌측 테두리, 목록 들여쓰기 등을 스타일링한다
- 스토리 포인트: 3
- 담당 역할: Frontend
- 선행 작업: Task 4.1.1
- 수락 기준:
  - H1, H2, H3 제목이 시각적으로 구분된다
  - 코드 블록에 배경색과 고정폭 폰트가 적용된다
  - 인용 블록에 좌측 테두리와 이탤릭체가 적용된다
  - 모바일에서 가독성이 양호하다 (폰트 크기, 줄간격)

---

**Task 5.1.3: 검색 기능 구현**

- 설명: 헤더 또는 홈 페이지에 검색 입력창을 추가하고, 클라이언트 사이드에서 글 제목 기준으로 실시간 필터링을 구현한다. `useState`와 `useMemo`를 활용하여 검색어가 변경될 때마다 목록을 필터링한다. 검색은 대소문자 구분 없이 동작한다. 구현 후 Playwright MCP로 검색 동작 검증을 수행한다
- 파일 위치: `components/blog/SearchInput.tsx`, `app/page.tsx` (통합)
- 스토리 포인트: 3
- 담당 역할: Frontend
- 선행 작업: Task 3.2.1
- 수락 기준:
  - 검색창에 입력하면 실시간으로 글 목록이 필터링된다
  - 검색은 제목 기준으로 동작하며 대소문자를 구분하지 않는다
  - 검색 결과가 없을 때 안내 메시지가 표시된다
  - 검색어를 지우면 전체 목록이 복원된다
  - 카테고리 필터와 검색이 동시에 동작한다
  - **테스트**: Playwright MCP로 검색창 입력, 실시간 필터링 동작, 검색 결과 없음 상태 검증

---

#### Sprint 5.2 — 배포

**Task 5.2.1: Vercel 배포 설정**

- 설명: Vercel에 프로젝트를 연결하고 환경변수를 설정한다. `NOTION_API_KEY`, `NOTION_DATABASE_ID`를 Vercel 대시보드에 등록한다. 배포 후 공개 URL에서 Playwright MCP를 사용한 E2E 테스트를 수행하여 전체 기능을 검증한다
- 스토리 포인트: 2
- 담당 역할: DevOps/Full-stack
- 선행 작업: Task 5.1.1, Task 5.1.2, Task 5.1.3
- 수락 기준:
  - Vercel 배포가 성공하고 공개 URL이 생성된다
  - Vercel 환경변수에 `NOTION_API_KEY`, `NOTION_DATABASE_ID`가 등록되어 있다
  - **Playwright MCP E2E 테스트**: 공개 URL에서 글 목록 로드, 글 상세 페이지 접근, 카테고리 필터 동작, 검색 기능 동작 모두 검증
  - Notion API 키가 클라이언트 번들에 노출되지 않는다 (Chrome DevTools 소스 탭 확인)

---

**Task 5.2.2: SEO 및 빌드 최종 검증**

- 설명: `npm run build`로 프로덕션 빌드를 실행하고 오류가 없는지 확인한다. 글 상세 페이지에서 og:title, og:description 메타태그를 확인한다. Lighthouse 또는 뷰소스로 시맨틱 HTML과 이미지 alt 속성을 점검한다
- 스토리 포인트: 2
- 담당 역할: Full-stack
- 선행 작업: Task 5.2.1
- 수락 기준:
  - `npm run build`가 오류 없이 완료된다
  - `npm run lint`가 경고 없이 통과한다
  - 글 상세 페이지 뷰소스에서 `og:title`, `og:description`이 확인된다
  - 모든 이미지에 `alt` 속성이 있다
  - TypeScript 타입 오류가 없다

---

### Phase 6: MVP 이후 개선 기능

**기간**: MVP 완료 후 별도 일정 수립  
**목표**: PRD에서 MVP 제외로 분류된 기능을 구현한다

#### Sprint 6.1 — 다크 모드

**Task 6.1.1: 다크 모드 구현**

- 설명: 이미 프로젝트에 설정된 `next-themes`를 활용하여 다크 모드를 활성화한다. 헤더에 ThemeToggle 버튼을 추가하고, 블로그 커스텀 컴포넌트(PostCard, NotionRenderer)에 다크 모드 색상을 적용한다
- 스토리 포인트: 3
- 담당 역할: Frontend
- 선행 작업: Phase 5 완료
- 수락 기준:
  - 헤더의 토글 버튼으로 라이트/다크 모드 전환이 된다
  - 새로고침 후에도 선택한 테마가 유지된다
  - 모든 페이지에서 다크 모드 색상이 깨지지 않는다

---

#### Sprint 6.2 — RSS 피드

**Task 6.2.1: RSS 피드 구현**

- 설명: `/rss.xml` 경로에서 RSS 피드를 제공하는 API 라우트를 구현한다. `getPosts()`로 글 목록을 조회하고, RSS 2.0 형식의 XML을 반환한다. 구현 후 Playwright MCP로 RSS 엔드포인트 응답 및 콘텐츠 검증을 수행한다
- 파일 위치: `app/rss.xml/route.ts`
- 스토리 포인트: 3
- 담당 역할: Full-stack
- 선행 작업: Task 2.1.1
- 수락 기준:
  - `/rss.xml` URL이 유효한 RSS 2.0 형식의 XML을 반환한다
  - 각 item에 title, link, description, pubDate가 포함된다
  - **테스트**: Playwright MCP로 RSS 엔드포인트 요청, XML 응답 구조 검증, 포함된 아이템 수 확인
  - RSS 피드 유효성 검사 도구(예: W3C Feed Validator)를 통과한다

---

## 5. 의존성 맵

```
Task 1.1.1 (패키지 설치)
    └── Task 1.1.2 (환경변수)
            └── Task 2.1.1 (getPosts)
                    └── Task 2.1.2 (getPost, getPageBlocks)
                            └── Task 2.1.3 (검증)

Task 1.1.3 (타입 정의)
    ├── Task 3.1.2 (PostCard)
    ├── Task 3.1.3 (CategoryFilter)
    └── Task 4.1.1 (NotionRenderer)

Task 1.2.1 (Notion 설정) ──── Task 1.2.2 (샘플 콘텐츠)
    └── Task 2.1.1 (getPosts)

[Phase 2 완료]
    ├── Task 3.2.1 (홈 페이지)
    │       └── Task 3.2.2 (카테고리 페이지)
    └── Task 4.1.1 (NotionRenderer)
            └── Task 4.1.2 (글 상세 페이지)
                    └── Task 4.1.3 (generateStaticParams)

[Phase 3 + Phase 4 완료]
    ├── Task 5.1.1 (반응형)
    ├── Task 5.1.2 (타이포그래피)
    └── Task 5.1.3 (검색)
            └── Task 5.2.1 (Vercel 배포)
                    └── Task 5.2.2 (최종 검증)
```

**병렬 작업 가능한 구간**

| 구간 | 병렬 가능 작업 |
|------|--------------|
| Phase 1 | Task 1.1.3 (타입 정의)와 Task 1.2.x (Notion 설정) 병렬 진행 가능 |
| Phase 3 초반 | Task 3.1.1 (헤더/푸터), Task 3.1.2 (PostCard), Task 3.1.3 (CategoryFilter) 병렬 가능 |
| Phase 4~5 | Task 5.1.2 (타이포그래피)는 Task 4.1.1 완료 후 즉시 병렬 시작 가능 |

---

## 5.5. 테스트 전략 (Playwright MCP 활용)

이 로드맵의 모든 Task는 **구현 후 반드시 테스트를 수행**합니다. API 연동 및 비즈니스 로직이 포함된 작업은 다음 테스트 절차를 따릅니다:

### 필수 테스트 순서

1. **개발 서버 실행**: `npm run dev` (localhost:3000)
2. **Playwright MCP 브라우저 자동화 테스트** 수행
3. **핵심 시나리오(골든 패스) 검증** - 정상 경로 동작 확인
4. **엣지 케이스 및 오류 상황 검증** - 예외 처리 동작 확인
5. **회귀 테스트** - 기존 기능 영향 여부 확인

### Playwright MCP 사용 기준

다음 작업들은 **필수적으로** Playwright MCP 테스트를 수행합니다:

- **Phase 2**: Task 2.1.3 (Notion API 연동 동작 검증)
- **Phase 3**: Task 3.2.1 (홈 페이지), Task 3.2.2 (카테고리 페이지)
- **Phase 4**: Task 4.1.2 (글 상세 페이지), Task 4.1.3 (정적 생성)
- **Phase 5**: Task 5.1.3 (검색 기능), Task 5.2.1 (Vercel 배포 E2E), Task 5.2.2 (최종 검증)
- **Phase 6**: Task 6.2.1 (RSS 피드)

### 테스트 없이 완료로 간주하지 않습니다

> 구현이 완성되었더라도 Playwright MCP 테스트를 통과하지 않으면 해당 Task는 **완료(Done) 상태가 아닙니다**.

---

## 6. 위험 관리

| 위험 요소 | 발생 확률 | 영향도 | 완화 방안 |
|----------|---------|--------|---------|
| Notion API 응답 속도 저하 | 중 | 중 | ISR 60초 캐시로 API 호출 빈도 최소화, 에러 시 fallback UI 표시 |
| Notion API 레이트 리밋 초과 | 저 | 고 | 빌드 타임 `generateStaticParams`로 런타임 API 호출 최소화 |
| 지원하지 않는 Notion 블록 타입 렌더링 실패 | 고 | 중 | `NotionRenderer`에서 미지원 블록은 무시하고 계속 렌더링 |
| Notion 데이터베이스 속성명 오타 | 중 | 고 | 타입 정의(Task 1.1.3) 시 속성명을 상수로 관리 |
| Vercel 환경변수 미설정으로 배포 실패 | 중 | 고 | `.env.example` 체크리스트 관리, 배포 전 환경변수 사전 등록 |
| 이미지 블록 외부 URL 만료 | 저 | 저 | Notion 이미지 URL은 만료될 수 있으므로 `next/image`로 프록시 처리 고려 |

---

## 7. 리소스 계획

### 인력

| 역할 | 인원 | 비고 |
|------|------|------|
| Full-stack 개발자 | 1명 (본인) | Frontend + Backend + DevOps 모두 담당 |

### 예상 스토리 포인트 합계

| Phase | 스토리 포인트 합계 |
|-------|-----------------|
| Phase 1 (환경 설정) | 8 SP |
| Phase 2 (API 레이어) | 7 SP |
| Phase 3 (글 목록 페이지) | 13 SP |
| Phase 4 (글 상세 페이지) | 12 SP |
| Phase 5 (스타일링 + 배포) | 10 SP |
| Phase 6 (MVP 이후) | 6 SP |
| **MVP 합계 (Phase 1~5)** | **50 SP** |

> 1 SP ≈ 약 1시간 기준으로 환산 시 약 50시간 (4일 x 하루 12~13시간 집중 작업)

### 외부 의존성

| 항목 | 용도 | 비용 |
|------|------|------|
| Notion 계정 | CMS 콘텐츠 관리 | 무료 (Personal 플랜) |
| Vercel 계정 | 배포 및 CDN | 무료 (Hobby 플랜) |
| GitHub 저장소 | 소스 코드 버전 관리 | 무료 |

---

## 8. Definition of Done (완료 기준)

각 Task가 "완료"로 간주되려면 다음을 모두 충족해야 합니다:

- [ ] 수락 기준(Acceptance Criteria)을 모두 충족한다
- [ ] `npm run build`가 오류 없이 통과한다
- [ ] `npm run lint`가 경고 없이 통과한다
- [ ] TypeScript strict 모드에서 타입 오류가 없다
- [ ] `npm run dev`에서 변경 사항을 시각적으로 확인했다
- [ ] API 연동·비즈니스 로직 포함 작업은 Playwright MCP 테스트를 수행했다
- [ ] 테스트 없이는 작업을 완료로 표기하지 않는다
- [ ] 커밋 메시지가 컨벤셔널 커밋 + 이모지 형식을 준수한다

---

## 9. 변경 이력

| 날짜 | 버전 | 변경 내용 | 변경자 |
|------|------|---------|-------|
| 2026-06-01 | v1.0.0 | 최초 로드맵 작성 (PRD v1 기반) | kimgorok |
