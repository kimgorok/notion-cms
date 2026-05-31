import { Suspense } from 'react';
import { DefaultLayout } from '@/components/layout/default-layout';
import { PostCard } from '@/components/PostCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { getPosts, getAllCategories } from '@/lib/notion';

export const revalidate = 60;

interface HomeProps {
  searchParams: Promise<{ category?: string }>;
}

async function PostGrid({ category }: { category?: string }) {
  const posts = await getPosts();
  const filtered = category
    ? posts.filter((p) => p.category === category)
    : posts;

  if (!process.env.NOTION_API_KEY) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <p className="text-lg font-medium mb-2">Notion 연동이 필요합니다</p>
        <p className="text-sm">
          <code className="bg-muted px-2 py-1 rounded">.env.local</code>에{' '}
          <code className="bg-muted px-2 py-1 rounded">NOTION_API_KEY</code>와{' '}
          <code className="bg-muted px-2 py-1 rounded">NOTION_DATABASE_ID</code>를 설정해주세요.
        </p>
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-12">
        글이 없습니다.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filtered.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default async function Home({ searchParams }: HomeProps) {
  const { category } = await searchParams;
  const categories = await getAllCategories();

  return (
    <DefaultLayout
      header={{ logo: 'B', title: '개발 블로그', showLoginButton: false }}
      footer={{ title: '개발 블로그', description: 'Claude AI 활용 기술 블로그' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            개발 블로그
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Claude AI 활용과 웹 개발에 관한 글을 공유합니다.
          </p>
        </div>

        {/* 카테고리 필터 */}
        <div className="mb-8">
          <Suspense>
            <CategoryFilter categories={categories} />
          </Suspense>
        </div>

        {/* 글 목록 */}
        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 bg-muted rounded-lg animate-pulse" />
              ))}
            </div>
          }
        >
          <PostGrid category={category} />
        </Suspense>
      </div>
    </DefaultLayout>
  );
}
