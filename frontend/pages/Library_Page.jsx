import axios from 'axios'
import useAuthStore from '../store/useAuthStore'
import { useEffect, useState } from 'react'

import SearchIcon from '../src/assets/search-svgrepo-com.svg'

import Lib_Navigation from '../library_components/Lib_Navigation'
import Lib_Story_Buttons from '../library_components/Lib_Story_Buttons'
import Lib_Stories_Card from '../library_components/Lib_Stories_Card'
import Lib_View_Story from '../library_components/Lib_View_Story'
import { useNavigate } from 'react-router-dom'

const Library_Page = () => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const navigate = useNavigate();

    const [stories, setStories] = useState([]); // Fetched Stories

    const [selectedGenre, setSelectedGenre] = useState("Overview");

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
          try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/get-stories`);
                setStories(res.data.stories);
                console.log(res.data.message);
            
          } catch (error) {
            console.log(error)
          }
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
        <section className="min-h-screen w-full bg-gradient-to-br from-purple-600 via-pink-500 to-white p-4">
            <div className="bg-white min-h-screen w-full just-center items-center flex flex-col rounded-2xl pb-4">

                <Lib_Navigation/>
                 
                 
                 <h1 className="text-5xl text-pink-500 font-bold my-10">What story will you explore today? {user.firstname}.</h1>

                 <div className="h-20 w-5xl bg-gradient-to-br from-purple-600 to-pink-500 justify-center items-center flex border-2 border-pink-500 shadow-lg rounded-4xl outline-none p-2">
                        <div className="h-full w-20 border-r-1 border-white"><img src={SearchIcon} className='h-full w-full object-cover' /></div>
                        <input type="text" className="h-full w-full outline-none px-4 text-white font-semibold" placeholder={`Search stories and explore... [e.g ${titles[index]}]`}/>
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
