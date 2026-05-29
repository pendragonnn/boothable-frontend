"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getPageNumbers } from "@/lib/utils/pagination";

interface PaginationControlProps {
  currentPage: number;
  totalPages: number;
}

export function PaginationControl({ currentPage, totalPages }: PaginationControlProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();



  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname || ""}?${params.toString()}`;
  };

  const handlePageChange = (page: number) => {
    router.push(createPageUrl(page), { scroll: false });
  };

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <Pagination className="mt-12">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={currentPage > 1 ? createPageUrl(currentPage - 1) : "#"}
            onClick={(e) => {
              if (currentPage <= 1) {
                e.preventDefault();
                return;
              }
              e.preventDefault();
              handlePageChange(currentPage - 1);
            }}
            className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>

        {pageNumbers.map((page, index) => (
          <PaginationItem key={index}>
            {page === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={createPageUrl(page)}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page as number);
                }}
                isActive={page === currentPage}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={currentPage < totalPages ? createPageUrl(currentPage + 1) : "#"}
            onClick={(e) => {
              if (currentPage >= totalPages) {
                e.preventDefault();
                return;
              }
              e.preventDefault();
              handlePageChange(currentPage + 1);
            }}
            className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
