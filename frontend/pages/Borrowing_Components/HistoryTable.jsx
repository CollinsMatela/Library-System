import { Check, X } from "lucide-react";

const HistoryTable = ({Returned}) => {
    return(
        <div className="w-full flex flex-col gap-4 mt-6">
    {Returned.length > 0 ? (
        Returned.map((borrow) => (
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

                    <p className="text-gray-600 text-xs flex gap-2"> User Id:
                        <span className="">{borrow.userId}</span>
                    </p>

                    <p className="text-gray-600 text-xs flex gap-2"> Requested By:
                        <span className="">{borrow.name}</span>
                    </p>

                    <p className="text-gray-600 text-xs flex gap-2"> Requested Date:
                        <span className="">{borrow.createdAt.split("T")[0]}</span>
                    </p>

                    <p className="text-gray-600 text-xs flex gap-2"> Borrow Date:
                        <span className="">{borrow.borrowDate.split("T")[0]}</span>
                    </p>

                    <p className="text-gray-600 text-xs flex gap-2"> Return Date:
                        <span className="">{borrow.returnDate.split("T")[0]}</span>
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

            </div>
        ))
    ) : (
        <div className="w-full flex justify-center items-center py-10 border border-dashed rounded-xl">
            <p className="text-gray-500">No borrow returned found.</p>
        </div>
    )}
</div>
    )
}

export default HistoryTable