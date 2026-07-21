
import { BookOpenText, Play, CheckCheck, Book, HandHelping, ArrowLeft, Pen, Trash, X, Plus, Image, Sparkle, Sparkles } from "lucide-react";
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
        <div className="mt-10">
        <h2 className="text-3xl font-bold text-gray-800">Preview Book</h2>
        <p className="text-gray-400 text-md">Oversee the book information of {title || "the selected book"}.</p>
        </div>

        
        <div className="w-full flex gap-4 mt-10">
        {/* Book Cover Container */}
        <div className="bg-white w-120 flex flex-col gap-4">
            <img src={preview} className="bg-gray-100 h-100 object-cover shadow-xl mb-5" />
        </div>
        {/* Book Details Container */}
        <div className=" w-full p-4 justify-start items-start flex flex-col gap-5">

            <div className="w-full justify-between items-start flex flex-col border-gray-300 border-b-1">
                <div className="w-full flex flex-col gap-2">
                    <h1 className="text-gray-800 text-4xl font-md">{title || "Book name"}</h1>
                    <h1 className="text-sm text-gray-500">Authored by: {author || "—"}</h1>
                </div>

                <div className="w-full flex justify-between items-center gap-3 my-4">

                    <div className="flex gap-2">
                        <div className={`${!category ? "hidden" : ""} justify-center items-center flex gap-2 bg-gray-200 py-2 px-3 text-sm font-bold rounded-full uppercase`}><Book size={20}/>{category}</div>
                        <div className={`${pages.length > 0 ? "" : "hidden"} justify-center items-center flex gap-2 bg-gray-200 py-2 px-3 text-sm font-bold rounded-full uppercase`}><BookOpenText size={20}/>{pages.length} Pages</div>
                    </div>

                    <div className="flex gap-2">

                        <button className={`${type === 'fiction' ? "" : "hidden"} justify-center items-center flex gap-2 bg-white py-2 px-3 text-sm text-black font-bold rounded-lg hover:-translate-y-1 cursor-pointer`}
                        onClick={() => AISummarization()}>
                            <Sparkle size={20}/> Summary
                        </button>
                        
                        <div className={`${file ? "hidden" : ""} justify-center items-center flex gap-2 py-2 px-3 text-sm text-black font-bold rounded-lg hover:-translate-y-1 cursor-pointer`} onClick={openFileExplorer}> 
                        <Image/> Add Cover
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                className="hidden" 
                                onChange={handleImagePreview} 
                            />
                        </div>
                        <button className={`${preview ? null : "hidden"} justify-center items-center flex gap-2 bg-red-600 py-2 px-3 text-sm text-white font-bold rounded-lg hover:-translate-y-1 cursor-pointer`} onClick={() => {setFile(null); setPreview(null)}}>
                        <X/> Remove Cover
                        </button>
                        <button className="justify-center items-center flex gap-2 bg-blue-600 py-2 px-3 text-sm text-white font-bold rounded-lg hover:-translate-y-1 cursor-pointer" onClick={handleConfirmation}><Plus/> Upload Story</button>
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
                    <p className="text-sm text-gray-500">
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

            <div className="w-full py-4 rounded-xl">
                 <h1 className="text-gray-500 text-xs font-md">{description || "No Description"}</h1>
           </div>
                                    
        </div>
    </div>
    </>
                                    

    )
}
export default PreviewBook

 