'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowLeft, Code2, Palette } from 'lucide-react';
import Link from 'next/link';

export default function ComponentsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-green-950 dark:to-green-950">
      {/* 헤더 */}
      <header className="border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            돌아가기
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            컴포넌트
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            재사용 가능한 UI 컴포넌트들
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 버튼 컴포넌트 */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Code2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Button
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* 기본 버튼 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">기본 스타일</CardTitle>
                <CardDescription>기본 버튼 스타일</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Button>기본</Button>
                <Button variant="secondary">보조</Button>
                <Button variant="outline">아웃라인</Button>
                <Button variant="destructive">삭제</Button>
                <Button variant="ghost">고스트</Button>
                <Button variant="link">링크</Button>
              </CardContent>
            </Card>

            {/* 버튼 사이즈 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">사이즈</CardTitle>
                <CardDescription>다양한 사이즈의 버튼</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3 items-center">
                <Button size="sm">작음</Button>
                <Button size="default">기본</Button>
                <Button size="lg">큼</Button>
                <Button size="icon">✓</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 카드 컴포넌트 */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Card
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: '카드 1',
                description: '컨텐츠가 있는 카드 예제입니다.',
              },
              {
                title: '카드 2',
                description: 'ShadcnUI 스타일의 깔끔한 카드',
              },
              {
                title: '카드 3',
                description: '재사용 가능한 카드 컴포넌트',
              },
            ].map((card, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="text-lg">{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    이 카드는 데이터를 표시하는 데 사용할 수 있습니다.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
