# 프로젝트 규칙 문서 (shrimp-rules.md)

**AI 에이전트용 Notion CMS 블로그 프로젝트 규칙**

---

## 1. 프로젝트 개요

- **프로젝트명**: Notion CMS 기반 개인 블로그
- **기술 스택**: Next.js 15.1.0, React 19.0.0, TypeScript 5.7.0 (strict 모드), Tailwind CSS 4.3.0, ShadcnUI, Radix UI
- **패키지 관리자**: npm
- **개발 환경**: Windows PowerShell, Node.js
- **핵심 명령어**: 
  - `npm run dev` - 개발 서버 실행 (localhost:3000)
  - `npm run build` - 프로덕션 빌드
  - `npm run start` - 프로덕션 서버 실행
  - `npm run lint` - ESLint 실행

---

## 2. 디렉토리 구조 및 파일 관리 규칙

### 2.1 핵심 디렉토리 구조

```
project-root/
├── app/                        # Next.js App Router (라우팅 및 페이지)
│   ├── layout.tsx             # 루트 레이아웃 (메타데이터, 서버 컴포넌트)
│   ├── page.tsx               # 홈 페이지
│   ├── globals.css            # CSS 변수 정의 (반드시 globals.css에만 정의)
│   ├── providers.tsx          # use client, ThemeProvider, Toaster 등
│   └── components/            # 특정 페이지에서만 사용되는 로컬 컴포넌트
│
├── components/
│   ├── ui/                    # ShadcnUI 기반 기본 UI 컴포넌트 (재사용성 극대화)
│   ├── layout/                # 레이아웃 래퍼 컴포넌트 (DefaultLayout, DashboardLayout 등)
│   └── common/                # 프로젝트 전체 공유 컴포넌트 (theme-toggle 등)
│
├── lib/
│   └── utils.ts               # cn() 유틸리티 (clsx + tailwind-merge)
│
├── hooks/
│   └── use-media-query.ts     # 미디어 쿼리 반응형 훅
│
├── public/                    # 정적 자산 (이미지, 폰트)
├── .claude/                   # Claude Code 설정
├── .mcp.json                  # MCP 서버 설정 (context7, playwright, shadcn 등)
├── package.json               # 의존성 및 스크립트
├── tailwind.config.ts         # Tailwind CSS 설정 (CSS 변수 색상 매핑)
├── tsconfig.json              # TypeScript 설정
├── next.config.js             # Next.js 설정
└── CLAUDE.md                  # 개발 가이드
```

### 2.2 파일 배치 규칙

| 요소 | 위치 | 규칙 |
|------|------|------|
| **기본 UI 컴포넌트** | `components/ui/` | ShadcnUI 기반, Radix UI 원시 컴포넌트 활용, 재사용성 극대화 |
| **레이아웃 컴포넌트** | `components/layout/` | DefaultLayout, DashboardLayout, header, footer, sidebar 등 |
| **공통 기능 컴포넌트** | `components/common/` | 프로젝트 전체에서 공유되는 기능성 컴포넌트 (theme-toggle, etc) |
| **페이지별 로컬 컴포넌트** | `app/components/` 또는 각 라우트 폴더 | 특정 페이지에서만 사용되는 컴포넌트 |
| **유틸리티 함수** | `lib/utils.ts` | cn(), 클래스명 유틸리티, 헬퍼 함수 |

---

## 3. 코딩 규칙

### 3.1 들여쓰기 및 포맷

- **들여쓰기**: 2칸 (전체 프로젝트 통일)
- **라인 길이**: 80-100자 권장
- **Import 순서**:
  1. React/Next.js 임포트
  2. 타사 라이브러리 임포트
  3. 로컬 컴포넌트 임포트
  4. 유틸리티/타입 임포트

### 3.2 TypeScript 규칙

- **strict 모드 필수**: `"strict": true` (모든 타입 검사 활성화)
- **any 타입 금지**: 항상 구체적인 타입 지정
- **경로 별칭 사용**: `@/*` 형식 (예: `import { Button } from '@/components/ui/button'`)
- **컴포넌트 props 타입 정의 필수**:
  ```tsx
  interface ComponentProps {
    isActive: boolean;
    onClick: () => void;
  }
  
  export function Component({ isActive, onClick }: ComponentProps) {
    // ...
  }
  ```

