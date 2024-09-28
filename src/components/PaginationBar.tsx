import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "react-router-dom";
export default function PaginationBar({ maxPage }: { maxPage: number }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page") || 1);
  console.log({ currentPage });

  const centerPage = Math.min(Math.max(2, currentPage), maxPage - 1);
  console.log({ centerPage, maxPage });

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  const PaginationNumbers = [centerPage - 1, centerPage, centerPage + 1];

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          />
        </PaginationItem>
        {PaginationNumbers.map((page) => (
          <PaginationItem>
            <PaginationLink
              onClick={() => handlePageChange(page)}
              isActive={currentPage === page}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(Math.min(currentPage + 1, maxPage))}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
