# CLAUDE.md

Claude Code가 이 저장소의 코드로 작업할 때 참고하는 종합 지침서입니다.

## 프로젝트 개요

**Web Starter Kit** - 모던 웹 개발을 위한 프로덕션 레디 스타터킷으로, Next.js 15, TypeScript, Tailwind CSS v4, ShadcnUI 컴포넌트 라이브러리로 구성되어 있습니다. 빠른 개발 시작과 확장성을 목표로 설계되었습니다.

## 핵심 개발 명령어

```bash
npm run dev       # 개발 서버 실행 (localhost:3000)
npm run build     # 프로덕션 빌드 생성
npm run start     # 프로덕션 서버 실행
npm run lint      # ESLint 실행 및 코드 스타일 검사
```

## 프로젝트 아키텍처

### 기술 스택

| 기술 | 버전 | 역할 |
|------|------|------|
| **Next.js** | 15.1.0 | App Router 기반의 최신 프레임워크 |
| **React** | 19.0.0 | UI 렌더링 엔진 |
| **TypeScript** | 5.7.0 | 엄격한 타입 체크 (strict 모드 활성화) |
| **Tailwind CSS** | 4.3.0 (PostCSS) | CSS 변수 기반의 커스텀 테마 시스템 |
| **ShadcnUI** | - | Radix UI 원시 컴포넌트 기반의 재사용 가능한 UI 컴포넌트 |
| **Radix UI** | 최신 | 접근성 중심의 UI 프리미티브 (accordion, checkbox, dialog, dropdown-menu, popover, progress, select, switch, tabs, tooltip 등) |
| **class-variance-authority** | 0.7.0 | 조건부 클래스명 관리 (ShadcnUI 컴포넌트에서 사용) |
| **next-themes** | 0.4.6 | 다크 모드 지원 및 테마 관리 (class 기반) |
| **Sonner** | 2.0.7 | 알림(toast) 기능 |
| **lucide-react** | 0.344.0 | 현대적인 아이콘 라이브러리 (230개 이상의 아이콘) |

### 디렉토리 구조 및 역할

```
프로젝트 루트
├── app/                           # Next.js App Router
│   ├── layout.tsx                # 루트 레이아웃 (Providers 포함)
│   ├── page.tsx                  # 홈 페이지
│   ├── globals.css               # 글로벌 스타일 및 CSS 변수 정의
│   ├── providers.tsx             # ThemeProvider, Toaster 클라이언트 프로바이더
│   └── components/               # 페이지별 로컬 컴포넌트
│
├── components/
│   ├── ui/                       # ShadcnUI 기반의 기본 UI 컴포넌트들 (30개 이상)
│   │   ├── button.tsx            # 버튼 컴포넌트
│   │   ├── card.tsx              # 카드 래퍼 컴포넌트
│   │   ├── input.tsx             # 입력 필드
│   │   ├── label.tsx             # 라벨
│   │   ├── textarea.tsx           # 텍스트 에어리어
│   │   ├── dialog.tsx            # 모달 다이얼로그
│   │   ├── sheet.tsx             # 사이드 시트
│   │   ├── accordion.tsx          # 아코디언
│   │   ├── tabs.tsx              # 탭
│   │   ├── separator.tsx          # 구분선
│   │   ├── badge.tsx             # 배지
│   │   ├── checkbox.tsx           # 체크박스
│   │   ├── switch.tsx            # 토글 스위치
│   │   ├── alert.tsx             # 알림 박스
│   │   ├── skeleton.tsx           # 스켈레톤 로딩
│   │   ├── tooltip.tsx           # 툴팁
│   │   ├── popover.tsx           # 팝오버
│   │   ├── progress.tsx          # 진행 바
│   │   ├── select.tsx            # 선택 드롭다운
│   │   ├── dropdown-menu.tsx     # 드롭다운 메뉴
│   │   ├── avatar.tsx            # 사용자 아바타
│   │   └── ... (30개 이상의 재사용 가능한 UI 컴포넌트)
│   │
│   ├── layout/                   # 레이아웃 래퍼 컴포넌트들
│   │   ├── default-layout.tsx    # 기본 레이아웃 (헤더 + 메인 + 푸터)
│   │   ├── dashboard-layout.tsx  # 대시보드 레이아웃
│   │   ├── auth-layout.tsx       # 인증 페이지 레이아웃
│   │   ├── header.tsx            # 공통 헤더
│   │   ├── footer.tsx            # 공통 푸터
│   │   └── sidebar.tsx           # 사이드바 컴포넌트
│   │
│   └── common/                   # 공통 기능 컴포넌트
│       └── theme-toggle.tsx      # 다크 모드 토글 버튼
│
├── lib/
│   └── utils.ts                  # cn() - 클래스명 유틸리티 (clsx + tailwind-merge)
│
├── hooks/
│   └── use-media-query.ts        # 미디어 쿼리 반응형 조회 훅
│
├── public/                       # 정적 자산 (이미지, 폰트 등)
│
├── .claude/                      # Claude Code 설정
│   └── settings.local.json       # 프로젝트 권한 및 MCP 서버 설정
│
├── .mcp.json                     # MCP (Model Context Protocol) 서버 설정
├── .eslintrc.json               # ESLint 설정 (next/core-web-vitals 확장)
├── next.config.js               # Next.js 설정 (strict 모드 활성화)
├── tailwind.config.ts           # Tailwind CSS 설정
├── tsconfig.json                # TypeScript 컴파일러 설정
├── package.json                 # 프로젝트 의존성 및 스크립트
└── CLAUDE.md                    # 이 파일
```

