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
                className={`w-full rounded-lg p-2 bg-stone-50 flex justify-between items-start  border border-gray-300 gap-2`}
            >
                <div className="w-full justify-start items-start flex gap-2">
                    <div className="bg-orange-600 p-2 rounded-lg">
                       <ClockFading size={15} className="text-white"/> 
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
                        <div className="justify-start items-start flex flex-col w-full">
                            <h1 className="text-xs font-semibold text-gray-800 justify-center items-center flex gap-2">{borrow.title} </h1>
                            <h2 className="text-[10px] text-stone-400">Requested by — {borrow.name}</h2>
                        </div>

                        <div className="flex border-l border-stone-200">
                            <div className="justify-start items-start flex flex-col px-4 w-full">
                                <h1 className="justify-center items-center text-[10px] flex gap-1 text-stone-400"><Calendar size={12}/>Return Date:</h1>
                                <h1 className="justify-center items-center text-[10px] flex gap-1 text-stone-400"> {borrow.returnDate.split('T')[0]}</h1>
                            </div>

                            <div className="justify-start items-start flex flex-col px-4 w-full">
                                <h1 className="justify-center items-center text-[10px] flex gap-1 text-stone-400"><BookA size={12}/> Quantity:</h1>
                                <h1 className="justify-center items-center text-[10px] flex gap-1 text-stone-400"> {borrow.quantity}</h1>
                            </div>   
                        </div>
                        

                        <div className="justify-end items-start flex gap-2 w-full pt-2 md:pt-0 border-t md:border-0 border-stone-300">
                            
                            <button
                                onClick={() => ReturnBorrow(borrow)}
                                className="bg-stone-800 hover:bg-stone-900 flex gap-2 text-[10px] justify-center items-center text-white rounded-lg p-2 cursor-pointer transition"
                            >
                                <Check size={15}/> Return
                            </button>
                        </div>
                    </div>
                </div>

                
            </div>
        ))
    ) : (
        <div className="w-full flex flex-col justify-center items-center py-6 bg-stone-50 border border-stone-200 rounded-lg">
            <h1 className="text-stone-700 font-semibold text-[10px]">No borrowed found.</h1>
            <h1 className="text-stone-500 text-[10px]">No approved request.</h1>
        </div>
    )}
</div>
    )
}

export default BorrowedTable