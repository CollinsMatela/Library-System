import axios from "axios";
import { Book, Check, X, Info, Calendar, BookA, CheckCheck, ClockFading } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const BorrowedTable = ({Borrowed, ReturnBorrow}) => {

    return(
        <div className="w-full flex flex-col gap-2">
    {Borrowed.length > 0 ? (
        Borrowed.map((borrow) => (
            <div
                key={borrow._id}
                className={`w-full rounded-xl p-4 flex justify-between items-start  border border-gray-300 gap-2`}
            >
                <div className="w-full justify-start items-center flex gap-2">
                    <div className="bg-orange-600 p-2 rounded-lg">
                       <ClockFading size={15} className="text-white"/> 
                    </div>
                    <div className="grid grid-cols-4 w-full">
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

                        <div className="justify-end items-center flex gap-2 w-full">
                            
                            <button
                                onClick={() => ReturnBorrow(borrow)}
                                className="bg-stone-200 hover:bg-blue-700 flex gap-2 text-xs justify-center items-center text-stone-500 hover:text-white p-2 rounded-lg cursor-pointer hover:-translate-y-1 transition"
                            >
                                <Check size={15}/> Return
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

export default BorrowedTable