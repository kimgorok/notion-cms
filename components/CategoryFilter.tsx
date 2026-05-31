'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  categories: string[];
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get('category');

  function handleSelect(category: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    router.push(`/?${params.toString()}`);
  }

  const tabs = ['전체', ...categories];

  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => {
        const value = tab === '전체' ? null : tab;
        const isActive = current === value || (tab === '전체' && !current);

        return (
          <button
            key={tab}
            onClick={() => handleSelect(value)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
