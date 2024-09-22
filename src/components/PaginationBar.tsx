import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "react-router-dom";

export default function PaginationBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activePage = Number(searchParams.get("page") || 1);

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(activePage - 1)}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            onClick={() => handlePageChange(1)}
            isActive={activePage === 1}
          >
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            onClick={() => handlePageChange(2)}
            isActive={activePage === 2}
          >
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            onClick={() => handlePageChange(3)}
            isActive={activePage === 3}
          >
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={() => handlePageChange(activePage + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
