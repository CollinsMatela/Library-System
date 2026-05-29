
const View_Employee_Modal = ({ employee, onClose }) => {
    return (
        <section className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-4">
            
            <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden">

                {/* Header */}
                <div className="flex justify-between items-center border-b border-gray-100 px-6 py-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            Employee Information
                        </h2>
                        <p className="text-sm text-gray-400">
                            View employee details and account information.
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
                                <p className="text-sm text-gray-400">Employee ID</p>
                                <p className="font-medium text-gray-700">
                                    {employee?.id}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">Last Name</p>
                                <p className="font-medium text-gray-700">
                                    {employee?.lastname}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">First Name</p>
                                <p className="font-medium text-gray-700">
                                    {employee?.firstname}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">Middle Name</p>
                                <p className="font-medium text-gray-700">
                                    {employee?.middlename}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">Birthdate</p>
                                <p className="font-medium text-gray-700">
                                    {employee?.month}-{employee?.day}-{employee?.year}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">Age</p>
                                <p className="font-medium text-gray-700">
                                    {employee?.age}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">Gender</p>
                                <p className="font-medium text-gray-700">
                                    {employee?.gender}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">Email</p>
                                <p className="font-medium text-gray-700 break-words">
                                    {employee?.email}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">Contact Number</p>
                                <p className="font-medium text-gray-700">
                                    {employee?.contact}
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Work Information */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">
                            Work Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                            <div>
                                <p className="text-sm text-gray-400">Role</p>
                                <p className="font-medium text-gray-700">
                                    {employee?.role}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">Grade Level</p>
                                <p className="font-medium text-gray-700">
                                    {employee?.gradeLevel}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">Branch</p>
                                <p className="font-medium text-gray-700">
                                    {employee?.branch}
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Account Information */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">
                            Account Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div>
                                <p className="text-sm text-gray-400">Username</p>
                                <p className="font-medium text-gray-700">
                                    {employee?.username}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">
                                    Password Status
                                </p>

                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        employee?.isChangePassword
                                            ? "bg-green-100 text-green-600"
                                            : "bg-yellow-100 text-yellow-600"
                                    }`}
                                >
                                    {employee?.isChangePassword
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

export default View_Employee_Modal;