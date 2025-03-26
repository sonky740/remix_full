import { Form } from 'react-router';
import type { Route } from './+types/category-page';
import { Input } from '~/common/components/ui/input';
import { Button } from '~/common/components/ui/button';
import { ProductCard } from '~/features/products/components/product-card';
import ProductPagination from '~/common/components/product-pagination';
import { Hero } from '~/common/components/hero';

export const meta: Route.MetaFunction = ({ params }) => {
  return [
    { title: `${params.category} | wemake` },
    { name: 'description', content: `${params.category} products` },
  ];
};

export default function CategoryPage() {
  return (
    <div className="space-y-20">
      <Hero title="Developer Tools" subTitle="Tools for developers to build products faster" />
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
