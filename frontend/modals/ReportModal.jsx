import { useEffect } from "react";
import { Check, FileText, LoaderCircle, X } from "lucide-react";
import ReportFirstContainer from "../components/Report_Components/ReportFirstContainer"
import ReportSecondContainer from "../components/Report_Components/ReportSecondContainer"
import ReportThirdComponent from "../components/Report_Components/ReportThirdContainer"
import ReportHeaderContainer from "../components/Report_Components/ReportHeaderContainer"

const ReportModal = ({ reportData, setReportData, onClose, onSave, isSaving = false }) => {

    /* --- Effects --- */

    // Close on Escape (unless a save is in progress) and lock the page
    // scroll while the modal is open.
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape" && !isSaving) onClose?.();
        };

        window.addEventListener("keydown", handleEscape);

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = previousOverflow;
        };
    }, [onClose, isSaving]);

    return (
        <section
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={() => !isSaving && onClose?.()}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="report-modal-title"
                onClick={(event) => event.stopPropagation()}
                className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-2xl"
            >
                {/* Header */}
                <header className="flex items-start justify-between gap-3 border-b border-stone-200 px-6 py-5">
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-100">
                            <FileText size={19} className="text-stone-600" />
                        </div>

                        <div>
                            <h2 id="report-modal-title" className="text-sm font-semibold text-stone-800">
                                Create a Monthly Report
                            </h2>

                            <p className="mt-0.5 text-[11px] text-stone-400">
                                Fill in the library operations and usage statistics.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSaving}
                        aria-label="Close report form"
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-stone-400 transition cursor-pointer hover:bg-stone-100 hover:text-stone-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <X size={16} />
                    </button>
                </header>

                {/* Body */}
                <div className="flex-1 overflow-y-auto space-y-4 my-4">
                    <ReportHeaderContainer
                        reportData={reportData}
                        setReportData={setReportData}
                    />

                    <ReportFirstContainer
                        reportData={reportData}
                        setReportData={setReportData}
                    />

                    <ReportSecondContainer
                        reportData={reportData}
                        setReportData={setReportData}
                    />

                    <ReportThirdComponent
                        reportData={reportData}
                        setReportData={setReportData}
                    />
                </div>

                {/* Footer */}
                <footer className="flex flex-col gap-3 border-t border-stone-200 bg-stone-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[11px] text-stone-400">
                        Totals are calculated automatically.
                    </p>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSaving}
                            className="flex h-9 items-center gap-2 rounded-lg border border-stone-200 bg-white px-4 text-xs font-medium text-stone-600 transition cursor-pointer hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <X size={14} />
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={onSave}
                            disabled={isSaving}
                            className="flex h-9 items-center gap-2 rounded-lg bg-stone-900 px-4 text-xs font-medium text-white transition cursor-pointer hover:bg-stone-800 disabled:bg-stone-400 disabled:cursor-not-allowed"
                        >
                            {isSaving
                                ? <LoaderCircle size={14} className="animate-spin" />
                                : <Check size={14} />}
                            {isSaving ? "Saving..." : "Save Report"}
                        </button>
                    </div>
                </footer>
            </div>
        </section>
    )
}
export default ReportModal
