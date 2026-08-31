import { Book, Check, X, Info, Calendar, BookA, CheckCheck, ClockFading } from "lucide-react";

const ApprovedTable = ({Approved, returnDate, setReturnDate, quantity, setQuantity, updateBorrow, deleteBorrow}) => {
    return(
        <div className="w-full flex flex-col gap-2">
    {Approved.length > 0 ? (
        Approved.map((borrow) => (
            <div
                key={borrow._id}
                className={`w-full rounded-xl p-4 flex justify-between items-start border border-stone-300 gap-2`}
            >
                <div className="w-full justify-start items-start flex gap-2">
                    <div className="bg-blue-600 p-2 rounded-lg">
                       <Check size={15} className="text-white"/> 
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 w-full">
                        <div className="justify-start items-start flex flex-col w-full">
                            <h1 className="text-sm font-semibold text-gray-800 justify-center items-center flex gap-2">{borrow.title} </h1>
                            <h2 className="text-xs text-stone-400">Requested by — {borrow.name}</h2>
                        </div>

                        <div className="justify-start items-start flex flex-col border-l border-stone-300 px-4 w-full">
                            <h1 className="justify-center items-center text-xs flex gap-1 text-stone-400"><Calendar size={12}/>Approved Date:</h1>
                            <h1 className="justify-center items-center text-xs flex gap-1 text-stone-400"> {borrow.updatedAt.split('T')[0]}</h1>
                        </div>

                        <div className="justify-start items-start flex border-l border-stone-300 w-full gap-2 md:gap-1 p-2">
                            <input type="date" className="p-2 bg-stone-100 rounded-lg text-xs text-stone-500 w-3/4" value={returnDate[borrow._id] || ''} onChange={(e) => setReturnDate(prev => ({...prev, [borrow._id]: e.target.value}))}/>
                            <input type="number" min={1} className="p-2 bg-stone-100 rounded-lg text-xs text-stone-500 w-1/4" placeholder="Qty" value={quantity[borrow._id] || ''} onChange={(e) => setQuantity(prev => ({...prev, [borrow._id]: e.target.value}))}/>
                        </div>

                        <div className="justify-end items-center flex gap-2 w-full pt-2 md:pt-0 border-t md:border-0 border-stone-300">
                            

                            <button
                                onClick={() => deleteBorrow(borrow)}
                                className="bg-stone-100 hover:bg-stone-200 flex gap-2 text-xs justify-center items-center text-gray-500 p-2 cursor-pointer hover:-translate-y-1 transition"
                            >
                                <X size={15}/>
                            </button>

                            <button
                                onClick={() => updateBorrow(borrow)}
                                className="bg-stone-200 hover:bg-blue-700 flex gap-2 text-xs justify-center items-center text-stone-500 hover:text-white p-2 cursor-pointer hover:-translate-y-1 transition"
                            >
                                <Check size={15}/> Submit
                            </button>

                        </div>
                    </div>
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