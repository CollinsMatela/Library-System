import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Lib_Quiz = () => {
    const {id} = useParams();

    const [selectedStory, setSelectedStory] = useState("")
    const [currentNumber, setCurrentNumber] = useState(0);
    const [score, setScore] = useState(0);

    const [isComplete, setIsComplete] = useState(false);

    const questions = selectedStory?.questionnaire;
    const currentQuestion = questions?.[currentNumber];

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
        const questions = selectedStory?.questionnaire;

    if (!questions) return;

    // stop if already finished
    if (currentNumber >= questions.length) {
        setIsComplete(true);
    }
        if(selectedAnswer === selectedStory?.questionnaire?.[currentNumber].answer){
            setScore((prev) => prev + 1);
        }
          setCurrentNumber((prev) => prev + 1)
    }

    return(
        <section className="bg-white min-h-screen w-full justify-center items-center flex flex-col py-10 gap-4">
            {isComplete && (
                <div className="text-center text-2xl font-bold">
                    Congratulation Bro 🎉
                    <p>Your score: {score}</p>
                </div>
            )}
            
            {/* Header */}
            <div className="h-20 min-w-5xl rounded-2xl justify-between items-center flex px-4">
                <h1>{selectedStory.title}</h1>
                <h1>{score} / {selectedStory?.questionnaire?.length}</h1>
            </div>
            {/* Questions */}
            <div className="min-w-5xl justify-center items-center flex flex-col border-y-1 border-gray-300 px-4 py-10 gap-4">
                <h1 className="font-bold text-gray-500">Question {currentNumber}</h1>
                <h1 className="text-xl font-semibold text-gray-900">{selectedStory?.questionnaire?.[currentNumber]?.question}</h1>
            </div>

            {/* Answer Key */}
            <div className="min-w-5xl justify-center items-start flex flex-col gap-4">
                <h1 className="font-bold text-gray-500">Choices:</h1>
                {
                currentQuestion?.choices.map((choice, index) => (
                    <button 
                    key={index}
                    value={choice}
                    onClick={() => handleSubmit(choice)}
                    className="p-4 w-full border-1 border-gray-300 rounded-2xl cursor-pointer font-bold text-gray-500 hover:bg-blue-100 hover:border-none hover:text-blue-500 hover:scale-105 transition-all duration-500 ease-in-out">
                    {choice}
                    </button>
                ))
                }
            </div>

           

        </section>
    )
}
export default Lib_Quiz;
