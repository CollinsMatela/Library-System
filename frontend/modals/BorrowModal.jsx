
const BorrowModal = ({ book, onClose, requestBorrow }) => {
    return (
        <section className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">

            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden">

                {/* Header */}
                <div className="px-6 py-5 border-b border-stone-200 flex items-start justify-between">
                    <div>
                        <h1 className="text-lg font-semibold text-stone-900">
                            Request to Borrow
                        </h1>

                        <p className="text-xs text-stone-500 mt-1">
                            Review the book details before submitting your borrow request.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg flex items-center justify-center
                                   text-stone-400 hover:text-stone-700 hover:bg-stone-100
                                   transition cursor-pointer"
                    >
                        ✕
                    </button>
                </div>


                {/* Body */}
                <div className="p-6">

                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6">

                        {/* Book Cover */}
                        <div className="flex justify-center">
                            <div className="w-40 h-56 bg-stone-100 rounded-xl overflow-hidden shadow-sm border border-stone-200">
                                {book?.cover ? (
                                    <img
                                        src={book.cover}
                                        alt={book?.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-xs text-stone-400">
                                        No Cover
                                    </div>
                                )}
                            </div>
                        </div>


                        {/* Book Information */}
                        <div className="flex flex-col min-w-0">

                            {/* Title */}
                            <div className="mb-4">
                                <p className="text-[11px] uppercase tracking-wider text-stone-400 font-medium">
                                    Book Title
                                </p>

                                <h2 className="text-xl font-semibold text-stone-900 break-words">
                                    {book?.title || "Untitled Book"}
                                </h2>
                            </div>


                            {/* Author */}
                            <div className="mb-4">
                                <p className="text-[11px] uppercase tracking-wider text-stone-400 font-medium">
                                    Author
                                </p>

                                <p className="text-sm text-stone-700">
                                    {book?.author || "Unknown Author"}
                                </p>
                            </div>


                            {/* Description */}
                            <div className="mb-5">
                                <p className="text-[11px] uppercase tracking-wider text-stone-400 font-medium mb-1">
                                    Description
                                </p>

                                <p className="text-sm text-stone-600 leading-relaxed line-clamp-4">
                                    {book?.description || "No description available."}
                                </p>
                            </div>


                            {/* Metadata */}
                            <div className="grid grid-cols-2 gap-4">

                                <div className="bg-stone-50 border border-stone-200 rounded-xl p-3">
                                    <p className="text-[11px] text-stone-400 mb-1">
                                        Category
                                    </p>

                                    <p className="text-sm font-medium text-stone-800">
                                        {book?.category || "—"}
                                    </p>
                                </div>

                                <div className="bg-green-50 border border-green-100 rounded-xl p-3">
                                    <p className="text-[11px] text-stone-500 mb-1">
                                        Availability
                                    </p>

                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-500" />

                                        <p className="text-sm font-medium text-green-700">
                                            Available
                                        </p>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>


                    {/* Request Notice */}
                    <div className="mt-6 p-3 rounded-xl bg-blue-50 border border-blue-100">
                        <p className="text-xs text-blue-700 leading-relaxed">
                            By submitting this request, you are asking the library
                            to approve this book for borrowing. You will be notified
                            once your request has been reviewed.
                        </p>
                    </div>

                </div>


                {/* Footer */}
                <div className="px-6 py-4 border-t border-stone-200 bg-stone-50 flex justify-end gap-2">

                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg text-xs font-medium
                                   text-stone-600 hover:bg-stone-200
                                   transition cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={() => requestBorrow(book?._id)}
                        className="px-4 py-2 rounded-lg bg-stone-800 text-white
                                   text-xs font-medium hover:bg-stone-900
                                   transition cursor-pointer
                                   shadow-sm"
                    >
                        Send Borrow Request
                    </button>

                </div>

            </div>
        </section>
    );
};

export default BorrowModal;

