import { X, User, MapPinHouse, Users, UserCircle } from "lucide-react";

const View_Student_Modal = ({ user, onClose }) => {
    // Function to safely display "N/A" if field is empty
    const displayValue = (value) => {
        if (value === "" || value === null || value === undefined) {
            return "N/A";
        }
        return value;
    };

    // Function to format full name nicely
    const fullName = () => {
        const nameParts = [
            user?.firstname,
            user?.middlename,
            user?.lastname,
            user?.extensionname ? user.extensionname : null,
        ].filter(Boolean);
        return nameParts.join(" ");
    };

    // Function to format birthdate
    const birthdate = () => {
        if (user?.month && user?.day && user?.year) {
            return `${user.month} ${user.day}, ${user.year}`;
        }
        return "N/A";
    };

    // Check if user has parent info
    const hasParentInfo = user?.parentName || user?.parentContact || user?.parentRelationship;

    return (
        <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3 backdrop-blur-xs">
            <div className="w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-lg">
                {/* Header */}
                <div className="flex items-center gap-2.5 border-b border-stone-200 p-4">
                    {/* Avatar */}
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-800">
                        {user?.avatar ? (
                            <img
                                src={user.avatar}
                                alt="User Avatar"
                                className="h-8 w-8 rounded-full object-cover"
                            />
                        ) : (
                            <User size={16} className="text-white" />
                        )}
                    </div>

                    <div>
                        <h2 className="text-xs font-medium text-stone-900">
                            {fullName()}
                        </h2>
                        <div className="flex flex-wrap gap-1.5">
                            <p className="text-[11px] text-stone-500">
                                Role: {user?.role ? user.role.toUpperCase() : "N/A"}
                            </p>
                            <p className="text-[11px] text-stone-500">
                                ID: {user?._id || "N/A"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="h-[40vh] sm:h-[60vh] overflow-y-auto px-6">
                    <div className="flex flex-col gap-1.5">
                        {/* Personal Information */}
                        <div className="border-b border-stone-300 py-4">
                            <h3 className="mb-1.5 text-[11px] font-medium uppercase flex gap-1 tracking-wide text-stone-600">
                               <User size={15}/> Personal Information
                            </h3>

                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                                <div>
                                    <p className="mb-0.5 text-xs text-stone-500">Last Name</p>
                                    <p className="text-xs font-medium text-stone-800">
                                        {displayValue(user?.lastname)}
                                    </p>
                                </div>

                                <div>
                                    <p className="mb-0.5 text-xs text-stone-500">First Name</p>
                                    <p className="text-xs font-medium text-stone-800">
                                        {displayValue(user?.firstname)}
                                    </p>
                                </div>

                                <div>
                                    <p className="mb-0.5 text-xs text-stone-500">Middle Name</p>
                                    <p className="text-xs font-medium text-stone-800">
                                        {displayValue(user?.middlename)}
                                    </p>
                                </div>

                                <div>
                                    <p className="mb-0.5 text-xs text-stone-500">Extension Name</p>
                                    <p className="text-xs font-medium text-stone-800">
                                        {displayValue(user?.extensionname)}
                                    </p>
                                </div>

                                <div>
                                    <p className="mb-0.5 text-xs text-stone-500">Birthdate</p>
                                    <p className="text-xs font-medium text-stone-800">
                                        {birthdate()}
                                    </p>
                                </div>

                                <div>
                                    <p className="mb-0.5 text-xs text-stone-500">Age</p>
                                    <p className="text-xs font-medium text-stone-800">
                                        {displayValue(user?.age)}
                                    </p>
                                </div>

                                <div>
                                    <p className="mb-0.5 text-xs text-stone-500">Gender</p>
                                    <p className="text-xs font-medium text-stone-800">
                                        {displayValue(user?.sex)}
                                    </p>
                                </div>

                                <div>
                                    <p className="mb-0.5 text-xs text-stone-500">Email Address</p>
                                    <p className="break-words text-xs font-medium text-stone-800">
                                        {displayValue(user?.email)}
                                    </p>
                                </div>

                                <div>
                                    <p className="mb-0.5 text-xs text-stone-500">Contact Number</p>
                                    <p className="text-xs font-medium text-stone-800">
                                        {displayValue(user?.contact)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    
                        {/* Address Information */}
                        <div className="border-b border-stone-300 py-4">
                            <h3 className="mb-1.5 text-[11px] font-medium flex gap-1 uppercase tracking-wide text-stone-600">
                                <MapPinHouse size={15}/> Address Information
                            </h3>

                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                                <div className="xs:col-span-2">
                                    <p className="mb-0.5 text-xs text-stone-500">Home Address</p>
                                    <p className="break-words text-xs font-medium text-stone-800">
                                        {displayValue(user?.homeAddress)}
                                    </p>
                                </div>

                                <div>
                                    <p className="mb-0.5 text-xs text-stone-500">City</p>
                                    <p className="text-xs font-medium text-stone-800">
                                        {displayValue(user?.city)}
                                    </p>
                                </div>

                                <div>
                                    <p className="mb-0.5 text-xs text-stone-500">Institution/School</p>
                                    <p className="break-words text-xs font-medium text-stone-800">
                                        {displayValue(user?.institution)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Parent/Guardian Information */}
                        {hasParentInfo && (
                            <div className="border-b border-stone-300 py-4">
                                <h3 className="mb-1.5 text-[11px] font-medium flex gap-1 uppercase tracking-wide text-stone-600">
                                    <Users size={15}/> Parent/Guardian Information
                                </h3>

                                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                                    <div>
                                        <p className="mb-0.5 text-xs text-stone-500">
                                            Parent/Guardian Name
                                        </p>
                                        <p className="text-xs font-medium text-stone-800">
                                            {displayValue(user?.parentName)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="mb-0.5 text-xs text-stone-500">
                                            Parent/Guardian Contact
                                        </p>
                                        <p className="text-xs font-medium text-stone-800">
                                            {displayValue(user?.parentContact)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="mb-0.5 text-xs text-stone-500">
                                            Relationship
                                        </p>
                                        <p className="text-xs font-medium text-stone-800">
                                            {displayValue(user?.parentRelationship)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Account Information */}
                        <div className="py-4">
                            <h3 className="mb-1.5 text-[11px] font-medium flex gap-1 uppercase tracking-wide text-stone-600">
                                <UserCircle size={15}/> Account Information
                            </h3>

                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                                <div>
                                    <p className="mb-0.5 text-xs text-stone-500">Role</p>
                                    <p className="text-xs font-medium text-stone-800">
                                        {user?.role ? user.role.toUpperCase() : "N/A"}
                                    </p>
                                </div>

                                <div>
                                    <p className="mb-1 text-xs text-stone-500">Password Status</p>
                                    <span
                                        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                            user?.isChangePassword
                                                ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200"
                                                : "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200"
                                        }`}
                                    >
                                        {user?.isChangePassword
                                            ? "Password Changed"
                                            : "Default Password"}
                                    </span>
                                </div>

                                {user?.createdAt && (
                                    <div>
                                        <p className="mb-0.5 text-xs text-stone-500">Date Registered</p>
                                        <p className="text-xs font-medium text-stone-800">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                )}

                                {user?.updatedAt && (
                                    <div>
                                        <p className="mb-0.5 text-xs text-stone-500">Last Updated</p>
                                        <p className="text-xs font-medium text-stone-800">
                                            {new Date(user.updatedAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Footer */}
                <div className="flex items-center justify-end border-t border-stone-200 bg-white p-4">
                    <button
                        className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-stone-900 p-2 text-xs font-medium text-white shadow-xs transition-all hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-1"
                        onClick={onClose}
                    >
                        <X size={13} className="text-white" />
                        Close
                    </button>
                </div>

            </div>

        </section>
    )
}

export default View_Student_Modal;