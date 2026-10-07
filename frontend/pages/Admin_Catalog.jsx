import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Book, BookSearch, ChevronRight, LibraryBig, LoaderCircle, Search, X } from "lucide-react";
import Admin_Sidebar from "../components/Admin_Sidebar";
import Admin_Header from "../components/Admin_Header";
import AdvancedSearch from "./BookPage_Component/AdvancedSearch";

// Every filter the advanced panel can set. They all start out empty.
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

// These two should match exactly. Otherwise searching "1" for the number
// of copies would also match 10, 11, 21 and so on.
const NUMBER_FILTERS = ["copies", "publication"];

// How many books to show on one page.
const BOOKS_PER_PAGE = 10;

// Does one book's field match one filter value?
const matchesFilter = (book, key, value) => {
  const bookValue = book[key];

  if (bookValue === null || bookValue === undefined || bookValue === "") return false;

  // Compare numbers side by side instead of as text.
  if (NUMBER_FILTERS.includes(key)) {
    return Number(bookValue) === Number(value);
  }

  return String(bookValue).toLowerCase().includes(String(value).trim().toLowerCase());
};

const Admin_Catalog = () => {
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  /* Loading the books */

  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-books`);
      setBooks(res.data.books || []);
    } catch (error) {
      // Show the problem on the page instead of failing silently.
      setErrorMessage(error?.response?.data?.message || "Could not load the catalog.");
      toast.error(error?.response?.data?.message || "Failed to load the catalog.");
    } finally {
      // isLoading only ever goes true -> false, so it never flashes again.
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  /* Searching and filtering */

  const searchText = filters.title.trim().toLowerCase();

  // Work out which books to show while we render. This means the list is
  // always correct, even on the very first load, and can never go stale.
  const filtered = books.filter((book) => {
    const title = String(book.title || "").toLowerCase();
    const author = String(book.author || "").toLowerCase();

    // The search box looks at both the title and the author.
    const matchesSearch = title.includes(searchText) || author.includes(searchText);

    // Then every filter that has a value in it has to match as well.
    const matchesFilters = Object.entries(filters).every(([key, value]) => {
      // The search box already checked the title, so skip it here.
      if (key === "title") return true;

      // An empty filter box should not remove anything.
      if (!value) return true;

      return matchesFilter(book, key, value);
    });

    return matchesSearch && matchesFilters;
  });

  // True when the admin has typed or chosen anything at all. Used to tell
  // "nothing matched" apart from "there are no books yet".
  const hasFilters = Object.values(filters).some(Boolean);

  /* Pages */

  // How many pages there are, and which books belong on the current one.
  const totalPages = Math.max(1, Math.ceil(filtered.length / BOOKS_PER_PAGE));

  // page can be too high after filtering, so never go past the last page.
  const currentPage = Math.min(page, totalPages);
  const firstIndex = (currentPage - 1) * BOOKS_PER_PAGE;
  const visibleBooks = filtered.slice(firstIndex, firstIndex + BOOKS_PER_PAGE);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((current) => ({ ...current, [name]: value }));

    // Any change to the search should start from the first page again.
    setPage(1);
  };

  // Empty the search box, but leave the advanced filters alone.
  const clearSearch = () => {
    setFilters((current) => ({ ...current, title: "" }));
    setPage(1);
  };

  // Empty every filter box and go back to the first page.
  const clearFilters = () => {
    setFilters(EMPTY_FILTERS);
    setPage(1);
  };

  /* What the list area shows: the spinner, the empty message, or the cards. */

  const bookList = isLoading ? (
    /* Still loading */
    <div className="w-full py-12 flex items-center justify-center gap-2 text-stone-400">
      <LoaderCircle size={20} className="animate-spin" />
      <span className="text-xs">Loading books...</span>
    </div>
  ) : visibleBooks.length === 0 ? (
    /* Nothing to show */
    <div className="w-full py-12 px-4 bg-stone-50 rounded-lg border border-dashed border-stone-300 flex flex-col items-center justify-center">
      <BookSearch size={24} className="text-stone-300" />
      <p className="text-sm font-medium text-stone-700 mt-2">No books found</p>
      <p className="text-xs text-stone-500 mt-1 text-center">
        {hasFilters
          ? "Try changing or clearing your filters."
          : "No books have been uploaded yet."}
      </p>

      {hasFilters && (
        <button
          type="button"
          onClick={clearFilters}
          className="mt-3 px-3 py-2 rounded-lg bg-stone-800 text-white text-xs font-medium hover:bg-stone-900 transition cursor-pointer"
        >
          Clear all filters
        </button>
      )}
    </div>
  ) : (
    /* The cards */
    <div className="w-full space-y-2 mt-2">
      {visibleBooks.map((book) => (
        <Link
          key={book._id}
          to={`/admin/book-information/${book._id}`}
          className="flex items-center gap-3 p-2 sm:p-3 bg-white border border-stone-200 rounded-lg hover:border-stone-300 hover:shadow-sm transition"
        >
          {!book.cover ? (
            <div className="hidden sm:flex w-15 h-20 shrink-0 rounded-lg bg-stone-100 border border-stone-200 items-center justify-center">
              <Book size={16} className="text-stone-500" />
            </div>
          ) : (
            <img src={book.cover} alt={book.title} className="w-15 h-20 rounded-lg object-cover" />
          )}

          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-stone-800 break-words">
              {book.title || "Untitled"}
            </p>

            <p className="text-[10px] text-stone-500 mt-0.5 break-words">
              {book.author || "Unknown author"}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded-full border border-stone-200 bg-stone-100 text-stone-600 text-[10px] font-medium">
                Shelf Location: {book.category || "Uncategorised"}
              </span>

              {book.field && (
                <span className="px-2 py-0.5 rounded-full border border-stone-200 bg-stone-100 text-stone-600 text-[10px] font-medium">
                Field: {book.field || "Uncategorised"}
              </span>
              )}

              {/* Availability */}
              <span
                className={`px-2 py-0.5 rounded-full border text-[10px] font-medium ${
                  book.copies > 0
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-stone-100 text-stone-500 border-stone-200"
                }`}
              >
                {book.copies > 0 ? "Available" : "Not Available"}
              </span>
            </div>
          </div>

          {/* Makes it obvious that the card opens something */}
          <ChevronRight size={16} className="hidden sm:block text-stone-300 shrink-0" />
        </Link>
      ))}
    </div>
  );

  return (
    <>
      <Admin_Sidebar />

      <section className="bg-white min-h-screen w-full justify-start items-start flex flex-col md:pl-20 lg:pl-60">
        <Admin_Header
          mainText={"Catalog Management"}
          subText={"Find the specific book you wanted"}
        />

        <div className="w-full justify-start items-start flex flex-col px-4 lg:px-10 pb-10">

          {/* Page heading and search */}
          <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="bg-stone-800 p-2 rounded-lg text-white flex items-center justify-center">
                <LibraryBig size={20} />
              </div>
              <div>
                <h1 className="text-sm font-bold text-stone-800">Find your book</h1>
                <p className="text-xs text-stone-400">List of all uploaded books.</p>
              </div>
            </div>

            {/* Search — filters as you type, no button needed */}
            <div className="relative w-full lg:w-72">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
              />
              <input
                type="search"
                name="title"
                value={filters.title}
                onChange={handleFilterChange}
                placeholder="Search title or author"
                aria-label="Search by title or author"
                className="w-full pl-9 pr-9 py-2 bg-white border border-stone-300 rounded-lg text-xs text-stone-700 outline-none transition placeholder:text-stone-400 focus:ring-2 focus:ring-stone-300"
              />

              {filters.title && (
                <button
                  type="button"
                  onClick={clearSearch}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* The advanced filters, collapsed by default */}
          <AdvancedSearch
            filters={filters}
            onFilterChange={handleFilterChange}
            onClear={clearFilters}
            onSubmit={(event) => event.preventDefault()}
            collapsible
            showSubmit={false}
          />

          {/* Anything that went wrong while loading */}
          {errorMessage && !isLoading && (
            <div className="w-full mb-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-xs text-red-600">{errorMessage}</p>
            </div>
          )}

          {/* The book list */}
          {bookList}

          {/* Previous and next */}
          {!isLoading && totalPages > 1 && (
            <div className="w-full flex flex-wrap items-center justify-between gap-3 mt-3 pt-3 border-t border-stone-200">
              <p className="text-xs text-stone-500">
                Showing {firstIndex + 1}-{Math.min(firstIndex + BOOKS_PER_PAGE, filtered.length)} of {filtered.length} books
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-lg border border-stone-300 text-xs text-stone-600 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  Previous
                </button>

                <span className="text-xs text-stone-500">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  type="button"
                  onClick={() => setPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-lg border border-stone-300 text-xs text-stone-600 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Admin_Catalog;