### 아키텍처 특징

**1. 계층화된 컴포넌트 아키텍처**
```
UI 프리미티브 (components/ui/)
    ↓
레이아웃 컴포넌트 (components/layout/)
    ↓
페이지 컴포넌트 (app/pages/)
```
- `components/ui/` - Radix UI 기반의 저수준 UI 프리미티브 (재사용성 극대화)
- `components/layout/` - 페이지 구조를 정의하는 레이아웃 컴포넌트
- `components/common/` - 프로젝트 전체에서 공유되는 기능성 컴포넌트
- `app/components/` - 특정 페이지에서만 사용되는 로컬 컴포넌트

**2. CSS 변수 기반 테마 시스템**
```
app/globals.css (CSS 변수 정의)
  ↓
tailwind.config.ts (Tailwind 색상 매핑)
  ↓
Components (hsl(var(--primary)) 사용)
```
- CSS 변수(`--primary`, `--secondary`, `--destructive` 등)를 `app/globals.css`에서 정의
- Tailwind 설정에서 색상을 HSL 기반의 CSS 변수로 매핑
- `next-themes`를 통해 다크 모드를 class 기반으로 관리 (`.dark` 클래스)
- 각 색상은 기본색과 전경색(foreground) 조합으로 구성
- 현재 테마: 라이트 모드(황금색), 다크 모드(초록색)

**3. 클라이언트/서버 컴포넌트 분리**
- `app/layout.tsx` - 서버 컴포넌트 (메타데이터 설정)
- `app/providers.tsx` - 클라이언트 컴포넌트 (`use client` 지시자 포함)
- `app/page.tsx` - 클라이언트 컴포넌트 (인터랙티브 요소)
- UI 컴포넌트들 - 대부분 클라이언트 컴포넌트 (이벤트 핸들러, hooks 사용)

**4. 반응형 디자인**
- Tailwind CSS의 반응형 prefix 활용 (sm:, md:, lg:, xl:, 2xl:)
- `use-media-query` 훅을 통한 프로그래밍적 미디어 쿼리 처리

## 코딩 규칙

### TypeScript 설정
- **strict 모드 활성화** - 모든 타입 검사 활성화 (`"strict": true`)
- **경로 별칭** - `@/*`로 루트 경로부터 import 가능
  ```tsx
  import { Button } from '@/components/ui/button';
  import { cn } from '@/lib/utils';
  ```

### 클래스명 관리
```tsx
// cn() 유틸리티를 사용하여 조건부 클래스명 구성
import { cn } from '@/lib/utils';

export function MyComponent({ isActive }: { isActive: boolean }) {
  return (
    <div className={cn(
      'p-4 rounded-md border',
      isActive && 'bg-primary text-primary-foreground'
    )}>
      내용
    </div>
  );
}
```

