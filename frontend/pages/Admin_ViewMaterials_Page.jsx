import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

const Admin_ViewMaterials_Page = () => {
  const { storyId } = useParams();
  const [story, setStory] = useState(null);

  const [isStoryDetails, setIsStoryDetails] = useState(true);
  const [isStoryContext, setIsStoryContext] = useState(false);
  const [isQuestionnaire, setIsQuestionnaire] = useState(false);

  const handleStoryDetails = () => {
    setIsStoryDetails(true);
    setIsStoryContext(false);
    setIsQuestionnaire(false);
  }

  const handleStoryContext = () => {
    setIsStoryDetails(false);
    setIsStoryContext(true);
    setIsQuestionnaire(false);
  }

  const handleQuestionnaire = () => {
    setIsStoryDetails(false);
    setIsStoryContext(false);
    setIsQuestionnaire(true);
  }

  useEffect(() => {
      fetchSingleStory();
  }, [])

  const fetchSingleStory = async () => {
        try{
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-story/${storyId}`);
            setStory(res.data.story);
            console.log(res.data.message);
        } catch(error){
            console.error("Error fetching single story:", error);
        }
  }

  return(
    <section className="bg-white min-h-screen w-full justify-start items-center flex flex-col">
    
    <header className="fixed top-0 z-50 h-20 w-full border-b-2 justify-start items-center flex px-10 bg-white">
        <h1 className="text-xl font-bold text-gray-800">Materials</h1>
    </header>

    <div className="mt-25 w-5xl border-b-2 border-gray-300 py-2 space-x-2">
        <button className={`${isStoryDetails ? 'bg-blue-500 text-white border-none' : 'bg-white'} h-full w-fit p-2 font-semibold text-gray-800 rounded-2xl border-1 border-gray-300 cursor-pointer`} onClick={handleStoryDetails}>Story Details</button>
        <button className={`${isStoryContext ? 'bg-blue-500 text-white border-none' : 'bg-white'} h-full w-fit p-2 font-semibold text-gray-800 rounded-2xl border-1 border-gray-300 cursor-pointer`} onClick={handleStoryContext}>Story Context</button>
        <button className={`${isQuestionnaire ? 'bg-blue-500 text-white border-none' : 'bg-white'} h-full w-fit p-2 font-semibold text-gray-800 rounded-2xl border-1 border-gray-300 cursor-pointer`} onClick={handleQuestionnaire}>Questionnaire</button>
    </div>
    
    {isStoryDetails && (
        <div className="p-10 bg-green-500 w-5xl">
            <h2 className="text-2xl font-bold text-gray-800">Story Details</h2>
            <p className="text-gray-600">{story?.details}</p>
        </div>
    )}
    {isStoryContext && (
        <div className="p-10 w-5xl">
            <h2 className="text-2xl font-bold text-gray-800">{story?.fullStory}</h2>
            <p className="text-gray-600">{story?.context}</p>
        </div>
    )}
    {isQuestionnaire && (
        <div className="w-5xl">
           {story?.questionnaire.map((q, index) => (
             <div key={q.questionId} className="mt-5 mb-5 border border-gray-300 p-5 rounded-2xl">
               <p className="text-gray-600">Question: {q.question}</p>
               <p className="text-gray-600">Choices: {q.choices.map((choice, idx) => (
                 <span key={idx} className="inline-block mr-2 bg-gray-200 px-2 py-1 rounded">
                   {choice}
                 </span>
               ))}</p>
               <p className="text-gray-600">Correct Answer: {q.answer}</p>
             </div>
                
            ))}
        </div>
    )}

    </section>
      )
}
export default Admin_ViewMaterials_Page;