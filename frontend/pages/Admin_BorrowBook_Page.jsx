import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { HandHelping, IdCard, IdCardLanyard, Info, LoaderCircle, Search } from "lucide-react";

import Admin_Sidebar from "../components/Admin_Sidebar";
import Admin_Header from "../components/Admin_Header";
import Confirmation_Popup from "../popup/Confirmation_Popup";
import DepositModal from "../modals/DepositModal";
import DepositListModal from "../modals/DepositsListModal";
import PendingTable from "./Borrowing_Components/PendingTable";
import ApprovedTable from "./Borrowing_Components/ApprovedTable";
import BorrowedTable from "./Borrowing_Components/BorrowedTable";
import HistoryTable from "./Borrowing_Components/HistoryTable";
import useAuthStore from "../store/useAuthStore";

/* Which tab is open, and what status each tab shows.
   Using one state instead of 4 true/false flags keeps things simple. */
const TABS = [
    { key: "pending", label: "Pending", status: "Pending" },
    { key: "approved", label: "Approved", status: "Approved" },
    { key: "borrowed", label: "Borrowed", status: "Borrowed" },
    { key: "history", label: "History", status: "Returned" },
];

const Admin_BorrowBook_Page = () => {
    const user = useAuthStore((state) => state.user);

    /* The request currently picked for a confirmation popup. */
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [pendingConfirmation, setPendingConfirmation] = useState(false);
    const [approveConfirmation, setApproveConfirmation] = useState(false);
    const [submitConfirmation, setSubmitConfirmation] = useState(false);
    const [returnConfirmation, setReturnConfirmation] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    /* Data loaded from the server. */
    const [borrowList, setBorrowList] = useState([]);
    const [users, setUsers] = useState([]);
    const [deposits, setDeposits] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    /* What the page is showing right now. */
    const [activeTab, setActiveTab] = useState("pending");
    const [searchText, setSearchText] = useState("");

    /* Deposit ID form. */
    const [isDeposit, setIsDeposit] = useState(false);
    const [isDepositList, setIsDepositList] = useState(false);
    const [idForm, setIdForm] = useState({
        idType: "",
        idNumber: "",
        idName: "",
        receivedBy: user?._id || "",
    });
    const [depositLoading, setDepositLoading] = useState(false);
    const [returnDepositLoading, setReturnDepositLoading] = useState(null);

    /* Filled in by the Approved table: when each book is due back, and how many. */
    const [returnDate, setReturnDate] = useState({});
    const [quantity, setQuantity] = useState({});

    /* --------------------------------------------------
       Loading data
    -------------------------------------------------- */

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-users`);
            setUsers(res.data.users);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchAllBorrow = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/fetch-all-borrow`);
            setBorrowList(res.data.borrows);
        } catch (error) {
            toast.error(error?.response?.data?.message);
            setErrorMessage(error?.response?.data?.message);
        }
    };

    const fetchDeposits = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-deposits`);
            setDeposits(res.data.deposits);
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
            setErrorMessage(error?.response?.data?.message);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                await Promise.all([fetchAllBorrow(), fetchDeposits(), fetchUsers()]);
            } catch {
                toast.error("Error loading data. Please try again later.");
            } finally {
                // Stop the spinner once everything has been tried.
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    /* --------------------------------------------------
       Filtering: which rows the list shows
    -------------------------------------------------- */

    const search = searchText.trim().toLowerCase();

    // Requests that belong to the open tab AND match the search box.
    const visibleRequests = borrowList
        .filter((request) => {
            const matchesTab = request.status === TABS.find((tab) => tab.key === activeTab).status;
            const matchesSearch =
                `${request.title} ${request.name}`.toLowerCase().includes(search);
            return matchesTab && matchesSearch;
        })
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // How many requests are waiting in each tab (used by the filter pills).
    const countByStatus = (status) =>
        borrowList.filter((request) => request.status === status).length;

    /* --------------------------------------------------
       Borrow actions
    -------------------------------------------------- */

    const approveBorrow = async (borrow) => {
        const data = {
            id: borrow._id,
            userId: borrow.userId,
            status: "Approved",
        };
        try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/approve-borrow`, data);
            toast.success(res.data.message);
            fetchAllBorrow();
            ApprovedNotification(borrow);
            setPendingConfirmation(false);
        } catch (error) {
            toast.error(error?.response?.data?.message);
            setErrorMessage(error?.response?.data?.message);
        }
    };

    const updateBorrow = async (borrow) => {
        if (!returnDate[borrow._id] || !quantity[borrow._id]) {
            setErrorMessage("Please select date and quantity.");
            return;
        }

        const borrowData = {
            id: borrow._id,
            borrowDate: new Date().toISOString().split("T")[0],
            returnDate: returnDate[borrow._id].split("T")[0],
            status: "Borrowed",
            quantity: quantity[borrow._id],
            bookId: borrow.bookId,
            userId: borrow.userId,
        };

        try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/update-borrow`, borrowData);
            toast.success(res.data.message);
            fetchAllBorrow();
            BorrowedNotification(borrow);
            setApproveConfirmation(false);
        } catch (error) {
            toast.error(error?.response?.data?.message);
            setErrorMessage(error?.response?.data?.message);
        }
    };

    const ReturnBorrow = async (borrow) => {
        const borrowData = {
            id: borrow._id,
            status: "Returned",
        };

        try {
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/return-borrow`, borrowData);
            toast.success(res.data.message);
            fetchAllBorrow();
            setReturnConfirmation(false);
        } catch (error) {
            toast.error(error?.response?.data?.message);
            setErrorMessage(error?.response?.data?.message);
        }
    };

    const deleteBorrow = async (borrow) => {
        try {
            const res = await axios.delete(
                `${import.meta.env.VITE_API_URL}/delete-user-request/${borrow._id}`
            );
            toast.success(res.data.message);
            fetchAllBorrow();
            RemoveNotification(borrow);
            setDeleteConfirmation(false);
        } catch (error) {
            toast.error(error?.response?.data?.message);
            setErrorMessage(error?.response?.data?.message);
        }
    };

    /* --------------------------------------------------
       Notifications sent to the user after each action
    -------------------------------------------------- */

    const ApprovedNotification = async (borrow) => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/approved-notification`, {
                userId: borrow.userId,
            });
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    const RemoveNotification = async (borrow) => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/removed-notification`, {
                userId: borrow.userId,
            });
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    const BorrowedNotification = async (borrow) => {
        const data = {
            bookTitle: borrow.title,
            userId: borrow.userId,
            // Send the date picked for THIS book, not the whole list of dates.
            returnDate: returnDate[borrow._id],
            requestId: borrow._id,
        };
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/borrowed-notification`, data);
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    /* --------------------------------------------------
       Physical ID deposits
    -------------------------------------------------- */

    const DepositRequest = async () => {
        if (!idForm.userId || !idForm.idType || !idForm.idNumber || !idForm.idName) {
            setErrorMessage("Please fill all fields.");
            return;
        }
        try {
            setDepositLoading(true);
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/deposit-id`, idForm);
            toast.success(res.data.message);
            setIsDeposit(false);
            setIdForm({
                userId: "",
                idType: "",
                idNumber: "",
                idName: "",
                receivedBy: user?._id || "",
            });
            fetchDeposits();
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
            setErrorMessage(error?.response?.data?.message);
        } finally {
            setDepositLoading(false);
        }
    };

    const returnDeposit = async (deposit) => {
        try {
            setReturnDepositLoading(deposit._id);
            const personReturned = {
                firstname: user?.firstname,
                lastname: user?.lastname,
            };
            const res = await axios.put(
                `${import.meta.env.VITE_API_URL}/return-deposit/${deposit._id}`,
                personReturned
            );
            toast.success(res.data.message);
            fetchDeposits();
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
            setErrorMessage(error?.response?.data?.message);
        } finally {
            setReturnDepositLoading(null);
        }
    };

    /* --------------------------------------------------
       Confirmations
       Each table calls these with the row the admin clicked.
    -------------------------------------------------- */

    const confirmationProcess = (request) => {
        setErrorMessage("");
        if (!request) {
            toast.warning("No selected request");
            return;
        }
        setSelectedRequest(request);

        if (request.status.toLowerCase() === "pending") {
            setPendingConfirmation(true);
        } else if (request.status.toLowerCase() === "approved") {
            setApproveConfirmation(true);
        } else if (request.status.toLowerCase() === "borrowed") {
            setReturnConfirmation(true);
        } else {
            toast.warning("Invalid request status");
        }
    };

    const openSubmitPopup = (request) => {
        setErrorMessage("");
        if (!request) {
            toast.warning("No selected request");
            return;
        }
        setSelectedRequest(request);
        setSubmitConfirmation(true);
    };

    const deletionProcess = (request) => {
        if (!request) {
            toast.warning("No selected request");
            return;
        }
        setErrorMessage("");
        setDeleteConfirmation(true);
        setSelectedRequest(request);
    };

    /* --------------------------------------------------
       Small shared looks, so the styling is written once
       (same idea as the pills in Admin_Authority.jsx)
    -------------------------------------------------- */

    const pillClass = (isActive) =>
        `text-xs px-2.5 py-1 rounded-full border cursor-pointer transition-colors flex items-center gap-1.5 ${
            isActive
                ? "bg-stone-800 text-white border-stone-800"
                : "bg-white text-stone-600 border-stone-300 hover:bg-stone-100"
        }`;

    /* What the list area shows: the spinner, the empty message, or the rows. */
    const listArea = isLoading ? (
        <div className="w-full py-12 flex items-center justify-center gap-2 text-stone-400">
            <LoaderCircle size={20} className="animate-spin" />
            <span className="text-xs">Loading requests...</span>
        </div>
    ) : visibleRequests.length === 0 ? (
        <div className="w-full py-12 px-4 bg-stone-50 rounded-lg border border-dashed border-stone-300 flex flex-col items-center justify-center">
            <HandHelping size={24} className="text-stone-300" />
            <p className="text-sm font-medium text-stone-700 mt-2">No requests found</p>
            <p className="text-xs text-stone-500 mt-1 text-center">
                {searchText
                    ? "Try a different search."
                    : "Requests from users will appear here."}
            </p>
        </div>
    ) : (
        <>
            {activeTab === "pending" && (
                <PendingTable
                    Pendings={visibleRequests}
                    approveBorrow={confirmationProcess}
                    deleteBorrow={deletionProcess}
                />
            )}
            {activeTab === "approved" && (
                <ApprovedTable
                    Approved={visibleRequests}
                    openSubmitPopup={openSubmitPopup}
                    deleteBorrow={deletionProcess}
                />
            )}
            {activeTab === "borrowed" && (
                <BorrowedTable Borrowed={visibleRequests} ReturnBorrow={confirmationProcess} />
            )}
            {activeTab === "history" && <HistoryTable Returned={visibleRequests} />}
        </>
    );

    return (
        <>
            {/* Confirmations */}
            {pendingConfirmation && (
                <Confirmation_Popup
                    message={"Are you sure to approve this request?"}
                    errorMessage={errorMessage}
                    onConfirm={() => approveBorrow(selectedRequest)}
                    onCancel={() => setPendingConfirmation(false)}
                />
            )}
            {approveConfirmation && (
                <Confirmation_Popup
                    message={"Are you sure to let borrow this request?"}
                    errorMessage={errorMessage}
                    onConfirm={() => updateBorrow(selectedRequest)}
                    onCancel={() => setApproveConfirmation(false)}
                />
            )}
            {submitConfirmation && selectedRequest && (
                <Confirmation_Popup
                    message={"Set return date and quantity"}
                    errorMessage={errorMessage}
                    confirmLabel="Confirm"
                    onConfirm={() => {
                        if (!returnDate[selectedRequest._id] || !quantity[selectedRequest._id]) {
                            setErrorMessage("Please select date and quantity.");
                            return;
                        }
                        setErrorMessage("");
                        updateBorrow(selectedRequest);
                        setSubmitConfirmation(false);
                    }}
                    onCancel={() => {
                        setErrorMessage("");
                        setSubmitConfirmation(false);
                    }}
                >
                    <div className="space-y-3">
                        <div>
                            <label className="text-xs text-stone-500 block mb-1">
                                Return Date
                            </label>
                            <input
                                type="date"
                                className="w-full p-2 bg-white rounded-lg text-xs border border-stone-200 text-stone-600 outline-none focus:ring-2 focus:ring-stone-200"
                                value={returnDate[selectedRequest._id] || ""}
                                onChange={(e) =>
                                    setReturnDate((prev) => ({
                                        ...prev,
                                        [selectedRequest._id]: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div>
                            <label className="text-xs text-stone-500 block mb-1">
                                Quantity
                            </label>
                            <input
                                type="text"
                                placeholder="Enter quantity"
                                className="w-full p-2 bg-white rounded-lg text-xs border border-stone-200 text-stone-600 outline-none focus:ring-2 focus:ring-stone-200"
                                value={quantity[selectedRequest._id] || ""}
                                onChange={(e) =>
                                    setQuantity((prev) => ({
                                        ...prev,
                                        [selectedRequest._id]: e.target.value,
                                    }))
                                }
                            />
                        </div>
                    </div>
                </Confirmation_Popup>
            )}
            {returnConfirmation && (
                <Confirmation_Popup
                    message={"Confirm the return of this book?"}
                    errorMessage={errorMessage}
                    onConfirm={() => ReturnBorrow(selectedRequest)}
                    onCancel={() => setReturnConfirmation(false)}
                />
            )}
            {deleteConfirmation && (
                <Confirmation_Popup
                    message={"Are you sure to delete this request?"}
                    errorMessage={errorMessage}
                    onConfirm={() => deleteBorrow(selectedRequest)}
                    onCancel={() => setDeleteConfirmation(false)}
                />
            )}

            {/* Deposit modals */}
            {isDeposit && (
                <DepositModal
                    users={users}
                    onConfirm={DepositRequest}
                    idForm={idForm}
                    setIdForm={setIdForm}
                    depositLoading={depositLoading}
                    onClose={() => setIsDeposit(false)}
                />
            )}
            {isDepositList && (
                <DepositListModal
                    deposits={deposits}
                    onClose={() => setIsDepositList(false)}
                    returnDeposit={returnDeposit}
                    returnDepositLoading={returnDepositLoading}
                />
            )}

            <Admin_Sidebar />

            <section className="bg-white min-h-screen w-full justify-start items-start flex flex-col md:pl-20 lg:pl-60">
                <Admin_Header
                    mainText={"Borrowing Management"}
                    subText={"Manage borrow request from users"}
                />

                <div className="w-full justify-start items-start flex flex-col px-4 lg:px-10 pb-10">

                    {/* Page heading, search and the deposit buttons */}
                    <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2">
                            <div className="flex rounded-lg bg-stone-800 p-2 text-white justify-center items-center">
                                <HandHelping size={20} />
                            </div>
                            <div>
                                <h1 className="text-sm font-bold text-stone-800">Request Information</h1>
                                <p className="text-stone-400 text-xs">
                                    Manage user borrowing books.
                                </p>
                            </div>
                        </div>

                        <div className="w-full lg:w-auto flex items-center gap-2">
                            {/* Search by book title or borrower name */}
                            <div className="relative flex-1 lg:flex-none">
                                <Search
                                    size={14}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
                                />
                                <input
                                    type="search"
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    placeholder="Search book or borrower..."
                                    className="w-full lg:w-56 border border-stone-300 bg-white rounded-lg pl-9 pr-3 py-2 text-xs text-stone-600 outline-none focus:ring-2 focus:ring-stone-300"
                                />
                            </div>

                            <button
                                type="button"
                                title="List of physical ID deposit"
                                onClick={() => setIsDepositList(true)}
                                className="text-stone-800 bg-white border border-stone-300 p-2 rounded-lg cursor-pointer hover:bg-stone-100 flex justify-center items-center transition-colors shrink-0"
                            >
                                <IdCardLanyard size={15} />
                            </button>

                            <button
                                type="button"
                                onClick={() => setIsDeposit(true)}
                                className="text-[10px] text-white bg-stone-800 hover:bg-stone-900 px-4 py-2 rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-colors shrink-0"
                            >
                                <IdCard size={15} />
                                Deposit Id
                            </button>
                        </div>
                    </div>

                    {/* Status filters. Clicking one switches the list. */}
                    <div className="w-full bg-white border border-stone-200 rounded-lg p-3 mb-3">
                        <div className="w-full flex flex-wrap items-center gap-2">
                            <p className="text-xs font-medium text-stone-500 mr-1">Filter by status</p>

                            {TABS.map((tab) => (
                                <button
                                    key={tab.key}
                                    type="button"
                                    onClick={() => setActiveTab(tab.key)}
                                    className={pillClass(activeTab === tab.key)}
                                >
                                    {tab.label}
                                    <span
                                        className={
                                            activeTab === tab.key ? "text-stone-300" : "text-stone-400"
                                        }
                                    >
                                        {countByStatus(tab.status)}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* The request list */}
                    <div className="w-full bg-white rounded-lg">
                        {listArea}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Admin_BorrowBook_Page;
