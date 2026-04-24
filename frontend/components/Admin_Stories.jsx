
const Admin_Materials = () => {
    return(
        <section className="h-screen w-full flex py-10 px-20 gap-4">
              {/* <h1 className="text-xl font-semibold text-emerald-500 mb-4">Story Management</h1> */}
              {/* Upload Story Container */}
              
                    <aside className="h-full w-80 justify-center items-start flex flex-col border-r-2 border-emerald-500 pr-4 gap-2">
                         <h1 className="text-gray-600">Would you like to upload new Story?</h1>
                         {/* Manual Upload Card */}
                         <div className="h-full w-full bg-gray-100 border-2 border-gray-300 rounded-xl p-6 transition-all duration-300 hover:bg-emerald-500 hover:border-emerald-600 hover:text-white cursor-pointer group">

                                <h1 className="text-xl text-gray-600 font-bold mb-2 transition-colors duration-300 group-hover:text-white">
                                    ✍️ Manual Upload
                                </h1>

                                <p className="text-sm text-gray-600 group-hover:text-white transition-colors duration-300">
                                    Create a story by typing directly into the system. Add title, content, category, 
                                    and other details without uploading any file.
                                </p>

                                <ul className="mt-4 text-sm text-gray-600 group-hover:text-white space-y-1 transition-colors duration-300">
                                    <li>• Write story content manually</li>
                                    <li>• Add tags and category</li>
                                    <li>• Set grade level and subject</li>
                                    <li>• Optional: attach a quiz</li>
                                </ul>

                                <div className="mt-4 text-xs text-gray-500 group-hover:text-white transition-colors duration-300">
                                    Best for quick and fully controlled content creation.
                                </div>
                            </div>
                            {/* AI Assisted Card */}
                            <div className="h-full w-full bg-gray-100 border-2 border-gray-300 rounded-xl p-6 transition-all duration-300 hover:bg-emerald-500 hover:border-emerald-600 hover:text-white cursor-pointer group">

                                <h1 className="text-xl text-gray-600 font-bold group-hover:text-white mb-2 transition-colors duration-300">
                                    🤖 AI Assisted
                                </h1>

                                <p className="text-sm text-gray-600 group-hover:text-white transition-colors duration-300">
                                    Upload a PDF and let the system automatically extract and structure the story. 
                                    AI helps generate content details for faster setup.
                                </p>

                                <ul className="mt-4 text-sm text-gray-600 group-hover:text-white space-y-1 transition-colors duration-300">
                                    <li>• Upload PDF file</li>
                                    <li>• Auto-extract story content</li>
                                    <li>• Auto AI-generated quiz</li>
                                    <li>• AI video generated sotry</li>
                                </ul>

                                <div className="mt-4 text-xs text-gray-500 group-hover:text-white transition-colors duration-300">
                                    Best for faster content creation using existing documents.
                                </div>
                            </div>
                    </aside>

                    <div className="h-full w-full bg-gray-100">

                    </div>
               
        </section>
    )
}
export default Admin_Materials