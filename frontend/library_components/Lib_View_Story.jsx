import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Lib_Navigation from "./Lib_Navigation";
import axios from "axios";
import useAuthStore from "../store/useAuthStore";

const Lib_View_Story = () => {

    const user = useAuthStore((state) => state.user); 

    const {id} = useParams();
    const [selectedStory, setSelectedStory] = useState("")

    const [isFullStory, setIsFullStory] = useState(true);
    const [isSummary, setIsSummary] = useState(false);

    const [quizResult, setQuizResult] = useState([]);
    const isQuizTaken = quizResult.find(quiz => quiz.storyId === id && quiz.userId === user.id);

    const handleFullStory = () => {
         setIsFullStory(true);
         setIsSummary(false);
    }

    const handleSummary = () => {
         setIsFullStory(false);
         setIsSummary(true);
    }

    const navigate = useNavigate();

    useEffect(() => {
        fetchStories();
        fetchQuizResults();
        
    },[id])

    const fetchQuizResults = async () => {
          try{
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-quiz-results`);
            setQuizResult(res.data.results);
            console.log(res.data.message);
            console.log(res.data.total);
          } catch (error) {
            console.log(error);
          }
          
    }

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
    const TakeQuiz = () => {
          navigate(`/library/view-story/quiz/${id}`);
    }

    return(
    <section className="min-h-screen w-full bg-white flex flex-col items-center p-4">

    <Lib_Navigation />

    <div className="w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-lg mt-6 mb-10">

        {/* Cover Image */}
        <div className="relative h-[450px] w-full">
            <img
                src={selectedStory.image}
                alt={selectedStory.title}
                className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 flex items-end">
                <div className="w-full p-8 md:p-12 flex justify-between items-end flex-wrap gap-4">

                    {/* Story Info */}
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold text-white mb-3">
                            {selectedStory.title}
                        </h1>

                        <div className="flex flex-wrap gap-3 text-white/90 text-sm">
                            <span>By {selectedStory.author}</span>
                            <span>• {selectedStory.genre}</span>
                            <span>• {selectedStory.gradeCategory}</span>
                        </div>

                        {/* Quiz Button */}
                    <div className="space-x-2">
                        <button onClick={handleFullStory} className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-xl transition-all cursor-pointer shadow-lg">
                        Full Story
                        </button>
                        <button onClick={handleSummary} className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-xl transition-all cursor-pointer shadow-lg">
                        Summary Story
                        </button>
                        <button onClick={isQuizTaken ? null : TakeQuiz} className={`${isQuizTaken ? 'opacity-50 bg-green-500' : 'cursor-pointer bg-pink-500 hover:bg-pink-600'} text-white font-semibold px-6 py-3 rounded-full transition-all shadow-lg`}>
                        {isQuizTaken ? '✓ Quiz Taken' : 'Take Quiz'}
                        </button>
                    </div>
                    
                    </div>

                </div>
            </div>
        </div>

        {/* Story Content */}
        <div className="max-w-4xl mx-auto p-8 md:p-12">

            {/* Description */}
            <p className="text-lg italic text-gray-500 mb-8 border-l-4 border-pink-500 pl-4">
                {selectedStory.description}
            </p>

            <div className="border-t border-gray-200 mb-8"></div>

            {/* Story */}
            <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-loose whitespace-pre-line text-lg">
                    {isFullStory ? selectedStory.fullStory : null}
                    {isSummary ? selectedStory.summaryStory : null}
                </p>
            </div>

        </div>

    </div>

</section>
    )
}
export default Lib_View_Story;