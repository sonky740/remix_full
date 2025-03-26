import type { Route } from './+types/categories-page';
import { Hero } from '~/common/components/hero';
import { CategoryCard } from '~/features/products/components/category-card';

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Categories | wemake' },
    { name: 'description', content: 'Categories of products' },
  ];
};

export default function CategoriesPage() {
  return (
    <div className="space-y-20">
      <Hero title="Categories" subTitle="Browse products by category" />
      <div className="grid grid-cols-4 gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <CategoryCard
            key={`category-${index}`}
            id={`categoryId-${index}`}
            name="Category Name"
            description="Category Description"
          />
        ))}
      </div>
    </div>
  );
}
