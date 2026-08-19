import { TextAlignCenter } from "lucide-react"

const FictionBookInformation = ({
    selectedCategoryOfBook,
    title,
    setTitle,

    author,
    setAuthor,

    description,
    setDescription,

    gradeCategory,
    setGradeCategory,

    language,
    setLanguage,

    publication,
    setPublication,

    publisher,
    setPublisher,

    isbn,
    setIsbn,

    illustrator,
    setIllustrator,

    moral,
    setMoral,

    // Library Information
    series,
    setSeries,

    copies,
    setCopies,

    callNumber,
    setCallNumber,

    availableAt,
    setAvailableAt,

    edition,
    setEdition,

    volume,
    setVolume,
}) => {
    return(
        <div className="w-full flex flex-col gap-2 my-4">

            <div className=" border border-stone-300 p-6 rounded-xl flex flex-col gap-2">


               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
                <input
                    type="text"
                    placeholder="Title "
                    className="bg-white border-1 border-stone-300 p-2 rounded-lg text-stone-500 text-xs mt-2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Author (Optional)"
                    className="bg-white border-1 border-stone-300 p-2 rounded-lg text-stone-500 text-xs mt-2"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Illustrator (Optional)"
                    className="bg-white border-1 border-stone-300 p-2 rounded-lg text-stone-500 text-xs mt-2"
                    value={illustrator}
                    onChange={(e) => setIllustrator(e.target.value)}
                />

                <select
                    className="bg-white border-1 border-stone-300 p-2 rounded-lg text-stone-500 text-xs mt-2"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <option value="">Select Language</option>
                    <option value="english">English</option>
                    <option value="filipino">Filipino</option>
                </select>

                <input
                    type="text"
                    placeholder="Publisher (Optional)"
                    className="bg-white border-1 border-stone-300 p-2 rounded-lg text-stone-500 text-xs mt-2"
                    value={publisher}
                    onChange={(e) => setPublisher(e.target.value)}
                />

                <input
                    type="number"
                    min="1900"
                    max={new Date().getFullYear()}
                    placeholder="Publication Year (Optional)"
                    className="bg-white border-1 border-stone-300 p-2 rounded-lg text-stone-500 text-xs mt-2"
                    value={publication}
                    onChange={(e) => setPublication(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="ISBN (Optional)"
                    className="bg-white border-1 border-stone-300 p-2 rounded-lg text-stone-500 text-xs mt-2"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Series Name (Optional)"
                    className="bg-white border-1 border-stone-300 p-2 rounded-lg text-stone-500 text-xs mt-2"
                    value={series}
                    onChange={(e) => setSeries(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Edition (Optional)"
                   className="bg-white border-1 border-stone-300 p-2 rounded-lg text-stone-500 text-xs mt-2"
                    value={edition}
                    onChange={(e) => setEdition(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Volume (Optional)"
                    className="bg-white border-1 border-stone-300 p-2 rounded-lg text-stone-500 text-xs mt-2"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                />

                <input
                    type="number"
                    min={1}
                    placeholder="Number of Copies"
                    className="bg-white border-1 border-stone-300 p-2 rounded-lg text-stone-500 text-xs mt-2"
                    value={copies}
                    onChange={(e) => setCopies(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Call Number (Optional)"
                    className="bg-white border-1 border-stone-300 p-2 rounded-lg text-stone-500 text-xs mt-2"
                    value={callNumber}
                    onChange={(e) => setCallNumber(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Available At (Optional)"
                    className="bg-white border-1 border-stone-300 p-2 rounded-lg text-stone-500 text-xs mt-2"
                    value={availableAt}
                    onChange={(e) => setAvailableAt(e.target.value)}
                />
                </div>

                <textarea
                placeholder="Description (Optional)"
                className="bg-white h-30 w-full border-1 border-stone-300 p-2 rounded-lg text-stone-500 text-xs resize-none mt-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

                
            </div>

            
        </div>
    )
}
export default FictionBookInformation