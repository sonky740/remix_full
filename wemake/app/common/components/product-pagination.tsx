import { useSearchParams } from "react-router";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ProductPaginationProps = {
  totalPages: number;
};

export default function ProductPagination({
  totalPages,
}: ProductPaginationProps) {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);

  const getUrlWithPage = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", `${page}`);
    return `?${newSearchParams}`;
  }

  return (
    <div>
      <Pagination>
        <PaginationContent>
          {page === 1 ? null : (
            <>
              <PaginationItem>
                <PaginationLink
                  to={getUrlWithPage(1)}
                  className="flex items-center gap-1 py-2 px-4 pl-2.5 w-auto"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>First</span>
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationPrevious
                  to={getUrlWithPage(page - 1)}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  to={getUrlWithPage(page - 1)}
                >
                  {page - 1}
                </PaginationLink>
              </PaginationItem>
            </>
          )}
          <PaginationItem>
            <PaginationLink
              to={getUrlWithPage(page)}
              isActive
            >
              {page}
            </PaginationLink>
          </PaginationItem>
          {page === totalPages ? null : (
            <>
              <PaginationItem>
                <PaginationLink
                  to={getUrlWithPage(page + 1)}
                >
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
              {page + 1 === totalPages ? null : (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationNext
                  to={getUrlWithPage(page + 1)}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  to={getUrlWithPage(totalPages)}
                  className="flex items-center gap-1 py-2 px-4 pr-2.5 w-auto"
                >
                  <span>Last</span>
                  <ChevronRight className="h-4 w-4" />
                </PaginationLink>
              </PaginationItem>
            </>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}