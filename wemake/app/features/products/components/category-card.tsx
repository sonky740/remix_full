import { Card, CardDescription, CardHeader, CardTitle } from '~/common/components/ui/card';
import { ChevronRightIcon } from 'lucide-react';
import { Link } from 'react-router';

interface CategoryCardProps {
  id: string;
  name: string;
  description: string;
}

export function CategoryCard({ id, name, description }: CategoryCardProps) {
  return (
    <Link to={`/products/categories/${id}`} className="block">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-1">
            {name} <ChevronRightIcon className="size-5" />
          </CardTitle>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
