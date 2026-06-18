import {Book, ArrowLeft, ArrowRight, AudioLines, ImageOff, Eye} from "lucide-react";
const Lib_StoryLayoutBook = ({book, pageIndex, nextPage, prevPage, onClose}) => {

    const hasImage = book?.pages[pageIndex]?.pageImage;
    const hasText = book?.pages[pageIndex]?.pageText;

    return(
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

                <div className={`grid ${hasImage && hasText ? "grid-cols-2" : "grid-cols-1"} min-h-150 w-full`}>

                {/* Image */}
                {hasImage && (
                    <div className="relative flex justify-center items-center overflow-hidden">
                    <img src={hasImage} className="w-full h-full object-cover" alt="Page Image"/>
                    </div>
                )}

                {/* Text */}
                {hasText && (
                    <div className="relative bg-gray-100 flex justify-center items-center">
                        <img src={hasImage} className="w-full h-full object-cover" alt="Page Image"/>
                        <div className="absolute inset-0 bg-white/30 backdrop-blur-md justify-center items-center flex">
                            <p className="text-2xl font-bold leading-10 text-black">{hasText}</p>
                        </div>
                   
                    </div>
                )}

                {/* Neither image nor text */}
                {!hasImage && !hasText && (
                    <div className="flex justify-center items-center bg-gray-100">
                    <ImageOff size={50} className="text-gray-500" />
                    </div>
                )}
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
    )
}
export default Lib_StoryLayoutBook