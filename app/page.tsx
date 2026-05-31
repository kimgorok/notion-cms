'use client';

import { Github, Zap as ZapIcon } from 'lucide-react';
import Link from 'next/link';
import { DefaultLayout } from '@/components/layout/default-layout';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <DefaultLayout
      header={{
        navItems: [
          { label: 'Components', href: '/components' },
          { label: 'Docs', href: '#' },
        ],
      }}
    >
      <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-green-950">
        {/* 히어로 섹션 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-4 py-2 mb-8">
              <ZapIcon className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-slate-300">
                모던 웹 개발을 위한 스타터킷
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              빠른 시작을 위한<br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                완벽한 구성
              </span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Next.js 15, TypeScript, Tailwind CSS, ShadcnUI로 구성된
              프로덕션 레디 스타터킷입니다.
            </p>

            <div className="flex gap-4 justify-center mb-16">
              <Button asChild>
                <Link href="/components">컴포넌트 보기</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="https://github.com/kimgorok" target="_blank">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Link>
              </Button>
            </div>

            {/* 기술 스택 */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-16">
              {[
                { name: 'Next.js 15', desc: 'App Router' },
                { name: 'TypeScript', desc: '타입 안전성' },
                { name: 'Tailwind', desc: 'CSS' },
                { name: 'ShadcnUI', desc: '컴포넌트' },
                { name: 'Lucide', desc: '아이콘' },
              ].map((tech) => (
                <div
                  key={tech.name}
                  className="bg-slate-800/50 border border-slate-700 rounded-lg p-4"
                >
                  <div className="font-semibold text-white text-sm">
                    {tech.name}
                  </div>
                  <div className="text-xs text-slate-400">{tech.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
