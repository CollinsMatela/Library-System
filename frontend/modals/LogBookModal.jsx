
import { useEffect } from "react";
import { LoaderCircle, Plus, UserPlus, X } from "lucide-react";

/* Marks the fields the parent validates before registering. */
const Required = () => <span className="text-red-500" aria-hidden="true">*</span>;

const LogBookModal = ({ logBook, setLogBook, confirmation, onClose, isSubmitting = false }) => {

    /* Close on Escape (unless a save is in progress) and lock the page
        scroll while the modal is open. Same pattern as ReportModal. */
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape" && !isSubmitting) onClose?.();
        };

        window.addEventListener("keydown", handleEscape);

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = previousOverflow;
        };
    }, [onClose, isSubmitting]);

    /* Clicking the dark backdrop closes the modal, but never mid-submit. */
    const handleBackdropClick = () => {
        if (!isSubmitting) onClose?.();
    };

    const updateField = (field) => (event) =>
        setLogBook((prev) => ({
            ...prev,
            [field]: event.target.value
        }));

    /* Shared look, written once for every input/select/textarea. */
    const fieldClass =
        "w-full text-xs bg-white border border-stone-300 rounded-lg px-3 py-2.5 outline-none transition focus:border-stone-500 focus:ring-2 focus:ring-stone-200 placeholder:text-stone-400";

    const labelClass = "flex items-center gap-1 text-xs font-medium text-stone-700";

    return (
        <section
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] flex items-center justify-center p-4"
            onClick={handleBackdropClick}
        >

            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="logbook-modal-title"
                onClick={(event) => event.stopPropagation()}
                className="bg-white border border-stone-300 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-hidden shadow-xl flex flex-col animate-[modal-in_0.2s_ease-out]"
            >

                {/* Header */}
                <div className="flex items-start justify-between gap-3 p-5 border-b border-stone-200">

                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-100">
                            <UserPlus size={19} className="text-stone-600" />
                        </div>

                        <div>
                            <h1 id="logbook-modal-title" className="text-sm font-bold text-stone-900">
                                Register Visitor
                            </h1>

                            <p className="text-xs text-stone-500 mt-0.5">
                                Enter the visitor's information and purpose of visit.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        aria-label="Close"
                        disabled={isSubmitting}
                        onClick={onClose}
                        className="p-2 -m-1 rounded-lg text-stone-500 hover:bg-stone-100 hover:text-stone-800 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Form */}
                <div className="p-5 flex flex-col gap-4 overflow-y-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        {/* Name */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="logbook-name" className={labelClass}>
                                Visitor Name <Required />
                            </label>

                            <input
                                id="logbook-name"
                                type="text"
                                required
                                autoFocus
                                placeholder="Enter visitor's full name"
                                className={fieldClass}
                                value={logBook.name}
                                onChange={updateField("name")}
                            />
                        </div>

                        {/* Address */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="logbook-address" className={labelClass}>
                                Address <Required />
                            </label>

                            <input
                                id="logbook-address"
                                type="text"
                                required
                                placeholder="Enter visitor's address"
                                className={fieldClass}
                                value={logBook.address}
                                onChange={updateField("address")}
                            />
                        </div>

                        {/* Contact */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="logbook-contact" className={labelClass}>
                                Contact Number <Required />
                            </label>

                            <input
                                id="logbook-contact"
                                type="tel"
                                required
                                placeholder="Enter contact number"
                                className={fieldClass}
                                value={logBook.contact}
                                onChange={updateField("contact")}
                            />
                        </div>

                        {/* Gender */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="logbook-gender" className={labelClass}>
                                Gender
                            </label>

                            <select
                                id="logbook-gender"
                                className={fieldClass}
                                value={logBook.gender || ""}
                                onChange={updateField("gender")}
                            >
                                <option value="">Select gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                        {/* Age */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="logbook-age" className={labelClass}>
                                Age
                            </label>

                            <input
                                id="logbook-age"
                                type="number"
                                min="0"
                                placeholder="Enter age"
                                className={fieldClass}
                                value={logBook.age || ""}
                                onChange={updateField("age")}
                            />
                        </div>

                        {/* Purpose */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="logbook-purpose" className={labelClass}>
                                Purpose of Visit <Required />
                            </label>

                            <textarea
                                id="logbook-purpose"
                                placeholder="e.g. Reading, research, borrowing, inquiry..."
                                rows={3}
                                required
                                className={`${fieldClass} resize-none`}
                                value={logBook.purpose}
                                onChange={updateField("purpose")}
                            />
                        </div>

                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-4 border-t border-stone-200 bg-stone-50">

                    <button
                        type="button"
                        disabled={isSubmitting}
                        className="text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded-lg px-3 py-2 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    {/* Disabled while saving so a double click cannot
                        register the same visitor twice. */}
                    <button
                        type="button"
                        disabled={isSubmitting}
                        className="flex items-center gap-1.5 text-xs font-medium text-white bg-stone-800 hover:bg-stone-900 rounded-lg px-4 py-2 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={confirmation}
                    >
                        {isSubmitting
                            ? <LoaderCircle size={15} className="animate-spin" />
                            : <Plus size={15} />
                        }
                        {isSubmitting ? "Registering..." : "Register Visitor"}
                    </button>

                </div>

            </div>
        </section>
    );
};

export default LogBookModal;
