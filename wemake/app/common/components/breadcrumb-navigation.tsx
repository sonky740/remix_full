import { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '~/common/components/ui/breadcrumb';
export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbListProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbNavigation({ items }: BreadcrumbListProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <Fragment key={item.href}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={item.href}>{item.label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < items.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  ) : (
    <div className="h-5" />
  );
}
