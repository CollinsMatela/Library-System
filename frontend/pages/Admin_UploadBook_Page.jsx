import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";
import Confirmation_Popup from "../popup/Confirmation_Popup";
import axios from 'axios'
import Admin_SideBar from "../components/Admin_Sidebar";
import FictionBookInformation from "./UploadPage_Components/FictionBookInformation"
import NonFictionBookInformation from "./UploadPage_Components/NonFictionBookInformation";
import TypeOfBooks from "./UploadPage_Components/TypeOfBooks";
import PreviewBook from "./UploadPage_Components/PreviewBook"

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

        
        // Non-Fictions Additional Info

        // Science
        const [scientificField, setScientificField] = useState("");

        // Math
        const [mathBranch, setMathBranch] = useState("");

        // Technology
        const [technologyField, setTechnologyField] = useState("");

        // Engineering
        const [engineeringDiscipline, setEngineeringDiscipline] = useState("");
        //medical
        const [medicalField, setMedicalField] = useState("");
        // reference
        const [referenceType, setReferenceType] = useState("");
        // Encyclopedia
        const [subjectArea, setSubjectArea] = useState(""); 
        // Dictionary
        const [dictionaryType, setDictionaryType] = useState("");
        // Atlas
        const [geographicCoverage, setGeographicCoverage] = useState("");

        // text book
        const [subject, setSubject] = useState(""); 
        const [gradeLevel, setGradeLevel] = useState(""); 

        // research
        const [researchField, setResearchField] = useState(""); 
        const [institution, setInstitution] = useState(""); 
        const [doi, setDoi] = useState("");

        //business
        const [businessArea, setBusinessArea] = useState("");
        //economic
        const [economicsBranch, setEconomicsBranch] = useState("");
  
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

            // Basic Book Information
            setTitle("");
            setAuthor("");
            setDescription("");
            setGradeCategory("");
            setLanguage("");
            setPublication("");
            setPublisher("");
            setIsbn("");
            setAvailability(true);

            // Fiction
            setFictionSeries("");

            // Non-Fiction
            setScientificField("");
            setMathBranch("");
            setTechnologyField("");
            setEngineeringDiscipline("");
            setMedicalField("");
            setReferenceType("");
            setSubjectArea("");
            setDictionaryType("");
            setGeographicCoverage("");
            setSubject("");
            setGradeLevel("");
            setResearchField("");
            setInstitution("");
            setDoi("");
            setBusinessArea("");
            setEconomicsBranch("");
            setEdition("");
            setVolume("");

            // Cover Image
            setFile(null);
            setPreview(null);

            // Pages
            setPageList([]);
            setPageText("");
            setPageImage([]);
            setPageImagePreview([]);

            // Validation
            setIsTitle(false);
            setIsAuthor(false);
            setIsDescription(false);
            setIsGradeCategory(false);
            setIsLanguage(false);
            setIsPublication(false);
            setIsPublisher(false);
            setIsIsbn(false);
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
        if (title.trim() === "") {
            setIsTitle(true);
            alert("Please fill in all required fields.");
            return;
        } else {
            setIsTitle(false);
        }

        if (author.trim() === "") {
            setIsAuthor(true);
            alert("Please fill in all required fields.");
            return;
        } else {
            setIsAuthor(false);
        }

        if (description.trim() === "") {
            setIsDescription(true);
            alert("Please fill in all required fields.");
            return;
        } else {
            setIsDescription(false);
        }

        if (language.trim() === "") {
            setIsLanguage(true);
            alert("Please fill in all required fields.");
            return;
        } else {
            setIsLanguage(false);
        }

        if (publisher.trim() === "") {
            setIsPublisher(true);
            alert("Please fill in all required fields.");
            return;
        } else {
            setIsPublisher(false);
        }

        if (publication.trim() === "") {
            setIsPublication(true);
            alert("Please fill in all required fields.");
            return;
        } else {
            setIsPublication(false);
        }

        if (isbn.trim() === "") {
            setIsIsbn(true);
            alert("Please fill in all required fields.");
            return;
        } else {
            setIsIsbn(false);
        }

        if (!file) {
            alert("Please upload a book cover image.");
            return;
        }

        if (pageList.length === 0) {
            alert("Please add at least one book page.");
            return;
        }

        setShowConfirmation(true);
    };

    const uploadStory = async () => {

        const formData = new FormData();

        // Book Type
        formData.append("type", selectedTypeOfBooks);
        formData.append("category", selectedCategoryOfBook);

        // Basic Book Information
        formData.append("title", title);
        formData.append("author", author);
        formData.append("description", description);
        formData.append("language", language);
        formData.append("publication", publication);
        formData.append("publisher", publisher);
        formData.append("isbn", isbn);
        formData.append("availability", availability);

        // Shared Book Information
        formData.append("edition", edition);
        formData.append("volume", volume);

        // Fiction
        formData.append("fictionSeries", fictionSeries);

        // Non-Fiction
        formData.append("scientificField", scientificField);
        formData.append("mathBranch", mathBranch);
        formData.append("technologyField", technologyField);
        formData.append("engineeringDiscipline", engineeringDiscipline);
        formData.append("medicalField", medicalField);

        formData.append("referenceType", referenceType);
        formData.append("subjectArea", subjectArea);
        formData.append("dictionaryType", dictionaryType);
        formData.append("geographicCoverage", geographicCoverage);

        formData.append("subject", subject);
        formData.append("gradeLevel", gradeLevel);

        formData.append("researchField", researchField);
        formData.append("institution", institution);
        formData.append("doi", doi);

        formData.append("businessArea", businessArea);
        formData.append("economicsBranch", economicsBranch);

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
                resetForm();
            }
        } catch (error) {
            console.log(error);
            setErrorMessage(error?.response?.data?.message);
        }
    };
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
                        
                        {selectedTypeOfBooks.toLowerCase() === 'fiction' && selectedCategoryOfBook && (
                        <FictionBookInformation
                        selectedCategoryOfBook={selectedCategoryOfBook}

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

                            edition={edition}
                            setEdition={setEdition}

                            volume={volume}
                            setVolume={setVolume}

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
                            setIsIsbn={setIsIsbn}
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

                            // Validation
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
                            setIsIsbn={setIsIsbn}

                            // Non-Fiction Additional Information
                            scientificField={scientificField}
                            setScientificField={setScientificField}

                            mathBranch={mathBranch}
                            setMathBranch={setMathBranch}

                            technologyField={technologyField}
                            setTechnologyField={setTechnologyField}

                            engineeringDiscipline={engineeringDiscipline}
                            setEngineeringDiscipline={setEngineeringDiscipline}

                            medicalField={medicalField}
                            setMedicalField={setMedicalField}

                            referenceType={referenceType}
                            setReferenceType={setReferenceType}

                            subjectArea={subjectArea}
                            setSubjectArea={setSubjectArea}

                            dictionaryType={dictionaryType}
                            setDictionaryType={setDictionaryType}

                            geographicCoverage={geographicCoverage}
                            setGeographicCoverage={setGeographicCoverage}

                            subject={subject}
                            setSubject={setSubject}

                            gradeLevel={gradeLevel}
                            setGradeLevel={setGradeLevel}

                            researchField={researchField}
                            setResearchField={setResearchField}

                            institution={institution}
                            setInstitution={setInstitution}

                            doi={doi}
                            setDoi={setDoi}

                            businessArea={businessArea}
                            setBusinessArea={setBusinessArea}

                            economicsBranch={economicsBranch}
                            setEconomicsBranch={setEconomicsBranch}

                            edition={edition}
                            setEdition={setEdition}

                            volume={volume}
                            setVolume={setVolume}
                        />
                    )}


                    

                        


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
                  
                  <PreviewBook
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
                  />
                




        </section>
        </>
      )
}
export default Admin_UploadBook_Page;