import { HandHelping, Info } from 'lucide-react'
import { useState } from 'react'
const Lib_BookCard = ({ handleViewBook, book, showBorrowModal}) => {

    return(
         <div className="relative justify-center items-center flex flex-col gap-2 border border-gray-300 rounded-xl cursor-pointer hover:-translate-y-1 hover:shadow-2xl transition  bg-white" onClick={handleViewBook}>
                    <img src={book.cover} alt={book.title}
                        className="h-full object-cover"
                    />

                   <div className="absolute inset-0 overflow-hidden w-full justify-center items-center flex flex-col bg-black/50 backdrop-blur-xs p-4 gap-2">
                            
                        

                                <div className="h-60 w-full justify-center items-center flex bg-white/10">
                                    <img src={book.cover} alt={book.title} className="object-fit h-full"/>

                                </div>

                                <div className="w-full justify-center items-center flex flex-col">
                                        <h1 className="text-white font-medium text-xs text-center">{book.title.toUpperCase() || "—"}</h1>
                                        <ul className="flex gap-1">
                                          <li className="text-gray-400 text-xs">● {book.author || "—"}</li>
                                          <li className="text-gray-400 text-xs">● {book.category || "—"}</li>
                                        </ul>
                                        
                                    </div>

                                
                           
                            

                    </div>
         
        </div>
    )
}
export default Lib_BookCard