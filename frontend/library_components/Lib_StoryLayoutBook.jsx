import {Book, ArrowLeft, ArrowRight, AudioLines, ImageOff, Eye, VolumeOff, X, ChevronLeft} from "lucide-react";
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

    const summary = book?.moral;
    const displaySummary = typeEffect(isEnd ? summary : '');
    const [displayText, setDisplayText] = useState('');
    
    


    return(
       <div className="h-screen w-fit justify-center items-center flex flex-col gap-4">

      
   
        <div className={`h-full w-full justify-center items-center flex`}>
          {/* Text */}
          {isEnd && (
            <div className="h-full w-full justify-center items-center flex flex-col">
              <div className="w-5xl justify-center items-center flex flex-col gap-6">
                <h1 className="text-lg font-bold text-white">Story Summary</h1>
                <p className="text-white leading-relaxed">{displaySummary}</p>
                <button className="text-xs text-white justify-center items-center flex gap-1 cursor-pointer hover:underline"
                onClick={onClose}
                ><ChevronLeft size={15}/>Return</button>
              </div>
              
            </div>
          )}

          {!isEnd && (
            <div className="relative h-full w-full text-lg justify-center items-start flex flex-col bg-stone-50">
              {/* <header className="absolute top-10 right-10 w-full justify-end items-center flex mb-10 gap-2">
              <button className="bg-stone-200 rounded-lg px-4 py-2 text-black cursor-pointer hover:-translate-y-1" onClick={() => AutoStoryTelling(hasText)}><AudioLines className="text-stone-500"/></button>
              </header> */}
              
              <button className="absolute top-10 right-10 p-2 rounded-xl justify-center items-center flex gap-2 cursor-pointer"
              onClick={onClose}>
                <X size={15} className="text-white"/> 
              </button>
              <button className="absolute left-10 p-4 rounded-full justify-center items-center flex gap-2 bg-white/50 cursor-pointer backdrop-blur-sm"
              onClick={prevPage}>
                <ArrowLeft size={15}/> 
                
              </button>
              
              {!book?.pages[pageIndex]?.pageImage ?
              (
                <div className="bg-stone-800 flex flex-col justify-center items-center h-full w-200 gap-5">
                  <div className="w-28 h-28 rounded-full bg-stone-700/50 flex items-center justify-center">
                    <ImageOff size={56} className="text-stone-500" />
                  </div>

                  <div className="text-center">
                    <h1 className="text-3xl text-stone-700 font-semibold">
                      No Cover Image
                    </h1>
                    <p className="text-sm text-stone-500 mt-1">
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
              
              
              <div className="absolute bottom-0 w-full bg-linear-to-t from-black/50 via-black/20 to-transparent px-8 py-8 flex flex-col gap-2 justify-center">
              <p className="w-fit text-xs bg-white px-3 py-1 rounded-lg">{`Page ${pageIndex + 1}.`}</p>
                <p 
                className="max-w-4xl text-center text-white text-2xl md:text-sm font-medium leading-relaxed drop-shadow-lg"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(hasText) }}>
                </p>
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
            

              <button className="absolute right-10 p-4 rounded-full justify-center items-center flex gap-2 bg-white/50 cursor-pointer backdrop-blur-sm"
              onClick={nextPage}>
             
                <ArrowRight size={15}/> 
              </button>

              
            </div>
            )}


        </div>
    

    </div>
    )
}
export default Lib_StoryLayoutBook