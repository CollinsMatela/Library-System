import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";
import Confirmation_Popup from "../popup/Confirmation_Popup";
import axios from 'axios'
import Admin_SideBar from "../components/Admin_Sidebar";
import FictionBookInformation from "./UploadPage_Components/FictionBookInformation"
import TypeOfBooks from "./UploadPage_Components/TypeOfBooks";

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
        const [gradeCategory, setGradeCategory] = useState("");
        const [language, setLanguage] = useState("");
        const [publication, setPublication] = useState("");
        const [publisher, setPublisher] = useState("");
        const [isbn, setIsbn] = useState("");
        const [availability, setAvailability] = useState(true);

        const [isTitle, setIsTitle] = useState(false);
        const [isAuthor, setIsAuthor] = useState(false);
        const [isDescription, setIsDescription] = useState(false);
        const [isGradeCategory, setIsGradeCategory] = useState(false);
        const [isLanguage, setIsLanguage] = useState(false);
        const [isPublication, setIsPublication] = useState(false);
        const [isIsbn, setIsIsbn] = useState(false);
        const [isPublisher, setIsPublisher] = useState(false);


        // Fictions Addiotionals Information
        const [fictionSeries, setFictionSeries] = useState("");
        const [isFictionSeries, setIsFictionSeries] = useState(false);

        const [fictionVolume, setFictionVolume] = useState("");
        const [isFictionVolume, setIsFictionVolume] = useState(false);

        const [fictionEdition, setFictionEdition] = useState("");
        const [isFictionEdition, setIsFictionEdition] = useState(false);
        

        // Educational Book States
        const [subject, setSubject] = useState("");
        const [isSubject, setIsSubject] = useState(false);

        const [educationalEdition, setEducationalEdition] = useState("");
        const [isEducationalEdition, setIsEducationalEdition] = useState(false);

        // Reference Book States
        const [referenceType, setReferenceType] = useState("");
        const [isReferenceType, setIsReferenceType] = useState(false);

        const [subjectArea, setSubjectArea] = useState("");
        const [isSubjectArea, setIsSubjectArea] = useState(false);

        const [referenceEdition, setReferenceEdition] = useState("");
        const [isReferenceEdition, setIsReferenceEdition] = useState(false);

        const [referenceVolume, setReferenceVolume] = useState("");
        const [isReferenceVolume, setIsReferenceVolume] = useState(false);
        
        // Childrens Book States
        const [readingLevel, setReadingLevel] = useState("");
        const [isReadingLevel, setIsReadingLevel] = useState(false);

        const [illustrator, setIllustrator] = useState("");
        const [isIllustrator, setIsIllustrator] = useState(false);

        const [moralTheme, setMoralTheme] = useState("");
        const [isMoralTheme, setIsMoralTheme] = useState(false);

        const [storyType, setStoryType] = useState("");
        const [isStoryType, setIsStoryType] = useState(false);
        
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

        setSelectedTypeOfBooks("");

        setTitle("");
        setAuthor("");
        setDescription("");
        setGradeCategory("");
        setLanguage("");
        setPublication("");
        setPublisher("");
        setIsbn("");
        setAvailability(true);

        setGenre("");
        setSubject("");
        setEducationalEdition("");

        setReferenceType("");
        setSubjectArea("");
        setReferenceEdition("");
        setReferenceVolume("");

        setReadingLevel("");
        setIllustrator("");
        setMoralTheme("");
        setStoryType("");

        setFile(null);
        setPreview(null);

        setPageList([]);
        setPageText("");
        setPageImage([]);
        setPageImagePreview([]);

        setIsTitle(false);
        setIsAuthor(false);
        setIsDescription(false);
        setIsGradeCategory(false);
        setIsLanguage(false);
        setIsPublication(false);
        setIsIsbn(false);
        setIsPublisher(false);

        setIsGenre(false);
        setIsSubject(false);
        setIsEducationalEdition(false);

        setIsReferenceType(false);
        setIsSubjectArea(false);
        setIsReferenceEdition(false);
        setIsReferenceVolume(false);

        setIsReadingLevel(false);
        setIsIllustrator(false);
        setIsMoralTheme(false);
        setIsStoryType(false);
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
            alert("Please enter text or upload at least one image.");
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
              setPageImage((prev) => [...prev, ...files]);

               const imagesPreview = files.map(file => URL.createObjectURL(file));
              setPageImagePreview((prev) => [...prev, ...imagesPreview])
        }
        

        const handleImagePreview = async (e) => {
         const selected = e.target.files[0];
         setFile(selected);
         setPreview(URL.createObjectURL(selected)); 
    }
    const openFileExplorer = () => {
        setPreview(null)
        setFile(null)
        fileInputRef.current.click();
    }

    const handleConfirmation = () => {
        // Basic Information
        if (title === "") { setIsTitle(true); alert('Please fill the all fields'); return;}
        if (author === "") { setIsAuthor(true); alert('Please fill the all fields'); return;}
        if (description === "") { setIsDescription(true); alert('Please fill the all fields'); return;}
        if (language === "") { setIsLanguage(true); alert('Please fill the all fields'); return;}
        if (publisher === "") { setIsPublisher(true); alert('Please fill the all fields'); return;}
        if (publication === "") { setIsPublication(true); alert('Please fill the all fields'); return;}
        if (isbn === "") { setIsIsbn(true); alert('Please fill the all fields'); return;}

        // Type of Books
        if(selectedTypeOfBooks === ""){alert('Please Select type of book'); return;}

        // Per Category
        if(selectedTypeOfBooks === "storybook"){
            if (genre === "") { setIsGenre(true); alert('Please enter genre.'); return;}
            if (storySeries === "") { setStorySeries(true); alert('Please enter series.'); return;}
            if (storyVolume === "") { setStoryVolume(true); alert('Please enter volume.'); return;}
        }

        if(selectedTypeOfBooks === "childrensbook"){
            if (readingLevel === "") { setIsReadingLevel(true); alert('Please enter reading level.'); return;}
            if (illustrator === "") {setIsIllustrator(true); alert('Please enter illusatrator.'); return;}
            if (moralTheme === "") { setIsMoralTheme(true); alert('Please enter moral/theme.'); return;}
            if (storyType === "") {setIsStoryType(true); alert('Please enter story type.'); return;}
        }

        if(selectedTypeOfBooks === "referencebook"){
            if (referenceType === "") { setIsReferenceType(true); alert('Please enter reference type.'); return;}
            if (subjectArea === "") {setIsSubjectArea(true); alert('Please enter subject are.'); return;}
            if (referenceEdition === "") { setIsReferenceEdition(true); alert('Please enter reference edition.'); return;}
            if (referenceVolume === "") {setIsReferenceVolume(true); alert('Please enter reference volume.'); return;}
        }

        if(selectedTypeOfBooks === "educationalbook"){
            if (subject === "") { setIsSubject(true); alert('Please enter reference type.'); return;}
            if (educationalEdition === "") {setIsEducationalEdition(true); alert('Please enter subject are.'); return;}
        }
        
        if (gradeCategory === "") { setIsGradeCategory(true); alert('Please fill the all fields'); return;}


        
        if(!file){
            alert("Insert image of the story")
            return;
        }
        
        if(pageList.length === 0){
            alert("Book pages are required")
            return;
        }

        setShowConfirmation(true);
    }

    const uploadStory = async () => {
        
        const formData = new FormData();
        formData.append("type", selectedTypeOfBooks);
        formData.append("category", selectedCategoryOfBook);

        formData.append("title", title);
        formData.append("author", author);
        formData.append("description", description);
        formData.append("language", language);
        formData.append("publication", publication);
        formData.append("publisher", publisher);
        formData.append("isbn", isbn);

        formData.append("fictionSeries", fictionSeries);
        formData.append("fictionEdition", fictionEdition);
        formData.append("fictionVolume", fictionVolume);

        formData.append("subject", subject);
        formData.append("educationalEdition", educationalEdition);

        formData.append("referenceType", referenceType);
        formData.append("subjectArea", subjectArea);
        formData.append("referenceEdition", referenceEdition);
        formData.append("referenceVolume", referenceVolume);

        formData.append("readingLevel", readingLevel);
        formData.append("illustrator", illustrator);
        formData.append("moralTheme", moralTheme);
        formData.append("storyType", storyType);

        formData.append("availability", availability);

        formData.append("cover", file); // book cover
        formData.append("pages", JSON.stringify(
        pageList.map(p => ({
            pageText: p.pageText
        }))
        ));

        pageList.forEach((page, pageIndex) => {
        page.pageImage.forEach((image) => {
            formData.append(`pageImages_${pageIndex}`, image);
        });
        });

        try {
            
            console.log([...formData.entries()]);
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/upload-manually`, formData);
            if(res.data.success){
               resetForm()
            }
        } catch (error) {
            console.log(error)
            setErrorMessage(error?.response?.data?.message);
        }
        
    }
      return(
        <>
        <Admin_SideBar/>
        {showConfirmation && (<Confirmation_Popup errorMessage={errorMessage} onConfirm={uploadStory} onCancel={() => {setShowConfirmation(false); setErrorMessage("")}}/>)}
        <section className="min-h-screen w-full pl-90 pr-10 py-10">

            <header className="w-full justify-between items-start flex flex-col mb-10">

                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Upload Book Management</h1>
                    <h1 className="text-gray-400 text-md">Add a new book to the library by providing its details and uploading the required files. </h1>
                </div>
                
              </header>

                {/* MANUALLY UPLOAD STORY CONTAINER */}
                <div className={`bg-black w-full flex bg-white rounded-xl gap-10 mt-10`}>
                    
                        {/* Story Details */}
                        <div className="bg-white w-full flex flex-col gap-4">

                       <TypeOfBooks
                       selectedTypeOfBooks={selectedTypeOfBooks}
                       setSelectedTypeOfBooks={setSelectedTypeOfBooks}
                       selectedCategoryOfBook={selectedCategoryOfBook}
                       setSelectedCategoryOfBook={setSelectedCategoryOfBook}
                       />
                        
                        {selectedTypeOfBooks.toLowerCase() === 'fiction' && (
                        <FictionBookInformation
                            title={title}
                            setTitle={setTitle}

                            author={author}
                            setAuthor={setAuthor}

                            description={description}
                            setDescription={setDescription}

                            gradeCategory={gradeCategory}
                            setGradeCategory={setGradeCategory}

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
                            
                            // Optionals 
                            fictionSeries={fictionSeries}
                            setFictionSeries={setFictionSeries}

                            fictionEdition={fictionEdition}
                            setFictionEdition={setFictionEdition}

                            fictionVolume={fictionVolume}
                            setFictionVolume={setFictionVolume}

                            isFictionSeries={isFictionSeries}
                            setIsFictionSeries={setIsFictionSeries}

                            isFictionEdition={isFictionEdition}
                            setIsFictionEdition={setIsFictionEdition}

                            isFictionVolume={isFictionVolume}
                            setIsFictionVolume={setIsFictionVolume}

                            isTitle={isTitle}
                            setIsTitle={setIsTitle}

                            isAuthor={isAuthor}
                            setIsAuthor={setIsAuthor}

                            isDescription={isDescription}
                            setIsDescription={setIsDescription}

                            isGradeCategory={isGradeCategory}
                            setIsGradeCategory={setIsGradeCategory}

                            isLanguage={isLanguage}
                            setIsLanguage={setIsLanguage}

                            isPublication={isPublication}
                            setIsPublication={setIsPublication}

                            isPublisher={isPublisher}
                            setIsPublisher={setIsPublisher}

                            isIsbn={isIsbn}
                            setIsIsbn={setIsbn}
                        />
                        )}


                    {/*Educational book details container*/}
                    <div className={`${selectedTypeOfBooks === 'educationalbook' ? null : "hidden"} w-full flex flex-col gap-4`}>
                             <div>
                            <h2 className="text-lg font-bold text-gray-500 rounded-full">Educational Book Information</h2>
                            <p className="text-gray-400 text-sm">Fill-up the required information in the educational book.</p>
                        </div>

                        <input type="text" placeholder="isbn" className={`${isSubject ? "border-red-500" : "border-gray-300"} h-12 border outline-none p-2 rounded-lg`}
                         placeholder={"Subject"}
                        value={subject} 
                        onChange={(e) => {setSubject(e.target.value)}}/>

                        <input type="text" placeholder="isbn" className={`${isEducationalEdition ? "border-red-500" : "border-gray-300"} h-12 border outline-none p-2 rounded-lg`}
                         placeholder={"Book Edition"}
                        value={educationalEdition} 
                        onChange={(e) => {setEducationalEdition(e.target.value)}}/>

                        

                        
                        
                    </div>

                    {/* Reference book details container */}
                    <div className={`${selectedTypeOfBooks === "referencebook" ? "" : "hidden"} w-full flex flex-col gap-4`}>

                    <div>
                        <h2 className="text-lg font-bold text-gray-500 rounded-full">
                        Reference Book Information
                        </h2>
                        <p className="text-gray-400 text-sm">
                        Fill up the required information in the reference book.
                        </p>
                    </div>

                    {/* Reference Type */}
                    <input
                        type="text"
                        placeholder="Reference Type"
                        className={`${isReferenceType ? "border-red-500" : "border-gray-300"} h-12 border outline-none p-2 rounded-lg`}
                        value={referenceType}
                        onChange={(e) => {
                        setReferenceType(e.target.value)}}
                    />

                    {/* Subject Area */}
                    <input
                        type="text"
                        placeholder="Subject Area"
                        className={`${isSubjectArea ? "border-red-500" : "border-gray-300"} h-12 border outline-none p-2 rounded-lg`}
                        value={subjectArea}
                        onChange={(e) => {
                        setSubjectArea(e.target.value)}}
                    />

                    {/* Edition */}
                    <input
                        type="text"
                        placeholder="Edition"
                        className={`${isReferenceEdition ? "border-red-500" : "border-gray-300"} h-12 border outline-none p-2 rounded-lg`}
                        value={referenceEdition}
                        onChange={(e) => {
                        setReferenceEdition(e.target.value)}}
                    />

                    {/* Volume */}
                    <input
                        type="text"
                        placeholder="Volume"
                        className={`${isReferenceVolume ? "border-red-500" : "border-gray-300"} h-12 border outline-none p-2 rounded-lg`}
                        value={referenceVolume}
                        onChange={(e) => {
                        setReferenceVolume(e.target.value)}}
                    />

                    </div>

                    {/* Children books details container */}
                    <div className={`${selectedTypeOfBooks === "childrensbook" ? "" : "hidden"} w-full flex flex-col gap-4`}>

                    <div>
                        <h2 className="text-lg font-bold text-gray-500 rounded-full">
                        Story Book Information
                        </h2>
                        <p className="text-gray-400 text-sm">
                        Fill up the required information for the story book.
                        </p>
                    </div>

                    {/* Reading Level */}
                    <select
                        className={`${isReadingLevel ? "border-red-500" : "border-gray-300"} h-12 border outline-none p-2 rounded-lg`}
                        value={readingLevel}
                        onChange={(e) => {
                        setReadingLevel(e.target.value)}}
                    >
                        <option value="">Select Reading Level</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>

                    {/* Illustrator */}
                    <input
                        type="text"
                        placeholder="Illustrator"
                        className={`${isIllustrator ? "border-red-500" : "border-gray-300"} h-12 border outline-none p-2 rounded-lg`}
                        value={illustrator}
                        onChange={(e) => {
                        setIllustrator(e.target.value)}}
                    />

                    {/* Moral / Theme */}
                    <input
                        type="text"
                        placeholder="Moral / Theme"
                        className={`${isMoralTheme ? "border-red-500" : "border-gray-300"} h-12 border outline-none p-2 rounded-lg`}
                        value={moralTheme}
                        onChange={(e) => {
                        setMoralTheme(e.target.value)}}
                    />

                    {/* Story Type */}
                    <select
                        className={`${isStoryType ? "border-red-500" : "border-gray-300"} h-12 border outline-none p-2 rounded-lg`}
                        value={storyType}
                        onChange={(e) => {
                        setStoryType(e.target.value)}}
                    >
                        <option value="">Select Story Type</option>
                        <option value="fairytale">Fairy Tale</option>
                        <option value="fable">Fable</option>
                        <option value="adventure">Adventure</option>
                        <option value="fantasy">Fantasy</option>
                        <option value="educational">Educational</option>
                    </select>

                    </div>

                        


                         </div>

                    
                         
                    {/*Preview Card*/}
                    
 
                    
                </div>
                
                {/*Book Pages and Image insertion*/}
                <div className="w-full mt-5 flex flex-col gap-4">
                     <div>
                        <h2 className="text-lg font-bold text-gray-500 rounded-full">Book Pages</h2>
                        <p className="text-gray-400 text-sm">Fill-up the required information in the story.</p>
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
                            <button className={`${pageImagePreview.length > 2 ? 'hidden' : null} text-gray-500 p-2 rounded-xl cursor-pointer hover:-translate-y-1`} onClick={() => pageImageInputRef.current.click()}>
                                Add Image
                            </button>
                            <input 
                                    type="file" 
                                    ref={pageImageInputRef} 
                                    className="hidden" 
                                    onChange={handlePageImagePreview} 
                            />
                            <button className="bg-black text-white font-bold px-4 py-2 rounded-xl cursor-pointer hover:-translate-y-1"
                                onClick={handleNextPage}>Save & Next Page {`(${pageList.length + 1})`}
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




        </section>
        </>
      )
}
export default Admin_UploadBook_Page;