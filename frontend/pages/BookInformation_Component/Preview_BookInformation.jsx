import { useState, useEffect, useRef } from "react";
import { TextAlignCenter, Pen, Trash, Image, Sparkle, Sparkles, Repeat, PenBox, FilePlay, FileText, Book, BookOpenText, ImageOff, Plus, Images } from "lucide-react";
import axios from "axios";
import {toast} from "react-toastify";
import Confirmation_Popup from "../../popup/Confirmation_Popup";
import LoadingContainer from "../../loadings/loadingContainer";

const Preview_BookInformation = ({bookDetails, setBookDetails}) => {
    

    const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    const uploadToCloudinary = async (file, resourceType = "image") => {
                if (!file) return "";
    
                const formData = new FormData();
    
                formData.append("file", file);
                formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
                    formData
                );
    
                return response.data.secure_url;
    };


      const coverRef = useRef(null)
      
      const [coverLoading, setCoverLoading] = useState(false)
      const handleCover = async (e) => {
            setCoverLoading(true)
            try {
                const coverFile = e.target.files[0];
                if(!coverFile) return;
                
                const convertedCover = await uploadToCloudinary(coverFile)
                setBookDetails((bookDetails) => ({
                    ...bookDetails,
                    cover: convertedCover
                }))
                setCoverLoading(false)
                toast.info('Book cover temporarily saved.')
            } catch (error) {
                toast.error('Failed to process cover')
            } finally {
                setCoverLoading(false)
            }
      }

      return(
        <>
        <div className="w-full px-4 lg:px-10 mb-4">

        {/* ================= DESCRIPTION ================= */}
            <div className="bg-white w-full flex flex-col gap-3 md:p-6 border-0 md:border border-stone-200 shadow-sm md:rounded-lg">

                <div>
                    <h2 className="text-stone-700 text-sm font-bold">
                        Preview
                    </h2>

                    <p className="text-stone-500 text-xs">
                        Preview every book information.
                    </p>
                </div>

        <div className="w-full flex flex-col lg:flex-row gap-4">
        {/* Book Cover Container */}
        <div className="bg-white w-full lg:w-80 xl:w-120 justify-start items-center lg:items-start flex flex-col gap-4">
            {bookDetails?.cover ?
            (
                <div className="relative">
                    {coverLoading && (
                        <LoadingContainer icon={<Images size={15} className="text-white animate-pulse"/>} maintext={'Processing Cover'} subtext={'Uploading Cover'}/>
                    )}
                    <img src={bookDetails.cover} className="bg-stone-100 h-100 w-full max-w-80 object-fit object-top" />
                </div>
                
            )
            :
            (
                <div className="h-100 w-full max-w-80 bg-stone-100 border border-stone-300 rounded-lg justify-center items-center flex flex-col gap-1">
                    <ImageOff size={50} className="text-stone-300"/>
                </div>
            )}
            
            <div className="w-full">
            <button className={`${coverLoading ? "bg-stone-200 text-stone-500" : "bg-stone-800 hover:bg-stone-900 text-white"}  w-full sm:w-fit justify-center items-center flex gap-2 p-2 text-xs cursor-pointer rounded-lg outline-none`}
            disabled={coverLoading}
            onClick={(e) => coverRef.current.click()}>
                        <Plus size={15} className="text-white"/>
                        {!bookDetails?.cover && (<h1 className="text-[10px] text-white">{coverLoading ? "...Uploading" : "Add Cover"}</h1>)}
                        {bookDetails?.cover && (<h1 className="text-[10px] text-white">{coverLoading ? "...Uploading" : "Change Cover"}</h1>)}
            </button>


            <input 
            type="file"
            accept="image/**"
            className="hidden"
            ref={coverRef}
            onChange={handleCover} />
            </div>
            
            

        </div>
        
        {/* Book Details Container */}
        <div className=" w-full min-w-0 justify-start items-start flex flex-col gap-5">

            <div className="w-full justify-between items-start flex flex-col border-stone-300 border-b pb-4">
                <div className="w-full flex flex-col gap-2">
                    <h1 className="text-stone-500 text-xl font-bold italic">{bookDetails?.title || "Book name"}</h1>
                    <h1 className="text-xs text-stone-500">{bookDetails?.author || "Unknown Author"}</h1>
                </div>

            </div>
           
            <div className="w-full flex flex-col gap-2 border border-stone-300 rounded-lg overflow-hidden">

                <div className="w-full bg-white border-b border-stone-300 p-3">
                    <h1 className="text-xs text-stone-600 font-bold">Book Information</h1>
                    <p className="text-[11px] text-stone-500">
                        Quick preview of the book's key details
                    </p>
                </div>

                <div className="w-full px-3 pb-2 flex flex-col gap-2">
                    {/* Basic Information */}
                    <div className="py-2">
                        <h2 className="text-[11px] font-semibold text-stone-600 mb-2">Basic Information</h2>
                        <div className="flex flex-col divide-y divide-stone-100">
                            {[
                                { label: "Category", value: bookDetails?.category },
                                { label: "Language", value: bookDetails?.language },
                                { label: "Publisher", value: bookDetails?.publisher },
                                { label: "Publication Year", value: bookDetails?.publication },
                                { label: "ISBN", value: bookDetails?.isbn },
                                { label: "Edition", value: bookDetails?.edition },
                                { label: "Volume", value: bookDetails?.volume },
                                { label: "Copies", value: bookDetails?.copies },
                                { label: "Pages", value: bookDetails?.pages?.length ? `${bookDetails.pages.length} pages` : null },
                            ].map((item, index) => {
                                if (!item.value && item.value !== 0) return null;
                                return (
                                    <div key={index} className="flex items-start justify-between gap-4 py-2">
                                        <span className="text-xs text-stone-500 shrink-0">{item.label}</span>
                                        <span className="text-xs text-stone-800 text-right wrap-break-words max-w-[65%]">
                                            {item.value}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Classification */}
                    {(bookDetails?.callNumber || bookDetails?.ddc) && (
                        <div className="py-2 border-t border-stone-200">
                            <h2 className="text-[11px] font-semibold text-stone-600 mb-2">Classification</h2>
                            <div className="flex flex-col divide-y divide-stone-100">
                                {bookDetails?.callNumber && (
                                    <div className="flex items-start justify-between gap-4 py-2">
                                        <span className="text-xs text-stone-500 shrink-0">Call Number</span>
                                        <span className="text-xs text-stone-800 text-right wrap-break-words max-w-[65%]">
                                            {bookDetails.callNumber}
                                        </span>
                                    </div>
                                )}
                                {bookDetails?.ddc && (
                                    <div className="flex items-start justify-between gap-4 py-2">
                                        <span className="text-xs text-stone-500 shrink-0">DDC</span>
                                        <span className="text-xs text-stone-800 text-right wrap-break-words max-w-[65%]">
                                            {bookDetails.ddc}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Additional Information */}
                    {(bookDetails?.illustrator || bookDetails?.series || bookDetails?.moral || bookDetails?.field || bookDetails?.subject || bookDetails?.gradeLevel || bookDetails?.donatedFrom || bookDetails?.receivedDate) && (
                        <div className="py-2 border-t border-stone-200">
                            <h2 className="text-[11px] font-semibold text-stone-600 mb-2">Additional Information</h2>
                            <div className="flex flex-col divide-y divide-stone-100">
                                {bookDetails?.illustrator && (
                                    <div className="flex items-start justify-between gap-4 py-2">
                                        <span className="text-xs text-stone-500 shrink-0">Illustrator</span>
                                        <span className="text-xs text-stone-800 text-right wrap-break-words max-w-[65%]">
                                            {bookDetails.illustrator}
                                        </span>
                                    </div>
                                )}
                                {bookDetails?.series && (
                                    <div className="flex items-start justify-between gap-4 py-2">
                                        <span className="text-xs text-stone-500 shrink-0">Series</span>
                                        <span className="text-xs text-stone-800 text-right wrap-break-words max-w-[65%]">
                                            {bookDetails.series}
                                        </span>
                                    </div>
                                )}
                                {bookDetails?.moral && (
                                    <div className="flex items-start justify-between gap-4 py-2">
                                        <span className="text-xs text-stone-500 shrink-0">Moral</span>
                                        <span className="text-xs text-stone-800 text-right wrap-break-words max-w-[65%]">
                                            {bookDetails.moral}
                                        </span>
                                    </div>
                                )}
                                {bookDetails?.field && (
                                    <div className="flex items-start justify-between gap-4 py-2">
                                        <span className="text-xs text-stone-500 shrink-0">Field</span>
                                        <span className="text-xs text-stone-800 text-right wrap-break-words max-w-[65%]">
                                            {bookDetails.field}
                                        </span>
                                    </div>
                                )}
                                {bookDetails?.subject && (
                                    <div className="flex items-start justify-between gap-4 py-2">
                                        <span className="text-xs text-stone-500 shrink-0">Subject</span>
                                        <span className="text-xs text-stone-800 text-right wrap-break-words max-w-[65%]">
                                            {bookDetails.subject}
                                        </span>
                                    </div>
                                )}
                                {bookDetails?.gradeLevel && (
                                    <div className="flex items-start justify-between gap-4 py-2">
                                        <span className="text-xs text-stone-500 shrink-0">Grade Level</span>
                                        <span className="text-xs text-stone-800 text-right wrap-break-words max-w-[65%]">
                                            {bookDetails.gradeLevel}
                                        </span>
                                    </div>
                                )}
                                {bookDetails?.donatedFrom && (
                                    <div className="flex items-start justify-between gap-4 py-2">
                                        <span className="text-xs text-stone-500 shrink-0">Donated From</span>
                                        <span className="text-xs text-stone-800 text-right wrap-break-words max-w-[65%]">
                                            {bookDetails.donatedFrom}
                                        </span>
                                    </div>
                                )}
                                {bookDetails?.receivedDate && (
                                    <div className="flex items-start justify-between gap-4 py-2">
                                        <span className="text-xs text-stone-500 shrink-0">Received Date</span>
                                        <span className="text-xs text-stone-800 text-right wrap-break-words max-w-[65%]">
                                            {new Date(bookDetails.receivedDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Description */}
                    {bookDetails?.description && (
                        <div className="py-2 border-t border-stone-200">
                            <h2 className="text-[11px] font-semibold text-stone-600 mb-2">Description</h2>
                            <p className="text-xs text-stone-700 leading-relaxed whitespace-pre-wrap">
                                {bookDetails.description}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>

            </div>
                    </div>
        </>
      )
}
export default Preview_BookInformation