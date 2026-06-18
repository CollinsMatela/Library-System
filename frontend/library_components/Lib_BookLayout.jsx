import { useState } from "react"
import {Book, ArrowLeft, ArrowRight, AudioLines} from "lucide-react";
const Lib_BookLayout = ({book, onClose}) => {

    const [pageIndex, setPageIndex] = useState(0);

    const nextPage = () => {
        if (pageIndex >= book?.pages.length - 1) {
        alert("Reached the last page.");
        return;
    }
          setPageIndex((prev) => prev + 1);
    }
    const prevPage = () => {
        if(pageIndex === 0){
            return
        }
          setPageIndex((prev) => prev - 1);
    }

    return(
        <section className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
            <div className="relative bg-white w-[90%] rounded-2xl shadow-2xl flex flex-col">

                {/* Header */}
                <div className="absolute top-0 z-10 flex justify-between items-center w-full h-15 p-10">
                    <h1 className="bg-white/50 px-6 py-2 rounded-lg font-bold text-gray-800 justify-center items-center flex gap-2 uppercase">
                        <Book/> Title: {book?.title}
                    </h1>
                    
                    <div className="flex gap-2 ">
                        <button className="bg-white/50 rounded-lg px-4 py-2 text-white cursor-pointer hover:-translate-y-1" onClick={() => alert('TTS not yet integrated.')}><AudioLines/></button>
                        <button className="border rounded-lg  px-4 py-2 text-white cursor-pointer hover:text-red-500" onClick={onClose}>×</button>
                    </div>
                    
                </div>

                {/* Book */}
                <div className={`grid ${!book?.pages[pageIndex]?.pageText || !book?.pages[pageIndex]?.pageImage ? "grid-cols-1" : "grid-cols-2"} min-h-150 w-full`}>

                    {/* Left Page */}
                    <div className={`relative bg-black flex justify-center items-center overflow-hidden`}>

                        <img src={book?.pages?.[pageIndex]?.pageImage} className="w-full h-full object-cover"/>

                        {/* Black gradient around edges */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_55%,rgba(0,0,0,1)_100%)] pointer-events-none" />

                    </div>

                    {/* Right Page */}
                    <div className="relative bg-white justify-center items-center flex">
                        <img src={book?.pages?.[pageIndex]?.pageImage} className="w-full h-full object-cover"/>
                        <div className="absolute inset-0 bg-white/30 justify-center items-center flex backdrop-blur-md">
                            <p className="text-2xl font-bold leading-10 text-black ">{book?.pages[pageIndex]?.pageText}</p>
                        </div>
                        

                    </div>

                </div>

                {/* Footer */}
                <div className="absolute bottom-0 flex justify-between items-center w-full h-15 p-10">
                    
                    <button className="bg-white text-gray-500 px-6 py-2 rounded-lg justify-center items-center flex gap-2 cursor-pointer hover:-translate-y-1" onClick={prevPage}>
                        <ArrowLeft/> Previous
                    </button>

                    <span className="bg-white font-semibold text-gray-700 px-6 py-2 rounded-lg">
                        Page {pageIndex + 1} / {book?.pages.length}
                    </span>

                    <button className="bg-white text-gray-500 bg-gray-300/50 px-6 py-2 rounded-lg justify-center items-center flex gap-2 cursor-pointer hover:-translate-y-1" onClick={nextPage}>
                        <ArrowRight/> Next
                    </button>

                </div>

            </div>
</section>
    )
}
export default Lib_BookLayout