import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import QuizResultModal from "../modals/QuizResultModal";
import useAuthStore from "../store/useAuthStore";

const Lib_Quiz = () => {
    const { id } = useParams();

    // USER
    const user = useAuthStore((state) => state.user);

    // STATES
    const [selectedStory, setSelectedStory] = useState(null);
    const [currentNumber, setCurrentNumber] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const [selectedChoice, setSelectedChoice] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    // STORE ALL ANSWERS
    const [answers, setAnswers] = useState([]);

    // DATA
    const questions = selectedStory?.questionnaire;
    const currentQuestion = questions?.[currentNumber];
    const isQuizActive = questions && currentNumber < questions.length;

    // FETCH STORY
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

    // NEXT QUESTION
    const handleNextQuestion = (finalScore) => {
        const next = currentNumber + 1;

        // RESET CHOICE UI
        setSelectedChoice(null);
        setIsCorrect(null);

        if (next >= questions.length) {
            setShowResult(true);
            submitQuizResult(finalScore);
        } else {
            setCurrentNumber(next);
        }
    };

    // SUBMIT QUIZ RESULT
    const submitQuizResult = async (finalScore) => {
        try {
            const result = {
                userId: user?.id,
                storyId: selectedStory?.id,
                title: selectedStory?.title,
                score: finalScore,
                totalQuestions: questions.length,
                answeredQuestions: answers,
            };

            console.log(result);

            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/quiz-result`,
                result
            );

            console.log("Quiz result submitted:", res.data.message);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className="bg-black min-h-screen w-full justify-center flex flex-col items-center">

            {/* RESULT MODAL */}
            {showResult && <QuizResultModal score={score} />}

            {/* HEADER */}
            <div className="w-5xl flex justify-center items-center">
                <div className="min-w-5xl flex items-center justify-between w-full px-4">

                    <div>
                        <h1 className="text-2xl font-bold text-white">
                            Short Quiz Activity
                        </h1>

                        <p className="text-sm text-white">
                            Answer the questions below
                        </p>
                    </div>

                    <div
                        className={`px-4 py-2 rounded-2xl font-bold ${
                            score >= 4
                                ? "bg-green-600 text-white"
                                : score >= 3
                                ? "bg-yellow-200 text-yellow-800"
                                : "bg-gray-100 text-gray-500"
                        }`}
                    >
                        Score Points: {score}
                    </div>

                </div>
            </div>

            {/* QUIZ */}
            {isQuizActive && (
                <div className="space-y-4 bg-black p-4 w-full flex flex-col items-center">

                    {/* QUESTION */}
                    <div className="w-full max-w-5xl">

                        <div className="bg-pink-500 rounded-3xl shadow-xl px-6 py-10 text-center">

                            <div className="inline-block px-4 py-2 rounded-full bg-pink-100 text-pink-500 font-bold text-sm mb-6">
                                Question {currentNumber + 1}
                            </div>

                            <h1 className="text-2xl font-bold text-white">
                                {currentQuestion?.question}
                            </h1>

                        </div>

                    </div>

                    {/* ANSWERS */}
                    <div className="w-full max-w-5xl flex flex-col gap-2">

                        {currentQuestion?.choices.map((choice, index) => {

                            return (
                                <button
                                    key={index}
                                    onClick={() => {

                                        // CHECK IF CORRECT
                                        const correct =
                                            choice === currentQuestion.answer;

                                        // SAVE CHOICE UI
                                        setSelectedChoice(choice);
                                        setIsCorrect(correct);

                                        // COMPUTE UPDATED SCORE
                                        const updatedScore = correct
                                            ? score + 1
                                            : score;

                                        // UPDATE SCORE STATE
                                        if (correct) {
                                            setScore(updatedScore);
                                        }

                                        // STORE ANSWER
                                        const answerData = {
                                            questionId:
                                                currentQuestion.questionId,
                                            selectedChoice: choice,
                                            isCorrect: correct,
                                        };

                                        setAnswers((prev) => [
                                            ...prev,
                                            answerData,
                                        ]);

                                        // NEXT QUESTION
                                        setTimeout(() => {
                                            handleNextQuestion(updatedScore);
                                        }, 400);
                                    }}
                                    className={`p-4 w-full border rounded-xl font-bold transition-all duration-300
                                        ${
                                            selectedChoice === choice
                                                ? isCorrect
                                                    ? "bg-green-100 border-green-500 text-green-600"
                                                    : "bg-red-100 border-red-500 text-red-600"
                                                : "border-white text-gray-500 hover:bg-white/50 hover:text-white cursor-pointer"
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