import Link from 'next/link';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import type { Metadata } from 'next';
import { DefaultLayout } from '@/components/layout/default-layout';
import { NotionRenderer } from '@/components/NotionRenderer';
import { Badge } from '@/components/ui/badge';
import { getPost, getPageBlocks, getPosts } from '@/lib/notion';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  return {
    title: post.title,
    description: post.summary || undefined,
    openGraph: {
      title: post.title,
      description: post.summary || undefined,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const [post, blocks] = await Promise.all([getPost(slug), getPageBlocks(slug)]);

  const formattedDate = post.published
    ? new Date(post.published).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <DefaultLayout
      header={{ logo: 'B', title: '개발 블로그', showLoginButton: false }}
      footer={{ title: '개발 블로그', description: 'Claude AI 활용 기술 블로그' }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 뒤로가기 */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          글 목록으로
        </Link>

        {/* 제목 */}
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          {post.title}
        </h1>

        {/* 메타데이터 */}
        <div className="flex flex-wrap items-center gap-3 mb-8 pb-8 border-b border-border">
          {post.category && (
            <Badge variant="secondary">{post.category}</Badge>
          )}
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="gap-1">
              <Tag className="h-3 w-3" />
              {tag}
            </Badge>
          ))}
          {formattedDate && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground ml-auto">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
          )}
        </div>

        {/* 본문 */}
        <NotionRenderer blocks={blocks} />
      </div>
    </DefaultLayout>
  );
}
