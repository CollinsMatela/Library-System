


const BorrowModal = ({book, onClose}) => {
    return(
        <section className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden">

        {/* Header */}
        <div className="border-b border-gray-200 px-8 py-6">
            <h1 className="text-2xl font-bold text-gray-900">
                Request Borrow
            </h1>
            <p className="text-sm text-gray-500 mt-1">
                Please review the selected book before submitting your borrow request.
            </p>
        </div>

        {/* Body */}
        <div className="w-full px-10 py-6 flex gap-6">

            {/* Book Cover */}
            <div>
                <img
                    src={book?.cover}
                    alt={book?.title}
                    className="h-80 w-70 object-cover shadow-md"
                />
            </div>

            {/* Book Information */}
            <div className="col-span-2 flex flex-col justify-between">

                <div className="grid grid-cols-1 gap-4">

                    <div>
                        <p className="text-xs uppercase tracking-wide text-gray-500">
                            Title
                        </p>
                        <h2 className="text-2xl font-bold text-gray-900">
                            {book?.title}
                        </h2>
                    </div>

                    <div>
                        <p className="text-xs uppercase tracking-wide text-gray-500">
                            Author
                        </p>
                        <p className="text-gray-700">
                            {book?.author || "—"}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs uppercase tracking-wide text-gray-500">
                            Description
                        </p>
                        <p className="text-sm text-gray-600 line-clamp-5">
                            {book?.description || "—"}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <p className="text-xs text-gray-500">Category</p>
                            <p className="font-medium">{book?.category}</p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-500">Availability</p>
                            <p className="font-medium text-green-600">
                                Available
                            </p>
                        </div>
                    </div>

                </div>

            </div>

        </div>

        {/* Buttons */}
                <div className="w-full px-10 flex flex-col gap-2 mb-10">

                    <button
                        className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
                    >
                        Send Request
                    </button>

                    <button
                        className="px-6 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition cursor-pointer"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                </div>

    </div>
</section>
    )
}
export default BorrowModal