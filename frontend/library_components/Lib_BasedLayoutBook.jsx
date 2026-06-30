import {Book, ArrowLeft, ArrowRight, AudioLines, ImageOff, Images, X, VolumeOff} from "lucide-react";
import { useState } from "react";
import {
  speak,
  pauseSpeech,
  resumeSpeech,
  stopSpeech,
} from '../utils/speech.js';

const Lib_BasedLayoutBook = ({book, showText, showImage, pageIndex, nextPage, prevPage, onClose}) => {

    const hasImage = book?.pages[pageIndex]?.pageImage;
    const hasText = book?.pages[pageIndex]?.pageText;

    return (
    <div className="h-screen w-225 flex flex-col gap-4">


      {showText && (
      book?.pages?.map((page, index) => (
        <div key={page._id} className={`w-full bg-white flex flex-col`}>
          {/* Text */}
          {page.pageText && (
            <div className="p-10 text-lg justify-center items-start flex flex-col bg-white">
              <header className="w-full justify-end items-center flex mb-10 gap-2">
              <button className="bg-white rounded-lg px-4 py-2 text-black cursor-pointer hover:-translate-y-1" onClick={() => speak(page.pageText)}><AudioLines/></button>
              <button className="bg-white rounded-lg px-4 py-2 text-black cursor-pointer hover:-translate-y-1" onClick={() => stopSpeech()}><VolumeOff/></button>
              </header>
              
              
              <h1 className={`${showText ? "" : "hidden"} text-md text-gray-800 leading-loose whitespace-pre-line`}>{page.pageText}</h1>

              <footer className="w-full justify-center items-center flex mt-10">
                <h1 className="text-xs text-gray-500">Page {index + 1}</h1>
              </footer>
            </div>
          )}

          {/* Empty state */}
          {!page.pageImage && !page.pageText && (
            <div className="flex justify-center items-center h-full">
              <ImageOff size={40} className="text-gray-500" />
            </div>
          )}

        </div>
      )))}

      {showImage && (
      book?.pages?.map((page, index) => (
        <div key={page._id} className={`w-full bg-white flex flex-col`}>
          {/* Text */}
          {page.pageImage && (
            <div className="relative text-lg justify-center items-start flex flex-col bg-gray-50">
              <header className="absolute top-10 right-10 w-full justify-end items-center flex mb-10 gap-2">
              <button className="bg-gray-200 rounded-lg px-4 py-2 text-black cursor-pointer hover:-translate-y-1" onClick={() => alert('TTS not yet integrated.')}><AudioLines className="text-gray-500"/></button>
              </header>
              
              
              <img src={page.pageImage} className="h-full w-full object-cover" />

              <footer className="absolute bottom-10 w-full justify-center items-center flex mt-10">
                <h1 className="text-xs text-gray-500 bg-white/50 py-2 px-3 rounded-lg">Image {index + 1}</h1>
              </footer>
            </div>
          )}

          {/* Empty state */}
          {!page.pageImage && !page.pageText && (
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