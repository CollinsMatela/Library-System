import { HandHelping, ImageOff, Info } from 'lucide-react'
import { useState } from 'react'
const Lib_BookCard = ({ handleViewBook, book, showBorrowModal}) => {

    return(
         <div className="relative h-80 border-b-4 border-stone-300 rounded-lg justify-center items-center flex flex-col gap-2 cursor-pointer hover:-translate-y-1 hover:shadow-lg transition bg-white" onClick={handleViewBook}>

                   <div className="absolute inset-0 overflow-hidden w-full justify-center items-center flex flex-col bg-white/10 rounded-lg backdrop-blur-xs">
                            
                        

                              

                                    {!book?.cover ?
                                    (
                                       <div className="h-full w-full justify-center items-center flex flex-col gap-1">
                                            <ImageOff size={50} className="text-stone-300"/>
                                            <h1 className="text-xs text-stone-500">Not Available</h1> 
                                       </div>
                                    )
                                    :
                                    (
                                       <img src={book.cover} alt={book.title} className="object-cover h-full w-full rounded-lg"/> 
                                    )}
                                    

                                

                                {/* <div className="w-full justify-center items-center flex flex-col mt-2">
                                        <h1 className="hidden lg:block text-stone-800 font-bold text-xs text-center">{book.title.toUpperCase() || "—"}</h1>
                                        
                                </div> */}

                                
                           
                            

                    </div>
         
        </div>
    )
}
export default Lib_BookCard