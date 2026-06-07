import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Lib_Navigation from "./Lib_Navigation";
import axios from "axios";
import useAuthStore from "../store/useAuthStore";
import { BookOpenText, Sparkles, CheckCheck } from "lucide-react";

const Lib_View_Story = () => {

    const user = useAuthStore((state) => state.user); 

    const {id} = useParams();
    const [selectedStory, setSelectedStory] = useState("")

    const [markedAsRead, setMarkAsRead] = useState(false);

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
        fetchMarkAsRead();
        
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

    const fetchMarkAsRead = async () => {
          
          try{
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/fetch-mark-as-read?userId=${user?.id}&storyId=${id}`);
            console.log(res.data.message);
            setMarkAsRead(res.data.isRead);
          } catch (error) {
            console.log(error);
            alert(error.response?.data?.message);
          }
    }

    const MarkAsRead = async () => {
          try{
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/mark-as-read`, {
                  userId: user.id,
                  storyId: id
            })
            fetchMarkAsRead();
            console.log(res.data.message);
          } catch (error) {
            console.log(error);
          }
    }

    return(
    <section className="min-h-screen w-full bg-black/80 flex flex-col items-center p-4">

    <Lib_Navigation />

    <div className="w-full bg-black rounded-b-2xl overflow-hidden">

        {/* Cover Image */}
        <div className="relative h-[450px] w-full">
            <img
                src={selectedStory.image}
                alt={selectedStory.title}
                className="w-full h-full object-cover rounded-b-2xl"
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
                    <div className="space-x-2 flex">
                        <button onClick={handleFullStory} className="bg-pink-500 justify-center items-center flex gap-2 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-xl transition-all cursor-pointer shadow-lg">
                        <BookOpenText/> Full Story
                        </button>
                        <button onClick={handleSummary} className="bg-pink-500 justify-center items-center flex gap-2 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-xl transition-all cursor-pointer shadow-lg">
                        <BookOpenText/> Summary Story
                        </button>
                        <button onClick={() => alert('Coming Soon!')} className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 justify-center items-center flex gap-2 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-xl transition-all cursor-pointer shadow-lg">
                        <Sparkles/> AI Video
                        </button>
                        <button onClick={isQuizTaken ? null : TakeQuiz} className={`${isQuizTaken ? 'opacity-50 bg-green-500' : 'cursor-pointer bg-pink-500 hover:bg-pink-600'} justify-center items-center flex gap-2 text-white font-semibold px-6 py-3 rounded-full transition-all shadow-lg`}>
                        {isQuizTaken ?  <CheckCheck/> : null}
                         {isQuizTaken ? `Quiz Taken` : 'Take Quiz'}
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
                <p className="text-white leading-loose whitespace-pre-line text-4xl">
                    {isFullStory ? selectedStory.fullStory : null}
                    {isSummary ? selectedStory.summaryStory : null}
                </p>
            </div>

            <div className="w-full flex justify-end">
                <button className={`${markedAsRead ? "bg-transparent text-green-500" : "bg-green-500 text-white hover:bg-green-600 cursor-pointer"} flex items-center gap-2 px-6 py-3 font-medium rounded-full transition-all duration-200`}
                         onClick={MarkAsRead}
                         disabled={markedAsRead}
                >
                    <span></span>
                    {markedAsRead ? <CheckCheck/> : null}
                    <span>{markedAsRead ? "Already taken" : "Mark as Read"}</span>
                </button>
            </div>

        </div>

    </div>

</section>
    )
}
export default Lib_View_Story;