import { Check, X } from "lucide-react";

const PendingTable = ({Pendings, approveBorrow, deleteBorrow}) => {
    return(
        <div className="w-full flex flex-col gap-4 mt-6">
    {Pendings.length > 0 ? (
        Pendings.map((borrow) => (
            <div
                key={borrow._id}
                className={`w-full rounded-xl p-5 flex justify-between items-start  border-1
                    ${borrow.status === 'Pending' ? "border-yellow-500" :
                      borrow.status === 'Approved' ? "border-emerald-500" : null
                    }`}
            >
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {borrow.title}
                    </h2>

                    <p className="text-gray-600 text-xs flex gap-2"> UserId:
                        <span className="">{borrow.userId}</span>
                    </p>

                    <p className="text-gray-600 text-xs flex gap-2"> Requested By:
                        <span className="">{borrow.name}</span>
                    </p>

                    <p className="text-gray-600 text-xs flex gap-2"> Requested Date:
                        <span className="">{borrow.createdAt.split("T")[0]}</span>
                    </p>

                    <p className="text-gray-600 text-xs flex gap-2"> Quantity:
                        <span className="">{borrow.quantity}</span>
                    </p>

                    <p className="text-gray-600 text-xs flex gap-2"> Status:
                        <span className={`
                          ${borrow.status === 'Pending' ? "text-yellow-600" : 
                            borrow.status === 'Approve' ? "text-emerald-600" : ""}
                            font-bold text-md `}
                        >{borrow.status}</span>
                    </p>

                    
                </div>

                <div className="justify-center items-center flex gap-2">
                    <button
                        onClick={() => approveBorrow(borrow)}
                        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
                    >
                        <Check size={20}/>
                    </button>

                    <button
                        onClick={() => deleteBorrow(borrow)}
                        className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
                    >
                        <X size={20}/>
                    </button>
                </div>
            </div>
        ))
    ) : (
        <div className="w-full flex justify-center items-center py-10 border border-dashed rounded-xl">
            <p className="text-gray-500">No borrow requests found.</p>
        </div>
    )}
</div>
    )
}

export default PendingTable