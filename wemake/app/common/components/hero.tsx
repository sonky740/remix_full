import type { ReactNode } from 'react';
import { cn } from '~/lib/utils';

interface HeroProps {
  title: string;
  className?: string;
  subTitle?: string;
  children?: ReactNode;
}

export function Hero({ title, subTitle, children, className }: HeroProps) {
  return (
    <div
      className={cn(
        'flex flex-col justify-center items-center rounded-md bg-gradient-to-t from-background to-primary/10 p-8',
        className
      )}
    >
      <h1 className="text-5xl font-bold">{title}</h1>
      {subTitle && <p className="text-2xl font-light text-foreground">{subTitle}</p>}
      {children}
    </div>
  );
}
