import { useState } from "react";
import axios from "axios";
import Confirmation_Popup from "../popup/Confirmation_Popup";
const Edit_Question_Modal = ({ question, onClose }) => {

    const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

    const [newQuestion, setNewQuestion] = useState("");
    const [newChoice1, setNewChoice1] = useState("");
    const [newChoice2, setNewChoice2] = useState("");
    const [newChoice3, setNewChoice3] = useState("");
    const [newChoice4, setNewChoice4] = useState("");
    const [newCorrectAnswer, setNewCorrectAnswer] = useState("");

    const [isNewQuestion, setIsNewQuestion] = useState(false);
    const [isNewChoice1, setIsNewChoice1] = useState(false);
    const [isNewChoice2, setIsNewChoice2] = useState(false);
    const [isNewChoice3, setIsNewChoice3] = useState(false);
    const [isNewChoice4, setIsNewChoice4] = useState(false);
    const [isNewCorrectAnswer, setIsNewCorrectAnswer] = useState(false);

  return (
    <section className="fixed inset-0 bg-black/50 flex items-center justify-center z-100 p-4">

    {showConfirmationPopup && <Confirmation_Popup onConfirm={() => {}} onCancel={() => setShowConfirmationPopup(false)} />}

      <div
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden"
      >
        
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
              <option value="A">Choice A</option>
              <option value="B">Choice B</option>
              <option value="C">Choice C</option>
              <option value="D">Choice D</option>
            </select>
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

          <button className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition" onClick={() => setShowConfirmationPopup(true)}>
            Save Changes
          </button>
        </div>
      </div>
    </section>
  );
};

export default Edit_Question_Modal;