import { useEffect, useState } from "react"
import {Book, ArrowLeft, ArrowRight, AudioLines, ImageOff, Images, X, TextInitial, Sparkle, TextAlignCenter, Bold, Italic, Moon, Sun} from "lucide-react";
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
    const [isEnd, setIsEnd] = useState(false);

    const [textSize, setTextSize] = useState('xs');
    const [textAlignment, setTextAlignment] = useState('')
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [theme, setTheme] = useState(false);

    const nextPage = () => {
        if (pageIndex >= book?.pages.length - 1) {
        toast.info('Reached the last page.')
        setIsEnd(true);
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
        <section className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">

            <div className="relative h-full w-full justify-center bg-transparent items-start flex overflow-y-auto scroll-smooth">

                
                {book?.type.toLowerCase() === 'non-fiction' && (<div className="fixed left-1/2 -translate-x-1/2 top-5 flex  gap-1 bg-white/50 backdrop-blur-xs p-2 rounded-xl shadow-sm border border-stone-300">
                     {/*Bold */}
                    <button className={`${isBold ? "bg-stone-800" : "bg-white border border-stone-300"} transition duration-300 ease-in-out shadow-sm p-2 justify-center items-center flex gap-1 border rounded-lg`}
                    onClick={() => setIsBold(prev => !prev)}>
                        <Bold size={15} className={`${isBold ? "text-white" : "text-stone-500"} text-xs`}/>
                    </button>
                    {/*Italic */}
                    <button className={`${isItalic ? "bg-stone-800" : "bg-white border border-stone-300"} transition duration-300 ease-in-out shadow-sm p-2 justify-center items-center flex gap-1 border rounded-lg`}
                    onClick={() => setIsItalic(prev => !prev)}>
                        <Italic size={15} className={`${isItalic ? "text-white" : "text-stone-500"} text-xs`}/>
                    </button>
                  {/*Text Align */}
                    <div className="p-2 bg-white justify-center items-center flex gap-1 border border-stone-300 rounded-lg">
                        <TextAlignCenter size={15} className="text-xs text-stone-500"/>
                        <select className="outline-none text-stone-500 text-xs"
                        onChange={(e) => setTextAlignment(e.target.value)}>
                        <option value="start">Left</option>
                        <option value="center">Center</option>
                        <option value="end">Right</option>
                      </select>
                    </div>
                    {/*Text Size */}
                    <div className="p-2 bg-white justify-center items-center flex gap-1 border border-stone-300 rounded-lg">
                        <h1 className="text-xs text-stone-500 border-r border-stone-300 pr-2">Size</h1>
                        <select className="outline-none text-stone-500 text-xs"
                        onChange={(e) => setTextSize(e.target.value)}>
                        <option value="xs">xs</option>
                        <option value="sm">sm</option>
                        <option value="md">md</option>
                        <option value="lg">lg</option>
                        <option value="xl">xl</option>
                      </select>
                    </div>
                    <button className={`${theme ? "bg-stone-800 rounded-xl" : "bg-white border border-stone-300 rounded-full"} transition duration-300 ease-in-out shadow-sm p-2 justify-center items-center flex cursor-pointer`}
                    onClick={() => setTheme(prev => !prev)}>
                       <h1 className={theme ? "text-white" : "text-stone-500"}>{theme ? <Moon size={15}/> : <Sun size={15}/>}</h1> 
                    </button>
                    
                    <button className="p-2 text-black cursor-pointer" onClick={() => {onClose(); stopSpeech();}}><X size={15} className="text-stone-500 hover:text-red-500"/></button>
                    
                    
                </div>)}

                {book?.type.toLowerCase() === 'fiction' &&
                 book?.category.toLowerCase() === 'story book' 
                 &&
                 (
                 <Lib_StoryLayoutBook
                 book={book}
                 isEnd={isEnd}
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
                textSize={textSize}
                textAlignment={textAlignment}
                isBold={isBold}
                isItalic={isItalic}
                theme={theme}
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