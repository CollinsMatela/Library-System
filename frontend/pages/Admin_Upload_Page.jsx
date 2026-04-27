import { useState, useEffect } from "react"

const Admin_Upload_Page = () => {
    const [isManual, setIsManual] = useState(false);
    const [isAIAssistant, setIsAIAssistant] = useState(false);
    const [isAddQuestion, setIsAddQuestion] = useState(false);

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [genre, setGenre] = useState("");
    const [gradeCategory, setGradeCategory] = useState("");

    const [isTitle, setIsTitle] = useState(false);
    const [isAuthor, setIsAuthor] = useState(false);
    const [isDescription, setIsDescription] = useState(false);
    const [isGenre, setIsGenre] = useState(false);
    const [isGradeCategory, setIsGradeCategory] = useState(false);

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
        //  console.log(file);
         setPreview(URL.createObjectURL(selected)); // 👈 local preview
    }

    const clickManualBtn = () => {
          setIsManual(true);
          setIsAIAssistant(false);
    }
    const clickAIAssistantBtn = () => {
          setIsManual(false);
          setIsAIAssistant(true);
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
    const uploadStory = () => {
        if (title === "") { setIsTitle(true);}
        if (author === "") { setIsAuthor(true);}
        if (description === "") { setIsDescription(true);}
        if (genre === "") { setIsGenre(true);}
        if (gradeCategory === "") { setIsGradeCategory(true);}

        if(quizList.length < 4){
            alert("Create five (5) questionnaires")
            return;
        }
        alert("Congrats")
    }

    return (
        <section className="bg-gray-50 min-h-screen w-full flex flex-col items-center px-6 py-10 gap-6">
            
            {/* Header */}
            <div className="w-full max-w-5xl justify-between items-end flex">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Upload Story</h1>
                    <p className="text-gray-500">Create and publish a new story</p>
                </div>
                
                <div className="space-x-2">
                    <button className={`${isManual ? 'bg-blue-500 text-white' : null} p-2 text-gray-300 font-semibold cursor-pointer hover:bg-blue-200 hover:text-white rounded-full`} onClick={clickManualBtn}>
                        Manual Upload
                    </button>
                    <button className={`${isAIAssistant ? 'bg-blue-500 text-white' : null} p-2 text-gray-300 font-semibold cursor-pointer hover:bg-blue-200 hover:text-white rounded-full`} onClick={clickAIAssistantBtn}>
                        AI Assistant
                    </button>
                </div>
            </div>

                {/* MANUALLY UPLOAD STORY CONTAINER */}
                <div className={`${isManual ? "" : "hidden"} w-full max-w-5xl flex bg-white rounded-xl p-4`}>
                    
                    {/* Story Details */}
                    <div className="bg-white w-full p-6 flex flex-col gap-4">
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
                            className={`${isDescription ? "bg-red-200" : "bg-gray-200"} h-25 outline-none p-2 rounded-lg`}
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

                    <div className="bg-white w-full p-6 flex flex-col gap-5 rounded-xl shadow-sm">
  
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

                            </div>
                        </div>

                    
                </div>

        <div className={`${isManual ? null : "hidden"} w-full max-w-5xl flex p-4 bg-white rounded-xl`}>
                {/* Quiz Creation */}
                    <div className={`bg-white w-full p-6 flex flex-col gap-4`}>
                        <div className="w-ful justify-between items-center flex">
                            <h2 className="text-xl font-semibold">Quiz Creation <span className="text-sm text-gray-300">{`| ${quizList.length} out of 5`}</span></h2>
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

                        <div className="w-full h-10 justify-end items-center flex">
                            <button className={`${isAddQuestion ? 'hidden' : null} bg-blue-500 px-2 text-white py-2 rounded-full cursor-pointer hover:bg-blue-600`} onClick={addQuestion}>
                            + Question
                            </button>
                        </div>

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

            <div className={`${isManual ? null : "hidden"} bg-white h-20 w-5xl rounded-xl justify-end px-6 items-center flex`}>
                <button className="h-12 px-4 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-full cursor-pointer" onClick={uploadStory}>Upload Story</button>
            </div>
        </section>
    )
}

export default Admin_Upload_Page