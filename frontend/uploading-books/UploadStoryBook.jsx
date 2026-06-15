import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";
import Confirmation_Popup from "../popup/Confirmation_Popup";
import axios from 'axios'

const UploadStoryBook = () => {

        const navigate = useNavigate();

        const [errorMessage, setErrorMessage] = useState("");

        const fileInputRef = useRef();
        const pageImageInputRef = useRef();

        const [showConfirmation, setShowConfirmation] = useState(false);

        const [selectedTypeOfBooks, setSelectedTypeOfBooks] = useState("");

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

        // Story Book States
        const [genre, setGenre] = useState("");
        const [isGenre, setIsGenre] = useState(false);


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
        formData.append("title", title);
        formData.append("author", author);
        formData.append("description", description);
        formData.append("gradeCategory", gradeCategory);
        formData.append("language", language);
        formData.append("publication", publication);
        formData.append("publisher", publisher);
        formData.append("isbn", isbn);

        formData.append("type", selectedTypeOfBooks);

        formData.append("genre", genre);

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
        {showConfirmation && (<Confirmation_Popup errorMessage={errorMessage} onConfirm={uploadStory} onCancel={() => {setShowConfirmation(false); setErrorMessage("")}}/>)}
        <section className="min-h-screen w-full">

                {/* MANUALLY UPLOAD STORY CONTAINER */}
                <div className={`bg-black w-full flex bg-white rounded-xl gap-10 mt-10`}>
                    
                        {/* Story Details */}
                        <div className="bg-white w-1/2 flex flex-col gap-4">
                        <div>
                            <h2 className="text-lg font-bold text-gray-500 rounded-full">Book Information</h2>
                            <p className="text-gray-400 text-sm">Fill-up the required information in the story.</p>
                        </div>
                        

                        <input type="text" placeholder="Title" className={`${isTitle ? "border-red-500" : "border-gray-300"} h-12 border outline-none p-2 rounded-lg`} 
                        value={title} 
                        onChange={(e) => {setTitle(e.target.value); 
                                          setIsTitle(e.target.value === "");
                        }}/>
                        <input type="text" placeholder="Author" className={`${isAuthor ? "border-red-500" : "border-gray-300"} h-12 border outline-none p-2 rounded-lg`} 
                        value={author} 
                        onChange={(e) => {setAuthor(e.target.value);
                                          setIsAuthor(e.target.value === "");
                        }}/>

                        <textarea 
                            placeholder="Description"
                            className={`${isDescription ? "border-red-500" : "border-gray-300"} h-12 border h-10 outline-none p-2 rounded-lg`}
                            value={description}
                            onChange={(e) => {setDescription(e.target.value)
                                              setIsDescription(e.target.value === "");
                            }}
                        />

                        <select
                            className={`${isLanguage ? "border-red-300" : "border-gray-300"} h-12 border bg-white outline-none text-gray-500 p-2 rounded-lg`}
                            value={language}
                            onChange={(e) => {setLanguage(e.target.value)
                                              setIsLanguage(e.target.value === "")
                            }}
                        >
                            <option value="">Select Language</option>
                            <option value="english">English</option>
                            <option value="filipino">Filipino</option>
                            
                        </select>

                        <input type="text" placeholder="publisher" className={`${isPublisher ? "border-red-500" : "border-gray-300"} h-12 border outline-none p-2 rounded-lg`}
                        placeholder={"Publisher"}
                        value={publisher} 
                        onChange={(e) => {setPublisher(e.target.value);
                                          setIsPublisher(e.target.value === "");
                        }}/>

                        <input type="date" name="publication-date" id="publication-date"
                            className={`${isPublication ? "border-red-300" : "border-gray-300"} h-12 border bg-white outline-none text-gray-500 p-2 rounded-lg`}
                            onChange={(e) => {setPublication(e.target.value)
                                              setIsPublication(e.target.value === "")
                            }}
                         />

                         <input type="text" placeholder="isbn" className={`${isIsbn ? "border-red-500" : "border-gray-300"} h-12 border outline-none p-2 rounded-lg`}
                         placeholder={"ISBN (International Standard Book Number)"}
                        value={isbn} 
                        onChange={(e) => {setIsbn(e.target.value);
                                          setIsIsbn(e.target.value === "");
                        }}/>
                        
                        <div className="w-full">
                            <h2 className="text-lg font-bold text-gray-500 rounded-full">Select Type of Books</h2>
                            <p className="text-gray-400 text-sm">Choose Kind of Books you wanted to upload</p>
                            <select className="bg-gray-100 p-2 rounded-xl text-gray-500 mt-4" value={selectedTypeOfBooks} onChange={(e) => setSelectedTypeOfBooks(e.target.value)}>
                                <option value="">Type of Books</option>
                                <option value="childrensbook">Children's Book</option>
                                <option value="storybook">Story Book</option>
                                <option value="referencebook">Reference Book</option>
                                <option value="educationalbook">Educational Book</option>
                            </select>
                        </div>
                         
                         {/*Story book details container*/}
                         <div className={`${selectedTypeOfBooks === 'storybook' ? null : "hidden"} w-full flex flex-col gap-4`}>
                             <div>
                            <h2 className="text-lg font-bold text-gray-500 rounded-full">Story Book Information</h2>
                            <p className="text-gray-400 text-sm">Fill-up the required information in the story.</p>
                        </div>

                        <select
                            value={genre}
                            onChange={(e) => {setGenre(e.target.value)}}
                            className={`${isGenre ? "border-red-500" : "border-gray-300"} h-12 border outline-none text-gray-500 p-2 rounded-lg`}
                        >
                            <option value="">Select Genre</option>
                            <option value="horror">Horror</option>
                            <option value="romance">Romance</option>
                            <option value="sci-fi">Sci-Fi</option>
                            <option value="fantasy">Fantasy</option>
                            <option value="adventure">Adventure</option>
                            <option value="mystery">Mystery</option>
                            <option value="comedy">Comedy</option>
                            <option value="drama">Drama</option>
                            <option value="fairy-tale">Fairy Tale</option>
                            <option value="educational">Educational</option>
                        </select>

                        
                        
                    </div>

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

                    {/*Grade Level*/}
                         <div className="w-full flex flex-col gap-4">
                             <div>
                            <h2 className="text-lg font-bold text-gray-500 rounded-full">Grade Level Information</h2>
                            <p className="text-gray-400 text-sm">Fill-up the required grade level information.</p>
                        </div>

                        <select
                            value={gradeCategory}
                            onChange={(e) => {setGradeCategory(e.target.value)
                                              setIsGradeCategory(e.target.value === "");
                            }}
                            className={`${isGradeCategory ? "border-red-300" : "border-gray-300"} h-12 border bg-white outline-none text-gray-500 p-2 rounded-lg`}
                        >
                            <option value="">Select Grade Category</option>
                            <option value="kindergarten">Kindergarten</option>
                            <option value="grade 1">Grade 1</option>
                            <option value="grade 2">Grade 2</option>
                            <option value="grade 3">Grade 3</option>
                            <option value="grade 4">Grade 4</option>
                        </select>
                    </div>

                        


                         </div>

                    
                         
                    {/*Preview Card*/}
                    <div className="relative bg-white h-150 w-1/2 flex flex-col shadow-6xl">
                            

                            {/* Image */}
                            <div className={`w-full h-full bg-gray-200 rounded-xl overflow-hidden`}>

                                {preview && (
                                    <img
                                    src={preview}
                                    alt="preview"
                                    className="w-full h-full"
                                    />
                                )}
                            </div>
                            
                            
                            <div className="bg-black/80 hover:bg-black/20 absolute inset-0 justify-between items-start flex flex-col p-10 rounded-xl">
                                <div className="w-full justify-between items-center flex">
                                    <span className="px-3 py-1 text-sm font-bold bg-gray-100/20 text-white rounded-full">
                                        Book Preview
                                    </span>
                                    <button className={`${preview ? null : "hidden"} px-3 py-1 text-sm font-bold bg-gray-100/20 text-white rounded-full cursor-pointer hover:bg-red-500/50`} onClick={() => {setFile(null); setPreview(null)}}>x</button>
                                </div>
                                 {/* Content */}
                                <div className="flex flex-col gap-3 w-full">
                                    
                                    {/* Title */}
                                    <h1 className="text-2xl font-bold text-white">
                                    {title || "Book Title"}
                                    </h1>

                                    {/* Description */}
                                    <p className="text-white text-sm leading-relaxed">
                                    {description || "Short description of the story will appear here."}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mt-2">
                                    
                                    <span className="px-3 py-1 text-sm bg-gray-100 text-gray-500 rounded-full">
                                        {genre || "—"}
                                    </span>

                                    <span className="px-3 py-1 text-sm bg-gray-100 text-gray-500 rounded-full">
                                        {gradeCategory || "—"}
                                    </span>

                                    <span className="px-3 py-1 text-sm bg-gray-100 text-gray-500 rounded-full">
                                        {language || "—"}
                                    </span>

                                    </div>

                                    <div className="w-full justify-between items-center flex">
                                        <p className="text-xs text-white mt-2">
                                        By {author || "Author Name"}
                                        </p>
                                        <p className="text-xs text-white mt-2">
                                        By {publication || "Publication Date"}
                                        </p>
                                    </div>
                                    
                                    <button className="h-10 text-white font-semibold bg-pink-500 border border-pink-500 hover:bg-pink-600 rounded-xl cursor-pointer" onClick={handleConfirmation}>+ Upload Story</button>
                                    <div className={`${file ? "hidden" : ""} bg-gray-200 p-2 text-gray-500 font-semibold rounded-xl cursor-pointer justify-center items-center flex`} onClick={openFileExplorer}> 
                                    + Cover Image
                                        <input 
                                            type="file" 
                                            ref={fileInputRef} 
                                            className="hidden" 
                                            onChange={handleImagePreview} 
                                        />
                                    </div>

                                </div>
                            </div>
                            
                            
                    </div>
 
                    
                </div>
                
                {/*Book Pages and Image insertion*/}
                <div className="w-full mt-5">
                     <div>
                        <h2 className="text-lg font-bold text-gray-500 rounded-full">Book Pages</h2>
                        <p className="text-gray-400 text-sm">Fill-up the required information in the story.</p>
                    </div>

                    <div className="w-full justify-between items-center flex gap-2 mt-4">
                         <h1 className="text-lg font-bold text-gray-500 rounded-full">Page No. {pageList.length + 1}</h1>

                         <div className="flex gap-2">
                            <button className="bg-gray-200 text-gray-500 p-2 rounded-xl cursor-pointer hover:bg-gray-300"
                            onClick={handleNextPage}>Save & Next Page
                            </button>
                         </div>
                        
                    </div>

                    <div className="w-full min-h-screen justify-between items-start flex gap-10">
                        {/* Page Text*/}
                        <textarea 
                        name="page-text" id="page-text"
                        placeholder="Input the text of the page..."
                        value={pageText}
                        onChange={(e) => setPageText(e.target.value)}
                        className="p-4 h-200 w-full outline-none border-1 border-gray-300 rounded-xl mt-4">
                        </textarea>
                    </div>
                    {/* Page Image Preview */}
                        <div className="w-full mt-4">
                          <div className="w-full justify-between items-center flex mb-4">
                            <h1 className="text-md font-bold text-gray-500 rounded-full">Select Page Image</h1>
                            <button className={`${pageImagePreview.length > 2 ? 'hidden' : null} bg-gray-200 text-gray-500 p-2 rounded-xl cursor-pointer hover:bg-gray-300`} onClick={() => pageImageInputRef.current.click()}>
                                Add Image
                            </button>
                            <input 
                                    type="file" 
                                    ref={pageImageInputRef} 
                                    className="hidden" 
                                    onChange={handlePageImagePreview} 
                            />
                          </div>
                            
                        
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
export default UploadStoryBook;