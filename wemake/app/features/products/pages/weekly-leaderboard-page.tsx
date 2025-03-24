import { DateTime } from 'luxon';
import type { Route } from './+types/weekly-leaderboard-page';
import { data, isRouteErrorResponse, Link } from 'react-router';
import { z } from 'zod';
import { Hero } from '~/common/components/hero';
import { ProductCard } from '../components/product-card';
import { Button } from '~/common/components/ui/button';
import ProductPagination from '~/common/components/product-pagination';

const paramsSchema = z.object({
  year: z.coerce.number(),
  week: z.coerce.number(),
});

const dateFromObject = (obj: { year: number; week: number }) => {
  return DateTime.fromObject({
    weekYear: obj.year,
    weekNumber: obj.week,
  });
};

export const meta: Route.MetaFunction = ({ params }) => {
  const date = DateTime.fromObject({
    weekYear: Number(params.year),
    weekNumber: Number(params.week),
  })
    .setZone('Asia/Seoul')
    .setLocale('ko');

  return [
    {
      title: `Best of week ${date.startOf('week').toLocaleString(DateTime.DATE_SHORT)} - ${date.endOf('week').toLocaleString(DateTime.DATE_SHORT)} | wemake`,
    },
  ];
};

export const loader = ({ params }: Route.LoaderArgs) => {
  const { success, data: parsedData } = paramsSchema.safeParse(params);

  if (!success) {
    throw data(
      {
        error_code: 'INVALID_PARAMS',
        message: 'Invalid params',
      },
      {
        status: 400,
      }
    );
  }

  const date = dateFromObject(parsedData);

  if (!date.isValid) {
    throw data(
      {
        error_code: 'INVALID_DATE',
        message: 'Invalid date',
      },
      {
        status: 400,
      }
    );
  }

  const today = DateTime.now().startOf('week');
  if (date > today) {
    throw data(
      {
        error_code: 'FUTURE_DATE',
        message: 'Future date',
      },
      {
        status: 400,
      }
    );
  }

  return { parsedData, today };
};

export default function WeeklyLeaderboardPage({ loaderData }: Route.ComponentProps) {
  const { parsedData } = loaderData;
  const urlDate = dateFromObject(parsedData);

  const previousWeek = urlDate.minus({ weeks: 1 });
  const nextWeek = urlDate.plus({ weeks: 1 });
  const isToday = urlDate.equals(DateTime.now().startOf('week'));

  return (
    <div className="flex flex-col gap-5">
      <Hero
        title={`Best of week ${urlDate.startOf('week').toLocaleString(DateTime.DATE_SHORT)} - ${urlDate.endOf('week').toLocaleString(DateTime.DATE_SHORT)}`}
      />
      <div className="flex justify-center gap-2">
        <Button variant="secondary" asChild>
          <Link
            to={`/products/leaderboards/weekly/${previousWeek.year}/${previousWeek.weekNumber}`}
          >
            &larr; {previousWeek.toLocaleString(DateTime.DATE_SHORT)}
          </Link>
        </Button>
        {!isToday && (
          <Button variant="secondary" asChild>
            <Link to={`/products/leaderboards/weekly/${nextWeek.year}/${nextWeek.weekNumber}`}>
              {nextWeek.toLocaleString(DateTime.DATE_SHORT)} &rarr;
            </Link>
          </Button>
        )}
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
      return (
        <div>
          {error.data.message} / {error.data.error_code}
        </div>
      );
    }
  }

  if (error instanceof Error) {
    return <div>{error.message}</div>;
  }

  return <div>Unknown error</div>;
}
