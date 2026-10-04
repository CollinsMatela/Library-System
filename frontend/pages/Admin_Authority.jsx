import { useEffect, useState } from "react";
import { LoaderCircle, Mail, Pencil, Phone, Plus, Search, Trash, Users } from "lucide-react";
import Admin_SideBar from "../components/Admin_Sidebar";
import Admin_Header from "../components/Admin_Header";
import MembersModal from "../modals/MembersModal";
import Confirmation_Popup from "../popup/Confirmation_Popup";
import axios from "axios";
import { toast } from "react-toastify";
import { position } from "../mockdata";

/* Each role gets its own colour so the list is quick to scan. */
const ROLE_COLORS = {
    "system administrator": "bg-red-50 text-red-600 border-red-200",
    "head librarian": "bg-purple-50 text-purple-600 border-purple-200",
    "it librarian": "bg-blue-50 text-blue-600 border-blue-200",
    "assistant librarian": "bg-green-50 text-green-600 border-green-200",
};  

const Admin_Authority = () => {
    const [members, setMembers] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [filterRole, setFilterRole] = useState("");

    const [showMemberModal, setShowMemberModal] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [isRoleOpen, setIsRoleOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // The member the admin picked, and the role they picked for them.
    const [selectedLibrarian, setSelectedLibrarian] = useState(null);
    const [pickedRole, setPickedRole] = useState("");

    /* Helpers */

    // Build one clean name. Empty parts are skipped so somebody with no
    // middlename never ends up with a double space.
    const getFullName = (member) => {
        const first = (member?.firstname || "").trim();
        const middle = (member?.middlename || "").trim();
        const last = (member?.lastname || "").trim();
        const suffix = (member?.suffix || "").trim();

        // The suffix goes last: "Juan Dela Cruz Jr."
        return `${first} ${middle} ${last} ${suffix}`.replace(/\s+/g, " ").trim();
    };

    // Turn the stored role into a readable label.
    const getRoleLabel = (role) => position.find((pos) => pos.value === role)?.label || role;

    // How many members hold this role, e.g. 2 Head Librarians.
    const countRole = (role) => members.filter((m) => m.role?.toLowerCase() === role).length;

    /* Loading the members */

    const FetchMembersRequest = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/fetch-members`);
            setMembers(res.data.members);
        } catch (error) {
            toast.error("Failed to fetch data");
            setErrorMessage(error.response?.data?.message);
        } finally {
            // isLoading only ever turns from true to false. Because it is
            // already false on later calls, refreshing the list after an add
            // or delete never makes the spinner flash again.
            setIsLoading(false);
        }
    };

    useEffect(() => {
        FetchMembersRequest();
    }, []);

    /* Filtering */

    const search = searchText.trim().toLowerCase();

    // Keep the members that match the chosen role AND the search box.
    const visibleMembers = members.filter((member) => {
        const matchesRole = filterRole === "" || member.role?.toLowerCase() === filterRole;
        const matchesName =
            `${member.firstname} ${member.lastname}`.toLowerCase().includes(search);

        return matchesRole && matchesName;
    });

    /* Deleting */

    const handleDeleteLibrarian = (librarian) => {
        setSelectedLibrarian(librarian);
        setErrorMessage("");
        setDeleteConfirmation(true);
    };

    const DeleteMemberRequest = async (id) => {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/delete-member/${id}`);
            toast.success(res.data.message);
            setDeleteConfirmation(false);
            setSelectedLibrarian(null);
            FetchMembersRequest();
        } catch (error) {
            toast.error("Failed to delete account");
            setErrorMessage(error.response?.data?.message);
        }
    };

    /* Changing the role */

    const openRolePopup = (librarian) => {
        setSelectedLibrarian(librarian);
        setPickedRole(librarian.role); // start from the role they have now
        setErrorMessage("");
        setIsRoleOpen(true);
    };

    const closeRolePopup = () => {
        setIsRoleOpen(false);
        setPickedRole("");
        setErrorMessage("");
    };

    const handleUpdateRole = async () => {
        if (!pickedRole) {
            toast.warning("Please select a role.");
            return;
        }

        try {
            const res = await axios.put(
                `${import.meta.env.VITE_API_URL}/update-role-librarian/${selectedLibrarian._id}`,
                { role: pickedRole }
            );
            toast.success(res.data.message);
            closeRolePopup();
            setSelectedLibrarian(null);
            FetchMembersRequest();
        } catch (error) {
            toast.error("Failed to update librarian role");
            setErrorMessage(error.response?.data?.message);
        }
    };

    /* Small shared looks, so the styling is written once. */
    const pillClass = (isActive) =>
        `text-xs px-2.5 py-1 rounded-full border cursor-pointer transition-colors flex items-center gap-1.5 ${
            isActive
                ? "bg-stone-800 text-white border-stone-800"
                : "bg-white text-stone-600 border-stone-300 hover:bg-stone-100"
        }`;

    /* What the list area shows: the spinner, the empty message, or the rows. */
    const memberList = isLoading ? (
        /* Still loading */
        <div className="w-full py-12 flex items-center justify-center gap-2 text-stone-400">
            <LoaderCircle size={20} className="animate-spin" />
            <span className="text-xs">Loading members...</span>
        </div>
    ) : visibleMembers.length === 0 ? (
        /* Nothing to show */
        <div className="w-full py-12 px-4 bg-stone-50 rounded-lg border border-dashed border-stone-300 flex flex-col items-center justify-center">
            <Users size={24} className="text-stone-300" />
            <p className="text-sm font-medium text-stone-700 mt-2">No members found</p>
            <p className="text-xs text-stone-500 mt-1 text-center">
                {searchText || filterRole
                    ? "Try a different search or filter."
                    : "Click Authorized to add your first librarian."}
            </p>
        </div>
    ) : (
        /* The list */
        <div className="w-full space-y-2">
            {visibleMembers.map((member) => (
                <div
                    key={member._id}
                    className="w-full flex flex-col sm:flex-row sm:items-center gap-3 bg-white border border-stone-200 rounded-lg p-2 hover:border-stone-300 hover:shadow-sm transition"
                >
                    {/* Avatar, name and role */}
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                        {member.avatar ? (
                            <img
                                src={member.avatar}
                                alt=""
                                className="h-10 w-10 rounded-full object-cover shrink-0"
                            />
                        ) : (
                            <div className="h-8 w-8 rounded-full bg-stone-800 text-white shrink-0 flex items-center justify-center text-xs font-semibold">
                                {member.firstname?.slice(0, 1).toUpperCase()}
                            </div>
                        )}

                        <div className="min-w-0">
                            <p className="text-xs font-medium text-stone-800 truncate">
                                {getFullName(member)}
                            </p>

                            <span
                                className={`inline-flex mt-1 px-2 py-0.5 rounded-full border text-[10px] font-medium ${
                                    ROLE_COLORS[member.role] || "bg-stone-100 text-stone-600 border-stone-200"
                                }`}
                            >
                                {getRoleLabel(member.role)}
                            </span>
                        </div>
                    </div>

                    {/* Email and contact number */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-5 text-[10px] text-stone-500 sm:w-72">
                        <span className="flex items-center gap-1.5 min-w-0">
                            <Mail size={13} className="shrink-0" />
                            <span className="truncate">{member.email || "—"}</span>
                        </span>

                        <span className="flex items-center gap-1.5 min-w-0">
                            <Phone size={13} className="shrink-0" />
                            <span className="truncate">{member.contact || "—"}</span>
                        </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 sm:justify-end">
                        <button
                            type="button"
                            onClick={() => openRolePopup(member)}
                            className="text-[10px] text-stone-600 bg-white border border-stone-300 px-3 py-2 rounded-lg flex items-center gap-1 cursor-pointer hover:bg-stone-100 transition-colors"
                        >
                            <Pencil size={13} />
                            Change Role
                        </button>

                        <button
                            type="button"
                            aria-label={`Delete ${getFullName(member)}`}
                            title="Delete member"
                            onClick={() => handleDeleteLibrarian(member)}
                            className="p-2 bg-red-500 hover:bg-red-600 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
                        >
                            <Trash size={15} className="text-white" />
                        </button>
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
                    message={`Delete ${getFullName(selectedLibrarian)}? This cannot be undone.`}
                    confirmLabel="Delete"
                    onConfirm={() => DeleteMemberRequest(selectedLibrarian._id)}
                    onCancel={() => {
                        setDeleteConfirmation(false);
                        setErrorMessage("");
                    }}
                />
            )}

            {isRoleOpen && (
                <Confirmation_Popup
                    errorMessage={errorMessage}
                    message={`Change the role of ${getFullName(selectedLibrarian)}`}
                    confirmLabel="Update Role"
                    onConfirm={handleUpdateRole}
                    onCancel={closeRolePopup}
                >
                    <div>
                        <label htmlFor="new-role" className="text-xs text-stone-500 block mb-1">
                            New Role
                        </label>
                        <select
                            id="new-role"
                            value={pickedRole}
                            onChange={(e) => setPickedRole(e.target.value)}
                            className="w-full border border-stone-300 rounded-lg text-xs text-stone-600 p-2 outline-none focus:ring-2 focus:ring-stone-300"
                        >
                            <option value="">Select Role</option>
                            {position.map((pos) => (
                                <option key={pos.value} value={pos.value}>
                                    {pos.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </Confirmation_Popup>
            )}

            <Admin_SideBar />

            {showMemberModal && (
                <MembersModal
                    onClose={() => setShowMemberModal(false)}
                    reFetch={FetchMembersRequest}
                />
            )}

            <section className="bg-white min-h-screen w-full justify-start items-start flex flex-col md:pl-20 lg:pl-60">
                <Admin_Header
                    mainText={"Authority Management"}
                    subText={"Manage the authorized librarian account"}
                />

                <div className="w-full justify-start items-start flex flex-col px-4 lg:px-10 pb-10">

                    {/* Page heading, search and the add button */}
                    <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2">
                            <div className="flex rounded-lg bg-stone-800 p-2 text-white justify-center items-center">
                                <Users size={20} />
                            </div>
                            <div>
                                <h1 className="text-sm font-bold text-stone-800">Authorized Member</h1>
                                <p className="text-stone-400 text-xs">
                                    List of registered authorized people.
                                </p>
                            </div>
                        </div>

                        <div className="w-full lg:w-auto flex items-center gap-2">
                            {/* Search */}
                            <div className="relative flex-1 lg:flex-none">
                                <Search
                                    size={14}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
                                />
                                <input
                                    type="search"
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    placeholder="Search name..."
                                    className="w-full lg:w-56 border border-stone-300 bg-white rounded-lg pl-9 pr-3 py-2 text-xs text-stone-600 outline-none focus:ring-2 focus:ring-stone-300"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={() => setShowMemberModal(true)}
                                className="text-[10px] text-white bg-stone-800 hover:bg-stone-900 px-4 py-2 rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-colors shrink-0"
                            >
                                <Plus size={15} />
                                Authorized
                            </button>
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
                                    {members.length}
                                </span>
                            </button>

                            {position.map((pos) => (
                                <button
                                    key={pos.value}
                                    type="button"
                                    onClick={() => setFilterRole(pos.value)}
                                    className={pillClass(filterRole === pos.value)}
                                >
                                    {pos.label}
                                    <span
                                        className={
                                            filterRole === pos.value ? "text-stone-300" : "text-stone-400"
                                        }
                                    >
                                        {countRole(pos.value)}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* The member list */}
                    {memberList}

                </div>
            </section>
        </>
    );
};

export default Admin_Authority;