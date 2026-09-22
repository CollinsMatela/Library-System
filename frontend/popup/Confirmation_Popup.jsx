
import { Check, X, TriangleAlert } from "lucide-react";

const Confirmation_Popup = ({ errorMessage, message, onConfirm, onCancel }) => {
    return (
        <section className="fixed inset-0 z-9999 flex items-center justify-center p-4">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

            {/* Modal */}
            <div className="relative w-full max-w-sm rounded-2xl bg-white border border-stone-200 shadow-2xl overflow-hidden">

                {/* Header */}
                <div className="flex items-center gap-3 px-6 pt-6">
                    <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                        <TriangleAlert
                            size={19}
                            className="text-amber-600"
                        />
                    </div>

                    <div>
                        <h2 className="text-sm font-semibold text-stone-800">
                            Confirmation
                        </h2>

                        <p className="text-[11px] text-stone-400 mt-0.5">
                            Please confirm your action
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="px-6 pt-5 pb-6">
                    {errorMessage ? (
                        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                            <p className="text-xs leading-relaxed text-red-600">
                                {errorMessage}
                            </p>
                        </div>
                    ) : (
                        <p className="text-sm leading-relaxed text-stone-600">
                            {message || "Are you sure you want to proceed?"}
                        </p>
                    )}
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 px-6 py-4 bg-stone-50 border-t border-stone-200">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="h-9 px-4 rounded-lg border border-stone-200 bg-white text-xs font-medium text-stone-600 flex items-center gap-2 hover:bg-stone-100 transition cursor-pointer"
                    >
                        <X size={14} />
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        className="h-9 px-4 rounded-lg bg-stone-900 text-white text-xs font-medium flex items-center gap-2 hover:bg-stone-800 transition cursor-pointer"
                    >
                        <Check size={14} />
                        Confirm
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Confirmation_Popup;

