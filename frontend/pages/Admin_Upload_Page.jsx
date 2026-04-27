import { useState } from "react"

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

    const ErrorChecker = () => {
            let hasError = false;

            if (title === "") { setIsTitle(true); hasError = true; }
            if (author === "") { setIsAuthor(true); hasError = true; }
            if (description === "") { setIsDescription(true); hasError = true; }
            if (genre === "") { setIsGenre(true); hasError = true; }
            if (gradeCategory === "") { setIsGradeCategory(true); hasError = true; }

            if (question === "") { setIsQuestion(true); hasError = true; }
            if (choiceA === "") { setIsChoiceA(true); hasError = true; }
            if (choiceB === "") { setIsChoiceB(true); hasError = true; }
            if (choiceC === "") { setIsChoiceC(true); hasError = true; }
            if (choiceD === "") { setIsChoiceD(true); hasError = true; }
            if (answer === "") { setIsAnswer(true); hasError = true; }

            return hasError;
    };

    

    const clickManualBtn = () => {
          setIsManual(true);
          setIsAIAssistant(false);
    }
    const clickAIAssistantBtn = () => {
          setIsManual(false);
          setIsAIAssistant(true);
    }
    const nextQuestion = () => {
        let itHasError = ErrorChecker();
        if(itHasError) {
            alert('Has errors')
            return
        }
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
                <div className={`${isManual ? "" : "hidden"} w-full max-w-5xl flex gap-6`}>
                    
                    {/* Story Details */}
                    <div className="bg-white w-full rounded-xl shadow-lg p-6 flex flex-col gap-4">
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
                    </div>

                    {/* Quiz Creation */}
                    <div className="bg-white w-full rounded-xl shadow-lg p-6 flex flex-col gap-4">
                        <div className="w-ful justify-between items-center flex">
                            <h2 className="text-xl font-semibold">Quiz Creation</h2>
                            <h2 className="text-xl font-semibold">{`${quizList.length} out of 5`}</h2>
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

                        <button className={`${isAddQuestion ? 'hidden' : null} bg-green-500 text-white py-2 rounded-lg hover:bg-green-600`} onClick={nextQuestion}>
                            Add Question
                        </button>
                    </div>
                </div>

        <div className="w-full max-w-5xl flex gap-6">
                {/* RIGHT: Preview */}
                {/* <div className="bg-white w-1/2 rounded-xl shadow-lg p-6 flex flex-col justify-between gap-4">
                    
                    <div className="w-full space-y-2">
                        <h2 className="text-xl font-semibold">Preview</h2>

                        <div className="bg-gray-200 h-40 rounded-lg flex items-center justify-center text-gray-500">
                            Image Preview
                        </div>

                        <h3 className="text-lg font-bold">Story Title</h3>
                        <p className="text-gray-600 text-sm">
                            Story description will appear here...
                        </p>
                    </div>

                    <button className="bg-blue-600 w-full text-white py-2 rounded-lg hover:bg-blue-700 transition">
                        Upload Story
                    </button>
                </div> */}
            </div>
        </section>
    )
}

export default Admin_Upload_Page