import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import QuizResultModal from "../modals/QuizResultModal";

const Lib_Quiz = () => {
    const {id} = useParams();

    const [selectedStory, setSelectedStory] = useState("")
    const [currentNumber, setCurrentNumber] = useState(0);
    const [score, setScore] = useState(0);

    const [showResult, setShowResult] = useState(false);

    const questions = selectedStory?.questionnaire;
    const currentQuestion = questions?.[currentNumber];

    const isQuizActive = questions && currentNumber < questions.length;

    const navigate = useNavigate();

    useEffect(() => {
        fetchStories();
    },[id])

    const fetchStories = async () =>{
          try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-story/${id}`);
                setSelectedStory(res.data.story);
                console.log(res.data.message);
                console.log(res.data.story);
          } catch (error) {
            console.log(error)
          }
    }

    const handleSubmit = (selectedAnswer) => {
        if (!questions) return;

        if(selectedAnswer === currentQuestion.answer){
            setScore((prev) => prev + 1);
        }
        const next = currentNumber + 1;

        if (next >= questions.length) {
            setShowResult(true);
        } else {
            setCurrentNumber(next);
        }
    }

    return(
        <section className="bg-white min-h-screen w-full justify-start items-center flex flex-col gap-4">

            {showResult && (
                <QuizResultModal score={score}/>
            )}

            {/* Header */}
            <div className="w-full h-20 bg-white border-b border-gray-200 justify-center items-center flex shadow-sm">
            <div className="min-w-5xl h-20 flex items-center justify-between">
                
                {/* Left Side */}
                <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-gray-800">
                    Short Quiz Activity
                </h1>
                <p className="text-sm text-gray-500">
                    Answer the questions below
                </p>
                </div>

                {/* Score Badge */}
                <div className="flex items-center gap-3">
                <div className="h-full px-4 rounded-2xl bg-green-600 shadow-md">
                    <span className="text-sm font-medium text-white">
                    Score
                    </span>
                    <h1 className="text-xl font-bold text-white">
                    {score} / {selectedStory?.questionnaire?.length}
                    </h1>
                </div>
                </div>

            </div>
            </div>
            
            {isQuizActive &&
            (
            <div className="space-y-4 bg-white p-4 rounded-2xl">
           {/* Question Card */}
            <div className="w-full max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl border border-gray-200 shadow-xl px-6 py-10 md:px-10 md:py-14 text-center">
                
                {/* Question Number */}
                <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-blue-100 text-blue-600 font-bold text-sm tracking-wide mb-6">
                Question {currentNumber + 1}
                </div>

                {/* Question Text */}
                <h1 className="text-2xl md:text-4xl font-bold text-gray-800 leading-snug md:leading-tight max-w-4xl mx-auto">
                {selectedStory?.questionnaire?.[currentNumber]?.question}
                </h1>

            </div>
            </div>

            {/* Answer Key */}
            <div className="bg-white min-w-5xl rounded-2xl justify-center items-start flex flex-col gap-2">
                {
                currentQuestion?.choices.map((choice, index) => (
                    <button 
                    key={index}
                    value={choice}
                    onClick={() => handleSubmit(choice)}
                    className="p-4 w-full border-1 border-gray-300 rounded-xl cursor-pointer font-bold text-gray-500 hover:bg-blue-100 hover:border-blue-500 hover:text-blue-500 hover:-translate-y-2 transition-all duration-500 ease-in-out active:scale-[0.98]">
                    {choice}
                    </button>
                ))
                }
            </div>
            </div>
            )}
            
            
            
            

           

           

        </section>
    )
}
export default Lib_Quiz;
