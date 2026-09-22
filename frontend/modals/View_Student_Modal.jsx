import {X} from "lucide-react"


const View_Student_Modal = ({ user, onClose }) => {
    return (
        <section className="fixed inset-0 bg-black/50 backdrop-blur-[2px] flex justify-center items-center z-50 px-4">
            
            <div className="bg-white w-full max-w-3xl rounded-lg overflow-hidden ">

                {/* Header */}
                <div className="flex justify-between items-center border-b border-stone-300 px-6 py-4">
                    <div>
                        <h2 className="text-sm font-bold text-stone-800">
                            {user.lastname} {user.extensionname || ""} {user.middlename} {user.lastname}
                        </h2>
                        <div className="flex gap-2">
                            <p className="text-[10px] text-stone-500">Role: {user.role.toUpperCase()}</p>
                            <p className="text-[10px] text-stone-500">Id: {user._id}</p>
                        </div>
                        
                    </div>
                </div>

                {/* Body */}
                <div className="p-6 max-h-[80vh] overflow-y-auto">

                    {/* Personal Information */}
                    <div className="mb-8">
                        <h3 className="text-sm font-semibold text-stone-700 mb-4">
                            Personal Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                            <div>
                                <p className="text-[10px] text-stone-400">Last Name</p>
                                <p className="font-medium text-stone-700 text-[10px]">
                                    {user?.lastname}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] text-stone-400">First Name</p>
                                <p className="font-medium text-stone-700 text-[10px]">
                                    {user?.firstname}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] text-stone-400">Middle Name</p>
                                <p className="font-medium text-stone-700 text-[10px]">
                                    {user?.middlename}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] text-stone-400">Extension Name</p>
                                <p className="font-medium text-stone-700 text-[10px]">
                                    {user?.extensionname || "N/A"}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] text-stone-400">Birthdate</p>
                                <p className="font-medium text-stone-700 text-[10px]">
                                    {user?.month}-{user?.day}-{user?.year}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] text-stone-400">Age</p>
                                <p className="font-medium text-stone-700 text-[10px]">
                                    {user?.age}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] text-stone-400">Gender</p>
                                <p className="font-medium text-stone-700 text-[10px]">
                                    {user?.sex}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] text-stone-400">Email Address</p>
                                <p className="font-medium text-stone-700 wrap-break-words text-[10px]">
                                    {user?.email}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] text-stone-400">Contact Number</p>
                                <p className="font-medium text-stone-700 text-[10px]">
                                    {user?.contact}
                                </p>
                            </div>

                        </div>
                    </div>
                    
                    {/* Parent Information */}
                    {user?.age < 18 && (
                    <div className="mb-8">
                        <h3 className="text-sm font-semibold text-stone-700 mb-4">
                            Personal Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                            <div>
                                <p className="text-[10px] text-stone-400">Parent/Guardian Name</p>
                                <p className="font-medium text-stone-700 text-[10px]">
                                    {user?.parentName}
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] text-stone-400">Parent/Guardian Contact</p>
                                <p className="font-medium text-stone-700 text-[10px]">
                                    {user?.parentContact}
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] text-stone-400">Parent/Guardian Relationship</p>
                                <p className="font-medium text-stone-700 text-[10px]">
                                    {user?.parentRelationship}
                                </p>
                            </div>

                           

                        </div>
                    </div>
                    )}

                    {/* Account Information */}
                    <div className="mb-8">
                        <h3 className="text-sm font-semibold text-stone-700 mb-4">
                            Account Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div>
                                <p className="text-[10px] text-stone-400">Email</p>
                                <p className="font-medium text-stone-700 text-[10px]">
                                    {user?.email}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] text-stone-400">
                                    Password Status
                                </p>

                                <span
                                    className={`px-3 py-1 rounded-full text-[10px] font-medium ${
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
                {/* Footer */}
                <div className="bg-stone-50 flex justify-end items-center border-t border-stone-300 p-4">
                    <button className="bg-stone-800 py-2 px-4 rounded-lg gap-1 flex hover:bg-stone-900 cursor-pointer"
                    onClick={onClose}>
                        <X size={15} className="text-white"/>
                        <h1 className="text-[10px] text-white">Close</h1>
                    </button>
                </div>

            </div>

        </section>
    )
}

export default View_Student_Modal;