import { useState } from "react"
import {Book, ArrowLeft, ArrowRight, AudioLines, ImageOff} from "lucide-react";
import Lib_StoryLayoutBook from "./Lib_StoryLayoutBook";
import Lib_BasedLayoutBook from "./Lib_BasedLayoutBook"
const Lib_BookLayout = ({book, onClose}) => {

    const [pageIndex, setPageIndex] = useState(0);

    const nextPage = () => {
        if (pageIndex >= book?.pages.length - 1) {
        alert("Reached the last page.");
        return;
    }
          setPageIndex((prev) => prev + 1);
    }
    const prevPage = () => {
        if(pageIndex === 0){
            return
        }
          setPageIndex((prev) => prev - 1);
    }

    return(
        <section className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
            {(book?.type === 'storybook' || book?.type === 'childrensbook') && 
            (<Lib_StoryLayoutBook 
            book={book}
            pageIndex={pageIndex}
            nextPage={nextPage}
            prevPage={prevPage}
            onClose={onClose}/>
            )}

            {(book?.type !== 'storybook' && book?.type !== 'childrensbook') && 
            (<Lib_BasedLayoutBook 
            book={book}
            pageIndex={pageIndex}
            nextPage={nextPage}
            prevPage={prevPage}
            onClose={onClose}/>
            )}
            
        </section>
    )
}
export default Lib_BookLayout