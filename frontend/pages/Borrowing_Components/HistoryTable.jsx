import { Book, Check, X, Info, Calendar } from "lucide-react";

const HistoryTable = ({Returned}) => {
    return(
        <div className="w-full flex flex-col gap-4">
    {Returned.length > 0 ? (
        Returned.map((borrow) => (
            <div
                key={borrow._id}
                 className={`w-full rounded-xl p-5 flex justify-between items-start  border border-gray-300 gap-2`}
            >
                <div className="w-full justify-start items-center flex gap-2">
                    <div className="bg-gray-200 p-2 rounded-full">
                       <Book size={15} className="text-gray-800"/> 
                    </div>
                    <div className="justify-start items-start flex flex-col">
                        <h2 className="text-sm font-semibold text-gray-800 justify-center items-center flex gap-2">{borrow.title} 
                            <span className={`justify-center items-center text-xs flex gap-1 ${borrow.status === 'Returned' ? 'text-green-500' : ""}`}><Info size={12}/>{borrow.status}</span>
                            <h1 className="justify-center items-center text-xs flex gap-1 text-xs text-gray-400"><Calendar size={12}/> {borrow.returnDate.split('T')[0]}</h1>
                            <h1 className="justify-center items-center text-xs flex gap-1 text-xs text-gray-400"> — {borrow.quantity} Qty</h1>
                        </h2>
                        <h2 className="text-xs text-gray-400">Requested by — {borrow.name}</h2>
                    </div>
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