### ShadcnUI 컴포넌트 사용
```tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>제목</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>클릭하기</Button>
      </CardContent>
    </Card>
  );
}
```

### 다크 모드 지원
```tsx
// 1. CSS 변수를 통한 자동 처리 (권장)
<div className="bg-background text-foreground">
  자동으로 다크 모드 지원
</div>

// 2. Tailwind dark: prefix 사용
<div className="bg-white dark:bg-slate-900">
  수동으로 다크 모드 지정
</div>

// 3. useTheme 훅을 통한 프로그래밍적 제어
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      토글
    </button>
  );
}
```

### 아이콘 사용 (lucide-react)
```tsx
import { 
  ChevronDown, 
  Github, 
  Sun, 
  Moon,
  AlertCircle 
} from 'lucide-react';

export function Header() {
  return (
    <header className="flex items-center gap-2">
      <Github className="w-4 h-4" />
      GitHub
    </header>
  );
}
```

### Toast 알림 사용
```tsx
import { toast } from 'sonner';

export function NotificationExample() {
  return (
    <button onClick={() => toast.success('성공했습니다!')}>
      알림 표시
    </button>
  );
}
```

### UI 컴포넌트 확장
- 기존 `components/ui/` 컴포넌트는 ShadcnUI 스타일 유지
- 새로운 기본 컴포넌트는 `components/ui/` 디렉토리에 추가
- 프로젝트 특화 기능은 `components/common/` 또는 `app/components/`에 배치

### 파일 구조
- **들여쓰기**: 2칸 (전체 프로젝트 통일)
- **라인 길이**: 80-100자 권장
- **임포트 순서**: 
  1. React/Next.js 임포트
  2. 타사 라이브러리 임포트
  3. 로컬 컴포넌트 임포트
  4. 유틸리티/타입 임포트

## 커밋 컨벤션

프로젝트는 **Conventional Commits** + **이모지**를 사용합니다.

### 이모지 가이드
| 이모지 | 의미 | 예시 |
|--------|------|------|
| 🎨 | 스타일/포맷 변경 | 글꼴 크기 조정, 색상 변경 |
| 🔨 | 구조/아키텍처 리팩토링 | 컴포넌트 재구성 |
| ✨ | 새 기능 추가 | 새 UI 컴포넌트, 페이지 추가 |
| 🐛 | 버그 수정 | 타입 오류, 렌더링 문제 |
| 📚 | 문서화 | CLAUDE.md 업데이트, 주석 추가 |
| 🚀 | 성능 개선 | 번들 크기 최적화, 렌더링 개선 |
| 🧪 | 테스트 추가 | 테스트 케이스 작성 |
| 🔧 | 설정/도구 수정 | ESLint 설정, 빌드 스크립트 |
| ♻️ | 코드 정리 | 불필요한 임포트 제거 |
| 🔐 | 보안 | 보안 취약점 수정 |
| 🎯 | 기능 개선 | 기존 기능 향상 |

### 커밋 메시지 형식
```
<이모지> <타입>: <설명>

<본문>
```

### 예시
```
✨ feat: 사용자 프로필 페이지 추가

- 사용자 정보 표시 기능
- 프로필 수정 폼 구현
- 다크 모드 지원
```

## 개발 워크플로우

### 새 페이지 추가
1. `app/` 디렉토리에 경로 생성 (예: `app/about/page.tsx`)
2. 필요한 경우 `components/layout/`에서 레이아웃 선택 또는 생성
3. 페이지 컴포넌트에서 레이아웃으로 감싸기
4. `npm run dev`로 개발 서버에서 테스트
5. `npm run build` 후 `npm run lint` 실행

### 새 UI 컴포넌트 추가
1. `components/ui/` 디렉토리에 파일 추가
2. Radix UI 원시 컴포넌트 활용
3. Tailwind CSS + CSS 변수로 스타일링
4. `components/ui/button.tsx` 등을 참고하여 구조 따르기
5. 타입 안전성을 위해 필요한 props 정의

### 기존 컴포넌트 수정
1. 변경 전 `npm run build`로 빌드 성공 확인
2. 수정 진행
3. `npm run dev`로 시각적 변화 확인
4. `npm run lint`로 코드 품질 검사
5. 커밋 (컨벤션 준수)

## Claude Code 도구 및 설정

