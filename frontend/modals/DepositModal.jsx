import { useState } from "react";
import { X, Calendar, CheckCircle2 } from "lucide-react";

const IDDepositModal = ({onClose, onConfirm, idForm, setIdForm, depositLoading }) => {
  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4">

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden">

        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-stone-200">

          <div>
            <h2 className="text-lg font-semibold text-stone-800">
              ID Deposit
            </h2>

            <p className="text-xs text-stone-500 mt-1">
              Record the borrower's physical ID before releasing the book.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-stone-500 hover:bg-stone-100 hover:text-stone-800 transition"
          >
            <X size={18} />
          </button>

        </div>

          <div className="p-6 space-y-6">

            {/* ID Information */}
            <div>

              <h3 className="text-xs font-semibold text-stone-700 mb-3">
                ID Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* ID Type */}
                <div>
                  <label className="block text-xs text-stone-600 mb-1.5">
                    ID Type <span className="text-red-500">*</span>
                  </label>

                  <select
                    name="idType"
                    value={idForm.idType}
                    onChange={() => setIdForm({ ...idForm, idType: event.target.value })}
                    className="w-full border border-stone-300 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-stone-300"
                  >
                    <option value="">
                      Select ID type
                    </option>

                    <option value="School ID">
                      School ID
                    </option>

                    <option value="National ID">
                      National ID
                    </option>

                    <option value="Driver's License">
                      Driver's License
                    </option>

                    <option value="Passport">
                      Passport
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>

                {/* ID Number */}
                <div>
                  <label className="block text-xs text-stone-600 mb-1.5">
                    ID Number <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="idNumber"
                    value={idForm.idNumber}
                    onChange={() => setIdForm({ ...idForm, idNumber: event.target.value })}
                    placeholder="Enter ID number"
                    className="w-full border border-stone-300 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-stone-300"
                  />
                </div>

              </div>

              {/* Name */}
              <div className="mt-4">

                <label className="block text-xs text-stone-600 mb-1.5">
                  Name on ID <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="idName"
                  value={idForm.idName}
                  onChange={() => setIdForm({ ...idForm, idName: event.target.value })}
                  placeholder="Enter name exactly as shown on ID"
                  className="w-full border border-stone-300 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-stone-300"
                />

              </div>

            </div>


          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 px-6 py-4 bg-stone-50 border-t border-stone-200">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-medium text-stone-600 hover:bg-stone-200 rounded-xl transition"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={!idForm || depositLoading}
              className={`${depositLoading ? 'bg-stone-200' : 'bg-stone-800'} px-4 py-2.5 text-sm cursor-pointer font-medium text-white hover:bg-stone-900 disabled:bg-stone-300 disabled:cursor-not-allowed rounded-xl transition`}
            >
              {depositLoading ? "Processing..." : "Confirm Deposit"}
            </button>

          </div>

      </div>
    </div>
  );
};

export default IDDepositModal;