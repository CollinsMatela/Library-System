import { BookA, Calendar, CheckCheck, CircleCheck, ClockFading, User } from "lucide-react";

/* One book that is currently out with a borrower. */
const BorrowedRow = ({ borrow, ReturnBorrow }) => (
    <div className="w-full flex flex-col sm:flex-row sm:items-center gap-3 bg-white border border-stone-200 rounded-lg p-3 hover:border-stone-200 hover:shadow transition">
        {/* Status icon, book title and who has it */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="h-9 w-9 rounded-lg bg-orange-500 text-white shrink-0 flex items-center justify-center">
                <ClockFading size={16} />
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

        {/* Due date, quantity and status pill */}
        <div className="flex flex-wrap items-center gap-3 sm:w-72 text-[10px] text-stone-600">
            <div className="flex items-center gap-1.5">
                <Calendar size={13} className="shrink-0 text-stone-400" />
                <span>
                    <span className="text-stone-400">Due on</span>{" "}
                    {borrow.returnDate?.split("T")[0]}
                </span>
            </div>

            <div className="flex items-center gap-1.5">
                <BookA size={13} className="shrink-0 text-stone-400" />
                <span>
                    <span className="text-stone-400">Qty</span> {borrow.quantity}
                </span>
            </div>

            <span className="inline-flex px-2 py-0.5 rounded-full border bg-orange-50 text-orange-700 border-orange-200 font-medium">
                Borrowed
            </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:justify-end ml-auto sm:ml-0">
            <button
                type="button"
                onClick={() => ReturnBorrow(borrow)}
                className="text-[10px] text-white bg-stone-800 hover:bg-stone-900 px-3 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
            >
                <CircleCheck size={15} />
                Return
            </button>
        </div>
    </div>
);

const BorrowedTable = ({ Borrowed, ReturnBorrow }) => {
    return (
        <div className="w-full flex flex-col gap-2.5">
            {Borrowed.length > 0 ? (
                Borrowed.map((borrow) => (
                    <BorrowedRow key={borrow._id} borrow={borrow} ReturnBorrow={ReturnBorrow} />
                ))
            ) : (
                <div className="w-full py-8 px-4 bg-stone-50 rounded-lg border border-dashed border-stone-300 flex flex-col items-center justify-center">
                    <h1 className="text-xs font-semibold text-stone-700">No borrowed books.</h1>
                    <h1 className="text-[10px] text-stone-500 mt-1">
                        Books go here once an approved request is submitted.
                    </h1>
                </div>
            )}
        </div>
    );
};

export default BorrowedTable;
