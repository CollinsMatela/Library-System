import axios from 'axios'
import useAuthStore from '../store/useAuthStore'
import { useEffect, useState } from 'react'

import SearchIcon from '../src/assets/search-svgrepo-com.svg'

import Lib_Navigation from '../library_components/Lib_Navigation'
import Lib_Story_Buttons from '../library_components/Lib_Story_Buttons'
import Lib_All_Stories from '../library_components/Lib_All_Stories'

// Featured/Highlight Section of story
// Search bar
// List cards of stories by categories

const Library_Page = () => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const [stories, setStories] = useState([]);

    const [selectedGenre, setSelectedGenre] = useState("Overview");

    const showStories = (genre) => {
    setSelectedGenre(genre);
    };


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
    
    return(
        <section className="min-h-screen w-full bg-gradient-to-br from-purple-600 via-pink-500 to-white p-4">
            <div className="bg-white min-h-screen w-full just-center items-center flex flex-col rounded-2xl pb-4">

                <Lib_Navigation/>
                 
                 
                 <h1 className="text-5xl text-pink-500 font-bold my-10">What story will you explore today? {user.firstname}.</h1>

                 <div className="h-20 w-5xl bg-gradient-to-br from-purple-600 to-pink-500 justify-center items-center flex border-2 border-pink-500 shadow-lg rounded-4xl outline-none p-2">
                        <div className="h-full w-20 border-r-1 border-white"><img src={SearchIcon} className='h-full w-full object-cover' /></div>
                        <input type="text" className="h-full w-full outline-none px-4 text-white font-semibold" placeholder="Search stories and explore"/>
                 </div>

                 <Lib_Story_Buttons showStories={showStories}/>
 

                <Lib_All_Stories stories={stories} genre={selectedGenre}/>
                

                 

            </div>

        </section>
    )
}
export default Library_Page;
