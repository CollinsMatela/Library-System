
const PreviewBook = ({preview, title, description, language, author, publication, file, fileInputRef, openFileExplorer, handleImagePreview, handleConfirmation}) => {
    return(
        <div className="relative bg-white h-150 w-1/2 flex flex-col shadow-6xl">
                            

                            {/* Image */}
                            <div className={`w-full h-full bg-gray-200 rounded-xl overflow-hidden`}>

                                {preview && (
                                    <img
                                    src={preview}
                                    alt="preview"
                                    className="w-full h-full"
                                    />
                                )}
                            </div>
                            
                            
                            <div className={`${preview? "bg-black/50" : "bg-black"} absolute inset-0 justify-between items-start flex flex-col p-10 rounded-xl`}>
                                <div className="w-full justify-between items-center flex">
                                    <span className="px-3 py-1 text-sm font-bold bg-gray-100/20 text-white rounded-full">
                                        Book Preview
                                    </span>
                                    <button className={`${preview ? null : "hidden"} px-3 py-1 text-sm font-bold bg-gray-100/20 text-white rounded-full cursor-pointer hover:bg-red-500/50`} onClick={() => {setFile(null); setPreview(null)}}>x</button>
                                </div>
                                 {/* Content */}
                                <div className="flex flex-col gap-3 w-full">
                                    
                                    {/* Title */}
                                    <h1 className="text-2xl font-bold text-white">
                                    {title || "Book Title"}
                                    </h1>

                                    {/* Description */}
                                    <p className="text-white text-sm leading-relaxed">
                                    {description || "Short description of the book will appear here."}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mt-2">

                                    <span className="px-3 py-1 text-sm bg-gray-100 text-gray-500 rounded-full">
                                        {language || "—"}
                                    </span>

                                    </div>

                                    <div className="w-full justify-between items-center flex">
                                        <p className="text-xs text-white mt-2">
                                        By {author || "Author Name"}
                                        </p>
                                        <p className="text-xs text-white mt-2">
                                        By {publication || "Publication Date"}
                                        </p>
                                    </div>
                                    
                                    <button className="h-10 text-white font-semibold bg-pink-500 border border-pink-500 hover:bg-pink-600 rounded-xl cursor-pointer" onClick={handleConfirmation}>+ Upload Story</button>
                                    <div className={`${file ? "hidden" : ""} bg-gray-200 p-2 text-gray-500 font-semibold rounded-xl cursor-pointer justify-center items-center flex`} onClick={openFileExplorer}> 
                                    + Cover Image
                                        <input 
                                            type="file" 
                                            ref={fileInputRef} 
                                            className="hidden" 
                                            onChange={handleImagePreview} 
                                        />
                                    </div>

                                </div>
                            </div>
                            
                            
                    </div>
    )
}
export default PreviewBook