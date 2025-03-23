import { DateTime } from 'luxon';
import type { Route } from './+types/daily-leaderboard-page'
import { data, isRouteErrorResponse, Link } from 'react-router';
import { z } from 'zod';
import { Hero } from '~/common/components/hero';
import { ProductCard } from '../components/product-card';
import { Button } from '~/common/components/ui/button';
import ProductPagination from '~/common/components/product-pagination';

const paramsSchema = z.object({
  year: z.coerce.number(),
  month: z.coerce.number(),
  day: z.coerce.number(),
})


export const loader = ({ params }: Route.LoaderArgs) => {
  const { success, data: parsedData, } = paramsSchema.safeParse(params);

  if (!success) {
    throw data({
      error_code: 'INVALID_PARAMS',
      message: 'Invalid params',
    }, {
      status: 400,
    })
  }

  const date = DateTime.fromObject(parsedData);

  if (!date.isValid) {
    throw data({
      error_code: 'INVALID_DATE',
      message: 'Invalid date',
    }, {
      status: 400,
    })
  }

  const today = DateTime.now().startOf('day');
  if (date > today) {
    throw data({
      error_code: 'FUTURE_DATE',
      message: 'Future date',
    }, {
      status: 400,
    })
  }

  return { parsedData, today }
}

export default function DailyLeaderboardPage({ loaderData }: Route.ComponentProps) {
  const { parsedData } = loaderData;
  const urlDate = DateTime.fromObject(parsedData);

  const previousDay = urlDate.minus({ days: 1 });
  const nextDay = urlDate.plus({ days: 1 });
  const isToday = urlDate.equals(DateTime.now().startOf('day'));

  return (
    <div className="flex flex-col gap-5">
      <Hero title={`The best products of ${urlDate.toLocaleString(DateTime.DATE_MED)}`} />
      <div className="flex justify-center gap-2">
        <Button variant="secondary" asChild>
          <Link to={`/products/leaderboards/daily/${previousDay.year}/${previousDay.month}/${previousDay.day}`}>
            &larr; {previousDay.toLocaleString(DateTime.DATE_SHORT)}
          </Link>
        </Button>
        {!isToday && <Button variant="secondary" asChild>
          <Link to={`/products/leaderboards/daily/${nextDay.year}/${nextDay.month}/${nextDay.day}`}>
            {nextDay.toLocaleString(DateTime.DATE_SHORT)} &rarr;
          </Link>
        </Button>}
      </div>

      <div className="flex flex-col gap-5 w-full max-w-screen-md mx-auto">
        {Array.from({ length: 11 }).map((_, index) => (
          <ProductCard
            key={`product-${index}`}
            id={`productId-${index}`}
            name="Product Name"
            description="Product Description"
            commentsCount={12}
            viewsCount={12}
            votesCount={120}
          />
        ))}
      </div>

      <ProductPagination totalPages={10} />
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error)) {
    if (error.status === 400) {
      return <div>{error.data.message} / {error.data.error_code}</div>;
    }
  }

  if (error instanceof Error) {
    return <div>{error.message}</div>;
  }

  return <div>Unknown error</div>;
}

