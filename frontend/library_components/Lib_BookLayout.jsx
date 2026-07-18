import { useEffect, useState } from "react"
import {Book, ArrowLeft, ArrowRight, AudioLines, ImageOff, Images, X, TextInitial, Sparkle} from "lucide-react";
import Lib_StoryLayoutBook from "./Lib_StoryLayoutBook";
import Lib_BasedLayoutBook from "./Lib_BasedLayoutBook";
import {
  speak,
  pauseSpeech,
  resumeSpeech,
  stopSpeech,
} from '../utils/speech.js';
import {toast} from 'react-toastify'
import axios from 'axios'

const Lib_BookLayout = ({book, onClose}) => {

    const [pageIndex, setPageIndex] = useState(0);

    const [showText, setShowText] = useState(true);
    const [showImage, setShowImage] = useState(false);

    const nextPage = () => {
        if (pageIndex >= book?.pages.length - 1) {
        toast.info('Reached the last page.')
        return;
    }
          setPageIndex((prev) => prev + 1);
    }
    const prevPage = () => {
        if(pageIndex === 0){
            toast.info('Already in the first page.')
            return
        }
        setPageIndex((prev) => prev - 1);
    }

    const displayText = () => {
          setShowText(true)
          setShowImage(false)
    }
    const displayImage = () => {
          setShowImage(true)
          setShowText(false)
    }


    return(
        <section className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

            <div className="relative h-full w-full justify-center bg-trnasparent items-start flex overflow-auto">

                
                <div className="absolute right-10 top-10 flex flex-col gap-2">
                    <button className="px-4 py-2 text-black cursor-pointer" onClick={() => {onClose(); stopSpeech();}}><X className="text-white hover:text-red-500"/></button>
                    {book.category.toLowerCase() !== 'story book' && (
                        <>
                        <button className={`${showText ? "bg-white" : "border border-white text-white"} rounded-lg px-4 py-2 cursor-pointer hover:-translate-y-1`} onClick={displayText}><TextInitial/> </button>
                        <button className={`${showImage ? "bg-white" : "border border-white text-white"} rounded-lg px-4 py-2 text-black cursor-pointer hover:-translate-y-1`} onClick={displayImage}><Images/></button>
                        </>
                    )}
                    
                </div>

                {book?.type.toLowerCase() === 'fiction' &&
                 book?.category.toLowerCase() === 'story book' 
                 &&
                 (
                 <Lib_StoryLayoutBook
                 book={book}
                showText={showText}
                showImage={showImage}
                pageIndex={pageIndex}
                nextPage={nextPage}
                prevPage={prevPage}
                onClose={onClose}
                 />
                 )}
                
                {book?.type.toLowerCase() === 'non-fiction' &&
                (
                 <Lib_BasedLayoutBook
                book={book}
                showText={showText}
                showImage={showImage}
                pageIndex={pageIndex}
                nextPage={nextPage}
                prevPage={prevPage}
                onClose={onClose}/>   
                )}
                
                
            </div>
            
            
        </section>
    )
}
export default Lib_BookLayout