import {Book, ArrowLeft, ArrowRight, AudioLines, ImageOff, Eye, VolumeOff} from "lucide-react";
import {
  speak,
  pauseSpeech,
  resumeSpeech,
  stopSpeech, 
} from '../utils/speech.js';
import { useEffect } from "react";
import axios from "axios";
const Lib_StoryLayoutBook = ({book, showText, showImage, pageIndex, nextPage, prevPage, onClose}) => {

    const hasImage = book?.pages[pageIndex]?.pageImage;
    const hasText = book?.pages[pageIndex]?.pageText;

    const introductions = [
      {
        language: "English",
        text: `Hello, little friends! Welcome to our story time. Today, we'll journey into the wonderful world of "${book.title}" by ${book.author}. Get comfortable, open your imagination, and let's discover this amazing story together. Are you ready? Then let's begin our adventure! ${hasText}`
      },
      {
        language: "Tagalog",
        text: `Kamusta, mga munting kaibigan! Maligayang pagdating sa ating oras ng pagkukuwento. Ngayon, sabay nating tuklasin ang kahanga-hangang mundo ng "${book.title}" na isinulat ni ${book.author}. Umupo nang kumportable, buksan ang inyong imahinasyon, at simulan na natin ang ating masayang paglalakbay. Handa na ba kayo? Tara na! ${hasText}`
      },
    ];


    useEffect(() => {
    if (pageIndex >= book.pages.length) return;

    let utterance;

    if (pageIndex === 0) {

        if(book.language.toLowerCase() === 'filipino') {
          utterance = new SpeechSynthesisUtterance(introductions[1].text);
        } else {
          utterance = new SpeechSynthesisUtterance(introductions[0].text);
        }
        
    } else {
        utterance = new SpeechSynthesisUtterance(hasText);
    }

    utterance.onend = () => {
        nextPage();
    };


    const voices = speechSynthesis.getVoices();

    utterance.voice = voices.find(
    voice => voice.name === "Google US English"
);  

    const timer = setTimeout(() => {
        speechSynthesis.speak(utterance);
    }, 3000);

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