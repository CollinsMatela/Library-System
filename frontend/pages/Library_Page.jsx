import axios from 'axios'
import useAuthStore from '../store/useAuthStore'
import { useEffect, useState } from 'react'

import SearchIcon from '../src/assets/search-svgrepo-com.svg'

import Lib_Navigation from '../library_components/Lib_Navigation'
import Lib_Story_Buttons from '../library_components/Lib_Story_Buttons'
import Lib_Stories_Card from '../library_components/Lib_Stories_Card'
import Lib_View_Story from '../library_components/Lib_View_Story'
import defaultProfile from '../src/assets/Student.jpg'
import LoadingScreen from '../loadings/loading'
import { useNavigate } from 'react-router-dom'

const Library_Page = () => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const [stories, setStories] = useState([]); // Fetched Stories
    const [selectedGenre, setSelectedGenre] = useState("Overview");
    
    const [search, setSearch] = useState("");
    const searchingResult = stories.filter((story) => story.title.toLowerCase().includes(search.toLowerCase()));

    const showStories = (genre) => {
    setSelectedGenre(genre);
    };

    const [showViewStory, setShowViewStory] = useState(false);
    const [selectedStory, setSelectedStory] = useState(null);
    const handleViewStory = (storyId) => {
          setSelectedStory(storyId)
          navigate(`/library/view-story/${storyId}`)
    }


    useEffect(() => {
        fetchStories();
    },[])

    const fetchStories = async () =>{
          setLoading(true);
          try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-stories`);
                setStories(res.data.stories);
                console.log(res.data.message);
          } catch (error) {
            console.log(error)
          } finally {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }
    }

    const handleProfile = () => {
          navigate('/library/profile');
    }
    

    const titles = stories.map(s => s.title);
    const [index, setIndex] = useState(0);

    // useEffect(() => {
    //     // Story Title Rotation for placeholder
    //     if (titles.length === 0) return;

    //     const interval = setInterval(() => {
    //     setIndex(prev => (prev + 1) % titles.length);
    //     }, 3000);

    //     return () => clearInterval(interval);
    // }, [titles.length]);
    
    return(
        <section className="min-h-screen w-full bg-white p-4">
            <div className="bg-white min-h-screen shadow-2xl w-full just-center items-center flex flex-col rounded-2xl pb-4">
                {loading && (<LoadingScreen/>)}
                <Lib_Navigation/>
                
                
                <div className="max-5xl w-full justify-center items-start flex gap-2 mb-5 mt-20">
                <div className="w-full max-w-5xl flex flex-col justify-center items-start mb-10">
                    <h1 className="text-2xl text-gray-800 font-bold text-center">
                        Welcome back, {" "}
                        <span className="text-pink-500">{user?.firstname || "Dev"}!</span>
                    </h1>
                    <h1 className="text-6xl text-gray-800 font-bold text-center">What story will you explore today?</h1>
                </div>
                

                </div>
                

                 <div className="h-20 max-w-5xl w-full bg-gradient-to-br from-pink-100 via-pink-200 to-purple-200 justify-center items-center flex shadow-sm rounded-4xl outline-none p-2">
                        <div className="h-full w-20"><img src={SearchIcon} className='h-full w-full object-cover bg-gradient-to-br from-pink-300 via-pink-500 to-purple-500 rounded-l-3xl rounded-r-md' /></div>
                        <input type="text" 
                               className="h-full w-full outline-none px-4 text-lg text-pink-500 font-bold inner-shadow-lg" 
                               placeholder={`Search stories and explore...`}
                               value={search}
                               onChange={(e) => setSearch(e.target.value)}
                        />
                 </div>
                 <div className={`${!search ? "hidden" : null} bg-white max-h-50 w-5xl border-b-1 border-gray-300 my-2 overflow-y-auto py-4`}>
                      <h1 className='text-gray-800 font-bold mb-2'>Search Result</h1>
                      {searchingResult.map((story, index) => (
                        <div key={story.id} className='h-20 w-full bg-white rounded-4xl mb-2 justify-start items-center flex gap-4 px-5 cursor-pointer border-1 border-gray-200 hover:bg-blue-100 hover:border-blue-500 group'
                             onClick={() => handleViewStory(story.id)}
                        >
                             <h1 className='bg-gray-100 h-12 w-12 justify-center items-center flex rounded-full group-hover:bg-blue-200 group-hover:text-blue-500'>{index + 1}.</h1>
                             <h1 className='text-gray-800 font-bold'>{story.title.toUpperCase()}</h1>
                        </div>
                      ))}      
                 </div>

                 <Lib_Story_Buttons showStories={showStories}/>
 

                <Lib_Stories_Card stories={stories} 
                                  genre={selectedGenre} 
                                  handleViewStory={handleViewStory}
                />
                

            </div>

        </section>
    )
}
export default Library_Page;
