import { useEffect, useState } from "react";
import { Eye, LoaderCircle, Mail, Phone, Search, Trash, Users } from "lucide-react";
import Admin_Sidebar from "../components/Admin_Sidebar";
import Admin_Header from "../components/Admin_Header";
import View_Student_Modal from "../modals/View_Student_Modal";
import Confirmation_Popup from "../popup/Confirmation_Popup";
import axios from "axios";
import { toast } from "react-toastify";

/* The three kinds of user accounts, and the colour each one gets. */
const USER_ROLES = [
    { value: "student", label: "Student", color: "bg-blue-50 text-blue-600 border-blue-200" },
    { value: "teacher", label: "Teacher", color: "bg-emerald-50 text-emerald-600 border-emerald-200" },
    { value: "guest", label: "Guest", color: "bg-stone-100 text-stone-600 border-stone-200" },
];

const Admin_User = () => {
    const [users, setUsers] = useState([]);

    const [search, setSearch] = useState("");
    const [filterRole, setFilterRole] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const [selectedUser, setSelectedUser] = useState(null);
    const [showViewStudent, setShowViewStudent] = useState(false);
    const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

    /* Helpers */

    // Build one clean name. Empty parts are skipped so we never get a
    // double space when somebody has no middlename.
    const getFullName = (user) => {
        const first = (user?.firstname || "").trim();
        const middle = (user?.middlename || "").trim();
        const last = (user?.lastname || "").trim();

        return `${first} ${middle} ${last}`.replace(/\s+/g, " ").trim();
    };

    // The role's label and colour, with a plain fallback if the role is unknown.
    const getRole = (role) =>
        USER_ROLES.find((item) => item.value === role?.toLowerCase()) || {
            label: role || "Unknown",
            color: "bg-stone-100 text-stone-600 border-stone-200",
        };

    // How many users hold this role, e.g. 12 Students.
    const countRole = (role) => users.filter((u) => u.role?.toLowerCase() === role).length;

    /* Loading the users */

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-users`);
            setUsers(res.data.users);
        } catch (error) {
            // The admin now actually finds out when the list fails to load.
            toast.error("Failed to fetch data");
            setErrorMessage(error.response?.data?.message);
        } finally {
            // isLoading only ever turns from true to false. Because it is
            // already false on later calls, refreshing after a delete never
            // makes the spinner flash again.
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    /* Filtering */

    const searchName = search.trim().toLowerCase();

    // Keep the users that match the chosen role AND the search box.
    const visibleUsers = users.filter((user) => {
        const matchesRole = filterRole === "" || user.role?.toLowerCase() === filterRole;
        const matchesName = `${user.firstname} ${user.lastname}`.toLowerCase().includes(searchName);

        return matchesRole && matchesName;
    });

    /* Viewing and deleting */

    const handleViewStudent = (user) => {
        setSelectedUser(user);
        setShowViewStudent(true);
    };

    const deleteConfirmation = (user) => {
        setSelectedUser(user);
        setErrorMessage("");
        setShowConfirmationPopup(true);
    };

    const deleteStudent = async (userId) => {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/delete-student/${userId}`);
            toast.success(res.data.message);
            setShowConfirmationPopup(false);
            setSelectedUser(null);
            fetchUsers();
        } catch (error) {
            // The popup stays open so the admin can read the reason.
            toast.error("Failed to delete account");
            setErrorMessage(error.response?.data?.message);
        }
    };

    /* A small shared look, so the pill styling is written once. */
    const pillClass = (isActive) =>
        `text-xs px-2.5 py-1 rounded-full border cursor-pointer transition-colors flex items-center gap-1.5 ${
            isActive
                ? "bg-stone-800 text-white border-stone-800"
                : "bg-white text-stone-600 border-stone-300 hover:bg-stone-100"
        }`;

    /* What the list area shows: the spinner, the empty message, or the rows. */
    const userList = isLoading ? (
        /* Still loading */
        <div className="w-full py-12 flex items-center justify-center gap-2 text-stone-400">
            <LoaderCircle size={20} className="animate-spin" />
            <span className="text-xs">Loading users...</span>
        </div>
    ) : visibleUsers.length === 0 ? (
        /* Nothing to show */
        <div className="w-full py-12 px-4 bg-stone-50 rounded-lg border border-dashed border-stone-300 flex flex-col items-center justify-center">
            <Users size={24} className="text-stone-300" />
            <p className="text-sm font-medium text-stone-700 mt-2">No users found</p>
            <p className="text-xs text-stone-500 mt-1 text-center">
                {search || filterRole
                    ? "Try a different search or filter."
                    : "Registered users will appear here."}
            </p>
        </div>
    ) : (
        /* The rows */
        <div className="w-full space-y-2">
            {visibleUsers.map((user) => {
                const roleInfo = getRole(user.role);

                return (
                    <div
                        key={user._id}
                        className="w-full flex flex-col sm:flex-row sm:items-center gap-3 bg-white border border-stone-200 rounded-lg p-2 hover:border-stone-300 hover:shadow-sm transition"
                    >
                        {/* Avatar, name and role */}
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                            {user.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt=""
                                    className="h-8 w-8 rounded-full object-cover shrink-0"
                                />
                            ) : (
                                <div className="h-8 w-8 rounded-full bg-stone-800 text-white shrink-0 flex items-center justify-center text-xs font-semibold">
                                    {user.firstname?.slice(0, 1).toUpperCase()}
                                </div>
                            )}

                            <div className="min-w-0">
                                <p className="text-xs font-medium text-stone-800 truncate">
                                    {getFullName(user)}
                                </p>

                                <span
                                    className={`inline-flex mt-1 px-2 py-0.5 rounded-full border text-[10px] font-medium ${roleInfo.color}`}
                                >
                                    {roleInfo.label}
                                </span>
                            </div>
                        </div>

                        {/* Email and contact number */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-5 text-[10px] text-stone-500 sm:w-72">
                            <span className="flex items-center gap-1.5 min-w-0">
                                <Mail size={13} className="shrink-0" />
                                <span className="truncate">{user.email || "—"}</span>
                            </span>

                            <span className="flex items-center gap-1.5 min-w-0">
                                <Phone size={13} className="shrink-0" />
                                <span className="truncate">{user.contact || "—"}</span>
                            </span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 sm:justify-end">
                            <button
                                type="button"
                                onClick={() => handleViewStudent(user)}
                                className="text-[10px] text-stone-600 bg-white border border-stone-300 px-3 py-2 rounded-lg flex items-center gap-1 cursor-pointer hover:bg-stone-100 transition-colors"
                            >
                                <Eye size={15} />
                                View
                            </button>

                            <button
                                type="button"
                                aria-label={`Delete ${getFullName(user)}`}
                                title="Delete user"
                                onClick={() => deleteConfirmation(user)}
                                className="p-2 bg-red-500 hover:bg-red-600 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
                            >
                                <Trash size={15} className="text-white" />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );

    return (
        <>
            {showConfirmationPopup && (
                <Confirmation_Popup
                    errorMessage={errorMessage}
                    message={`Delete ${getFullName(selectedUser)}? This cannot be undone.`}
                    confirmLabel="Delete"
                    onConfirm={() => deleteStudent(selectedUser?._id)}
                    onCancel={() => {
                        setShowConfirmationPopup(false);
                        setErrorMessage("");
                    }}
                />
            )}

            {showViewStudent && (
                <View_Student_Modal
                    user={selectedUser}
                    onClose={() => setShowViewStudent(false)}
                />
            )}

            <Admin_Sidebar />

            <section className="bg-white min-h-screen w-full justify-start items-start flex flex-col md:pl-20 lg:pl-60">
                <Admin_Header
                    mainText={"Account Management"}
                    subText={"Manage the registered users"}
                />

                <div className="w-full justify-start items-start flex flex-col px-4 lg:px-10 pb-10">

                    {/* Page heading and search */}
                    <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2">
                            <div className="flex rounded-lg bg-stone-800 p-2 text-white justify-center items-center">
                                <Users size={20} />
                            </div>
                            <div>
                                <h1 className="text-sm font-bold text-stone-800">User Accounts</h1>
                                <p className="text-stone-400 text-xs">
                                    Manage student, teacher and guest accounts.
                                </p>
                            </div>
                        </div>

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
                                placeholder="Search name..."
                                className="w-full lg:w-56 border border-stone-300 bg-white rounded-lg pl-9 pr-3 py-2 text-xs text-stone-600 outline-none focus:ring-2 focus:ring-stone-300"
                            />
                        </div>
                    </div>

                    {/* Role counts. Clicking one filters the list. */}
                    <div className="w-full bg-white border border-stone-200 rounded-lg p-3 mb-3">
                        <div className="w-full flex flex-wrap items-center gap-2">
                            <p className="text-xs font-medium text-stone-500 mr-1">Filter by role</p>

                            <button
                                type="button"
                                onClick={() => setFilterRole("")}
                                className={pillClass(filterRole === "")}
                            >
                                All
                                <span className={filterRole === "" ? "text-stone-300" : "text-stone-400"}>
                                    {users.length}
                                </span>
                            </button>

                            {USER_ROLES.map((item) => (
                                <button
                                    key={item.value}
                                    type="button"
                                    onClick={() => setFilterRole(item.value)}
                                    className={pillClass(filterRole === item.value)}
                                >
                                    {item.label}
                                    <span
                                        className={
                                            filterRole === item.value ? "text-stone-300" : "text-stone-400"
                                        }
                                    >
                                        {countRole(item.value)}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* The user list */}
                    {userList}

                </div>
            </section>
        </>
    );
};

export default Admin_User;