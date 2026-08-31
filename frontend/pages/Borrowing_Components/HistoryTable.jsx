import { Book, Check, X, Info, Calendar, BookA, CheckCheck } from "lucide-react";

const HistoryTable = ({Returned}) => {
    return(
        <div className="w-full flex flex-col gap-4">
    {Returned.length > 0 ? (
        Returned.map((borrow) => (
            <div
                key={borrow._id}
                 className={`w-full rounded-xl p-4 flex justify-between items-start  border border-stone-300 gap-2`}
            >
                <div className="w-full justify-start items-start flex gap-2">
                    <div className={`bg-green-600 p-2 rounded-lg`}>
                       <CheckCheck size={15} className="text-white"/> 
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
                        <div className="justify-start items-start flex flex-col w-full">
                            <h1 className="text-sm font-semibold text-gray-800 justify-center items-center flex gap-2">{borrow.title} </h1>
                            <h2 className="text-xs text-stone-400">Requested by — {borrow.name}</h2>
                        </div>

                        <div className="justify-start items-start flex flex-col border-l border-stone-300 px-4 w-full">
                            <h1 className="justify-center items-center text-xs flex gap-1 text-stone-400"><Calendar size={12}/>Return Date:</h1>
                            <h1 className="justify-center items-center text-xs flex gap-1 text-stone-400"> {borrow.returnDate.split('T')[0]}</h1>
                        </div>

                        <div className="justify-start items-start flex flex-col border-l border-stone-300 px-4 w-full">
                            <h1 className="justify-center items-center text-xs flex gap-1 text-stone-400"><BookA size={12}/> Quantity:</h1>
                            <h1 className="justify-center items-center text-xs flex gap-1 text-stone-400"> {borrow.quantity}</h1>
                        </div>
                        
                    </div>
                </div>

            </div>
        ))
    ) : (
        <div className="w-full flex justify-center items-center p-4  bg-stone-100 rounded-xl">
            <p className="text-stone-500 text-xs">No history found.</p>
        </div>
    )}
</div>
    )
}

export default HistoryTable