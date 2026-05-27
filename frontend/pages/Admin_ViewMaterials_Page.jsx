import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import Edit_Question_Modal from "../modals/Edit_Question_Modal";

const Admin_ViewMaterials_Page = () => {
  const { storyId } = useParams();
  const [story, setStory] = useState(null);

  const navigate = useNavigate();

  const [isStoryDetails, setIsStoryDetails] = useState(true);
  const [isStoryContext, setIsStoryContext] = useState(false);
  const [isQuestionnaire, setIsQuestionnaire] = useState(false);

  const [showEditQuestionModal, setShowEditQuestionModal] = useState(false);
  const [selectedQuestionToEdit, setSelectedQuestionToEdit] = useState(null);

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

  const handleEditQuestion = (question) => {
    console.log(question);
    setSelectedQuestionToEdit(question);
    setShowEditQuestionModal(true);
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
    <section className="bg-white min-h-screen w-full justify-start items-center flex flex-col pb-10">
      {showEditQuestionModal && (<Edit_Question_Modal storyId={storyId} question={selectedQuestionToEdit} reFetch={() => fetchSingleStory()} onClose={() => setShowEditQuestionModal(false)} />)}
    
    <header className="fixed top-0 z-50 h-20 w-full justify-start items-center flex px-10 bg-white shadow-md">
        <div>
        <h1 className="text-2xl font-bold text-pink-500 cursor-pointer" onClick={() => navigate("/admin")}>
          Little Me Admin
        </h1>
        <p className="text-sm text-gray-400">
          Learning Center Dashboard
        </p>
      </div>
    </header>

    <div className="mt-25 w-5xl border-b-2 border-gray-300 py-2 space-x-2 mb-4">
        <button className={`${isStoryDetails ? 'bg-gray-300 text-white border-none' : 'bg-white'} h-full w-fit p-2 font-semibold text-gray-800 rounded-2xl border-1 border-gray-300 cursor-pointer`} onClick={handleStoryDetails}>Story Details</button>
        <button className={`${isStoryContext ? 'bg-gray-300 text-white border-none' : 'bg-white'} h-full w-fit p-2 font-semibold text-gray-800 rounded-2xl border-1 border-gray-300 cursor-pointer`} onClick={handleStoryContext}>Story Context</button>
        <button className={`${isQuestionnaire ? 'bg-gray-300 text-white border-none' : 'bg-white'} h-full w-fit p-2 font-semibold text-gray-800 rounded-2xl border-1 border-gray-300 cursor-pointer`} onClick={handleQuestionnaire}>Questionnaire</button>
    </div>
    
    {isStoryDetails && (
  <div className="w-full max-w-5xl bg-white overflow-hidden">
    
    <div className="w-full h-[300px] bg-gray-100">
      <img
        src={story?.image}
        alt={story?.title}
        className="w-full h-full object-cover rounded-2xl"
      />
    </div>

    <div className="p-8 space-y-6">
      
      <div>
        <h1 className="text-4xl font-bold text-gray-800">
          {story?.title}
        </h1>

        <p className="text-lg text-gray-500 mt-2">
          By {story?.author}
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
          {story?.genre}
        </span>

        <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
          {story?.gradeCategory}
        </span>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Description
        </h2>

        <p className="text-gray-600 leading-relaxed">
          {story?.description}
        </p>
      </div>

      {/* Story ID */}
      <div className="pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-400">
          Story ID: {story?.id}
        </p>
      </div>

    </div>
  </div>
)}
    {isStoryContext && (
        <div className="p-10 w-5xl">
            <h2 className="text-2xl font-bold text-gray-800 whitespace-pre-line">{story?.fullStory}</h2>
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
               <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 cursor-pointer mt-4" onClick={() => handleEditQuestion(q)}>
                 Edit This Question
               </button>
             </div>
                
            ))}
        </div>
    )}

    </section>
      )
}
export default Admin_ViewMaterials_Page;