import Link from 'next/link';
import { ThemeToggle } from '@/components/common/theme-toggle';
import { Button } from '@/components/ui/button';

export interface NavItem {
  label: string;
  href: string;
}

export interface HeaderProps {
  logo?: string;
  title?: string;
  navItems?: NavItem[];
  showThemeToggle?: boolean;
  showLoginButton?: boolean;
}

export function Header({
  logo = 'WSK',
  title = 'Web Starter Kit',
  navItems = [],
  showThemeToggle = true,
  showLoginButton = true,
}: HeaderProps) {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-2 font-bold">
            <div className="h-8 w-8 rounded bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground text-sm font-bold">
              {logo.charAt(0)}
            </div>
            <span className="hidden sm:inline text-foreground">{title}</span>
          </Link>

          {/* 네비게이션 */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* 우측 액션 */}
          <div className="flex items-center gap-2">
            {showLoginButton && (
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">로그인</Link>
              </Button>
            )}
            {showThemeToggle && <ThemeToggle />}
          </div>
        </div>
      </div>
    </header>
  );
}
