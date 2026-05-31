import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { BlogPost } from '@/lib/types';

interface PostCardProps {
  post: BlogPost;
}

export function PostCard({ post }: PostCardProps) {
  const formattedDate = post.published
    ? new Date(post.published).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <Link href={`/posts/${post.id}`}>
      <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader className="pb-2">
          {post.category && (
            <Badge variant="secondary" className="w-fit mb-2">
              {post.category}
            </Badge>
          )}
          <h2 className="text-lg font-semibold leading-snug line-clamp-2 text-foreground">
            {post.title}
          </h2>
        </CardHeader>
        <CardContent>
          {post.summary && (
            <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
              {post.summary}
            </p>
          )}
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          {formattedDate && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>{formattedDate}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
