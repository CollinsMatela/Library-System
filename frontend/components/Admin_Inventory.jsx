import { useEffect, useState } from "react";
import { LoaderCircle, ScrollText, Search, Trash } from "lucide-react";
import AdminSidebar from "./Admin_Sidebar";
import Admin_Header from "./Admin_Header";
import Confirmation_Popup from "../popup/Confirmation_Popup";
import axios from "axios";
import { toast } from "react-toastify";

const Admin_Inventory = () => {
    const [books, setBooks] = useState([]);
    const [members, setMembers] = useState([]);

    const [search, setSearch] = useState("");
    const [filterDate, setFilterDate] = useState(""); // "" means no date filter
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

    /* Searching and filtering by date */

    const searchText = search.trim().toLowerCase();

    // Keep the books that match the search box AND the chosen date.
    // The search box looks at the title, the author and who donated it.
    const visibleBooks = books.filter((book) => {
        const title = (book.title || "").toLowerCase();
        const author = (book.author || "").toLowerCase();
        const from = (book.donatedFrom || "").toLowerCase();

        const matchesSearch =
            title.includes(searchText) || author.includes(searchText) || from.includes(searchText);

        // An empty filter date means "any date", so skip the check.
        const matchesDate = filterDate === "" || toDateKey(book.createdAt) === filterDate;

        return matchesSearch && matchesDate;
    });

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
        <div className="w-full py-12 px-4 bg-stone-50 rounded-lg border border-dashed border-stone-300 flex flex-col items-center justify-center">
            <ScrollText size={24} className="text-stone-300" />
            <p className="text-sm font-medium text-stone-700 mt-2">No books found</p>
            <p className="text-xs text-stone-500 mt-1 text-center">
                {search || filterDate
                    ? "Try a different search or date."
                    : "Uploaded books will appear here."}
            </p>
        </div>
    ) : (
        /* The cards */
        <div className="w-full space-y-2">
            {visibleBooks.map((book) => (
                <div
                    key={book._id}
                    className="w-full bg-white border border-stone-200 rounded-lg p-4 hover:border-stone-300 hover:shadow-sm transition"
                >
                    {/* Title, author, category and the action buttons */}
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-stone-800 break-words">
                                {book.title}
                            </p>

                            <p className="text-xs text-stone-500 mt-0.5 break-words">
                                {book.author || "Unknown author"}
                            </p>

                            <span className="inline-flex mt-2 px-2 py-0.5 rounded-full border border-stone-200 bg-stone-100 text-stone-600 text-[10px] font-medium">
                                {book.category || "Uncategorised"}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                            <button
                                type="button"
                                aria-label={`Delete ${book.title}`}
                                title="Delete book"
                                onClick={() => handleDelete(book)}
                                className="p-2 bg-red-500 hover:bg-red-600 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
                            >
                                <Trash size={15} className="text-white" />
                            </button>
                        </div>
                    </div>

                    {/* One line per detail, so nothing gets squashed */}
                    <div className="mt-3 pt-3 border-t border-stone-200 space-y-1.5 text-xs text-stone-600">
                        <p>
                            <span className="text-stone-400">Donated: </span>
                            {formatDate(book.receivedDate)}
                        </p>
                        <p>
                            <span className="text-stone-400">Donated From: </span>
                            {book.donatedFrom || "—"}
                        </p>
                        <p>
                            <span className="text-stone-400">Added By: </span>
                            {responsiblePerson(book.addedById)}
                        </p>
                        <p>
                            <span className="text-stone-400">Created: </span>
                            {formatDate(book.createdAt)}
                        </p>
                    </div>
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
                    mainText={"Inventory Management"}
                    subText={"Oversee the record of books"}
                />

                <div className="w-full justify-start items-start flex flex-col px-4 lg:px-10 pb-10">

                    {/* Page heading and search */}
                    <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2">
                            <div className="flex rounded-lg bg-stone-800 p-2 text-white justify-center items-center">
                                <ScrollText size={20} />
                            </div>
                            <div>
                                <h1 className="text-sm font-bold text-stone-800">Inventory Record</h1>
                                <p className="text-stone-400 text-xs">
                                    Manage book inventory records.
                                </p>
                            </div>
                        </div>

                        {/* Search and date filter */}
                        <div className="w-full lg:w-auto flex items-center gap-2">
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
                            </div>

                            <input
                                type="date"
                                value={filterDate}
                                onChange={(e) => setFilterDate(e.target.value)}
                                aria-label="Filter by created date"
                                className="w-full lg:w-44 shrink-0 border border-stone-300 bg-white rounded-lg px-3 py-2 text-xs text-stone-600 outline-none focus:ring-2 focus:ring-stone-300"
                            />

                            {/* Only show Clear once a date is actually picked */}
                            {filterDate && (
                                <button
                                    type="button"
                                    onClick={() => setFilterDate("")}
                                    className="text-xs text-stone-500 hover:text-stone-800 px-2 py-2 cursor-pointer shrink-0"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>

                    {/* The book list */}
                    {bookList}

                </div>
            </section>
        </>
    );
};

export default Admin_Inventory;