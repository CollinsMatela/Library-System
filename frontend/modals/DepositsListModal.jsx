import {
  Calendar,
  CheckCircle2,
  Clock,
  Hash,
  IdCard,
  Inbox,
  Search,
  User,
  X,
} from "lucide-react";

const depositsListModal = ({ deposits, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4">

      <div className="w-full max-w-3xl max-h-[85vh] flex flex-col bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden">

        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-stone-200 shrink-0">

          <div className="flex items-start gap-3">
            <div className="bg-stone-800 p-2 rounded-lg text-white flex justify-center items-center">
              <IdCard size={18} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-stone-800">
                ID Deposits
              </h2>

              <p className="text-xs text-stone-500 mt-1">
                Physical IDs collected as collateral for borrowed books.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-stone-500 hover:bg-stone-100 hover:text-stone-800 transition cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

        </div>

        {/* Toolbar */}
        <div className="px-6 py-4 border-b border-stone-200 bg-stone-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shrink-0">

          {/* Search */}
          <div className="relative w-full sm:max-w-xs">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
            />

            <input
              type="text"
              readOnly
              placeholder="Search name or ID number"
              className="w-full border border-stone-300 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-500 outline-none bg-white focus:ring-2 focus:ring-stone-300"
            />
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              className="px-3 py-2 text-xs font-medium rounded-xl bg-stone-800 text-white cursor-pointer transition"
            >
              All
            </button>

            <button
              type="button"
              className="px-3 py-2 text-xs font-medium rounded-xl bg-white border border-stone-300 text-stone-500 hover:bg-stone-200 transition cursor-pointer"
            >
              Held
            </button>

            <button
              type="button"
              className="px-3 py-2 text-xs font-medium rounded-xl bg-white border border-stone-300 text-stone-500 hover:bg-stone-200 transition cursor-pointer"
            >
              Returned
            </button>
          </div>

        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4">

          {deposits.length > 0 ? (
            <div className="flex flex-col gap-2">
              {deposits.map((deposit) => (
                <div
                  key={deposit._id}
                  className="w-full rounded-lg bg-stone-50 border border-stone-300 p-3 flex flex-col gap-3"
                >

                  {/* Identity + status */}
                  <div className="w-full flex justify-between items-start gap-2">

                    <div className="flex items-start gap-2 min-w-0">
                      <div className="bg-stone-800 p-2 rounded-lg text-white flex justify-center items-center shrink-0">
                        <IdCard size={15} />
                      </div>

                      <div className="flex flex-col gap-1 min-w-0">
                        <h3 className="text-xs font-semibold text-stone-800 flex items-center gap-1.5 break-words">
                          <User size={12} className="text-stone-400 shrink-0" />
                          {deposit.idName || "N/A"}
                        </h3>

                        <div className="flex items-center gap-3 flex-wrap">
                          <p className="text-[10px] text-stone-500 flex items-center gap-1">
                            <IdCard size={11} className="text-stone-400" />
                            {deposit.idType || "N/A"}
                          </p>

                          <p className="text-[10px] text-stone-500 flex items-center gap-1">
                            <Hash size={11} className="text-stone-400" />
                            {deposit.idNumber || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Status badge */}
                    <span
                      className={`shrink-0 inline-flex items-center gap-1 border rounded-lg px-2 py-1 text-[10px] font-medium ${
                        deposit.status === "returned"
                          ? "text-green-600 bg-green-100 border-green-200"
                          : "text-amber-600 bg-amber-100 border-amber-200"
                      }`}
                    >
                      {deposit.status === "returned" ? (
                        <CheckCircle2 size={11} />
                      ) : (
                        <Clock size={11} />
                      )}
                      {deposit.status === "returned" ? "Returned" : "Held"}
                    </span>

                  </div>

                  {/* Dates */}
                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-stone-300 pt-3">

                    <div className="flex flex-col">
                      <p className="text-[10px] text-stone-400 flex items-center gap-1">
                        <Calendar size={11} />
                        Deposited
                      </p>

                      <p className="text-xs text-stone-700 mt-0.5">
                        {deposit.depositDate
                          ? new Date(deposit.depositDate).toDateString()
                          : "N/A"}
                      </p>
                    </div>

                    <div className="flex flex-col">
                      <p className="text-[10px] text-stone-400 flex items-center gap-1">
                        <Calendar size={11} />
                        Returned
                      </p>

                      <p className="text-xs text-stone-700 mt-0.5">
                        {deposit.returnedDate
                          ? new Date(deposit.returnedDate).toDateString()
                          : "Not returned"}
                      </p>
                    </div>

                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="w-full flex flex-col justify-center items-center py-10 bg-stone-50 border border-stone-200 rounded-xl">
              <div className="bg-stone-100 p-3 rounded-full text-stone-400">
                <Inbox size={20} />
              </div>

              <h3 className="text-xs text-stone-700 font-semibold mt-3">
                No deposits recorded yet.
              </h3>

              <p className="text-[10px] text-stone-500 mt-1">
                IDs collected for borrowing will appear here.
              </p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="flex justify-between items-center px-6 py-4 bg-stone-50 border-t border-stone-200 shrink-0">

          <p className="text-xs text-stone-500">
            {deposits.length} record{deposits.length === 1 ? "" : "s"}
          </p>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-sm font-medium text-white bg-stone-800 hover:bg-stone-900 rounded-xl transition cursor-pointer"
          >
            Close
          </button>

        </div>

      </div>
    </div>
  );
};

export default depositsListModal;