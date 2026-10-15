import { useEffect, useState } from "react";
import {
    LoaderCircle,
    ScrollText,
    Search,
    Trash,
    BookText,
    Calendar,
    MapPin,
    User,
    Clock,
    Book,
    ImageOff,
} from "lucide-react";
import AdminSidebar from "./Admin_Sidebar";
import Admin_Header from "./Admin_Header";
import Confirmation_Popup from "../popup/Confirmation_Popup";
import axios from "axios";
import { toast } from "sonner";
import EmptyState from "./EmptyState";

const Admin_Inventory = () => {
    const [books, setBooks] = useState([]);
    const [members, setMembers] = useState([]);

    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("newest"); // "newest" or "oldest"
    const [timeFilter, setTimeFilter] = useState("all"); // time-based filter: all, today, yesterday, thisWeek, last7, thisMonth, last30, thisYear, older30
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const [selectedBook, setSelectedBook] = useState(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);

    /* Helpers */

    // Turn a date into something easy to read, e.g. "Mar 5, 2024".
    const formatDate = (date) => {
        if (!date) return "—";

        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    /*
     * An <input type="date"> hands back a string like "2024-03-05".
     * This builds the same shape from a book, so the two can be compared
     * as plain text.
     *
     * We use getFullYear / getMonth / getDate on purpose. toISOString()
     * would convert to UTC and can move the day for anything saved near
     * midnight, which is exactly where our timezone is.
     */
    const toDateKey = (date) => {
        if (!date) return "";

        const value = new Date(date);
        const month = String(value.getMonth() + 1).padStart(2, "0"); // 1 becomes "01"
        const day = String(value.getDate()).padStart(2, "0"); // 5 becomes "05"

        return `${value.getFullYear()}-${month}-${day}`;
    };

    // Find the member who added this book. Returns "N/A" when we cannot find
    // them, so a book with a blank addedById can never crash the page.
    const responsiblePerson = (id) => {
        const person = members.find((member) => member._id === id);

        if (!person) return "N/A";
        return `${person.firstname} ${person.lastname}`;
    };

    /* Time-based filtering (by createdAt) */
    // Filter books by time range. Week starts on Monday (calendar week).
    const getBooksInTimeRange = (bookList, filter) => {
        if (filter === "all") return bookList;

        const now = new Date();
        // Start of today (midnight) so we compare calendar days, not exact times
        const startOfToday = new Date(now);
        startOfToday.setHours(0, 0, 0, 0);

        // Start of yesterday (midnight)
        const startOfYesterday = new Date(startOfToday);
        startOfYesterday.setDate(startOfYesterday.getDate() - 1);

        // Start of this week (Monday)
        const startOfThisWeek = new Date(startOfToday);
        const day = startOfThisWeek.getDay(); // 0 = Sunday, 1 = Monday, ...
        const daysToMonday = day === 0 ? 6 : day - 1;
        startOfThisWeek.setDate(startOfThisWeek.getDate() - daysToMonday);

        // Rolling windows from start of today (including today)
        const last7Start = new Date(startOfToday);
        last7Start.setDate(last7Start.getDate() - 6); // last 7 days including today

        const last30Start = new Date(startOfToday);
        last30Start.setDate(last30Start.getDate() - 29); // last 30 days including today

        // Start of month and year
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfYear = new Date(now.getFullYear(), 0, 1);

        return bookList.filter((book) => {
            const created = new Date(book.createdAt);
            if (Number.isNaN(created.getTime())) return false; // skip invalid dates safely

            switch (filter) {
                case "today":
                    return created >= startOfToday;
                case "yesterday":
                    // Books created yesterday only: >= yesterday midnight and < today midnight
                    return created >= startOfYesterday && created < startOfToday;
                case "thisWeek":
                    // Books created from Monday of this week onward
                    return created >= startOfThisWeek;
                case "last7":
                    return created >= last7Start;
                case "thisMonth":
                    return created >= startOfMonth;
                case "last30":
                    return created >= last30Start;
                case "thisYear":
                    return created >= startOfYear;
                case "older30":
                    // Books created strictly before the last 30 days window (older than 30 days)
                    return created < last30Start;
                default:
                    return true;
            }
        });
    };

    /* Loading the data */

    const fetchBooks = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-books`);
            setBooks(res.data.books);
        } catch (error) {
            // The admin now actually finds out when the list fails to load.
            toast.error("Failed to fetch data");
            setErrorMessage(error.response?.data?.message);
        } finally {
            // isLoading only ever turns from true to false. Because it is
            // already false on later calls, deleting a book never makes the
            // spinner flash again.
            setIsLoading(false);
        }
    };

    const fetchMembers = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/fetch-members`);
            setMembers(res.data.members);
        } catch (error) {
            toast.error("Failed to fetch members");
            setErrorMessage(error.response?.data?.message);
        }
    };

    useEffect(() => {
        fetchBooks();
        fetchMembers();
    }, []);

    // Reset to first page when search, sort, or time filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [search, sortOrder, timeFilter]);

    /* Searching, filtering by time, and sorting */

    // 1) Filter by time range first (by createdAt). Week starts on Monday (calendar week).
    const booksFilteredByTime = getBooksInTimeRange(books, timeFilter);

    // 2) Sort within that time range by createdAt (newest/oldest as chosen).
    const orderedBooks = [...booksFilteredByTime].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        if (sortOrder === "oldest") {
            return dateA - dateB; // oldest first
        }
        return dateB - dateA; // newest first (latest to oldest)
    });

    const searchText = search.trim().toLowerCase();

    // Keep the books that match the search box.
    // The search box looks at the title, the author and who donated it.
    const visibleBooks = orderedBooks.filter((book) => {
        const title = (book.title || "").toLowerCase();
        const author = (book.author || "").toLowerCase();
        const from = (book.donatedFrom || "").toLowerCase();

        const matchesSearch =
            title.includes(searchText) || author.includes(searchText) || from.includes(searchText);

        return matchesSearch;
    });

    // Pagination
    const totalItems = visibleBooks.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedBooks = visibleBooks.slice(startIndex, endIndex);

    /* Deleting */

    const handleDelete = (book) => {
        setSelectedBook(book);
        setErrorMessage("");
        setDeleteConfirmation(true);
    };

    const deleteBook = async (id) => {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/delete-book/${id}`);
            toast.success(res.data.message);
            setDeleteConfirmation(false);
            setSelectedBook(null);
            fetchBooks();
        } catch (error) {
            // The popup stays open so the admin can read the reason.
            toast.error(error?.response?.data?.message || "Failed to delete book");
            setErrorMessage(error?.response?.data?.message);
        }
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
        <EmptyState title="No Book Record Found" description="registered books will appear"/>
    ) : (
        /* The cards */
        <div className="w-full">
            {paginatedBooks.map((book) => (
                <div
                    key={book._id}
                    className="w-full flex flex-col sm:flex-row sm:items-center gap-3 bg-white border-b border-stone-300 p-2 hover:bg-stone-100 hover:shadow-sm transition"
                >
                    {/* Left: Icon, title, author and category */}
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                        {!book.cover ? (
                            <div className="hidden sm:flex w-15 h-20 shrink-0 items-center justify-center">
                            <ImageOff size={16} className="text-yellow-500" />
                            </div>
                        ) : (
                            <img src={book.cover} alt={book.title} className="w-15 h-20 rounded-lg object-cover" />
                        )}

                        <div className="min-w-0 ">
                            <p className="text-[11px] text-stone-800 truncate capitalize">
                                {book.title}
                            </p>

                            <p className="text-[10px] text-stone-500 truncate mt-0.5">
                                {book.author || "Unknown author"}
                            </p>
                            <div className="flex gap-1 flex-wrap mt-1">
                              <span className="inline-flex mt-1 px-2 py-0.5 rounded-full border border-stone-200 bg-stone-100 text-stone-600 text-[10px] font-medium">
                                {book.category || "Uncategorised"}
                            </span>
                            {book.field && (
                                <span className="inline-flex mt-1 px-2 py-0.5 rounded-full border border-stone-200 bg-stone-100 text-stone-600 text-[10px] font-medium">
                                    {book.field}
                                </span>
                            )}
                            </div>
                            
                        </div>
                    </div>

                    {/* Middle: Details with icons */}
                    <div className="grid grid-cols-2 sm:w-80 gap-x-5 gap-y-1 text-[10px] text-stone-500">
                        <span className="flex items-center gap-1.5 min-w-0">
                            <Calendar size={13} className="shrink-0" />
                            <span className="truncate">Donated: {formatDate(book.receivedDate)}</span>
                        </span>

                        <span className="flex items-center gap-1.5 min-w-0">
                            <MapPin size={13} className="shrink-0" />
                            <span className="truncate">Donated From: {book.donatedFrom || "—"}</span>
                        </span>

                        <span className="flex items-center gap-1.5 min-w-0">
                            <User size={13} className="shrink-0" />
                            <span className="truncate">Added By: {responsiblePerson(book.addedById)}</span>
                        </span>

                        <span className="flex items-center gap-1.5 min-w-0">
                            <Clock size={13} className="shrink-0" />
                            <span className="truncate">Created: {formatDate(book.createdAt)}</span>
                        </span>
                    </div>

                    {/* Right: Actions */}
                    {/* <div className="flex items-center gap-2 sm:justify-end">
                        <button
                            type="button"
                            aria-label={`Delete ${book.title}`}
                            title="Delete book"
                            onClick={() => handleDelete(book)}
                            className="text-[10px] p-2 rounded-lg flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white cursor-pointer transition-colors"
                        >
                            <Trash size={15} />
                        </button>
                    </div> */}
                </div>
            ))}
        </div>
    );

    return (
        <>
            {deleteConfirmation && (
                <Confirmation_Popup
                    errorMessage={errorMessage}
                    message={`Delete "${selectedBook.title}"? This cannot be undone.`}
                    confirmLabel="Delete"
                    onConfirm={() => deleteBook(selectedBook._id)}
                    onCancel={() => {
                        setDeleteConfirmation(false);
                        setErrorMessage("");
                    }}
                />
            )}

            <AdminSidebar />

            <section className="bg-white min-h-screen w-full justify-start items-start flex flex-col md:pl-20 lg:pl-60">
                <Admin_Header
                    mainText={"Book Record"}
                    subText={"Oversee the record of books"}
                />

                <div className="w-full justify-start items-start flex flex-col px-4 lg:px-10 pb-10">

                    {/* Page heading and search */}
                    <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4">
                        

                        {/* Search and sort */}
                        <div className="w-full flex justify-between items-center gap-2">
                            <div className="relative flex-1 lg:flex-none">
                                <Search
                                    size={14}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
                                />
                                <input
                                    type="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search title, author or donor..."
                                    className="w-full lg:w-64 border border-stone-300 bg-white rounded-lg pl-9 pr-3 py-2 text-xs text-stone-600 outline-none focus:ring-2 focus:ring-stone-300"
                                />
                                {/* Show Clear once search is active */}
                            {search && (
                                <button
                                    type="button"
                                    onClick={() => setSearch("")}
                                    className="text-xs text-stone-500 hover:text-stone-800 px-2 py-2 cursor-pointer shrink-0"
                                >
                                    Clear
                                </button>
                            )}
                            </div>

                            {/* Time filter dropdown (filter by createdAt; week starts Monday) */}
                            <select
                                value={timeFilter}
                                onChange={(e) => setTimeFilter(e.target.value)}
                                aria-label="Filter by time period"
                                className="w-fit lg:w-44 shrink-0 border border-stone-300 bg-white rounded-lg px-3 py-2 text-xs text-stone-600 outline-none focus:ring-2 focus:ring-stone-300"
                            >
                                <option value="all">All</option>
                                <option value="today">Today</option>
                                <option value="yesterday">Yesterday</option>
                                <option value="thisWeek">This Week (Mon–Sun)</option>
                                <option value="last7">Last 7 Days</option>
                                <option value="thisMonth">This Month</option>
                                <option value="last30">Last 30 Days</option>
                                <option value="thisYear">This Year</option>
                                <option value="older30">Older than 30 Days</option>
                            </select>

                           

                            
                        </div>
                    </div>

                    {/* The book list */}
                    {bookList}

                    {/* Pagination controls */}
                    {!isLoading && visibleBooks.length > 0 && totalPages > 1 && (
                        <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-4 px-2">
                            <p className="text-xs text-stone-500">
                                Showing {startIndex + 1} - {Math.min(endIndex, totalItems)} of {totalItems}
                            </p>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    className="text-xs px-3 py-1.5 border border-stone-300 rounded-lg hover:bg-stone-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Previous
                                </button>
                                <span className="text-xs text-stone-600">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    type="button"
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    className="text-xs px-3 py-1.5 border border-stone-300 rounded-lg hover:bg-stone-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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

export default Admin_Inventory;