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

    const [question, setQuestion] = useState("");
    const [choiceA, setChoiceA] = useState("");
    const [choiceB, setChoiceB] = useState("");
    const [choiceC, setChoiceC] = useState("");
    const [choiceD, setChoiceD] = useState("");
    const [answer, setAnswer] = useState("");

    const [quizList, setQuizList] = useState([]);

    const [isTitle, setIsTitle] = useState(false);
    const [isAuthor, setIsAuthor] = useState(false);
    const [isDescription, setIsDescription] = useState(false);
    const [isGenre, setIsGenre] = useState(false);
    const [isGradeCategory, setIsGradeCategory] = useState(false);

    const clickManualBtn = () => {
          setIsManual(true);
          setIsAIAssistant(false);
    }
    const clickAIAssistantBtn = () => {
          setIsManual(false);
          setIsAIAssistant(true);
    }
    const nextQuestion = () => {
          const newQuestion = {
            question: question,
            choices: [choiceA, choiceB, choiceC, choiceD],
            answer: answer
          }
          setQuizList(prev => [...prev, newQuestion])

          if(quizList.length >= 5){
            setIsAddQuestion(true);
          }
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

                        <input type="text" placeholder="Title" className="p-2 rounded-lg bg-gray-200 outline-none" value={title} onChange={(e) => setTitle(e.target.value)}/>
                        <input type="text" placeholder="Author" className="bg-gray-200 outline-none p-2 rounded-lg" value={author} onChange={(e) => setAuthor(e.target.value)}/>

                        <textarea 
                            placeholder="Description"
                            className="bg-gray-200 outline-none p-2 rounded-lg h-24 resize-none"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <select
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            className="bg-gray-200 outline-none p-2 rounded-lg"
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
                            onChange={(e) => setGradeCategory(e.target.value)}
                            className="bg-gray-200 outline-none p-2 rounded-lg"
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
                            <h2 className="text-xl font-semibold">0 of 5</h2>
                        </div>
                        

                        <input 
                            type="text" 
                            placeholder="Question"
                            className="p-2 rounded-lg bg-gray-200 outline-none"
                        />

                        <input type="text" placeholder="Choice A" className="p-2 rounded-lg bg-gray-200 outline-none" />
                        <input type="text" placeholder="Choice B" className="p-2 rounded-lg bg-gray-200 outline-none" />
                        <input type="text" placeholder="Choice C" className="p-2 rounded-lg bg-gray-200 outline-none" />
                        <input type="text" placeholder="Choice D" className="p-2 rounded-lg bg-gray-200 outline-none" />

                        <select className="bg-gray-200 outline-none p-2 rounded-lg">
                            <option>Select Correct Answer</option>
                            <option>A</option>
                            <option>B</option>
                            <option>C</option>
                            <option>D</option>
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