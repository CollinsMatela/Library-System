import { useState, useEffect, useRef } from "react";
import { TextAlignCenter, Pen, Trash, Image, Sparkle, Sparkles, Repeat, PenBox, FilePlay, FileText, Book, BookOpenText, ImageOff, Plus } from "lucide-react";
import axios from "axios";
import {toast} from "react-toastify";
import Confirmation_Popup from "../../popup/Confirmation_Popup";

const Preview_BookInformation = ({bookDetails}) => {

      return(
        <>
        <div className="w-full px-4 lg:px-10">

        {/* ================= DESCRIPTION ================= */}
            <div className="w-full flex flex-col gap-3 md:p-6 border-0 md:border border-stone-300 md:rounded-xl">

                <div>
                    <h2 className="text-stone-700 text-sm font-bold">
                        Preview
                    </h2>

                    <p className="text-stone-500 text-xs">
                        Preview every book information.
                    </p>
                </div>

        <div className="w-full flex flex-col md:flex-row gap-4">
        {/* Book Cover Container */}
        <div className="bg-white w-120 justify-start items-start flex flex-col gap-4">
            {!bookDetails?.cover ?
            (
                <div className="h-100 w-80 bg-stone-100 border border-stone-300 rounded-lg justify-center items-center flex flex-col gap-1">
                    <ImageOff size={50} className="text-stone-300"/>
                </div>
                
            )
            :
            (
                <img src={bookDetails?.cover} className="bg-stone-100 h-100 w-80 object-cover" />
            )}

            <button className="w-full bg-yellow-100 border border-yellow-500 justify-center items-center flex gap-1 p-2 rounded-lg">
                        <Plus size={15} className="text-yellow-500"/>
                        <h1 className="text-xs text-yellow-500">Add Cover</h1>
            </button>
            

        </div>
        
        {/* Book Details Container */}
        <div className=" w-full justify-start items-start flex flex-col gap-5">

            <div className="w-full justify-between items-start flex flex-col border-stone-300 border-b pb-4">
                <div className="w-full flex flex-col gap-2">
                    <h1 className="text-stone-500 text-xl font-bold italic">{bookDetails?.title || "Book name"}</h1>
                    <h1 className="text-xs text-stone-500">By {bookDetails?.author || "—"}</h1>
                </div>

            </div>
           
           <div className="w-full flex flex-col gap-2 border border-stone-300 p-2 rounded-lg">

           <div className="w-full bg-stone-200 rounded-lg border border-stone-300 p-3">
                <h1 className="text-xs text-stone-500 font-bold">Book Details</h1>
                <p className="text-[11px] text-stone-500">
                    View and manage the basic information of this book.
                </p>
            </div>
            

{Object.entries(bookDetails)
    .filter(([key, value]) => value !== null && value !== undefined && value !== "")
    .map(([key, value]) => (
        <div
            key={key}
            className="w-full flex items-start justify-between gap-6 py-3 border-b border-stone-200 last:border-0"
        >
            <span className="text-xs font-normal text-stone-500 capitalize shrink-0">
                {key}
            </span>

            <span className="text-xs text-stone-800 text-right wrap-break-words max-w-[70%]">
                {key === "pages"
                ? `${value.length} pages`
                : typeof value === "string" && value.length > 50
                    ? `${value.slice(0, 50)}...`
                    : value}
            </span>
        </div>
    ))}



            </div>
        </div>
    </div>

            </div>
                    </div>
        </>
      )
}
export default Preview_BookInformation