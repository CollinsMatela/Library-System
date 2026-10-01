import { ImageOff, BookOpen } from "lucide-react";
import { useState } from "react";

const Lib_BookCard = ({ handleViewBook, book }) => {
    const [imgError, setImgError] = useState(false);
    const hasCover = book?.cover && !imgError;

    return (
        <div
            className="group relative flex flex-row h-40 sm:h-44 md:h-48 rounded-2xl overflow-hidden cursor-pointer bg-white border border-stone-200/60 shadow-sm hover:shadow-xl hover:shadow-stone-300/50 hover:-translate-y-1 transition-all duration-300"
            onClick={handleViewBook}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleViewBook();
                }
            }}
            role="button"
            tabIndex={0}
            aria-label={`View book: ${book?.title || "Untitled"}`}
        >
            {/* Cover Image */}
            <div className="relative w-28 sm:w-32 md:w-36 lg:w-40 h-full shrink-0 overflow-hidden bg-gradient-to-br from-stone-50 to-stone-100">
                {hasCover ? (
                    <img
                        src={book.cover}
                        alt={book.title}
                        className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-105"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="h-full w-full flex flex-col items-center justify-center gap-2">
                        <div className="h-12 w-12 rounded-xl bg-stone-200/80 flex items-center justify-center">
                            <ImageOff size={22} className="text-stone-400" />
                        </div>
                        <p className="text-[11px] text-stone-500 font-medium text-center px-3 line-clamp-2">
                            {book?.title || "No Title"}
                        </p>
                    </div>
                )}
            </div>

            {/* Book Info */}
            <div className="flex-1 p-4 flex flex-col justify-center min-w-0">
                <h3 className="text-sm font-bold text-stone-800 line-clamp-2 group-hover:text-stone-900 transition-colors">
                    {book?.title || "Untitled"}
                </h3>
                {book?.author && (
                    <p className="text-xs text-stone-500 mt-1 line-clamp-1">
                        by {book.author}
                    </p>
                )}
                {book?.category && (
                    <span className="inline-flex w-fit mt-2 px-2 py-0.5 bg-stone-100 text-stone-500 text-[10px] font-semibold rounded-md uppercase tracking-wider">
                        {book.category}
                    </span>
                )}
                <div className="flex items-center gap-1.5 mt-3 text-stone-400 group-hover:text-stone-600 transition-colors">
                    <BookOpen size={13} />
                    <span className="text-[11px] font-medium">View Details</span>
                </div>
            </div>
        </div>
    );
};

export default Lib_BookCard;