### 3.3 클래스명 관리

- **cn() 유틸리티 필수 사용**:
  ```tsx
  import { cn } from '@/lib/utils';
  
  export function Component({ isActive }: { isActive: boolean }) {
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

### 3.4 파일명 및 변수명 컨벤션

- **파일명**: `kebab-case` (예: `theme-toggle.tsx`, `use-media-query.ts`)
- **컴포넌트명**: `PascalCase` (예: `export function Button() {}`)
- **변수/함수명**: `camelCase` (예: `const isActive = true;`)
- **상수명**: `UPPER_SNAKE_CASE` 또는 `camelCase` (프로젝트 통일)

---

## 4. UI 컴포넌트 규칙

### 4.1 ShadcnUI 컴포넌트 사용

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

### 4.2 컴포넌트 확장 규칙

- **기존 UI 컴포넌트 수정**: ShadcnUI 스타일 유지, 기존 구조 보존
- **새로운 기본 컴포넌트**: `components/ui/` 디렉토리에 추가
- **프로젝트 특화 컴포넌트**: `components/common/` 또는 `app/components/`에 배치

### 4.3 Radix UI 원시 컴포넌트

- Radix UI는 접근성 중심의 UI 프리미티브 제공
- ShadcnUI는 Radix UI 기반으로 스타일링된 컴포넌트
- 새로운 컴포넌트는 Radix UI 원시 컴포넌트를 기반으로 작성

---

## 5. 다중 파일 조정 규칙 (반드시 동시 수정)

### 5.1 CSS 변수 추가 시

**다음 파일들을 반드시 동시에 수정:**

1. **`app/globals.css`**: CSS 변수 정의
   ```css
   --primary: 색상값;
   --primary-foreground: 색상값;
   ```
   
2. **`tailwind.config.ts`**: Tailwind 색상 매핑
   ```ts
   primary: 'hsl(var(--primary))',
   'primary-foreground': 'hsl(var(--primary-foreground))',
   ```

**규칙**: 라이트 모드 + 다크 모드 색상 쌍을 함께 정의, 기본색 + 전경색 조합

### 5.2 다크 모드 변경 시

**함께 수정할 파일**:
- `app/globals.css` - 다크 모드 CSS 변수 업데이트
- `tailwind.config.ts` - 다크 모드 색상 확인
- `app/providers.tsx` - ThemeProvider 설정 확인

### 5.3 레이아웃 변경 시

**영향도 검토 필수**:
- `components/layout/default-layout.tsx` - DefaultLayout 변경 시 모든 페이지 확인
- `components/layout/dashboard-layout.tsx` - DashboardLayout 변경 시 대시보드 페이지 모두 확인

---

## 6. 클라이언트/서버 컴포넌트 규칙

### 6.1 use client 지시자 사용 규칙

| 경우 | use client 필요 | 예시 |
|------|-----------------|------|
| 이벤트 핸들러 사용 | ✅ 필수 | onClick, onChange 등 |
| useState/useEffect 사용 | ✅ 필수 | 상태 관리, 사이드이펙트 |
| useTheme (next-themes) 사용 | ✅ 필수 | 다크 모드 토글 |
| 브라우저 API 사용 | ✅ 필수 | localStorage, window 등 |
| 메타데이터 설정 | ❌ 불필요 | layout.tsx에서 export metadata |
| 정적 데이터 표시 | ❌ 불필요 | 순수 JSX 렌더링 |

### 6.2 컴포넌트 배치

```tsx
// app/layout.tsx - 서버 컴포넌트 (메타데이터)
export const metadata = { title: '...' };

export default function RootLayout() {
  return <html><body>{children}</body></html>;
}

// app/providers.tsx - 클라이언트 컴포넌트
'use client';
import { ThemeProvider } from 'next-themes';
export function Providers({ children }) { /* ... */ }

// app/page.tsx - 클라이언트 컴포넌트 (인터랙티브)
'use client';
export default function Home() { /* ... */ }
```

---

## 7. 다크 모드 지원 규칙

### 7.1 CSS 변수 방식 (권장)

```tsx
<div className="bg-background text-foreground">
  자동으로 다크 모드 지원 (CSS 변수 기반)
