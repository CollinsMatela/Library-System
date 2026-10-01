import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Search, Book, BookSearch, ListFilter, X, ChevronLeft, ChevronRight, LoaderCircle } from "lucide-react";
import { toast } from "react-toastify";
import Lib_Navigation from "../library_components/Lib_Navigation";
import AdvancedSearch from "../pages/BookPage_Component/AdvancedSearch";

const EMPTY_FILTERS = {
  title: "",
  category: "",
  field: "",
  gradeLevel: "",
  subject: "",
  author: "",
  language: "",
  publisher: "",
  isbn: "",
  publication: "",
  edition: "",
  volume: "",
  ddc: "",
  callNumber: "",
  copies: "",
  donatedFrom: "",
  receivedDate: "",
  illustrator: "",
  series: "",
};

// Fields where an exact number match is correct, instead of substring matching
// ("1" would otherwise also match 10, 11, 21).
const NUMERIC_FILTERS = new Set(["copies", "publication"]);

// Human-readable labels for the active-filter chips.
const FIELD_LABELS = {
  title: "Title",
  category: "Category",
  field: "Field",
  gradeLevel: "Grade Level",
  subject: "Subject",
  author: "Author",
  language: "Language",
  publisher: "Publisher",
  isbn: "ISBN",
  publication: "Year",
  edition: "Edition",
  volume: "Volume",
  ddc: "DDC",
  callNumber: "Call Number",
  copies: "Copies",
  donatedFrom: "Donated From",
  receivedDate: "Received",
  illustrator: "Illustrator",
  series: "Series",
};

const PAGE_SIZE = 10;

/** Compare a book field against a filter value in a type-aware way. */
const matches = (book, key, rawValue) => {
  const bookValue = book[key];
  if (bookValue === null || bookValue === undefined || bookValue === "") return false;

  // Dates: compare calendar days, so a "2024-10-01" input matches the stored Date.
  if (bookValue instanceof Date) {
    const asDay = bookValue.toISOString().slice(0, 10);
    return asDay.includes(String(rawValue).slice(0, 10));
  }

  const haystack = String(bookValue).toLowerCase();

  if (NUMERIC_FILTERS.has(key)) {
    return Number(bookValue) === Number(rawValue);
  }

  return haystack.includes(String(rawValue).toLowerCase());
};

const SkeletonCard = () => (
  <div className="flex flex-row items-center gap-4 p-3 rounded-xl border border-stone-200 bg-white animate-pulse">
    <div className="w-16 sm:w-20 aspect-[5/7] rounded-lg bg-stone-200 shrink-0" />
    <div className="flex-1 min-w-0 space-y-2">
      <div className="h-3.5 bg-stone-200 rounded w-3/4" />
      <div className="h-3 bg-stone-200 rounded w-1/3" />
      <div className="h-4 bg-stone-200 rounded w-2/5" />
    </div>
  </div>
);

/** Muted "Label value" pair, e.g. "Year 2024". */
const Meta = ({ label, value }) =>
  value ? (
    <span className="text-[11px] text-stone-500 whitespace-nowrap">
      <span className="text-stone-400">{label}</span> {value}
    </span>
  ) : null;

