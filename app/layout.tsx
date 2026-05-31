import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Web Starter Kit',
  description: '모던 웹 개발을 위한 스타터킷',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-green-950">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
