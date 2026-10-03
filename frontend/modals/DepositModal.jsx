import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { X, Calendar, CheckCircle2, Search, User, Users } from "lucide-react";

const IDDepositModal = ({onClose, onConfirm, idForm, setIdForm, depositLoading, users }) => {
  
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if(!searchQuery) {
      setFilteredUsers([]);
      return;
    }
    const filtered = users.filter((user) =>
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  const handleClose = () => {
  setIdForm((current) => ({
    userId: "", idType: "", idNumber: "", idName: "",
    receivedBy: current.receivedBy || "",   // parent seeds this from user?._id
  }));
  setSearchQuery(""); setFilteredUsers([]); setErrors({});
  onClose();
};

  const handleConfirm = () => {
    const nextErrors = {};

    if (!idForm.userId) {
      nextErrors.userId = true;
      toast.warning("Please select a borrower.");
    }

    if (!idForm.idType) {
      nextErrors.idType = true;
      toast.warning("Please select an ID type.");
    }

    const idNumberRegex = /^[A-Za-z0-9 -]{4,20}$/;

    if (!idForm.idNumber?.trim() || !idNumberRegex.test(idForm.idNumber.trim())) {
      nextErrors.idNumber = true;
      toast.warning("Please enter a valid ID number (4-20 letters, numbers, dashes or spaces).");
    }

    const idNameRegex = /^[A-Za-z\s.'-]{2,}$/;

    if (!idForm.idName?.trim() || !idNameRegex.test(idForm.idName.trim())) {
      nextErrors.idName = true;
      toast.warning("Please enter the name exactly as shown on the ID.");
    }

    if (!idForm.receivedBy) {
      toast.warning("No receiver found. Please sign in again.");
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onConfirm();
  };

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
            onClick={handleClose}
            className="p-2 rounded-lg text-stone-500 hover:bg-stone-100 hover:text-stone-800 transition"
          >
            <X size={18} />
          </button>

        </div>

          <div className="p-6">
            {/* Search user email */}
            <div className="relative w-full justify-center items-center flex border border-stone-300  rounded-xl px-3 mb-2">
              <Search size={15} className="text-stone-500" />
              <input 
                type="text" 
                className={` w-full px-3 py-2.5 text-sm outline-none`} 
                placeholder="Search user by email..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {filteredUsers.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-white border border-stone-300 mt-2 rounded-xl shadow-lg z-10">
                  {filteredUsers.map((user) => (
                    <div
                      key={user._id}
                      className="px-3 py-2 hover:bg-stone-50 rounded-xl cursor-pointer justify-start items-center flex gap-2"
                      onClick={() => {
                        setIdForm({ ...idForm, userId: user._id });
                        setErrors((current) => ({ ...current, userId: false }));
                        setSearchQuery('');
                      }}
                    >
                      <div className="p-2 rounded-full bg-stone-200">
                        <Users size={16} className="text-stone-500" />
                      </div>
                      <div>
                      <h1 className="font-medium text-stone-800 text-sm">{user.firstname} {user.lastname}</h1>
                      <h1 className="text-xs text-stone-500">{user.email}</h1>
                      </div>
                      
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/**If user is selected */}
              {idForm.userId && (
                <div className="w-full border border-green-500 rounded-xl justify-start items-center flex gap-2 px-3 py-2.5 text-sm outline-none bg-green-50 mb-6">
                  <div className="bg-stone-800 p-2 rounded-full"><User size={18} className="text-white" /></div>
                  <div>
                    <h1 className="text-sm text-stone-800 font-semibold">{users.find((u) => u._id === idForm.userId)?.firstname} {users.find((u) => u._id === idForm.userId)?.lastname}</h1>
                    <h1 className="text-xs text-stone-500">{users.find((u) => u._id === idForm.userId)?.email}</h1>
                  </div>
                  
                </div>
              )}

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
                    onChange={(e) => {
                      setIdForm({ ...idForm, idType: e.target.value });
                      setErrors((current) => ({ ...current, idType: false }));
                    }}
                    className={`w-full rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 ${
                      errors.idType ? "border-red-500 focus:ring-red-300" : "border-stone-300 focus:ring-stone-300"
                    }`}
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
                    onChange={(e) => {
                      setIdForm({ ...idForm, idNumber: e.target.value });
                      setErrors((current) => ({ ...current, idNumber: false }));
                    }}
                    placeholder="Enter ID number"
                    className={`w-full rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 ${
                      errors.idNumber ? "border-red-500 focus:ring-red-300" : "border-stone-300 focus:ring-stone-300"
                    }`}
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
                  onChange={(e) => {
                    setIdForm({ ...idForm, idName: e.target.value });
                    setErrors((current) => ({ ...current, idName: false }));
                  }}
                  placeholder="Enter name exactly as shown on ID"
                  className={`w-full rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 ${
                    errors.idName ? "border-red-500 focus:ring-red-300" : "border-stone-300 focus:ring-stone-300"
                  }`}
                />

              </div>

            </div>


          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 px-6 py-4 bg-stone-50 border-t border-stone-200">

            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2.5 text-sm font-medium text-stone-600 hover:bg-stone-200 rounded-xl transition"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleConfirm}
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