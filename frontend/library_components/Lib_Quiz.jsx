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
        <section className="bg-pink-600 min-h-screen w-full justify-center items-center flex flex-col py-10 gap-4">

            {showResult && (
                <QuizResultModal score={score}/>
            )}
            
            {isQuizActive &&
            (
            <div className="space-y-4 bg-white p-4 rounded-2xl">
            {/* Header */}
            <div className="bg-white h-20 min-w-5xl border-b-1 border-gray-300 justify-between items-center flex px-4">
                <h1 className="text-bold text-xl text-gray-500">Short Quiz Activity</h1>
                <h1>{score} / {selectedStory?.questionnaire?.length}</h1>
            </div>
            {/* Questions */}
            <div className="bg-white min-w-5xl justify-center items-center flex flex-col px-4 py-10 gap-4">
                <h1 className="font-bold text-gray-500">Question {currentNumber}</h1>
                <h1 className="text-4xl font-semibold text-gray-900">{selectedStory?.questionnaire?.[currentNumber]?.question}</h1>
            </div>

            {/* Answer Key */}
            <div className="bg-white min-w-5xl rounded-2xl border-4 border-gray-300 justify-center items-start flex flex-col gap-2 p-4">
                {
                currentQuestion?.choices.map((choice, index) => (
                    <button 
                    key={index}
                    value={choice}
                    onClick={() => handleSubmit(choice)}
                    className="p-4 w-full border-b-5 border-gray-300 cursor-pointer font-bold text-gray-500 hover:bg-blue-100 hover:border-none hover:text-blue-500 hover:scale-105 transition-all duration-500 ease-in-out">
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
