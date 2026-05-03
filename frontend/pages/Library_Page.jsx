
// Featured/Highlight Section of story
// Search bar
// List cards of stories by categories

const Library_Page = () => {
    return(
        <section className="min-h-screen w-full bg-gradient-to-br from-purple-600 via-pink-500 to-white p-4">
            <div className="bg-gradient-to-br from-purple-300 via-pink-200 to-yellow-100 min-h-screen w-full just-center items-center flex flex-col rounded-2xl">
                 <nav className="h-20 w-full border-b-2 border-white justify-between items-center flex px-4">
                      <div className="bg-white rounded-xl">
                        <h1 className="text-sm text-black font-semibold">Welcome back, [Student Name]! 👋</h1>
                      </div>
                      <button className="bg-white border-1 border-pink-500 text-pink-500 font-semibold py-2 px-4 rounded-xl transition-all duration-300 ease-in-out hover:scale-120 hover:text-white hover:bg-pink-500 cursor-pointer">Logout</button>
                 </nav>
                 
                 <h1 className="text-5xl text-pink-500 font-semibold my-10">What story will you explore today?</h1>

                 <div className="h-20 w-5xl bg-gradient-to-br from-purple-600 to-pink-500 justify-center items-center flex border-2 border-pink-500 shadow-2xl rounded-2xl outline-none p-2">
                        <div className="h-full w-20 border-r-1 border-white"></div>
                        <input type="text" className="h-full w-full outline-none px-4 text-white font-semibold" placeholder="Search stories and explore"/>
                 </div>
                 

            </div>

        </section>
    )
}
export default Library_Page;
