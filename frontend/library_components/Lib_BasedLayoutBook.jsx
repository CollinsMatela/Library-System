import {Book, ArrowLeft, ArrowRight, AudioLines, ImageOff, Images, X, VolumeOff, Type, Bold, Italic, TextAlignCenter} from "lucide-react";
import { useState } from "react";
import {
  speak,
  pauseSpeech,
  resumeSpeech,
  stopSpeech,
} from '../utils/speech.js';

const Lib_BasedLayoutBook = ({book, showText, textSize, textAlignment, isBold, isItalic, theme, pageIndex, nextPage, prevPage, onClose}) => {
    

    const hasImage = book?.pages[pageIndex]?.pageImage;
    const hasText = book?.pages[pageIndex]?.pageText;

    return (
    <div className="h-screen w-5xl flex flex-col gap-4 mt-10 rounded-xl">


      {showText && (
      book?.pages?.map((page, index) => (
        <div key={page._id} className={`w-full flex flex-col`}>
          {/* Text */}
          {page.pageText && (
            <div className="justify-center items-start flex flex-col bg-white rounded-xl border border-stone-500">
               
              <header className={`${theme ? "bg-stone-950 border-stone-800" : "bg-white border-stone-300"} rounded-t-xl w-full justify-between items-center flex gap-2 border-b p-4`}>
                <div className="w-fit justify-center items-center flex gap-1">
                 
                </div>
                 
                 
                 <div className="w-fit justify-center items-center flex gap-1">
                    <button className={`${theme ? "hover:bg-stone-800" : "hover:bg-stone-200"} justify-center items-center flex gap-1 border border-stone-300 rounded-lg p-2 text-stone-800 cursor-pointer`} onClick={() => speak(page.pageText)}>
                        <AudioLines size={15} className={`${theme ? "text-stone-300" : "text-stone-500"}`}/>
                        <h1 className={`${theme ? "text-white" : "text-stone-500"} text-xs`}>Text-To-Speech</h1>
                    </button>
                    <button className={`${theme ? "hover:bg-stone-800" : "hover:bg-stone-200"}  rounded-lg p-2 text-stone-500 cursor-pointer`} onClick={() => stopSpeech()}>
                      <VolumeOff size={15} className={`${theme ? "text-stone-300" : "text-stone-500"}`}/>
                    </button>
                 </div>
                 
              </header>
              
              {/**Text Container */}
              <div className={`${showText ? "" : "hidden"}  text-${textAlignment}  w-full ${theme ? "bg-stone-950" : "bg-stone-50"} p-10`}>
                 <h1 className={`text-${textSize} ${isBold && ('font-bold')} ${isItalic && ('italic')} ${theme ? "text-white" : "text-stone-800"} leading-loose whitespace-pre-line wrap-anywhere`}>{page.pageText}</h1>
              </div>

              <footer className={`${theme ? "bg-stone-950 border-stone-800" : "bg-white border-stone-300"} w-full rounded-b-xl justify-center items-center flex border-t p-4`}>
                <h1 className={`text-xs ${theme ? "text-white" : "text-stone-800"} p-2`}>Page {index + 1}</h1>
              </footer>
            </div>
          )}

          {/* Empty state */}
          {!page.pageText && (
            <div className="flex justify-center items-center h-full">
              <ImageOff size={40} className="text-gray-500" />
            </div>
          )}

        </div>
      )))}


    </div>
  );
}
export default Lib_BasedLayoutBook