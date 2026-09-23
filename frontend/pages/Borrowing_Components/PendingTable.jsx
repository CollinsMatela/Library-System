import { Book, Check, X, Info , Calendar, Ellipsis} from "lucide-react";
import axios from 'axios';

const PendingTable = ({Pendings, approveBorrow, deleteBorrow}) => {

    return(
        <div className="w-full flex flex-col gap-2">
    {Pendings.length > 0 ? (
        Pendings.map((borrow) => (
            <div
                key={borrow._id}
                className={`w-full rounded-lg bg-stone-50 p-2 flex justify-between items-start  border border-stone-300 gap-2`}
            >
                <div className="w-full justify-start items-start flex gap-2">
                    <div className="bg-yellow-500 p-2 rounded-lg">
                       <Ellipsis size={15} className="text-white"/> 
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
                        <div className="justify-start items-start flex flex-col w-full">
                            <h1 className="text-xs font-semibold text-stone-800 justify-center items-center flex gap-2">{borrow.title} </h1>
                            <h2 className="text-[10px] text-stone-400">Requested by — {borrow.name}</h2>
                        </div>

                        <div className="justify-start items-start flex flex-col border-l border-stone-300 px-4 w-full">
                            <h1 className="justify-center items-center text-[10px] flex gap-1 text-stone-400"><Calendar size={12}/>Request Date:</h1>
                            <h1 className="justify-center items-center text-[10px] flex gap-1 text-stone-400"> {borrow.createdAt.split('T')[0]}</h1>
                        </div>

                        <div className="justify-end items-center flex gap-2 w-full border-t md:border-0 border-stone-300 pt-2 md:pt-0">
                            <button
                                onClick={() => deleteBorrow(borrow)}
                                className="bg-white flex gap-1 text-[10px] justify-center items-center text-stone-500 p-2 cursor-pointer hover:bg-stone-200 rounded-lg transition"
                            >
                                <X size={15}/>
                            </button>

                            <button
                                onClick={() => approveBorrow(borrow)}
                                className="bg-stone-800 flex gap-1 text-[10px] justify-center items-center text-white rounded-lg p-2 cursor-pointer hover:bg-stone-900 transition"
                            >
                                <Check size={15}/>
                                <h1 className="hidden md:block">Approve</h1>
                            </button>
                        </div>
                        
                    </div>
                </div>

                
            </div>
        ))
    ) : (
        <div className="w-full flex flex-col justify-center items-center py-6 bg-stone-50 border border-stone-200 rounded-lg">
            <h1 className="text-stone-700 font-semibold text-[10px]">No requests found.</h1>
            <h1 className="text-stone-500 text-[10px]">Keep wait on user request.</h1>
        </div>
    )}
</div>
    )
}

export default PendingTable