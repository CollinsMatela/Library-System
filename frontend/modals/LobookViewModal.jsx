import { X } from "lucide-react";

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

const LogbookViewModal = ({ log, onClose }) => {
    // A visitor with no leaveTime has not left yet. This has to be checked
    // before turning the date into text, because new Date(null) is 1970
    // and would happily print "Jan 1, 1970, 12:00 AM".
    const isInside = !log?.leaveTime;

    return (
        <>
            <section className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">

                <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">

                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 px-6 py-4 border-b border-stone-200">
                        <div className="min-w-0">
                            <h2 className="text-sm font-semibold text-stone-800">
                                Visitor Log Details
                            </h2>
                            <p className="text-xs text-stone-400 mt-0.5">
                                View visitor information
                            </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                            {/* Green means still in the library, grey means already left */}
                            <span
                                className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-medium ${
                                    isInside
                                        ? "bg-green-50 text-green-700 border-green-200"
                                        : "bg-stone-100 text-stone-500 border-stone-200"
                                }`}
                            >
                                <span
                                    className={`h-1.5 w-1.5 rounded-full ${
                                        isInside ? "bg-green-600" : "bg-stone-400"
                                    }`}
                                />
                                {isInside ? "Inside" : "Left"}
                            </span>

                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="Close"
                                className="p-2 rounded-lg text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition cursor-pointer"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-5">

                        {/* Visitor Information */}
                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-wide text-stone-500 mb-3">
                                Visitor Information
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-stone-400">Name</p>
                                    <p className="text-xs font-medium text-stone-800 break-words">
                                        {log?.name || "—"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-stone-400">Contact</p>
                                    <p className="text-xs font-medium text-stone-800 break-words">
                                        {log?.contact || "—"}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4">
                                <p className="text-xs text-stone-400">Address</p>
                                <p className="text-xs font-medium text-stone-800 break-words">
                                    {log?.address || "—"}
                                </p>
                            </div>

                            <div className="mt-4">
                                <p className="text-xs text-stone-400">Purpose</p>
                                <p className="text-xs text-stone-600 p-2 bg-stone-100 rounded-lg break-words">
                                    {log?.purpose || "—"}
                                </p>
                            </div>
                        </div>

                        {/* Visit Information */}
                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-wide text-stone-500 mb-3">
                                Visit Information
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-stone-400">Time In</p>
                                    <p className="text-xs font-medium text-stone-800">
                                        {formatDateTime(log?.createdAt)}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-stone-400">Time Out</p>
                                    <p className="text-xs font-medium text-stone-800">
                                        {isInside ? "Still inside" : formatDateTime(log?.leaveTime)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-xs font-medium text-white bg-stone-800 hover:bg-stone-900 rounded-lg transition cursor-pointer"
                        >
                            Close
                        </button>
                    </div>

                </div>
            </section>
        </>
    );
};

export default LogbookViewModal;