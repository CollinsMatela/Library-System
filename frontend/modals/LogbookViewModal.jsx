import { useEffect, useState } from "react";
import { Clock, FileText, LogIn, LogOut, MapPin, Phone, User, X } from "lucide-react";

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

// Turn a millisecond gap into "47m", "1h 24m" or "2d 3h".
const formatDuration = (ms) => {
    if (!Number.isFinite(ms) || ms < 0) return "—";

    const totalMinutes = Math.floor(ms / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
};

// "JD" from "John Doe" — falls back to a generic visitor mark.
const getInitials = (name) => {
    const parts = (name || "").trim().split(/\s+/).filter(Boolean);

    if (parts.length === 0) return "V";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

/* One labelled field with a small icon, used for every visitor detail. */
const DetailRow = ({ icon: Icon, label, children }) => (
    <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-stone-500">
            <Icon size={14} />
        </span>

        <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-stone-400">
                {label}
            </p>
            <p className="text-sm text-stone-800 break-words">{children}</p>
        </div>
    </div>
);

const LogbookViewModal = ({ log, onClose }) => {
    // A visitor with no leaveTime has not left yet. This has to be checked
    // before turning the date into text, because new Date(null) is 1970
    // and would happily print "Jan 1, 1970, 12:00 AM".
    const isInside = !log?.leaveTime;

    /* Keeps "still inside for X" ticking while the modal stays open. */
    const [now, setNow] = useState(() => Date.now());

    useEffect(() => {
        if (!isInside) return undefined;

        const timer = window.setInterval(() => setNow(Date.now()), 30000);
        return () => window.clearInterval(timer);
    }, [isInside]);

    /* Close on Escape and lock the page scroll while the modal is open.
        Same pattern as LogBookModal and ReportModal. */
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") onClose?.();
        };

        window.addEventListener("keydown", handleEscape);

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = previousOverflow;
        };
    }, [onClose]);

    /* Clicking the dark backdrop closes the modal. */
    const handleBackdropClick = () => onClose?.();

    /* Visit length: finished visits measure in/out, open visits measure
        from time in up to the latest tick of the clock above. */
    const timeIn = log?.createdAt ? new Date(log.createdAt).getTime() : null;
    const timeOut = log?.leaveTime ? new Date(log.leaveTime).getTime() : null;
    const durationMs = timeIn ? (timeOut ?? now) - timeIn : null;

    return (
        <section
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] flex items-center justify-center p-4"
            onClick={handleBackdropClick}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="logbook-view-modal-title"
                onClick={(event) => event.stopPropagation()}
                className="bg-white border border-stone-300 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden shadow-2xl flex flex-col animate-[modal-in_0.2s_ease-out]"
            >
                {/* Header */}
                <div className="flex items-start justify-between gap-3 p-5 border-b border-stone-200">
                    <div className="flex items-start gap-3 min-w-0">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-stone-800 text-white text-sm font-semibold">
                            {getInitials(log?.name)}
                        </div>

                        <div className="min-w-0">
                            <h1
                                id="logbook-view-modal-title"
                                className="text-sm font-bold text-stone-900 truncate"
                            >
                                {log?.name || "Visitor"}
                            </h1>
                            <p className="text-xs text-stone-400 mt-0.5">
                                Visitor log · In {formatDateTime(log?.createdAt)}
                            </p>
                        </div>
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
                                    isInside
                                        ? "bg-green-600 animate-pulse"
                                        : "bg-stone-400"
                                }`}
                            />
                            {isInside ? "Inside" : "Left"}
                        </span>

                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close"
                            autoFocus
                            className="p-2 rounded-lg text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition cursor-pointer"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>

                {/* Content — scrolls on its own so the footer stays reachable */}
                <div className="p-5 space-y-6 overflow-y-auto">

                    {/* Visitor Information */}
                    <section aria-label="Visitor information">
                        <h2 className="text-xs font-semibold uppercase tracking-wide text-stone-500 mb-3">
                            Visitor Information
                        </h2>

                        <div className="space-y-4">
                            <DetailRow icon={Phone} label="Contact">
                                {log?.contact || "—"}
                            </DetailRow>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <DetailRow icon={User} label="Gender">
                                    {log?.gender || "—"}
                                </DetailRow>

                                <DetailRow icon={Clock} label="Age">
                                    {log?.age ?? "—"}
                                </DetailRow>
                            </div>

                            <DetailRow icon={MapPin} label="Address">
                                {log?.address || "—"}
                            </DetailRow>

                            <DetailRow icon={FileText} label="Purpose">
                                {log?.purpose || "—"}
                            </DetailRow>
                        </div>
                    </section>

                    {/* Visit Information */}
                    <section aria-label="Visit information">
                        <h2 className="text-xs font-semibold uppercase tracking-wide text-stone-500 mb-3">
                            Visit Information
                        </h2>

                        <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 space-y-3">
                            <div className="flex items-start gap-3">
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white border border-stone-200 text-green-600">
                                    <LogIn size={14} />
                                </span>
                                <div className="min-w-0">
                                    <p className="text-[10px] font-semibold uppercase tracking-wide text-stone-400">
                                        Time In
                                    </p>
                                    <p className="text-sm font-medium text-stone-800">
                                        {formatDateTime(log?.createdAt)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <span
                                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white border border-stone-200 ${
                                        isInside ? "text-stone-400" : "text-stone-600"
                                    }`}
                                >
                                    <LogOut size={14} />
                                </span>
                                <div className="min-w-0">
                                    <p className="text-[10px] font-semibold uppercase tracking-wide text-stone-400">
                                        Time Out
                                    </p>
                                    <p className="text-sm font-medium text-stone-800">
                                        {isInside
                                            ? `Still inside · ${formatDuration(now - (timeIn ?? now))}`
                                            : formatDateTime(log?.leaveTime)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 border-t border-stone-200 pt-3">
                                <span className="text-xs font-medium text-stone-500">
                                    Visit duration
                                </span>
                                <span className="h-px flex-1 bg-stone-200" />
                                <span className="text-xs font-semibold text-stone-800">
                                    {formatDuration(durationMs)}
                                </span>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <div className="px-5 py-4 bg-stone-50 border-t border-stone-200 flex justify-end">
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
    );
};

export default LogbookViewModal;
