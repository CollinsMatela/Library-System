import { Calendar, Check, CircleCheck, Ellipsis, Trash, User, X } from "lucide-react";

/* One pending request card. */
const PendingRow = ({ borrow, approveBorrow, deleteBorrow }) => (
    <div className="w-full flex flex-col sm:flex-row sm:items-center gap-3 bg-white border border-stone-200 rounded-lg p-3 hover:border-stone-200 hover:shadow transition">
        {/* Status icon, book title and who asked for it */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="h-9 w-9 rounded-lg bg-amber-500 text-white shrink-0 flex items-center justify-center">
                <Ellipsis size={16} />
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

        {/* Request date + status pill */}
        <div className="flex flex-wrap items-center gap-3 sm:w-64 text-[10px] text-stone-600">
            <div className="flex items-center gap-1.5">
                <Calendar size={13} className="shrink-0 text-stone-400" />
                <span>
                    <span className="text-stone-400">Requested on</span>{" "}
                    {borrow.createdAt?.split("T")[0]}
                </span>
            </div>

            <span className="inline-flex px-2 py-0.5 rounded-full border bg-amber-50 text-amber-700 border-amber-200 font-medium">
                Pending
            </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:justify-end ml-auto sm:ml-0">
            <button
                type="button"
                aria-label={`Decline ${borrow.title}`}
                title="Decline request"
                onClick={() => deleteBorrow(borrow)}
                className="p-2 bg-white hover:bg-red-200 text-red-600 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
            >
                <Trash size={15} />
            </button>

            <button
                type="button"
                onClick={() => approveBorrow(borrow)}
                className="text-[10px] text-white bg-stone-800 hover:bg-stone-900 px-3 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
            >
                <CircleCheck size={15} />
                Approve
            </button>
        </div>
    </div>
);

const PendingTable = ({ Pendings, approveBorrow, deleteBorrow }) => {
    return (
        <div className="w-full flex flex-col gap-2.5">
            {Pendings.length > 0 ? (
                Pendings.map((borrow) => (
                    <PendingRow
                        key={borrow._id}
                        borrow={borrow}
                        approveBorrow={approveBorrow}
                        deleteBorrow={deleteBorrow}
                    />
                ))
            ) : (
                <div className="w-full py-8 px-4 bg-stone-50 rounded-lg border border-dashed border-stone-300 flex flex-col items-center justify-center">
                    <h1 className="text-xs font-semibold text-stone-700">No pending requests.</h1>
                    <h1 className="text-[10px] text-stone-500 mt-1">
                        New borrow requests will appear here.
                    </h1>
                </div>
            )}
        </div>
    );
};

export default PendingTable;
