import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import QuizResultModal from "../modals/QuizResultModal";

const Lib_Quiz = () => {
    const { id } = useParams();

    const [selectedStory, setSelectedStory] = useState(null);
    const [currentNumber, setCurrentNumber] = useState(0);
    const [points, setPoints] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const [selectedChoice, setSelectedChoice] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [wrongAnswers, setWrongAnswers] = useState([]);

    const questions = selectedStory?.questionnaire;
    const currentQuestion = questions?.[currentNumber];
    const isQuizActive = questions && currentNumber < questions.length;

    useEffect(() => {
        fetchStories();
    }, [id]);

    const fetchStories = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/get-story/${id}`
            );
            setSelectedStory(res.data.story);
        } catch (error) {
            console.log(error);
        }
    };

    // reset per question
    useEffect(() => {
        setSelectedChoice(null);
        setIsCorrect(null);
        setWrongAnswers([]);
    }, [currentNumber]);

    const handleNextQuestion = () => {
        const next = currentNumber + 1;

        if (next >= questions.length) {
            setShowResult(true);
        } else {
            setCurrentNumber(next);
        }
    };

    return (
        <section className="bg-white min-h-screen w-full flex flex-col items-center gap-4">

            {showResult && <QuizResultModal points={points} />}

            {/* HEADER */}
            <div className="w-full h-20 border-b border-gray-200 flex justify-center items-center shadow-sm">
                <div className="min-w-5xl flex items-center justify-between w-full px-4">

                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Short Quiz Activity
                        </h1>
                        <p className="text-sm text-gray-500">
                            Answer the questions below
                        </p>
                    </div>

                   <div
                    className={`px-4 py-2 rounded-2xl font-bold ${
                        points >= 400
                        ? "bg-green-600 text-white"
                        : points >= 250
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-gray-100 text-gray-500"
                    }`}
                    >
                        XP Points: {points}
                    </div>

                </div>
            </div>

            {/* QUIZ */}
            {isQuizActive && (
                <div className="space-y-4 bg-white p-4 rounded-2xl w-full flex flex-col items-center">

                    {/* QUESTION */}
                    <div className="w-full max-w-5xl">
                        <div className="bg-white rounded-3xl border shadow-xl px-6 py-10 text-center">

                            <div className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-600 font-bold text-sm mb-6">
                                Question {currentNumber + 1}
                            </div>

                            <h1 className="text-2xl font-bold text-gray-800">
                                {currentQuestion?.question}
                            </h1>

                        </div>
                    </div>

                    {/* ANSWERS */}
                    <div className="w-full max-w-5xl flex flex-col gap-2">

                        {currentQuestion?.choices.map((choice, index) => {

                            const isWrong = wrongAnswers.includes(choice);

                            return (
                                <button
                                    disabled={isWrong}
                                    key={index}
                                    onClick={() => {
                                        const correct =
                                            choice === currentQuestion.answer;

                                        setSelectedChoice(choice);
                                        setIsCorrect(correct);

                                        if (!correct) {
                                            setWrongAnswers((prev) => [...prev, choice,]);
                                            setPoints((prev) => prev - 25);
                                            return;
                                        }

                                        setPoints((prev) => prev + 100);

                                        setTimeout(() => {
                                            handleNextQuestion();
                                        }, 400);
                                    }}
                                    className={`p-4 w-full border rounded-xl font-bold transition-all duration-300
                                        ${
                                            selectedChoice === choice
                                                ? isCorrect
                                                    ? "bg-green-100 border-green-500 text-green-600"
                                                    : "bg-red-100 border-red-500 text-red-600"
                                                : isWrong
                                                ? "bg-red-50 border-red-300 text-red-500 "
                                                : "border-gray-300 text-gray-500 hover:bg-blue-100"
                                        }
                                    `}
                                >
                                    {choice}
                                </button>
                            );
                        })}

                    </div>
                </div>
            )}
        </section>
    );
};

export default Lib_Quiz;