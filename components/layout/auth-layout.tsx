import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  backLink?: {
    href: string;
    label: string;
  };
}

export function AuthLayout({
  children,
  title = '시작하기',
  description = '계정에 로그인하거나 새 계정을 만드세요.',
  backLink,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* 좌측 브랜딩 패널 */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-950 via-green-900 to-green-950 flex-col justify-between p-12 text-white">
        <div>
          <Link href="/" className="font-bold text-2xl flex items-center gap-2">
            <div className="h-10 w-10 rounded bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center font-bold text-slate-900">
              W
            </div>
            Web Starter Kit
          </Link>
        </div>

        <div>
          <blockquote className="space-y-4">
            <p className="text-lg font-semibold">
              &quot;이 스타터킷으로 빠르게 웹 프로젝트를 시작하세요.&quot;
            </p>
            <footer className="text-sm text-slate-400">
              &mdash; 개발자 커뮤니티
            </footer>
          </blockquote>
        </div>

        <div className="text-sm text-slate-400">
          © 2024 Web Starter Kit
        </div>
      </div>

      {/* 우측 폼 영역 */}
      <div className="flex w-full lg:w-1/2 flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-sm space-y-6">
          {/* 헤더 */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6 lg:hidden">
              <div className="h-8 w-8 rounded bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground text-sm font-bold">
                W
              </div>
              <span className="font-bold">Web Starter Kit</span>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {title}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {description}
            </p>
          </div>

          <Separator />

          {/* 폼 영역 */}
          {children}

          <Separator />

          {/* 푸터 */}
          {backLink ? (
            <p className="text-center text-sm text-muted-foreground">
              <Link
                href={backLink.href}
                className="font-medium text-primary hover:underline"
              >
                {backLink.label}
              </Link>
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
