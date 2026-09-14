
import { Check } from "lucide-react";

const LibrarianAccount = ({ account, onClose }) => {
    return (
        <div className="fixed inset-0 z-150 flex items-center justify-center bg-black/50 p-4">

            {/* Modal */}
            <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl border border-stone-300">

                {/* Header */}
                <div className="border-b border-stone-300 px-5 py-4">
                    <h1 className="text-lg font-bold text-stone-800">
                        Save this account
                    </h1>
                </div>

                {/* Body */}
                <div className="p-5">

                    {/* Important Notice */}
                    <div className="rounded-xl border border-yellow-500 bg-yellow-100 p-4">
                        <h2 className="mb-2 text-lg font-bold text-yellow-800">
                            Important Notice
                        </h2>

                        <div className="space-y-2 text-xs leading-relaxed text-yellow-700">
                            <p>
                                This is the{" "}
                                <span className="font-semibold">
                                    only time
                                </span>{" "}
                                you will see the account password.
                            </p>

                            <p>
                                Please make sure to{" "}
                                <span className="font-semibold">
                                    save or copy it now
                                </span>
                                . You will not be able to view this password
                                again after closing this window.
                            </p>

                            <p>
                                If the password is lost, the account will need
                                to be reset by an administrator.
                            </p>
                        </div>
                    </div>

                    {/* Account Details */}
                    <div className="mt-5">
                        <h2 className="mb-3 text-sm font-bold text-stone-800">
                            Account Details
                        </h2>

                        <div className="space-y-3 rounded-xl border border-stone-200 bg-stone-50 p-4">

                            {/* Name */}
                            <div>
                                <p className="text-[11px] font-medium text-stone-400">
                                    Name
                                </p>

                                <p className="text-xs text-stone-700">
                                    {account?.role?.toUpperCase() || "—"}{" "}
                                    {account?.fullname || "—"}
                                </p>
                            </div>

                            {/* Email */}
                            <div>
                                <p className="text-[11px] font-medium text-stone-400">
                                    Email
                                </p>

                                <p className="text-xs text-stone-700 break-all">
                                    {account?.email || "—"}
                                </p>
                            </div>

                            {/* Password */}
                            <div>
                                <p className="text-[11px] font-medium text-stone-400">
                                    Password
                                </p>

                                <p className="text-xs font-semibold text-stone-800 break-all">
                                    {account?.tempPassword || "—"}
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end border-t border-stone-300 p-4">
                    <button
                        onClick={onClose}
                        className="flex items-center justify-center gap-2 rounded-lg bg-stone-800 px-4 py-2 text-xs font-medium text-white transition hover:bg-stone-900 cursor-pointer"
                    >
                        <Check size={15} />
                        Confirm
                    </button>
                </div>

            </div>
        </div>
    );
};

export default LibrarianAccount;


