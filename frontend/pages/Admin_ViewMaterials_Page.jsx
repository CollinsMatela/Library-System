import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

const Admin_ViewMaterials_Page = () => {
  const { storyId } = useParams();
  const [story, setStory] = useState(null);

  useEffect(() => {
      fetchSingleStory();
  })

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
         <header className="fixed h-20 w-full border-b-2 justify-start items-center flex px-10">
            <h1 className="text-xl font-bold text-gray-800">Materials</h1>
         </header>
        </section>
      )
}
export default Admin_ViewMaterials_Page;