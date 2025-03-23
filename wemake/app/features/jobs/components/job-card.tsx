import { Link } from 'react-router';
import { Button } from '~/common/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/common/components/ui/card';
import { Badge } from '~/common/components/ui/badge';

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  companyLogoUrl: string;
  companyHq: string;
  postedAt: string;
  type: string;
  salary: string;
  location: string;
}

export function JobCard({
  id,
  title,
  company,
  companyLogoUrl,
  companyHq,
  postedAt,
  type,
  location,
  salary,
}: JobCardProps) {
  return (
    <Link to={`/jobs/${id}`}>
      <Card className="bg-transparent hover:bg-card/50 transition-colors">
        <CardHeader>
          <div className="flex items-center gap-4 mb-4">
            <img src={companyLogoUrl} alt={`${company} Logo`} className="size-10 rounded-full" />
            <div className="space-x-2">
              <span className="text-sm text-accent-foreground font-medium">{company}</span>
              <span className="text-sm text-muted-foreground">{postedAt}</span>
            </div>
          </div>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge variant="outline">{type}</Badge>
          <Badge variant="outline">{location}</Badge>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">{salary}</span>
            <span className="text-sm font-medium text-muted-foreground">{companyHq}</span>
          </div>
          <Button variant="secondary" size="sm">
            Apply now
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
