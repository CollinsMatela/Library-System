import { useState, useEffect } from "react";
import axios from "axios";
import Confirmation_Popup from "../popup/Confirmation_Popup";
const Edit_Question_Modal = ({ storyId, question, reFetch, onClose }) => {

  useEffect(() => {
      console.log(question?.questionId);
  },[])

    const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

    const [newQuestion, setNewQuestion] = useState(question?.question || "");
    const [newChoice1, setNewChoice1] = useState(question?.choices[0] || "");
    const [newChoice2, setNewChoice2] = useState(question?.choices[1] || "");
    const [newChoice3, setNewChoice3] = useState(question?.choices[2] || "");
    const [newChoice4, setNewChoice4] = useState(question?.choices[3] || "");
    const [newCorrectAnswer, setNewCorrectAnswer] = useState(question?.answer || "");

    const [isNewQuestion, setIsNewQuestion] = useState(false);
    const [isNewChoice1, setIsNewChoice1] = useState(false);
    const [isNewChoice2, setIsNewChoice2] = useState(false);
    const [isNewChoice3, setIsNewChoice3] = useState(false);
    const [isNewChoice4, setIsNewChoice4] = useState(false);
    const [isNewCorrectAnswer, setIsNewCorrectAnswer] = useState(false);

    const showConfirmation = () => {
        if(!newQuestion) return setIsNewQuestion(true);
        if(!newChoice1) return setIsNewChoice1(true);
        if(!newChoice2) return setIsNewChoice2(true);
        if(!newChoice3) return setIsNewChoice3(true);
        if(!newChoice4) return setIsNewChoice4(true);
        if(!newCorrectAnswer) return setIsNewCorrectAnswer(true);

        setShowConfirmationPopup(true);
    }
    const updateQuestion = async () => {
      
        if(!newQuestion) return setIsNewQuestion(true);
        if(!newChoice1) return setIsNewChoice1(true);
        if(!newChoice2) return setIsNewChoice2(true);
        if(!newChoice3) return setIsNewChoice3(true);
        if(!newChoice4) return setIsNewChoice4(true);
        if(!newCorrectAnswer) return setIsNewCorrectAnswer(true);

        const updatedQuestion = {
          questionId: question.questionId,
          question: newQuestion,
          choices: [newChoice1, newChoice2, newChoice3, newChoice4],
          answer: newCorrectAnswer
        }

        try{
          const res = await axios.put(`${import.meta.env.VITE_API_URL}/update-question/${storyId}`, updatedQuestion);
          console.log(res.data.message);
          reFetch();
          onClose();
        } catch(error){
          console.error("Error updating question:", error);
        }
        
    }

  return (
    <section className="fixed inset-0 bg-black/50 flex items-center justify-center z-100 p-4">

    {showConfirmationPopup && <Confirmation_Popup onConfirm={() => {updateQuestion()}} onCancel={() => setShowConfirmationPopup(false)} />}

      <div className="bg-white max-h-full w-full max-w-2xl rounded-2xl shadow-2xl overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">
            Edit Question
          </h1>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">

          {/* Question */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Question
            </label>

            <input className={`${isNewQuestion ? 'border-red-500' : 'border-gray-300'} w-full p-4 border rounded-xl text-gray-800 outline-none`} 
                   placeholder="Enter question"
                   defaultValue={question?.question || ""}
                   onChange={(e) => {setNewQuestion(e.target.value);
                                     if(!e.target.value) setIsNewQuestion(true)
                                     else setIsNewQuestion(false);
                   }}/>
          </div>

          {/* Choices */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Choices
            </label>

            <div className="grid grid-cols-1 gap-3">
              <input className={`${isNewChoice1 ? 'border-red-500' : 'border-gray-300'} w-full p-4 border rounded-xl text-gray-800 outline-none`}  
                     placeholder="Enter choice 1"
                     defaultValue={question?.choices?.[0] || ""}
                     onChange={(e) =>{ setNewChoice1(e.target.value)
                                        if(!e.target.value) setIsNewChoice1(true)
                                        else setIsNewChoice1(false);
                     }} />
              <input className={`${isNewChoice2 ? 'border-red-500' : 'border-gray-300'} w-full p-4 border rounded-xl text-gray-800 outline-none`} 
                     placeholder="Enter choice 2"
                     defaultValue={question?.choices?.[1] || ""}
                     onChange={(e) => {setNewChoice2(e.target.value);
                                         if(!e.target.value) setIsNewChoice2(true)
                                         else setIsNewChoice2(false);
                     }} />
              <input className={`${isNewChoice3 ? 'border-red-500' : 'border-gray-300'} w-full p-4 border rounded-xl text-gray-800 outline-none`} 
                     placeholder="Enter choice 3"
                     defaultValue={question?.choices?.[2] || ""}
                     onChange={(e) => {setNewChoice3(e.target.value);
                                         if(!e.target.value) setIsNewChoice3(true)
                                         else setIsNewChoice3(false);
                     }} />
              <input className={`${isNewChoice4 ? 'border-red-500' : 'border-gray-300'} w-full p-4 border rounded-xl text-gray-800 outline-none`} 
                     placeholder="Enter choice 4"
                     defaultValue={question?.choices?.[3] || ""}
                     onChange={(e) => {setNewChoice4(e.target.value);
                                         if(!e.target.value) setIsNewChoice4(true)
                                         else setIsNewChoice4(false);
                     }} />
            </div>
          </div>

          {/* Correct Answer */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Correct Answer
            </label>

            <select className="p-4 rounded-xl bg-gray-100 border border-gray-400 text-gray-700 font-semibold"
                    defaultValue={question?.answer || ""}
                    onChange={(e) => setNewCorrectAnswer(e.target.value)}>
              <option value="">Select an option</option>
              <option value={question?.choices?.[0] || ""}>{question?.choices?.[0]}</option>
              <option value={question?.choices?.[1] || ""}>{question?.choices?.[1]}</option>
              <option value={question?.choices?.[2] || ""}>{question?.choices?.[2]}</option>
              <option value={question?.choices?.[3] || ""}>{question?.choices?.[3]}</option>
            </select>
          </div>

          <div className={`${isNewQuestion || isNewChoice1 || isNewChoice2 || isNewChoice3 || isNewChoice4 || isNewCorrectAnswer ? "block" : "hidden"} 
          w-full p-3 mb-3 rounded-lg bg-red-100 border border-red-400 text-red-700 text-sm`}>
            Fill all the empty fields before saving changes.
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition"
          >
            Close
          </button>

          <button className="px-5 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-medium transition" onClick={showConfirmation}>
            Save Changes
          </button>
        </div>
      </div>
    </section>
  );
};

export default Edit_Question_Modal;