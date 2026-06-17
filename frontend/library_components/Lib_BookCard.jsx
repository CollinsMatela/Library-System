
const Lib_BookCard = ({onClick, navigate, bookId, cover, title, author, genre, language, subject, referenceType, subjectArea, readingLevel, moralTheme, storyType}) => {
    return(
         <div className="space-y-2 cursor-pointer hover:-translate-y-1" onClick={navigate}>
                    <img src={cover} className="h-100 w-full object-cover rounded-md"/>

                    <div className="justify-center items-center flex flex-col w-full py-2 gap-2">

                    <div className="w-full justify-center items-center flex flex-col">
                        <h1 className="text-gray-800 font-bold text-sm truncate">{title.toUpperCase() || "—"}</h1>
                        <p className="text-gray-500 text-xs">Authored by: {author || "—"}</p>
                    </div>
                        

                    <div className="flex justify-between items-center gap-2">
                            {genre && (
                                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                                {genre || "—"}
                                </span>
                            )}
                            {language && (
                                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                                {language || "—"}
                                </span>
                            )}
                            {subject && (
                                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                                {subject || "—"}
                                </span>
                            )}
                            {referenceType && (
                                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                                {referenceType || "—"}
                                </span>
                            )}
                            {subjectArea && (
                                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                                {subjectArea || "—"}
                                </span>
                            )}
                            {readingLevel && (
                                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                                {readingLevel || "—"}
                                </span>
                            )}
                            {moralTheme && (
                                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                                {moralTheme || "—"}
                                </span>
                            )}
                            {storyType && (
                                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                                {storyType || "—"}
                                </span>
                            )}
                    </div>
                    </div>
                    
        </div>
    )
}
export default Lib_BookCard