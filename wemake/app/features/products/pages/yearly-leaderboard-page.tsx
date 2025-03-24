import { DateTime } from 'luxon';
import type { Route } from './+types/yearly-leaderboard-page';
import { data, isRouteErrorResponse, Link } from 'react-router';
import { z } from 'zod';
import { Hero } from '~/common/components/hero';
import { ProductCard } from '../components/product-card';
import { Button } from '~/common/components/ui/button';
import ProductPagination from '~/common/components/product-pagination';

const paramsSchema = z.object({
  year: z.coerce.number(),
});

const dateFromObject = (obj: { year: number }) => {
  return DateTime.fromObject({
    year: obj.year,
  });
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

  const today = DateTime.now().startOf('year');
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

export const meta: Route.MetaFunction = ({ params }) => {
  const date = DateTime.fromObject({
    year: Number(params.year),
  })
    .setZone('Asia/Seoul')
    .setLocale('ko');

  return [
    {
      title: `Best of ${date.toLocaleString(DateTime.DATE_MED)} | wemake`,
    },
  ];
};

export default function YearlyLeaderboardPage({ loaderData }: Route.ComponentProps) {
  const { parsedData } = loaderData;
  const urlDate = dateFromObject(parsedData);

  const previousYear = urlDate.minus({ years: 1 });
  const nextYear = urlDate.plus({ years: 1 });
  const isToday = urlDate.equals(DateTime.now().startOf('year'));

  return (
    <div className="flex flex-col gap-5">
      <Hero
        title={`Best of ${urlDate.toLocaleString({
          year: 'numeric',
        })}`}
      />
      <div className="flex justify-center gap-2">
        <Button variant="secondary" asChild>
          <Link to={`/products/leaderboards/yearly/${previousYear.year}`}>
            &larr; {previousYear.toLocaleString({ year: 'numeric' })}
          </Link>
        </Button>
        {!isToday && (
          <Button variant="secondary" asChild>
            <Link to={`/products/leaderboards/yearly/${nextYear.year}`}>
              {nextYear.toLocaleString({ year: 'numeric' })}
              &rarr;
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
