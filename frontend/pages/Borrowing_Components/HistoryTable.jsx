import { BookA, Calendar, CheckCheck, User } from "lucide-react";

/* One finished request: the book has been returned. */
const HistoryRow = ({ borrow }) => (
    <div className="w-full flex flex-col sm:flex-row sm:items-center gap-3 bg-white border border-stone-200 rounded-lg p-3 hover:border-stone-200 hover:shadow transition">
        {/* Status icon, book title and who borrowed it */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="h-9 w-9 rounded-lg bg-emerald-600 text-white shrink-0 flex items-center justify-center">
                <CheckCheck size={16} />
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

        {/* Return date, quantity and status pill */}
        <div className="flex flex-wrap items-center gap-3 sm:w-72 text-[10px] text-stone-600">
            <div className="flex items-center gap-1.5">
                <Calendar size={13} className="shrink-0 text-stone-400" />
                <span>
                    <span className="text-stone-400">Returned on</span>{" "}
                    {borrow.returnDate?.split("T")[0]}
                </span>
            </div>

            <div className="flex items-center gap-1.5">
                <BookA size={13} className="shrink-0 text-stone-400" />
                <span>
                    <span className="text-stone-400">Qty</span> {borrow.quantity}
                </span>
            </div>

            <span className="inline-flex px-2 py-0.5 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200 font-medium">
                Returned
            </span>
        </div>
    </div>
);

const HistoryTable = ({ Returned }) => {
    return (
        <div className="w-full flex flex-col gap-2.5">
            {Returned.length > 0 ? (
                Returned.map((borrow) => <HistoryRow key={borrow._id} borrow={borrow} />)
            ) : (
                <div className="w-full py-8 px-4 bg-stone-50 rounded-lg border border-dashed border-stone-300 flex flex-col items-center justify-center">
                    <h1 className="text-xs font-semibold text-stone-700">No history yet.</h1>
                    <h1 className="text-[10px] text-stone-500 mt-1">
                        Returned books will be recorded here.
                    </h1>
                </div>
            )}
        </div>
    );
};

export default HistoryTable;
