
const Admin_Upload_Page = () => {
    return (
        <section className="bg-gray-50 min-h-screen w-full flex flex-col items-center px-6 py-10 gap-6">
            
            {/* Header */}
            <div className="w-full max-w-5xl">
                <h1 className="text-3xl font-bold text-gray-800">Upload Story</h1>
                <p className="text-gray-500">Create and publish a new story</p>
            </div>

            {/* Main Content */}
            <div className="w-full max-w-5xl flex gap-6">
                
                {/* LEFT: Form */}
                <div className="bg-white w-1/2 rounded-xl shadow-lg p-6 flex flex-col gap-4">
                    
                    <h2 className="text-xl font-semibold">Story Details</h2>

                    <input 
                        type="text" 
                        placeholder="Title"
                        className="p-2 rounded-lg bg-gray-200 outline-none"
                    />
                    <input 
                        type="text" 
                        placeholder="Author"
                        className="bg-gray-200 outline-none p-2 rounded-lg"
                    />

                    <textarea 
                        placeholder="Description"
                        className="bg-gray-200 outline-none p-2 rounded-lg h-24 resize-none"
                    />

                    <select className="bg-gray-200 outline-none p-2 rounded-lg">
                        <option>Genre</option>
                        <option>Horror</option>
                        <option>Romance</option>
                        <option>Sci-Fi</option>
                    </select>

                    <select className="bg-gray-200 outline-none p-2 rounded-lg">
                        <option>Grade Level Category</option>
                        <option>All</option>
                        <option>Kindergarten</option>
                        <option>Grade 1</option>
                        <option>Grade 2</option>
                        <option>Grade 3</option>
                        <option>Grade 4</option>
                        
                    </select>

                    <div className="w-full">
                        <h1 className="text-sm text-gray-500">Choose story image</h1>
                        <input 
                        type="file"
                        className="bg-gray-200 outline-none p-2 rounded-lg w-full"
                        />
                    </div>

                    <div className="w-full">
                        <h1 className="text-sm text-gray-500">Upload Story File (PDF)</h1>
                        <input 
                        type="file"
                        className="bg-gray-200 outline-none p-2 rounded-lg w-full"
                        />
                    </div>
                    

                </div>

                {/* RIGHT: Preview */}
                <div className="bg-white w-1/2 rounded-xl shadow-lg p-6 justify-between items-center flex flex-col gap-4">
                 
                 <div className="w-full space-y-2">
                    <h2 className="text-xl font-semibold">Preview</h2>

                    <div className="bg-gray-200 h-40 rounded-lg flex items-center justify-center text-gray-500">
                        Image Preview
                    </div>

                    <h3 className="text-lg font-bold">Story Title</h3>
                    <p className="text-gray-600 text-sm">
                        Story description will appear here...
                    </p>
                 </div>
                    
                    

                    <button className="bg-blue-600 w-full text-white py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition">
                        Upload Story
                    </button>

                </div>
            </div>
        </section>
    )
}

export default Admin_Upload_Page