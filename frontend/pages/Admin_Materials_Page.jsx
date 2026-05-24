import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import SearchIcon from '../src/assets/search-svgrepo-com.svg'

const Admin_Materials_Page = () => {
    const navigate = useNavigate();
    
    const [stories, setStories] = useState([]);
    const [search, setSearch] = useState("");

    const filteredStories = stories.filter((story) => story.title.toLowerCase().includes(search.toLowerCase()));

    useEffect(() => {
       fetchStories();
    }, [])

    const fetchStories = async () =>{
      // haha
          try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-stories`);
                setStories(res.data.stories);
                console.log(res.data.message);
          } catch (error) {
            console.log(error)
          }
    }

      return(
        <section className="bg-white min-h-screen w-full justify-start items-start flex flex-col p-20">
              
              <header className="w-full justify-between items-start flex">

                <div>
                    <h1 className="text-xl font-semibold text-gray-800">Materials</h1>
                    <h1 className="text-sm font-semibold text-gray-500">View all uploaded materials available <span className="underline text-blue-500 cursor-pointer" onClick={() => navigate(-1)}> return</span></h1>
                </div>
                    <div className="h-20 w-200 bg-gradient-to-br from-pink-100 via-blue-100 to-yellow-100 justify-center items-center flex border-2 border-gray-500 rounded-4xl outline-none p-2">
                                      <input type="text" 
                                             className="h-full w-full outline-none px-4 text-lg text-blue-500 font-bold inner-shadow-lg" 
                                             placeholder={`Search stories and explore...`}
                                             value={search}
                                             onChange={(e) => setSearch(e.target.value)}
                                      />
                                      <div className="h-full w-20"><img src={SearchIcon} className='h-full w-full object-cover bg-gradient-to-br from-pink-500 via-blue-500 to-yellow-500 rounded-l-md rounded-r-3xl' /></div>
                </div>
              </header> 
              

              <div className="bg-white w-full grid grid-cols-1">
                  {filteredStories.length === 0 && (
                    <div className="bg-gray-100 h-20 w-full rounded-2xl justify-center items-center flex mt-4">
                      <h1>No stories uploaded</h1>
                    </div>
                  )}
                  {filteredStories.length > 0 && (
                    filteredStories.map((story) => (
                      <div key={story.id} className="bg-white h-30 w-full rounded-4xl justify-start items-center flex border border-gray-500 transistion-all duration-300 ease-in-out cursor-pointer hover:-translate-1 hover:bg-blue-100 hover:border-none mt-4 gap-4">
                      <div className="h-full w-100 rounded-l-2xl">
                        <img src={story?.image} className="object-cover h-full w-full rounded-l-4xl" />
                      </div>
                      <div className="h-full flex flex-col mt-4">
                          <h1 className="text-gray-800 font-bold text-lg">{story?.title}</h1>
                          <h1 className="text-gray-500 font-bold text-sm">{story?.author}</h1>
                          <div className="flex gap-2">
                            <h1 className="bg-blue-200 px-2 text-blue-500 font-semibold rounded-lg">{story?.genre}</h1>
                            <h1 className="bg-blue-200 px-2 text-blue-500 font-semibold rounded-lg">{story?.gradeCategory}</h1>
                          </div>
                      </div>
                    </div>
                    ))
                  )}
              </div>
        </section>
      )
}
export default Admin_Materials_Page;