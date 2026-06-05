import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { useRef } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import defaultProfile from '../src/assets/Student.jpg';
import Analytics_Card from "../components/Analytics_Card";
import Lib_Navigation from "../library_components/Lib_Navigation";
import PieChart from "../charts/PieChart";
import LineChart from "../charts/LineChart";

const Profile_Page = () => {
    const user = useAuthStore((state) => state.user);
    const navigate = useNavigate();

    const [stories, setStories] = useState([])
    const [quizResult, setQuizResult] = useState([]);

    const inputAvatarFile = useRef(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const totalTakenQuiz = quizResult.filter(quiz => quiz.userId === user.id).length;
    const totalScore = quizResult.filter(quiz => quiz.userId === user.id).reduce((sum, quiz) => sum + quiz.score, 0);
    const totalQuestion = quizResult.filter(quiz => quiz.userId === user.id).reduce((sum, quiz) => sum + quiz.totalQuestions, 0);
    const totalScorePercentage = (totalScore / totalQuestion) * 100 || 0;
    const totalMissedPercentage = quizResult.filter(quiz => quiz.userId === user.id && quiz.score < 3).length / totalTakenQuiz * 100 || 0;
    const totalAverageScore = totalScore / totalTakenQuiz || 0;
    const totalPassedQuizzes = quizResult.filter(quiz => quiz.userId === user.id && quiz.score >= 3).length;
    const totalFailedQuizzes = quizResult.filter(quiz => quiz.userId === user.id && quiz.score < 3).length;

    // For Line Chart
    const arrScore  = quizResult.filter(quiz => quiz.userId === user.id).map(quiz => quiz.score);
    const arrQuizzesTaken = quizResult.filter(quiz => quiz.userId === user.id).map(quiz => quiz.storyId);

    useEffect(() => {
        fetchStories();
        fetchQuizResults();
    }, [])

    const fetchStories = async () =>{
              try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-stories`);
                    setStories(res.data.stories);
                    console.log(res.data.message);
              } catch (error) {
                console.log(error)
              }
        }
    
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

    const AvatarChange = async () => {
    try {
        const formData = new FormData();
        formData.append("avatar", avatarFile);
        formData.append("userId", user.id);
        formData.append("role", user.role);

        const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/set-avatar`,
            formData
        );

        // update UI instantly (Zustand)
        useAuthStore.getState().setUser(res.data.user);

            } catch (error) {
                console.log(error);
            }
        };
    const openFileExplorer = (e) => {
        const selected = e.target.files[0];
        if (!selected) return;

        setAvatarFile(selected);

        // preview image
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(selected);
        
    }

    const library_progress = (totalTakenQuiz / stories.length) * 100;

    return(
        <section className="bg-white min-h-screen w-full justify-start items-start flex flex-col p-4">
            <Lib_Navigation />
        <div className="bg-white min-h-screen shadow-2xl w-full justify-start items-start flex flex-col rounded-2xl px-10">
        {/* Profile Container */}
        <div className="w-full justify-between items-start flex border-b-1 border-gray-300 gap-4 py-6 mt-10">
                    
                    <div className="h-full max-w-100 justify-start items-start flex gap-6">
                        <img src={user?.avatar || defaultProfile} className="h-50 w-50 object-cover rounded-full bg-gray-300"/>
                        <div className="w-full justify-start items-start flex flex-col">
                            <h1 className="text-2xl text-gray-800 font-bold">{user?.role   } {user?.firstname} {user?.lastname}</h1>
                            <h1 className="text-base text-gray-500 font-bold">{user?.username} • {user?.gradeLevel} • {user?.branch}</h1>
                        </div>
                    </div>

                    <div className="h-full justify-center items-center flex gap-2 bg-white border-2 border-gray-300 text-gray-500 hover:bg-blue-500 hover:border-none transition-all duration-300 hover:text-white py-2 px-4 rounded-lg cursor-pointer" onClick={() => inputAvatarFile.current.click()}>
                        <input ref={inputAvatarFile} type="file" className="hidden" onChange={openFileExplorer}/>
                        Change Avatar 
                    </div>
                    <button className={`${preview ? "" : "hidden"} bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded-lg cursor-pointer transition-all duration-300`} onClick={AvatarChange}>
                    Save Avatar
                    </button>
        </div>

        <div className="w-full justify-between items-start flex gap-4 py-6">
            {/* Left Container */}
            <div className="w-3/4 justify-start items-start flex flex-col gap-6 my-10">
                    
                 
                        <h1 className="text-xl text-gray-800 font-bold">Student Analytics</h1>
                        <div className="w-full justify-start items-start flex flex-col gap-6">

                            {/*Progress Bar */}
                            <div className="w-full justify-start items-start flex flex-col gap-2">
                                <h1 className="text-lg text-gray-500 font-bold">Library Progress / {`${library_progress}% Completed`}</h1>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div className="bg-black h-2.5 rounded-full" style={{ width: `${library_progress}%` }}></div>
                                </div> 
                            </div>
                            {/* Analytics Cards */}
                            <div className="h-100 w-full grid grid-cols-4 justify-between items-center gap-4">
                                <Analytics_Card title={"Completed Stories"} value={`0 / ${stories.length}`} subTitle={"Stories completed"}/>
                                <Analytics_Card title={"Total Taken Quiz"} value={`${totalTakenQuiz} / ${stories.length}`} subTitle={"Quizzes taken"}/>
                                <Analytics_Card title={"Total Score %"} value={`${totalScorePercentage}%`} subTitle={"Overall performance"}/>
                                <Analytics_Card title={"Average Quiz Score"} value={`${totalAverageScore}`} subTitle={"Average score"}/>
                                <Analytics_Card title={"Total Missed %"} value={`${totalMissedPercentage}%`} subTitle={"% of missed questions"}/>
                                <Analytics_Card title={"Passed Quizzes"} value={`${totalPassedQuizzes}`} subTitle={"No. of quizzes passed"}/>
                                <Analytics_Card title={"Failed Quizzes"} value={`${totalFailedQuizzes}`} subTitle={"No. of quizzes failed"}/>
                            </div>

                            {/* Performance Tab */}
                            <div className="h-100 w-full justify-start items-start flex flex-col gap-4">
                                <h1 className="text-xl text-gray-800 font-bold">Student Performance Tab</h1>
                                {quizResult.filter(quiz => quiz.userId === user.id).map((quiz, index) => (
                                    <div key={quiz.storyId} className={`${quiz.score >= 4 ? "border-green-500 bg-green-100" : "border-gray-200 bg-gray-200"} border-2 w-full justify-between items-center flex shadow-md rounded-xl p-4 border-2`}>
                                        <h1 className={`text-lg ${quiz.score >= 4 ? "text-green-500" : "text-gray-500"} font-bold`}>{`${quiz.title || "No Title"}`}</h1>
                                        <p className="text-sm text-gray-400">{`Score: ${quiz.score} / ${quiz.totalQuestions} (${((quiz.score / quiz.totalQuestions) * 100).toFixed(2)}%)`}</p>        
                                    </div>
                                ))}
                            </div>

                            <div className="w-full h-full bg-gray h-20 justify-start items-start flex flex-col">
                                <h1 className="text-xl text-gray-800 font-bold">Scores Progression Graph</h1>
                               <LineChart scores={arrScore} category={arrQuizzesTaken}/>    
                            </div>
                        
                    </div>
            </div>

            {/* Right Container */}
            <div className="w-1/4 h-full bg-gray h-20 justify-start items-start flex flex-col gap-6 my-10">
                    <h1 className="text-xl text-gray-800 font-bold">Pie Charts</h1>
                    <PieChart title={"Overall Quiz Performance"}
                              value1={totalScorePercentage}
                              value2={totalMissedPercentage}
                              sub1={"Total % of Score Answers"}
                              sub2={"Total % of Missed Answers"}
                    />
                    <PieChart title={"Overall Completed Quiz"}
                              value1={totalTakenQuiz}
                              value2={stories.length}
                              sub1={"Completed"}
                              sub2={"Remaining"}
                    />
                    
            </div>
        </div>
        
                    
              
                

            </div>
        </section>
    )
} 
export default Profile_Page;