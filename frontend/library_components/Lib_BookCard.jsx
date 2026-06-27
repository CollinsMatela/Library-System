
const Lib_BookCard = ({onClick, handleViewBook, bookId, cover, title, author}) => {
    return(
         <div className="space-y-2 cursor-pointer hover:-translate-y-1" onClick={handleViewBook}>
                    <img src={cover} className="h-100 w-full object-cover rounded-md"/>

                    <div className="justify-center items-center flex flex-col w-full py-2 gap-2">

                    <div className="w-full justify-center items-center flex flex-col">
                        <h1 className="text-gray-800 font-bold text-sm truncate">{title.toUpperCase() || "—"}</h1>
                        <p className="text-gray-500 text-xs">Authored by: {author || "—"}</p>
                    </div>
                    </div>
                    
        </div>
    )
}
export default Lib_BookCard