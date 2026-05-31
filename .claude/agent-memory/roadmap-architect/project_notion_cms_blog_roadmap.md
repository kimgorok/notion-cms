---
name: notion-cms-blog-roadmap
description: Notion CMS 블로그 프로젝트 로드맵 생성 이력 — Phase 구성, 기술 스택, 위험 요소, 현재 구현 상태
metadata:
  type: project
---

Notion CMS 기반 개인 개발 블로그의 ROADMAP.md를 2026-06-01 기준으로 생성함.

**Phase 구성 (총 4일 예상)**:
- Phase 1: 환경 설정 (2h) — .env.local, @notionhq/client
- Phase 2: Notion DB 구성 (1h) — 속성 정의, 샘플 글 3개
- Phase 3: API 연동 레이어 안정화 (3h) — slug 유틸리티, 블록 타입 커버리지
- Phase 4: 글 목록 페이지 (6h) — PostCard, CategoryFilter, 검색
- Phase 5: 글 상세 페이지 (6h) — NotionRenderer, ISR, SEO
- Phase 6: 스타일링 + Vercel 배포 (6h)

**기술 스택**: Next.js 15, TypeScript 5, Tailwind CSS 4, shadcn/ui, Notion API (@notionhq/client), Vercel

**식별된 주요 위험 요소**:
- next/image Notion CDN 도메인 차단 (발생 가능성 높음 — next.config.js에 도메인 추가 필요)
- Notion API Rate Limit (ISR 캐싱으로 완화)
- Vercel 환경 변수 누락

**현재 구현 완료 항목 (로드맵 작성 시점)**:
- lib/notion.ts (getPosts, getPost, getPageBlocks, getPostsByCategory, getAllCategories)
- lib/types.ts (BlogPost, NotionBlock)
- components/PostCard.tsx, CategoryFilter.tsx, NotionRenderer.tsx 파일 존재
- app/posts/[slug], app/category/[name] 디렉토리 존재
- 환경 변수(.env.local), 슬러그 처리, 실제 UI 구현은 미완성

**솔로 개발 특성**: 담당자 역할 구분 없음, 병렬 작업 제한적. Phase 4와 Phase 5는 Phase 3 완료 후 병렬 가능.

**Why:** 로드맵 생성 시점에 스타터킷 기반 세팅 및 API 레이어 일부가 구현된 상태로 시작.
**How to apply:** 향후 동일 프로젝트 작업 시 현재 구현 완료 항목을 참고하여 중복 작업 방지.
