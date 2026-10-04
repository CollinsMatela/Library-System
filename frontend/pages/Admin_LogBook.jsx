import { useEffect, useState } from "react";
import { Check, Eye, LoaderCircle, LogIn, LogOut, MapPin, Phone, Plus, Search, User, Users } from "lucide-react";
import Admin_SideBar from "../components/Admin_Sidebar";
import Admin_Header from "../components/Admin_Header";
import LogBookModal from "../modals/LogBookModal";
import LogbookViewModal from "../modals/LobookViewModal";
import Confirmation from "../popup/Confirmation_Popup";
import axios from "axios";
import { toast } from "react-toastify";

const Admin_LogBook = () => {
    const [logBookList, setLogBookList] = useState([]);
    const [search, setSearch] = useState("");
    // "" shows everyone, "inside" means still here, "left" means already gone.
    const [statusFilter, setStatusFilter] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [showLogBook, setShowLogBook] = useState(false);
    const [showView, setShowView] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const [selectedVisitor, setSelectedVisitor] = useState(null);

    const [logBook, setLogBook] = useState({
        name: "",
        address: "",
        contact: "",
        purpose: "",
        leaveTime: null,
    });

    /* Helpers */

    // Turn a date into something readable, e.g. "Mar 5, 2024, 9:14 AM".
    const formatDateTime = (date) => {
        if (!date) return "—";

        return new Date(date).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
        });
    };

    /* A small shared look, so the pill styling is written once. */
    const pillClass = (isActive) =>
        `text-xs px-2.5 py-1 rounded-full border cursor-pointer transition-colors flex items-center gap-1.5 ${
            isActive
                ? "bg-stone-800 text-white border-stone-800"
                : "bg-white text-stone-600 border-stone-300 hover:bg-stone-100"
        }`;

    /* Loading the logbook */

    const fetchLogBook = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-all-logbook`);
            setLogBookList(res.data.logBookList || []);
        } catch (error) {
            setErrorMessage(error?.response?.data?.message || "Could not load the visitor log.");
            toast.error(error?.response?.data?.message || "Failed to load the logbook.");
        } finally {
            // Only ever goes true -> false, so saving never flashes it again.
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                await fetchLogBook();
            } catch {
                toast.error("Failed to load the logbook.");
            }
        };
        loadData();
    }, []);

    /* Counts, searching and filtering */

    // Newest visitor first.
    const orderedLogBookList = [...logBookList].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    // How many visitors have not signed out yet.
    const insideCount = logBookList.filter((log) => !log.leaveTime).length;
    const leftCount = logBookList.length - insideCount;

    const searchText = search.trim().toLowerCase();

    // Keep the visitors that match the search box and the chosen filter.
    const visibleLogBook = orderedLogBookList.filter((log) => {
        const name = (log.name || "").toLowerCase();
        const address = (log.address || "").toLowerCase();
        const contact = (log.contact || "").toLowerCase();
        const purpose = (log.purpose || "").toLowerCase();

        const matchesSearch =
            name.includes(searchText) ||
            address.includes(searchText) ||
            contact.includes(searchText) ||
            purpose.includes(searchText);

        // "" shows everyone. "inside" means still here, "left" means gone.
        const matchesStatus =
            statusFilter === "" ||
            (statusFilter === "inside" && !log.leaveTime) ||
            (statusFilter === "left" && Boolean(log.leaveTime));

        return matchesSearch && matchesStatus;
    });

    /* Registering a visitor */

    const resetState = () => {
        setLogBook((prev) => ({
            ...prev,
            name: "",
            address: "",
            contact: "",
            purpose: "",
        }));
    };

    const handleSubmit = async () => {
        // Stop a double click from creating the visitor twice.
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/register-visitor`, logBook);
            toast.success(res.data.message);
            resetState();
            setShowLogBook(false);
            fetchLogBook();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Could not register the visitor.");
            setErrorMessage(error?.response?.data?.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    // All four of these are required by the database, so check them all here.
    const confirmation = () => {
        if (!logBook.name || !logBook.address || !logBook.contact || !logBook.purpose) {
            toast.warning("Please fill in the name, address, contact number and purpose.");
            return;
        }

        handleSubmit();
    };

    const handleAddVisitor = () => {
        setErrorMessage("");
        setShowLogBook(true);
    };

    /* Viewing and signing out */

    const handleView = (visitor) => {
        setSelectedVisitor(visitor);
        setShowView(true);
    };

    const LeaveConfirmation = (visitor) => {
        setErrorMessage("");
        setSelectedVisitor(visitor);
        setShowConfirmation(true);
    };

    const updateLeaveTime = async (id) => {
        try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/update-leave`, { id });
            toast.success(res.data.message);
            setShowConfirmation(false);
            setSelectedVisitor(null);
            fetchLogBook();
        } catch (error) {
            // The popup stays open so the admin can read the reason.
            toast.error(error?.response?.data?.message || "Could not update the visitor.");
            setErrorMessage(error?.response?.data?.message);
        }
    };

    /* What the list area shows: the spinner, the empty message, or the cards. */

    const visitorList = isLoading ? (
        /* Still loading */
        <div className="w-full py-12 flex items-center justify-center gap-2 text-stone-400">
            <LoaderCircle size={20} className="animate-spin" />
            <span className="text-xs">Loading visitors...</span>
        </div>
    ) : visibleLogBook.length === 0 ? (
        /* Nothing to show */
        <div className="w-full py-12 px-4 bg-stone-50 rounded-lg border border-dashed border-stone-300 flex flex-col items-center justify-center">
            <Users size={24} className="text-stone-300" />
            <p className="text-sm font-medium text-stone-700 mt-2">No visitors found</p>
            <p className="text-xs text-stone-500 mt-1 text-center">
                {search || statusFilter
                    ? "Try a different search or filter."
                    : "Registered visitors will appear here."}
            </p>
        </div>
    ) : (
        /* The cards */
        <div className="w-full space-y-2">
            {visibleLogBook.map((log) => (
                <div
                    key={log._id}
                    className="w-full flex flex-col sm:flex-row sm:items-center gap-3 bg-white border border-stone-200 rounded-lg p-2 hover:border-stone-300 hover:shadow-sm transition"
                >
                    {/* Icon, name and status */}
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="h-8 w-8 rounded-full bg-stone-200 text-stone-500 shrink-0 flex items-center justify-center">
                            <User size={15} />
                        </div>

                        <div className="min-w-0">
                            <p className="text-xs font-medium text-stone-800 truncate">
                                {log.name}
                            </p>

                            {/* Green means still in the library, grey means already left */}
                            <span
                                className={`inline-flex mt-1 px-2 py-0.5 rounded-full border text-[10px] font-medium ${
                                    log.leaveTime
                                        ? "bg-stone-100 text-stone-500 border-stone-200"
                                        : "bg-green-50 text-green-700 border-green-200"
                                }`}
                            >
                                {log.leaveTime ? "Left" : "Inside"}
                            </span>
                        </div>
                    </div>

                    {/* Contact, address and the times */}
                    <div className="grid grid-cols-2 sm:w-80 gap-x-5 gap-y-1 text-[10px] text-stone-500">
                        <span className="flex items-center gap-1.5 min-w-0">
                            <Phone size={13} className="shrink-0" />
                            <span className="truncate">{log.contact || "—"}</span>
                        </span>

                        <span className="flex items-center gap-1.5 min-w-0">
                            <MapPin size={13} className="shrink-0" />
                            <span className="truncate">{log.address || "—"}</span>
                        </span>

                        <span className="flex items-center gap-1.5 min-w-0">
                            <LogIn size={13} className="shrink-0" />
                            <span className="truncate">In {formatDateTime(log.createdAt)}</span>
                        </span>

                        <span className="flex items-center gap-1.5 min-w-0">
                            <LogOut size={13} className="shrink-0" />
                            <span className="truncate">
                                Out {log.leaveTime ? formatDateTime(log.leaveTime) : "Still inside"}
                            </span>
                        </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 sm:justify-end">
                        <button
                            type="button"
                            aria-label={`View ${log.name}`}
                            onClick={() => handleView(log)}
                            className="text-[10px] text-stone-600 bg-white border border-stone-300 px-3 py-2 rounded-lg flex items-center gap-1 cursor-pointer hover:bg-stone-100 transition-colors"
                        >
                            <Eye size={15} />
                            View
                        </button>

                        {/* Only a visitor who is still inside can be signed out */}
                        <button
                            type="button"
                            disabled={Boolean(log.leaveTime)}
                            aria-label={`Sign out ${log.name}`}
                            onClick={() => LeaveConfirmation(log)}
                            className={`text-[10px] px-3 py-2 rounded-lg flex items-center gap-1 transition-colors ${
                                log.leaveTime
                                    ? "bg-stone-100 text-stone-400 border border-stone-200 cursor-not-allowed"
                                    : "bg-stone-800 text-white hover:bg-stone-900 cursor-pointer"
                            }`}
                        >
                            <Check size={15} />
                            Time Out
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <>
            {showLogBook && (
                <LogBookModal
                    logBook={logBook}
                    setLogBook={setLogBook}
                    confirmation={confirmation}
                    isSubmitting={isSubmitting}
                    onClose={() => setShowLogBook(false)}
                />
            )}

            {showView && (
                <LogbookViewModal
                    log={selectedVisitor}
                    onClose={() => setShowView(false)}
                />
            )}

            {showConfirmation && (
                <Confirmation
                    errorMessage={errorMessage}
                    message={`Mark ${selectedVisitor?.name || "this visitor"} as having left the library?`}
                    confirmLabel="Time Out"
                    onConfirm={() => updateLeaveTime(selectedVisitor._id)}
                    onCancel={() => {
                        setShowConfirmation(false);
                        setErrorMessage("");
                    }}
                />
            )}

            <Admin_SideBar />

            <section className="bg-white min-h-screen w-full justify-start items-start flex flex-col md:pl-20 lg:pl-60">

                <Admin_Header
                    mainText={"Logbook Management"}
                    subText={"Manage the visitors entered the library"}
                />

                <div className="w-full justify-start items-start flex flex-col px-4 lg:px-10 pb-10">

                    {/* Page heading, search and the add button */}
                    <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2">
                            <div className="bg-stone-800 p-2 rounded-lg text-white flex items-center justify-center">
                                <Users size={20} />
                            </div>
                            <div>
                                <h1 className="text-sm font-bold text-stone-800">Record Visit</h1>
                                <p className="text-xs text-stone-400">
                                    List of people who entered the library.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            {/* Search */}
                            <div className="relative w-full lg:w-auto">
                                <Search
                                    size={14}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
                                />
                                <input
                                    type="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search visitor..."
                                    aria-label="Search visitors"
                                    className="w-full lg:w-56 border border-stone-300 bg-white rounded-lg pl-9 pr-3 py-2 text-xs text-stone-600 outline-none focus:ring-2 focus:ring-stone-300"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={handleAddVisitor}
                                className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-800 text-white text-[10px] font-medium hover:bg-stone-900 transition-colors cursor-pointer"
                            >
                                <Plus size={15} />
                                Add Visitor
                            </button>
                        </div>
                    </div>

                    {/* Filter counts. Clicking one filters the list. */}
                    <div className="w-full bg-white border border-stone-200 rounded-lg p-3 mb-3">
                        <div className="w-full flex flex-wrap items-center gap-2">
                            <p className="text-xs font-medium text-stone-500 mr-1">Filter by status</p>

                            <button
                                type="button"
                                onClick={() => setStatusFilter("")}
                                className={pillClass(statusFilter === "")}
                            >
                                All
                                <span className={statusFilter === "" ? "text-stone-300" : "text-stone-400"}>
                                    {logBookList.length}
                                </span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setStatusFilter("inside")}
                                className={pillClass(statusFilter === "inside")}
                            >
                                Inside
                                <span
                                    className={
                                        statusFilter === "inside" ? "text-stone-300" : "text-stone-400"
                                    }
                                >
                                    {insideCount}
                                </span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setStatusFilter("left")}
                                className={pillClass(statusFilter === "left")}
                            >
                                Left
                                <span
                                    className={
                                        statusFilter === "left" ? "text-stone-300" : "text-stone-400"
                                    }
                                >
                                    {leftCount}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Anything that went wrong */}
                    {errorMessage && !isLoading && (
                        <div className="w-full mb-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                            <p className="text-xs text-red-600">{errorMessage}</p>
                        </div>
                    )}

                    {/* The visitor list */}
                    {visitorList}
                </div>
            </section>
        </>
    );
};

export default Admin_LogBook;