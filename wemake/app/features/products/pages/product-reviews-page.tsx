import type { Route } from './+types/product-reviews-page';
import { Button } from '~/common/components/ui/button';
export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Product Reviews' },
    { name: 'description', content: 'Read and write product reviews' },
  ];
};

export default function ProductReviewsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Product Reviews</h1>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Button variant="outline">Write a Review</Button>
        </div>
      </div>
    </div>
  );
}
