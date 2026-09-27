import {X} from 'lucide-react'
const InventoryViewModal = ({book, responsiblePerson, onClose}) => {
    return(
    <>
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
        <div className="bg-stone-50 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-xl ">

            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-stone-300">
                <div>
                    <h1 className="text-sm font-semibold text-stone-800">
                        Book Information
                    </h1>

                    <p className="text-[10px] text-stone-500">
                        Oversee the information of book
                    </p>
                </div>

                <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-stone-200 transition cursor-pointer"
                >
                    <X size={16} className="text-stone-500" />
                </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-5">

                {/* Book Information */}
                <div>
                    <h2 className="text-xs font-semibold text-stone-700 mb-2">
                        Book Information
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

                        <div className=" rounded-lg ">
                            <p className="text-[9px] text-stone-400">
                                Title
                            </p>

                            <p className="text-xs font-medium text-stone-700 break-words">
                                {book.title || "N/A"}
                            </p>
                        </div>

                        <div className="  rounded-lg ">
                            <p className="text-[9px] text-stone-400">
                                Author
                            </p>

                            <p className="text-xs text-stone-700 break-words">
                                {book.author || "N/A"}
                            </p>
                        </div>

                        <div className="  rounded-lg ">
                            <p className="text-[9px] text-stone-400">
                                Category
                            </p>

                            <p className="text-xs text-stone-700 break-words">
                                {book.category || "N/A"}
                            </p>
                        </div>

                        <div className="  rounded-lg ">
                            <p className="text-[9px] text-stone-400">
                                ISBN
                            </p>

                            <p className="text-xs text-stone-700 break-words">
                                {book.isbn || "N/A"}
                            </p>
                        </div>

                    </div>
                </div>


                {/* Inventory Information */}
                <div>
                    <h2 className="text-xs font-semibold text-stone-700 mb-2">
                        Inventory Information
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

                        <div className="  rounded-lg ">
                            <p className="text-[9px] text-stone-400">
                                Received Date
                            </p>

                            <p className="text-xs text-stone-700">
                                {book.receivedDate
                                    ? new Date(book.receivedDate).toDateString()
                                    : "N/A"}
                            </p>
                        </div>

                        <div className="  rounded-lg ">
                            <p className="text-[9px] text-stone-400">
                                Donated From
                            </p>

                            <p className="text-xs text-stone-700 break-words">
                                {book.donatedFrom || "N/A"}
                            </p>
                        </div>

                        <div className="  rounded-lg ">
                            <p className="text-[9px] text-stone-400">
                                Copies
                            </p>

                            <p className="text-xs text-stone-700">
                                {book.copies ?? "N/A"}
                            </p>
                        </div>

                        <div className="  rounded-lg ">
                            <p className="text-[9px] text-stone-400">
                                Availability
                            </p>

                            <span
                                className={`inline-block text-[10px] border rounded-lg px-2 py-1 mt-1 ${
                                    book.copies > 0
                                        ? "text-green-600 bg-green-100 border-green-200"
                                        : "text-red-600 bg-red-100 border-red-200"
                                }`}
                            >
                                {book.copies > 0
                                    ? "Available"
                                    : "Not Available"}
                            </span>
                        </div>

                    </div>
                </div>


                {/* Record Information */}
                <div>
                    <h2 className="text-xs font-semibold text-stone-700 mb-2">
                        Record Information
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

                        <div className="  rounded-lg ">
                            <p className="text-[9px] text-stone-400">
                                Responsible Person
                            </p>

                            <p className="text-xs text-stone-700 break-words">
                                {responsiblePerson(book.addedById) || "N/A"}
                            </p>
                        </div>

                        <div className="  rounded-lg ">
                            <p className="text-[9px] text-stone-400">
                                Date Added
                            </p>

                            <p className="text-xs text-stone-700">
                                {book.createdAt
                                    ? new Date(book.createdAt).toDateString()
                                    : "N/A"}
                            </p>
                        </div>

                    </div>
                </div>

            </div>

            {/* Footer */}
            <div className="flex justify-end p-4 border-t border-stone-300">
                <button
                    onClick={onClose}
                    className="px-4 py-2 text-xs text-white bg-stone-800 hover:bg-stone-900 rounded-lg transition cursor-pointer"
                >
                    Close
                </button>
            </div>

        </div>
    </div>
    </>)
}
export default InventoryViewModal