</div>
```

### 7.2 Tailwind dark: prefix 방식

```tsx
<div className="bg-white dark:bg-slate-900">
  수동으로 다크 모드 지정
</div>
```

### 7.3 프로그래밍적 제어

```tsx
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

---

## 8. 커밋 컨벤션

### 8.1 형식

```
<이모지> <타입>: <한국어 설명>

<본문 (필요시)>
```

### 8.2 이모지 사용 규칙

| 이모지 | 타입 | 용도 |
|--------|------|------|
| ✨ | feat | 새 기능 추가 |
| 🐛 | fix | 버그 수정 |
| 🎨 | style | 스타일/포맷 변경 (기능 미변경) |
| 🔨 | refactor | 구조/아키텍처 리팩토링 |
| 📚 | docs | 문서화 |
| 🚀 | perf | 성능 개선 |
| 🧪 | test | 테스트 추가 |
| 🔧 | chore | 설정/도구 수정 |
| ♻️ | chore | 코드 정리 (불필요한 import 제거) |
| 🔐 | fix | 보안 취약점 수정 |
| 🎯 | feat | 기능 개선 (기존 기능 향상) |

### 8.3 예시

```
✨ feat: 사용자 프로필 페이지 추가

- 사용자 정보 표시 기능
- 프로필 수정 폼 구현
- 다크 모드 지원
```

---

## 9. 언어 규칙

### 9.1 코딩 언어

- **변수명, 함수명, 클래스명**: 영어 (코드 표준)
- **파일명**: `kebab-case` 영어
- **주석**: 한국어 (WHY 설명만, WHAT 설명 금지)
- **커밋 메시지**: 한국어
- **문서화 (마크다운)**: 한국어

### 9.2 주석 작성 규칙

- **기본**: 주석 작성 금지 (좋은 변수명이 최고의 주석)
- **예외**: WHY가 명확하지 않은 경우만 한 줄 주석
  ```tsx
  // 이 접근법은 Safari 버그 때문에 필요함
  const workaround = element.offsetWidth;
  
  // ❌ 금지: WHAT을 설명하는 주석
  // element의 너비를 가져옴
  const width = element.offsetWidth;
  ```

---

## 10. 빌드 및 검증 규칙

### 10.1 개발 및 빌드 순서

```bash
# 1. 개발 서버에서 확인
npm run dev

# 2. 빌드 성공 확인 (필수)
npm run build

# 3. 린트 통과 확인
npm run lint

# 4. 프로덕션 환경 최종 확인 (권장)
npm start
```

### 10.2 빌드 검증 체크리스트

- [ ] TypeScript 컴파일 오류 없음 (`npm run build` 통과)
- [ ] ESLint 경고 없음 (`npm run lint` 통과)
- [ ] 개발 서버에서 시각적으로 확인 (`npm run dev`)
- [ ] 레이아웃/테마 변경 시 다른 페이지 영향도 확인
- [ ] 커밋 메시지가 컨벤션 준수

---

## 11. 금지 사항 (반드시 피할 것)

### 11.1 TypeScript 관련

- ❌ **any 타입 사용**: 항상 구체적인 타입 지정
- ❌ **as any 캐스팅**: 타입 오류 무시하지 말 것
- ❌ **? 옵셔널 체이닝 과다 사용**: null 체크 필수

### 11.2 컴포넌트 관련

- ❌ **렌더링되지 않는 컴포넌트 export**: 사용할 컴포넌트만 export
- ❌ **무분별한 컴포넌트 분리**: 3줄 미만 코드는 분리하지 말 것
- ❌ **스타일드 컴포넌트 다중 파일**: 한 파일에 스타일과 로직 함께 작성

### 11.3 파일 관리

- ❌ **불필요한 import 남기기**: 사용하지 않는 import 제거
- ❌ **주석 처리된 코드**: 완전히 삭제 (git 히스토리가 있음)
- ❌ **오래된 코드 주석**: "이전에는 이랬어" 같은 설명 주석 금지

### 11.4 CSS/스타일링

