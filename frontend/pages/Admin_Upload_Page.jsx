import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Confirmation_Popup from "../popup/Confirmation_Popup";
import Admin_Sidebar from "../components/Admin_Sidebar"

const Admin_Upload_Page = () => {
    const navigate = useNavigate();

    const fileInputRef = useRef();
    const pdfInputRef = useRef();

    const [showConfirmation, setShowConfirmation] = useState(false);

    const [isAddQuestion, setIsAddQuestion] = useState(false);

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [genre, setGenre] = useState("");
    const [gradeCategory, setGradeCategory] = useState("");
    const [pdfFile, setPdfFile] = useState(null)


    const [isTitle, setIsTitle] = useState(false);
    const [isAuthor, setIsAuthor] = useState(false);
    const [isDescription, setIsDescription] = useState(false);
    const [isGenre, setIsGenre] = useState(false);
    const [isGradeCategory, setIsGradeCategory] = useState(false);
    const [isPdfFile, setIsPdfFile] = useState(false)


    const [question, setQuestion] = useState("");
    const [choiceA, setChoiceA] = useState("");
    const [choiceB, setChoiceB] = useState("");
    const [choiceC, setChoiceC] = useState("");
    const [choiceD, setChoiceD] = useState("");
    const [answer, setAnswer] = useState("");

    const [isQuestion, setIsQuestion] = useState(false);
    const [isChoiceA, setIsChoiceA] = useState(false);
    const [isChoiceB, setIsChoiceB] = useState(false);
    const [isChoiceC, setIsChoiceC] = useState(false);
    const [isChoiceD, setIsChoiceD] = useState(false);
    const [isAnswer, setIsAnswer] = useState(false);

    const [quizList, setQuizList] = useState([]);

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
    return () => {
        if (preview) {
        URL.revokeObjectURL(preview);
        }
    };
    }, [preview]);

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
    const openFileExplorerPDF = () =>{
          pdfInputRef.current.click();
    }
    const selectPdfFile = (e) => {
          const selected = e.target.files[0];
          if (!selected) return;

          if (selected.type !== "application/pdf") {
            alert("Please select a PDF file only");
            return;
          }
          setPdfFile(selected);
    }

    const handleConfirmation = () => {
        if (title === "") { setIsTitle(true); alert('Please fill the all fields'); return;}
        if (author === "") { setIsAuthor(true); alert('Please fill the all fields'); return;}
        if (description === "") { setIsDescription(true); alert('Please fill the all fields'); return;}
        if (genre === "") { setIsGenre(true); alert('Please fill the all fields'); return;}
        if (gradeCategory === "") { setIsGradeCategory(true); alert('Please fill the all fields'); return;}
        if(!pdfFile){
            alert("Insert pdf file of the story")
            return;
        }
        if(!file){
            alert("Insert image of the story")
            return;
        }
        if(quizList.length < 5){
            alert("Required five (5) questionnaires")
            return;
        }

        setShowConfirmation(true);
    }

    const addQuestion = () => {
        
            if (question === "") { setIsQuestion(true); return}
            if (choiceA === "") { setIsChoiceA(true); return}
            if (choiceB === "") { setIsChoiceB(true); return}
            if (choiceC === "") { setIsChoiceC(true); return}
            if (choiceD === "") { setIsChoiceD(true); return}
            if (answer === "") { setIsAnswer(true); return}

          const newQuestion = {
            question: question,
            choices: [choiceA, choiceB, choiceC, choiceD],
            answer: answer
          }
          setQuizList(prev => [...prev, newQuestion])

          // Reset
          setQuestion("");
          setChoiceA("");
          setChoiceB("");
          setChoiceC("");
          setChoiceD("");
          setAnswer("");
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
        formData.append("questionnaire", JSON.stringify(quizList));

        try {
            
            console.log([...formData.entries()]);
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/upload-manually`, formData);
            if(res.data.isSuccess){
               setTitle("")
               setAuthor("")
               setDescription("")
               setGenre("")
               setGradeCategory("")

               setQuizList([])
               setPreview("")
               setFile(null)
               setPdfFile(null)

               setQuestion("");
                setChoiceA("");
                setChoiceB("");
                setChoiceC("");
                setChoiceD("");
                setAnswer("");
            }
        } catch (error) {
            console.log(error)
        }

         setShowConfirmation(false);
        
    }

    return (
        <section className="bg-white min-h-screen w-full flex flex-col items-center pl-90 pr-10 py-10 gap-6">
            <Admin_Sidebar/>
            {showConfirmation && 
            (<Confirmation_Popup 
                onConfirm={uploadStory}
                onCancel={() => setShowConfirmation(false)}
            />)}
            
            {/* Header */}
            <div className="w-full justify-between items-start flex">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Upload Story Management</h1>
                    <p className="text-gray-400 text-md">Create and publish a new story</p>
                </div>
                <div className={`rounded-xl justify-end items-center flex gap-2`}>
                <button className="h-10 px-4 text-gray-800 font-semibold bg-white border border-gray-800 hover:bg-gray-800 hover:text-white rounded-full cursor-pointer" onClick={handleConfirmation}>+ Upload Story</button>
                </div>
                
            </div>

                {/* MANUALLY UPLOAD STORY CONTAINER */}
                <div className={`bg-black w-full flex bg-white rounded-xl gap-10 mt-10`}>
                    
                    {/* Story Details */}
                    <div className="bg-white w-1/2 flex flex-col gap-4">
                        <div>
                            <h2 className="text-lg font-bold text-gray-500 rounded-full">Story Information</h2>
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

                        <div className={`${pdfFile ? "hidden" : ""} bg-gray-200 p-2 text-gray-500 font-semibold rounded-xl cursor-pointer justify-center items-center flex`}
                            onClick={openFileExplorerPDF}>+ Add Story
                                <input 
                                type="file"
                                accept=".pdf,application/pdf"
                                ref={pdfInputRef}
                                className="hidden"
                                onChange={selectPdfFile}
                                />
                            </div>

                        <div className="bg-gray-200 w-full outline-none p-2 rounded-lg justify-center items-center flex cursor-pointer text-gray-500 font-semibold px-2" onClick={openFileExplorer}> + Upload Image
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
                            <div className="w-full h-52 bg-gray-200 rounded-xl overflow-hidden">
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
                                
                                <span className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-full">
                                    {genre || "Genre"}
                                </span>

                                <span className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded-full">
                                    {gradeCategory || "Grade"}
                                </span>

                                </div>

                                {/* Author */}
                                <p className="text-xs text-gray-400 mt-2">
                                By {author || "Author Name"}
                                </p>
                                

                            </div>
                            <div className={`${pdfFile ? "bg-green-200 border-green-300 text-green-500" : "bg-white border-gray-300 text-gray-500"} border-1 p-2 font-semibold rounded-xl justify-center items-center flex gap-2`}>
                                {pdfFile ? "Inserted PDF story" : "No inserted story pdf"}
                                <button className={`${pdfFile ? "" : "hidden"} text-green-500 font-semibold bg-green-300 rounded-full h-5 w-5 justify-center items-center flex cursor-pointer border-1 border-green-500 hover:text-red-500 hover:bg-red-200 hover:border-red-500 transition-all duration-500 ease-in-out`}
                                onClick={() => setPdfFile(null)}
                                >
                                x
                                </button>
                            </div>
                            
                        </div>
 
                    
                </div>

        <div className={`w-full flex flex-col bg-white rounded-xl gap-6`}>
                {/* Quiz Creation */}
                    <div className={`bg-white w-full flex flex-col gap-4`}>
                        <div className="w-ful justify-between items-center flex">
                            <div>
                                <h2 className="text-lg font-bold text-gray-500 rounded-full">Question Creation</h2>
                                <p className="text-gray-400 text-sm">Fill-up the required information for question.</p>
                            </div>
                            <button className={`${quizList.length === 5 ? 'hidden' : null} h-10 px-4 text-gray-800 font-semibold bg-white border border-gray-800 hover:bg-gray-800 hover:text-white rounded-full cursor-pointer`} onClick={addQuestion}>
                            + Question
                            </button>
                        </div>
                        

                        <input 
                            type="text" 
                            placeholder="Question"
                            className={`${isQuestion ? "border-red-500" : "border-gray-300"} h-12 border bg-white p-2 rounded-lg outline-none`}
                            value={question}
                            onChange={(e) => {
                                             setQuestion(e.target.value);
                                             setIsQuestion(e.target.value === "");
                            }}
                        />

                        <input type="text" placeholder="Choice A" className={`${isChoiceA ? "border-red-500" : "border-gray-300"} h-12 border bg-white p-2 rounded-lg outline-none`}
                        value={choiceA} onChange={(e) => {
                                                         setChoiceA(e.target.value)
                                                         setIsChoiceA(e.target.value === "");
                        }} />
                        <input type="text" placeholder="Choice B" className={`${isChoiceB ? "border-red-500" : "border-gray-300"} h-12 border bg-white p-2 rounded-lg outline-none`} 
                        value={choiceB} onChange={(e) => {
                                                         setChoiceB(e.target.value)
                                                         setIsChoiceB(e.target.value === "");
                        }}/>
                        <input type="text" placeholder="Choice C" className={`${isChoiceC ? "border-red-500" : "border-gray-300"} h-12 border bg-white p-2 rounded-lg outline-none`} 
                        value={choiceC} onChange={(e) => {
                                                         setChoiceC(e.target.value)
                                                         setIsChoiceC(e.target.value === "");
                        }}/>
                        <input type="text" placeholder="Choice D" className={`${isChoiceD ? "border-red-500" : "border-gray-300"} h-12 border bg-white p-2 rounded-lg outline-none`} 
                        value={choiceD} onChange={(e) => {
                                                         setChoiceD(e.target.value)
                                                         setIsChoiceD(e.target.value === "");
                        }}/>

                        <select
                                className={`${isAnswer ? "border-red-500" : "border-gray-300"} h-12 border bg-white p-2 rounded-lg outline-none`}
                                value={answer}
                                onChange={(e) => {
                                    setAnswer(e.target.value);
                                    setIsAnswer(e.target.value === "");
                                }}
                                >
                                <option value="">Select Correct Answer</option>
                                <option value={choiceA}>A</option>
                                <option value={choiceB}>B</option>
                                <option value={choiceC}>C</option>
                                <option value={choiceD}>D</option>
                        </select>

                    </div>

                    <div className="bg-white w-full flex flex-col gap-4 overflow-y-auto">
                         <div>
                                <h2 className="text-lg font-bold text-gray-500 rounded-full">Questions Display</h2>
                                <p className="text-gray-400 text-sm">Review the uploaded questions.</p>
                            </div>
                         {quizList.length <= 0 && (
                            <div className="bg-gray-100 text-gray-400 text-sm text-center py-4 rounded-xl">
                                No questions added yet
                            </div>
                         )}
                         {quizList.length > 0 && (
                            quizList.map((questionnaire, index) => (
                                <div key={index} className="bg-white border-2 border-gray-300 py-4 rounded-xl p-2 space-y-2">
                                   <p className="font-semibold">{`Q${index + 1}. ${questionnaire.question}`}</p>
                                   <ul className="h-8 w-full flex gap-2">
                                        <li className="px-2 py-1 text-sm bg-blue-100 text-blue-600 rounded-full">{questionnaire.choices[0]}</li>
                                        <li className="px-2 py-1 text-sm bg-blue-100 text-blue-600 rounded-full">{questionnaire.choices[1]}</li>
                                        <li className="px-2 py-1 text-sm bg-blue-100 text-blue-600 rounded-full">{questionnaire.choices[2]}</li>
                                        <li className="px-2 py-1 text-sm bg-blue-100 text-blue-600 rounded-full">{questionnaire.choices[3]}</li>
                                   </ul>
                                   <div className="h-8 w-full border-t-2 border-gray-300 py-2">
                                        <p className="px-2 py-1 text-sm bg-green-100 text-green-600 rounded-full inline-flex">Answer key: {questionnaire.answer}</p>
                                   </div>
                                </div>
                            ))
                            
                         )}
                    </div>
                    
            </div>
        </section>
    )
}

export default Admin_Upload_Page