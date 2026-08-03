import { Book, Check, X } from "lucide-react";

const BorrowedTable = ({Borrowed, ReturnBorrow}) => {
    return(
        <div className="w-full flex flex-col gap-4">
    {Borrowed.length > 0 ? (
        Borrowed.map((borrow) => (
            <div
                key={borrow._id}
                className={`w-full rounded-xl p-5 flex flex-col justify-between items-start  border border-gray-300 gap-2`}
            >
                <div className="justify-center items-center flex gap-2">
                    <Book size={15} className="text-gray-800"/>
                    <h2 className="text-lg font-semibold text-gray-800">{borrow.title}</h2>
                </div>

                <div className="grid grid-cols-3 gap-2 w-full">
                    
                    <div className="border border-gray-300 rounded-xl p-2">
                        <p className="text-gray-800 text-xs font-semibold flex gap-2"> User ID</p>
                        <p className="text-gray-500 text-xs flex gap-2">{borrow.userId}</p>
                    </div>

                    <div className="border border-gray-300 rounded-xl p-2">
                        <p className="text-gray-800 text-xs font-semibold flex gap-2"> Requested By</p>
                        <p className="text-gray-500 text-xs flex gap-2">{borrow.name}</p>
                    </div>
                    

                    <div className="border border-gray-300 rounded-xl p-2">
                        <p className="text-gray-800 text-xs font-semibold flex gap-2"> Requested Date</p>
                        <p className="text-gray-500 text-xs flex gap-2">{borrow.createdAt.split("T")[0]}</p>
                    </div>

                    <div className="border border-gray-300 rounded-xl p-2">
                        <p className="text-gray-800 text-xs font-semibold flex gap-2"> Borrowed Date</p>
                        <p className="text-gray-500 text-xs flex gap-2">{borrow.borrowDate.split("T")[0]}</p>
                    </div>

                    <div className="border border-gray-300 rounded-xl p-2">
                        <p className="text-gray-800 text-xs font-semibold flex gap-2"> Return Date</p>
                        <p className="text-gray-500 text-xs flex gap-2">{borrow.returnDate.split("T")[0]}</p>
                    </div>

                    <div className="border border-gray-300 rounded-xl p-2">
                        <p className="text-gray-800 text-xs font-semibold flex gap-2"> Quantity</p>
                        <p className="text-gray-500 text-xs flex gap-2">{borrow.quantity}</p>
                    </div>

                    <div className="border border-gray-300 rounded-xl p-2">
                        <p className="text-gray-800 text-xs font-semibold flex gap-2"> Status</p>
                        <p className={`
                          ${borrow.status === 'Pending' ? "text-yellow-600" : 
                            borrow.status === 'Approve' ? "text-emerald-600" : ""}
                            font-bold text-xs `}
                        >{borrow.status}</p>
                    </div>
                    
                </div>

                <div className="justify-end items-center flex gap-2 w-full">
                    <button
                        onClick={() => ReturnBorrow(borrow)}
                        className="bg-blue-600 hover:bg-blue-700 flex gap-2 text-xs justify-center items-center text-white p-2 rounded-lg cursor-pointer hover:-translate-y-1 transition"
                    >
                        <Check size={15}/> Return
                    </button>
                </div>
            </div>
        ))
    ) : (
        <div className="w-full flex justify-center items-center py-4 bg-gray-100 rounded-xl">
            <p className="text-gray-500 text-xs">No requests found.</p>
        </div>
    )}
</div>
    )
}

export default BorrowedTable