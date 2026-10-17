import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
    Users,
    LibraryBig,
    SquareGanttChart,
    DoorOpen,
    Book,
    CalendarDays,
    CircleAlert,
    ImageOff,
    RefreshCw,
    ArrowRight,
    Clock,
    HandHelping,
    ScrollText,
} from "lucide-react";

import useAuthStore from "../store/useAuthStore";
import Admin_SideBar from "../components/Admin_Sidebar";
import Admin_Header from "../components/Admin_Header";
import EmptyState from "../components/EmptyState";

/* ------------------------------------------------------------------
   isToday
   Checks if a date string belongs to the current day.
   Used to count how many visitors came in today.
------------------------------------------------------------------ */
const isToday = (dateString) => {
    if (!dateString) return false;

    const entryDate = new Date(dateString).toDateString();
    const todayDate = new Date().toDateString();

    return entryDate === todayDate;
};

/* ------------------------------------------------------------------
   StatCard
   One small "summary" box at the top of the page.
   It shows a title, an icon, a number and a short caption.
   While the page is loading we show a grey placeholder instead.
------------------------------------------------------------------ */
const StatCard = ({ title, caption, icon, value, isLoading }) => {
    return (
        <div className="h-full rounded-lg border-b-4 border-stone-300 bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-md">
            {/* Title row: label on the left, icon on the right */}
            <div className="flex items-start justify-between gap-3">
                <p className="text-xs font-medium text-stone-800">{title}</p>

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-stone-300 bg-white/30 text-stone-500">
                    {icon}
                </div>
            </div>

            {/* The big number */}
            {isLoading ? (
                <div className="mt-2 h-7 w-16 animate-pulse rounded bg-stone-200" />
            ) : (
                <h2 className="mt-2 text-2xl font-bold text-stone-800">{value}</h2>
            )}

            {/* Caption */}
            <p className="mt-3 border-t border-stone-300 pt-2 text-xs text-stone-500">
                {caption}
            </p>
        </div>
    );
};

/* ------------------------------------------------------------------
   SectionCard
   A reusable white box with an icon + title header.
   Every list / spotlight on this page uses it so they all look alike.
------------------------------------------------------------------ */
const SectionCard = ({ title, subtitle, icon, children }) => {
    return (
        <div className="w-full rounded-lg border-b-4 border-stone-200 bg-white p-4 shadow-sm">
            {/* Section header */}
            <div className="mb-4 flex items-center justify-start gap-2">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-500">
                    {icon}
                </div>
                <div>
                    <h2 className="text-sm font-bold text-stone-800">{title}</h2>
                    <p className="text-xs text-stone-500">{subtitle}</p>
                </div>
            </div>

            {children}
        </div>
    );
};

/* ------------------------------------------------------------------
   CoverPlaceholder
   A friendly box shown when a book has no cover image yet.
------------------------------------------------------------------ */
const CoverPlaceholder = ({ className = "h-48 w-full" }) => {
    return (
        <div className={`${className} border border-stone-300 rounded-xl`}>
        <EmptyState description="No Cover Available"/>
        </div>
        
    );
};

/* ------------------------------------------------------------------
   RecentBookRow
   One compact line in the "Recently Added Books" list:
   a small cover, the title, category and the date it was added.
------------------------------------------------------------------ */
const RecentBookRow = ({ book }) => {
    const addedDate = book.createdAt
        ? new Date(book.createdAt).toLocaleDateString()
        : "—";

    return (
        <div className="flex items-center gap-3 border-b border-stone-100 py-2 last:border-b-0">
            {/* Small cover (or a tiny placeholder icon) */}
            {book.cover ? (
                <img
                    src={book.cover}
                    alt={book.title}
                    className="h-12 w-9 shrink-0 rounded object-cover shadow-sm"
                />
            ) : (
                <div className="flex h-12 w-9 shrink-0 items-center justify-center rounded bg-stone-100">
                    <ImageOff size={14} className="text-stone-400" />
                </div>
            )}

            {/* Title + category */}
            <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-stone-800">
                    {book.title || "Untitled"}
                </p>
                <p className="truncate text-[10px] text-stone-500">
                    {book.category || "Uncategorized"}
                </p>
            </div>

            {/* Date added */}
            <p className="shrink-0 text-[10px] text-stone-400">{addedDate}</p>
        </div>
    );
};

