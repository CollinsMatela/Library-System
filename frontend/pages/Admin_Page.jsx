import { useState, useEffect } from "react";
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
    LoaderCircle,
} from "lucide-react";

import useAuthStore from "../store/useAuthStore";
import Admin_SideBar from "../components/Admin_Sidebar";
import Admin_Header from "../components/Admin_Header";

/* ------------------------------------------------------------------
   StatCard
   One small "summary" box at the top of the page.
   It shows a title, an icon, a number and a short caption.
   While the page is loading we show a grey placeholder instead.
------------------------------------------------------------------ */
const StatCard = ({ title, caption, icon, value, isLoading }) => {
    return (
        <div className="h-full rounded-lg border-b-4 border-stone-300 bg-white p-4 shadow-sm transition-all duration-300 hover:bg-stone-100 hover:shadow-md">
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
   CoverPlaceholder
   A friendly box shown when a book has no cover image yet.
------------------------------------------------------------------ */
const CoverPlaceholder = () => {
    return (
        <div className="flex h-56 w-full flex-col items-center justify-center gap-3 rounded-md border border-stone-300 bg-stone-100 shadow-sm md:h-72 md:w-48">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-stone-200">
                <ImageOff size={24} className="text-stone-400" strokeWidth={1.5} />
            </div>

            <div className="px-4 text-center">
                <p className="text-sm font-medium text-stone-600">No cover available</p>
                <p className="mt-1 text-xs text-stone-400">Cover image not provided</p>
            </div>
        </div>
    );
};

const Admin_Page = () => {
    const user = useAuthStore((state) => state.user);
    

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

    // The API returns books newest-first, so the first item is the newest one.
    const newestBook = books[0];

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
            caption: "Visitors entered",
            icon: <DoorOpen size={15} />,
            value: totalVisitors,
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

    // Load everything once when the page opens.
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            setErrorMessage("");

            // Each fetch handles its own errors, so we can simply wait for all of them.
            await Promise.all([fetchBooks(), fetchAllBorrow(), fetchUsers(), fetchLogBook()]);

            setIsLoading(false);
        };

        loadData();
    }, []);

    return (
        <>
            <Admin_SideBar />

            <section className="flex min-h-screen w-full flex-col items-start justify-start bg-stone-50 pb-10 md:pl-20 lg:pl-60">
                <Admin_Header
                    mainText={"Overview Library"}
                    subText={"Oversee the details of the library"}
                />

                <div className="flex w-full flex-col gap-4 px-6 md:px-10">
                    {/* Greeting */}
                    <div className="w-full justify-between items-start flex flex-col sm:flex-row">
                      <div>
                        <h2 className="text-3xl font-bold text-stone-800">
                            Hello, {user?.firstname || "Unknown"}
                        </h2>
                        <p className="mt-1 text-xs text-stone-400">
                            Welcome back! Here's today's overview of Naic Municipal Library.
                        </p>
                      </div>
                        
                        <p className="mt-2 flex items-center gap-1.5 text-xs text-stone-500">
                            <CalendarDays size={14} className="text-stone-400" />
                            {today}
                        </p>
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

                    {/* Newest book */}
                    <div className="w-full rounded-lg border-b-4 border-stone-200 bg-white p-4 shadow-sm">
                        {/* Section header */}
                        <div className="mb-5 flex items-center justify-start gap-2">
                            <div className="hidden rounded-xl border border-stone-200 bg-white p-2 md:block">
                                <Book size={15} className="text-stone-500" />
                            </div>
                            <div>
                                <h2 className="text-sm font-bold text-stone-800">Newest Book</h2>
                                <p className="text-xs text-stone-500">Latest added book to the library</p>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="flex w-full items-center justify-center py-16">
                                <LoaderCircle size={22} className="animate-spin text-stone-800" />
                            </div>
                        ) : newestBook ? (
                            <div className="flex flex-col gap-6 md:flex-row">
                                {/* Cover */}
                                {newestBook.cover ? (
                                    <img
                                        src={newestBook.cover}
                                        alt={newestBook.title}
                                        className="h-56 w-full rounded-md object-cover shadow-sm md:h-72 md:w-48"
                                    />
                                ) : (
                                    <CoverPlaceholder />
                                )}

                                {/* Details */}
                                <div className="flex-1 space-y-3">
                                    <div>
                                        <h3 className="text-sm font-bold text-stone-800">
                                            {newestBook.title}
                                        </h3>
                                        <p className="text-xs text-stone-500">
                                            {newestBook.author || "Unknown author"}
                                        </p>
                                    </div>

                                    <div className="flex flex-col items-start justify-start rounded-lg bg-stone-100 p-4">
                                        <p className="text-xs font-semibold text-stone-800">Description</p>
                                        <p className="line-clamp-3 text-xs text-stone-500">
                                            {newestBook.description || "No description available."}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="flex flex-col items-start justify-start rounded-lg bg-stone-100 p-4">
                                            <p className="text-xs font-semibold text-stone-800">Category</p>
                                            <p className="text-xs text-stone-500">
                                                {newestBook.category || "—"}
                                            </p>
                                        </div>

                                        <div className="flex flex-col items-start justify-start rounded-lg bg-stone-100 p-4">
                                            <p className="text-xs font-semibold text-stone-800">Language</p>
                                            <p className="text-xs text-stone-500">
                                                {newestBook.language || "—"}
                                            </p>
                                        </div>

                                        <div className="flex flex-col items-start justify-start rounded-lg bg-stone-100 p-4">
                                            <p className="text-xs font-semibold text-stone-800">Added</p>
                                            <p className="text-xs text-stone-500">
                                                {newestBook.createdAt
                                                    ? new Date(newestBook.createdAt).toLocaleDateString()
                                                    : "—"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex h-72 items-center justify-center text-stone-500">
                                No books uploaded yet.
                            </div>
                        )}
                    </div>

                    {/* Small footer hint */}
                    <p className="text-center text-[10px] text-stone-400">
                        Data updates every time the page loads.
                    </p>
                </div>
            </section>
        </>
    );
};

export default Admin_Page;
