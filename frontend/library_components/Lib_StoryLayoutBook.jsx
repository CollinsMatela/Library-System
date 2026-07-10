import {Book, ArrowLeft, ArrowRight, AudioLines, ImageOff, Eye, VolumeOff} from "lucide-react";
import {
  speak,
  pauseSpeech,
  resumeSpeech,
  stopSpeech, 
} from '../utils/speech.js';
import { useEffect } from "react";
const Lib_StoryLayoutBook = ({book, showText, showImage, pageIndex, nextPage, prevPage, onClose}) => {

    const hasImage = book?.pages[pageIndex]?.pageImage;
    const hasText = book?.pages[pageIndex]?.pageText;

    useEffect(() => {
        if (pageIndex >= book.pages.length) return;

        const timer = setTimeout(() => {
            const utterance = new SpeechSynthesisUtterance(hasText);

            utterance.onend = () => {
                nextPage();
            };

            speechSynthesis.speak(utterance);
        }, 1500);

        return () => {
            clearTimeout(timer);
            speechSynthesis.cancel();
        };
    }, [pageIndex, hasText]);

    return(
       <div className="h-screen w-fit justify-center items-center flex flex-col gap-4">

      
   
        <div className={`h-full w-full justify-center items-center flex p-10`}>
          {/* Text */}

            <div className="relative h-full w-full text-lg justify-center items-start flex flex-col bg-gray-50">
              {/* <header className="absolute top-10 right-10 w-full justify-end items-center flex mb-10 gap-2">
              <button className="bg-gray-200 rounded-lg px-4 py-2 text-black cursor-pointer hover:-translate-y-1" onClick={() => AutoStoryTelling(hasText)}><AudioLines className="text-gray-500"/></button>
              </header> */}
              
              <button className="absolute left-10 px-6 py-4 rounded-full justify-center items-center flex gap-2 bg-white/50 cursor-pointer backdrop-blur-sm"
              onClick={prevPage}>
                <ArrowLeft size={20}/> 
                <h1 className="text-sm">Back</h1> 
              </button>
              
              <img src={book.pages[pageIndex].pageImage} className="h-full w-full object-fill" />

              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/50 via-black/20 to-transparent px-8 py-8 flex justify-center">
                <p className="max-w-4xl text-center text-white text-2xl md:text-3xl font-medium leading-relaxed drop-shadow-lg">
                    {hasText}
                </p>
            </div>

              <button className="absolute right-10 px-6 py-4 rounded-full justify-center items-center flex gap-2 bg-white/50 cursor-pointer backdrop-blur-sm"
              onClick={nextPage}>
              <h1 className="text-sm">Next</h1> 
                <ArrowRight size={20}/> 
              </button>

              <footer className="absolute left-10 bottom-10">
                <h1 className="text-xs text-gray-500 bg-white/50 py-2 px-3 rounded-lg">Page {pageIndex + 1}</h1>
              </footer>
            </div>


          {/* Empty state */}
          {!book.pages[pageIndex].pageImage && (
            <div className="flex justify-center items-center h-full">
              <ImageOff size={40} className="text-gray-500" />
            </div>
          )}

        </div>
    

    </div>
    )
}
export default Lib_StoryLayoutBook