### MCP 서버 설정 (`.mcp.json`)

프로젝트는 다음의 MCP 서버를 사용하도록 구성되어 있습니다:

| 서버 | 역할 | 사용 시기 |
|------|------|---------|
| **context7** | 최신 라이브러리 문서 조회 (Next.js, React, Tailwind 등) | 버전 업데이트, API 사용 |
| **playwright** | 브라우저 자동화 및 스크린샷 | UI 테스트, 브라우저 상호작용 |
| **sequential-thinking** | 복잡한 문제 분석 및 해결 | 아키텍처 설계, 복잡한 리팩토링 |
| **shadcn** | ShadcnUI 컴포넌트 조회 및 추가 | 컴포넌트 선택, 코드 예시 |

### Claude Code 권한 설정 (`.claude/settings.local.json`)

프로젝트의 Claude Code는 다음 권한이 구성되어 있습니다:
- npm 스크립트 실행 (dev, build, start, lint)
- 파일 시스템 읽기/쓰기
- git 명령어 실행
- PowerShell 명령어 실행
- localhost 웹 페치

## 성능 및 최적화

### 번들 크기 최적화
- Tree-shaking을 위해 명명 임포트 사용
- 동적 임포트는 `next/dynamic` 활용
- CSS는 Tailwind를 통해 최소화

### 렌더링 성능
- 서버 컴포넌트는 데이터 페칭에만 사용
- 클라이언트 컴포넌트는 필요한 경계에만 배치
- 이미지는 `next/image` 사용 (자동 최적화)

### 개발 경험
- `npm run dev` - Fast Refresh 지원 (HMR)
- `npm run lint` - 즉시 코드 품질 피드백
- TypeScript strict 모드로 타입 안전성 확보

## 주요 주의사항

### 레이아웃 컴포넌트
- `DefaultLayout`, `DashboardLayout` 등은 주요 구조이므로 변경 시 영향도 검토 필요
- 레이아웃 변경은 모든 관련 페이지에 영향을 줄 수 있음

### CSS 변수 일관성
- 새 색상 추가 시 `app/globals.css`와 `tailwind.config.ts` 동시 수정 필수
- 라이트/다크 모드 색상 쌍을 항상 함께 정의

### 클라이언트 컴포넌트
- `use client` 지시자는 이벤트 핸들러, hooks(`useState`, `useEffect` 등), 클라이언트 라이브러리 사용 시 필수
- 서버 컴포넌트에서는 클라이언트 전용 기능 사용 불가

### 빌드 검증
- `npm run build` 후 `npm start`로 프로덕션 환경 확인 권장
- 빌드 오류는 배포 전에 반드시 해결

### 타입 안전성
- `any` 타입 사용 최소화
- 컴포넌트 props는 항상 타입 정의 필수

### 접근성 (a11y)
- Radix UI 컴포넌트는 WCAG 준수
- 시맨틱 HTML 사용 (button, a, input 등)
- 이미지에는 alt 속성 필수

## 유용한 리소스

### 공식 문서
- [Next.js 공식 문서](https://nextjs.org/docs)
- [Tailwind CSS 공식 문서](https://tailwindcss.com/docs)
- [ShadcnUI 공식 문서](https://ui.shadcn.com)
- [Radix UI 공식 문서](https://www.radix-ui.com/docs)
- [React 공식 문서](https://react.dev)

### 개발 팁
1. **컴포넌트 변경 시**: DefaultLayout을 감싸고 있는 페이지들 확인
2. **테마 색상 추가 시**: CSS 변수 → globals.css → tailwind.config.ts 순서로 수정
3. **새 라이브러리 추가 시**: package.json 크기 확인 및 필요성 검토
4. **타입 에러 발생 시**: `npm run build` 후 전체 에러 목록 확인

## 마지막 체크리스트

변경사항을 커밋하기 전에:
- [ ] TypeScript 컴파일 오류 없음 (`npm run build` 통과)
- [ ] ESLint 경고 없음 (`npm run lint` 통과)
- [ ] 개발 서버에서 시각적으로 확인 (`npm run dev`)
- [ ] 커밋 메시지가 컨벤션 준수
- [ ] 레이아웃/테마 변경 시 다른 페이지 영향도 확인
