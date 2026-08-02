
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
        <div className="flex items-center justify-start gap-2 mb-4 ">
            <div className="bg-black p-2 text-white rounded-xl justify-center items-center flex">
                <Book size={20}/>
            </div>
            <div>
                <h1 className="text-md font-bold text-gray-800 rounded-full">Preview Book</h1>
                <p className="text-gray-400 text-xs">Preview the complete information of book.</p>
            </div>
                
        </div>

        
        <div className="w-full flex gap-4 border border-gray-300 p-6 rounded-xl">
        {/* Book Cover Container */}
        <div className="bg-gray-200 h-100 w-120 justify-center items-center flex flex-col gap-4 shadow-lg">

            {!preview && (<div className="h-full w-full flex flex-col items-center justify-center p-4 gap-1">
                <ImageOff size={50} className="text-gray-500" />
                <h1 className="text-gray-500 text-sm font-semibold">No Cover Image</h1>
                <h1 className="text-gray-400 text-xs">Please upload a cover image</h1>
            </div>)}

            {preview && (<img src={preview} className="h-full object-cover" />)}
        </div>
        {/* Book Details Container */}
        <div className=" w-full p-4 justify-start items-start flex flex-col gap-5">

            <div className="w-full justify-between items-start flex flex-col border-gray-300 border-b">
                <div className="w-full flex flex-col gap-2">
                    <h1 className="text-gray-800 text-3xl font-bold italic">{title || "Book name"}</h1>
                    <h1 className="text-xs text-gray-500"> {author || "Author"}</h1>
                </div>

                <div className="w-full flex justify-between items-center gap-3 my-4">

                    <div className="flex gap-2">
                        <div className={`${!category ? "hidden" : ""} justify-center items-center flex gap-2 bg-gray-200 py-2 px-3 text-xs font-bold rounded-full uppercase`}><Book size={15}/>{category}</div>
                        <div className={`${pages.length > 0 ? "" : "hidden"} justify-center items-center flex gap-2 bg-gray-200 py-2 px-3 text-xs font-bold rounded-full uppercase`}><BookOpenText size={15}/>{pages.length} Pages</div>
                    </div>

                </div>

            </div>

           {moral && (
            <div className="mt-6 rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100">
                    <Sparkles size={20} className="text-violet-600" />
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                    AI Generated Moral Summary
                    </h2>
                    <p className="text-xs text-gray-500">
                    Generated using AI to provide a concise overview of the story.
                    </p>
                </div>
                </div>

                <div className="mt-5 rounded-xl bg-white p-5 border border-gray-100">
                <p className="leading-8 text-gray-700 whitespace-pre-line">
                    {moral}
                </p>
                </div>
            </div>
            )}

            <div className=" rounded-2xl bg-white border border-gray-300 p-6 shadow-sm w-full">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                <BookOpen size={20} className="text-black" />
                </div>

                <div>
                <h2 className="text-md font-semibold text-gray-900">
                    Description
                </h2>
                <p className="text-xs text-gray-500">
                    A brief overview of this book.
                </p>
                </div>
            </div>

            <div className="mt-5 rounded-xl bg-white p-5 border border-gray-100">
                <p className="leading-8 text-gray-700 whitespace-pre-line text-xs">
                {description || "No description added to this book."}
                </p>
            </div>
            </div>

           <div className="justify-end flex gap-2 w-full">
                        
            <div className={`${file ? "hidden" : ""} justify-center items-center flex gap-2 p-2 border text-xs text-black font-bold rounded-lg hover:-translate-y-1 cursor-pointer transition`} onClick={openFileExplorer}> 
                <Image size={15}/> Add Cover
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        onChange={handleImagePreview} 
                    />
                </div>
                <button className={`${preview ? null : "hidden"} justify-center items-center flex gap-2 bg-red-600 p-2 text-xs text-white font-bold rounded-lg hover:-translate-y-1 cursor-pointer transition`} onClick={() => {setFile(null); setPreview(null)}}>
                <X size={15}/> Remove Cover
                </button>
                <button className="justify-center items-center flex gap-2 bg-blue-600 p-2 text-xs text-white font-bold rounded-lg hover:-translate-y-1 cursor-pointer transition" onClick={handleConfirmation}><Plus size={15}/> Upload Book</button>
            </div>
                                    
        </div>
    </div>
    </>
                                    

    )
}
export default PreviewBook

 