import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";
import Confirmation_Popup from "../popup/Confirmation_Popup";
import axios from 'axios'
import Admin_SideBar from "../components/Admin_Sidebar";
import FictionBookInformation from "./UploadPage_Components/FictionBookInformation"
import NonFictionBookInformation from "./UploadPage_Components/NonFictionBookInformation";
import TypeOfBooks from "./UploadPage_Components/TypeOfBooks";
import PreviewBook from "./UploadPage_Components/PreviewBook"
import { BookOpenText, Play, CheckCheck, Book, HandHelping, ArrowLeft, Pen, Trash, X, Plus, Image, Save, AudioLines, FilePlay, Pencil } from "lucide-react";
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

        const [selectedTypeOfBooks, setSelectedTypeOfBooks] = useState("");
        const [selectedCategoryOfBook, setSelectedCategoryOfBook] = useState("");

        // Book Information 
        const [title, setTitle] = useState("");
        const [author, setAuthor] = useState("");
        const [description, setDescription] = useState("");
        const [language, setLanguage] = useState("");
        const [publication, setPublication] = useState("");
        const [publisher, setPublisher] = useState("");
        const [isbn, setIsbn] = useState("");
        const [availability, setAvailability] = useState(true);
        const [ddc, setDdc] = useState("");
        const [copies, setCopies] = useState(1);
        const [callNumber, setCallNumber] = useState("");
        const [availableAt, setAvailableAt] = useState("")
        
        const [illustrator, setIllustrator] = useState("");
        const [moral, setMoral] = useState("");


        // Fictions Addiotionals Information
        const [series, setSeries] = useState("");
        
        const [field, setField] = useState("")
        // text book
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

            // Book Selection
            setSelectedTypeOfBooks("");
            setSelectedCategoryOfBook("");
            setField("");

            // Basic Book Information
            setTitle("");
            setAuthor("");
            setDescription("");
            setLanguage("");
            setPublication("");
            setPublisher("");
            setIsbn("");
            setAvailability(true);
            setDdc("");
            setCopies(0);
            setCallNumber("");
            setAvailableAt("");

            setIllustrator("");
            setMoral("");

            // Fiction
            setSeries("");

            setSubject("");
            setGradeLevel("");

            setEdition("");
            setVolume("");

            // Cover Image
            setFile(null);
            setPreview(null);

            // Reset the actual file input
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            // Pages
            setPageList([]);
            setPageText("");
            setPageImage(null);
            setPageImagePreview("");
            setAudio(null)
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



        const handleNextPage = async () => {
            console.log(CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET);

            if (!selectedTypeOfBooks && !selectedCategoryOfBook) {
                toast.warning("Please select type and category of book.");
                return;
            }

            if (
                selectedTypeOfBooks.trim().toLowerCase() === "fiction" &&
                selectedCategoryOfBook.trim().toLowerCase() === "story book"
            ) {
                // if (!pageText || !pageImage || !audio) {
                //     toast.warning(
                //         "Story books require page text, at least one image, and page audio."
                //     );
                //     return;
                // }
            } else {
                if (!pageText && !pageImage) {
                    toast.warning(
                        "Please enter page text or upload at least one image."
                    );
                    return;
                }
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

        if (!selectedTypeOfBooks) {
            toast.warning('Please select type of book')
            return;
        }

        if (!selectedCategoryOfBook) {
            toast.warning('Please select book category')
            return;
        }
        if (
            selectedTypeOfBooks.toLowerCase() === "non-fiction" &&
            (
                selectedCategoryOfBook.toLowerCase() === "philosophy & psychology" ||
                selectedCategoryOfBook.toLowerCase() === "social sciences" ||
                selectedCategoryOfBook.toLowerCase() === "technology" ||
                selectedCategoryOfBook.toLowerCase() === "the arts"
            )
        ) {
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

        // =========================
        // Upload cover to Cloudinary
        // =========================

        let coverUrl = "";

        if (file) {
            toast.info("Uploading cover...");

            coverUrl = await uploadToCloudinary(
                file,
                "image"
            );
        }

        console.log("Cover URL:", coverUrl);

        // =========================
        // Prepare book data
        // =========================

        const bookData = {

            // Book Type
            type: selectedTypeOfBooks,
            category: selectedCategoryOfBook,
            field,

            // Basic Book Information
            title,
            author,
            description,
            language,
            publication,
            publisher,
            isbn,
            illustrator,
            moral,

            // Non-Fiction
            ddc,
            copies,
            callNumber,
            availableAt,

            // Shared
            edition,
            volume,

            // Fiction
            series,

            // Non-Fiction
            subject,
            gradeLevel,

            // Cover Cloudinary URL
            cover: coverUrl,

            // Pages already contain Cloudinary URLs
            pages: pageList,
        };

        console.log("BOOK DATA:", bookData);

        // =========================
        // Send to backend
        // =========================

        const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/upload-manually`,
            bookData
        );

        if (res.data.success) {
            toast.success(res.data.message);
            resetForm();
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
        <section className="min-h-screen w-full pl-80 pr-10 py-10">

            <header className="w-full justify-between items-start flex flex-col pb-10">

                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Upload Book Management</h1>
                    <h1 className="text-gray-400 text-md">Add a new book to the library by providing its details and uploading the required files. </h1>
                </div>
                
              </header>

                {/* MANUALLY UPLOAD STORY CONTAINER */}
                <div className={`w-full flex bg-white rounded-xl gap-10`}>
                    
                        {/* Story Details */}
                        <div className="bg-white w-full flex flex-col gap-10">

                       <TypeOfBooks
                       selectedTypeOfBooks={selectedTypeOfBooks}
                       setSelectedTypeOfBooks={setSelectedTypeOfBooks}
                       selectedCategoryOfBook={selectedCategoryOfBook}
                       setSelectedCategoryOfBook={setSelectedCategoryOfBook}
                       field={field}
                       setField={setField}
                       subject={subject}
                       setSubject={setSubject}
                       gradeLevel={gradeLevel}
                       setGradeLevel={setGradeLevel}
                       />
                        
                        {selectedTypeOfBooks.toLowerCase() === 'fiction' && selectedCategoryOfBook && (
                        <FictionBookInformation
                        selectedCategoryOfBook={selectedCategoryOfBook}

                            title={title}
                            setTitle={setTitle}

                            author={author}
                            setAuthor={setAuthor}

                            description={description}
                            setDescription={setDescription}

                            language={language}
                            setLanguage={setLanguage}

                            publication={publication}
                            setPublication={setPublication}

                            publisher={publisher}
                            setPublisher={setPublisher}

                            isbn={isbn}
                            setIsbn={setIsbn}

                            illustrator={illustrator}
                            setIllustrator={setIllustrator}

                            moral={moral}
                            setMoral={setMoral}

                            series={series}
                            setSeries={setSeries}

                            copies={copies}
                            setCopies={setCopies}

                            callNumber={callNumber}
                            setCallNumber={setCallNumber}

                            availableAt={availableAt}
                            setAvailableAt={setAvailableAt}

                            edition={edition}
                            setEdition={setEdition}

                            volume={volume}
                            setVolume={setVolume}

                        />
                        )}

                        {selectedTypeOfBooks.toLowerCase() === "non-fiction" && selectedCategoryOfBook && (
                        <NonFictionBookInformation
                            selectedCategoryOfBook={selectedCategoryOfBook}

                            title={title}
                            setTitle={setTitle}

                            author={author}
                            setAuthor={setAuthor}

                            description={description}
                            setDescription={setDescription}

                            language={language}
                            setLanguage={setLanguage}

                            publication={publication}
                            setPublication={setPublication}

                            publisher={publisher}
                            setPublisher={setPublisher}

                            isbn={isbn}
                            setIsbn={setIsbn}

                            availability={availability}
                            setAvailability={setAvailability}

                            ddc={ddc}
                            setDdc={setDdc}

                            copies={copies}
                            setCopies={setCopies}

                            callNumber={callNumber}
                            setCallNumber={setCallNumber}

                            availableAt={availableAt}
                            setAvailableAt={setAvailableAt}

                        />
                    )}


                    {/*Book Pages and Image insertion*/}
                <div className="w-full flex flex-col gap-4">
                     <div className="flex items-center justify-start gap-2">
                        <div className="bg-black h-10 w-10 text-white rounded-xl justify-center items-center flex">
                        <h1 className="font-bold text-lg">3#</h1>
                        </div>
                        <div>
                            <h1 className="text-md font-bold text-gray-800 rounded-full">Step Three</h1>
                            <p className="text-gray-400 text-xs">Fill the applicable book page information.</p>
                        </div>
                        
                    </div>

                    

                    <div className="w-full bg-white justify-between items-start flex flex-col gap-4 rounded-xl">
                        {/* Page Text*/}
                        <div className="w-full justify-end items-end flex flex-col gap-4 bg-white border border-gray-300 p-6 rounded-lg">
                                <div className="justify-between items-center flex gap-2 w-full">
                                    <div class="flex gap-2 ujstify-center items-center">
                                        <div className="p-2 rounded-full text-gray-500 bg-gray-200 justify-center items-center flex"><Pencil size={20}/></div>
                                        <div>
                                            <h1 className="text-gray-600 text-sm font-bold">Page Text</h1>
                                            <h1 className="text-gray-600 text-xs">Input the text for the page...</h1>
                                        </div>
                                    </div>
                                    
                                </div>

                                <textarea 
                                name="page-text" id="page-text"
                                placeholder="Input the text of the page..."
                                value={pageText}
                                onChange={(e) => setPageText(e.target.value)}
                                className="h-100 w-full outline-none text-xs bg-gray-50 shadow-sm border border-gray-300 p-4 rounded-xl">
                                </textarea>
                        </div>

                         {/* Page Image Preview */}
                        <div className="w-full justify-end items-end flex flex-col gap-4 bg-white border border-gray-300 p-6 rounded-lg">

                            <div className="justify-between items-center flex gap-2 w-full">
                                    <div class="flex gap-2 ujstify-center items-center">
                                        <div className="p-2 rounded-full text-gray-500 bg-gray-200 justify-center items-center flex"><Image size={20}/></div>
                                        <div>
                                            <h1 className="text-gray-600 text-sm font-bold">Preview Page Image</h1>
                                            <h1 className="text-gray-600 text-xs">Preview of the page image...</h1>
                                        </div>
                                    </div>
                                    
                                </div>
                            
                            <div className="w-full h-100 bg-gray-100 justify-center items-center flex">
                                {pageImagePreview && (
                                     
                                    <img src={pageImagePreview} 
                                    alt="page-preview" 
                                    title="Click to remove image"
                                    className="h-full w-120 object-fit cursor-pointer" onClick={() => {
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
                            <div className="w-full justify-end items-end flex flex-col gap-4 bg-white border border-gray-300 p-6 rounded-lg">

                                <div className="justify-between items-center flex gap-2 w-full">
                                    <div class="flex gap-2 ujstify-center items-center">
                                        <div className="p-2 rounded-full text-gray-500 bg-gray-200 justify-center items-center flex"><FilePlay size={20}/></div>
                                        <div>
                                            <h1 className="text-gray-600 text-sm font-bold">Preview Audio</h1>
                                            <h1 className="text-gray-600 text-xs">{audioPreview}</h1>
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
                            {(selectedTypeOfBooks.toLowerCase() === 'fiction' && selectedCategoryOfBook.toLowerCase() === 'story book') && (
                                <button className={`${audioPreview ? 'hidden' : null} justify-center items-center flex gap-2 p-2 text-xs text-black font-bold rounded-lg hover:-translate-y-1 cursor-pointer border transition`} onClick={() => audioInputRef.current.click()}>
                                    <AudioLines size={15}/> Add Audio
                                </button>  
                            )}
                                                 
                            <button className={`${pageImagePreview ? 'hidden' : null} justify-center items-center flex gap-2 p-2 text-xs text-black font-bold rounded-lg hover:-translate-y-1 cursor-pointer border transition`} onClick={() => pageImageInputRef.current.click()}>
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
                            <button className="justify-center items-center flex gap-2 p-2 text-xs bg-blue-600 text-white font-bold rounded-lg hover:-translate-y-1 cursor-pointer transition"
                                onClick={handleNextPage}><Save size={15}/> Save {`(${pageList.length + 1})`}
                            </button>
                        </div>
                        
                        
                    </div>

                    

                   
                </div>

                        


                         </div>
                    
 
                    
                </div>
                
                
                  
                  <PreviewBook
                  type={selectedTypeOfBooks}
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
                




        </section>
        </>
      )
}
export default Admin_UploadBook_Page;