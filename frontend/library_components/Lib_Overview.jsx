
const Lib_Overview = ({newStories, stories, handleViewStory}) => {
      return(
       <div className="w-full">
            <header className="w-full flex items-center justify-between px-6 py-5 border-b border-gray-200 bg-white/80 backdrop-blur-sm top-0 z-10">
  
                <div className="flex items-center gap-3">
                    
                    <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-md">
                    <span className="text-white text-xl">📚</span>
                    </div>

                    <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
                        Newest Released Stories
                    </h1>

                    <p className="text-sm text-gray-500">
                        Discover the latest adventures and trending reads
                    </p>
                    </div>

                </div>
            </header>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch p-6">
                    {newStories.map((story) => (
                        <div
                        key={story.id}
                        className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full flex flex-col"
                        onClick={() => handleViewStory(story.id)}
                        >
                        <div className="w-full h-48 overflow-hidden">
                            <img
                            src={story.image}
                            alt={story.title}
                            className="w-full h-full object-cover hover:scale-110 transition duration-300"
                            />
                        </div>

                        <div className="p-4 flex flex-col flex-1 gap-2">
                            <h3 className="font-semibold text-base text-gray-800 line-clamp-2">
                            {story.title}
                            </h3>

                            <p className="text-sm text-gray-500 line-clamp-2">
                            {story.description}
                            </p>

                            <div className="mt-auto pt-2">
                            <span className="text-xs text-purple-600 font-medium hover:underline">
                                Read Story →
                            </span>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
            
            <header className="w-full flex items-center justify-between px-6 py-5 border-b border-gray-200 bg-white/80 backdrop-blur-sm top-0 z-10">
  
                <div className="flex items-center gap-3">
                    
                    <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-md">
                    <span className="text-white text-xl">📚</span>
                    </div>

                    <div>
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
                        All Available Stories
                    </h1>

                    <p className="text-sm text-gray-500">
                        Explore and discover more stories that are waiting 
                    </p>
                    </div>

                </div>
            </header>
           <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch p-6">
                    {stories.map((story) => (
                        <div
                        key={story.id}
                        className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full flex flex-col"
                        onClick={() => handleViewStory(story.id)}
                        >
                        <div className="w-full h-48 overflow-hidden">
                            <img
                            src={story.image}
                            alt={story.title}
                            className="w-full h-full object-cover hover:scale-110 transition duration-300"
                            />
                        </div>

                        <div className="p-4 flex flex-col flex-1 gap-2">
                            <h3 className="font-semibold text-base text-gray-800 line-clamp-2">
                            {story.title}
                            </h3>

                            <p className="text-sm text-gray-500 line-clamp-2">
                            {story.description}
                            </p>

                            <div className="mt-auto pt-2">
                            <span className="text-xs text-purple-600 font-medium hover:underline">
                                Read Story →
                            </span>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
       </div>
       
      )
}
export default Lib_Overview;