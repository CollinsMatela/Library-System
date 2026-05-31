import { useEffect, useState } from "react";
import Lib_Overview from "./Lib_Overview";

const Lib_Stories_Card = ({stories, genre, handleViewStory}) => {

    const [showOverview, setShowOverview] = useState(false);
    const [showOtherGenre, setShowOtherGenre] = useState(false);

    useEffect(() => {
        if(genre === "Overview"){
            setShowOverview(true);
        } else {
            setShowOverview(false);
        }
    },[genre])

    const filteredStories = genre === "Overview" ? stories : stories.filter((story) => story.genre === genre.toLowerCase());
    const newStories = [...stories].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4); 

    return(
        <>
        {showOverview && (<Lib_Overview newStories={newStories}
                                        stories={stories}
                                        handleViewStory={handleViewStory}
        />)}

        <div className={`${showOverview ? "hidden" : null} w-full`}>
              <header className="w-full flex items-center justify-between px-6 py-5 border-b border-gray-200 bg-white/80 backdrop-blur-sm top-0 z-10">
  
                <div className="flex items-center gap-3">
                    
                    <div className="h-11 w-11 rounded-2xl bg-pink-500 flex items-center justify-center shadow-md">
                    <span className="text-white text-xl">📚</span>
                    </div>

                    <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
                        Explore {genre}
                    </h1>

                    <p className="text-sm text-gray-500">
                        Discover the latest adventures and trending reads
                    </p>
                    </div>

                </div>
        </header>
        <div className={`${filteredStories.length === 0 ? "grid-cols-1" : "grid-cols-4"} w-full grid grid-cols-4 mt-4 gap-6 px-6`}>
        
        {filteredStories.map((story) => (
                        <div
                            key={story.id}
                            className="relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                            onClick={() => handleViewStory(story.id)}
                        >
                            {/* Image */}
                            <div className="w-full h-100 overflow-hidden">
                            <img
                                src={story.image}
                                alt={story.title}
                                className="w-full h-full object-cover hover:scale-110 transition duration-300"
                            />
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 bg-black/50 p-4 justify-end items-start flex flex-col gap-2">
                            <h3 className="font-semibold text-base text-white line-clamp-2">
                                {story.title.toUpperCase()}
                            </h3>
                            <p className="text-xs text-white line-clamp-2">
                                {story.author.toLowerCase()}
                            </p>

                            {/* Optional: Add CTA */}
                            <div className="mt-2">
                                <span className="text-xs text-white font-medium hover:underline">
                                Read Story →
                                </span>
                            </div>
                            </div>
                        </div>
        ))}
        </div>
        </div>
        
        
        </>
        
    )
}
export default Lib_Stories_Card;