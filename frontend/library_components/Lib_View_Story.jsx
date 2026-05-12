import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Lib_View_Story = () => {

    const {id} = useParams();
    const [selectedStory, setSelectedStory] = useState("")

    const navigate = useNavigate();

    useEffect(() => {
        fetchStories();
    },[id])

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
       <section className="w-full bg-white py-10 px-4 flex justify-center items-center flex flex-col">

        <nav className="bg-white h-20 w-4xl mb-6 border-b-1 border-gray-300 p-2 justify-between items-center flex">
             <h1 className="text-2xl font-bold text-gray-800">View Story</h1>
             <h1 className="text-base text-blue-500 font-bold cursor-pointer" onClick={() => navigate(-1)}>⟵ Back</h1>
        </nav>

        <div className="w-full max-w-4xl bg-white rounded-2xl overflow-hidden">
            {/* Image */}
            <div className="w-full h-[300px] overflow-hidden">
            <img 
                src={selectedStory.image} 
                alt={selectedStory.title}
                className="w-full h-full object-cover"
            />
            </div>

            {/* Content */}
            <div className="p-6 md:p-10 flex flex-col gap-4">
            
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                {selectedStory.title}
            </h1>

            {/* Author + Genre */}
            <div className="text-sm text-gray-500 flex gap-3 flex-wrap">
                <span>By {selectedStory.author}</span>
                <span>• {selectedStory.genre}</span>
                <span>• {selectedStory.gradeCategory}</span>
            </div>

            {/* Description */}
            <p className="text-gray-600 italic">
                {selectedStory.description}
            </p>

            {/* Divider */}
            <div className="border-t my-4"></div>

            {/* Story Text */}
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {selectedStory.fullStory}
            </p>
        </div>
        <div className="w-4xl justify-end items-center flex">
                <button className="bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 cursor-pointer p-4"
                        onClick={TakeQuiz}>
                Start take the quiz</button>
            </div>
        </div>

</section>
    )
}
export default Lib_View_Story;