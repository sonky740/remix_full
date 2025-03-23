import { Link } from 'react-router';
import { Button } from '~/common/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/common/components/ui/card';
import { DotIcon, EyeIcon, HeartIcon, LockIcon } from 'lucide-react';
import { cn } from '~/lib/utils';

interface IdeaCardProps {
  id: string;
  title: string;
  viewsCount: number;
  postedAt: string;
  likesCount: number;
  claimed?: boolean;
}

export function IdeaCard({ id, title, viewsCount, postedAt, likesCount, claimed }: IdeaCardProps) {
  // TODO: DB에서 처리
  const titlePrivate = claimed ? title.replace(/[a-zA-Z0-9가-힣]/g, 'X') : title;

  const onLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (claimed) {
      e.preventDefault();
    }
  };

  return (
    <Card className="bg-transparent hover:bg-card/50 transition-colors">
      <CardHeader>
        <Link to={`/ideas/${id}/claim`} onClick={onLinkClick}>
          <CardTitle className="text-xl">
            <span
              className={cn(
                claimed
                  ? 'bg-muted-foreground text-muted-foreground selection:text-muted-foreground'
                  : ''
              )}
            >
              {titlePrivate}
            </span>
          </CardTitle>
        </Link>
        <CardContent className="flex items-center text-sm">
          <div className="flex items-center gap-1">
            <EyeIcon className="size-4" />
            <span>{viewsCount}</span>
          </div>
          <DotIcon className="size-4" />
          <span>{postedAt}</span>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">
            <HeartIcon className="size-4" />
            <span>{likesCount}</span>
          </Button>
          {!claimed ? (
            <Button asChild>
              <Link to={`/ideas/${id}/claim`}>Claim idea now &rarr;</Link>
            </Button>
          ) : (
            <Button variant="outline" disabled className="cursor-not-allowed">
              <LockIcon className="size-4" />
              <span>Claimed</span>
            </Button>
          )}
        </CardFooter>
      </CardHeader>
    </Card>
  );
}
