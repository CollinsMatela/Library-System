import { AudioLines, ImageOff, ImagePlus, Plus } from "lucide-react"
import { useEffect } from "react";
import { useRef, useState } from "react"
import { toast } from "react-toastify";
import axios from "axios";
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

    const imageRef = useRef(null);
    const audioRef = useRef(null);

    const [image, setImage] = useState(null);
    const [audio, setAudio] = useState(null);
    const [text, setText] = useState("");

    const SaveNewPage = async () => {
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

        toast.info(
            "Page added temporarily. Click 'Save Information' to save your changes."
        );

        onClose();
    } catch (error) {
        console.error("Upload failed:", error);
        toast.error("Failed to upload page files.");
    }
};


    return(
        <>
        <div className="fixed inset-0 bg-black/50 z-20 justify-center items-center flex">

            <div className="bg-white w-5xl rounded-xl">
                <header className="flex flex-col justify-start items-start p-4 border-b border-stone-300">
                    <h1 className="text-sm text-stone-800 font-bold">Create New Page</h1>
                    <p className="text-xs text-stone-500">Add another page to this book.</p>

                    
                </header>

                <div className="w-full h-100 p-4 flex flex-col gap-2 overflow-y-auto">
                    {bookDetails.category === 'literature' && 
                    (<div className="w-full gap-2 flex">
                       {!image && (
                    <div className="flex w-full items-center justify-between gap-3 rounded-lg border border-dashed border-stone-300 bg-stone-50 p-3">
                        <div>
                        <p className="text-sm font-medium text-stone-700">Page image</p>
                        <p className="text-xs text-stone-500">Choose an image for this page.</p>
                        </div>

                        <input
                        ref={imageRef}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                        />

                        <button
                        type="button"
                        onClick={() => imageRef.current?.click()}
                        className="flex items-center gap-1 rounded-lg bg-stone-800 px-3 py-2 text-xs text-white transition hover:bg-stone-900"
                        >
                        <ImagePlus size={15} />
                        Choose image
                        </button>
                    </div>
                    )}
                    {!audio && (
                    <div className="flex w-full items-center justify-between gap-3 rounded-lg border border-dashed border-stone-300 bg-stone-50 p-3">
                        <div>
                        <p className="text-sm font-medium text-stone-700">Page audio</p>
                        <p className="text-xs text-stone-500">Choose narration or audio for this page.</p>
                        </div>

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
                        className="flex items-center gap-1 rounded-lg bg-stone-800 px-3 py-2 text-xs text-white transition hover:bg-stone-900"
                        >
                        <AudioLines size={15} />
                        Choose audio
                        </button>
                    </div>
                    )} 
                    </div>)}


                    {/* Text Container */}
                    <div className="bg-stone-50 w-full h-full flex flex-col mb-12">
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

                <button className="flex items-center gap-1 rounded-lg bg-stone-800 px-3 py-2 text-xs text-white transition hover:bg-stone-900" onClick={SaveNewPage}>
                    <Plus size={15} />
                    <h1>Save</h1>
                </button>
                </footer>
                
            </div>
        </div>
        </>
    )
}
export default AddPage_Modal