import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';

export interface FooterProps {
  title?: string;
  description?: string;
  showSocial?: boolean;
}

export function Footer({
  title = 'Web Starter Kit',
  description = '모던 웹 개발을 위한 스타터킷',
  showSocial = true,
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* 브랜드 */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
            {showSocial && (
              <div className="flex gap-4 mt-2">
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  title="GitHub"
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  title="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            )}
          </div>

          {/* 제품 */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-foreground">제품</h4>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              특징
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              가격
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              보안
            </Link>
          </div>

          {/* 회사 */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-foreground">회사</h4>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              블로그
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              채용
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              문의
            </Link>
          </div>

          {/* 지원 */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-foreground">지원</h4>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              문서
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              커뮤니티
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              이메일
            </Link>
          </div>
        </div>

        {/* 저작권 */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {title}. 모든 권리 보유.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">
              개인정보 보호정책
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              이용약관
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
