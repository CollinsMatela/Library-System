import { Book, Check, X, Info , Calendar, Ellipsis} from "lucide-react";
import axios from 'axios';

const PendingTable = ({Pendings, approveBorrow, deleteBorrow}) => {

    return(
        <div className="w-full flex flex-col gap-4">
    {Pendings.length > 0 ? (
        Pendings.map((borrow) => (
            <div
                key={borrow._id}
                className={`w-full rounded-xl p-4 flex justify-between items-start  border border-gray-300 gap-2`}
            >
                <div className="w-full justify-start items-center flex gap-2">
                    <div className="bg-yellow-500 p-2 rounded-lg">
                       <Ellipsis size={15} className="text-white"/> 
                    </div>
                    <div className="grid grid-cols-3 gap-2 w-full">
                        <div className="justify-start items-start flex flex-col w-full">
                            <h1 className="text-sm font-semibold text-gray-800 justify-center items-center flex gap-2">{borrow.title} </h1>
                            <h2 className="text-xs text-stone-400">Requested by — {borrow.name}</h2>
                        </div>

                        <div className="justify-start items-start flex flex-col border-l border-stone-300 px-4 w-full">
                            <h1 className="justify-center items-center text-xs flex gap-1 text-stone-400"><Calendar size={12}/>Request Date:</h1>
                            <h1 className="justify-center items-center text-xs flex gap-1 text-stone-400"> {borrow.createdAt.split('T')[0]}</h1>
                        </div>

                        <div className="justify-end items-center flex gap-2 w-full">
                            <button
                                onClick={() => deleteBorrow(borrow)}
                                className="bg-white hover:bg-gray-200 flex gap-2 text-xs justify-center items-center text-gray-500 p-2 rounded-lg cursor-pointer hover:-translate-y-1 transition"
                            >
                                <X size={15}/>
                            </button>

                            <button
                                onClick={() => approveBorrow(borrow)}
                                className="bg-stone-200 hover:bg-blue-700 flex gap-2 text-xs justify-center items-center text-stone-500 hover:text-white p-2 rounded-lg cursor-pointer hover:-translate-y-1 transition"
                            >
                                <Check size={15}/>
                                Approve
                            </button>
                        </div>
                        
                    </div>
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

export default PendingTable