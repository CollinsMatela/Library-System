
import { BookOpenText, Play, CheckCheck, Book, HandHelping, ArrowLeft, Pen, Trash, X, Plus, Image } from "lucide-react";
const PreviewBook = ({preview, type, category, pages, title, description, language, author, publication, file, fileInputRef, openFileExplorer, handleImagePreview, handleConfirmation, setFile, setPreview}) => {
    return(
        <>
        <div>
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
                        <div className={`${!type ? "hidden" : ""} justify-center items-center flex gap-2 bg-gray-200 py-2 px-3 text-sm font-bold rounded-full uppercase`}><Book size={20}/>{type}</div>
                        <div className={`${!category ? "hidden" : ""} justify-center items-center flex gap-2 bg-gray-200 py-2 px-3 text-sm font-bold rounded-full uppercase`}><Book size={20}/>{category}</div>
                        <div className={`${pages.length > 0 ? "" : "hidden"} justify-center items-center flex gap-2 bg-gray-200 py-2 px-3 text-sm font-bold rounded-full uppercase`}><BookOpenText size={20}/>{pages.length} Pages</div>
                    </div>

                    <div className="flex gap-2">
                        
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

           <div className="w-full py-4 rounded-xl">
                 <h1 className="text-gray-500 text-sm font-md">{description || "—"}</h1>
           </div>
                                    
           {/* <div className="w-full flex flex-col gap-2">

            {informations.filter(info =>
                info.value !== null &&
                info.value !== undefined &&
                info.value !== "" &&
                info.value !== "—"
            ).map((info, index) => (
                <div key={index}
                className="w-full border-b-1 border-gray-300 justify-between items-center flex p-2">
                <h1 className="text-xs font-bold text-gray-500">{info.label}</h1>
                <h1 className="text-sm font-bold uppercase">{info.value}</h1>
                </div>
            ))}

            </div> */}
        </div>
    </div>
    </>
                                    

    )
}
export default PreviewBook

 