const BookCard = ({ book, index }) => {
  const [coverFailed, setCoverFailed] = useState(false);
  const isAvailable = book.copies > 0;
  const hasCover = Boolean(book.cover) && !coverFailed;

  return (
    <Link
      to={`/library/view-book/${book._id}`}
      className="group flex flex-row items-center gap-4 p-3 rounded-xl border border-stone-200 bg-white hover:border-stone-300 hover:shadow-lg hover:shadow-stone-200/60 hover:-translate-y-0.5 transition-all duration-300 animate-[fadeIn_0.3s_ease-out]"
      style={{ animationDelay: `${index * 40}ms` }}
      aria-label={`View book: ${book.title || "Untitled"}`}
    >
      <div className="relative w-16 sm:w-20 aspect-[5/7] rounded-lg overflow-hidden bg-gradient-to-br from-stone-100 to-stone-200 shrink-0 shadow-sm ring-1 ring-stone-900/5">
        {hasCover ? (
          <img
            src={book.cover}
            alt={book.title || "Book cover"}
            loading="lazy"
            onError={() => setCoverFailed(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <Book size={20} className="text-stone-400" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h2 className="text-sm font-semibold text-stone-800 leading-snug line-clamp-1 group-hover:text-stone-900 transition-colors">
          {book.title || "Untitled"}
        </h2>
        <p className="text-xs text-stone-500 mt-0.5 line-clamp-1">
          {book.author || "Unknown Author"}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
          {book.category && (
            <span className="px-2 py-0.5 bg-stone-100 text-stone-500 text-[10px] font-semibold rounded-md uppercase tracking-wider max-w-[14rem] truncate">
              {book.category}
            </span>
          )}

          <Meta label="Year" value={book.publication} />
          <Meta label="Call No." value={book.callNumber} />
          <Meta label="DDC" value={book.ddc} />

          <span className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${isAvailable ? "bg-green-600" : "bg-stone-300"}`} />
            <span className={`text-[11px] font-medium ${isAvailable ? "text-green-700" : "text-stone-400"}`}>
              {isAvailable ? "Available" : "Not Available"}
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
};

const EmptyResults = ({ hasFilters, onClear }) => (
  <div className="w-full min-h-56 bg-stone-50 border border-stone-200 rounded-xl flex flex-col justify-center items-center gap-3 p-6 text-center">
    <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center">
      <BookSearch size={24} className="text-stone-400" />
    </div>
    <div>
      <h2 className="text-sm font-semibold text-stone-700">No books found</h2>
      <p className="text-xs text-stone-400 mt-1 max-w-xs">
        {hasFilters
          ? "Try changing or clearing your search filters."
          : "The catalog is empty right now. Please check back later."}
      </p>
    </div>
    {hasFilters && (
      <button
        onClick={onClear}
        className="mt-1 px-4 py-2 bg-stone-800 text-white text-xs font-medium rounded-lg hover:bg-stone-700 transition cursor-pointer"
      >
        Clear all filters
      </button>
    )}
  </div>
);

const Lib_Catalog = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [page, setPage] = useState(1);

  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-books`);
      setBooks(res.data.books || []);
    } catch (error) {
      setErrorMessage(error?.response?.data?.message);
      toast.error(error?.response?.data?.message || "Failed to load the catalog.");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await fetchBooks();
      } catch {
        toast.error("Failed to load data.");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Debounce the live search box so filtering doesn't run on every keystroke.
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((current) => ({ ...current, [name]: value }));
  };

  const clearFilters = () => {
    setFilters(EMPTY_FILTERS);
    setQuery("");
  };

  const removeFilter = (name) => {
    setFilters((current) => ({ ...current, [name]: "" }));
  };

  const activeFilters = useMemo(
    () => Object.entries(filters).filter(([, value]) => Boolean(value)),
    [filters]
  );

  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();

    return books.filter((book) => {
      // Header box matches title OR author.
      if (q) {
        const title = String(book.title || "").toLowerCase();
        const author = String(book.author || "").toLowerCase();
        if (!title.includes(q) && !author.includes(q)) return false;
      }

      // Advanced fields refine on top, all AND-ed together.
      return activeFilters.every(([key, value]) => {
        // `title` is owned by the header box, not the advanced panel.
        if (key === "title") return true;
        return matches(book, key, value);
      });
    });
  }, [books, debouncedQuery, activeFilters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visibleBooks = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Any change to the query or filters sends the user back to the first page.
  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, filters]);

  const pageNumbers = useMemo(() => {
    const window = 2;
    const start = Math.max(1, currentPage - window);
    const end = Math.min(totalPages, currentPage + window);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentPage, totalPages]);

  const hasFilters = activeFilters.length > 0 || debouncedQuery.trim().length > 0;

  return (
     <>
      <Lib_Navigation />
      <section className="min-h-screen w-full">
    
        <div className="w-full max-w-5xl mx-auto px-4 lg:px-0 mb-10 flex flex-col gap-4">

          {/* Header */}
          <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-20">
            <div className="w-fit flex items-center gap-2">
              <div className="border border-stone-800 bg-stone-800 p-2 rounded-lg shrink-0">
                <BookSearch size={15} className="text-white" />
              </div>
              <div>
                <h1 className="text-sm text-stone-800 font-bold">Search &amp; Catalog</h1>
                <p className="text-xs text-stone-500">
                  Find your desired book
                </p>
              </div>
            </div>

            {/* Live search — matches title or author */}
            <div className="relative w-full sm:w-80">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title or author"
                aria-label="Search by title or author"
                className="w-full h-10 pl-9 pr-9 bg-white border border-stone-200 rounded-lg text-xs text-stone-700 outline-none transition placeholder:text-stone-400 focus:border-stone-500 focus:ring-2 focus:ring-stone-100"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </header>

          <AdvancedSearch
            filters={filters}
            onFilterChange={handleFilterChange}
            onClear={clearFilters}
            onSubmit={(event) => event.preventDefault()}
            collapsible
            showSubmit={false}
          />

          {/* Results */}
          <div className="w-full rounded-xl border border-stone-200 p-3 sm:p-4 bg-white">

            <div className="flex items-center justify-between gap-3 rounded-lg bg-stone-100 px-4 py-3 mb-3">
              <div className="min-w-0">
                <h2 className="text-xs font-semibold text-stone-700">Search results</h2>
                <p className="mt-0.5 text-xs text-stone-500 truncate">
                  {isLoading
                    ? "Loading the catalog…"
                    : filtered.length > 0
                      ? `Showing ${(currentPage - 1) * PAGE_SIZE + 1}–${Math.min(currentPage * PAGE_SIZE, filtered.length)} of ${filtered.length}`
                      : "No matching books"}
                </p>
              </div>

              {!isLoading && (
                <span className="shrink-0 px-3 py-1 bg-white border border-stone-200 rounded-full text-xs font-medium text-stone-600">
                  {filtered.length} {filtered.length === 1 ? "book" : "books"}
                </span>
              )}
            </div>

            {/* Active filter chips */}
            {hasFilters && !isLoading && (
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {debouncedQuery.trim() && (
                  <button
                    onClick={() => setQuery("")}
                    className="inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-medium rounded-full transition-colors cursor-pointer"
                  >
                    <span className="max-w-[14rem] truncate">
                      Search: {debouncedQuery.trim()}
                    </span>
                    <X size={12} className="shrink-0" />
                  </button>
                )}

                {activeFilters
                  .filter(([key]) => key !== "title")
                  .map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => removeFilter(key)}
                      className="inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-medium rounded-full transition-colors cursor-pointer"
                    >
                      <span className="max-w-[14rem] truncate">
                        {FIELD_LABELS[key] || key}: {value}
                      </span>
                      <X size={12} className="shrink-0" />
                    </button>
                  ))}

                <button
                  onClick={clearFilters}
                  className="text-[11px] font-medium text-stone-500 hover:text-stone-800 underline underline-offset-2 transition-colors cursor-pointer"
                >
                  Clear all
                </button>
              </div>
            )}

            {errorMessage && !isLoading && filtered.length === 0 && (
              <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-xs text-red-600">{errorMessage}</p>
              </div>
            )}

            {isLoading ? (
              <div className="grid grid-cols-1 gap-2.5">
                {[...Array(8)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : visibleBooks.length === 0 ? (
              <EmptyResults hasFilters={hasFilters} onClear={clearFilters} />
            ) : (
              <div className="grid grid-cols-1 gap-2.5">
                {visibleBooks.map((book, i) => (
                  <BookCard key={book._id} book={book} index={i} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
              <nav
                className="flex items-center justify-center gap-1 mt-4 pt-4 border-t border-stone-100"
                aria-label="Pagination"
              >
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  className="p-2 rounded-lg border border-stone-200 text-stone-500 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors cursor-pointer"
                >
                  <ChevronLeft size={14} />
                </button>

                {pageNumbers[0] > 1 && (
                  <>
                    <PageButton page={1} active={currentPage === 1} onClick={setPage} />
                    {pageNumbers[0] > 2 && <span className="px-1 text-xs text-stone-400">…</span>}
                  </>
                )}

                {pageNumbers.map((n) => (
                  <PageButton
                    key={n}
                    page={n}
                    active={n === currentPage}
                    onClick={setPage}
                  />
                ))}

                {pageNumbers[pageNumbers.length - 1] < totalPages && (
                  <>
                    {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                      <span className="px-1 text-xs text-stone-400">…</span>
                    )}
                    <PageButton
                      page={totalPages}
                      active={currentPage === totalPages}
                      onClick={setPage}
                    />
                  </>
                )}

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  className="p-2 rounded-lg border border-stone-200 text-stone-500 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors cursor-pointer"
                >
                  <ChevronRight size={14} />
                </button>
              </nav>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

const PageButton = ({ page, active, onClick }) => (
  <button
    onClick={() => onClick(page)}
    aria-current={active ? "page" : undefined}
    className={`min-w-8 h-8 px-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
      active
        ? "bg-stone-800 border-stone-800 text-white"
        : "border-stone-200 text-stone-600 hover:bg-stone-50"
    }`}
  >
    {page}
  </button>
);

export default Lib_Catalog;