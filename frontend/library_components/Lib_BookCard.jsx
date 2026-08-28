import { HandHelping, Info } from 'lucide-react'
import { useState } from 'react'
const Lib_BookCard = ({ handleViewBook, book, showBorrowModal}) => {

    return(
         <div className="relative justify-center items-center flex flex-col gap-2 cursor-pointer hover:-translate-y-1 hover:shadow-2xl transition  bg-white" onClick={handleViewBook}>
                    <img src={book.cover} alt={book.title}
                        className="h-full object-cover"
                    />

                   <div className="absolute inset-0 overflow-hidden w-full justify-center items-center flex flex-col bg-white/10 backdrop-blur-xs">
                            
                        

                                <div className="h-60 w-full justify-center items-center flex">
                                    <img src={book.cover} alt={book.title} className="object-fit h-full"/>

                                </div>

                                <div className="w-full justify-center items-center flex flex-col mt-2">
                                        <h1 className="hidden lg:block text-stone-800 font-bold text-xs text-center">{book.title.toUpperCase() || "—"}</h1>
                                        
                                </div>

                                
                           
                            

                    </div>
         
        </div>
    )
}
export default Lib_BookCard