- ❌ **인라인 스타일**: 항상 className + Tailwind 사용
- ❌ **하드코딩된 색상**: CSS 변수 사용
- ❌ **상대 경로로 제목 변경**: @/* 경로 별칭 사용

### 11.5 커밋 관련

- ❌ **여러 기능을 한 커밋으로**: 커밋 한 개당 하나의 기능/수정
- ❌ **커밋 메시지 없이**: 반드시 설명이 있는 메시지 작성
- ❌ **이모지 없는 커밋**: Conventional Commits + 이모지 준수

---

## 12. 의사결정 가이드 (애매한 상황)

### 12.1 새 컴포넌트 위치 선택

```
질문: 이 컴포넌트는 어디에 배치할까?

├─ 다른 프로젝트에서도 재사용할 수 있나?
│  ├─ Yes → components/ui/ (기본 UI 컴포넌트)
│  └─ No  → 다음으로
│
├─ 여러 페이지에서 사용되나?
│  ├─ Yes → components/common/ (공유 컴포넌트)
│  └─ No  → 다음으로
│
└─ 현재 페이지에서만 사용되나?
   ├─ Yes → app/components/ (로컬 컴포넌트)
   └─ 불확실 → components/common/ (나중에 이동 가능)
```

### 12.2 use client 지시자 필요 여부

```
질문: use client 지시자가 필요한가?

├─ 이벤트 핸들러나 useState/useEffect 사용?
│  ├─ Yes → use client 필수
│  └─ No  → 다음으로
│
├─ next-themes useTheme 사용?
│  ├─ Yes → use client 필수
│  └─ No  → 다음으로
│
├─ 브라우저 API (window, localStorage) 사용?
│  ├─ Yes → use client 필수
│  └─ No  → use client 불필요 (서버 컴포넌트)
```

### 12.3 CSS 변수 vs Tailwind 직접 사용

```
질문: 색상을 정의할 때 어떻게 할까?

├─ 테마에 따라 변해야 하는 색상? (다크 모드 고려)
│  ├─ Yes → CSS 변수 + tailwind.config.ts (app/globals.css에서 정의)
│  └─ No  → Tailwind 클래스 직접 사용
│
예: 
- 배경, 텍스트 → CSS 변수 (테마 연동)
- 일회성 강조색 → Tailwind 클래스 (bg-red-500)
```

---

## 13. MCP 서버 활용 규칙

| MCP 서버 | 용도 | 사용 시기 |
|---------|------|---------|
| **context7** | 최신 라이브러리 문서 조회 | Next.js, React, Tailwind 버전 업데이트, API 사용 |
| **playwright** | 브라우저 자동화 및 스크린샷 | UI 테스트, 브라우저 상호작용 검증 |
| **shadcn** | ShadcnUI 컴포넌트 조회 및 추가 | 컴포넌트 선택, 새로운 ShadcnUI 컴포넌트 추가 |
| **sequential-thinking** | 복잡한 문제 분석 | 아키텍처 설계, 복잡한 리팩토링 |

---

## 14. 성능 및 최적화 규칙

### 14.1 번들 크기 최적화

- 명명 임포트 사용 (기본 임포트 X)
- 동적 임포트는 `next/dynamic` 활용
- CSS는 Tailwind를 통해 자동 최소화

### 14.2 렌더링 성능

- 서버 컴포넌트는 데이터 페칭에만 사용
- 클라이언트 컴포넌트는 필요한 경계에만 배치 (`providers.tsx` 참고)
- 이미지는 `next/image` 사용 (자동 최적화)

---

## 15. 마지막 체크리스트

코드 작성 후 항상 확인:

- [ ] TypeScript strict 모드 준수 (any 타입 없음)
- [ ] cn() 유틸리티로 클래스명 관리
- [ ] @/* 경로 별칭 사용
- [ ] use client 지시자 올바르게 배치
- [ ] 다중 파일 조정 규칙 확인 (CSS 변수 추가 시 globals.css + tailwind.config.ts)
- [ ] 커밋 메시지 컨벤션 준수 (이모지 + 한국어)
- [ ] npm run build 및 npm run lint 통과
- [ ] 개발 서버에서 시각적 확인
