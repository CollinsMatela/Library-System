import { AudioLines, ImageOff, ImagePlus, Plus, ScanText } from "lucide-react"
import { useEffect } from "react";
import { useRef, useState } from "react"
import { toast } from "react-toastify";
import axios from "axios";
import Ocr from "../utils/ocr";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";


const AddPage_Modal = ({onClose, bookDetails, setBookDetails, saveNewPage}) => {
    
    useEffect(() => {
      console.log(CLOUDINARY_CLOUD_NAME)
      console.log(CLOUDINARY_UPLOAD_PRESET)
    },[])

    // Added tools for react-quill
    let modules = {
    toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ align: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
        ["clean"],
    ],
    };

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
    const ocrRef = useRef(null);
    const imageRef = useRef(null);
    const audioRef = useRef(null);

    const [image, setImage] = useState(null);
    const [audio, setAudio] = useState(null);
    const [text, setText] = useState("");

    const [ocrLoading, setOcrLoading] = useState(false);

    const OcrProcess = async (image) => {
           setOcrLoading(true)
          try {
            if(!image) return;
            const imageToText = await Ocr(image)
            setText(imageToText);
          } catch (error) {
            console.log('Error Processing image:', error);
            toast.warning('Error Processing image')
          } finally {
            setOcrLoading(false)
          }
    }
    
    const [saveLoading, setSaveLoading] = useState(false);
    const SaveNewPage = async () => {
        const plainText = text?.replace(/<[^>]*>/g, "").trim();

        if (!plainText && !image && !audio) {
            toast.warning("Please provide at least text, an image, or audio.");
            return;
        }
        setSaveLoading(true)
    try {
        const [convertedImage, convertedAudio] = await Promise.all([
            uploadToCloudinary(image, "image"),
            uploadToCloudinary(audio, "video")
        ]);

        setBookDetails((bookDetails) => ({
            ...bookDetails,
            pages: [
                ...(bookDetails.pages || []),
                {
                    pageText: text,
                    pageImage: convertedImage,
                    pageAudio: convertedAudio
                }
            ]
        }));

        toast.success("Page added temporarily.");
        setSaveLoading(false)
        onClose();
    } catch (error) {
        console.error("Upload failed:", error);
        toast.error("Failed to upload page files.");
    } finally {
        setSaveLoading(false)
    }
};


    return(
        <>
        <div className="fixed inset-0 bg-black/50 z-20 justify-center items-center flex">
            
            
            <div className="relative bg-white w-5xl rounded-xl">
                {ocrLoading && (
                <div className="absolute inset-0 z-100 flex flex-col items-center justify-center rounded-xl bg-stone-950/90 backdrop-blur-sm">

                    {/* Scanning Icon */}
                    <div className="relative mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/20">
                        <div className="absolute inset-0 rounded-full border border-blue-500 animate-ping opacity-30" />

                        <ImagePlus
                            size={24}
                            className="text-white animate-pulse"
                        />
                        
                    </div>

                    {/* Text */}
                    <h1 className="text-sm font-semibold tracking-widest text-white uppercase">
                        Scanning Image
                    </h1>

                    <p className="mt-1 text-xs text-stone-400">
                        Extracting text...
                    </p>

                </div>
            )}

                <header className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 p-4 border-b border-stone-300">
                    <div>
                       <h1 className="text-sm text-stone-800 font-bold">Create New Page</h1>
                    <p className="text-xs text-stone-500">Add another page to this book.</p> 
                    </div>

                    <div className="justify-center items-center flex flex-row gap-1">
                    {bookDetails.category === 'literature' &&
                    (<div className="w-full gap-1 flex flex-row">

                    {!image && (
                    <div className="flex w-full items-center justify-between gap-3 rounded-lg">

                        <input
                        ref={imageRef}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0] || null)}
                        />

                        <button
                        type="button"
                        onClick={() => imageRef.current?.click()}
                        title="Choose Image"
                        className="flex items-center gap-1 rounded-lg bg-white border border-stone-300 px-3 py-2 text-xs text-stone-500 transition hover:bg-stone-100 cursor-pointer"
                        >
                        <ImagePlus size={15} />
                        </button>
                    </div>
                    )}
                    
                    {!audio && (
                        <div className="flex w-fit items-center justify-between gap-3 rounded-lg">
                            

                            <input
                            ref={audioRef}
                            type="file"
                            className="hidden"
                            accept="audio/*"
                            onChange={(e) => setAudio(e.target.files?.[0] || null)}
                            />

                            <button
                            type="button"
                            onClick={() => audioRef.current?.click()}
                            title="Choose Audio"
                            className="flex items-center gap-1 rounded-lg bg-white border border-stone-300 px-3 py-2 text-xs text-stone-500 transition hover:bg-stone-100 cursor-pointer"
                            >
                            <AudioLines size={15} />
                            </button>
                        </div>
                        )} 
                    </div>)}

                    {/**OCR */}
                    <div className="flex w-full items-center justify-between gap-4 rounded-lg bg-stone-50/80 transition hover:border-stone-400 hover:bg-stone-50">

                    {/* Hidden File Input */}
                    <input
                        ref={ocrRef}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => OcrProcess(e.target.files[0] || null)}
                    />

                    {/* Upload Button */}
                    <button
                        type="button"
                        disabled={ocrLoading}
                        onClick={() => ocrRef.current?.click()}
                        title="Extract image into text"
                        className={`flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-xs font-medium shadow-sm transition cursor-pointer
                            ${
                                ocrLoading
                                    ? "cursor-not-allowed bg-stone-200 text-stone-400"
                                    : "bg-stone-800 text-white hover:bg-stone-900 active:scale-[0.98]"
                            }
                        `}
                    >
                        <ScanText size={15} />

                        {ocrLoading ? "Processing..." : "OCR"}
                    </button>

                    </div>
                        
                    </div>
                    

                    
                </header>

                <div className="w-full h-100 p-4 flex flex-col gap-2 overflow-y-auto">
                    {/* Text Container */}
                    <div className="bg-stone-50 w-full h-fit flex flex-col mb-12">
                    <ReactQuill
                    className="w-full min-h-20 bg-transparent text-stone-800"
                    theme="snow"
                    value={text}
                    onChange={(value) => setText(value)}
                    placeholder="Write the page content..."
                    modules={modules}
                    />
                    </div>

                    {/* Preview Container */}
                    {bookDetails.category === 'literature' && (<div className="flex h-100 w-full flex-col gap-3 rounded-lg border border-stone-200 bg-stone-50 p-6">
                    {!image && !audio && (
                        <p className="m-auto text-xs text-stone-400">
                        Image and audio previews appear here.
                        </p>
                    )}

                    {image && (
                        <div className="relative min-h-[220px] w-full overflow-hidden rounded-lg bg-stone-200">
                        <img
                            src={URL.createObjectURL(image)}
                            alt="Selected page"
                            className="h-full w-full object-contain"
                        />

                        <button
                            type="button"
                            onClick={() => setImage(null)}
                            className="absolute right-2 top-2 rounded-md bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
                        >
                            Remove image
                        </button>
                        </div>
                    )}

                    {audio && (
                        <div className="w-full rounded-lg border border-stone-300 bg-white p-3">
                        <p className="mb-2 truncate text-xs font-medium text-stone-600">
                            {audio.name}
                        </p>

                        <audio controls className="w-full">
                            <source src={URL.createObjectURL(audio)} type={audio.type} />
                            Your browser does not support audio playback.
                        </audio>

                        <button
                            type="button"
                            onClick={() => setAudio(null)}
                            className="mt-2 text-xs text-red-500 hover:text-red-700"
                        >
                            Remove audio
                        </button>
                        </div>
                    )}
                    </div>)}

                    

                    
                  
                </div>

                <footer className="flex justify-end items-center gap-2 p-4 border-t border-stone-300">
                  <button className="flex items-center gap-1 rounded-lg bg-transparent px-3 py-2 text-xs text-stone-500 transition hover:bg-stone-200" onClick={onClose}>
                    Close
                </button> 

                <button className={`flex items-center gap-1 rounded-lg ${saveLoading ? "bg-stone-200 animate-pulse text-stone-400" : "bg-stone-800 hover:bg-stone-900 text-white"} px-4 py-2 text-xs transition`} 
                onClick={SaveNewPage}
                disabled={saveLoading}>
                    <Plus size={15} className={saveLoading ? "hidden" : "block"}/>
                    <h1>{saveLoading ? "...Saving" : "Save"}</h1>
                </button>
                </footer>
                
            </div>
        </div>
        </>
    )
}
export default AddPage_Modal