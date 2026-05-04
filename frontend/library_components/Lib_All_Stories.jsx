
const Lib_All_Stories = ({stories, genre}) => {

    const filteredStories = genre === "All" ? stories : stories.filter((story) => story.genre === genre.toLowerCase());

    return(
        <>
        <header className='h-20 w-[1500px] border-b-1 border-pink-500 justify-between items-center flex py-4'>
                        <h1 className="text-lg font-semibold text-gray-800">Select and explore stories | <span className="text-xl font-bold">{genre}</span></h1>
                        <button className="bg-gray-300 h-10 w-10 rounded-xl">...</button>
        </header>
        {filteredStories.length === 0 && (
                        <div className="h-80 w-[1500px] flex flex-col items-center justify-center py-10 bg-gray-300 rounded-2xl mt-2">
                            <p className="text-2xl mb-2">📚</p>
                            <h2 className="text-lg font-semibold text-gray-700">
                            No stories yet on {genre}
                            </h2>
                            <p className="text-sm text-gray-500">
                            Check back later!
                            </p>
                        </div>
        )}
    
        <div className="w-[1500px] grid grid-cols-4 mt-4 gap-6">
        {filteredStories.map((story) => (
                        <div
                            key={story._id}
                            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                        >
                            {/* Image */}
                            <div className="w-full h-48 overflow-hidden">
                            <img
                                src={story.image}
                                alt={story.title}
                                className="w-full h-full object-cover hover:scale-110 transition duration-300"
                            />
                            </div>

                            {/* Content */}
                            <div className="p-4 flex flex-col gap-2">
                            <h3 className="font-semibold text-base text-gray-800 line-clamp-2">
                                {story.title}
                            </h3>

                            <p className="text-sm text-gray-500 line-clamp-2">
                                {story.description}
                            </p>

                            {/* Optional: Add CTA */}
                            <div className="mt-2">
                                <span className="text-xs text-purple-600 font-medium hover:underline">
                                Read Story →
                                </span>
                            </div>
                            </div>
                        </div>
        ))}
        </div>
        
        </>
        
    )
}
export default Lib_All_Stories;