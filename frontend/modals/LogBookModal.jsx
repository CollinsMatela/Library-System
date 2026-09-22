
import { ArrowLeft, Plus } from "lucide-react";
import { toast } from "react-toastify";

const LogBookModal = ({ logBook, setLogBook, confirmation, onClose }) => {

    return (
        <section className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] flex items-center justify-center p-4">

            <div className="bg-white border border-stone-300 rounded-2xl w-full max-w-lg overflow-hidden shadow-xl">

                {/* Header */}
                <div className="p-5 border-b border-stone-200">
                    <h1 className="text-sm font-bold text-stone-900">
                        Register Visitor
                    </h1>

                    <p className="text-xs text-stone-500 mt-1">
                        Enter the visitor's information and purpose of visit.
                    </p>
                </div>

                {/* Form */}
                <div className="p-5 flex flex-col gap-4">

                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-stone-700">
                            Visitor Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter visitor's full name"
                            className="w-full text-xs bg-white border border-stone-300 rounded-lg px-3 py-2.5 outline-none transition focus:border-stone-500 focus:ring-2 focus:ring-stone-200"
                            value={logBook.name}
                            onChange={(e) =>
                                setLogBook((prev) => ({
                                    ...prev,
                                    name: e.target.value
                                }))
                            }
                        />
                    </div>

                    {/* Address */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-stone-700">
                            Address
                        </label>

                        <input
                            type="text"
                            placeholder="Enter visitor's address"
                            className="w-full text-xs bg-white border border-stone-300 rounded-lg px-3 py-2.5 outline-none transition focus:border-stone-500 focus:ring-2 focus:ring-stone-200"
                            value={logBook.address}
                            onChange={(e) =>
                                setLogBook((prev) => ({
                                    ...prev,
                                    address: e.target.value
                                }))
                            }
                        />
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-stone-700">
                            Contact Number
                        </label>

                        <input
                            type="tel"
                            placeholder="Enter contact number"
                            className="w-full text-xs bg-white border border-stone-300 rounded-lg px-3 py-2.5 outline-none transition focus:border-stone-500 focus:ring-2 focus:ring-stone-200"
                            value={logBook.contact}
                            onChange={(e) =>
                                setLogBook((prev) => ({
                                    ...prev,
                                    contact: e.target.value
                                }))
                            }
                        />
                    </div>

                    {/* Purpose */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-stone-700">
                            Purpose of Visit
                        </label>

                        <textarea
                            placeholder="e.g. Reading, research, borrowing, inquiry..."
                            rows={3}
                            className="w-full resize-none text-xs bg-white border border-stone-300 rounded-lg px-3 py-2.5 outline-none transition focus:border-stone-500 focus:ring-2 focus:ring-stone-200"
                            value={logBook.purpose}
                            onChange={(e) =>
                                setLogBook((prev) => ({
                                    ...prev,
                                    purpose: e.target.value
                                }))
                            }
                        />
                    </div>

                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-4 border-t border-stone-200 bg-stone-50">

                    <button
                        type="button"
                        className="flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded-lg px-3 py-2 transition cursor-pointer"
                        onClick={onClose}
                    >
                        <ArrowLeft size={15} />
                        Back
                    </button>

                    <button
                        type="button"
                        className="flex items-center gap-1.5 text-xs font-medium text-white bg-stone-800 hover:bg-stone-900 rounded-lg px-4 py-2 transition cursor-pointer"
                        onClick={confirmation}
                    >
                        <Plus size={15} />
                        Register Visitor
                    </button>

                </div>

            </div>
        </section>
    );
};

export default LogBookModal;

