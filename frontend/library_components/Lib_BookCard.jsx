import { HandHelping } from 'lucide-react'
import { useState } from 'react'
const Lib_BookCard = ({onClick, handleViewBook, bookId, cover, title, author, showBorrowModal}) => {

    return(
         <div className="space-y-2 cursor-pointer hover:-translate-y-1" onClick={handleViewBook}>
                    <img src={cover} className="h-80 w-full object-cover rounded-md"/>

                    <div className="justify-center items-center flex flex-col w-full py-2 gap-2">

                    <div className="w-full justify-center items-center flex flex-col">
                        <h1 className="text-gray-800 font-bold text-sm truncate">{title.toUpperCase() || "—"}</h1>
                        <p className="text-gray-500 text-xs">Authored by: {author || "—"}</p>
                    </div>

                    <button
                        className="w-full py-2 bg-gray-900 rounded-md cursor-pointer hover:bg-bblack"
                        onClick={(e) => {
                            e.stopPropagation();
                            showBorrowModal();
                        }}
                    >
                        <h1 className="text-xs text-white flex justify-center items-center gap-2">
                            <HandHelping size={20} />
                            Request
                        </h1>
                    </button>
                    </div>
                    
        </div>
    )
}
export default Lib_BookCard