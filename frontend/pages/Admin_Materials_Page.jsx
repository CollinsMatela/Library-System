import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import SearchIcon from '../src/assets/search-svgrepo-com.svg'
import Admin_Sidebar from '../components/Admin_Sidebar'

const Admin_Materials_Page = () => {
    const navigate = useNavigate();
    
    const [stories, setStories] = useState([]);
    const [search, setSearch] = useState("");

    const filteredStories = stories.filter((story) => story.title.toLowerCase().includes(search.toLowerCase()));

    useEffect(() => {
       fetchStories();
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

    const handleViewStories = (storyId) => {
          if(!storyId) return;
          navigate(`/admin/materials/${storyId}`);
    }

      return(
        <>
        <Admin_Sidebar/>
        <section className="bg-white min-h-screen w-full justify-start items-start flex flex-col py-10 pl-90 pr-10">
              
              <header className="w-full justify-between items-start flex flex-col mb-10">

                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Materials Management</h1>
                    <h1 className="text-gray-400 text-md">View all uploaded materials available</h1>
                </div>
                
              </header>

              <div className="h-20 w-full justify-between items-center flex rounded-t-xl">
                        <div>
                          <h1 className="text-lg font-bold text-gray-500 rounded-full">Uploaded Stories Table</h1>
                          <p className="text-gray-400 text-sm">Manage stories material.</p>
                        </div>
                        

                        <div className="space-x-2 justify-center ittems-center flex">
                            <input type="search" 
                                   placeholder="Search by name, grade, or branch" 
                                   className="bg-white border-1 border-gray-300 h-10 w-80 rounded-xl px-4 outline-none"
                                   value={search}
                                   onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
              </div> 
              

              <div className="bg-white w-full grid grid-cols-1">
                  {filteredStories.length === 0 && (
                    <div className="bg-gray-100 h-20 w-full rounded-2xl justify-center items-center flex mt-4">
                      <h1>No stories uploaded</h1>
                    </div>
                  )}
                  {filteredStories.length > 0 && (
                    filteredStories.map((story) => (
                      <div key={story.id} className="bg-white h-30 w-full rounded-2xl justify-between items-center flex border border-gray-300 transistion-all duration-300 ease-in-out cursor-pointer hover:-translate-1 hover:bg-blue-100 hover:border-none mb-2 gap-4"
                      onClick={() => handleViewStories(story.id)}
                      >
                      
                      <div className="h-full flex gap-2">
                          <img src={story?.image} className="object-cover h-full w-100 rounded-l-2xl" />
                          <div className="h-full flex flex-col p-2">
                              <h1 className="text-gray-800 font-bold text-lg">{story?.title}</h1>
                              <h1 className="text-gray-500 font-bold text-sm">{story?.author}</h1>
                              <div className="flex gap-2">
                                <h1 className="bg-pink-200 px-2 text-pink-500 font-semibold rounded-lg">{story?.genre}</h1>
                                <h1 className="bg-pink-200 px-2 text-pink-500 font-semibold rounded-lg">{story?.gradeCategory}</h1>
                              </div>
                          </div>
                      </div>

                      <div className="h-full flex items-center justify-center mr-2 p-4">
                          <h1 className="text-gray-300 font-bold cursor-pointer">⟶</h1>
                      </div>
                      


                    </div>
                    ))
                  )}
              </div>
        </section>
        </>
      )
}
export default Admin_Materials_Page;