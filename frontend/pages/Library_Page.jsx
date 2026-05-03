import axios from 'axios'
import { useEffect, useState } from 'react'
// Featured/Highlight Section of story
// Search bar
// List cards of stories by categories

const Library_Page = () => {
    const [stories, setStories] = useState([]);

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
            <div className="bg-white min-h-screen w-full just-center items-center flex flex-col rounded-2xl">
                 <nav className="h-20 w-full border-b-1 border-pink-500 justify-between items-center flex px-6">
                      <div className="bg-white rounded-xl justify-center items-center flex gap-2">
                        <img src="" alt="" className='h-10 w-10 bg-gray-300 rounded-xl' />
                        <h1 className="text-medium text-gray-800 font-semibold">Welcome back, [Student Name]! 👋</h1>
                      </div>
                      <div className='gap-2 justify-center items-center flex'>
                        <button className='h-10 w-10 bg-gray-300 rounded-xl'></button>
                        <button className='h-10 w-10 bg-gray-300 rounded-xl'></button>
                        <button className='h-10 w-10 bg-gray-300 rounded-xl'></button>
                        <button className="h-10 px-4 bg-white border-1 border-pink-500 text-pink-500 font-semibold rounded-xl transition-all duration-300 ease-in-out hover:scale-120 hover:text-white hover:bg-pink-500 cursor-pointer">Logout</button>
                      </div>
                      
                 </nav>
                 
                 <h1 className="text-5xl text-pink-500 font-semibold my-10">What story will you explore today?</h1>

                 <div className="h-20 w-5xl bg-gradient-to-br from-purple-600 to-pink-500 justify-center items-center flex border-2 border-pink-500 shadow-lg rounded-2xl outline-none p-2">
                        <div className="h-full w-20 border-r-1 border-white"></div>
                        <input type="text" className="h-full w-full outline-none px-4 text-white font-semibold" placeholder="Search stories and explore"/>
                 </div>
 
                 <div className="my-10 gap-4 flex">
                     <div className="h-25 w-20">
                        <button className="shadow-lg h-20 w-20 rounded-full bg-blue-500 cursor-pointer transition-all duration-300 ease-in-out hover:scale-125"></button>
                        <h1 className="w-full text-center font-semibold text-sm text-gray-800">All</h1>
                     </div>

                     <div className="h-25 w-20">
                        <button className="shadow-lg h-20 w-20 rounded-full bg-green-500 cursor-pointer transition-all duration-300 ease-in-out hover:scale-125"></button>
                        <h1 className="w-full text-center font-semibold text-sm text-gray-800">Adventure</h1>
                     </div>

                     <div className="h-25 w-20">
                        <button className="shadow-lg h-20 w-20 rounded-full bg-violet-500 cursor-pointer transition-all duration-300 ease-in-out hover:scale-125"></button>
                        <h1 className="w-full text-center font-semibold text-sm text-gray-800">Fantasy</h1>
                     </div>

                     <div className="h-25 w-20">
                        <button className="shadow-lg h-20 w-20 rounded-full bg-red-500 cursor-pointer transition-all duration-300 ease-in-out hover:scale-125"></button>
                        <h1 className="w-full text-center font-semibold text-sm text-gray-800">Romance</h1>
                     </div>

                     <div className="h-25 w-20">
                        <button className="shadow-lg h-20 w-20 rounded-full bg-orange-500 cursor-pointer transition-all duration-300 ease-in-out hover:scale-125"></button>
                        <h1 className="w-full text-center font-semibold text-sm text-gray-800">Drama</h1>
                     </div>

                     <div className="h-25 w-20">
                        <button className="shadow-lg h-20 w-20 rounded-full bg-emerald-500 cursor-pointer transition-all duration-300 ease-in-out hover:scale-125"></button>
                        <h1 className="w-full text-center font-semibold text-sm text-gray-800">Fairy Tale</h1>
                     </div>

                     <div className="h-25 w-20">
                        <button className="shadow-lg h-20 w-20 rounded-full bg-amber-500 cursor-pointer transition-all duration-300 ease-in-out hover:scale-125"></button>
                        <h1 className="w-full text-center font-semibold text-sm text-gray-800">Comedy</h1>
                     </div>

                     <div className="h-25 w-20">
                        <button className="shadow-lg h-20 w-20 rounded-full bg-gray-500 cursor-pointer transition-all duration-300 ease-in-out hover:scale-125"></button>
                        <h1 className="w-full text-center font-semibold text-sm text-gray-800">Horror</h1>
                     </div>

                     <div className="h-25 w-20">
                        <button className="shadow-lg h-20 w-20 rounded-full bg-pink-500 cursor-pointer transition-all duration-300 ease-in-out hover:scale-125"></button>
                        <h1 className="w-full text-center font-semibold text-sm text-gray-800">Mystery</h1>
                     </div>

                     <div className="h-25 w-20">
                        <button className="shadow-lg h-20 w-20 rounded-full bg-cyan-500 cursor-pointer transition-all duration-300 ease-in-out hover:scale-125"></button>
                        <h1 className="w-full text-center font-semibold text-sm text-gray-800">Sci-Fi</h1>
                     </div>

                     <div className="h-25 w-20">
                        <button className="shadow-lg h-20 w-20 rounded-full bg-mist-500 cursor-pointer transition-all duration-300 ease-in-out hover:scale-125"></button>
                        <h1 className="w-full text-center font-semibold text-sm text-gray-800">Educational</h1>
                     </div>
                 </div>

                 <header className='bg-white h-20 w-[1500px] border-b-2 border-gray-200 justify-between items-center flex py-4'>
                        <h1 className="text-xl font-semibold text-gray-800">Select and explore stories</h1>
                        <button className="bg-gray-300 h-10 w-10 rounded-xl">...</button>
                </header>

                 <div className="bg-white w-[1500px] grid grid-cols-4 mt-4 gap-6">
                    {stories.length === 0 && (
                        <div className="w-full flex flex-col items-center justify-center py-10 bg-gray-100 rounded-2xl shadow-inner mt-2">
                            <p className="text-2xl mb-2">📚</p>
                            <h2 className="text-lg font-semibold text-gray-700">
                            No stories yet
                            </h2>
                            <p className="text-sm text-gray-500">
                            Check back later!
                            </p>
                        </div>
                    )}
                    
                   
                        {stories.map((story) => (
                        <div
                            key={story._id}
                            className="bg-white rounded-2xl shadow-md overflow-hidden hover:scale-105 transition duration-300 cursor-pointer"
                        >
                            {/* Story Image */}
                            <img
                            src={story.image}
                            alt={story.title}
                            className="w-full h-100 object-cover"
                            />

                            {/* Content */}
                            <div className="p-3">
                            <h3 className="font-bold text-sm text-gray-800 line-clamp-2">
                                {story.title}
                            </h3>

                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                {story.description}
                            </p>

                            {/* Genre Badge */}
                            <span className="inline-block mt-2 text-[10px] bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
                                {story.genre}
                            </span>

                            {/* Quiz Badge (optional) */}
                            {story.hasQuiz && (
                                <span className="ml-2 text-[10px] bg-pink-100 text-pink-600 px-2 py-1 rounded-full">
                                Quiz
                                </span>
                            )}

                            </div>
                        </div>
                        ))}
                    
                    
                 </div>
                 

            </div>

        </section>
    )
}
export default Library_Page;
