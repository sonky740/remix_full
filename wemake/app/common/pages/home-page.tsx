import { Link, type MetaFunction } from "react-router";
import { Button } from "~/common/components/ui/button";
import { ProductCard } from "~/features/products/components/product-card";
import { PostCard } from "~/features/community/components/post-card";
import { IdeaCard } from "~/features/ideas/components/idea-card";
import { JobCard } from "~/features/jobs/components/job-card";
import { TeamCard } from "~/features/teams/components/team-card";
import type { ReactNode } from "react";

interface SectionGridProps {
  title: string;
  description: string;
  linkText: string;
  linkTo: string;
  children: ReactNode;
  cols?: number;
}

interface Props {
  loaderData: any;
}

function SectionGrid({ title, description, linkText, linkTo, children, cols = 3 }: SectionGridProps) {
  return (
    <section className={`grid grid-cols-${cols} gap-4`}>
      <div>
        <h2 className="text-5xl font-bold leading-tight tracking-tight">
          {title}
        </h2>
        <p className="text-xl font-light text-foreground">
          {description}
        </p>
        <Button variant="link" asChild className="text-lg p-0">
          <Link to={linkTo}>{linkText} &rarr;</Link>
        </Button>
      </div>
      {children}
    </section>
  );
}

export default function HomePage({ loaderData }: Props) {
  console.log(loaderData);

  return (
    <div className="px-20 space-y-20">
      <SectionGrid
        title="Today's Products"
        description="The best products made by our community today."
        linkText="Explore all products"
        linkTo="/products/leaderboards"
      >
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
      </SectionGrid>

      <SectionGrid
        title="Latest Discussions"
        description="The latest discussions from our community."
        linkText="Explore all discussions"
        linkTo="/community"
      >
        {Array.from({ length: 11 }).map((_, index) => (
          <PostCard
            key={`post-${index}`}
            id={`postId-${index}`}
            title="What is the best productivity tool?"
            author="Sonky"
            authorAvatarUrl="https://github.com/apple.png"
            category="Productivity"
            postedAt="12 hours ago"
          />
        ))}
      </SectionGrid>

      <SectionGrid
        title="IdeasGPT"
        description="Find ideads for your next project."
        linkText="Explore all ideas"
        linkTo="/ideas"
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <IdeaCard
            key={`idea-${index}`}
            id={`ideaId-${index}`}
            title="A startup that creates an AI-powered generated personal trainer, delivering customized fitness recommendations and tracking of progress. using a mobile app to track workouts and progress as well as a website to manage the business."
            viewsCount={123}
            postedAt="123 hours ago"
            likesCount={12}
            claimed={index % 2 === 0 && true}
          />
        ))}
      </SectionGrid>

      <SectionGrid
        title="Latest Jobs"
        description="Find your dream job."
        linkText="Explore all jobs"
        linkTo="/jobs"
        cols={4}
      >
        {Array.from({ length: 5 }).map((_, index) => (<JobCard
          key={`job-${index}`}
          id="jobId"
          title="Software Engineer"
          company="Tesla"
          companyLogoUrl="https://github.com/teslamotors.png"
          companyHq="San Francisco, CA"
          postedAt="12 hours ago"
          type="Full-time"
          location="Remote"
          salary="$100,000 - $120,000"
        />))}
      </SectionGrid>

      <SectionGrid
        title="Find a team mate"
        description="Join a team looking for a new member."
        linkText="Explore all teams"
        linkTo="/teams"
        cols={4}
      >
        {Array.from({ length: 7 }).map((_, index) => (
          <TeamCard
            key={`teamId-${index}`}
            id={`teamId-${index}`}
            leaderUsername="lynn"
            leaderAvatarUrl="https://github.com/inthetiger.png"
            positions={[
              "React Developer",
              "Backend Developer",
              "Product Manager",
            ]}
            projectDescription="a new social media platform"
          />
        ))}
      </SectionGrid>
    </div>
  );
}

export const meta: MetaFunction = () => {
  return [
    { title: "Home | wemake" },
    { name: "description", content: "Welcome to wemake" },
  ];
};

// 서버 사이드 데이터 로드
export const loader = () => {
  return {
    hello: 'world',
  }
}