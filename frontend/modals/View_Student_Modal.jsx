


const View_Student_Modal = ({ user, onClose }) => {
    return (
        <section className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-4">
            
            <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden">

                {/* Header */}
                <div className="flex justify-between items-center border-b border-gray-100 px-6 py-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            User Information
                        </h2>
                        <p className="text-sm text-gray-400">
                            View user details and account information.
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-red-500 text-2xl cursor-pointer"
                    >
                        ×
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 max-h-[80vh] overflow-y-auto">

                    {/* Personal Information */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">
                            Personal Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                            <div>
                                <p className="text-sm text-gray-400">User ID</p>
                                <p className="font-medium text-gray-700">
                                    {user?._id}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">Last Name</p>
                                <p className="font-medium text-gray-700">
                                    {user?.lastname}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">First Name</p>
                                <p className="font-medium text-gray-700">
                                    {user?.firstname}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">Middle Name</p>
                                <p className="font-medium text-gray-700">
                                    {user?.middlename}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">Birthdate</p>
                                <p className="font-medium text-gray-700">
                                    {user?.month}-{user?.day}-{user?.year}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">Age</p>
                                <p className="font-medium text-gray-700">
                                    {user?.age}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">Gender</p>
                                <p className="font-medium text-gray-700">
                                    {user?.sex}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">Email</p>
                                <p className="font-medium text-gray-700 break-words">
                                    {user?.email}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">Contact Number</p>
                                <p className="font-medium text-gray-700">
                                    {user?.contact}
                                </p>
                            </div>

                        </div>
                    </div>
                    
                    {/* Parent Information */}
                    {user?.age < 18 && (
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">
                            Personal Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                            <div>
                                <p className="text-sm text-gray-400">Parent/Guardian Name</p>
                                <p className="font-medium text-gray-700">
                                    {user?.parentName}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Parent/Guardian Contact</p>
                                <p className="font-medium text-gray-700">
                                    {user?.parentContact}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Parent/Guardian Relationship</p>
                                <p className="font-medium text-gray-700">
                                    {user?.parentRelationship}
                                </p>
                            </div>

                           

                        </div>
                    </div>
                    )}

                    {/* Account Information */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">
                            Account Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div>
                                <p className="text-sm text-gray-400">Username</p>
                                <p className="font-medium text-gray-700">
                                    {user?.username}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">
                                    Password Status
                                </p>

                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        user?.isChangePassword
                                            ? "bg-green-100 text-green-600"
                                            : "bg-yellow-100 text-yellow-600"
                                    }`}
                                >
                                    {user?.isChangePassword
                                        ? "Password Changed"
                                        : "Default Password"}
                                </span>
                            </div>

                        </div>
                    </div>

                </div>

            </div>

        </section>
    )
}

export default View_Student_Modal;