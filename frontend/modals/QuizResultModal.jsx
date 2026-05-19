import { useNavigate } from "react-router-dom";

const QuizResultModal = ({ points }) => {
    const navigate = useNavigate();
    return (
        <section className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-4">
            
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-10 flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-300">

                {/* Trophy Icon */}
                <div className="h-24 w-24 rounded-full bg-yellow-100 flex justify-center items-center text-5xl shadow-inner">
                    🏆
                </div>

                {/* Title */}
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-gray-800">
                        Congratulations!
                    </h1>

                    <p className="text-gray-500 mt-2 text-lg">
                        You completed the quiz successfully.
                    </p>
                </div>

                {/* Score Card */}
                <div className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-center shadow-lg">
                    <h2 className="text-white text-lg font-medium">
                        Your Score
                    </h2>

                    <h1 className="text-white text-6xl font-extrabold mt-2">
                        {points}
                    </h1>
                </div>

                {/* Performance Message */}
                <div className="text-center">
                    {points === 50 ? (
                        <p className="text-green-500 font-semibold text-lg">
                            Perfect score! Amazing work 🎉
                        </p>
                    ) : points >= 30 ? (
                        <p className="text-blue-500 font-semibold text-lg">
                            Great job! Keep improving 🚀
                        </p>
                    ) : (
                        <p className="text-red-500 font-semibold text-lg">
                            Nice try! Practice makes perfect 💪
                        </p>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex gap-4 w-full mt-4">
                    <button className="flex-1 py-3 rounded-2xl bg-gray-200 hover:bg-gray-300 transition font-semibold text-gray-700 cursor-pointer">
                        Retry Quiz
                    </button>

                    <button className="flex-1 py-3 rounded-2xl bg-blue-500 hover:bg-blue-600 transition font-semibold text-white cursor-pointer" onClick={() => navigate('/library')}>
                        Back to Library
                    </button>
                </div>

            </div>
        </section>
    );
};

export default QuizResultModal;