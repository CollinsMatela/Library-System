import { HandHelping, Info } from 'lucide-react'
import { useState } from 'react'
const Lib_BookCard = ({ handleViewBook, book, showBorrowModal}) => {

    return(
         <div className="justify-center items-center flex flex-col gap-2 border border-gray-300 shadow-sm rounded-xl cursor-pointer hover:-translate-y-1 bg-white p-4" onClick={handleViewBook}>

                   <div className="relative overflow-hidden ">
                    <img
                        src={book.cover}
                        alt={book.title}
                        className="object-cover rounded-md"
                    />
                    <span
                        className={`absolute top-3 left-3 justify-center items-center flex gap-2 rounded-full text-xs font-semibold ${
                        book.copies > 0
                            ? " text-green-600"
                            : " text-red-600"
                        }`}
                    >
                        <Info size={15}/>
                        {book.copies > 0 ? "Available" : "Out of Stock"}
                    </span>
                    </div>
                    

                   

                    <div className="w-full justify-start items-center flex flex-col">
                        <h1 className="text-gray-800 font-bold text-sm truncate">{book.title.toUpperCase() || "—"}</h1>
                        <p className="text-gray-500 text-xs">{book.author || "—"}</p>
                        
                    </div>

                    
                    
        </div>
    )
}
export default Lib_BookCard