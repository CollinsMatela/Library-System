


const View_Student_Modal = ({ student, onClose }) => {
    return (
        <section className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-4">
            
            <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden">

                {/* Header */}
                <div className="flex justify-between items-center border-b border-gray-100 px-6 py-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            Student Information
                        </h2>
                        <p className="text-sm text-gray-400">
                            View student details and account information.
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
                                <p className="text-sm text-gray-400">Student ID</p>
                                <p className="font-medium text-gray-700">
                                    {student?.id}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">Last Name</p>
                                <p className="font-medium text-gray-700">
                                    {student?.lastname}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">First Name</p>
                                <p className="font-medium text-gray-700">
                                    {student?.firstname}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">Middle Name</p>
                                <p className="font-medium text-gray-700">
                                    {student?.middlename}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">Birthdate</p>
                                <p className="font-medium text-gray-700">
                                    {student?.month}-{student?.day}-{student?.year}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">Age</p>
                                <p className="font-medium text-gray-700">
                                    {student?.age}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">Gender</p>
                                <p className="font-medium text-gray-700">
                                    {student?.gender}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">Email</p>
                                <p className="font-medium text-gray-700 break-words">
                                    {student?.parentEmail}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">Contact Number</p>
                                <p className="font-medium text-gray-700">
                                    {student?.parentContact}
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Work Information */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">
                            School Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                            <div>
                                <p className="text-sm text-gray-400">Role</p>
                                <p className="font-medium text-gray-700">
                                    {student?.role}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">Grade Level</p>
                                <p className="font-medium text-gray-700">
                                    {student?.gradeLevel}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">Branch</p>
                                <p className="font-medium text-gray-700">
                                    {student?.branch}
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Account Information */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">
                            Account Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div>
                                <p className="text-sm text-gray-400">Username</p>
                                <p className="font-medium text-gray-700">
                                    {student?.username}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">
                                    Password Status
                                </p>

                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        student?.isChangePassword
                                            ? "bg-green-100 text-green-600"
                                            : "bg-yellow-100 text-yellow-600"
                                    }`}
                                >
                                    {student?.isChangePassword
                                        ? "Password Changed"
                                        : "Default Password"}
                                </span>
                            </div>

                        </div>
                    </div>

                    {/* Analytics Information */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">
                            Performance Analytics
                        </h3>
                        
                        
                    </div>

                </div>

            </div>

        </section>
    )
}

export default View_Student_Modal;