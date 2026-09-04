import { useState, useEffect, useRef } from "react";
import { BookOpenText, Play, CheckCheck, Book, HandHelping, ArrowLeft, Pen, Trash, Image, Sparkle, Sparkles, Repeat, PenBox, FilePlay, FileText } from "lucide-react";
import axios from "axios";
import {toast} from "react-toastify";
import Confirmation_Popup from "../../popup/Confirmation_Popup";
const Edit_BookPage = ({bookDetails, setBookDetails, fetchBookById, Summarization}) => {

    console.log(bookDetails)

    const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    const [errorMessage, setErrorMessage] = useState("");
    const [isBookInformationUpdate, setIsBookInformationUpdate] = useState(false);
    const [isBookPageUpdate, setIsBookPageUpdate] = useState(false);

    const [selectedPageIndex, setSelectedPageIndex] = useState(null);
    const [selectedNewImage, setSelectedNewImage] = useState(null);

    const [imageFile, setImageFile] = useState(null);
    const imageRef = useRef(null);

    const [audio, setAudio] = useState(null);
    const [audioPreview, setAudioPreview] = useState('');
    const audioRef = useRef(null);

    useEffect(() => {
    setImageFile(null);
    },[selectedPageIndex])

    const UpdatePageConformation = () => {
          setErrorMessage('');
          setIsBookPageUpdate(true)
    }

    return(
        <>
        {isBookPageUpdate && (<Confirmation_Popup
        errorMessage={errorMessage}
        message={'Are you sure to update the book page?'}
        onConfirm={updatePage}
        onCancel={() => setIsBookPageUpdate(false)}
        />)}

        <div className="w-full border-t border-stone-300 pt-10 flex flex-col px-10">

            
            
            <div className="flex flex-col w-full gap-2 border-t border-stone-300 mt-10 py-10">

            <div className="flex justify-between items-start gap-3 mb-5">
                <div className="justify-center items-center flex gap-2">
                    <div className="bg-stone-800 p-2">
                        <FileText size={20} className="text-white" />
                    </div>

                    <div>
                        <h2 className="text-md font-bold text-stone-800">
                            Edit Page 
                        </h2>
                        <p className="text-xs text-stone-500">
                          Manage to edit and update the book page information.
                        </p>
                    </div>
                </div>

                    <select className='w-fit p-2 text-xs bg-white border border-stone-300 rounded-xl outline-none'
                        onChange={(e) => setSelectedPageIndex(parseInt(e.target.value))}
                    >
                        <option value="">Select Page No.</option>
                        {bookDetails?.pages?.map((page, index) => (
                            <option 
                            key={index} 
                            value={index}>
                            Page {index + 1}
                            </option>
                        ))}
                    </select> 
                </div>

            <div className="flex gap-2">
             

            </div>
                
                {selectedPageIndex !== null && selectedPageIndex >= 0 && selectedPageIndex < pages.length && (
                <div className="w-full flex flex-col gap-4">

                <div className="w-full bg-white border border-stone-300 rounded-xl p-4">

                <div className="flex items-center gap-3 mb-5">
                    <div className="bg-stone-200 p-2 rounded-xl">
                        <FileText size={20} className="text-stone-700" />
                    </div>

                    <div>
                        <h2 className="text-md font-bold text-stone-800">
                            Page Text
                        </h2>
                        <p className="text-xs text-stone-500">
                            Edit the narration or story content for this page.
                        </p>
                    </div>
                </div>

                <textarea
                    className="w-full min-h-[400px] resize-none rounded-xl border border-stone-300 bg-stone-50 p-4 text-sm text-stone-700 leading-7 outline-none transition-all duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                    placeholder="Enter the page text..."
                    value={pages[selectedPageIndex]?.pageText || ""}
                    onChange={(e) => {
                        const newPages = [...pages];
                        newPages[selectedPageIndex].pageText = e.target.value;
                        setPages(newPages);
                    }}
                />

                <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-stone-400">
                        Write the content that will appear on this page.
                    </span>

                    <span className="text-xs font-medium text-stone-500">
                        {pages[selectedPageIndex]?.pageText?.length || 0} characters
                    </span>
                </div>

            </div>
                    
                    {/**Image Preview */}
                    <div className="w-full bg-white border border-stone-300 rounded-xl p-4">

                        <div className="flex justify-between items-start gap-3 mb-5">
                            <div className="justify-center items-center flex gap-2">
                                    <div className="bg-stone-200 p-2 rounded-xl">
                                    <Image size={20} className="text-stone-700" />
                                    </div>

                                    <div>
                                        <h2 className="text-md font-bold text-stone-800">
                                            Page Image
                                        </h2>
                                        <p className="text-xs text-stone-500">
                                            Update the image displayed on this page.
                                        </p>
                                    </div>
                            </div>
                            
                            {selectedPageIndex !== null && selectedPageIndex >= 0 && selectedPageIndex < pages.length && (
                            <div className="flex flex-col gap-1">
                                <button className='w-fit justify-center items-center flex gap-2 p-2 text-xs bg-stone text-white cursor-pointer rounded-xl outline-none hover:-translate-y-1'
                                onClick={() => imageRef.current.click()}
                                >
                                <input
                                    type="file"
                                    ref={imageRef}
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                                <Image size={15} />
                                Change Page Image
                                </button>
                            </div>  
                            )}
                        </div>

                        {pages[selectedPageIndex]?.pageImage ? (
                            <div className="w-full flex flex-col items-center">
                                <img
                                    src={
                                        pages[selectedPageIndex].pageImage instanceof File
                                                ? URL.createObjectURL(pages[selectedPageIndex].pageImage)
                                                : pages[selectedPageIndex].pageImage
                                    }
                                    alt="Page Preview"
                                    className="w-full max-h-80 object-contain rounded-lg border border-stone-200 bg-stone-50"
                                />
                            </div>
                        ) : (
                            <div className="w-full h-72 border-2 border-dashed border-stone-300 rounded-xl bg-stone-50 flex flex-col justify-center items-center">
                                <Image size={20} className="text-stone-400 mb-3" />

                                <h3 className="font-semibold text-stone-700 text-sm">
                                    No Image Uploaded
                                </h3>

                                <p className="text-xs text-stone-500 text-center mt-1">
                                    Upload an image to preview it here.
                                </p>
                            </div>
                        )}

                    </div>

                    {/**Audio Preview */}
                        {category.toLowerCase() === 'literature' && (
                            <div className="w-full justify-start items-start flex flex-col p-4 bg-white border border-stone-300 rounded-xl mb-2">
                                <div className="flex justify-between items-start gap-2 mb-5 w-full">
                                        
                                        <div className="justify-center items-center flex gap-2">
                                            <div className="bg-stone-200 p-2 rounded-xl">
                                                <FilePlay size={20} className="text-stone-700"/>
                                            </div>
                                            <div>
                                                    <h2 className="text-md font-bold text-stone-800">Narration Audio</h2>
                                                    <p className="text-xs text-stone-500">Update the audio narration of this page.</p>
                                            </div>
                                        </div>
                                        

                                        {selectedPageIndex !== null && selectedPageIndex >= 0 && selectedPageIndex < pages.length && (
                                        <div className="flex flex-col gap-1">
                                            <button className='w-fit justify-center items-center flex gap-2 p-2 text-xs bg-stone text-white cursor-pointer rounded-xl outline-none hover:-translate-y-1'
                                            onClick={() => audioRef.current.click()}
                                            >
                                            <input
                                                type="file"
                                                accept="audio/*"
                                                ref={audioRef}
                                                onChange={handleAudioChange}
                                                className="hidden"
                                            />
                                            <Image size={15} />
                                            Change Page Audio
                                            </button>
                                        </div>  
                                        )}
                                </div>

                                {bookDetails?.pages?.[selectedPageIndex]?.pageAudio ? 
                                    <audio
                                        className="w-full"
                                        controls
                                        src={
                                            bookDetails.pages[selectedPageIndex].pageAudio instanceof File
                                                ? URL.createObjectURL(bookDetails.pages[selectedPageIndex].pageAudio)
                                                : bookDetails.pages[selectedPageIndex].pageAudio
                                        }
                                    />
                                    :
                                    <div className="w-full rounded-xl border-2 border-dashed border-stone-300 bg-stone-50 p-6 flex flex-col items-center justify-center text-center">
                                        <div className="p-3 rounded-full bg-stone-200 mb-3">
                                            <FilePlay size={20} className="text-stone-500" />
                                        </div>

                                        <h2 className="text-stone-700 text-sm font-semibold">
                                            No Narration Audio
                                        </h2>

                                        <p className="text-xs text-stone-500 mt-1">
                                            Upload an audio narration to preview it here.
                                        </p>
                                    </div>
                                }
                                    

                                
                            </div>
                            
                        )}

                    <div className="w-full justify-end items-center flex">
                    <button className="justify-center items-center flex gap-2 bg-green-600 py-2 px-3 text-xs text-white font-bold hover:-translate-y-1 cursor-pointer"
                    onClick={UpdatePageConformation}
                    >
                        <Pen size={15}/> Save Page No. {selectedPageIndex + 1}
                    </button>
                    </div>
                </div>
            )}
                
                
                
            </div>
            
            

        </div>
        </>
    )
}
export default Edit_BookPage;