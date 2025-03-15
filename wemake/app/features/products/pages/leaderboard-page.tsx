import { Link, type MetaFunction } from "react-router";
import { Hero } from "~/common/components/hero";
import { ProductCard, type ProductCardProps } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import { cn } from "~/lib/utils";
export const meta: MetaFunction = () => {
  return [
    { title: "Leaderboard | wemake" },
    { name: "description", content: "Check out the rankings of popular products." },
  ];
};

interface LeaderboardSectionProps {
  type: string;
  title: string;
  description: string;
  products: ProductCardProps[];
  linkPath: string;
}

function LeaderboardSection({ type, title, description, linkPath, products }: LeaderboardSectionProps) {
  return (
    <section className={cn("grid grid-cols-3 gap-4", { type })}>
      <div>
        <h2 className="text-3xl font-bold leading-tight tracking-tight">
          {title}
        </h2>
        <p className="text-xl font-light text-foreground">
          {description}
        </p>
      </div>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
      <Button variant="link" asChild className="text-lg p-0 self-center">
        <Link to={linkPath}>Explore all products &rarr;</Link>
      </Button>
    </section>
  );
}

export default function LeaderboardPage() {
  const tempProducts = [
    {
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      commentsCount: 12,
      viewsCount: 12,
      votesCount: 120,
    },
    {
      id: "2",
      name: "Product 2",
      description: "Product 2 description",
      commentsCount: 12,
      viewsCount: 12,
      votesCount: 120,
    },
    {
      id: "3",
      name: "Product 3",
      description: "Product 3 description",
      commentsCount: 12,
      viewsCount: 12,
      votesCount: 120,
    },
  ];


  return (
    <div className="space-y-20">
      <Hero title="Leaderboard" subTitle="Check out the rankings of popular products." />
      <LeaderboardSection
        type="daily"
        title="Daily Leaderboard"
        description="The most popular products on wemake by day"
        linkPath="/products/leaderboards/daily"
        products={tempProducts}
      />
      <LeaderboardSection
        type="weekly"
        title="Weekly Leaderboard"
        description="The most popular products on wemake by week"
        linkPath="/products/leaderboards/weekly"
        products={tempProducts}
      />
      <LeaderboardSection
        type="monthly"
        title="Monthly Leaderboard"
        description="The most popular products on wemake by month"
        linkPath="/products/leaderboards/monthly"
        products={tempProducts}
      />
      <LeaderboardSection
        type="yearly"
        title="Yearly Leaderboard"
        description="The most popular products on wemake by year"
        linkPath="/products/leaderboards/yearly"
        products={tempProducts}
      />
    </div>
  );
} 