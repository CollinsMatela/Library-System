
import { BookOpenText, BookOpen, Play, CheckCheck, Book, HandHelping, ArrowLeft, Pen, Trash, X, Plus, Image, Sparkle, Sparkles, ImageOff } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
const PreviewBook = ({preview, type, category, pages, title, description, moral, setMoral, language, author, publication, file, fileInputRef, openFileExplorer, handleImagePreview, handleConfirmation, setFile, setPreview}) => {

    const AISummarization = async () => {

          const texts = pages.map((p) => p.pageText);

          const bookData = {
            title: title,
            language: language,
            texts: texts
          }
          try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/ai-summarization`, bookData)
            setMoral(res.data.summary);
            toast.success(res.data.message);
          } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
          }
    }

    return(
        <>
        <div className="flex items-center justify-start border-t border-stone-300 py-4 gap-2 mt-10 mb-4">
            <div className="bg-stone-800 p-2 text-white justify-center items-center flex">
                <Book size={20}/>
            </div>
            <div>
                <h1 className="text-md font-bold text-stone-800 rounded-full">Preview Book</h1>
                <p className="text-stone-400 text-xs">Preview the complete information of book.</p>
            </div>
                
        </div>

        
        <div className="w-full flex flex-col gap-4 justify-start items-start flex border-0 md:border border-stone-300 md:p-6 md:rounded-xl mb-4">
        {/* Book Cover Container */}
        <div className="bg-stone-200 h-50 md:h-100 w-full justify-center items-center flex flex-col gap-4">

            {!preview && (<div className="h-full w-full flex flex-col items-center justify-center p-4 gap-1">
                <ImageOff size={50} className="text-stone-500" />
                <h1 className="text-stone-500 text-sm font-semibold">No Cover Image</h1>
                <h1 className="text-stone-400 text-xs">Please upload a cover image</h1>
            </div>)}

            {preview && (<img src={preview} className="h-full object-cover" />)}
        </div>
        {/* Book Details Container */}
        <div className=" w-full p-4 justify-start items-start flex flex-col gap-5">

            <div className="w-full justify-between items-start flex flex-col border-stone-300 border-b">
                <div className="w-full flex flex-col gap-2">
                    <h1 className="text-stone-800 text-3xl font-bold">{title || "Book name"}</h1>
                    <h1 className="text-xs text-stone-500"> {author || "Author"}</h1>
                </div>

                <div className="w-full flex justify-between items-center gap-3 my-4">

                    <div className="flex gap-2">
                        <div className={`${!category ? "hidden" : ""} justify-center items-center flex gap-2 bg-stone-200 py-2 px-3 text-xs font-bold rounded-full uppercase`}><Book size={15}/>{category}</div>
                        <div className={`${pages.length > 0 ? "" : "hidden"} justify-center items-center flex gap-2 bg-stone-200 py-2 px-3 text-xs font-bold rounded-full uppercase`}><BookOpenText size={15}/>{pages.length} Pages</div>
                    </div>

                </div>

            </div>

            <div className=" md:rounded-xl bg-white border-0 md:border border-stone-300 md:p-6 md:shadow-sm w-full">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-200">
                <BookOpen size={20} className="text-black" />
                </div>

                <div>
                <h2 className="text-md font-semibold text-stone-900">
                    Description
                </h2>
                <p className="text-xs text-stone-500">
                    A brief overview of this book.
                </p>
                </div>
            </div>

            <div className="mt-5 rounded-xl bg-white p-6 border border-stone-100">
                <p className="leading-8 text-stone-700 whitespace-pre-line text-xs">
                {description || "No description added to this book."}
                </p>
            </div>
            </div>
                                    
        </div>

        
    </div>

    <div className="justify-end flex gap-2 w-full mb-4">
                        
            <div className={`${file ? "hidden" : ""} justify-center items-center flex gap-1 p-2 text-xs text-stone-800 font-bold hover:bg-stone-200 cursor-pointer transition`} onClick={openFileExplorer}> 
                <Image size={15}/> Add Cover
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        onChange={handleImagePreview} 
                    />
                </div>
                <button className={`${preview ? null : "hidden"} justify-center items-center flex gap-2 bg-red-600 p-2 text-xs text-white font-bold hover:bg-red-700 cursor-pointer transition`} onClick={() => {setFile(null); setPreview(null)}}>
                <X size={15}/> Remove Cover
                </button>
                <button className="justify-center items-center flex gap-1 bg-stone-800 p-2 text-xs text-white font-bold hover:bg-stone-900 cursor-pointer transition" onClick={handleConfirmation}><Plus size={15}/> Upload Book</button>
            </div>
    </>
                                    

    )
}
export default PreviewBook

 