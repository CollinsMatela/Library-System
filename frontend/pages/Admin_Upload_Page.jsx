import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Confirmation_Popup from "../popup/Confirmation_Popup";

const Admin_Upload_Page = () => {
    const navigate = useNavigate();

    const [showConfirmation, setShowConfirmation] = useState(false);

    const [isAddQuestion, setIsAddQuestion] = useState(false);

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [genre, setGenre] = useState("");
    const [gradeCategory, setGradeCategory] = useState("");
    const [textStory, setTextStory] = useState("")

    const [isTitle, setIsTitle] = useState(false);
    const [isAuthor, setIsAuthor] = useState(false);
    const [isDescription, setIsDescription] = useState(false);
    const [isGenre, setIsGenre] = useState(false);
    const [isGradeCategory, setIsGradeCategory] = useState(false);
    const [isTextStory, setIsTextStory] = useState(false)

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
    const [preview, setPreview] = useState("");

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
         setPreview(URL.createObjectURL(selected)); // 👈 local preview
    }

    const handleConfirmation = () => {
        if (title === "") { setIsTitle(true); alert('Please fill the all fields'); return;}
        if (author === "") { setIsAuthor(true); alert('Please fill the all fields'); return;}
        if (description === "") { setIsDescription(true); alert('Please fill the all fields'); return;}
        if (textStory === "") {setIsTextStory(true); alert('Please fill the all fields'); return;}
        if (genre === "") { setIsGenre(true); alert('Please fill the all fields'); return;}
        if (gradeCategory === "") { setIsGradeCategory(true); alert('Please fill the all fields'); return;}
        if(file === null){
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

          if(quizList.length == 4){
            setIsAddQuestion(true);
          }
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
        formData.append("textStory", textStory);
        formData.append("image", file);
        formData.append("questionnaire", JSON.stringify(quizList));

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/upload-manually`, formData);
            if(res.data.isSuccess){
                alert(res.data.message);
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <section className="bg-gray-50 min-h-screen w-full flex flex-col items-center px-50 py-10 gap-6">

            {showConfirmation && 
            (<Confirmation_Popup 
                onConfirm={uploadStory}
                onCancel={() => setShowConfirmation(false)}
            />)}
            
            {/* Header */}
            <div className="w-full max-w-5xl justify-between items-end flex">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Upload Story</h1>
                    <p className="text-gray-500">Create and publish a new story</p>
                </div>
                <div className={`rounded-xl justify-end items-center flex gap-2`}>
                <button className="h-10 px-4 text-gray-500 font-semibold bg-white shadow-lg hover:bg-gray-200 rounded-full cursor-pointer" onClick={() => navigate('/admin-page')}>⟵</button>
                <button className="h-10 px-4 text-white font-semibold bg-blue-500 shadow-lg hover:bg-blue-600 rounded-full cursor-pointer" onClick={handleConfirmation}>+ Upload Story</button>
                </div>
                
            </div>

                {/* MANUALLY UPLOAD STORY CONTAINER */}
                <div className={`w-full max-w-5xl flex bg-white rounded-xl p-4 `}>
                    
                    {/* Story Details */}
                    <div className="bg-white w-1/2 p-6 flex flex-col gap-4">
                        <h2 className="text-xl font-semibold">Story Details</h2>

                        <input type="text" placeholder="Title" className={`${isTitle ? "bg-red-200" : "bg-gray-200"} outline-none p-2 rounded-lg`} 
                        value={title} 
                        onChange={(e) => {setTitle(e.target.value); 
                                          setIsTitle(e.target.value === "");
                        }}/>
                        <input type="text" placeholder="Author" className={`${isAuthor ? "bg-red-200" : "bg-gray-200"} outline-none p-2 rounded-lg`} 
                        value={author} 
                        onChange={(e) => {setAuthor(e.target.value);
                                          setIsAuthor(e.target.value === "");
                        }}/>

                        <textarea 
                            placeholder="Description"
                            className={`${isDescription ? "bg-red-200" : "bg-gray-200"} h-10 outline-none p-2 rounded-lg`}
                            value={description}
                            onChange={(e) => {setDescription(e.target.value)
                                              setIsDescription(e.target.value === "");
                            }}
                        />

                        <textarea 
                            placeholder="Summary of the story"
                            className={`${isTextStory ? "bg-red-200" : "bg-gray-200"} h-25 outline-none p-2 rounded-lg`}
                            value={textStory}
                            onChange={(e) => {setTextStory(e.target.value)
                                              setIsTextStory(e.target.value === "");
                            }}
                        />

                        <select
                            value={genre}
                            onChange={(e) => {setGenre(e.target.value)
                                              setIsGenre(e.target.value === "")
                            }}
                            className={`${isGenre ? "bg-red-200" : "bg-gray-200"} outline-none p-2 rounded-lg`}
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
                            className={`${isGradeCategory ? "bg-red-200" : "bg-gray-200"} outline-none p-2 rounded-lg`}
                        >
                            <option value="">Select Grade Category</option>
                            <option value="kindergarten">Kindergarten</option>
                            <option value="grade 1">Grade 1</option>
                            <option value="grade 2">Grade 2</option>
                            <option value="grade 3">Grade 3</option>
                            <option value="grade 4">Grade 4</option>
                        </select>

                        <input type="file" className="bg-gray-200 outline-none p-2 rounded-lg cursor-pointer" onChange={handleImagePreview} />

                    </div>

                    <div className="bg-white w-1/2 p-6 flex flex-col gap-5 rounded-xl shadow-lg">
  
                            {/* Header */}
                            <div className="w-full flex gap-2">
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

                                <div className="w-full">
                                <p className="text-gray-600 text-sm leading-relaxed break-words">
                                {textStory || "Summary of the story will appear here."}
                                </p> 
                                </div>
                                

                            </div>
                        </div>

                    
                </div>

        <div className={`w-full max-w-5xl flex p-4 bg-white rounded-xl`}>
                {/* Quiz Creation */}
                    <div className={`bg-white w-full p-6 flex flex-col gap-4`}>
                        <div className="w-ful justify-between items-center flex">
                            <h2 className="text-xl font-semibold">Quiz Creation <span className="text-sm text-gray-300">{`| ${quizList.length} out of 5`}</span></h2>
                            <button className={`${isAddQuestion ? 'hidden' : null} shadow-lg font-semibold text-sm bg-blue-500 px-2 text-white py-1 rounded-lg cursor-pointer hover:bg-blue-600`} onClick={addQuestion}>
                            + Question
                            </button>
                        </div>
                        

                        <input 
                            type="text" 
                            placeholder="Question"
                            className={`${isQuestion ? "bg-red-200" : "bg-gray-200"} p-2 rounded-lg outline-none`}
                            value={question}
                            onChange={(e) => {
                                             setQuestion(e.target.value);
                                             setIsQuestion(e.target.value === "");
                            }}
                        />

                        <input type="text" placeholder="Choice A" className={`${isChoiceA ? "bg-red-200" : "bg-gray-200"} p-2 rounded-lg outline-none`}
                        value={choiceA} onChange={(e) => {
                                                         setChoiceA(e.target.value)
                                                         setIsChoiceA(e.target.value === "");
                        }} />
                        <input type="text" placeholder="Choice B" className={`${isChoiceB ? "bg-red-200" : "bg-gray-200"} p-2 rounded-lg outline-none`} 
                        value={choiceB} onChange={(e) => {
                                                         setChoiceB(e.target.value)
                                                         setIsChoiceB(e.target.value === "");
                        }}/>
                        <input type="text" placeholder="Choice C" className={`${isChoiceC ? "bg-red-200" : "bg-gray-200"} p-2 rounded-lg outline-none`} 
                        value={choiceC} onChange={(e) => {
                                                         setChoiceC(e.target.value)
                                                         setIsChoiceC(e.target.value === "");
                        }}/>
                        <input type="text" placeholder="Choice D" className={`${isChoiceD ? "bg-red-200" : "bg-gray-200"} p-2 rounded-lg outline-none`} 
                        value={choiceD} onChange={(e) => {
                                                         setChoiceD(e.target.value)
                                                         setIsChoiceD(e.target.value === "");
                        }}/>

                        <select
                                className={`${isAnswer ? "bg-red-200" : "bg-gray-200"} p-2 rounded-lg outline-none`}
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

                    <div className="bg-white w-full max-w-5xl flex flex-col border-l-2 border-gray-300 gap-4 py-6 pl-4 overflow-y-auto">
                         <h2 className="text-xl font-semibold">Questionnaires</h2>
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