import {Book, ArrowLeft, ArrowRight, AudioLines, ImageOff, Eye, VolumeOff, X, ChevronLeft, EarOff} from "lucide-react";
import {
  speak,
  pauseSpeech,
  resumeSpeech,
  stopSpeech, 
} from '../utils/speech.js';
import { useEffect, useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import TagalogIntroduction from "../src/assets/audio/Tagalog-Introduction.mp3"
import EnglishIntroduction from "../src/assets/audio/English-Introduction.mp3"
import { typeEffect } from "../utils/typeEffect.js";
const Lib_StoryLayoutBook = ({book, isEnd, showText, showImage, pageIndex, nextPage, prevPage, onClose}) => {

    const [isIntroduction, setIsIntroduction] = useState(true);

    const hasImage = book?.pages[pageIndex]?.pageImage;
    const hasText = book?.pages[pageIndex]?.pageText;
    const hasAudio = book?.pages[pageIndex]?.pageAudio;

    const summary = book?.moral || "Sorry summary is not available yet. :(";
    const displaySummary = typeEffect(isEnd ? summary : '');
    const [displayText, setDisplayText] = useState('');
    
    


    return(
       <div className="h-screen w-full justify-center items-center flex flex-col gap-4">

      
   
        <div className={`h-80 sm:h-125 md:h-170 lg:h-full w-full justify-center items-center flex bg-stone-900`}>
          {/* Text */}
          {isEnd && (
            <div className="h-full w-full justify-center items-center flex flex-col">
              <div className="max-w-5xl justify-center items-center flex flex-col gap-6">
                <h1 className="text-lg font-bold text-yellow-500">SUMMARY OF THE STORY</h1>
                <p className="text-stone-300 text-xs leading-relaxed">{displaySummary}</p>
                <button className="text-xs text-white justify-center items-center flex gap-1 cursor-pointer hover:underline"
                onClick={onClose}
                ><ChevronLeft size={15}/>Return</button>
              </div>
              
            </div>
          )}

          {!isEnd && (
            <div className="relative h-full w-full text-lg justify-center items-start flex flex-col bg-pink-500">
              
              
              <button className="absolute top-2 sm:top-4 md:top-10 right-2 sm:right-4 md:right-10 p-2 rounded-xl justify-center items-center flex gap-2 cursor-pointer"
              onClick={onClose}>
                <X size={15} className="text-white"/> 
              </button>
              <button className="absolute left-2 sm:left-4 md:left-10  p-3 rounded-full justify-center items-center flex gap-2 bg-white/50 cursor-pointer backdrop-blur-sm"
              onClick={prevPage}>
                <ArrowLeft size={15} className="text-white"/> 
                
              </button>
              
              {!book?.pages[pageIndex]?.pageImage ?
              (
                <div className="bg-stone-800 flex flex-col justify-center items-center h-full w-full gap-5">
                  <div className="hidden w-28 h-28 rounded-full bg-stone-700/50 sm:flex items-center justify-center">
                    <ImageOff size={56} className="text-stone-500" />
                  </div>

                  <div className="text-center">
                    <h1 className="sm:hidden text-lg sm:text-4xl text-stone-700 font-bold">
                      NO IMAGE
                    </h1>
                    <p className="text-xs sm:text-sm text-stone-500">
                      This book does not have a page image available.
                    </p>
                  </div>
                </div>
              )
              :
              (
                <img src={book?.pages[pageIndex]?.pageImage} className="h-full w-full object-fill" />
              )
              }
              
              
              <div className="absolute bottom-0 w-full bg-linear-to-t from-black/50 via-black/20 to-transparent px-8 py-8 flex flex-col gap-2 justify-center overflow-hidden">
                
                <div className="justify-start items-start flex gap-1">
                  <p className="w-fit text-[10px] bg-stone-800/50 p-2 text-stone-500 rounded-lg shrink-0">
                    {`Page ${pageIndex + 1}.`}
                </p>
                {!book?.pages[pageIndex]?.pageImage && (<p className="w-fit text-[10px] bg-stone-800/50 p-2 text-stone-500 rounded-lg shrink-0"
                title="Not image supported">
                    <ImageOff size={15} className="block sm:hidden"/>
                    <h1 className="hidden sm:block">Not Image Supported</h1>
                </p>)}
                {!book?.pages[pageIndex]?.pageAudio && (<p className="w-fit text-[10px] bg-stone-800/50 p-2 text-stone-500 rounded-lg shrink-0"
                title="Not audio supported">
                    <EarOff size={15} className="block sm:hidden"/>
                    <h1 className="hidden sm:block">Not audio supported</h1>
                </p>)}
                </div>
                

                <div
                    className="text-center text-white text-[8px] md:text-sm font-medium leading-relaxed drop-shadow-lg break-words"
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(hasText)
                    }}
                />

            </div>
              
              
           
           {isIntroduction ? 
           (
            <audio src={book.language.toLowerCase() === 'filipino' ? TagalogIntroduction : EnglishIntroduction} 
                   controls 
                   autoPlay
                   onEnded={() => setIsIntroduction(false)}
                   className="absolute hidden"
            />
           )
           :
           (
            <audio src={hasAudio} 
                   controls 
                   autoPlay
                   onEnded={() => {
                    setTimeout(() => {
                      nextPage();
                    }, 2000);
                  }}
                   className="absolute hidden"
            />
           )}
            

              <button className="absolute right-2 sm:right-4 md:right-10 p-3 rounded-full justify-center items-center flex gap-2 bg-white/50 cursor-pointer backdrop-blur-sm"
              onClick={nextPage}>
             
                <ArrowRight size={15} className="text-white"/> 
              </button>

              
            </div>
            )}


        </div>
    

    </div>
    )
}
export default Lib_StoryLayoutBook