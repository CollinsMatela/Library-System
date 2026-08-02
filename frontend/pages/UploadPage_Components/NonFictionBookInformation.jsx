import { TextAlignCenter } from "lucide-react";

const NonFictionBookInformation = ({
    // Basic Information
    title,
    setTitle,
    author,
    setAuthor,
    description,
    setDescription,
    language,
    setLanguage,
    publication,
    setPublication,
    publisher,
    setPublisher,
    isbn,
    setIsbn,

    // Non-Fiction Information
    edition,
    setEdition,
    volume,
    setVolume,
    ddc,
    setDdc,
    copies,
    setCopies,
    callNumber,
    setCallNumber,
    availableAt,
    setAvailableAt,
}) => {
    return (
        <div className="w-full flex flex-col gap-2 my-4">

            <div className="flex items-center justify-start gap-2">
                <div className="bg-black h-9 w-9 text-white rounded-xl justify-center items-center flex">
                   <h1 className="font-bold text-lg">2#</h1>
                </div>
                <div>
                    <h1 className="text-md font-bold text-gray-800 rounded-full">Step Two</h1>
                    <p className="text-gray-400 text-xs">Fill the applicable information.</p>
                </div>
                
            </div>

            {/* Basic Information */}
            <div className="w-full flex flex-col gap-2 p-6 border border-gray-300 rounded-xl">

                 <div className="justify-between items-center flex gap-2 w-full">
                                    <div class="flex gap-2 ujstify-center items-center">
                                        <div className="p-2 rounded-full text-gray-500 bg-gray-200 justify-center items-center flex"><TextAlignCenter size={20}/></div>
                                        <div>
                                            <h1 className="text-gray-600 text-sm font-bold">Fill information.</h1>
                                            <h1 className="text-gray-600 text-xs">Input the applicable information.</h1>
                                        </div>
                                    </div>
                                    
                                </div>

                <div className="grid grid-cols-3 gap-2">

                <input
                    type="text"
                    placeholder="Title"
                    className="bg-white border-1 border-gray-300 p-2 rounded-lg text-gray-500 text-xs mt-2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Author (Optional)"
                    className="bg-white border-1 border-gray-300 p-2 rounded-lg text-gray-500 text-xs mt-2"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />

                <select
                    className="bg-white border-1 border-gray-300 p-2 rounded-lg text-gray-500 text-xs mt-2"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <option value="">Select Language (Optional)</option>
                    <option value="english">English</option>
                    <option value="filipino">Filipino</option>
                    <option value="english & filipino">English & Filipino</option>
                </select>

                <input
                    type="text"
                    placeholder="Publisher (Optional)"
                    className="bg-white border-1 border-gray-300 p-2 rounded-lg text-gray-500 text-xs mt-2"
                    value={publisher}
                    onChange={(e) => setPublisher(e.target.value)}
                />

                <input
                    type="number"
                    min="1900"
                    max={new Date().getFullYear()}
                    placeholder="Publication Year (Optional)"
                    className="bg-white border-1 border-gray-300 p-2 rounded-lg text-gray-500 text-xs mt-2"
                    value={publication}
                    onChange={(e) => setPublication(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="ISBN (Optional)"
                    className="bg-white border-1 border-gray-300 p-2 rounded-lg text-gray-500 text-xs mt-2"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                />

            </div>


            {/* Additional Information */}
            <div className="grid grid-cols-3 gap-2">

                <input
                    type="text"
                    placeholder="Edition (Optional)"
                    className="bg-white border-1 border-gray-300 p-2 rounded-lg text-gray-500 text-xs mt-2"
                    value={edition}
                    onChange={(e) => setEdition(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Volume (Optional)"
                    className="bg-white border-1 border-gray-300 p-2 rounded-lg text-gray-500 text-xs mt-2"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="DDC Classification (Optional)"
                    className="bg-white border-1 border-gray-300 p-2 rounded-lg text-gray-500 text-xs mt-2"
                    value={ddc}
                    onChange={(e) => setDdc(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Number of Copies"
                    min={1}
                    className="bg-white border-1 border-gray-300 p-2 rounded-lg text-gray-500 text-xs mt-2"
                    value={copies}
                    onChange={(e) => setCopies(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Call Number (Optional)"
                    className="bg-white border-1 border-gray-300 p-2 rounded-lg text-gray-500 text-xs mt-2"
                    value={callNumber}
                    onChange={(e) => setCallNumber(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Available At (Optional)"
                    className="bg-white border-1 border-gray-300 p-2 rounded-lg text-gray-500 text-xs mt-2"
                    value={availableAt}
                    onChange={(e) => setAvailableAt(e.target.value)}
                />
                 </div>

                 <textarea
                placeholder="Description (Optional)"
                className="bg-white border-1 border-gray-300 p-2 rounded-lg text-gray-500 text-xs mt-2 resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            </div>

        </div>
    );
};

export default NonFictionBookInformation;