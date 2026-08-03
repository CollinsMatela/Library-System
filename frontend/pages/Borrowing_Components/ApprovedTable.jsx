import { Check, X, Book } from "lucide-react";

const ApprovedTable = ({Approved, returnDate, setReturnDate, quantity, setQuantity, updateBorrow, deleteBorrow}) => {
    return(
        <div className="w-full flex flex-col gap-4">
    {Approved.length > 0 ? (
        Approved.map((borrow) => (
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
                        <p className="text-gray-800 text-xs font-semibold flex gap-2"> Status</p>
                        <p className={`
                          ${borrow.status === 'Pending' ? "text-yellow-600" : 
                            borrow.status === 'Approved' ? "text-green-600" : ""}
                            font-bold text-xs `}
                        >{borrow.status}</p>
                    </div>
                    
                </div>

                <div className="justify-end items-center flex gap-2 w-full">
                    <input type="date" className="p-2 bg-gray-100 rounded-lg text-xs" value={returnDate} onChange={(e) => setReturnDate(e.target.value)}/>
                    <input type="number" min={1} className="p-2 w-20 bg-gray-100 rounded-lg text-xs" placeholder="Qty" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>

                    <button
                        onClick={() => deleteBorrow(borrow)}
                        className="bg-white hover:bg-gray-200 flex gap-2 text-xs justify-center items-center text-gray-500 p-2 rounded-lg cursor-pointer hover:-translate-y-1 transition"
                    >
                        <X size={15}/> Remove
                    </button>

                    <button
                        onClick={() => updateBorrow(borrow)}
                        className="bg-blue-600 hover:bg-blue-700 flex gap-2 text-xs justify-center items-center text-white p-2 rounded-lg cursor-pointer hover:-translate-y-1 transition"
                    >
                        <Check size={15}/> Submit
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

export default ApprovedTable