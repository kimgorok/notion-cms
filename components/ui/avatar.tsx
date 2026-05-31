import * as React from 'react';

import { cn } from '@/lib/utils';

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  initials?: string;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt = '', initials, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'relative inline-flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted',
        className
      )}
      {...props}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-primary/50">
          <span className="text-xs font-semibold text-primary-foreground">
            {initials}
          </span>
        </div>
      )}
    </div>
  )
);
Avatar.displayName = 'Avatar';

export { Avatar };
