import { data, Form } from 'react-router';
import type { Route } from './+types/search-page';
import { z } from 'zod';
import { Hero } from '~/common/components/hero';
import { ProductCard } from '~/features/products/components/product-card';
import ProductPagination from '~/common/components/product-pagination';
import { Input } from '~/common/components/ui/input';
import { Button } from '~/common/components/ui/button';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Search Products | wemake' },
    { name: 'description', content: 'Search for products' },
  ];
};

const paramsSchema = z.object({
  query: z.string().optional().default(''),
  page: z.coerce.number().optional().default(1),
});

export const loader = ({ request, params }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const { success, data: parsedData } = paramsSchema.safeParse(
    Object.fromEntries(url.searchParams)
  );
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

  return {
    ...parsedData,
  };
};

export default function SearchPage({ loaderData }: Route.ComponentProps) {
  console.log(loaderData);

  return (
    <div className="space-y-20">
      <Hero title="Search" subTitle="Search for products by title or description" />
      <Form className="flex gap-2 justify-center max-w-screen-sm items-center mx-auto">
        <Input name="query" placeholder="Search for products" className="text-lg" />
        <Button type="submit">Search</Button>
      </Form>
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

        <ProductPagination totalPages={10} />
      </div>
    </div>
  );
}
