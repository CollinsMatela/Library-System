import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";
import Confirmation_Popup from "../popup/Confirmation_Popup";
import axios from 'axios'
import Admin_SideBar from "../components/Admin_Sidebar";
import FictionBookInformation from "./UploadPage_Components/FictionBookInformation"
import BookInformation from "./UploadPage_Components/BookInformation";
import TypeOfBooks from "./UploadPage_Components/TypeOfBooks";
import PreviewBook from "./UploadPage_Components/PreviewBook"
import {  X, Plus, Image, Save, AudioLines, FilePlay, Pencil, ImageOff, Info, ArrowUp } from "lucide-react";
import { toast } from "react-toastify";

const Admin_UploadBook_Page = () => {

        const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

        const navigate = useNavigate();

        const [errorMessage, setErrorMessage] = useState("");

        const fileInputRef = useRef();
        const pageImageInputRef = useRef();
        const audioInputRef = useRef();

        const [showConfirmation, setShowConfirmation] = useState(false);

        

        // Book Information
        const [selectedCategoryOfBook, setSelectedCategoryOfBook] = useState("");
        const [title, setTitle] = useState("");
        const [author, setAuthor] = useState("");
        const [description, setDescription] = useState("");
        const [language, setLanguage] = useState("");
        const [publication, setPublication] = useState("");
        const [publisher, setPublisher] = useState("");
        const [isbn, setIsbn] = useState("");
        const [ddc, setDdc] = useState("");
        const [copies, setCopies] = useState(1);
        const [callNumber, setCallNumber] = useState("");
        const [donatedFrom, setDonatedFrom] = useState("")
        const [receivedDate, setReceivedDate] = useState(new Date()); // Default to today's date
        const [illustrator, setIllustrator] = useState("");
        const [moral, setMoral] = useState("");
        const [series, setSeries] = useState("");
        const [field, setField] = useState("")
        const [subject, setSubject] = useState(""); 
        const [gradeLevel, setGradeLevel] = useState(""); 
        const [edition, setEdition] = useState("");
        const [volume, setVolume] = useState("");
        
        // Preview Image
        const [file, setFile] = useState(null);
        const [preview, setPreview] = useState(null);
        const [audio, setAudio] = useState(null);
        const [audioPreview, setAudioPreview] = useState(null);

        const [pageList, setPageList] = useState([]);
        const [pageText, setPageText] = useState("");
        const [pageImage, setPageImage] = useState(null);
        const [pageImagePreview, setPageImagePreview] = useState("");

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


        const resetForm = () => {
            setErrorMessage("");
            setShowConfirmation(false);

            // =========================
            // Book Category
            // =========================
            setSelectedCategoryOfBook("");
            
            // =========================
            // Basic Information
            // =========================
            setTitle("");
            setAuthor("");
            setDescription("");
            setLanguage("");
            setPublication("");
            setPublisher("");
            setIsbn("");

            // =========================
            // Publication Details
            // =========================
            setEdition("");
            setVolume("");

            // =========================
            // Classification
            // =========================
            setDdc("");
            setField("");
            setSubject("");
            setGradeLevel("");

            // =========================
            // Inventory
            // =========================
            setCopies(1);
            setCallNumber("");
            setDonatedFrom("");
            setReceivedDate(
                new Date().toISOString().split("T")[0]
            );

            // =========================
            // Literature / Fiction
            // =========================
            setIllustrator("");
            setMoral("");
            setSeries("");

            // =========================
            // Cover Image
            // =========================
            setFile(null);
            setPreview(null);

            // Reset actual cover file input
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            // =========================
            // Pages
            // =========================
            setPageList([]);
            setPageText("");
            setPageImage(null);
            setPageImagePreview("");
            setAudio(null);
            setAudioPreview(null);

            // Reset page image input
            if (pageImageInputRef.current) {
                pageImageInputRef.current.value = "";
            }
        };



        useEffect(() => {
        return () => {
            if (preview) {
            URL.revokeObjectURL(preview);
            }
        };
        }, [preview]);

        useEffect(() => {
        return () => {
            if (pageImagePreview) {
            URL.revokeObjectURL(pageImagePreview);
            }
        };
        }, [pageImagePreview]);
        
        const uploadNotification = async () => {
            const data = {bookTitle: title}
              try {
                console.log('Sending Notification...');
                const res = await axios.post(`${import.meta.env.VITE_API_URL}/upload-notification`, data);
                console.log(res.data.message);
              } catch (error) {
                toast.error(error?.response?.data?.message);
              }
        }


        const handleNextPage = async () => {
            console.log(CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET);

            if (!selectedCategoryOfBook) {
                toast.warning("Please select type and category of book.");
                return;
            }

                // if (!pageText || !pageImage || !audio) {
                //     toast.warning(
                //         "Story books require page text, at least one image, and page audio."
                //     );
                //     return;
                // }
                if (!pageText && !pageImage) {
                    toast.warning(
                        "Please enter page text or upload at least one image."
                    );
                    return;
                }


            try {

                toast.info("Uploading page...");

                let imageUrl = "";
                let audioUrl = "";

                // Upload page image
                if (pageImage) {
                    imageUrl = await uploadToCloudinary(
                        pageImage,
                        "image"
                    );
                }

                // Upload page audio
                if (audio) {
                    audioUrl = await uploadToCloudinary(
                        audio,
                        "video"
                    );
                }

                const newPage = {
                    pageText,
                    pageImage: imageUrl,
                    pageAudio: audioUrl
                };

                setPageList((prev) => [
                    ...prev,
                    newPage
                ]);

                console.log("Saved page:", newPage);

                // Clear current page
                setPageText("");
                setPageImage(null);
                setAudio(null);
                setAudioPreview(null);
                setPageImagePreview("");

                // Reset file inputs
                if (pageImageInputRef.current) {
                    pageImageInputRef.current.value = "";
                }

                if (audioInputRef.current) {
                    audioInputRef.current.value = "";
                }

                toast.success("Page saved successfully.");

            } catch (error) {

                console.error("Cloudinary upload error:", error);

                toast.error(
                    error?.response?.data?.error?.message ||
                    "Failed to upload page."
                );
            }
        };

        const handlePageImagePreview = (e) => {
            const file = e.target.files[0];

            if (!file) {
                toast.warning("Please select an image.");
                return;
            }

            // Optional: only allow image files
            if (!file.type.startsWith("image/")) {
                toast.warning("Please select a valid image.");
                return;
            }

            // Revoke the previous preview URL to prevent memory leaks
            if (pageImagePreview) {
                URL.revokeObjectURL(pageImagePreview);
            }

            setPageImage(file);
            setPageImagePreview(URL.createObjectURL(file));
        };

        const handleAudioPreview = async (e) => {
              const audio = e.target.files[0];

              if(!audio){
                toast.warning('Please an audio.');
                return;
              }

              setAudio(audio);
              setAudioPreview(URL.createObjectURL(audio));
        }
        

        const handleImagePreview = (e) => {
            const selected = e.target.files[0];

            if (!selected) return;

            // Free the previous object URL
            if (preview) {
                URL.revokeObjectURL(preview);
            }

            const newPreview = URL.createObjectURL(selected);

            setFile(selected);
            setPreview(newPreview);
        };
    const openFileExplorer = () => {
        setPreview(null)
        setFile(null)
        fileInputRef.current.click();
    }
    const AudioExplorer = () => {
        setAudio(null);
        audioInputRef.current.click();
    }

    const handleConfirmation = () => {

        if (!selectedCategoryOfBook) {
            toast.warning('Please select book category')
            return;
        }
        if 
        (
            selectedCategoryOfBook.toLowerCase() === "philosophy/psychology" ||
            selectedCategoryOfBook.toLowerCase() === "social sciences" ||
            selectedCategoryOfBook.toLowerCase() === "technology / applied sciences" ||
            selectedCategoryOfBook.toLowerCase() === "the arts"
        )
         {
            if (!field) {
                toast.warning("Please select a field.");
                return;
            }
        }
      
        if (!title) {
            toast.warning('Please enter book title')
            return;
        }

        if (!language) {
            toast.warning('Please select language')
            return;
        }

        if (!copies || copies < 1) {
            toast.warning('Please enter no. of copies')
            return;
        } 

        if(selectedCategoryOfBook.toLowerCase() === 'textbook') {
            if (!gradeLevel) {
            toast.warning('Please select grade level')
            return;
            } 
            if (!subject) {
            toast.warning('Please select subject')
            return;
            } 
        }

        setShowConfirmation(true);
    };

   const uploadStory = async () => {

    try {

        let coverUrl = "";

        if (file) {
            toast.info("Uploading cover...");

            coverUrl = await uploadToCloudinary(
                file,
                "image"
            );
        }

        console.log("Cover URL:", coverUrl);

        const bookData = {
            // Category
            category: selectedCategoryOfBook,

            // Basic Book Information
            title,
            author,
            description,
            language,
            publication,
            publisher,
            isbn,

            // Publication Details
            edition,
            volume,

            // Inventory Information
            copies,
            callNumber,
            donatedFrom,
            receivedDate,

            // Classification
            ddc,

            // Literature / Fiction
            illustrator,
            moral,
            series,

            // Non-Fiction
            field,
            subject,
            gradeLevel,

            // Cover
            cover: coverUrl,

            // Digital Pages
            pages: pageList,
        };



        console.log("BOOK DATA:", bookData);


        const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/upload-manually`,
            bookData
        );

        if (res.data.success) {
            toast.success(res.data.message);
            resetForm();
            uploadNotification();
        }

    } catch (error) {

        console.log(error);

        setErrorMessage(
            error?.response?.data?.message ||
            "Failed to upload book."
        );

        toast.error(
            error?.response?.data?.message ||
            "Failed to upload book."
        );
    }
};
      return(
        <>
        <Admin_SideBar/>
        {showConfirmation && (<Confirmation_Popup errorMessage={errorMessage} onConfirm={uploadStory} onCancel={() => {setShowConfirmation(false); setErrorMessage("")}}/>)}
        <section className="bg-white min-h-screen w-full justify-start items-start flex flex-col md:pl-20 lg:pl-60 pb-10">
              
              <header className="w-full justify-between items-start flex flex-col mb-10 border-0 lg:border border-stone-300 p-3 px-4 md:px-10">
                    <h1 className="text-sm font-bold text-stone-800">Upload Management</h1>
                    <h1 className="text-stone-400 text-xs">Manage uploading books to the library</h1>                   
              </header>

                {/* MANUALLY UPLOAD STORY CONTAINER */}
                <div className={`w-full flex bg-white rounded-xl gap-10 px-4 md:px-10`}>
                    
                        {/* Story Details */}
                        <div className="bg-white w-full flex flex-col">

                        <div className="flex items-center justify-start gap-2">
                            <div className="bg-stone-800 h-9 w-9 text-white justify-center items-center flex">
                            <h1 className="font-bold text-md">1</h1>
                            </div>
                            <div>
                                <h1 className="text-md font-bold text-stone-800 rounded-full">Step One</h1>
                                <p className="text-stone-400 text-xs">Select Type and Category of the book.</p>
                            </div>
                            
                        </div>

                       <TypeOfBooks
                       selectedCategoryOfBook={selectedCategoryOfBook}
                       setSelectedCategoryOfBook={setSelectedCategoryOfBook}
                       field={field}
                       setField={setField}
                       subject={subject}
                       setSubject={setSubject}
                       gradeLevel={gradeLevel}
                       setGradeLevel={setGradeLevel}
                       />

                       <div className="flex items-center justify-start gap-2">
                            <div className="bg-stone-800 h-9 w-9 text-white justify-center items-center flex">
                            <h1 className="font-bold text-md">2</h1>
                            </div>
                            <div>
                                <h1 className="text-md font-bold text-stone-800 rounded-full">Step Two</h1>
                                <p className="text-stone-400 text-xs">Fill the applicable information.</p>
                            </div>
                            
                        </div>
                       
                    <BookInformation
                        // Category
                        selectedCategoryOfBook={selectedCategoryOfBook}

                        // Basic Information
                        title={title}
                        setTitle={setTitle}

                        author={author}
                        setAuthor={setAuthor}

                        description={description}
                        setDescription={setDescription}

                        language={language}
                        setLanguage={setLanguage}

                        // Publication Information
                        publication={publication}
                        setPublication={setPublication}

                        publisher={publisher}
                        setPublisher={setPublisher}

                        isbn={isbn}
                        setIsbn={setIsbn}

                        edition={edition}
                        setEdition={setEdition}

                        volume={volume}
                        setVolume={setVolume}

                        // Inventory Information
                        copies={copies}
                        setCopies={setCopies}

                        callNumber={callNumber}
                        setCallNumber={setCallNumber}

                        donatedFrom={donatedFrom}
                        setDonatedFrom={setDonatedFrom}

                        receivedDate={receivedDate}
                        setReceivedDate={setReceivedDate}

                        // Non-Fiction / Classification
                        ddc={ddc}
                        setDdc={setDdc}

                        field={field}
                        setField={setField}

                        subject={subject}
                        setSubject={setSubject}

                        gradeLevel={gradeLevel}
                        setGradeLevel={setGradeLevel}

                        // Literature / Fiction
                        illustrator={illustrator}
                        setIllustrator={setIllustrator}

                        moral={moral}
                        setMoral={setMoral}

                        series={series}
                        setSeries={setSeries}
                    />





                    {/*Book Pages and Image insertion*/}
                <div className="w-full flex flex-col gap-4">
                     <div className="flex items-center justify-start gap-2">
                        <div className="bg-stone-800 h-9 w-9 text-white justify-center items-center flex">
                        <h1 className="font-bold text-md">3</h1>
                        </div>
                        <div>
                            <h1 className="text-md font-bold text-stone-800 rounded-full">Step Three</h1>
                            <p className="text-stone-400 text-xs">Fill the applicable book page information.</p>
                        </div>
                        
                    </div>

                    

                    <div className="w-full bg-white justify-between items-start flex flex-col gap-4 rounded-xl">
                        {/* Page Text*/}
                        <div className="w-full justify-end items-end flex flex-col gap-4 bg-white border-0 md:border border-stone-300 md:p-6 md:rounded-lg">
                                <div className="justify-between items-center flex gap-2 w-full">
                                    <div class="flex gap-2 ujstify-center items-center">
                                        <div className="p-2 rounded-full text-stone-500 bg-stone-200 justify-center items-center flex"><Pencil size={20}/></div>
                                        <div>
                                            <h1 className="text-stone-600 text-sm font-bold">Page Text</h1>
                                            <h1 className="text-stone-600 text-xs">Input the text for the page...</h1>
                                        </div>
                                    </div>
                                    
                                </div>

                                <textarea 
                                name="page-text" id="page-text"
                                placeholder="Input the text of the page..."
                                value={pageText}
                                onChange={(e) => setPageText(e.target.value)}
                                className="h-100 w-full outline-none text-xs bg-stone-50 shadow-sm border border-stone-300 p-4 rounded-xl">
                                </textarea>
                        </div>

                         {/* Page Image Preview */}
                        <div className="w-full justify-end items-end flex flex-col gap-4 bg-white border-0 md:border border-stone-300 md:p-6 md:rounded-lg">

                            <div className="justify-between items-center flex gap-2 w-full">
                                    <div class="flex gap-2 ujstify-center items-center">
                                        <div className="p-2 rounded-full text-stone-500 bg-stone-200 justify-center items-center flex"><Image size={20}/></div>
                                        <div>
                                            <h1 className="text-stone-600 text-sm font-bold">Preview Page Image</h1>
                                            <h1 className="text-stone-600 text-xs">Preview of the page image...</h1>
                                        </div>
                                    </div>
                                    
                                </div>
                            
                            <div className="w-full h-50 sm:h-100 bg-stone-100 justify-center items-center flex">
                                {!pageImagePreview && (
                                     
                                    <div className="h-full w-full flex flex-col items-center justify-center p-4 gap-1">
                                        <ImageOff size={50} className="text-stone-500" />
                                        <h1 className="text-stone-500 text-sm font-semibold">No Page Image</h1>
                                        <h1 className="text-stone-400 text-xs">Please upload a page image</h1>
                                    </div>
                                     
                                )}

                                {pageImagePreview && (
                                     
                                    <img src={pageImagePreview} 
                                    alt="page-preview" 
                                    title="Click to remove image"
                                    className="h-full w-fit object-fit cursor-pointer" onClick={() => {
                                        if (pageImagePreview) {
                                            URL.revokeObjectURL(pageImagePreview);
                                        }

                                        setPageImage(null);
                                        setPageImagePreview("");
                                        }}/>
                                     
                            )}
                            </div>
                            
                        </div>

                        {/**Audio Preview */}
                        {audioPreview && (
                            <div className="w-full justify-end items-end flex flex-col gap-4 bg-white border-0 md:border border-stone-300 md:p-6 md:rounded-lg">

                                <div className="justify-between items-center flex gap-2 w-full">
                                    <div class="flex gap-2 ujstify-center items-center">
                                        <div className="p-2 rounded-full text-stone-500 bg-stone-200 justify-center items-center flex"><FilePlay size={20}/></div>
                                        <div>
                                            <h1 className="text-stone-600 text-sm font-bold">Preview Audio</h1>
                                            <h1 className="text-stone-600 text-xs">{audioPreview}</h1>
                                        </div>
                                    </div>

                                    <button className="bg-red-600 p-2 justify-center items-center flex gap-2 text-xs font-bold rounded-lg text-white hover:bg-red-700 hover:-translate-y-1 cursor-pointer transition"
                                    title="Remove Audio"
                                    onClick={() => {
                                        if (audioPreview) {
                                            URL.revokeObjectURL(audioPreview);
                                        }
                                        setAudio(null);
                                        setAudioPreview(null);
                                    }}
                                    ><X size={15}/></button>
                                    
                                </div>

                                <audio controls className="w-full" src={audioPreview}></audio>
                                    
                                
                                
                            </div>
                        )}

                        <div className="w-full justify-end items-center flex gap-2">
                            {(selectedCategoryOfBook.toLowerCase() === 'literature') && (
                                <button className={`${audioPreview ? 'hidden' : null} justify-center items-center flex gap-1 p-2 text-xs text-stone-800 font-bold hover:bg-stone-200 cursor-pointer transition`} onClick={() => audioInputRef.current.click()}>
                                    <AudioLines size={15}/> Add Audio
                                </button>  
                            )}
                                                 
                            <button className={`${pageImagePreview ? 'hidden' : null} justify-center items-center flex gap-1 p-2 text-xs text-stone-800 font-bold hover:bg-stone-200 cursor-pointer transition`} onClick={() => pageImageInputRef.current.click()}>
                                <Image size={15}/> Add Image
                            </button>

                            <input 
                                    type="file" 
                                    ref={pageImageInputRef} 
                                    className="hidden" 
                                    onChange={handlePageImagePreview} 
                            />
                            <input 
                                    type="file" 
                                    ref={audioInputRef} 
                                    className="hidden" 
                                    onChange={handleAudioPreview} 
                            />
                            <button className="justify-center items-center flex gap-1 p-2 text-xs bg-stone-800 text-white font-bold hover:bg-stone-900 cursor-pointer transition"
                                onClick={handleNextPage}><ArrowUp size={15}/> Save {`(${pageList.length + 1})`}
                            </button>
                        </div>
                        
                        
                    </div>

                    

                   
                </div>

                        
                  <PreviewBook
                  category={selectedCategoryOfBook}
                  pages={pageList}
                  moral={moral}
                  setMoral={setMoral}
                  preview={preview}
                  title={title}
                  description={description} 
                  language={language}
                  author={author}
                  publication={publication}
                  file={file}
                  fileInputRef={fileInputRef}
                  openFileExplorer={openFileExplorer}
                  handleImagePreview={handleImagePreview}
                  handleConfirmation={handleConfirmation}
                  setPreview={setPreview}
                  setFile={setFile}
                  />

                         </div>
                    
 
                    
                </div>
                
                
                  
                  
                




        </section>
        </>
      )
}
export default Admin_UploadBook_Page;