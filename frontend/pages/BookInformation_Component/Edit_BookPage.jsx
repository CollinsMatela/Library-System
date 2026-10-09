import { useState, useEffect, useRef } from "react";
import { BookOpenText, Play, CheckCheck, Book, HandHelping, ArrowLeft, Pen, Trash, Image, Sparkle, Sparkles, Repeat, PenBox, FilePlay, FileText, BookDashed, Info, Plus, Images, AudioLines } from "lucide-react";
import axios from "axios";
import {toast} from "react-toastify";
import Confirmation_Popup from "../../popup/Confirmation_Popup";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import LoadingContainer from "../../loadings/loadingContainer";
import VideoGenerationModal from "../../modals/videoGenerationModal";

const Edit_BookPage = ({bookDetails, setBookDetails, handleImageChange, handleAudioChange, showPageUpdateConfirmation, selectedPageIndex, setSelectedPageIndex, isAddPageModal, changeImageLoading, changeAudioLoading}) => {

    let modules = {
    toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ align: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        ["blockquote", "link"],
        ["clean"],
    ],
    };

    const [errorMessage, setErrorMessage] = useState("");
    const [isBookInformationUpdate, setIsBookInformationUpdate] = useState(false);
    const [isBookPageUpdate, setIsBookPageUpdate] = useState(false);
    const [isVideoGenerationModal, setIsVideoGenerationModal] = useState(false);

    const [selectedNewImage, setSelectedNewImage] = useState(null);
    

    const [imageFile, setImageFile] = useState(null);
    const imageRef = useRef(null);

    const [audio, setAudio] = useState(null);
    const audioRef = useRef(null);

    useEffect(() => {
    setImageFile(null);
    },[selectedPageIndex])

    const UpdatePageConformation = () => {
          setErrorMessage('');
          setIsBookPageUpdate(true)
    }

    const [videoGenerationLoading, setVideoGenerationLoading] = useState(false)
    const AIVideoGeneration = async (image, prompt, aspectRatio) => {
          setVideoGenerationLoading(true)
          try {
            const data = {
                bookId: bookDetails._id,
                pageId: bookDetails.pages[selectedPageIndex]._id,
                pageIndex: selectedPageIndex,
                image: image,
                prompt: prompt,
                aspectRatio: aspectRatio
            }
            console.log(data)
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/video-generation`, data)
            console.log(res.data.message);
            toast.success(res.data.message)
            return { videoUrl: res.data.video }
          } catch (error) {
            console.log(error)
            // Let the modal show the error message to the user.
            throw error
          } finally {
            setVideoGenerationLoading(false)
          }
    }

    const handleVideoGeneration = () => {
          // A page must be selected first.
          if(selectedPageIndex === null || Number.isNaN(selectedPageIndex)) {
            return toast.warning('Select Page to edit')
          }

          // A newly added page is only stored in memory until the book is saved,
          // so it has no database _id yet and cannot generate a video.
          const selectedPage = bookDetails?.pages?.[selectedPageIndex]
          if(!selectedPage?._id) {
            return toast.warning('Please save this new page before generating a video.')
          }

          setIsVideoGenerationModal(true)
    }

    const [videoSaveLoading, setVideoSaveLoading] = useState(false)
    // Final approval: send the generated video to the backend,
    // which saves it to Cloudinary and stores the URL in the page.
    const SavePageVideo = async (videoUrl) => {
          // Make sure the page exists in the database before saving to it.
          const selectedPage = bookDetails?.pages?.[selectedPageIndex]
          if(!selectedPage?._id) {
            return toast.warning('Please save this new page before saving a video.')
          }

          setVideoSaveLoading(true)
          try {
            const data = {
                bookId: bookDetails._id,
                pageId: bookDetails.pages[selectedPageIndex]._id,
                videoUrl: videoUrl
            }
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/save-page-video`, data)

            // Update the local book so the saved video is kept without a reload.
            setBookDetails((current) => ({
                ...current,
                pages: current.pages.map((page, index) =>
                    index === selectedPageIndex
                        ? { ...page, pageVideo: res.data.pageVideo }
                        : page
                )
            }))

            toast.success(res.data.message)
            setIsVideoGenerationModal(false)
          } catch (error) {
            console.log(error)
            toast.error(
                    error?.response?.data?.message ||
                    `Request failed with save video`
                );
          } finally {
            setVideoSaveLoading(false)
          }
    }

    return(
        <>

        {isVideoGenerationModal && (
                    <VideoGenerationModal 
                    onClose={() => setIsVideoGenerationModal(false)}
                    page={bookDetails.pages[selectedPageIndex]}
                    pageNumber={selectedPageIndex + 1}
                    bookTitle={bookDetails.title}
                    AIVideoGeneration={AIVideoGeneration}
                    videoGenerationLoading={videoGenerationLoading}
                    onSaveVideo={SavePageVideo}
                    videoSaveLoading={videoSaveLoading}
                    />
        )}

        <div className="w-full flex flex-col px-4 lg:px-10">

            
            
            <div className="flex flex-col w-full gap-2 py-4">

            <div className="flex  justify-between items-center gap-2 w-full">
                <h1 className="text-xs text-stone-500">Find your page to manage</h1>
                <div className="flex gap-2">
                 <select className='w-fit p-2 text-[10px] text-stone-800 bg-white border border-stone-300 rounded-lg outline-none'
                        onChange={(e) => setSelectedPageIndex(parseInt(e.target.value))}
                    >
                        <option value="">Page No.</option>
                        {bookDetails?.pages?.map((page, index) => (
                            <option 
                            key={index} 
                            value={index}>
                            Page {index + 1}
                            </option>
                        ))}
                    </select>

                    <button className="bg-stone-800 text-[10px] text-white rounded-lg justify-center items-center flex gap-1 hover:bg-stone-900 p-2"
                    onClick={isAddPageModal}>
                    <Plus size={15} />
                    <h1>Add Page</h1>
                    </button>

                </div>
                    
                </div>

            {selectedPageIndex === null && (
                <div className="w-full bg-stone-100 p-8 border border-stone-200 rounded-lg flex flex-col justify-center items-center text-center">

                    <h3 className="text-xs font-medium text-stone-700">
                        No page selected
                    </h3>

                    <p className="text-[10px] text-stone-500 mt-1 max-w-xs">
                        Select a page from the list to view and edit its content.
                    </p>
                </div>
            )}

            <div className="flex gap-2">
             

            </div>
                
                {selectedPageIndex !== null && selectedPageIndex >= 0 && selectedPageIndex < bookDetails?.pages?.length && (
                <div className="w-full flex flex-col gap-4">

                <div className="w-full bg-white border border-stone-200 shadow-sm rounded-lg p-4">

                <div className="flex items-center gap-3 mb-5">

                    <div>
                        <h2 className="text-md font-bold text-stone-800">
                            Page Text
                        </h2>
                        <p className="text-xs text-stone-500">
                            Edit the narration or story content for this page.
                        </p>
                    </div>
                </div>

                <ReactQuill
                theme="snow"
                className="w-full"
                placeholder="Enter the page text..."
                modules={modules}
                value={bookDetails?.pages?.[selectedPageIndex]?.pageText || ""}
                onChange={(value) => {
                    let newPages = [...bookDetails.pages];

                    newPages[selectedPageIndex] = {
                    ...newPages[selectedPageIndex],
                    pageText: value,
                    };

                    setBookDetails({
                    ...bookDetails,
                    pages: newPages,
                    });
                }}
                />

                <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-stone-400">
                        Write the content that will appear on this page.
                    </span>

                    <span className="text-xs font-medium text-stone-500">
                        {bookDetails?.pages?.[selectedPageIndex]?.pageText?.length || 0} characters
                    </span>
                </div>

            </div>
                    
                    {/**Image Preview */}
                    {bookDetails?.category?.toLowerCase() === 'literature' && 
                    (<div className="relative w-full bg-white border border-stone-200 shadow-sm rounded-lg p-4">
                        {changeImageLoading && (
                            <LoadingContainer icon={<Images size={15} className="text-white animate-pulse"/>} maintext={'Processing Image'} subtext={'Updating Image'}/>
                        )}
                        <div className="flex justify-between items-start gap-3 mb-5">
                            <div className="justify-center items-center flex gap-2">

                                    <div>
                                        <h2 className="text-sm font-bold text-stone-800">
                                            Page Image
                                        </h2>
                                        <p className="text-xs text-stone-500">
                                            Update the image displayed on this page.
                                        </p>
                                    </div>
                            </div>
                            
                            {/* {selectedPageIndex !== null && selectedPageIndex >= 0 && selectedPageIndex < bookDetails?.pages?.length && ( */}
                            <div className="flex flex-row gap-1">
                                <button 
                                title="Do you want to generate video"
                                className="bg-white hover:bg-stone-100 p-2 rounded-lg border border-stone-300"
                                onClick={handleVideoGeneration}>
                                <Sparkles size={15} className="text-stone-800"/> 
                                </button>

                                <button className={`${changeImageLoading ? "bg-stone-200 text-stone-500" : "bg-stone-800 hover:bg-stone-900 text-white"}  w-fit justify-center items-center flex gap-2 p-2 text-xs cursor-pointer rounded-lg outline-none`}
                                disabled={changeImageLoading}
                                onClick={() => imageRef.current.click()}
                                >
                                <input
                                    type="file"
                                    ref={imageRef}
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                                <Image size={15} />
                                <h1 className="hidden sm:block text-[10px]">{changeImageLoading ? "...Updating" : "Update Image"}</h1>
                                </button>

                                
                            </div>  
                            {/* )} */}
                        </div>

                        {bookDetails?.pages?.[selectedPageIndex]?.pageImage ? (
                            <div className="w-full flex flex-col items-center">
                                <img
                                    src={
                                        bookDetails.pages[selectedPageIndex].pageImage instanceof File
                                                ? URL.createObjectURL(bookDetails.pages[selectedPageIndex].pageImage)
                                                : bookDetails.pages[selectedPageIndex].pageImage
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

                    </div>)}
                    

                    {/**Audio Preview */}
                        {bookDetails?.category?.toLowerCase() === 'literature' && (
                            <div className="relative w-full bg-white border border-stone-200 shadow-sm rounded-lg p-4">
                                {changeAudioLoading && (
                                    <LoadingContainer icon={<AudioLines size={15} className="text-white animate-pulse"/>} maintext={'Processing Audio'} subtext={'Updating Audio'}/>
                                )}
                                <div className="flex justify-between items-start gap-2 mb-5 w-full">
                                        
                                        <div className="justify-center items-center flex gap-2">
                                            <div>
                                                    <h2 className="text-sm font-bold text-stone-800">Narration Audio</h2>
                                                    <p className="text-xs text-stone-500">Update the audio narration of this page.</p>
                                            </div>
                                        </div>
                                        

                                        {selectedPageIndex !== null && selectedPageIndex >= 0 && selectedPageIndex < bookDetails?.pages?.length && (
                                        <div className="flex flex-col gap-1">
                                            <button className={`${changeAudioLoading ? "bg-stone-200 text-stone-500" : "bg-stone-800 hover:bg-stone-900 text-white"}  w-fit justify-center items-center flex gap-2 p-2 text-xs cursor-pointer rounded-lg outline-none`}
                                            disabled={changeAudioLoading}
                                            onClick={() => audioRef.current.click()}
                                            >
                                            <input
                                                type="file"
                                                accept="audio/*"
                                                ref={audioRef}
                                                onChange={handleAudioChange}
                                                className="hidden"
                                            />
                                            <AudioLines size={15} />
                                            <h1 className="hidden sm:block text-[10px]">{changeAudioLoading ? "...Updating" : "Update Audio"}</h1>
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

                    {/* Saved Video (the final approval result) */}
                    {bookDetails?.pages?.[selectedPageIndex]?.pageVideo && (
                        <div className="w-full bg-white border border-stone-200 shadow-sm rounded-lg p-4">
                            <div className="mb-5">
                                <h2 className="text-sm font-bold text-stone-800">
                                    Saved Video
                                </h2>
                                <p className="text-xs text-stone-500">
                                    This page's saved animation. You can play it here.
                                </p>
                            </div>

                            <video
                                src={bookDetails.pages[selectedPageIndex].pageVideo}
                                controls
                                loop
                                muted
                                className="w-full max-h-80 rounded-lg border border-stone-200 bg-stone-50 object-contain"
                            />
                        </div>
                    )}
                </div>
            )}
                
                
                
            </div>
            
            

        </div>
        </>
    )
}
export default Edit_BookPage;