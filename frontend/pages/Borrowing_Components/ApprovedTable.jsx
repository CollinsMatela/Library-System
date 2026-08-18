import { Check, X, Book, Calendar, Info} from "lucide-react";

const ApprovedTable = ({Approved, returnDate, setReturnDate, quantity, setQuantity, updateBorrow, deleteBorrow}) => {
    return(
        <div className="w-full flex flex-col gap-2">
    {Approved.length > 0 ? (
        Approved.map((borrow) => (
            <div
                key={borrow._id}
                className={`w-full rounded-xl p-4 flex justify-between items-start  border border-stone-300 gap-2`}
            >
                <div className="w-full justify-start items-center flex gap-2">
                    <div className="bg-stone-200 p-2 rounded-full">
                       <Book size={15} className="text-stone-800"/> 
                    </div>
                    <div className="justify-start items-start flex flex-col">
                        <h2 className="text-sm font-semibold text-gray-800 justify-center items-center flex gap-2">{borrow.title} 
                            <span className={`justify-center items-center text-xs flex gap-1 ${borrow.status === 'Approved' ? 'text-blue-500' : ""}`}><Info size={12}/>{borrow.status}</span>
                            <h1 className="justify-center items-center text-xs flex gap-1 text-stone-400"><Calendar size={12}/> {borrow.updatedAt.split('T')[0]}</h1>
                        </h2>
                        <h2 className="text-xs text-stone-400">Requested by — {borrow.name}</h2>
                    </div>
                </div>

                <div className="justify-end items-center flex gap-2 w-fit">
                    <input type="date" className="p-2 bg-stone-100 rounded-lg text-xs" value={returnDate[borrow._id] || ''} onChange={(e) => setReturnDate(prev => ({...prev, [borrow._id]: e.target.value}))}/>
                    <input type="number" min={1} className="p-2 w-20 bg-stone-100 rounded-lg text-xs" placeholder="Qty" value={quantity[borrow._id] || ''} onChange={(e) => setQuantity(prev => ({...prev, [borrow._id]: e.target.value}))}/>

                    <button
                        onClick={() => deleteBorrow(borrow)}
                        className="bg-stone-100 hover:bg-stone-200 flex gap-2 text-xs justify-center items-center text-gray-500 p-2 rounded-lg cursor-pointer hover:-translate-y-1 transition"
                    >
                        <X size={15}/>
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
        <div className="w-full flex justify-center items-center py-4 bg-stone-100 rounded-xl">
            <p className="text-stone-500 text-xs">No requests found.</p>
        </div>
    )}
</div>
    )
}

export default ApprovedTable