/* ------------------------------------------------------------------
   VisitorRow
   One compact line in the visitors list:
   the visitor's name, purpose and the time they entered.
------------------------------------------------------------------ */
const VisitorRow = ({ visitor }) => {
    const timeIn = visitor.createdAt
        ? new Date(visitor.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
          })
        : "—";

    return (
        <div className="flex items-center justify-between gap-3 border-b border-stone-100 py-2 last:border-b-0">
            {/* Name + purpose */}
            <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-stone-800">
                    {visitor.name || "Unknown"}
                </p>
                <p className="truncate text-[10px] text-stone-500">
                    {visitor.purpose || "No purpose listed"}
                </p>
            </div>

            {/* Time in */}
            <div className="flex shrink-0 items-center gap-1 text-[10px] text-stone-400">
                <Clock size={11} />
                {timeIn}
            </div>
        </div>
    );
};

/* ------------------------------------------------------------------
   LoadingRows / EmptyRow
   Tiny helpers used while a list is still loading, or when it is empty.
------------------------------------------------------------------ */
const LoadingRows = ({ rows = 3 }) => {
    return (
        <div className="flex flex-col gap-2 py-1">
            {Array.from({ length: rows }).map((_, index) => (
                <div key={index} className="h-9 w-full animate-pulse rounded bg-stone-100" />
            ))}
        </div>
    );
};

const EmptyRow = ({ message }) => {
    return (
        <div className="flex items-center justify-center rounded-lg border border-dashed border-stone-300 bg-stone-50 py-6 text-xs text-stone-400">
            {message}
        </div>
    );
};

