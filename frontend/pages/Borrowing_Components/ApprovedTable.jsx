import { Calendar, Check, CircleCheck, Trash, User, X } from "lucide-react";

/* One approved request waiting to be picked up. */
const ApprovedRow = ({ borrow, openSubmitPopup, deleteBorrow }) => (
    <div className="w-full flex flex-col sm:flex-row sm:items-center gap-3 bg-white border border-stone-200 rounded-lg p-3 hover:border-stone-200 hover:shadow transition">
        {/* Status icon, book title and who asked for it */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="h-9 w-9 rounded-lg bg-indigo-600 text-white shrink-0 flex items-center justify-center">
                <Check size={16} />
            </div>

            <div className="min-w-0">
                <p className="text-xs font-semibold text-stone-800 truncate">{borrow.title}</p>
                <div className="flex items-center gap-1.5 mt-1">
                    <User size={12} className="text-stone-400 shrink-0" />
                    <p className="text-[10px] text-stone-500 truncate">
                        {borrow.name}
                    </p>
                </div>
            </div>
        </div>

        {/* Approved date + status pill */}
        <div className="flex flex-wrap items-center gap-3 md:w-64 text-[10px] text-stone-600">
            <div className="flex items-center gap-1.5">
                <Calendar size={13} className="shrink-0 text-stone-400" />
                <span>
                    <span className="text-stone-400">Approved on</span>{" "}
                    {borrow.updatedAt?.split("T")[0]}
                </span>
            </div>

            <span className="inline-flex px-2 py-0.5 rounded-full border bg-indigo-50 text-indigo-700 border-indigo-200 font-medium">
                Approved
            </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:justify-end ml-auto sm:ml-0">
            <button
                type="button"
                aria-label={`Delete ${borrow.title}`}
                title="Delete request"
                onClick={() => deleteBorrow(borrow)}
                className="p-2 bg-white hover:bg-red-200 text-red-600 rounded-lg flex items-center justify-center cursor-pointer transition-colors shrink-0"
            >
                <Trash size={15} />
            </button>

            <button
                type="button"
                onClick={() => openSubmitPopup(borrow)}
                className="flex-1 sm:flex-none text-[10px] text-white bg-stone-800 hover:bg-stone-900 px-3 py-2 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
                <CircleCheck size={15} />
                Submit
            </button>
        </div>
    </div>
);

const ApprovedTable = ({ Approved, openSubmitPopup, deleteBorrow }) => {
    return (
        <div className="w-full flex flex-col gap-2.5">
            {Approved.length > 0 ? (
                Approved.map((borrow) => (
                    <ApprovedRow
                        key={borrow._id}
                        borrow={borrow}
                        openSubmitPopup={openSubmitPopup}
                        deleteBorrow={deleteBorrow}
                    />
                ))
            ) : (
                <div className="w-full py-8 px-4 bg-stone-50 rounded-lg border border-dashed border-stone-300 flex flex-col items-center justify-center">
                    <h1 className="text-xs font-semibold text-stone-700">No approved requests.</h1>
                    <h1 className="text-[10px] text-stone-500 mt-1">
                        Approve a pending request first.
                    </h1>
                </div>
            )}
        </div>
    );
};

export default ApprovedTable;
