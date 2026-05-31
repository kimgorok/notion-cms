import type { Metadata } from 'next';
import { DefaultLayout } from '@/components/layout/default-layout';
import { PostCard } from '@/components/PostCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { getPostsByCategory, getAllCategories } from '@/lib/notion';
import { Suspense } from 'react';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ name: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { name } = await params;
  const category = decodeURIComponent(name);
  return { title: `${category} | 개발 블로그` };
}

export default async function CategoryPage({ params }: PageProps) {
  const { name } = await params;
  const category = decodeURIComponent(name);
  const [posts, categories] = await Promise.all([
    getPostsByCategory(category),
    getAllCategories(),
  ]);

  return (
    <DefaultLayout
      header={{ logo: 'B', title: '개발 블로그', showLoginButton: false }}
      footer={{ title: '개발 블로그', description: 'Claude AI 활용 기술 블로그' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{category}</h1>
          <p className="text-muted-foreground">{posts.length}개의 글</p>
        </div>

        <div className="mb-8">
          <Suspense>
            <CategoryFilter categories={categories} />
          </Suspense>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">
            글이 없습니다.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}
