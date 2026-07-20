import { HandHelping } from 'lucide-react'
import { useState } from 'react'
const Lib_BookCard = ({ handleViewBook, book, showBorrowModal}) => {

    return(
         <div className="space-y-2 cursor-pointer hover:-translate-y-1" onClick={handleViewBook}>

                   <div className="relative overflow-hidden rounded-lg">
                    <img
                        src={book.cover}
                        alt={book.title}
                        className="h-80 w-full object-cover"
                    />

                    <span
                        className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${
                        book.copies > 0
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                        {book.copies > 0 ? "Available" : "Out of Stock"}
                    </span>
                    </div>
                    

                   

                    <div className="w-full justify-start items-center flex flex-col">
                        <h1 className="text-gray-800 font-bold text-sm truncate">{book.title.toUpperCase() || "—"}</h1>
                        <p className="text-gray-500 text-xs">By: {book.author || "—"}</p>
                        
                    </div>

                    
                    
        </div>
    )
}
export default Lib_BookCard