import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";
import Confirmation_Popup from "../popup/Confirmation_Popup";
import axios from 'axios'
import Admin_SideBar from "../components/Admin_Sidebar";
import FictionBookInformation from "./UploadPage_Components/FictionBookInformation"
import NonFictionBookInformation from "./UploadPage_Components/NonFictionBookInformation";
import TypeOfBooks from "./UploadPage_Components/TypeOfBooks";
import PreviewBook from "./UploadPage_Components/PreviewBook"
import { BookOpenText, Play, CheckCheck, Book, HandHelping, ArrowLeft, Pen, Trash, X, Plus, Image, Save } from "lucide-react";
import { toast } from "react-toastify";

const Admin_UploadBook_Page = () => {

        const navigate = useNavigate();

        const [errorMessage, setErrorMessage] = useState("");

        const fileInputRef = useRef();
        const pageImageInputRef = useRef();

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

        const [pageList, setPageList] = useState([]);
        const [pageText, setPageText] = useState("");
        const [pageImage, setPageImage] = useState([]);
        const [pageImagePreview, setPageImagePreview] = useState([]);

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
            setPageImage([]);
            setPageImagePreview([]);

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
            pageImagePreview.forEach((url) => {
            URL.revokeObjectURL(url);
            });
        };
        }, [pageImagePreview]);

        const handleNextPage = () =>{
           if (!pageText && pageImage.length === 0) {
            toast.warning("Please enter text or upload at least one image.");
            return;
            }
              setPageList((prev) => [ 
                ...prev,
                 {
                    pageText,
                    pageImage: [...pageImage], 
                 }
              ])

                setPageText("");
                setPageImage([]);
                setPageImagePreview([]);
        }

        const handlePageImagePreview = async (e) =>{
              const files = Array.from(e.target.files);
              if (pageImage.length >= 1) {
                    toast.warning("Only 1 image is allowed per page.");
                    return;
                }
              setPageImage((prev) => [...prev, ...files]);

               const imagesPreview = files.map(file => URL.createObjectURL(file));
              setPageImagePreview((prev) => [...prev, ...imagesPreview])
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

        const formData = new FormData();

        // Book Type
        formData.append("type", selectedTypeOfBooks);
        formData.append("category", selectedCategoryOfBook);
        formData.append("field", field);

        // Basic Book Information
        formData.append("title", title);
        formData.append("author", author);
        formData.append("description", description);
        formData.append("language", language);
        formData.append("publication", publication);
        formData.append("publisher", publisher);
        formData.append("isbn", isbn);
        formData.append("illustrator", illustrator);
        formData.append("moral", moral);

        formData.append("ddc", ddc);
        formData.append("copies", copies);
        formData.append("callNumber", callNumber);
        formData.append("availableAt", availableAt);

        // Shared Book Information
        formData.append("edition", edition);
        formData.append("volume", volume);

        // Fiction
        formData.append("series", series);

        formData.append("subject", subject);
        formData.append("gradeLevel", gradeLevel);

        // Cover Image
        formData.append("cover", file);

        // Book Pages
        formData.append(
            "pages",
            JSON.stringify(
                pageList.map((p) => ({
                    pageText: p.pageText,
                }))
            )
        );

        pageList.forEach((page, pageIndex) => {
            page.pageImage.forEach((image) => {
                formData.append(`pageImages_${pageIndex}`, image);
            });
        });

        try {
            console.log([...formData.entries()]);

            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/upload-manually`,
                formData
            );

            if (res.data.success) {
                toast.success(res.data.message);
                resetForm();
            }
        } catch (error) {
            console.log(error);
            setErrorMessage(error?.response?.data?.message);
            toast.error(error?.response?.data?.message);
        }
    };
      return(
        <>
        <Admin_SideBar/>
        {showConfirmation && (<Confirmation_Popup errorMessage={errorMessage} onConfirm={uploadStory} onCancel={() => {setShowConfirmation(false); setErrorMessage("")}}/>)}
        <section className="min-h-screen w-full pl-90 pr-10 py-10">

            <header className="w-full justify-between items-start flex flex-col pb-10 border-b border-gray-300">

                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Upload Book Management</h1>
                    <h1 className="text-gray-400 text-md">Add a new book to the library by providing its details and uploading the required files. </h1>
                </div>
                
              </header>

                {/* MANUALLY UPLOAD STORY CONTAINER */}
                <div className={`bg-black w-full flex bg-white rounded-xl gap-10 mt-10`}>
                    
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
                <div className="w-full flex flex-col gap-4 pb-10 border-b border-gray-300">
                     <div>
                    <h2 className="text-3xl font-bold text-gray-800">Book Page</h2>
                    <p className="text-gray-400 text-md">Choose Kind of Books you wanted to upload</p>
                    </div>

                    

                    <div className="w-full bg-gray-200 justify-between items-start flex flex-col gap-2 rounded-xl p-4">
                        {/* Page Text*/}
                        <textarea 
                        name="page-text" id="page-text"
                        placeholder="Input the text of the page..."
                        value={pageText}
                        onChange={(e) => setPageText(e.target.value)}
                        className="h-100 w-full outline-none">
                        </textarea>

                        <div className="w-full justify-end items-center flex gap-2">                        
                            <button className={`${pageImagePreview.length > 2 ? 'hidden' : null} justify-center items-center flex gap-2 py-2 px-3 text-sm text-black font-bold rounded-lg hover:-translate-y-1 cursor-pointer`} onClick={() => pageImageInputRef.current.click()}>
                                <Image/> Add Image
                            </button>
                            <input 
                                    type="file" 
                                    ref={pageImageInputRef} 
                                    className="hidden" 
                                    onChange={handlePageImagePreview} 
                            />
                            <button className="justify-center items-center flex gap-2 py-2 px-3 text-sm bg-blue-600 text-white font-bold rounded-lg hover:-translate-y-1 cursor-pointer"
                                onClick={handleNextPage}><Save/> Save & Next Page {`(${pageList.length + 1})`}
                            </button>
                        </div>
                    </div>

                    

                    {/* Page Image Preview */}
                        <div className="w-full mt-4">
                        
                        {pageImagePreview.length > 0 && (
                            <div className="grid grid-cols-2 gap-4">
                            
                            {pageImagePreview.map((preview, index) => (
                                <div
                                key={index}
                                className="relative h-60 bg-gray-300 rounded-xl overflow-hidden"
                                >
                                
                                {/* Remove Overlay */}
                                <div
                                    onClick={() => {
                                    setPageImage((prev) => prev.filter((_, i) => i !== index));
                                    setPageImagePreview((prev) => prev.filter((_, i) => i !== index));
                                    }}
                                    className="absolute inset-0 bg-black/20 hover:bg-red-500/50 opacity-0 hover:opacity-100 transition cursor-pointer flex items-end p-2"
                                >
                                    <span className="text-white text-sm">
                                    Remove Image
                                    </span>
                                </div>

                                {/* Preview Image */}
                                <img
                                    src={preview}
                                    alt={`page-preview-${index}`}
                                    className="h-full w-full object-cover"
                                />
                                </div>
                            ))}

                            </div>
                        )}
                        </div>
                </div>

                        


                         </div>

                    
                         
                    {/*Preview Card*/}
                    
 
                    
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