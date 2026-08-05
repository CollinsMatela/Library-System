

import { toast } from "react-toastify"
const BorrowModal = ({book, onClose, requestBorrow}) => {

    
    return(
        <section className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden p-6">

        {/* Header */}
        <div className="mb-6">
            <h1 className="text-lg font-bold text-gray-900">
                Request Borrow
            </h1>
            <p className="text-xs text-gray-500">
                Please review the selected book before submitting your borrow request.
            </p>
        </div>

        {/* Body */}
        <div className="w-full grid grid-cols-2">

            {/* Book Cover */}
            <div className=" bg-gray-50 justify-start item-center flex">
                <img
                    src={book?.cover}
                    alt={book?.title}
                    className="h-100 object-cover shadow-md"
                />
            </div>

            {/* Book Information */}
            

                <div className="flex flex-col gap-4">

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

        {/* Buttons */}
                <div className="w-full justify-end items-center flex gap-2">

                    <button
                        className="p-2 rounded-xl text-xs hover:bg-gray-100 transition cursor-pointer"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="p-2 rounded-xl bg-blue-600 text-white text-xs hover:bg-blue-700 transition cursor-pointer"
                        onClick={() => requestBorrow(book._id)}
                    >
                        Send Request
                    </button>

                </div>

    </div>
</section>
    )
}
export default BorrowModal