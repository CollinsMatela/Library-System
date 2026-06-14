import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const UploadStoryBook = () => {

        const navigate = useNavigate();

        const [errorMessage, setErrorMessage] = useState("");

        const fileInputRef = useRef();
        // const pdfInputRef = useRef();
        const pageImageInputRef = useRef();

        const [showConfirmation, setShowConfirmation] = useState(false);

        const [title, setTitle] = useState("");
        const [author, setAuthor] = useState("");
        const [description, setDescription] = useState("");
        const [genre, setGenre] = useState("");
        const [gradeCategory, setGradeCategory] = useState("");
        const [language, setLanguage] = useState("")
        const [publication, setPublication] = useState("")
        // const [pdfFile, setPdfFile] = useState(null)

        const [isTitle, setIsTitle] = useState(false);
        const [isAuthor, setIsAuthor] = useState(false);
        const [isDescription, setIsDescription] = useState(false);
        const [isGenre, setIsGenre] = useState(false);
        const [isGradeCategory, setIsGradeCategory] = useState(false);
        const [isLanguage, setIsLanguage] = useState(false)
        const [isPublication, setIsPublication] = useState(false)
        // const [isPdfFile, setIsPdfFile] = useState(false)

        const [file, setFile] = useState(null);
        const [preview, setPreview] = useState(null);

        const [pageList, setPageList] = useState([]);
        const [pageText, setPageText] = useState("");
        const [pageImage, setPageImage] = useState([]);
        const [pageImagePreview, setPageImagePreview] = useState([]);

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
             if(pageText === '') {
                alert('Please input book text'); 
                return;
            }
              setPageList((prev) => [ 
                ...prev,
                 {
                    pageText: pageText,
                    pageImage: pageImage, 
                 }
              ])

              setPageText('')
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
    // For PDF Extraction Proccessing
    // const openFileExplorerPDF = () =>{
    //       pdfInputRef.current.click();
    // }
    // const selectPdfFile = (e) => {
    //       const selected = e.target.files[0];
    //       if (!selected) return;

    //       if (selected.type !== "application/pdf") {
    //         alert("Please select a PDF file only");
    //         return;
    //       }
    //       setPdfFile(selected);
    // }

    const handleConfirmation = () => {
        if (title === "") { setIsTitle(true); alert('Please fill the all fields'); return;}
        if (author === "") { setIsAuthor(true); alert('Please fill the all fields'); return;}
        if (description === "") { setIsDescription(true); alert('Please fill the all fields'); return;}
        if (genre === "") { setIsGenre(true); alert('Please fill the all fields'); return;}
        if (gradeCategory === "") { setIsGradeCategory(true); alert('Please fill the all fields'); return;}
        if (language === "") { setIsLanguage(true); alert('Please fill the all fields'); return;}
        if (publication === "") { setIsPublication(true); alert('Please fill the all fields'); return;}
        if(!file){
            alert("Insert image of the story")
            return;
        }
        if(pageList.length === 0){
            alert("Book pages are required")
            return;
        }

        console.log(pageList);

        setShowConfirmation(true);
    }

    const uploadStory = async () => {
        
        const formData = new FormData();
        formData.append("title", title);
        formData.append("author", author);
        formData.append("description", description);
        formData.append("genre", genre);
        formData.append("gradeCategory", gradeCategory);
        formData.append("pdfFile", pdfFile);
        formData.append("image", file);

        try {
            
            console.log([...formData.entries()]);
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/upload-manually`, formData);
            if(res.data.isSuccess){
               setTitle("")
               setAuthor("")
               setDescription("")
               setGenre("")
               setGradeCategory("")


               setPreview("")
               setFile(null)
               setPdfFile(null)

                setShowConfirmation(false);
            }
        } catch (error) {
            console.log(error)
            setErrorMessage(error?.response?.data?.message);
        }
        
    }
      return(
        <>
        <section className="min-h-screen w-full">

                {/*Header*/}
                <div className="w-full mt-10 flex">
                    <div className="w-full">
                        <h1 className="text-3xl font-bold text-gray-800">Upload Story Book</h1>
                        <p className="text-gray-400 text-sm">Fill-up the required information to upload story book</p>
                    </div>
                    

                    <div className={`w-full rounded-xl justify-end items-center flex gap-2 mt-4`}>
                    <button className="h-12 px-4 text-pink-500 font-semibold bg-white border border-pink-500 hover:bg-pink-500 hover:text-white rounded-full cursor-pointer" onClick={handleConfirmation}>+ Upload Story</button>
                    </div>
                </div>
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
                            value={genre}
                            onChange={(e) => {setGenre(e.target.value)
                                              setIsGenre(e.target.value === "")
                            }}
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

                        <input type="date" name="publication-date" id="publication-date" 
                            className={`${isPublication ? "border-red-300" : "border-gray-300"} h-12 border bg-white outline-none text-gray-500 p-2 rounded-lg`}
                            onChange={(e) => {setPublication(e.target.value)
                                              setIsPublication(e.target.value === "")
                            }}
                         />

                         <div>
                            <h2 className="text-lg font-bold text-gray-500 rounded-full">Story Information</h2>
                            <p className="text-gray-400 text-sm">Fill-up the required information in the story.</p>
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

                        {/* <div className={`${pdfFile ? "hidden" : ""} bg-gray-200 p-2 text-gray-500 font-semibold rounded-xl cursor-pointer justify-center items-center flex`}
                            onClick={openFileExplorerPDF}>+ Add Story
                                <input 
                                type="file"
                                accept=".pdf,application/pdf"
                                ref={pdfInputRef}
                                className="hidden"
                                onChange={selectPdfFile}
                                />
                            </div> */}
                            

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

                    <div className="bg-white w-1/2 p-6 flex flex-col gap-4 rounded-xl border border-gray-300">
  
                            {/* Header */}
                            <div className="w-full flex flex-col">
                                <h2 className="text-xl font-semibold text-gray-800">Preview</h2>
                            </div>
                            

                            {/* Image */}
                            <div className={`relative w-full h-52 bg-gray-200 rounded-xl overflow-hidden`} onClick={() => {setFile(null); setPreview(null)}}>
                                <div className={`${preview ? null : "hidden"} absolute inset-0 bg-black/30 hover:bg-red-500/50 cursor-pointer justify-start items-end flex p-2`}>
                                <h1 className={`text-xs font-bold text-white`}>Click to remove the image</h1>
                                </div>
                                {preview && (
                                    <img
                                    src={preview}
                                    alt="preview"
                                    className="w-full"
                                    />
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex flex-col gap-3">
                                
                                {/* Title */}
                                <h1 className="text-2xl font-bold text-gray-900">
                                {title || "Story Title"}
                                </h1>

                                {/* Description */}
                                <p className="text-gray-600 text-sm leading-relaxed">
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

                                </div>

                                {/* Author */}
                                <p className="text-xs text-gray-400 mt-2">
                                By {author || "Author Name"}
                                </p>
                                

                            </div>
                            {/* <div className={`${pdfFile ? "bg-green-200 border-green-300 text-green-500" : "bg-white border-gray-300 text-gray-500"} border-1 p-2 font-semibold rounded-xl justify-center items-center flex gap-2`}>
                                {pdfFile ? "Inserted PDF story" : "No inserted story pdf"}
                                <button className={`${pdfFile ? "" : "hidden"} text-green-500 font-semibold bg-green-300 rounded-full h-5 w-5 justify-center items-center flex cursor-pointer border-1 border-green-500 hover:text-red-500 hover:bg-red-200 hover:border-red-500 transition-all duration-500 ease-in-out`}
                                onClick={() => setPdfFile(null)}
                                >
                                x
                                </button>
                            </div> */}
                            
                        </div>
 
                    
                </div>

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