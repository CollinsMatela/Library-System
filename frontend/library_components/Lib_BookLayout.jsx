import { useState } from "react"
import { Moon, Sun, X } from "lucide-react";
import Lib_StoryLayoutBook from "./Lib_StoryLayoutBook";
import Lib_BasedLayoutBook from "./Lib_BasedLayoutBook";
import { stopSpeech } from '../utils/speech.js';
import {toast} from 'react-toastify'

const Lib_BookLayout = ({book, onClose}) => {

    const [pageIndex, setPageIndex] = useState(0);

    const [showText] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const [textSize, setTextSize] = useState('base');
    const [textAlignment, setTextAlignment] = useState('left');
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [theme, setTheme] = useState(false);

    const totalPages = book?.pages?.length ?? 0;
    const isLiterature = book?.category?.toLowerCase() === 'literature';

    const nextPage = () => {
        if (pageIndex >= totalPages - 1) {
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
        setIsEnd(false);
        setPageIndex((prev) => prev - 1);
    }

    // Lets a reader jump straight to a page (progress dots, "read again").
    const goToPage = (index) => {
        if (!totalPages) return;
        setPageIndex(Math.min(Math.max(index, 0), totalPages - 1));
        setIsEnd(false);
    }

    const exitSummary = () => setIsEnd(false);

    return(
        <section className="fixed inset-0 bg-black/85 backdrop-blur-xl flex justify-center items-center z-50">

            <div className="relative h-full w-full justify-center bg-transparent items-center flex overflow-y-auto scroll-smooth p-2 sm:px-4">

                {!isLiterature && (
    <div
        className={`fixed right-5 top-5 flex gap-1 p-2 rounded-xl shadow-sm border backdrop-blur-xs transition-colors duration-300 ${
            theme
                ? "bg-stone-900/85 border-stone-700"
                : "bg-white/85 border-stone-300"
        }`}
    >
        {/* Theme Button */}
        <button
            className={`transition duration-300 ease-in-out shadow-sm p-2 justify-center items-center flex cursor-pointer rounded-xl ${
                theme
                    ? "bg-stone-800 text-white"
                    : "bg-white border border-stone-300 text-stone-500"
            }`}
            onClick={() => setTheme(prev => !prev)}
        >
            {theme ? <Moon size={15} /> : <Sun size={15} />}
        </button>

        {/* Close Button */}
        <button
            className={`p-2 cursor-pointer transition-colors ${
                theme ? "text-stone-300" : "text-stone-500"
            }`}
            onClick={() => {
                onClose();
                stopSpeech();
            }}
        >
            <X
                size={15}
                className="hover:text-red-500"
            />
        </button>
    </div>
)}

                {isLiterature && (
                  <Lib_StoryLayoutBook
                  book={book}
                  isEnd={isEnd}
                pageIndex={pageIndex}
                nextPage={nextPage}
                prevPage={prevPage}
                goToPage={goToPage}
                exitSummary={exitSummary}
                onClose={onClose}
                  />
                  )}

                {!isLiterature && (
                 <Lib_BasedLayoutBook
                book={book}
                showText={showText}
                textSize={textSize}
                setTextSize={setTextSize}
                textAlignment={textAlignment}
                setTextAlignment={setTextAlignment}
                isBold={isBold}
                setIsBold={setIsBold}
                isItalic={isItalic}
                setIsItalic={setIsItalic}
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