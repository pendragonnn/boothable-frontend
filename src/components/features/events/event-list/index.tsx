"use client";

import { useSearchParams } from "next/navigation";
import { useEventList } from "@/services/features/events/hooks";
import { EventCard } from "./event-card";
import { FilterBar } from "./filter-bar";
import { PaginationControl } from "./pagination-control";
import { EVENT_LIST_CONTENT } from "./constant";
import { SearchX, Loader2 } from "lucide-react";

export function EventList() {
  const searchParams = useSearchParams();
  
  const search = searchParams.get("search") || undefined;
  const categoryIdParam = searchParams.get("categoryId");
  const categoryId = categoryIdParam && categoryIdParam !== "all" ? categoryIdParam : undefined;
  const sort = searchParams.get("sort") || undefined;
  const page = Number(searchParams.get("page")) || 1;
  const limit = 12;

  const { data, isLoading, error } = useEventList({
    search,
    categoryId,
    sort,
    page,
    limit,
  });

  const events = data?.data || [];
  const totalPages = data?.paging?.totalPage || 1;
  const totalData = data?.paging?.totalData || 0;

  return (
    <section id="event-list" className="py-16 md:py-24 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10 text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900">
            {EVENT_LIST_CONTENT.headline}
          </h2>
          <p className="text-slate-600 font-plus-jakarta text-lg">
            {EVENT_LIST_CONTENT.description}
          </p>
        </div>

        <FilterBar />

        {isLoading ? (
          <div className="py-20 flex justify-center items-center">
             <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="py-20 text-center flex flex-col items-center">
            <h3 className="text-2xl font-bold font-heading text-slate-800 mb-2">
              {EVENT_LIST_CONTENT.errorTitle}
            </h3>
            <p className="text-red-500 font-plus-jakarta max-w-md">
              {EVENT_LIST_CONTENT.errorDescription}
            </p>
          </div>
        ) : events.length === 0 ? (
          <div className="py-32 text-center flex flex-col items-center">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
               <SearchX className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold font-heading text-slate-800 mb-2">
              {EVENT_LIST_CONTENT.emptyTitle}
            </h3>
            <p className="text-slate-500 font-plus-jakarta max-w-md">
              {EVENT_LIST_CONTENT.emptyDescription}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 text-sm text-slate-500 font-plus-jakarta flex justify-between items-center">
              <span>Menampilkan <strong className="text-slate-900">{events.length}</strong> dari <strong className="text-slate-900">{totalData}</strong> event</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {events.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>

            <PaginationControl currentPage={page} totalPages={totalPages} />
          </>
        )}
      </div>
    </section>
  );
}