const Admin_Page = () => {
    const user = useAuthStore((state) => state.user);
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [users, setUsers] = useState([]);
    const [books, setBooks] = useState([]);
    const [borrows, setBorrows] = useState([]);
    const [logbook, setLogbook] = useState([]);

    // --- Summary numbers shown in the cards ---
    const totalUsers = users.length;
    const totalBooks = books.length;
    const pendingRequests = borrows.filter((borrow) => borrow.status === "Pending").length;
    const totalVisitors = logbook.length;

    // --- Extra overview numbers ---
    const visitorsToday = logbook.filter((entry) => isToday(entry.createdAt)).length;
    const peopleInside = logbook.filter((entry) => entry.leaveTime === null).length;

    // The API returns books newest-first, so the first item is the newest one.
    const newestBook = books[0];

    // The next few newest books (skip the first one, it is the spotlight).
    const recentBooks = books.slice(1, 5);

    // The last 5 logbook entries, newest first.
    const recentVisitors = logbook.slice(-5).reverse();

    // Today's date, for example: "Saturday, October 10, 2026"
    const today = new Date().toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    // The four cards at the top of the page
    const cards = [
        {
            title: "No. of Users",
            caption: "Registered users",
            icon: <Users size={15} />,
            value: totalUsers,
        },
        {
            title: "No. of Books",
            caption: "Published books",
            icon: <LibraryBig size={15} />,
            value: totalBooks,
        },
        {
            title: "Pending Requests",
            caption: "Awaiting approval",
            icon: <SquareGanttChart size={15} />,
            value: pendingRequests,
        },
        {
            title: "No. of Visitors",
            caption: `${visitorsToday} today · ${totalVisitors} total`,
            icon: <DoorOpen size={15} />,
            value: totalVisitors,
        },
    ];

    // Shortcuts to other admin pages (view-only helpers).
    const quickLinks = [
        {
            label: "Borrow Requests",
            description: "Review pending requests",
            icon: <HandHelping size={16} />,
            path: "/admin/borrow-book",
        },
        {
            label: "Catalog",
            description: "Browse all books",
            icon: <LibraryBig size={16} />,
            path: "/admin/catalog",
        },
        {
            label: "Logbook",
            description: "View visitor records",
            icon: <ScrollText size={16} />,
            path: "/admin/log-book",
        },
    ];

    // Small helper so every fetch reports errors in the same way.
    const handleFetchError = (error, fallbackMessage) => {
        const message = error?.response?.data?.message || fallbackMessage;
        setErrorMessage(message);
        toast.error(message);
    };

    // --- Fetching data ---
    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-users`);
            setUsers(res.data.users);
        } catch (error) {
            handleFetchError(error, "Failed to load users.");
        }
    };

    const fetchLogBook = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-all-logbook`);
            setLogbook(res.data.logBookList);
        } catch (error) {
            handleFetchError(error, "Failed to load the logbook.");
        }
    };

    const fetchBooks = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-books`);
            setBooks(res.data.books);
        } catch (error) {
            handleFetchError(error, "Failed to load books.");
        }
    };

    const fetchAllBorrow = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/fetch-all-borrow`);
            setBorrows(res.data.borrows);
        } catch (error) {
            handleFetchError(error, "Failed to load borrow requests.");
        }
    };

    // Loads everything. Used once when the page opens and again by Refresh.
    const loadData = async () => {
        setIsLoading(true);
        setErrorMessage("");

        // Each fetch handles its own errors, so we can simply wait for all of them.
        await Promise.all([fetchBooks(), fetchAllBorrow(), fetchUsers(), fetchLogBook()]);

        setIsLoading(false);
    };

    // Load everything once when the page opens.
    useEffect(() => {
        loadData();
        // We only want this on the first render; the Refresh button calls
        // loadData manually when the user wants fresh numbers.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Admin_SideBar />

            <section className="flex min-h-screen w-full flex-col items-start justify-start bg-white pb-10 md:pl-20 lg:pl-60">
                <Admin_Header
                    mainText={"Overview Library"}
                    subText={"Oversee the details of the library"}
                />

                <div className="flex w-full flex-col gap-4 px-4 mt-4">
                    {/* Greeting + date + refresh */}
                    <div className="flex w-full flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-stone-800">
                                Hello, {user?.firstname || "Admin"}
                            </h2>
                            <p className="mt-1 text-xs text-stone-400">
                                Welcome back! Here's today's overview of Naic Municipal Library.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <p className="flex items-center gap-1.5 text-xs text-stone-500">
                                <CalendarDays size={14} className="text-stone-400" />
                                {today}
                            </p>

                            <button
                                type="button"
                                onClick={loadData}
                                disabled={isLoading}
                                className="flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3 py-2 text-xs font-medium text-stone-700 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <RefreshCw
                                    size={14}
                                    className={isLoading ? "animate-spin" : ""}
                                />
                                Refresh
                            </button>
                        </div>
                    </div>

                    {/* Error banner (only shows if something failed to load) */}
                    {errorMessage && (
                        <div className="flex w-full items-center gap-2 rounded-lg border border-stone-300 bg-stone-100 px-4 py-3 text-xs text-stone-600">
                            <CircleAlert size={15} className="shrink-0 text-stone-500" />
                            <span>Some information could not be loaded: {errorMessage}</span>
                        </div>
                    )}

                    {/* Summary cards */}
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-4" aria-busy={isLoading}>
                        {cards.map((card) => (
                            <StatCard
                                key={card.title}
                                title={card.title}
                                caption={card.caption}
                                icon={card.icon}
                                value={card.value}
                                isLoading={isLoading}
                            />
                        ))}
                    </div>

                    {/* Two-column area (stacks on smaller screens) */}
                    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3">
                        {/* LEFT COLUMN: lists + quick links */}
                        <div className="flex flex-col gap-4 lg:col-span-2">
                            {/* Recently added books */}
                            <SectionCard
                                title="Recently Added Books"
                                subtitle="Newest additions to the library"
                                icon={<LibraryBig size={15} />}
                            >
                                {isLoading ? (
                                    <LoadingRows rows={4} />
                                ) : recentBooks.length > 0 ? (
                                    <div className="flex flex-col">
                                        {recentBooks.map((book) => (
                                            <RecentBookRow key={book._id} book={book} />
                                        ))}
                                    </div>
                                ) : (
                                    <EmptyRow message="No books added yet." />
                                )}
                            </SectionCard>

                            {/* Quick links */}
                            <div className="w-full">
                                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-stone-400">
                                    Quick Links
                                </p>

                                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                                    {quickLinks.map((link) => (
                                        <button
                                            key={link.label}
                                            type="button"
                                            onClick={() => navigate(link.path)}
                                            className="group flex items-center justify-between gap-3 rounded-lg border border-stone-200 bg-white p-4 text-left shadow-sm transition hover:bg-stone-100"
                                        >
                                            <span className="flex items-center gap-3">
                                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-500">
                                                    {link.icon}
                                                </span>
                                                <span>
                                                    <span className="block text-xs font-semibold text-stone-800">
                                                        {link.label}
                                                    </span>
                                                    <span className="block text-[10px] text-stone-500">
                                                        {link.description}
                                                    </span>
                                                </span>
                                            </span>

                                            <ArrowRight
                                                size={14}
                                                className="shrink-0 text-stone-400 transition group-hover:translate-x-0.5"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: newest book + visitors */}
                        <div className="flex flex-col gap-4 lg:col-span-1">
                            {/* Newest book spotlight */}
                            <SectionCard
                                title="Newest Book"
                                subtitle="Latest added to the library"
                                icon={<Book size={15} />}
                            >
                                {isLoading ? (
                                    <LoadingRows rows={4} />
                                ) : newestBook ? (
                                    <div className="flex flex-col gap-3">
                                        {/* Cover */}
                                        {newestBook.cover ? (
                                            <img
                                                src={newestBook.cover}
                                                alt={newestBook.title}
                                                className="h-48 w-full rounded-md object-cover shadow-sm"
                                            />
                                        ) : (
                                            <CoverPlaceholder />
                                        )}

                                        {/* Title + author */}
                                        <div>
                                            <h3 className="text-sm font-bold text-stone-800">
                                                {newestBook.title}
                                            </h3>
                                            <p className="text-xs text-stone-500">
                                                {newestBook.author || "Unknown author"}
                                            </p>
                                        </div>

                                        {/* Description */}
                                        <p className="line-clamp-3 text-xs text-stone-500">
                                            {newestBook.description || "No description available."}
                                        </p>

                                        {/* Details */}
                                        <div className="flex flex-col gap-1 rounded-lg bg-stone-100 p-3 text-xs">
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="font-semibold text-stone-800">
                                                    Category
                                                </span>
                                                <span className="text-stone-500">
                                                    {newestBook.category || "—"}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between gap-2">
                                                <span className="font-semibold text-stone-800">
                                                    Language
                                                </span>
                                                <span className="text-stone-500">
                                                    {newestBook.language || "—"}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between gap-2">
                                                <span className="font-semibold text-stone-800">
                                                    Added
                                                </span>
                                                <span className="text-stone-500">
                                                    {newestBook.createdAt
                                                        ? new Date(
                                                              newestBook.createdAt
                                                          ).toLocaleDateString()
                                                        : "—"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <EmptyRow message="No books uploaded yet." />
                                )}
                            </SectionCard>

                            {/* Visitors */}
                            <SectionCard
                                title="Visitors"
                                subtitle="Library logbook overview"
                                icon={<DoorOpen size={15} />}
                            >
                                {/* Two small numbers */}
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="rounded-lg bg-stone-100 p-3">
                                        <p className="text-[10px] text-stone-500">Today</p>
                                        <p className="text-xl font-bold text-stone-800">
                                            {visitorsToday}
                                        </p>
                                    </div>

                                    <div className="rounded-lg bg-stone-100 p-3">
                                        <p className="text-[10px] text-stone-500">Inside now</p>
                                        <p className="text-xl font-bold text-stone-800">
                                            {peopleInside}
                                        </p>
                                    </div>
                                </div>

                                {/* Recent entries */}
                                <p className="mb-1 mt-4 text-[10px] font-semibold uppercase tracking-wide text-stone-400">
                                    Recent entries
                                </p>

                                {isLoading ? (
                                    <LoadingRows rows={4} />
                                ) : recentVisitors.length > 0 ? (
                                    <div className="flex flex-col">
                                        {recentVisitors.map((visitor) => (
                                            <VisitorRow
                                                key={visitor._id}
                                                visitor={visitor}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <EmptyRow message="No visitors logged yet." />
                                )}
                            </SectionCard>
                        </div>
                    </div>

                    {/* Small footer hint */}
                    <p className="text-center text-[10px] text-stone-400">
                        Data updates every time the page loads or when you press Refresh.
                    </p>
                </div>
            </section>
        </>
    );
};

export default Admin_Page;
