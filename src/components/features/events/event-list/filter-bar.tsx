"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { Search, Clock, History, CalendarDays, ArrowDownAZ, ArrowUpZA } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { useEventCategoryList } from "@/services/features/event-categories/hooks";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EVENT_LIST_CONTENT, SORT_OPTIONS } from "./constant";

export function FilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data: categoriesData } = useEventCategoryList();
  const categories = categoriesData?.data || [];

  const getSortIcon = (value: string) => {
    switch (value) {
      case "newest": return <Clock className="w-4 h-4 mr-2 text-primary" />;
      case "oldest": return <History className="w-4 h-4 mr-2 text-primary" />;
      case "upcoming": return <CalendarDays className="w-4 h-4 mr-2 text-primary" />;
      case "name_asc": return <ArrowDownAZ className="w-4 h-4 mr-2 text-primary" />;
      case "name_desc": return <ArrowUpZA className="w-4 h-4 mr-2 text-primary" />;
      default: return null;
    }
  };

  const createQueryString = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "all") {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      params.delete("page"); // Reset page when filter changes
      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    if (debouncedSearch !== currentSearch) {
      router.push(`${pathname || ""}?${createQueryString("search", debouncedSearch)}`, { scroll: false });
    }
  }, [debouncedSearch, pathname, router, createQueryString, searchParams]);

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between w-full p-4 bg-white rounded-2xl shadow-sm border border-slate-100 mb-8">
      <div className="relative w-full md:max-w-md">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-slate-400" />
        </div>
        <Input
          type="text"
          placeholder={EVENT_LIST_CONTENT.searchPlaceholder}
          className="pl-10 h-12 bg-slate-50 border-none focus-visible:ring-1 focus-visible:ring-primary rounded-xl font-plus-jakarta"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          suppressHydrationWarning
        />
      </div>

      <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
        <Select
          key={categories.length > 0 ? "categories-loaded" : "categories-loading"}
          value={searchParams.get("categoryId") || "all"}
          onValueChange={(val) => {
            router.push(`${pathname || ""}?${createQueryString("categoryId", val)}`, { scroll: false });
          }}
        >
          <SelectTrigger className="w-full sm:w-[180px] h-12 rounded-xl bg-slate-50 border-none font-plus-jakarta" suppressHydrationWarning>
            <span className="truncate">
              {(() => {
                const val = searchParams.get("categoryId") || "all";
                if (val === "all") return EVENT_LIST_CONTENT.allCategories;
                const cat = categories.find(c => String(c.id) === val);
                return cat ? cat.name : (categories.length === 0 ? "Memuat..." : "Kategori");
              })()}
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="font-plus-jakarta">
              {EVENT_LIST_CONTENT.allCategories}
            </SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={String(cat.id)} className="font-plus-jakarta">
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={searchParams.get("sort") || "newest"}
          onValueChange={(val) => {
            router.push(`${pathname || ""}?${createQueryString("sort", val)}`, { scroll: false });
          }}
        >
          <SelectTrigger className="w-full sm:w-[220px] h-12 rounded-xl bg-slate-50 border-none font-plus-jakarta" suppressHydrationWarning>
            <div className="truncate">
              {(() => {
                const val = searchParams.get("sort") || "newest";
                const opt = SORT_OPTIONS.find(o => o.value === val);
                return opt ? (
                  <div className="flex items-center">
                    {getSortIcon(opt.value)}
                    {opt.label}
                  </div>
                ) : "Urutkan";
              })()}
            </div>
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value} className="font-plus-jakarta">
                <div className="flex items-center">
                  {getSortIcon(option.value)}
                  {option.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
