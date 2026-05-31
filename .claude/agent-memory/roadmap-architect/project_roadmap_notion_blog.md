---
name: project-roadmap-notion-blog
description: Notion CMS 기반 개인 블로그 로드맵 — Phase 구성, SP 합계, 주요 위험 요소, 솔로 개발자 기준 일정
metadata:
  type: project
---

Notion CMS 기반 개인 개발 블로그의 로드맵(docs/ROADMAP.md)이 2026-06-01에 v1.0.0으로 작성되었다.

**Why:** PRD(docs/PRD.md) 기반으로 솔로 개발자 1인 기준 4일 MVP 일정을 구체적 Task 단위로 분해하기 위해 작성.

**How to apply:** 향후 로드맵 업데이트 시 이 파일의 변경 이력 섹션에 날짜/버전/내용을 추가한다.

## Phase 구성 요약

| Phase | 기간 | SP |
|-------|------|----|
| Phase 1: 환경 설정 + Notion 구성 | Day 1 오전 | 8 SP |
| Phase 2: Notion API 연동 레이어 | Day 1 오후 | 7 SP |
| Phase 3: 글 목록 페이지 | Day 2 | 13 SP |
| Phase 4: 글 상세 페이지 | Day 3 | 12 SP |
| Phase 5: 스타일링 + Vercel 배포 | Day 4 | 10 SP |
| Phase 6: MVP 이후 (다크 모드, RSS) | 별도 일정 | 6 SP |

MVP 총계: 50 SP (Phase 1~5), 총 예상 4일

## 주요 위험 요소

- Notion 이미지 URL 만료 → `next/image` 프록시 처리 고려
- 미지원 Notion 블록 타입 → NotionRenderer에서 무시 처리로 크래시 방지
- Vercel 환경변수 미설정 → `.env.example` 체크리스트로 사전 관리

## 기술 스택

- Next.js 15 (App Router, ISR revalidate 60초)
- TypeScript 5 (strict 모드)
- Tailwind CSS 4
- shadcn/ui
- @notionhq/client
- Vercel 배포

[[project_notion_cms_blog]]
