
const LogbookViewModal = ({ log, onClose }) => {
      return(
        <>
        <section className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">

            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
                    <div>
                        <h2 className="text-sm font-semibold text-stone-800">
                            Visitor Log Details
                        </h2>
                        <p className="text-[10px] text-stone-400 mt-0.5">
                            View visitor information
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-stone-400 hover:text-stone-700 text-lg"
                    >
                        ×
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-5">

                    {/* Visitor Information */}
                    <div className="flex flex-col">
                        <h3 className="text-[10px] font-semibold uppercase tracking-wide text-stone-500 mb-3">
                            Visitor Information
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">

                            <div>
                                <p className="text-[10px] text-stone-400">Name</p>
                                <p className="text-xs font-medium text-stone-800">
                                    {log?.name || "N/A"}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] text-stone-400">Contact</p>
                                <p className="text-xs font-medium text-stone-800">
                                    {log?.contact || "N/A"}
                                </p>
                            </div>

                            <div className="">
                                <p className="text-[10px] text-stone-400">Address</p>
                                <p className="text-xs font-medium text-stone-800">
                                    {log?.address || "N/A"}
                                </p>
                            </div>
                        </div>
                        <div className="">
                                <p className="text-[10px] text-stone-400">Purpose</p>
                                <p className="text-xs font-medium text-stone-500 p-2 bg-stone-100 rounded-lg">
                                    {log?.purpose || "N/A"}
                                </p>
                            </div>
                    </div>

                    {/* Visit Information */}
                    <div>
                        <h3 className="text-[10px] font-semibold uppercase tracking-wide text-stone-500 mb-3">
                            Visit Information
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                            <div>
                                <p className="text-[10px] text-stone-400">Date</p>
                                <p className="text-xs font-medium text-stone-800">
                                    {new Date(log?.createdAt).toDateString() || "N/A"}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] text-stone-400">Time In</p>
                                <p className="text-xs font-medium text-stone-800">
                                    {new Date(log?.createdAt).toLocaleTimeString() || "N/A"}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] text-stone-400">Time Out</p>
                                <p className="text-xs font-medium text-stone-800">
                                    {new Date(log?.leaveTime).toLocaleTimeString() || "Not yet leaving"}
                                </p>
                            </div>

                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex justify-end">

                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-xs font-medium text-white bg-stone-800 hover:bg-stone-700 rounded-lg transition"
                    >
                        Close
                    </button>

                </div>

            </div>

        </section>
        </>
      )
}
export default LogbookViewModal